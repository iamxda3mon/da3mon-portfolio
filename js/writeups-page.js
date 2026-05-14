import './nav.js';

const search = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const cards = document.querySelectorAll('.writeup-card');
const empty = document.getElementById('empty');
let activeTag = 'all';

function applyFilter() {
    const query = search.value.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
        const title = card.querySelector('.writeup-title').textContent.toLowerCase();
        const tag = card.dataset.tag;
        const matchesQuery = title.includes(query);
        const matchesTag = activeTag === 'all' || tag === activeTag;
        const show = matchesQuery && matchesTag;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    empty.classList.toggle('is-visible', visible === 0);
}

search.addEventListener('input', applyFilter);

filterSelect.addEventListener('change', () => {
    activeTag = filterSelect.value;
    applyFilter();
});
