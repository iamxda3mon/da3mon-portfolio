// Hero section fade/scale tied directly to scroll position.
// No GSAP dependency — avoids CDN MIME/CSP issues and keeps parity
// with the native scroll system already used in axis.js.

let secHero = null;
let musHero = null;
let frameId = null;

function update() {
  frameId = requestAnimationFrame(update);

  const sy = window.scrollY;
  const ih = window.innerHeight;

  // Security hero: fully visible at scrollY=0, invisible at scrollY=ih
  const tSec  = Math.max(0, Math.min(1, sy / ih));
  secHero.style.opacity   = 1 - tSec;
  secHero.style.transform = `translateY(${tSec * 28}px) scale(${1 - tSec * 0.04})`;

  // Music hero: invisible at scrollY=ih, fully visible at scrollY=2*ih
  const tMus  = Math.max(0, Math.min(1, (sy - ih) / ih));
  musHero.style.opacity   = tMus;
  musHero.style.transform = `translateY(${(1 - tMus) * -28}px) scale(${0.96 + tMus * 0.04})`;
}

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  secHero = document.querySelector('.security-hero');
  musHero = document.querySelector('.music-hero');
  if (!secHero || !musHero) return;

  frameId = requestAnimationFrame(update);
}

export function dispose() {
  cancelAnimationFrame(frameId);
  if (secHero) { secHero.style.opacity = ''; secHero.style.transform = ''; }
  if (musHero) { musHero.style.opacity = ''; musHero.style.transform = ''; }
  frameId = secHero = musHero = null;
}
