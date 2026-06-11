# FEATURES

Implemented and shipped.

## Project foundation
- [x] Astro 6 static site scaffold
- [x] Tailwind CSS 4 via `@tailwindcss/vite` plugin
- [x] MDX integration (`@astrojs/mdx`)
- [x] Strict TypeScript (`astro/tsconfigs/strict`)
- [x] Node >= 22.12.0 engine requirement
- [x] Git + GitHub repo with topics and description

## Content collections (Astro 6 loader API)
- [x] `src/content.config.ts` with Zod schemas
- [x] `subjects` collection — group, level, teacher, order
- [x] `news` collection — date, excerpt, author
- [x] `cas` collection — strand, learning outcomes
- [x] `tok` collection — theme, date

## Pages (6 routes)
- [x] `/` — homepage with hero and section cards
- [x] `/subjects` — grouped listing by IB group (1–6 + core)
- [x] `/cas` — strand-based listing (Creativity, Activity, Service)
- [x] `/tok` — essay/material listing
- [x] `/ee` — Extended Essay timeline and resources
- [x] `/news` — chronological article listing

## Layout & design
- [x] Shared `Layout.astro` with sticky nav + footer
- [x] Responsive grid cards (1 → 2 → 3 columns)
- [x] Emerald primary / stone neutral color palette
- [x] System font stack (no external webfonts)
- [x] Tailwind-only CSS (no custom CSS, no `tailwind.config.js`)

## Sample content
- [x] 9 subjects across all 6 IB groups
- [x] 3 CAS entries (one per strand)
- [x] 2 TOK essays/themes
- [x] 2 news articles

## Documentation
- [x] `README.md` — badges, quick start, stack, collection overview
- [x] `AGENTS.md` — AI agent conventions and gotchas
- [x] `humans/README.md` — onboarding for non-technical collaborators
- [x] `humans/CONTENT.md` — per-collection field reference with examples
- [x] `humans/DESIGN.md` — design tokens, layout rules, style guide
- [x] `humans/HUMANTODO.md` — tasks for human collaborators
- [x] `TODO.md` — AI task backlog
- [x] `FEATURES.md` — this file
