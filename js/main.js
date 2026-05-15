import './nav.js';
import { init }                        from './scenes/axis.js';
import { init as initTerminal }        from './terminal.js';
import { init as initStreamingPlayers} from './streaming-players.js';

window.scrollTo({ top: window.innerHeight, behavior: 'instant' });

init();
initTerminal();
initStreamingPlayers();

// Dynamic import so a GSAP/CDN failure can't crash the 3D animations
import('./scroll-anim.js').then(m => m.init()).catch(e => console.warn('scroll-anim:', e));
