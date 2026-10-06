import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { persist } from '../persist.js';

// The typeface JSON fonts were dropped from the three npm package after 0.160.
const FONT_BASE = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/';
const LINE_GAP = 0.35; // fraction of line 1 size between lines
const OVERLAP = 0.02;  // mm the raised parts sink into the base so slicers fuse them
const CURVE_SEGMENTS = 32;

const $ = (id) => document.getElementById(id);
const num = (id) => Number($(id).value) || 0;

const viewport = $('viewport');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
viewport.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080);
scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.8);
sun.position.set(-40, -60, 120);
scene.add(sun);

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 5000);
camera.up.set(0, 0, 1); // Z-up, matching the slicer's build plate
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const baseMaterial = new THREE.MeshStandardMaterial({ roughness: 0.6 });
const textMaterial = new THREE.MeshStandardMaterial({ roughness: 0.6 });
const baseMesh = new THREE.Mesh(new THREE.BufferGeometry(), baseMaterial);
const textMesh = new THREE.Mesh(new THREE.BufferGeometry(), textMaterial);
scene.add(baseMesh, textMesh);

const loader = new FontLoader();
const fonts = {};
let lastSize = null;

function loadFont(name) {
  if (!fonts[name]) fonts[name] = loader.loadAsync(FONT_BASE + name + '.typeface.json');
  return fonts[name];
}

function roundedRect(shape, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function circle(cx, cy, r) {
  const path = new THREE.Path();
  path.absarc(cx, cy, r, 0, Math.PI * 2, true);
  return path;
}

function textLine(font, text, size, depth) {
  const geometry = new TextGeometry(text, { font, size, depth, curveSegments: 8 });
  geometry.computeBoundingBox();
  return geometry;
}

async function build() {
  const fontName = $('font').value;
  const font = await loadFont(fontName);
  if (fontName !== $('font').value) return; // a newer selection superseded this build

  const lines = [
    { text: $('line1').value.trim(), size: num('size1') },
    { text: $('line2').value.trim(), size: num('size2') },
  ].filter((l) => l.text);
  const base = Math.max(0.2, num('base'));
  const textHeight = Math.max(0.1, num('textHeight'));
  const padding = num('padding');
  const rim = num('rim');
  const holeMode = $('hole').value;
  const holeR = num('holeDia') / 2;
  // Keep a solid wall between the hole, the border, and the plate edge.
  const holeMargin = Math.max(2, rim + 1.5);

  const missing = new Set();
  lines.forEach((l) => [...l.text].forEach((c) => { if (c !== ' ' && !font.data.glyphs[c]) missing.add(c); }));

  // Lay out text lines top to bottom, centered, using each line's actual ink bounds.
  const gap = lines.length > 1 ? lines[0].size * LINE_GAP : 0;
  const parts = lines.map((l) => {
    const g = textLine(font, l.text, l.size, textHeight + OVERLAP);
    const bb = g.boundingBox;
    return { g, w: bb.max.x - bb.min.x, h: bb.max.y - bb.min.y, bb };
  });
  const textW = parts.length ? Math.max(...parts.map((p) => p.w)) : 20;
  const textH = parts.length ? parts.reduce((s, p) => s + p.h, 0) + gap * (parts.length - 1) : 8;

  let plateW = textW + padding * 2 + rim * 2;
  let plateH = textH + padding * 2 + rim * 2;
  let textOffsetX = 0;
  let textOffsetY = 0;
  let hole = null;
  if (holeMode === 'left') {
    const extra = holeR * 2 + holeMargin;
    plateW += extra;
    textOffsetX = extra / 2;
    hole = { x: -plateW / 2 + holeMargin + holeR, y: 0 };
  } else if (holeMode === 'top') {
    const extra = holeR * 2 + holeMargin;
    plateH += extra;
    textOffsetY = -extra / 2;
    hole = { x: 0, y: plateH / 2 - holeMargin - holeR };
  }

  const radius = num('radius');
  const plate = roundedRect(new THREE.Shape(), -plateW / 2, -plateH / 2, plateW, plateH, radius);
  if (hole) plate.holes.push(circle(hole.x, hole.y, holeR));
  const baseGeometry = new THREE.ExtrudeGeometry(plate, { depth: base, bevelEnabled: false, curveSegments: CURVE_SEGMENTS });

  const raised = [];
  let y = textOffsetY + textH / 2;
  parts.forEach((p, i) => {
    y -= p.h;
    p.g.translate(textOffsetX - p.w / 2 - p.bb.min.x, y - p.bb.min.y, base - OVERLAP);
    raised.push(p.g);
    if (i < parts.length - 1) y -= gap;
  });
  if (rim > 0) {
    const ring = roundedRect(new THREE.Shape(), -plateW / 2, -plateH / 2, plateW, plateH, radius);
    const inner = roundedRect(new THREE.Path(), -plateW / 2 + rim, -plateH / 2 + rim, plateW - rim * 2, plateH - rim * 2, Math.max(0, radius - rim));
    ring.holes.push(inner);
    const rimGeometry = new THREE.ExtrudeGeometry(ring, { depth: textHeight + OVERLAP, bevelEnabled: false, curveSegments: CURVE_SEGMENTS });
    rimGeometry.translate(0, 0, base - OVERLAP);
    raised.push(rimGeometry);
  }

  baseMesh.geometry.dispose();
  textMesh.geometry.dispose();
  baseMesh.geometry = baseGeometry;
  textMesh.geometry = raised.length ? mergeGeometries(raised) : new THREE.BufferGeometry();
  raised.forEach((g) => g.dispose());

  const size = [plateW, plateH, base + (raised.length ? textHeight : 0)].map((v) => v.toFixed(1));
  $('info').textContent = 'Size: ' + size.join(' × ') + ' mm' +
    (missing.size ? '  |  Not in this font, skipped: ' + [...missing].join(' ') : '');

  // Only reframe the camera when the plate size changes meaningfully.
  const key = Math.round(plateW) + 'x' + Math.round(plateH);
  if (key !== lastSize) {
    lastSize = key;
    const span = Math.max(plateW, plateH);
    camera.position.set(0, -span * 1.1, span * 1.3);
    controls.target.set(0, 0, base);
    controls.update();
  }
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

function applyColors() {
  baseMaterial.color.set($('baseColor').value);
  textMaterial.color.set($('textColor').value);
}

function resize() {
  const w = viewport.clientWidth;
  const h = viewport.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function filename(suffix) {
  const slug = ($('line1').value.trim() || 'nametag').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return 'nametag-' + (slug || 'tag') + suffix + '.stl';
}

function download(meshes, suffix) {
  const group = new THREE.Group();
  meshes.forEach((m) => group.add(new THREE.Mesh(m.geometry)));
  const data = new STLExporter().parse(group, { binary: true });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'model/stl' }));
  a.download = filename(suffix);
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

$('dl-all').addEventListener('click', () => download([baseMesh, textMesh], ''));
$('dl-base').addEventListener('click', () => download([baseMesh], '-base'));
$('dl-text').addEventListener('click', () => download([textMesh], '-text'));

document.querySelectorAll('input, select').forEach((el) => {
  if (el.type === 'color') el.addEventListener('input', applyColors);
  else el.addEventListener('input', scheduleBuild);
});

const saved = persist('applets:nametag:v1');
$('reset').addEventListener('click', () => saved.reset());

new ResizeObserver(resize).observe(viewport);
resize();
applyColors();
scheduleBuild();

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
