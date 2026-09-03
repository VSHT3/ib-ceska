# AGENTS.md — IB Česká

## Project identity

Website for IB Diploma Programme at **Súkromné Gymnázium Česká** in Bratislava (not Czechia — school name is "Česká").

## Language

- **Primary: English** — all UI, content, commit messages.
- **Secondary: Slovak** — i18n option planned.
- No Czech in code or content.

## Commands

```bash
pnpm run dev          # dev server (localhost:4321, includes /keystatic admin)
pnpm run build        # hybrid build to dist/ (static pages + server routes)
pnpm run preview      # preview built site
pnpm run astro check  # type-check (astro check)
pnpm run astro add    # add integrations
```

## Coding

Follow YAGNI, one-liner solutions.

## Stack

- **Astro 7** — hybrid mode (static prerender + server runtime for `/keystatic/` API routes)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.*`)
- **MDX** via `@astrojs/mdx` (for `.astro` page components with JSX)
- **Keystatic CMS** via `@keystatic/astro` — admin UI at `/keystatic/`
- **Cloudflare adapter** — required for Keystatic server routes on Workers (`@astrojs/cloudflare`)
- Node >= 22.12.0
- Strict TypeScript (`astro/tsconfigs/strict`)

## Content system (Keystatic Reader API + .mdoc files)

Content managed by **Keystatic CMS**, NOT Astro content collections. No `src/content.config.ts` — removed.

- **Content files:** `.mdoc` format (YAML frontmatter + Markdoc body) in `src/content/`
- **Schemas:** Defined in `keystatic.config.ts` (not Zod — Keystatic `fields.*` API)
- **Reader:** `src/lib/keystatic.ts` exports singleton `reader` used by all pages
- **Pages use:** `reader.collections.subjects.all()` instead of `getCollection('subjects')`
- **Entry shape:** `{ slug: string, entry: { title, description, ... } }` — no `.data` nesting

## Storage modes

- **Dev:** `kind: 'local'` — reads/writes `.mdoc` files directly on disk
- **Production:** `kind: 'github'` — commits to GitHub via OAuth, triggers redeploy

## Directory structure

```
src/
├── content/            # .mdoc content files (Keystatic-managed, never edit manually)
│   ├── subjects/       # IB subject listings (one .mdoc per subject)
│   ├── news/           # news articles (.mdoc)
│   ├── cas/            # CAS activity logs (.mdoc)
│   └── tok/            # TOK essays and materials (.mdoc)
├── pages/              # route-based Astro pages (use Keystatic reader)
│   ├── [locale]/       # all localized pages (en/sk) live here
│   └── …               # root: 404, locale redirects, rss.xml.ts, sitemap.xml.ts
├── layouts/            # Layout.astro — shared shell with nav + footer
├── components/         # reusable .astro components (PageHeader, LanguageSwitcher, ProgrammeOverview)
├── data/               # verified code-managed reference data (e.g. current IB team roster)
├── i18n/               # dictionaries.ts — EN/SK UI strings
├── lib/                # keystatic.ts — reader singleton
├── middleware.ts       # manual i18n routing; lets /keystatic + /api/keystatic bypass i18n
└── styles/             # global.css (Tailwind import)
keystatic.config.ts     # CMS config — collections, fields, storage
```

## Style conventions

- Colors: `emerald-700` primary, `stone-50`/`stone-200`/`stone-600`/`stone-900` neutrals
- Tailwind utility classes only — no custom CSS unless unavoidable
- Nav sticky.
- **Layout — avoid the sterile, AI-generated look.** Do NOT wrap every page in the same narrow `max-w-5xl` centered column (~60% of the viewport on a laptop, big dead margins). It makes pages feel templated and lifeless. Instead vary width and rhythm per page: lean wider (`max-w-6xl`/`max-w-7xl`) for primary content, use full-bleed sections, asymmetric/editorial grids, and offset elements so no two pages share the identical centered band. Width is a design choice per section, not one global container.

## Commits

Use `/caveman-commit` for every commit — not just when asked. Commit after each completed feature or logical unit of work. Messages ≤50 chars, Conventional Commits format.
do **NOT** end git commit messages with: Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>!! Important!!

## Tracking files

- [`TODO.md`](TODO.md) — AI task backlog (things AI must build)
- [`FEATURES.md`](FEATURES.md) — completed features (update when shipping)
- [`humans/HUMANTODO.md`](humans/HUMANTODO.md) — decisions/content humans must provide
- Mark items `[x]` when done. Add new items as they come up.

## Documentation

Maintain detailed docs in [`humans/`](humans/) for non-technical collaborators. Update after significant feature work:

- `humans/CONTENT.md` — field reference, editor workflow, adding content via Keystatic
- `humans/DESIGN.md` — design tokens, layout, styling rules, CMS architecture
- `humans/README.md` — onboarding index

## Deployment

- **Target:** Cloudflare Workers with static assets, deployed from `VSHT3/ib-ceska` branch `main`. Full reference: [`humans/DEPLOY.md`](humans/DEPLOY.md).
- **Workers Builds:** build command `pnpm run build`; deploy command `npx wrangler deploy`.
- **Auto-deploy:** pushes and Keystatic Saves both commit to `main`, triggering the production build.
- **Keystatic:** Production uses GitHub OAuth storage — **three** env vars set: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET` (from `IB Ceska CMS` GitHub App, ID `4043810` — separate from `v-s-h-t3` deploy app), and `KEYSTATIC_SECRET` (random hex, signs login sessions). CMS app's OAuth callback must equal `<origin>/api/keystatic/github/oauth/callback`.
- **HTTPS mandatory for CMS** — Keystatic uses `crypto.subtle.digest`, `undefined` on plain HTTP, crashing editor with `Cannot read properties of undefined (reading 'digest')` / "Unable to load collection". FQDN must be `https://` so Traefik issues Let's Encrypt cert. See [`humans/DEPLOY.md`](humans/DEPLOY.md).
- **Domain:** target `ib.gymnaziumceska.sk` after the Cloudflare Worker and CMS are verified — switch steps in `TODO.md`.

