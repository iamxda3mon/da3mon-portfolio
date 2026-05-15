const PROMPT_HTML =
  '<span class="ts-user">kali@da3mon</span>' +
  '<span class="ts-sep">:~$ </span>';

const SESSIONS = [
  {
    cmd: 'nmap -sV --open -T4 10.10.14.23',
    lines: [
      { t: '',                                                                         c: '',     p: 140 },
      { t: 'Starting Nmap 7.94 ( https://nmap.org ) at 2026-05-14 10:23 UTC',        c: 'dim',  p: 80  },
      { t: 'Nmap scan report for 10.10.14.23',                                        c: '',     p: 60  },
      { t: 'Host is up (0.048s latency).',                                            c: '',     p: 80  },
      { t: 'Not shown: 995 closed tcp ports (conn-refused)',                          c: 'dim',  p: 100 },
      { t: 'PORT      STATE  SERVICE   VERSION',                                      c: 'hdr',  p: 50  },
      { t: '22/tcp    open   ssh       OpenSSH 8.9p1 Ubuntu (protocol 2.0)',          c: 'port', p: 90  },
      { t: '80/tcp    open   http      Apache httpd 2.4.52 ((Ubuntu))',               c: 'port', p: 90  },
      { t: '443/tcp   open   ssl/http  nginx 1.18.0 (Ubuntu)',                        c: 'port', p: 90  },
      { t: '3306/tcp  open   mysql     MySQL 8.0.31-0ubuntu0.22.04.1',               c: 'port', p: 90  },
      { t: '8080/tcp  open   http      Apache Tomcat/Coyote JSP engine 1.1',          c: 'port', p: 160 },
      { t: '',                                                                         c: '',     p: 70  },
      { t: 'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel',                c: 'dim',  p: 80  },
      { t: '',                                                                         c: '',     p: 70  },
      { t: 'Nmap done: 1 IP address (1 host up) scanned in 23.45 seconds',           c: 'done', p: 0   },
    ],
  },
  {
    cmd: 'hashcat -m 0 -a 0 3d8f2a4c1e7b0d9f5a2c6b8e0d4f7a1c rockyou.txt',
    lines: [
      { t: '',                                                  c: '',     p: 120 },
      { t: 'hashcat (v6.2.6) starting...',                     c: 'dim',  p: 200 },
      { t: '',                                                  c: '',     p: 80  },
      { t: 'Device #1: Intel i9-9900K, 16MCU',                c: 'dim',  p: 160 },
      { t: '',                                                  c: '',     p: 60  },
      { t: 'Keyspace..: 14344384',                             c: 'dim',  p: 1400 },
      { t: '',                                                  c: '',     p: 60  },
      { t: '3d8f2a4c1e7b0d9f5a2c6b8e0d4f7a1c:flag{w3lc0me}', c: 'open', p: 220 },
      { t: '',                                                  c: '',     p: 60  },
      { t: 'Status...........: Cracked',                       c: 'done', p: 60  },
      { t: 'Hash.Mode........: 0 (MD5)',                       c: 'dim',  p: 60  },
      { t: 'Recovered........: 1/1 (100.00%)',                 c: 'done', p: 0   },
    ],
  },
  {
    cmd: 'help',
    lines: [
      { t: '',                                          c: '',    p: 80  },
      { t: 'cd <section>   navigate to a section',     c: 'dim', p: 60  },
      { t: 'ls             list sections',              c: 'dim', p: 60  },
      { t: 'exit           leave interactive mode',     c: 'dim', p: 60  },
      { t: '',                                          c: '',    p: 60  },
      { t: 'click terminal to start typing',            c: 'hdr', p: 0   },
    ],
  },
];

const NAV_MAP = {
  music:    'html/music.html',
  security: 'html/security.html',
  about:    'html/about.html',
  contact:  'html/contact.html',
};

let win      = null;
let output   = null;
let timer    = null;
let phase    = 'idle';
let sessionI = 0;
let charI    = 0;
let lineI    = 0;
let cmdEl    = null;
let curEl    = null;

// ── Interactive mode ─────────────────────────────────────
let interactive = false;
let inputBuf    = '';
let inputEl     = null;
let inputCurEl  = null;

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Playback ─────────────────────────────────────────────

function startTyping() {
  phase = 'typing';
  charI = 0;

  const row = document.createElement('div');
  row.className = 'ts-row';
  row.innerHTML  = PROMPT_HTML;

  cmdEl = document.createElement('span');
  curEl = document.createElement('span');
  curEl.className  = 'ts-cursor ts-blink';
  curEl.textContent = '▋';

  row.appendChild(cmdEl);
  row.appendChild(curEl);
  output.appendChild(row);

  typeChar();
}

function typeChar() {
  const cmd = SESSIONS[sessionI].cmd;
  if (charI < cmd.length) {
    cmdEl.textContent = cmd.slice(0, ++charI);
    timer = setTimeout(typeChar, 50 + Math.random() * 40);
  } else {
    curEl.classList.remove('ts-blink');
    curEl.textContent = '';
    phase = 'printing';
    timer = setTimeout(printLine, 750);
  }
}

