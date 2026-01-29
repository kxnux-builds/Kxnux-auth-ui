# Kxnux-auth-ui

Professional, accessible, and production-ready authentication UI for Kxnux — a modern sign-in / register front-end built with Bootstrap 5, minimal JavaScript, and a polished glassmorphism design system.

A clean, resume-friendly repository that demonstrates UI design, client-side validation, accessibility considerations, and a lightweight mocked backend for development.


---

Contents
- [Highlights](#highlights)
- [Live Demo / Preview](#live-demo--preview)
- [Tech Stack](#tech-stack)
- [Files & Structure](#files--structure)
- [Features & UX Patterns](#features--ux-patterns)
- [Installation & Local Preview](#installation--local-preview)
- [Usage & Developer Notes](#usage--developer-notes)
- [Accessibility, Performance & Security](#accessibility-performance--security)
- [Customisation & Theming](#customisation--theming)
- [Testing & CI Suggestions](#testing--ci-suggestions)
- [Contributing](#contributing)
- [Resume-ready Highlights](#resume-ready-highlights)
- [License & Author](#license--author)

---

## Highlights

- Pixel-polished authentication UI with responsive layout and glassmorphism navbar.
- Sign In and Register flows with:
  - Password visibility toggle
  - Strength meter on registration
  - Real-time email availability check (mocked)
  - Client-side validation with friendly error states and animations
- Lightweight MockBackend to emulate network/processing latency during local development.
- Built to be production-ready as a static front-end (easy to integrate with real APIs).

---

## Live Demo / Preview

Preview locally (instructions below) or deploy to any static host (Netlify, Vercel, GitHub Pages).

---

## Tech Stack

- HTML5, semantic markup
- Bootstrap 5.3 for layout & utilities
- Vanilla JavaScript (ES6+) — no frameworks required
- CSS with modern patterns: CSS custom properties, glassmorphism, animations
- Optional: serve static files with Nginx, Netlify, or GitHub Pages

---

## Files & Structure

Top-level repository layout:

- index.html — Sign In page (responsive, desktop hero + mobile-first form)
- register.html — Registration page (password strength meter & email check)
- css/
  - style.css — Core styles, theme variables, animations, strength meter
- js/
  - auth.js — Client-side behaviours: toggles, validation, form submit flows
  - mock-api.js — MockBackend class to simulate server latency & auth responses
- assets/
  - (optional) screenshots, logos, svg icons used by the UI
- README.md — (this file)

---

## Features & UX Patterns

- Clear, mobile-first sign-in and registration layouts with accessible labels and form feedback.
- Focus states (visible & themed) for keyboard users, animated micro-interactions for a refined feel.
- Password strength meter: incremental feedback for length, uppercase, digits, and symbols.
- Debounced email availability check to reduce network noise and provide instant UX feedback.
- Graceful error handling with visual shake animations on invalid interactions.
- Lightweight client-side "loading" states and simulated success flows for a developer-friendly demo.

---

## Installation & Local Preview

Prerequisites: any modern OS with Python (for a simple static server) or Node (if you prefer).

1. Clone the repo:
```bash
git clone https://github.com/YOUR_USERNAME/Kxnux-auth-ui.git
cd Kxnux-auth-ui
```

2. Serve locally (two easy options):

Option A — Python 3 (quick):
```bash
# Serve at http://localhost:8000
python -m http.server 8000
```

Option B — Node.js + serve:
```bash
npm install -g serve
serve .
# Opens at http://localhost:3000 (or a port suggested by serve)
```

Open `http://localhost:8000` (or the served port) and navigate to `index.html` to preview.

---

## Usage & Developer Notes

- The demo uses `MockBackend` (js/mock-api.js). Replace with your API client in production:
  - Swap `MockBackend` calls in `js/auth.js` with real HTTP calls (fetch/axios) to your auth endpoints.
- Form flow summary:
  - Sign In: displays loading state, verifies credentials via `MockBackend.login`, and simulates redirect.
  - Register: provides password-strength UI + debounced email availability checks via `MockBackend.checkEmailAvailability`.
- Client validation:
  - Uses HTML5 validation constraints and custom JS to manage feedback and animation affordances.
  - Confirm password mismatch triggers an explicit invalid state and shake animation to draw attention.

---

## Accessibility, Performance & Security

Accessibility
- Semantic HTML and proper labels ensure screen-reader-friendly forms.
- High-contrast focus outlines and visible focus indicators for keyboard navigation.
- Use aria-live regions for dynamic messages (future enhancement suggested).

Performance
- Minimal external dependencies (Bootstrap CDN + icons). Consider bundling or self-hosting for production.
- Lazy-load large assets and optimize images (use WebP/AVIF where possible).

Security (Front-end)
- This repository contains only UI and a mocked backend. Never store or validate credentials in client-side code in production.
- Use HTTPS for all production endpoints, secure cookies (HttpOnly, Secure), and proper server-side authentication flows (JWT/OAuth/session).
- Sanitize and validate all inputs serverside even if client validates them.

---

## Customisation & Theming

- Primary colors and tokens are in `css/style.css` under `:root` custom properties:
  - --primary, --dark-bg, --success, --warning, --danger
- To create a brand variant:
  - Update variables, refine hover/active states, and adapt the hero content.
- To replace the mock backend with a real API:
  - Edit `js/auth.js` and replace `new MockBackend()` with a real client (e.g., axios instance).
  - Update form submission logic to handle real response contracts and error codes.

---

## Testing & CI Suggestions

- Add unit tests for your JS behaviour with Jest + jsdom for DOM interactions (password visibility, strength meter, debounced checks).
- Add end-to-end tests with Playwright or Cypress to validate flows (Sign In, Register, error states).
- Suggested GitHub Actions workflow:
  - Run linters (ESLint), run unit tests, run accessibility audit (axe-core), and run Lighthouse performance checks.

---

## License

This project is distributed under the MIT License — see [LICENSE](LICENSE) for details.

---

## Contact / Author

KISHANU MONDAL — copyright 2026

---