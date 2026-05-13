import './nav.js';

const search = document.getElementById('search');
const filterBtns = document.querySelectorAll('.filter-btn');
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

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeLang = btn.dataset.lang;
        applyFilter();
    });
});