function printLine() {
  const { lines } = SESSIONS[sessionI];

  if (lineI >= lines.length) {
    if (sessionI + 1 < SESSIONS.length) {
      sessionI++;
      lineI = 0;
      timer = setTimeout(startTyping, 1200);
    } else {
      const end = document.createElement('div');
      end.className = 'ts-row';
      end.innerHTML  = PROMPT_HTML + '<span class="ts-cursor ts-blink">▋</span>';
      output.appendChild(end);
      phase = 'done';
    }
    return;
  }

  const { t, c, p } = lines[lineI++];
  const div = document.createElement('div');
  div.className = 'ts-row' + (c ? ' ts-' + c : '');

  let inner = esc(t);
  if (c === 'port') inner = inner.replace('open', '<span class="ts-open">open</span>');
  div.innerHTML = inner || ' ';

  output.appendChild(div);
  timer = setTimeout(printLine, p + 50 + Math.random() * 40);
}

function start() {
  phase    = 'idle';
  sessionI = 0;
  lineI    = 0;
  charI    = 0;
  output.innerHTML = '';
  cmdEl = curEl = null;
  startTyping();
}

function reset() {
  clearTimeout(timer);
  phase    = 'idle';
  sessionI = 0;
  lineI    = 0;
  charI    = 0;
  if (output) output.innerHTML = '';
  cmdEl = curEl = null;
  exitInteractive();
}

// ── Interactive mode ─────────────────────────────────────

function enterInteractive() {
  if (interactive) return;
  interactive = true;
  clearTimeout(timer);
  output.innerHTML = '';
  win.classList.add('interactive');
  appendInputRow();
  window.addEventListener('keydown', handleKey);
}

function exitInteractive() {
  if (!interactive) return;
  interactive = false;
  inputBuf   = '';
  inputEl    = null;
  inputCurEl = null;
  win.classList.remove('interactive');
  window.removeEventListener('keydown', handleKey);
}

function appendInputRow() {
  const row = document.createElement('div');
  row.className = 'ts-row';
  row.innerHTML = PROMPT_HTML;

  inputEl    = document.createElement('span');
  inputCurEl = document.createElement('span');
  inputCurEl.className  = 'ts-cursor ts-blink';
  inputCurEl.textContent = '▋';

  row.appendChild(inputEl);
  row.appendChild(inputCurEl);
  output.appendChild(row);
}

function handleKey(e) {
  if (!interactive) return;

  if (e.key === 'Escape') {
    exitInteractive();
    start();
    return;
  }

  if (e.key === 'Enter') {
    if (inputCurEl) { inputCurEl.remove(); inputCurEl = null; }
    const cmd = inputBuf.trim();
    inputBuf  = '';
    inputEl   = null;
    execCommand(cmd);
    return;
  }

  if (e.key === 'Backspace') {
    e.preventDefault();
    inputBuf = inputBuf.slice(0, -1);
    if (inputEl) inputEl.textContent = inputBuf;
    return;
  }

  if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
      e.key === 'PageUp' || e.key === 'PageDown') {
    e.preventDefault();
  }

  if (e.key.length === 1) {
    inputBuf += e.key;
    if (inputEl) inputEl.textContent = inputBuf;
  }
}

function printResponse(text, cls) {
  const div = document.createElement('div');
  div.className = 'ts-row' + (cls ? ' ts-' + cls : '');
  div.textContent = text;
  output.appendChild(div);
}

function execCommand(cmd) {
  const parts   = cmd.toLowerCase().split(/\s+/);
  const command = parts[0];
  const arg     = parts.slice(1).join(' ');

  if (command === '') {
    appendInputRow();
    return;
  }

  if (command === 'cd') {
    const dest = NAV_MAP[arg];
    if (dest) {
      printResponse(`Navigating to /${arg}...`, 'done');
      setTimeout(() => { window.location.href = dest; }, 700);
    } else if (arg === '..' || arg === '/' || arg === '~') {
      printResponse('Already at root.', 'dim');
      appendInputRow();
    } else if (arg === '') {
      appendInputRow();
    } else {
      printResponse(`cd: ${arg}: No such directory`, 'dim');
      appendInputRow();
    }
    return;
  }

  if (command === 'ls') {
    printResponse('music/  security/  about/  contact/', 'hdr');
    appendInputRow();
    return;
  }

  if (command === 'help') {
    printResponse('cd <section>   navigate to a section', 'dim');
    printResponse('ls             list sections',          'dim');
    printResponse('exit           leave interactive mode', 'dim');
    appendInputRow();
    return;
  }

  if (command === 'exit' || command === 'quit') {
    exitInteractive();
    start();
    return;
  }

  printResponse(`${esc(cmd)}: command not found`, 'dim');
  appendInputRow();
}

// ── Scroll trigger ───────────────────────────────────────

function onScroll() {
  if (!win || !output) return;
  const tSec = Math.max(0, 1 - window.scrollY / window.innerHeight);

  if (tSec > 0.55) {
    win.classList.add('visible');
    if (phase === 'idle' && !interactive) start();
  } else if (tSec < 0.15) {
    win.classList.remove('visible');
    reset();
  }
}

export function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  win    = document.getElementById('nmap-terminal');
  output = document.getElementById('term-output');
  if (!win || !output) return;

  win.addEventListener('click', () => { if (!interactive) enterInteractive(); });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function dispose() {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', handleKey);
  reset();
  win = output = null;
}
