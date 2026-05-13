const STORAGE_KEY = 'da3mon-theme';
const html = document.documentElement;

function applyTheme(theme) {
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
    } else {
        html.removeAttribute('data-theme');
    }
}

const btn = document.querySelector('.theme-toggle');
if (btn) {
    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    });
}
