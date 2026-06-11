# IB at Súkromné Gymnázium Česká

[![Astro](https://img.shields.io/badge/Astro-6-ff5a03?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-@astrojs/mdx-1a1a1a?logo=mdx)](https://mdxjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?logo=nodedotjs)](https://nodejs.org)

Static website for the **International Baccalaureate Diploma Programme** at [Súkromné Gymnázium Česká](https://ceska-skola.cz) in Bratislava, Slovakia.

## Features

- **Subject listings** — IB groups 1–6 with HL/SL levels, syllabi, and teacher info
- **CAS journal** — Creativity, Activity, Service entries with learning outcomes
- **TOK materials** — Theory of Knowledge essays and discussion themes
- **Extended Essay** — timeline, resources, and document downloads
- **News** — exam schedules, announcements, and events
- **i18n-ready** — English primary, Slovak planned

## Quick start

```bash
npm install
npm run dev        # → localhost:4321
```

## Commands

| Command              | Action                        |
| -------------------- | ----------------------------- |
| `npm run dev`        | Dev server at localhost:4321  |
| `npm run build`      | Static build to `dist/`       |
| `npm run preview`    | Preview the production build  |
| `npm run astro check`| Type-check the project        |

## Stack

- **Astro 6** — static site, no SSR
- **Tailwind CSS 4** — utility-first, CSS-based config (no `tailwind.config.js`)
- **MDX** — all content lives in `.mdx` files with typed frontmatter
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **Node ≥ 22.12.0**

## Content collections

Content is managed through [Astro content collections](https://docs.astro.build/en/guides/content-collections/) with the v6 loader API:

| Collection    | Path                        | Description              |
| ------------- | --------------------------- | ------------------------ |
| `subjects`    | `src/content/subjects/`     | IB subject offerings     |
| `news`        | `src/content/news/`         | Announcements & updates  |
| `cas`         | `src/content/cas/`          | CAS activity logs        |
| `tok`         | `src/content/tok/`          | TOK essays & materials   |

Schema definitions and loaders live in [`src/content.config.ts`](src/content.config.ts).

## Language policy

- **Primary: English** — all UI, content, and commit messages
- **Secondary: Slovak** — i18n support planned
- Czech placeholder text currently in the codebase must be replaced with English

## For collaborators

See [`humans/`](humans/) for onboarding docs, design decisions, and the original handover brief.

## Deploy

```bash
npm run build   # outputs static site to dist/
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.). The `site` URL in `astro.config.mjs` should be updated before production deploy.

## License

Private — Súkromné Gymnázium Česká.
