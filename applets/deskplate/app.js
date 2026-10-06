import opentype from 'https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { persist } from '../persist.js';

// All geometry is computed in millimeters.
const MM_PER_IN = 25.4;
const UNIT_MM = { mm: 1, cm: 10, in: MM_PER_IN, inch: MM_PER_IN, inches: MM_PER_IN, '"': MM_PER_IN };
// "2in", "50.8 mm", "5cm", "1/8in", "1 1/2\"", or a bare number (inches).
const LENGTH_RE = /^\s*([-+])?\s*(?:(\d+)\s+(?=\d+\s*\/))?(\d*\.?\d+)(?:\s*\/\s*(\d*\.?\d+))?\s*(mm|cm|inches|inch|in|")?\s*$/i;
const WOOD = '#d9b077';
const BURN = '#3b2412';
const EDGE = '#5a3a1e';
const SHEET_MARGIN = 3;  // mm around the panels
const PANEL_GAP = 4;     // mm between panels
const CUT_STROKE = 0.025; // mm (~0.001 in hairline, what Epilog-style drivers expect)
const FONT_BASE = 'https://cdn.jsdelivr.net/npm/@fontsource/';

const WEIGHT_NAMES = { 100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' };
const ALL_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

// Static (non-variable) families, so glyph outlines don't contain overlapping contours.
// Inter ships in three optical sizes, picked from the physical text size; its files are
// subset to Latin with overlaps removed and served from this applet's folder (OFL, see
// fonts/OFL.txt). The rest come from Fontsource.
const FAMILIES = [
  { id: 'inter', label: 'Inter', weights: ALL_WEIGHTS, italic: true, opsz: true },
  { id: 'poppins', label: 'Poppins', weights: ALL_WEIGHTS, italic: true },
  { id: 'libre-baskerville', label: 'Libre Baskerville', weights: [400, 500, 600, 700], italic: true },
  { id: 'bebas-neue', label: 'Bebas Neue', weights: [400] },
  { id: 'abril-fatface', label: 'Abril Fatface', weights: [400] },
  { id: 'alfa-slab-one', label: 'Alfa Slab One', weights: [400] },
  { id: 'lobster', label: 'Lobster (script)', weights: [400] },
];
const INTER_CAP_RATIO = 1490 / 2048;
const SMALL_CAP_TRACKING = 0.05; // em, added after each small capital
const ALL_CAPS_TRACKING = 0.03;  // em, added after each capital in ALL CAPS

const $ = (id) => document.getElementById(id);

// Lengths in mm, keyed by input id; filled from the inputs.
const lengths = {};

const fontCache = {};
let svgText = '';

function fontURL(family, weight, italic, capHeight) {
  if (family.id === 'inter') {
    const pt = (capHeight / INTER_CAP_RATIO / 25.4) * 72;
    const opsz = pt < 21 ? 18 : pt < 26 ? 24 : 28;
    const style = italic ? (weight === 400 ? 'Italic' : WEIGHT_NAMES[weight] + 'Italic') : WEIGHT_NAMES[weight];
    return new URL('fonts/Inter_' + opsz + 'pt-' + style + '.woff', import.meta.url).href;
  }
  return FONT_BASE + family.id + '/files/' + family.id + '-latin-' + weight + '-' + (italic ? 'italic' : 'normal') + '.woff';
}

function loadFont(family, weight, italic, capHeight) {
  const url = fontURL(family, weight, italic && family.italic, capHeight);
  if (!fontCache[url]) {
    fontCache[url] = fetch(url)
      .then((r) => { if (!r.ok) throw new Error('Font download failed: ' + family.label); return r.arrayBuffer(); })
      .then((buf) => opentype.parse(buf));
  }
  return fontCache[url];
}

// Everything needed to set one line of text: its font, case mode, and for small caps
// a second font one weight heavier, since scaled-down capitals otherwise look too light.
async function lineStyle(prefix, capHeight) {
  const family = FAMILIES.find((f) => f.id === $(prefix + 'Family').value);
  const weight = Number($(prefix + 'Weight').value);
  const italic = $(prefix + 'Italic').checked;
  const mode = $(prefix + 'Case').value;
  const font = await loadFont(family, weight, italic, capHeight);
  let small = null;
  if (mode === 'smallcaps') {
    const heavier = family.weights.find((w) => w > weight) || weight;
    const os2 = font.tables.os2;
    const ratio = os2 && os2.sxHeight && os2.sCapHeight ? Math.min(0.85, Math.max(0.65, (os2.sxHeight / os2.sCapHeight) * 1.04)) : 0.75;
    small = { font: await loadFont(family, heavier, italic, capHeight * ratio), ratio };
  }
  return { font, mode, small };
}

// Lay out text glyph by glyph (rather than font.getPath) so small caps can mix two
// fonts and sizes. Kerning applies between neighbors from the same font and size.
function layout(style, text, size) {
  const items = [...text].map((ch) => {
    if (style.mode === 'upper') return { font: style.font, ch: ch.toUpperCase(), size, track: ALL_CAPS_TRACKING * size };
    if (style.mode === 'smallcaps' && ch !== ch.toUpperCase()) {
      const s = size * style.small.ratio;
      return { font: style.small.font, ch: ch.toUpperCase(), size: s, track: SMALL_CAP_TRACKING * s };
    }
    return { font: style.font, ch, size, track: 0 };
  });
  const path = new opentype.Path();
  const missing = [];
  let x = 0;
  let prev = null;
  for (const item of items) {
    const glyph = item.font.charToGlyph(item.ch);
    if (item.ch !== ' ' && glyph.index === 0) missing.push(item.ch);
    const scale = item.size / item.font.unitsPerEm;
    if (prev && prev.font === item.font && prev.size === item.size) x += item.font.getKerningValue(prev.glyph, glyph) * scale;
    path.commands.push(...glyph.getPath(x, 0, item.size).commands);
    x += glyph.advanceWidth * scale + item.track;
    prev = { font: item.font, size: item.size, glyph };
  }
  // Tracking after the last glyph would skew centering.
  if (items.length) x -= items[items.length - 1].track;
  return { path, missing };
}

// Millimeters for a length string, or null if it doesn't parse.
function parseLength(text, signed) {
  const m = LENGTH_RE.exec(text);
  if (!m) return null;
  const [, sign, whole, num, den, unit] = m;
  if (den !== undefined && Number(den) === 0) return null;
  if (sign && !signed) return null;
  const value = (whole ? Number(whole) : 0) + Number(num) / (den !== undefined ? Number(den) : 1);
  return (sign === '-' ? -1 : 1) * value * UNIT_MM[(unit || 'in').toLowerCase()];
}

function readLength(el) {
  const mm = parseLength(el.value, el.classList.contains('signed'));
  el.classList.toggle('invalid', mm === null);
  const hint = el.parentElement.querySelector('.parsed');
  if (mm === null) {
    hint.textContent = '(?)';
    return;
  }
  lengths[el.id] = mm;
  hint.textContent = '(' + fmt(Number(mm.toFixed(2))) + ' mm)';
}

function fmt(n) {
  return Number(n.toFixed(3)).toString();
}

// Odd segment count, so both ends of an edge belong to the same panel.
function segmentCount(length, finger) {
  const n = 2 * Math.round((length / Math.max(finger, 1) - 1) / 2) + 1;
  return Math.max(3, n);
}

// Outline of one panel, clockwise in SVG (y-down) coordinates, origin at the panel's
// outer-face corner. x runs along the length Y, y across the face width X.
//
// Panels meet at 60 degrees. With square laser cuts, a panel's body must stop sqrt(3)*t
// from the outer corner to clear its neighbor's finger; a finger reaches to t/sqrt(3)
// from the corner to stay inside the outer surface ("flush"), or to the corner itself
// ("full", leaving a sliver to sand off). The top edge owns even segments and the
// bottom edge odd ones, so three identical panels close the triangle.
function panelOutline(X, Y, t, n, tips) {
  const slot = Math.sqrt(3) * t;
  const tip = tips === 'full' ? 0 : t / Math.sqrt(3);
  const w = Y / n;
  const top = (i) => (i % 2 === 0 ? tip : slot);
  const bottom = (i) => (i % 2 === 1 ? X - tip : X - slot);
  const pts = [[0, top(0)]];
  for (let i = 0; i < n; i++) {
    pts.push([(i + 1) * w, top(i)]);
    if (i < n - 1) pts.push([(i + 1) * w, top(i + 1)]);
  }
  pts.push([Y, bottom(n - 1)]);
  for (let i = n - 1; i >= 0; i--) {
    pts.push([i * w, bottom(i)]);
    if (i > 0) pts.push([i * w, bottom(i - 1)]);
  }
  return pts;
}

// Grow a rectilinear clockwise polygon outward by k (half the kerf). At a 90-degree
// corner, moving the vertex along the sum of both edge normals offsets both edges by k.
function offsetOutline(pts, k) {
  if (!k) return pts;
  const normal = (a, b) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    return [dy / len, -dx / len];
  };
  return pts.map((p, i) => {
    const prev = pts[(i - 1 + pts.length) % pts.length];
    const next = pts[(i + 1) % pts.length];
    const n1 = normal(prev, p);
    const n2 = normal(p, next);
    return [p[0] + k * (n1[0] + n2[0]), p[1] + k * (n1[1] + n2[1])];
  });
}

function capHeightRatio(font) {
  const cap = font.tables.os2 && font.tables.os2.sCapHeight;
  if (cap) return cap / font.unitsPerEm;
  const bb = font.charToGlyph('H').getBoundingBox();
  return (bb.y2 - bb.y1) / font.unitsPerEm || 0.7;
}

// Path data for a text line whose ink is centered horizontally on cx with its
// baseline at y. Returns null for empty text.
function textPath(style, text, capHeight, cx, baseline, maxWidth, transform) {
  if (!text) return null;
  let size = capHeight / capHeightRatio(style.font);
  let { path, missing } = layout(style, text, size);
  let bb = path.getBoundingBox();
  let shrunk = false;
  if (bb.x2 - bb.x1 > maxWidth) {
    size *= maxWidth / (bb.x2 - bb.x1);
    path = layout(style, text, size).path;
    bb = path.getBoundingBox();
    shrunk = true;
  }
  const dx = cx - (bb.x1 + bb.x2) / 2;
  const map = (x, y) => transform(x + dx, y + baseline);
  const d = path.commands.map((c) => {
    if (c.type === 'Z') return 'Z';
    const [x, y] = map(c.x, c.y);
    if (c.type === 'M' || c.type === 'L') return c.type + fmt(x) + ' ' + fmt(y);
    const [x1, y1] = map(c.x1, c.y1);
    if (c.type === 'Q') return 'Q' + fmt(x1) + ' ' + fmt(y1) + ' ' + fmt(x) + ' ' + fmt(y);
    const [x2, y2] = map(c.x2, c.y2);
    return 'C' + fmt(x1) + ' ' + fmt(y1) + ' ' + fmt(x2) + ' ' + fmt(y2) + ' ' + fmt(x) + ' ' + fmt(y);
  }).join('');
  return { d, shrunk, missing };
}

// --- 3D preview -------------------------------------------------------------
// World: X along the length, Y front-to-back, Z up. In cross-section (Y, Z) the
// prism's outer triangle has its apex A on top and the base corners F (front) and
// B (back). Each panel runs from its top edge to its bottom edge as front A->F,
// base F->B, back B->A, matching the cut sheet: a panel's top edge always meets
// the next panel's bottom edge.

const viewport = $('viewport');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
viewport.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080);
scene.add(new THREE.HemisphereLight(0xffffff, 0x505050, 1.4));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun, sun.target);

