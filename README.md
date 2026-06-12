# IB at Súkromné Gymnázium Česká

[![Astro](https://img.shields.io/badge/Astro-6-ff5a03?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Keystatic](https://img.shields.io/badge/CMS-Keystatic-6644ff)](https://keystatic.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?logo=nodedotjs)](https://nodejs.org)

Website for the **International Baccalaureate** (MYP & DP) at [Súkromné Gymnázium Česká](https://gymnaziumceska.sk) in Bratislava, Slovakia. Built with Astro in **hybrid mode** — pages are statically prerendered, and a small Node server backs the Keystatic CMS admin routes.

## Features

- **Subject listings + detail pages** — IB groups 1–6 with HL/SL levels, rendered syllabi, and teacher info
- **CAS journal** — Creativity, Activity, Service entries with learning outcomes and reflection pages
- **TOK materials** — Theory of Knowledge essays and themes, with full essay pages
- **Extended Essay** — timeline, resources, and document downloads
- **News** — exam schedules, announcements, events, with an RSS feed at `/rss.xml`
- **Bilingual** — English primary, full Slovak UI + optional Slovak content (English fallback)
- **SEO** — `sitemap.xml`, `robots.txt`, canonical + `hreflang` (en/sk/x-default), Open Graph
- **CMS** — content edited visually through Keystatic at `/keystatic/`, no code required

## Quick start

```bash
npm install
npm run dev        # → localhost:4321  (CMS admin at /keystatic/)
```

## Commands

| Command            | Action                                          |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Dev server at localhost:4321 (incl. `/keystatic/`) |
| `npm run build`    | Hybrid build → `dist/client/` + `dist/server/`  |
| `npm run preview`  | Preview the production build                    |
| `npm run check`    | Type-check the project (`astro check`)          |

## Stack

- **Astro 6** — hybrid mode (static prerender + `@astrojs/node` adapter for CMS routes)
- **Tailwind CSS 4** — utility-first, CSS-based config (no `tailwind.config.js`)
- **Keystatic CMS** — visual editor + Reader API; content stored as `.mdoc` files
- **MDX** (`@astrojs/mdx`) — for `.astro` components that use JSX
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **Node ≥ 22.12.0**

## Content

Content is **not** managed with Astro content collections. It is managed by **Keystatic**:

- Schemas live in [`keystatic.config.ts`](keystatic.config.ts) (Keystatic `fields.*` API, not Zod).
- Entries are `.mdoc` files (YAML frontmatter + Markdoc body) under `src/content/`.
- Pages read content through the Reader API singleton in [`src/lib/keystatic.ts`](src/lib/keystatic.ts).

| Collection | Path                    | Description             |
| ---------- | ----------------------- | ----------------------- |
| `subjects` | `src/content/subjects/` | IB subject offerings    |
| `news`     | `src/content/news/`     | Announcements & updates |
| `cas`      | `src/content/cas/`      | CAS activity logs       |
| `tok`      | `src/content/tok/`      | TOK essays & materials  |

Editors should use the CMS at `/keystatic/` rather than touching `.mdoc` files by hand. See [`humans/CONTENT.md`](humans/CONTENT.md).

## Editing content (Keystatic)

- **URL:** `/keystatic/` — `http://localhost:4321/keystatic/` in dev, `https://ib.gymnaziumceska.sk/keystatic/` in production.
- **Dev** (`kind: 'local'`): writes `.mdoc` files straight to disk, no login.
- **Production** (`kind: 'github'`): saves are commits authored via **GitHub OAuth** — only people with write access to the `VSHT3/ib-ceska` repo can save. GitHub repo membership *is* the access list.
- ⚠️ Production OAuth is **not configured yet** (`KEYSTATIC_GITHUB_CLIENT_ID` / `_SECRET` + a GitHub App are required). Until then the live CMS cannot save. See `humans/HUMANTODO.md`.

## Language policy

- **Primary: English** — all UI, content, and commit messages.
- **Secondary: Slovak** — full UI translation shipped; content can be translated per-entry with English fallback.
- Do not write Czech in code or content.

## For collaborators

See [`humans/`](humans/) for onboarding, the content-editing guide, design decisions, and the original handover brief. New developers should also read the root [`AGENTS.md`](AGENTS.md).

## Deploy

Target: **Coolify** on a VPS.

```bash
npm run build                 # → dist/client/ (static) + dist/server/ (Node)
node dist/server/entry.mjs    # start command, port 4321
```

Set `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET` in the environment for the production CMS. Live at [ib.gymnaziumceska.sk](https://ib.gymnaziumceska.sk).

## License

Private — Súkromné Gymnázium Česká.
