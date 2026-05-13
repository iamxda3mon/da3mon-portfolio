import './theme.js';

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