const desk = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0x6e6e6e, roughness: 1 }));
desk.receiveShadow = true;
scene.add(desk);

const camera = new THREE.PerspectiveCamera(30, 1, 1, 10000);
camera.up.set(0, 0, 1);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const model = new THREE.Group();
scene.add(model);
const edgeMaterial = new THREE.MeshStandardMaterial({ color: EDGE, roughness: 0.9 });
let lastFrame = null;

function grain(ctx, w, h) {
  // Deterministic streaks so the texture doesn't shimmer on every rebuild.
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 90; i++) {
    ctx.strokeStyle = rand() > 0.5 ? 'rgba(120, 80, 30, 0.10)' : 'rgba(255, 240, 210, 0.10)';
    ctx.lineWidth = 1 + rand() * 3;
    const y = rand() * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(w * 0.3, y + (rand() - 0.5) * 20, w * 0.7, y + (rand() - 0.5) * 20, w, y + (rand() - 0.5) * 10);
    ctx.stroke();
  }
}

function faceMaterial(X, Y, paths) {
  const scale = Math.min(8, 4096 / Y);
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(Y * scale);
  canvas.height = Math.ceil(X * scale);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = WOOD;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  grain(ctx, canvas.width, canvas.height);
  ctx.scale(scale, scale);
  ctx.fillStyle = BURN;
  (paths || []).forEach((d) => ctx.fill(new Path2D(d)));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // ExtrudeGeometry gives cap faces UVs equal to the shape's (x, y) in mm.
  texture.flipY = false;
  texture.repeat.set(1 / Y, 1 / X);
  return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
}

