import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Security hero — fades in as viewport moves up into the section.
  // Trigger range: scrollY=0 (section fills screen) → scrollY=innerHeight (landing).
  // fromVars at start (scrollY=0): fully visible.
  // toVars at end (scrollY=innerHeight): invisible + shifted down.
  // Reverse scroll (up) therefore reveals the hero.
  gsap.fromTo('.security-hero',
    { opacity: 1, y: 0, scale: 1 },
    {
      opacity: 0,
      y: 28,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: '#security',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    }
  );

  // Music hero — fades in as viewport scrolls down into the section.
  // Trigger range: scrollY=innerHeight (landing) → scrollY=2*innerHeight (music).
  gsap.fromTo('.music-hero',
    { opacity: 0, y: -28, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#music',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
      },
    }
  );
}

export function dispose() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}
