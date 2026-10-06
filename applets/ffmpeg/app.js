import { FFmpeg } from './lib/ffmpeg-0.12.15/index.js';

// Single-threaded core: the multi-threaded build needs cross-origin isolation
// (COOP/COEP headers), which GitHub Pages can't send.
const CORE_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';

const $ = (id) => document.getElementById(id);
const els = {
  drop: $('drop'), picker: $('picker'), queue: $('queue'),
  convert: $('convert'), cancel: $('cancel'), clear: $('clear'),
  bar: $('bar'), status: $('status'), log: $('log'),
  crf: $('crf'), preset: $('preset'), h264Pcm: $('h264-pcm'), bits: $('bits'),
};

let ffmpeg = null;
let wasmURL = null;
let running = false;
let cancelled = false;
let duration = 0;
const items = [];

function log(line) {
  els.log.textContent += line + '\n';
  els.log.scrollTop = els.log.scrollHeight;
}

function setStatus(text, fraction) {
  els.status.textContent = text;
  if (fraction !== undefined) els.bar.style.width = Math.max(0, Math.min(1, fraction)) * 100 + '%';
}

function formatBytes(n) {
  if (n < 1024 * 1024) return (n / 1024).toFixed(0) + ' KB';
  if (n < 1024 * 1024 * 1024) return (n / 1024 / 1024).toFixed(1) + ' MB';
  return (n / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function parseTime(text) {
  const m = /(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(text);
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : 0;
}

function job() {
  return document.querySelector('input[name="job"]:checked').value;
}

function render() {
  els.queue.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = item.file.name + ' (' + formatBytes(item.file.size) + ')';
    const state = document.createElement('span');
    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.download = item.outName;
      a.textContent = 'Save ' + item.outName;
      state.appendChild(a);
    } else {
      state.textContent = item.state;
    }
    li.append(name, state);
    els.queue.appendChild(li);
  });
  els.convert.disabled = running || !items.some((i) => i.state === 'Waiting');
  els.cancel.disabled = !running;
  els.clear.disabled = running;
}

function addFiles(files) {
  for (const file of files) items.push({ file, state: 'Waiting', url: null, outName: null });
  render();
}

// Fetch the 32 MB wasm ourselves so the download can show progress; the browser
// HTTP cache still applies, and the blob URL survives Cancel (which kills the worker).
async function fetchWasm() {
  if (wasmURL) return wasmURL;
  const res = await fetch(CORE_BASE + '/ffmpeg-core.wasm');
  if (!res.ok) throw new Error('Download failed: HTTP ' + res.status);
  const total = Number(res.headers.get('content-length')) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    setStatus('Downloading ffmpeg core... ' + formatBytes(received) + (total ? ' of ' + formatBytes(total) : ''), total ? received / total : 0);
  }
  wasmURL = URL.createObjectURL(new Blob(chunks, { type: 'application/wasm' }));
  return wasmURL;
}

async function ensureLoaded() {
  if (ffmpeg) return ffmpeg;
  const wasm = await fetchWasm();
  setStatus('Starting ffmpeg...', 1);
  const instance = new FFmpeg();
  instance.on('log', ({ message }) => {
    // ffmpeg.wasm 0.12 ends every exec by aborting the wasm runtime; it isn't an error.
    if (message === 'Aborted()') return;
    log(message);
    if (!duration && /Duration: /.test(message)) duration = parseTime(message.split('Duration: ')[1]);
    const t = /time=(-?[\d:.]+)/.exec(message);
    if (t && duration) {
      const done = parseTime(t[1]);
      const speed = /speed=\s*([\d.]+x)/.exec(message);
      setStatus(running.label + ': ' + Math.round((done / duration) * 100) + '%' + (speed ? ' (' + speed[1] + ')' : ''), done / duration);
    }
  });
  await instance.load({ coreURL: CORE_BASE + '/ffmpeg-core.js', wasmURL: wasm });
  ffmpeg = instance;
  return ffmpeg;
}