function updateModel(X, Y, t, outline, faces) {
  model.children.forEach((mesh) => {
    mesh.geometry.dispose();
    if (mesh.material[0].map) mesh.material[0].map.dispose();
    mesh.material[0].dispose();
  });
  model.clear();

  const h = (X * Math.sqrt(3)) / 2;
  const A = [0, h];
  const F = [-X / 2, 0];
  const B = [X / 2, 0];
  const shape = new THREE.Shape(outline.map((p) => new THREE.Vector2(p[0], p[1])));
  [[A, F], [B, A], [F, B]].forEach(([top, bottom], j) => {
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false });
    // Local x runs along the length, y from top edge to bottom edge, z inward.
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, (bottom[0] - top[0]) / X, (bottom[1] - top[1]) / X);
    const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis);
    const m = new THREE.Matrix4().makeBasis(xAxis, yAxis, zAxis).setPosition(-Y / 2, top[0], top[1]);
    geometry.applyMatrix4(m);
    const mesh = new THREE.Mesh(geometry, [faceMaterial(X, Y, faces[j]), edgeMaterial]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    model.add(mesh);
  });

  // Reframe only when the overall size changes, so editing text doesn't reset the view.
  const key = Math.round(X) + 'x' + Math.round(Y);
  if (key !== lastFrame) {
    lastFrame = key;
    const span = Math.max(X, Y);
    // Front three-quarter view from low on the left, so the open triangular end shows.
    camera.position.set(-span * 0.8, -span * 0.95, h + span * 0.22);
    controls.target.set(0, 0, h / 2.5);
    controls.update();
    desk.scale.set(span * 4, span * 4, 1);
    sun.position.set(-span * 0.6, -span * 0.9, span * 1.4);
    const cam = sun.shadow.camera;
    cam.left = cam.bottom = -span * 0.7;
    cam.right = cam.top = span * 0.7;
    cam.near = 1;
    cam.far = span * 4;
    cam.updateProjectionMatrix();
  }
}

