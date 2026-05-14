import './nav.js';
import { init }        from './scenes/axis.js';
import { init as initTerminal } from './terminal.js';

init();
initTerminal();
window.scrollTo({ top: window.innerHeight, behavior: 'instant' });
