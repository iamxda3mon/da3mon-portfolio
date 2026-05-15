let playerCard   = null;
let bgLeft       = null;
let bgRight      = null;
let tMusicTarget = 0;
let tMusicSmooth = 0;
let frameId;
let prev = 0;

function smoothstep(t) { return t * t * (3 - 2 * t); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  playerCard = document.getElementById('music-player-card');
  bgLeft   = document.querySelector('.parallax-bg--left');
  bgRight  = document.querySelector('.parallax-bg--right');
  prev     = performance.now();

  window.addEventListener('scroll', onScroll, { passive: true });
  updateTarget();
  animate();
}

function onScroll() {
  updateTarget();
}

function updateTarget() {
  const rel    = window.scrollY / window.innerHeight;
  tMusicTarget = Math.max(0, Math.min(1, rel - 1));

  if (bgLeft)  bgLeft.style.opacity  = clamp(rel, 0, 1);
  if (bgRight) bgRight.style.opacity = clamp(2 - rel, 0, 1);
}

function animate() {
  frameId = requestAnimationFrame(animate);

  const now   = performance.now();
  const delta = Math.min((now - prev) / 1000, 0.05);
  prev = now;

  tMusicSmooth += (tMusicTarget - tMusicSmooth) * Math.min(1, delta * 2.8);

  if (playerCard) {
    playerCard.style.opacity = smoothstep(tMusicSmooth);
  }
}

export function dispose() {
  cancelAnimationFrame(frameId);
  window.removeEventListener('scroll', onScroll);
  playerCard   = null;
  bgLeft       = null;
  bgRight      = null;
  tMusicTarget = 0;
  tMusicSmooth = 0;
}
