# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Cloudflare Workers with static assets.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Initial URL:** `https://ib-ceska.<account-subdomain>.workers.dev`.
- **Production domain:** `https://ib.gymnaziumceska.sk` after the DNS cutover.

### GitHub App

| App                               | Purpose                                                               | Where configured         |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------ |
| `IB Ceska CMS` (App ID `4043810`) | Keystatic CMS login: lets editors authenticate + commit content edits | github.com/settings/apps |

The `IB Ceska CMS` app needs a callback for every origin used by editors:
`https://<origin>/api/keystatic/github/oauth/callback`.

## Cloudflare Workers deployment

The repository targets Cloudflare Workers:

- `pnpm run build` creates the production Worker and static assets.
- `pnpm run preview` runs the built application in the local Workers runtime.
- `pnpm run deploy` builds and deploys manually after authenticating Wrangler.

Current Astro 7 releases deploy server-rendered routes to **Workers with static assets**, not Cloudflare Pages. Do not create a Pages project or configure a Pages output directory. Both products appear under the same **Workers & Pages** dashboard heading.

### Create the Worker from GitHub

1. Cloudflare → **Workers & Pages** → **Create** → import `VSHT3/ib-ceska`.
2. Select `main` as the production branch. Do not create a separate `production` branch: Keystatic content saves commit to `main` and must trigger production rebuilds.
3. Set the build command to `pnpm run build`.
4. Set the deploy command to `npx wrangler deploy`.
5. Keep the Worker name `ib-ceska`, matching `wrangler.jsonc`.
6. Add these as encrypted Worker secrets, not plain variables and never repository files:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
7. Deploy and note the generated `https://ib-ceska.<account-subdomain>.workers.dev` URL.
8. In the `IB Ceska CMS` GitHub App, add `https://ib-ceska.<account-subdomain>.workers.dev/api/keystatic/github/oauth/callback` as a callback URL. GitHub Apps support multiple callback URLs.

The Cloudflare adapter provisions an `ASSETS` binding for the static site and a `SESSION` KV binding for Astro sessions. No manual KV namespace is required by the repository configuration.

### Verify before changing DNS

Check all of the following on the `workers.dev` URL:

| Check             | Expected result                                         |
| ----------------- | ------------------------------------------------------- |
| `/`               | 200 and language redirect behavior works                |
| `/en/` and `/sk/` | Both localized homepages load with images and styles    |
| `/keystatic`      | Admin interface loads over HTTPS                        |
| GitHub login      | Returns to the same Worker origin                       |
| Open a collection | Entries load without a Web Crypto error                 |
| Save an edit      | A commit reaches `main` and triggers a new Worker build |

Complete every check before attaching the school domain.

### Cloudflare custom-domain prerequisite

A Workers Custom Domain must belong to an **active Cloudflare DNS zone**. Pointing an external CNAME directly at `workers.dev` is not sufficient and will not provision correct routing or TLS.

Before changing the nameservers for `gymnaziumceska.sk`:

1. Add `gymnaziumceska.sk` as a website in Cloudflare.
2. Copy and verify every existing DNS record, especially the school website and email records (`MX`, SPF, DKIM and DMARC).
3. Ask the authorized school/domain administrator to replace the registrar nameservers with Cloudflare's assigned nameservers.
4. Wait until Cloudflare reports the zone as active.
5. Worker → **Settings** → **Domains & Routes** → **Add Custom Domain** → `ib.gymnaziumceska.sk`.

Moving nameservers without first reproducing all records can interrupt the school's main website or email. DNS cutover therefore remains a human-controlled step.

## How updates go live (auto-deploy)

Cloudflare Workers Builds watches `main`:

1. A change is pushed to `main` (either a `git push`, or a content **Save** in `/keystatic/` which commits to the repo).
2. Cloudflare builds the Worker and static assets.
3. A successful build becomes the production Worker version.

Use `pnpm run deploy` only for an intentional manual deployment.

## Build configuration

The site is Astro in **hybrid mode**: public pages are prerendered, while `/keystatic/` and its API routes execute in the Worker.

| Setting           | Value                 |
| ----------------- | --------------------- |
| Production branch | `main`                |
| Build command     | `pnpm run build`      |
| Deploy command    | `npx wrangler deploy` |
| Wrangler config   | `wrangler.jsonc`      |

