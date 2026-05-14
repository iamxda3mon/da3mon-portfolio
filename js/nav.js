import './theme.js';
import { initI18n, applyLanguage } from './i18n.js';

const hamburger = document.querySelector('.nav-hamburger');
const menu = document.querySelector('.mobile-menu');

if (!hamburger || !menu) throw new Error('nav.js: required elements not found');

function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
    }
});

menu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
});

// Language toggle
let currentLang = initI18n();

const langBtn = document.createElement('button');
langBtn.className = 'lang-toggle';
langBtn.setAttribute('aria-label', 'Switch language');

function updateLangBtn(lang) {
    langBtn.innerHTML = lang === 'de'
        ? '<span class="lang-active">DE</span><span class="lang-sep">|</span><span>EN</span>'
        : '<span>DE</span><span class="lang-sep">|</span><span class="lang-active">EN</span>';
}

updateLangBtn(currentLang);

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    applyLanguage(currentLang);
    updateLangBtn(currentLang);
});

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) themeToggle.before(langBtn);
