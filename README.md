# IB at Súkromné Gymnázium Česká

[![Astro](https://img.shields.io/badge/Astro-7-ff5a03?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Keystatic](https://img.shields.io/badge/CMS-Keystatic-6644ff)](https://keystatic.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?logo=nodedotjs)](https://nodejs.org)

Website for the **International Baccalaureate** (MYP & DP) at [Súkromné Gymnázium Česká](https://gymnaziumceska.sk) in Bratislava, Slovakia. Built with Astro in **hybrid mode**: pages are statically prerendered, and a Cloudflare Worker backs the Keystatic CMS admin routes.

## Features

- **DP subjects**: `/dp/subjects` catalogue and detail pages with IB groups 1–6, HL/SL levels, syllabi, and teacher info
- **IB DP Core**: CAS at `/dp/cas`, TOK at `/dp/tok` (both with entry details), and Extended Essay guidance at `/dp/ee`
- **Diploma builder**: interactive subject choices at `/dp/build-your-diploma`
- **MYP curriculum**: bilingual subject-group reference at `/myp/subjects` and four separate MYP core pages
- **News**: exam schedules, announcements, events, with an RSS feed at `/rss.xml`
- **Programme-first navigation**: separate MYP and IB DP menus, each with its own overview, subjects, core, mission, team, and policies; desktop hover/click/keyboard support and expandable mobile sections
- **Admissions**: application steps, programme guidance, and direct school contact at `/admissions`
- **Separate teams**: MYP organisational chart at `/myp/teachers`; DP leadership and staff portrait roster at `/dp/teachers`
- **Bilingual**: English primary, full Slovak UI + optional Slovak content (English fallback)
- **SEO**: complete bilingual sitemap, canonical + `hreflang`, social cards, and schema.org structured data
- **CMS**: content edited visually through Keystatic at `/keystatic/`, no code required

## Programme routes and ownership

Public paths below are relative to `/en` or `/sk`.

| Programme | Routes                                                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MYP       | `/myp`, `/myp/subjects`, `/myp/core/interdisciplinary-learning`, `/myp/core/approaches-to-learning`, `/myp/core/service-as-action`, `/myp/core/personal-project`, `/myp/mission`, `/myp/teachers`, `/myp/policies` |
| IB DP     | `/dp`, `/dp/subjects`, `/dp/cas`, `/dp/tok`, `/dp/ee`, `/dp/build-your-diploma`, `/dp/mission`, `/dp/teachers`, `/dp/policies`; subjects/CAS/TOK also have `/[slug]` details                                       |
| Shared    | `/news`, `/gallery`, `/admissions`, `/search`; news and event detail routes remain shared                                                                                                                          |

Legacy locale-prefixed `/subjects`, `/cas`, `/tok`, `/ee`, `/build-your-diploma`, `/mission`, `/teachers`, and `/policies` return HTTP 301 to the corresponding `/dp` routes, including subject/CAS/TOK details. Redirects preserve query strings and reject unsupported locales.

**MYP is a candidate programme, not authorized.** Keep its candidate-school disclaimer and text-only branding; candidacy does not guarantee authorization. DP authorization, official DP branding, and the certificate belong to DP, not MYP.

Developers maintain bilingual MYP curriculum reference data in `src/data/myp-programme.ts`, MYP chart data in `src/data/myp-organisation.ts`, and the separate DP portrait roster in `src/data/teachers.ts`. Programme school renderers live in `src/components/programme/`; `src/pages/[locale]/[programme]/[section].astro` statically generates each programme's mission, teachers, and policies pages. These are not new Keystatic collections.

## Quick start

```bash
pnpm install
pnpm run dev        # → localhost:4321  (CMS admin at /keystatic/)
```

## Commands

| Command            | Action                                             |
| ------------------ | -------------------------------------------------- |
| `pnpm run dev`     | Dev server at localhost:4321 (incl. `/keystatic/`) |
| `pnpm run build`   | Cloudflare Workers production build                |
| `pnpm run preview` | Build and preview in the Workers runtime           |
| `pnpm run deploy`  | Build and deploy with Wrangler                     |
| `pnpm run check`   | Type-check the project (`astro check`)             |

## Stack

- **Astro 7**: hybrid mode (static prerender + Cloudflare Workers runtime for CMS routes)
- **Tailwind CSS 4**: utility-first, CSS-based config (no `tailwind.config.js`)
- **Keystatic CMS**: visual editor + Reader API. Content stored as `.mdoc` files
- **MDX** (`@astrojs/mdx`): for `.astro` components that use JSX
- **TypeScript**: strict mode via `astro/tsconfigs/strict`
- **Node 22.12.0 or newer**

## Content

CMS content is **not** managed with Astro content collections. It is managed by **Keystatic**; programme reference content has the separate code ownership described above:

- Schemas live in [`keystatic.config.ts`](keystatic.config.ts) (Keystatic `fields.*` API, not Zod).
- Entries are `.mdoc` files (YAML frontmatter + Markdoc body) under `src/content/`.
- Pages read content through the Reader API singleton in [`src/lib/keystatic.ts`](src/lib/keystatic.ts).

| Collection | Path                    | Description                            |
| ---------- | ----------------------- | -------------------------------------- |
| `subjects` | `src/content/subjects/` | DP subject offerings at `/dp/subjects` |
| `news`     | `src/content/news/`     | Shared announcements & updates         |
| `cas`      | `src/content/cas/`      | DP CAS logs at `/dp/cas`               |
| `tok`      | `src/content/tok/`      | DP TOK materials at `/dp/tok`          |
| `events`   | `src/content/events/`   | Shared events in the `/news` feed      |

Four preparation collections (`resources`, `galleryAlbums`, `assessments`, `vacancies`) store JSON under `src/content/` and are labelled “(not public yet)” in Keystatic: no page reads them until their public routes are built.

Editors should use the CMS at `/keystatic/` rather than touching `.mdoc` files by hand. See [`humans/CONTENT.md`](humans/CONTENT.md).

The programme-first URL change does not rename or move the existing DP subjects/CAS/TOK collection storage.

## Editing content (Keystatic)

- **URL:** `/keystatic/` at `http://localhost:4321/keystatic/` in dev and `https://ib.gymnaziumceska.sk/keystatic/` on the live site; the `workers.dev` URL remains available.
- **Dev** (`kind: 'local'`): writes `.mdoc` files straight to disk, no login.
- **Production** (`kind: 'cloud'`): Keystatic Cloud project `ib-ceska/ib-ceska` manages editor accounts without requiring teachers to join GitHub. Saves commit to `main` and trigger a Worker rebuild. No GitHub OAuth Worker secrets are needed.
- See [`humans/DEPLOY.md`](humans/DEPLOY.md) for hostname routing and CMS origin verification.

## Language policy

- **Primary: English** for all UI, content, and commit messages.
- **Secondary: Slovak**, full UI translation shipped. Content can be translated per-entry with English fallback.
- Do not write Czech in code or content.

## For collaborators

See [`humans/`](humans/) for onboarding, the content-editing guide, design decisions, and the original handover brief. New developers should also read the root [`AGENTS.md`](AGENTS.md).

## Deploy

Production targets **Cloudflare Workers with static assets**. Current `@astrojs/cloudflare` versions do not support Pages SSR, so create a Worker rather than a Pages project.

```bash
pnpm run build
npx wrangler deploy
```

Use `main` as the production branch so code pushes and Keystatic content commits trigger the same production pipeline. Full dashboard, secrets, verification and DNS instructions are in [`humans/DEPLOY.md`](humans/DEPLOY.md).

## License

Private. Súkromné Gymnázium Česká.
