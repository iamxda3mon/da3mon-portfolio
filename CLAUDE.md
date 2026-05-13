# da3mon.io — Portfolio Project

Personal portfolio of Zacharias Priller. Two worlds — IT-Security and Music Production — meet at a shared visual axis.

## Concept

Single-page site with a vertical axis metaphor:
- Landing sits at the center.
- Scrolling **down** reveals the **Music** identity ("Pulse of Music").
- Scrolling **up** reveals the **Security** identity ("Art of Exploitation", rotated 180°).
- Initial scroll position must land in the middle on first load, not at the top of the document.

This metaphor drives layout: rotated typography, mirrored compositions, and 3D scenes that pivot or invert around the center.

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES modules via `<script type="module">`).
- **Three.js** for 3D scroll objects. Load via CDN + `<script type="importmap">`, not npm/bundler.
- **GSAP + ScrollTrigger** for scroll-driven animation. Free plugins only — no Club GreenSock dependencies.
- No framework, no bundler, no build step. The site is served as plain static files.

## Sections

- **Landing** — center anchor, axis pivot
- **About** — placement on axis to be decided (shared or mirrored)
- **Security WriteUps** — upper half of axis
- **Music / Discography** — lower half of axis
- **Contact** — placement on axis to be decided

Confirm the final scroll layout with me before placing About and Contact.

## Project Structure
/
├── index.html
├── css/
│   ├── global.css       — design tokens, resets, base typography
│   ├── nav.css          — navbar component
│   ├── landingpage.css  — center landing section
│   └── <section>.css    — one file per section
├── js/
│   ├── main.js          — entry, scroll init, scene orchestration
│   └── scenes/          — Three.js scenes, one module per section that needs 3D
└── assets/              — images, audio previews, self-hosted fonts if needed

One CSS file per component or section, kebab-case filenames. Same pattern for JS modules.

## Design Tokens

All colors and fonts live in `css/global.css` as CSS variables. **Never hardcode hex values in component CSS** — always reference `var(--token-name)`.

| Variable             | Use                                 |
| -------------------- | ----------------------------------- |
| `--text-primary`     | Default text                        |
| `--bg-primary`       | Page background                     |
| `--bg-secondary`     | Surfaces, card backgrounds          |
| `--accent-primary`   | Highlights, Security side accents   |
| `--accent-secondary` | Highlights, Music side accents      |
| `--font-heading`     | EB Garamond — editorial / newspaper |
| `--font-body`        | Inter — UI, body copy               |

If a new color or font is needed, add a token to `global.css` first, then reference it.

## Conventions

- **CSS**: semantic class names in kebab-case. No BEM unless a component grows complex. Component-scoped selectors; no global element selectors outside `global.css`.
- **JS**: ES modules. Each Three.js scene is its own module with a clear `init()` and `dispose()` to allow teardown on section exit (memory matters with WebGL).
- **HTML**: `lang="de"`. Use semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`). One `<h1>` per page.

## Browser Support

Latest 2 versions of Chromium, Firefox, Safari. Modern CSS (`color-mix()`, `backdrop-filter`, container queries, `:has()`) is fair game. No polyfills, no legacy fallbacks.

## Accessibility

- Respect `prefers-reduced-motion: reduce` — disable Three.js scenes, GSAP scroll-tweens, and non-essential transitions in this mode. Static fallback for every animated section.
- Keyboard navigability through all sections; axis scroll must not trap focus.
- Sufficient contrast against `--bg-primary` for all text.

## Dev Workflow

- Local server: `npx live-server` from repo root (auto-reload on save).
- No build step. Edit → save → browser reloads.
- Deploy: static upload to the domain provider. Currently zachpriller.com; target domain is da3mon.io.

## Working Style on This Project

- Build incrementally. One feature, one section, or one scene per turn. Wait for confirmation before moving on.
- When introducing a new concept for the first time (e.g. first Three.js scene, first ScrollTrigger pin, importmap setup), explain the building blocks **before** writing the code. This overrides the global "theory only on request" rule, but only for first-time introductions — not every reuse.
- Show code in small, copy-pasteable pieces with clear file targets and where to insert.
- If a design or interaction is fighting the axis metaphor or the minimalist constraint from the README, push back before implementing.
