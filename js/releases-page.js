import './nav.js';

const search = document.getElementById('search');
const filterSelect = document.getElementById('filter');
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

filterSelect.addEventListener('change', () => {
    activeGenre = filterSelect.value;
    applyFilter();
});