function resize() {
  const w = viewport.clientWidth;
  const hh = viewport.clientHeight;
  if (!w || !hh) return; // tab hidden
  renderer.setSize(w, hh);
  camera.aspect = w / hh;
  camera.updateProjectionMatrix();
}

async function build() {
  const [titleStyle, subtitleStyle] = await Promise.all([lineStyle('title', lengths.titleSize), lineStyle('subtitle', lengths.subtitleSize)]);
  const X = lengths.faceWidth;
  const Y = lengths.length;
  const t = lengths.thickness;
  const k = lengths.kerf / 2;
  const tips = $('tips').value;
  const n = segmentCount(Y, lengths.fingerWidth);
  const slot = Math.sqrt(3) * t;
  const warnings = [];

  if (document.querySelector('input.length.invalid')) {
    $('info').textContent = 'Fix the highlighted lengths.';
    $('download').disabled = true;
    return;
  }
  if (X <= 2 * slot + 1) {
    $('info').textContent = 'Material is too thick for this face width: the joints need ' + fmt(2 * slot) + ' mm of the ' + fmt(X) + ' mm face.';
    $('download').disabled = true;
    return;
  }

  const outline = offsetOutline(panelOutline(X, Y, t, n, tips), k);
  const sheetW = Y + 2 * SHEET_MARGIN + 2 * k;
  const sheetH = 3 * X + 2 * PANEL_GAP + 2 * SHEET_MARGIN + 2 * k;
  const origin = (j) => [SHEET_MARGIN + k, SHEET_MARGIN + k + j * (X + PANEL_GAP)];

  const outline3d = panelOutline(X, Y, t, n, tips);
  const cut = [0, 1, 2].map((j) => {
    const [ox, oy] = origin(j);
    return '<path d="M' + outline.map((p) => fmt(p[0] + ox) + ' ' + fmt(p[1] + oy)).join('L') + 'Z"/>';
  });

  // Text block, centered between the joint zones of the face.
  const areaTop = slot + lengths.margin;
  const areaBottom = X - slot - lengths.margin;
  const maxWidth = Y - 2 * lengths.margin;
  const title = $('title').value.trim();
  const subtitle = $('subtitle').value.trim();
  const capT = title ? lengths.titleSize : 0;
  const capS = subtitle ? lengths.subtitleSize : 0;
  const gap = title && subtitle ? 0.6 * capT : 0;
  const blockTop = (areaTop + areaBottom) / 2 - (capT + gap + capS) / 2;
  if (capT + gap + capS > areaBottom - areaTop) warnings.push('text is taller than the face area');

  // Panel 0 is the front. Panel 1 is the back: it sits with its top edge toward the
  // base, so its text is rotated 180 degrees to read upright.
  const names = [];
  const titles = [];
  const faces = {}; // panel index -> path data in panel-local coordinates, for the 3D view
  const engraved = $('engraveBack').checked ? [0, 1] : [0];
  for (const j of engraved) {
    const [ox, oy] = origin(j);
    const local = j === 1 ? (x, y) => [Y - x, X - y] : (x, y) => [x, y];
    const text = (transform) => [
      textPath(titleStyle, title, capT, Y / 2, blockTop + capT + lengths.titleOffset, maxWidth, transform),
      textPath(subtitleStyle, subtitle, capS, Y / 2, blockTop + capT + gap + capS + lengths.subtitleOffset, maxWidth, transform),
    ];
    const [a, b] = text((x, y) => { const p = local(x, y); return [p[0] + ox, p[1] + oy]; });
    faces[j] = text(local).filter(Boolean).map((r) => r.d);
    if (a) names.push('<path d="' + a.d + '"/>');
    if (b) titles.push('<path d="' + b.d + '"/>');
    if (j === 0) {
      if ((a && a.shrunk) || (b && b.shrunk)) warnings.push('text was shrunk to fit the length');
      const missing = [...(a ? a.missing : []), ...(b ? b.missing : [])];
      if (missing.length) warnings.push('not in the font: ' + missing.join(' '));
    }
  }

  const layer = (id, label, attrs, body) =>
    '  <g id="' + id + '" inkscape:groupmode="layer" inkscape:label="' + label + '" ' + attrs + '>\n    ' + body.join('\n    ') + '\n  </g>';
  svgText = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="' + fmt(sheetW) + 'mm" height="' + fmt(sheetH) + 'mm" viewBox="0 0 ' + fmt(sheetW) + ' ' + fmt(sheetH) + '">',
    layer('layer-name', 'Name', 'fill="#000000" stroke="none"', names),
    layer('layer-title', 'Title', 'fill="#0000FF" stroke="none"', titles),
    layer('layer-cut', 'Cut', 'fill="none" stroke="#FF0000" stroke-width="' + CUT_STROKE + '"', cut),
    '</svg>',
  ].join('\n');

  $('sheet').innerHTML = svgText.replace(/^<\?xml[^>]*>\s*/, '');
  updateModel(X, Y, t, outline3d, faces);
  const inches = (mm) => fmt(mm / MM_PER_IN);
  $('info').textContent =
    'Sheet ' + fmt(sheetW) + ' × ' + fmt(sheetH) + ' mm (' + inches(sheetW) + ' × ' + inches(sheetH) + ' in). ' +
    'Standing height ' + fmt((X * Math.sqrt(3)) / 2) + ' mm. ' + n + ' fingers per edge. Panels top to bottom: front, back, base.' +
    (warnings.length ? '  Warning: ' + warnings.join('; ') + '.' : '');
  $('download').disabled = false;
}

