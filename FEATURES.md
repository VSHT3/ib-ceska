# FEATURES

Implemented and shipped.

## Project foundation
- [x] Astro 6 hybrid mode (static prerender + Node adapter for CMS routes)
- [x] Tailwind CSS 4 via `@tailwindcss/vite` plugin (CSS-first config)
- [x] MDX integration (`@astrojs/mdx`)
- [x] Strict TypeScript (`astro/tsconfigs/strict`)
- [x] Node >= 22.12.0 engine requirement
- [x] Git + GitHub repo with topics and description

## CMS — Keystatic
- [x] `keystatic.config.ts` — 4 collections with typed schemas
- [x] `@keystatic/astro` integration — admin UI at `/keystatic/`
- [x] Keystatic Reader API — pages read from Keystatic instead of Astro collections
- [x] `src/lib/keystatic.ts` — shared reader singleton
- [x] Local storage for dev, GitHub storage for production (auto-switched)
- [x] `.mdoc` content format — 16 sample entries across all collections
- [x] Markdoc rich-text editor for long-form content (subjects, CAS, TOK, news bodies)
- [x] Select fields, date pickers, array fields with validation

## Content (4 collections)
- [x] `subjects` — title, group (1-6/core), level (HL/SL), description, teacher, order, syllabus body
- [x] `news` — headline, date, excerpt, author, article body
- [x] `cas` — title, date, strand (Creativity/Activity/Service), description, learning outcomes, reflection body
- [x] `tok` — title, date, theme (12 TOK themes), summary, full essay body

## Pages (6 routes + admin)
- [x] `/` — homepage with hero and section cards
- [x] `/subjects` — grouped listing by IB group (1–6)
- [x] `/cas` — strand-based listing (Creativity, Activity, Service)
- [x] `/tok` — essay/material listing with theme badges
- [x] `/ee` — Extended Essay timeline and resources
- [x] `/news` — chronological article listing
- [x] `/keystatic/` — CMS admin UI (server-rendered, not prerendered)

## Layout & design
- [x] Shared `Layout.astro` with sticky nav + footer
- [x] Responsive grid cards (1 → 2 → 3 columns)
- [x] Emerald primary / stone neutral color palette
- [x] System font stack (no external webfonts)
- [x] Tailwind-only CSS (no custom CSS, no `tailwind.config.js`)

## Sample content
- [x] 8 subjects across all 6 IB groups
- [x] 3 CAS entries (one per strand)
- [x] 2 TOK essays/themes
- [x] 2 news articles

## Documentation
- [x] `README.md` — badges, quick start, stack, collection overview, deploy section
- [x] `AGENTS.md` — AI agent conventions, gotchas, stack details
- [x] `humans/README.md` — onboarding for non-technical collaborators
- [x] `humans/CONTENT.md` — per-collection field reference, editor workflow
- [x] `humans/DESIGN.md` — design tokens, layout rules, CMS architecture
- [x] `humans/HUMANTODO.md` — tasks for human collaborators
- [x] `TODO.md` — AI task backlog
- [x] `FEATURES.md` — this file
