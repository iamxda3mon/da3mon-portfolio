const TRACK_URI = 'spotify:track:1qfwUptRW9Bzg5sUIs5zAt';

let controller = null;
let playing    = false;

function whenApiReady(cb) {
    if (window._spotifyApi) cb(window._spotifyApi);
    else window._onSpotifyApi = cb;
}

export function init() {
    const btn    = document.getElementById('spotify-play-btn');
    const tile   = document.getElementById('spotify-tile');
    const target = document.getElementById('spotify-embed-target');

    if (!btn || !tile || !target) return;

    btn.addEventListener('click', () => {
        if (!controller) {
            whenApiReady(api => {
                api.createController(target, { uri: TRACK_URI }, ctrl => {
                    controller = ctrl;
                    controller.play();
                    playing = true;
                    tile.classList.add('is-playing');
                    btn.setAttribute('aria-label', 'Pause Sea Machine');
                });
            });
            return;
        }

        if (playing) {
            controller.pause();
            playing = false;
            tile.classList.remove('is-playing');
            btn.setAttribute('aria-label', 'Play Sea Machine');
        } else {
            controller.play();
            playing = true;
            tile.classList.add('is-playing');
            btn.setAttribute('aria-label', 'Pause Sea Machine');
        }
    });
}