let pending = false;
function scheduleBuild() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    build().catch((err) => { $('info').textContent = 'Error: ' + err.message; });
  });
}

// Weight list follows the family, keeping the closest weight to the current choice.
function fillWeights(prefix) {
  const family = FAMILIES.find((f) => f.id === $(prefix + 'Family').value);
  const select = $(prefix + 'Weight');
  const current = Number(select.value) || 400;
  select.innerHTML = '';
  family.weights.forEach((w) => select.add(new Option(w + ' ' + WEIGHT_NAMES[w], w)));
  select.value = family.weights.reduce((a, b) => (Math.abs(b - current) < Math.abs(a - current) ? b : a));
  $(prefix + 'Italic').disabled = !family.italic;
}

[['title', 700], ['subtitle', 400]].forEach(([prefix, weight]) => {
  FAMILIES.forEach((f) => $(prefix + 'Family').add(new Option(f.label, f.id)));
  $(prefix + 'Family').value = 'inter';
  $(prefix + 'Weight').add(new Option('', weight));
  $(prefix + 'Weight').value = weight;
  fillWeights(prefix);
  $(prefix + 'Family').addEventListener('change', () => { fillWeights(prefix); scheduleBuild(); });
});

// Restore saved fields once the font lists exist, then refit each weight list to its
// restored family.
const saved = persist('applets:deskplate:v1');
['title', 'subtitle'].forEach(fillWeights);
$('reset').addEventListener('click', () => saved.reset());

document.querySelectorAll('[role="tab"]').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('[role="tab"]').forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    $(t.dataset.panel).hidden = !selected;
  });
}));

document.querySelectorAll('input.length').forEach((el) => {
  readLength(el);
  el.addEventListener('input', () => {
    readLength(el);
    scheduleBuild();
  });
});
document.querySelectorAll('#title, #subtitle, #engraveBack, #tips, .weight, #titleItalic, #subtitleItalic, #titleCase, #subtitleCase').forEach((el) => el.addEventListener('input', scheduleBuild));

$('download').addEventListener('click', () => {
  const slug = ($('title').value.trim() || 'nameplate').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml' }));
  a.download = 'deskplate-' + (slug || 'nameplate') + '.svg';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

new ResizeObserver(resize).observe(viewport);
resize();
scheduleBuild();
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
