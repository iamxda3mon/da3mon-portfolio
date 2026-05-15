let videoEl      = null;
let tMusicTarget = 0;
let tMusicSmooth = 0;
let frameId;
let prev = 0;

function smoothstep(t) { return t * t * (3 - 2 * t); }

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  videoEl = document.getElementById('music-video');
  prev    = performance.now();

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
}

function animate() {
  frameId = requestAnimationFrame(animate);

  const now   = performance.now();
  const delta = Math.min((now - prev) / 1000, 0.05);
  prev = now;

  tMusicSmooth += (tMusicTarget - tMusicSmooth) * Math.min(1, delta * 2.8);

  if (videoEl) {
    videoEl.style.opacity = smoothstep(tMusicSmooth);
  }
}

export function dispose() {
  cancelAnimationFrame(frameId);
  window.removeEventListener('scroll', onScroll);
  videoEl      = null;
  tMusicTarget = 0;
  tMusicSmooth = 0;
}
