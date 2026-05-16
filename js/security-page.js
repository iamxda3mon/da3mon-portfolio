import './nav.js';

// ── Live platform stats ───────────────────────────────────────
// stats.json is written by the GitHub Actions workflow (daily).
// Falls back silently to whatever values are already in the HTML.
fetch('../assets/stats.json')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(({ htb, thm }) => {
        const set = (attr, val) => {
            const el = document.querySelector(`[data-stat="${attr}"]`);
            if (el) el.textContent = val;
        };
        if (htb) {
            set('htb-machines', htb.machines);
            set('htb-points',   htb.points);
            set('htb-rank',     `Rank: ${htb.rank}`);
        }
        if (thm) {
            set('thm-rooms',     thm.rooms);
            set('thm-position',  thm.position);
            set('thm-rank',      `Rank: ${thm.rank}`);
        }
    })
    .catch(() => {});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => {
        const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 0.1}s`;
        observer.observe(el);
    });
}
