// Fetches live ratings from public Chess.com and Lichess APIs.
// Updates any element with a matching [data-stat] attribute on the page.
// Fails silently — hardcoded fallback values stay visible if fetch fails.

const CHESS_USER   = 'iamxdaemon';
const LICHESS_USER = 'iamxdaemon';

function set(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

async function fetchChess() {
  const res  = await fetch(`https://api.chess.com/pub/player/${CHESS_USER}/stats`);
  const data = await res.json();
  const rapid  = data?.chess_rapid?.last?.rating;
  const blitz  = data?.chess_blitz?.last?.rating;
  const bullet = data?.chess_bullet?.last?.rating;
  if (rapid)  set('[data-stat="chess-rapid"]',  rapid);
  if (blitz)  set('[data-stat="chess-blitz"]',  blitz);
  if (bullet) set('[data-stat="chess-bullet"]', bullet);
}

async function fetchLichess() {
  const res  = await fetch(`https://lichess.org/api/user/${LICHESS_USER}`);
  const data = await res.json();
  const bullet = data?.perfs?.bullet?.rating;
  const blitz  = data?.perfs?.blitz?.rating;
  const rapid  = data?.perfs?.rapid?.rating;
  if (bullet) set('[data-stat="lichess-bullet"]', bullet);
  if (blitz)  set('[data-stat="lichess-blitz"]',  blitz);
  if (rapid)  set('[data-stat="lichess-rapid"]',  rapid);
}

export function init() {
  // Only fetch if the page actually has stat placeholders
  if (document.querySelector('[data-stat]')) {
    fetchChess().catch(() => {});
    fetchLichess().catch(() => {});
  }
}