function buildArgs(input, base) {
  if (job() === 'h264') {
    const pcm = els.h264Pcm.checked;
    const out = base + '-h264' + (pcm ? '.mov' : '.mp4');
    const args = [
      '-i', input,
      '-map', '0:v:0', '-map', '0:a?',
      '-c:v', 'libx264', '-preset', els.preset.value, '-crf', els.crf.value,
      '-pix_fmt', 'yuv420p', '-tag:v', 'avc1',
      '-c:a', pcm ? 'pcm_s16le' : 'copy',
    ];
    if (!pcm) args.push('-movflags', '+faststart');
    return { args: args.concat(out), out };
  }
  const out = base + '-pcm.mov';
  return {
    args: ['-i', input, '-map', '0:v?', '-map', '0:a?', '-c:v', 'copy', '-c:a', els.bits.value, out],
    out,
  };
}

async function convertOne(item) {
  const ff = await ensureLoaded();
  const base = item.file.name.replace(/\.[^.]+$/, '');
  const { args, out } = buildArgs('/in/' + item.file.name, base);
  duration = 0;
  running = { label: item.file.name };

  // WORKERFS reads the File lazily instead of copying it into wasm memory.
  try { await ff.createDir('/in'); } catch (e) { /* already exists */ }
  await ff.mount('WORKERFS', { files: [item.file] }, '/in');
  log('> ffmpeg ' + args.join(' '));
  try {
    const code = await ff.exec(args);
    if (code !== 0) throw new Error('ffmpeg exited with code ' + code + '; see the log.');
    const data = await ff.readFile(out);
    await ff.deleteFile(out);
    item.outName = out;
    item.url = URL.createObjectURL(new Blob([data.buffer], { type: out.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime' }));
    item.state = 'Done';
  } finally {
    await ff.unmount('/in').catch(() => {});
  }
}

async function run() {
  running = { label: '' };
  cancelled = false;
  render();
  for (const item of items) {
    if (item.state !== 'Waiting') continue;
    item.state = 'Working...';
    render();
    try {
      await convertOne(item);
      setStatus('Finished ' + item.file.name + '.', 1);
    } catch (err) {
      // A cancelled file goes back in the queue so Convert picks it up again.
      item.state = cancelled ? 'Waiting' : 'Failed';
      if (!cancelled) {
        log('Error: ' + (err && err.message ? err.message : err));
        setStatus('Failed: ' + item.file.name, 0);
      }
    }
    if (cancelled) break;
  }
  running = false;
  render();
}

els.drop.addEventListener('click', () => els.picker.click());
els.drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); els.picker.click(); } });
els.picker.addEventListener('change', () => { addFiles(els.picker.files); els.picker.value = ''; });
els.drop.addEventListener('dragover', (e) => { e.preventDefault(); els.drop.classList.add('over'); });
els.drop.addEventListener('dragleave', () => els.drop.classList.remove('over'));
els.drop.addEventListener('drop', (e) => {
  e.preventDefault();
  els.drop.classList.remove('over');
  addFiles(e.dataTransfer.files);
});

els.convert.addEventListener('click', run);

// ffmpeg.wasm can't interrupt a running exec; terminating the worker is the only way out.
els.cancel.addEventListener('click', () => {
  if (!ffmpeg) return;
  cancelled = true;
  ffmpeg.terminate();
  ffmpeg = null;
  setStatus('Cancelled.', 0);
  log('Cancelled.');
});

els.clear.addEventListener('click', () => {
  items.forEach((i) => { if (i.url) URL.revokeObjectURL(i.url); });
  items.length = 0;
  els.log.textContent = '';
  setStatus('Ready.', 0);
  render();
});

document.querySelectorAll('input[name="job"]').forEach((radio) => radio.addEventListener('change', () => {
  $('h264-options').hidden = job() !== 'h264';
  $('pcm-options').hidden = job() !== 'pcm';
}));
$('pcm-options').hidden = true;
render();
