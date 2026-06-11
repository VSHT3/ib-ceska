# AGENTS.md — IB Česká

## Project identity
Website for the IB Diploma Programme at **Súkromné Gymnázium Česká** in Bratislava (not Czechia — the school name is "Česká").

## Language
- **Primary: English** — all UI, content, and commit messages.
- **Secondary: Slovak** — i18n option planned. Current Czech placeholder text must be replaced with English.
- Do not write or generate Czech in code or content.

## Commands
```bash
npm run dev          # dev server (localhost:4321)
npm run build        # static build to dist/
npm run preview      # preview built site
npm run astro check  # type-check (astro check)
npm run astro add    # add integrations
```

## Stack
- **Astro 6** (static, no SSR)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (no `tailwind.config.*` — use CSS-first config)
- **MDX** via `@astrojs/mdx` (required for `.mdx` content files)
- Node >= 22.12.0
- Strict TypeScript (`astro/tsconfigs/strict`)

## Content collections (Astro 6 loader API)
Config lives at `src/content.config.ts` (not `src/content/config.ts` — Astro 6 moved it).

Each collection uses `glob()` loader from `astro/loaders` with `base` set to the content subdirectory:
```ts
loader: glob({ pattern: '**/*.mdx', base: './src/content/subjects' })
```

Collections: `subjects`, `news`, `cas`, `tok`.

## Directory structure
```
src/
├── content/            # .mdx content files (never .md — MDX required for entry type recognition)
│   ├── subjects/       # IB subject group listings
│   ├── news/           # news articles
│   ├── cas/            # CAS activity logs
│   └── tok/            # TOK essays and materials
├── pages/              # route-based pages
├── layouts/            # Layout.astro — shared shell with nav + footer
├── components/         # reusable .astro components
├── styles/             # global.css (Tailwind import)
└── content.config.ts   # collection schemas + loaders
```

## Style conventions
- Colors: `emerald-700` primary, `stone-50`/`stone-200`/`stone-600`/`stone-900` neutrals
- Tailwind utility classes only — no custom CSS unless unavoidable
- Nav is sticky, container is `max-w-5xl`

## Commits
Use `/caveman-commit` for every commit — not just when asked. Commit after each completed feature or logical unit of work. Keep messages ≤50 chars, Conventional Commits format.

## Tracking files
- [`TODO.md`](TODO.md) — AI task backlog (things the AI must build)
- [`FEATURES.md`](FEATURES.md) — completed features (update when shipping)
- [`humans/HUMANTODO.md`](humans/HUMANTODO.md) — decisions/content the humans must provide
- Mark items `[x]` when done. Add new items as they come up.

## Documentation
Maintain detailed docs in [`humans/`](humans/) for non-technical collaborators. Update after significant feature work:
- `humans/CONTENT.md` — field reference, examples, adding content
- `humans/DESIGN.md` — design tokens, layout, styling rules
- `humans/README.md` — onboarding index

## Gotchas
- `.md` files won't work for collections without registering a markdown entry type. Use `.mdx` everywhere for content.
- Tailwind 4 uses CSS-based config (`@import "tailwindcss"` in global.css). There is no `tailwind.config.js`.
- The `site` URL in `astro.config.mjs` is `https://ceska-skola.cz` — update before production deploy.
- `tsconfig.json` uses `"exclude": ["dist"]` — do not remove.
