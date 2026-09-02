# Humans — working on the IB website

Welcome. This is the documentation hub for everyone who helps run the IB website for Súkromné Gymnázium Česká — coordinators, teachers, students, and future developers. No prior web-development experience is needed to **edit content**; the developer notes are clearly marked.

## What's here

| File           | Purpose                                                      |
| -------------- | ------------------------------------------------------------ |
| `README.md`    | This file — start here                                       |
| `TUTORIAL.md`  | Step-by-step "how to edit the site" walkthrough for teachers |
| `CONTENT.md`   | How to add and edit content (subjects, news, CAS, TOK)       |
| `DESIGN.md`    | Design choices, colors, and layout rules                     |
| `DEPLOY.md`    | Where the site is hosted, how deploys work (developer)       |
| `HUMANTODO.md` | Decisions and material the school must provide               |
| `handover.pdf` | Original handover brief from the start of the project        |

The project root also has two files developers should read:

- **`README.md`** — technical quick-start, stack, deploy.
- **`AGENTS.md`** — conventions, gotchas, and rules for AI agents and developers.

## Who this is for

- **IB coordinators** — adding subjects, CAS entries, TOK materials, and news.
- **Teachers** — keeping their subject pages up to date.
- **Students** — logging CAS activities and TOK work (where permitted).
- **Future developers** — maintaining and extending the site after the current maintainer leaves (see _Succession_ below).

## Editing content — the short version

Everything visitors read is edited through the **Keystatic CMS**, a visual editor in your browser. You do **not** edit files by hand.

1. Open the admin panel: `/keystatic/` (e.g. `https://ib.gymnaziumceska.sk/keystatic/`).
2. Pick a collection — Subjects, News, CAS Activities, or TOK Materials.
3. Click an entry to edit, or **Create** a new one.
4. Fill in the fields and **Save**. On the live site this saves as a commit to GitHub and the site redeploys automatically.

New to this? Start with the step-by-step [`TUTORIAL.md`](TUTORIAL.md). Full field-by-field instructions are in [`CONTENT.md`](CONTENT.md). No HTML, CSS, or JavaScript required.

## Who is allowed to edit (access & security)

- On the **live site**, saving requires logging in with **GitHub**. Only people added as collaborators on the `VSHT3/ib-ceska` GitHub repository can save changes. GitHub repository membership _is_ the list of authorized editors.
- **Each editor uses their own free GitHub account — never a shared login.** Every save is committed as that person (so the history shows who changed what), and access can be revoked per-person. Step-by-step in [`CONTENT.md`](CONTENT.md) → "Getting an editor their own access".
- To give a new person edit access: add their GitHub account to the repository as a collaborator with Write access (a developer or the repo owner does this). To remove access: remove them from the repo.
- The repo is **public** — anyone can _read_ the source, but only collaborators can _save_. That's fine: it is a school site, and production secrets live in Cloudflare Worker secrets, not in the repo.
- ⚠️ As of now the production login is **not finished being set up** — see "Critical — before launch" in [`HUMANTODO.md`](HUMANTODO.md). A developer must register a GitHub App and add two secret keys before the live CMS can save.
- The admin page address (`/keystatic/`) is reachable by anyone, but **no one can change anything without a GitHub login that has repo access**. For extra peace of mind, a developer can also put the page behind a password at the server level (tracked in the root `TODO.md`).

## Succession — for whoever takes this over

The person who built this site is handing it off. If you are the new maintainer, read this:

- **Where things live**
  - Content (what visitors read): `.mdoc` files in `src/content/` — but edit them through `/keystatic/`, not by hand.
  - Verified IB team roster and published portraits: `src/data/teachers.ts` and `src/assets/teachers/` — update these when the official IB team page changes.
  - Page layouts and components: `src/pages/`, `src/layouts/`, `src/components/`.
  - All translatable interface text (menus, buttons, headings): `src/i18n/dictionaries.ts`.
  - CMS schema (what fields each content type has): `keystatic.config.ts`.
  - Design tokens and styling rules: `src/styles/global.css` and [`DESIGN.md`](DESIGN.md).
- **First steps as a developer**
  1. Install Node ≥ 22.12.0, run `pnpm install`, then `pnpm run dev`.
  2. Read the root `AGENTS.md` — it lists the stack, commands, and easy-to-trip-on gotchas (e.g. content files are `.mdoc` not `.mdx`; Tailwind 4 has no config file).
  3. Run `pnpm run check` before committing; it type-checks the whole project.
- **Keep these docs alive.** When you ship something, move it from `TODO.md` to `FEATURES.md` and update the relevant `humans/` file. The next person will thank you.
- **Access you must inherit:** the GitHub repo (owner/admin rights), Cloudflare account, DNS for `ib.gymnaziumceska.sk`, and the production environment variables. These are **not** stored in this repository — make sure they are transferred to you or the school before the previous maintainer leaves.
- **Outstanding work** is listed in [`HUMANTODO.md`](HUMANTODO.md) (needs the school) and the root `TODO.md` (developer tasks).

## When you need help

- Content questions → [`CONTENT.md`](CONTENT.md).
- Visual/style questions → [`DESIGN.md`](DESIGN.md).
- Technical issues → a developer; point them at the root `AGENTS.md`.

## How the site is built (one paragraph)

The site uses **Astro**, a modern web framework, in _hybrid_ mode: most pages are pre-built into plain static HTML for speed, while a small server runs the **Keystatic** CMS so content can be edited online. Content is stored as text files (`.mdoc`) with structured fields at the top — there is no traditional database. When content changes on the live site, it is committed to GitHub and the host rebuilds and redeploys automatically.
