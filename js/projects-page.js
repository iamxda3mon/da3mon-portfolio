import './nav.js';

const search = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const cards = document.querySelectorAll('.github-card');
const empty = document.getElementById('empty');
let activeLang = 'all';

function applyFilter() {
    const query = search.value.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
        const name = card.querySelector('.github-card-name').textContent.toLowerCase();
        const desc = card.querySelector('.github-card-desc').textContent.toLowerCase();
        const lang = card.dataset.lang;
        const matchesQuery = name.includes(query) || desc.includes(query);
        const matchesLang = activeLang === 'all' || lang === activeLang;
        const show = matchesQuery && matchesLang;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    empty.classList.toggle('is-visible', visible === 0);
}

search.addEventListener('input', applyFilter);

filterSelect.addEventListener('change', () => {
    activeLang = filterSelect.value;
    applyFilter();
});
