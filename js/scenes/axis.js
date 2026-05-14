import * as THREE from 'three';

// Mutable palette — swapped by syncTheme() on theme change
let C_LOW  = new THREE.Color('#D07D2E');
let C_MID  = new THREE.Color('#D29C24');
let C_HIGH = new THREE.Color('#D8B577');

let isLight = false;

const BASE_SPEED   = 0.0005;
const SCROLL_DECAY = 0.90;

// Net grid dimensions
const COLS   = 70;    // points along x (left → right, time axis)
const ROWS   = 20;    // points along z (back → front, depth axis)
const X_SPAN = 8.5;
const Z_SPAN = 4.2;
const MAX_AMP = 0.52; // used for colour normalisation

// Pre-built segment counts — horizontal segments + vertical segments
const H_SEGS    = ROWS * (COLS - 1);
const V_SEGS    = COLS * (ROWS - 1);
const TOTAL_SEGS = H_SEGS + V_SEGS;

function smoothstep(t) { return t * t * (3 - 2 * t); }

// y displacement for one grid point.
// Each z-row has a different frequency so the surface reads like a spectrogram:
// back rows = long slow waves, front rows = short fast ripples.
function waveY(col, row, t) {
  const x     = -X_SPAN * 0.5 + X_SPAN * (col / (COLS - 1));
  const zNorm = row / (ROWS - 1);                     // 0 = back, 1 = front

  // Frequency increases from back to front — spectrogram feel
  const freq  = 0.30 + zNorm * 2.10;
  const speed = 0.08 + zNorm * 0.04;

  // Bell amplitude envelope across z: centre rows tallest, edges shortest
  const amp   = 0.14 + 0.38 * Math.sin(zNorm * Math.PI);

  // Primary wave + small harmonic for organic shape
  return amp * (
      Math.sin(x * freq        + t * speed)        * 0.72
    + Math.sin(x * freq * 1.87 + t * speed * 1.30) * 0.28
  );
}

// Edge-fade lookup tables — precomputed in init(), static thereafter
// Values go 0 at the boundary → 1 by ~18% inward, smoothstepped
let colFade = null;
let rowFade = null;

let renderer, scene, camera;
let outer, inner;
let netMesh      = null;
let netPos       = null;
let netCol       = null;
let gridY        = null;
let themeObserver = null;
let frameId;
let time            = 0;
let prev            = 0;
let scrollVelocity  = 0;
let lastScrollY     = 0;
let tMusicTarget    = 0;
let tMusicSmooth    = 0;
let tSecTarget      = 0;
let tSecSmooth      = 0;

const _c = new THREE.Color();   // reusable colour for lerp, avoids GC

function syncClearColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg-primary').trim();
  renderer.setClearColor(new THREE.Color(raw), 1);
}

