import './nav.js';

const search = document.getElementById('search');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.release-card');
const empty = document.getElementById('empty');
let activeGenre = 'all';

function applyFilter() {
    const query = search.value.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
        const title = card.querySelector('.release-title').textContent.toLowerCase();
        const genre = card.dataset.genre;
        const matchesQuery = title.includes(query);
        const matchesGenre = activeGenre === 'all' || genre === activeGenre;
        const show = matchesQuery && matchesGenre;
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
        activeGenre = btn.dataset.genre;
        applyFilter();
    });
});
