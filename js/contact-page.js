import './nav.js';

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

const form   = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');
const btn    = form?.querySelector('.contact-form-submit');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        btn.disabled = true;
        btn.textContent = 'Sending…';
        status.className = 'form-status';
        status.textContent = '';

        try {
            const res  = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form),
            });
            const json = await res.json();

            if (json.success) {
                status.textContent = 'Message sent.';
                status.classList.add('is-success');
                form.reset();
            } else {
                throw new Error(json.message);
            }
        } catch {
            status.textContent = 'Something went wrong — email directly at contact@zachpriller.com';
            status.classList.add('is-error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send';
        }
    });
}