## Gotchas

- Content files `.mdoc`, NOT `.mdx` or `.md`. Don't create `.mdx` files in `src/content/`.
- Tailwind 4 uses CSS-based config (`@import "tailwindcss"` in global.css). No `tailwind.config.js`.
- Package manager is **pnpm** (`packageManager` pinned in `package.json`). Dependency build scripts are blocked by default — allowlist lives in `pnpm-workspace.yaml` (`allowBuilds`: esbuild, sharp, workerd).
- `sharp` must stay a direct dependency — pnpm's strict `node_modules` doesn't hoist it, and Astro's image service resolves it from the project root ("Could not find Sharp" build failure otherwise).
- `site` URL in `astro.config.mjs` is `https://ib.gymnaziumceska.sk`.
- `tsconfig.json` uses `"exclude": ["dist"]` — do not remove.
- Keystatic schema changes (`keystatic.config.ts`) require restarting `pnpm run dev`.
- A server adapter is required even though public pages are prerendered: Keystatic injects runtime API routes. Do not turn the project into a static-only deployment.
- **Two adapters, by command.** `astro dev` uses `@astrojs/node`; `build`/`preview`/`deploy` use `@astrojs/cloudflare` (`isDev` switch in `astro.config.mjs`). The Cloudflare adapter runs dev SSR inside `workerd`, which has no filesystem and no CommonJS: Keystatic's local reader returns empty collections (pages render with no subjects/news) and its API routes throw `exports is not defined`. Do not remove `@astrojs/node`. If dev ever complains "Another astro dev server is already running", run `pnpm exec astro dev stop`.
- **`prerenderEnvironment: 'node'` on the Cloudflare adapter is load-bearing.** Its default prerenders inside `workerd` too, so the same no-filesystem problem hits `pnpm run build`: every page builds with 0 subjects / 0 news and the site deploys "empty" with no build error. If content vanishes on the live site, check that option first.
- YAML values with colons (e.g. `LO1: text`) must be quoted in `.mdoc` frontmatter.
- Keystatic CMS needs **secure origin** (HTTPS or localhost). On plain HTTP `crypto.subtle` undefined → "Unable to load collection" / `reading 'digest'` crash. Never deploy CMS on `http://` FQDN.
- i18n uses `routing: 'manual'` + `src/middleware.ts`. Built-in `prefixDefaultLocale` 404s any path without locale prefix, killing Keystatic's injected `/keystatic` and `/api/keystatic` routes — middleware lets them bypass i18n. Don't switch back to built-in routing.
- Astro 7 defaults `compressHTML` to `'jsx'`: whitespace between expressions on separate source lines is stripped, so `{a}\n{b}` renders `ab`. Put an explicit `{' '}` where a space must survive (see `src/layouts/Layout.astro` footer copyright).
- `vite.build.cssTarget` is pinned in `astro.config.mjs`. Without it Vite 8 emits Tailwind's media range syntax (`@media (width>=40rem)`), which Safari <16.4 ignores — every responsive breakpoint would collapse to the mobile layout.
- `@keystatic/astro` 6 reads `KEYSTATIC_*` at runtime. Cloudflare Worker secrets satisfy this; never commit them or put their values in `wrangler.jsonc`.
