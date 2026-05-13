import './nav.js';

const search = document.getElementById('search');
const filterBtns = document.querySelectorAll('.filter-btn');
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

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeTag = btn.dataset.tag;
        applyFilter();
    });
});
