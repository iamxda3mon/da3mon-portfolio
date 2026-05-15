import * as THREE from 'three';

let C_LOW  = new THREE.Color('#D07D2E');
let C_MID  = new THREE.Color('#D29C24');
let C_HIGH = new THREE.Color('#D8B577');

let isLight = false;

const BASE_SPEED   = 0.0005;
const SCROLL_DECAY = 0.90;

function smoothstep(t) { return t * t * (3 - 2 * t); }

let renderer, scene, camera;
let outer, inner;
let videoEl       = null;
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

function syncClearColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg-primary').trim();
  renderer.setClearColor(new THREE.Color(raw), 1);
}

function syncTheme() {
  isLight = document.documentElement.getAttribute('data-theme') === 'light';
  syncClearColor();

  if (isLight) {
    C_LOW.set('#C4510E');
    C_MID.set('#B08015');
    C_HIGH.set('#8B6520');
  } else {
    C_LOW.set('#D07D2E');
    C_MID.set('#D29C24');
    C_HIGH.set('#D8B577');
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

  videoEl = document.getElementById('music-video');

  const canvas = document.createElement('canvas');
  canvas.className = 'axis-canvas';
  document.body.appendChild(canvas);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  themeObserver = new MutationObserver(() => syncTheme());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0.5, 5.0);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

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

  lastScrollY = window.scrollY;
  prev        = performance.now();

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll, { passive: true });

  syncTheme();
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
  tMusicTarget = Math.max(0, Math.min(1, rel - 1));
  tSecTarget   = Math.max(0, Math.min(1, 1 - rel));
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

  const tS    = smoothstep(tMusicSmooth);
  const tIco  = smoothstep(Math.min(1, Math.max(tMusicSmooth, tSecSmooth) * 2.2));
  const icoFade = 1 - tIco;

  const icoSpeed = BASE_SPEED + scrollVelocity;

  camera.position.set(0, 0.5 + tS * 3.0, 5.0 + tS * 0.5);
  camera.lookAt(0, -0.5 * tS, -1.5 * tS);

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

  if (videoEl) {
    videoEl.style.opacity = tS * (isLight ? 0.20 : 0.18);
  }

  renderer.render(scene, camera);
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
  if (outer)   { outer.geometry.dispose();  outer.material.dispose(); }
  if (inner)   { inner.geometry.dispose();  inner.material.dispose(); }
  if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
  renderer = scene = camera = outer = inner = videoEl = null;
  scrollVelocity = 0; tMusicTarget = 0; tMusicSmooth = 0; tSecTarget = 0; tSecSmooth = 0; time = 0;
}