function syncTheme() {
  isLight = document.documentElement.getAttribute('data-theme') === 'light';
  syncClearColor();

  if (isLight) {
    // Saturated orange → amber → dark gold: visible and colorful on beige
    C_LOW.set('#C4510E');
    C_MID.set('#B08015');
    C_HIGH.set('#8B6520');
  } else {
    C_LOW.set('#D07D2E');
    C_MID.set('#D29C24');
    C_HIGH.set('#D8B577');
  }

  if (netMesh) {
    netMesh.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
    netMesh.material.needsUpdate = true;
  }

  if (outer) {
    outer.material.color.set(isLight ? '#7D5510' : '#D29C24');
    inner.material.color.set(isLight ? '#9E3D08' : '#D07D2E');
    outer.material.needsUpdate = true;
    inner.material.needsUpdate = true;
  }
}

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'axis-canvas';
  document.body.appendChild(canvas);

  // Opaque canvas: clear colour is set to --bg-primary so that edge-faded
  // lines (colour → 0) blend into the page background, not a dark overlay.
  renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  themeObserver = new MutationObserver(() => syncTheme());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0.5, 5.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  // ── Icosahedra — landing ───────────────────────────────────────────────────
  outer = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.7, 1)),
    new THREE.LineBasicMaterial({ color: '#D29C24', transparent: true, opacity: 0.18 })
  );
  scene.add(outer);

  inner = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.0, 0)),
    new THREE.LineBasicMaterial({ color: '#D07D2E', transparent: true, opacity: 0.50 })
  );
  scene.add(inner);

  // ── Edge-fade tables ──────────────────────────────────────────────────────
  // Ramp from 0 at the grid boundary to 1 by 18% inward, then smoothstepped
  colFade = new Float32Array(COLS);
  rowFade = new Float32Array(ROWS);
  for (let c = 0; c < COLS; c++) {
    const t = Math.min(c, COLS - 1 - c) / (COLS * 0.18);
    colFade[c] = smoothstep(Math.min(1, t));
  }
  for (let r = 0; r < ROWS; r++) {
    const t = Math.min(r, ROWS - 1 - r) / (ROWS * 0.18);
    rowFade[r] = smoothstep(Math.min(1, t));
  }

  // ── Sound-wave net — music ─────────────────────────────────────────────────
  // Pre-allocate all buffers once; update values each frame (no GC pressure)
  gridY  = new Float32Array(COLS * ROWS);
  netPos = new Float32Array(TOTAL_SEGS * 2 * 3);
  netCol = new Float32Array(TOTAL_SEGS * 2 * 3);

  const netGeo = new THREE.BufferGeometry();
  netGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3));
  netGeo.setAttribute('color',    new THREE.BufferAttribute(netCol, 3));

  netMesh = new THREE.LineSegments(netGeo, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent:  true,
    opacity:      0,
    blending:     THREE.AdditiveBlending,
    depthWrite:   false,
  }));
  scene.add(netMesh);

  lastScrollY = window.scrollY;
  prev        = performance.now();

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll, { passive: true });

  syncTheme();  // sets clear color, palette, and blending for current theme
  onResize();
  updateMorph();
  animate();
}

function onScroll() {
  const delta = Math.abs(window.scrollY - lastScrollY);
  lastScrollY     = window.scrollY;
  scrollVelocity  = Math.min(scrollVelocity + delta * 0.00018, 0.007);
  updateMorph();
}

function updateMorph() {
  const rel  = window.scrollY / window.innerHeight;
  tMusicTarget = Math.max(0, Math.min(1, rel - 1));   // scroll down → music
  tSecTarget   = Math.max(0, Math.min(1, 1 - rel));   // scroll up   → security
}