### Required environment variables

Set these as encrypted secrets in the Worker's settings:

| Key                              | Value                                       | Why                                              |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| `KEYSTATIC_GITHUB_CLIENT_ID`     | (from the `IB Ceska CMS` GitHub App)        | Identifies the GitHub App at login               |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | (generated on the GitHub App, shown once)   | Exchanges the OAuth authorization code           |
| `KEYSTATIC_SECRET`               | random 32-byte hex (`openssl rand -hex 32`) | Signs the editor's login session; keep it stable |

> **Three** Keystatic vars, not two — `KEYSTATIC_SECRET` is easy to miss. Without it the API throws "Missing required config … secret".

## ⚠️ The site MUST be served over HTTPS (not plain HTTP)

Keystatic computes a SHA digest of every entry in the browser using the Web Crypto API (`crypto.subtle`). **`crypto.subtle` only exists on a secure origin — HTTPS or `localhost`.** On plain `http://` it is `undefined`, and the CMS crashes with:

```
TypeError: Cannot read properties of undefined (reading 'digest')
Unable to load collection
```

Login still works (that's server-side), and pages may half-render, but **opening a collection or saving fails** until the site is HTTPS. Cloudflare supplies HTTPS for both `workers.dev` and Custom Domains. Ref: [Thinkmill/keystatic#182](https://github.com/Thinkmill/keystatic/issues/182).

## Locally verified

The Worker build, Wrangler deployment dry run, static asset binding, KV session binding, `/`, `/en/`, `/keystatic`, and the Keystatic login redirect have passed locally. Real GitHub login and Save require the deployed Worker URL and production secrets.

## Switching to the real domain

After the Cloudflare Worker passes every preview check and the DNS zone is active:

1. Add `ib.gymnaziumceska.sk` as the Worker's Custom Domain.
2. Wait for Cloudflare to report the hostname and certificate as active.
3. Change the `IB Ceska CMS` GitHub App callback to `https://ib.gymnaziumceska.sk/api/keystatic/github/oauth/callback`.
4. Verify login and Save again on the real domain.
5. Remove any obsolete host only after the Cloudflare deployment is stable.

The `site` URL in `astro.config.mjs` is already `https://ib.gymnaziumceska.sk` (used for canonical links and the sitemap).

## Troubleshooting

- **CMS error "Unable to load collection" / `reading 'digest'`:** confirm the browser is using the HTTPS Worker or Custom Domain URL.
- **`/api/keystatic/github/login` → 500 with an empty body:** the running Worker can't see one of the three `KEYSTATIC_*` secrets (the log says "Missing required config …"). Two causes seen so far: a var is genuinely missing (commonly `KEYSTATIC_SECRET`), or the secrets were added in the dashboard but the resulting version was never deployed — the dashboard shows them, `wrangler secret list` shows them, yet `wrangler deployments list` still points at an older version. Click **Deploy** after editing variables, or run `npx wrangler versions list` and `npx wrangler versions deploy <id>@100% -y`.
- **CMS login redirects to a 404/blank after authorizing:** the GitHub App **Callback URL** doesn't match the live origin (`https://…/api/keystatic/github/oauth/callback`).
- **Save does nothing:** if not the HTTPS issue above, confirm the `IB Ceska CMS` app is installed on `VSHT3/ib-ceska` with **Contents: read/write** + **Pull requests: read/write** (changing permissions requires re-approving the install).
- **Push didn't deploy:** confirm Workers Builds is connected to `VSHT3/ib-ceska` and the production branch is `main`.
- **Cloudflare deploy says Pages or `ASSETS` is reserved:** a Pages project was created. Use a Worker; current Astro Cloudflare adapters no longer support Pages SSR.
- **Cloudflare CMS reports missing config:** add all three `KEYSTATIC_*` values as Worker secrets. Build-time variables alone do not replace runtime secrets.
- **Custom Domain cannot be added:** confirm `gymnaziumceska.sk` is an active zone in the same Cloudflare account.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or the school:

- Cloudflare account access for the Worker and DNS zone.
- DNS control for `ib.gymnaziumceska.sk`.
- The `IB Ceska CMS` GitHub App (App ID `4043810`) and the three production `KEYSTATIC_*` values.

See `HUMANTODO.md` → "Succession".