function animate() {
  frameId = requestAnimationFrame(animate);

  const now   = performance.now();
  const delta = Math.min((now - prev) / 1000, 0.05);
  prev   = now;
  time  += delta;

  scrollVelocity *= SCROLL_DECAY;
  tMusicSmooth   += (tMusicTarget - tMusicSmooth) * Math.min(1, delta * 2.8);
  tSecSmooth     += (tSecTarget   - tSecSmooth)   * Math.min(1, delta * 2.8);

  const tS = smoothstep(tMusicSmooth);
  // Icosahedra fade in either direction — whichever transition is further along wins
  const tIco    = smoothstep(Math.min(1, Math.max(tMusicSmooth, tSecSmooth) * 2.2));
  const icoFade = 1 - tIco;

  const icoSpeed    = BASE_SPEED + scrollVelocity;
  const scrollBoost = 1 + scrollVelocity * 5;

  // ── Camera: rises and tilts forward as music section comes in ────────────
  // Landing: (0, 0.5, 5.0) front-on   →   Music: (0, 3.5, 5.5) overhead
  camera.position.set(0, 0.5 + tS * 3.0, 5.0 + tS * 0.5);
  camera.lookAt(0, -0.5 * tS, -1.5 * tS);

  // ── Icosahedra ────────────────────────────────────────────────────────────
  outer.visible = icoFade > 0.01;
  inner.visible = icoFade > 0.01;
  if (outer.visible) {
    outer.scale.setScalar(1 - tIco * 0.3);
    outer.material.opacity = (isLight ? 0.32 : 0.18) * icoFade;
    inner.scale.setScalar(1 - tIco * 0.3);
    inner.material.opacity = (isLight ? 0.70 : 0.50) * icoFade;
    outer.rotation.y += icoSpeed;
    outer.rotation.x += icoSpeed * 0.28;
    inner.rotation.y -= icoSpeed * 0.6;
    inner.rotation.x += icoSpeed * 0.18;
  }

  // ── Sound-wave net ────────────────────────────────────────────────────────
  netMesh.material.opacity = (isLight ? 0.55 : 0.80) * tS;
  netMesh.visible          = tS > 0.01;

  if (netMesh.visible) {
    const t = time * scrollBoost;

    // Step 1: compute y for every grid vertex (reuse pre-allocated array)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        gridY[r * COLS + c] = waveY(c, r, t) * tS;
      }
    }

    let vi = 0;  // current vertex index (counts pairs of floats×3)

    // Step 2: horizontal segments — connect adjacent columns within each row
    for (let r = 0; r < ROWS; r++) {
      const z = -Z_SPAN * 0.5 + Z_SPAN * (r / (ROWS - 1));
      for (let c = 0; c < COLS - 1; c++) {
        const x0 = -X_SPAN * 0.5 + X_SPAN * (c       / (COLS - 1));
        const x1 = -X_SPAN * 0.5 + X_SPAN * ((c + 1) / (COLS - 1));
        const y0 = gridY[r * COLS + c];
        const y1 = gridY[r * COLS + c + 1];

        netPos[vi * 3]     = x0; netPos[vi * 3 + 1] = y0; netPos[vi * 3 + 2] = z;
        netPos[vi * 3 + 3] = x1; netPos[vi * 3 + 4] = y1; netPos[vi * 3 + 5] = z;

        const zf = rowFade[r];
        setVertexColor(vi,     y0, colFade[c]     * zf);
        setVertexColor(vi + 1, y1, colFade[c + 1] * zf);
        vi += 2;
      }
    }

    // Step 3: vertical segments — connect adjacent rows within each column
    for (let c = 0; c < COLS; c++) {
      const x = -X_SPAN * 0.5 + X_SPAN * (c / (COLS - 1));
      for (let r = 0; r < ROWS - 1; r++) {
        const z0 = -Z_SPAN * 0.5 + Z_SPAN * (r       / (ROWS - 1));
        const z1 = -Z_SPAN * 0.5 + Z_SPAN * ((r + 1) / (ROWS - 1));
        const y0 = gridY[r       * COLS + c];
        const y1 = gridY[(r + 1) * COLS + c];

        netPos[vi * 3]     = x; netPos[vi * 3 + 1] = y0; netPos[vi * 3 + 2] = z0;
        netPos[vi * 3 + 3] = x; netPos[vi * 3 + 4] = y1; netPos[vi * 3 + 5] = z1;

        const xf = colFade[c];
        setVertexColor(vi,     y0, xf * rowFade[r]);
        setVertexColor(vi + 1, y1, xf * rowFade[r + 1]);
        vi += 2;
      }
    }

    netMesh.geometry.attributes.position.needsUpdate = true;
    netMesh.geometry.attributes.color.needsUpdate    = true;
  }

  renderer.render(scene, camera);
}

// Map y amplitude → accent colour, scale by edge fade, write into netCol
function setVertexColor(vi, y, fade) {
  const t = Math.max(0, Math.min(1, (y + MAX_AMP) / (2 * MAX_AMP)));
  if (t < 0.5) {
    _c.lerpColors(C_LOW, C_MID, t * 2);
  } else {
    _c.lerpColors(C_MID, C_HIGH, (t - 0.5) * 2);
  }
  netCol[vi * 3]     = _c.r * fade;
  netCol[vi * 3 + 1] = _c.g * fade;
  netCol[vi * 3 + 2] = _c.b * fade;
}

function onResize() {
  if (!renderer) return;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

export function dispose() {
  cancelAnimationFrame(frameId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
  if (themeObserver) { themeObserver.disconnect(); themeObserver = null; }
  if (outer)   { outer.geometry.dispose();    outer.material.dispose(); }
  if (inner)   { inner.geometry.dispose();    inner.material.dispose(); }
  if (netMesh) { netMesh.geometry.dispose();  netMesh.material.dispose(); }
  if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
  renderer = scene = camera = outer = inner = netMesh = netPos = netCol = gridY = colFade = rowFade = frameId = null;
  scrollVelocity = 0; tMusicTarget = 0; tMusicSmooth = 0; tSecTarget = 0; tSecSmooth = 0; time = 0;
}
