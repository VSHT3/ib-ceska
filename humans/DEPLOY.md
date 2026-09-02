# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Coolify, running on the VPS (Coolify server name `localhost`, host `host.docker.internal`).
- **Coolify project:** `IB Česká` → environment `production` → app `IB Česká`.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Temporary URL (HTTPS):** https://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io
  (auto-generated `sslip.io` domain with a Let's Encrypt cert).
- **Prepared replacement:** Cloudflare Workers. It is not the live host until the preview and CMS checks below pass.

### Two separate GitHub Apps — don't confuse them

| App                               | Purpose                                                               | Where configured         |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------ |
| `v-s-h-t3`                        | Coolify ↔ GitHub: pulls the repo and fires the auto-deploy webhook    | Coolify → Sources        |
| `IB Ceska CMS` (App ID `4043810`) | Keystatic CMS login: lets editors authenticate + commit content edits | github.com/settings/apps |

The `IB Ceska CMS` app's **Callback URL** must match the live origin exactly:
`https://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io/api/keystatic/github/oauth/callback`

## Prepared Cloudflare Workers deployment

The repository supports both hosts during the migration:

- `pnpm run build` uses the Node adapter and keeps the current Coolify deployment working.
- `pnpm run build:cloudflare` uses the Cloudflare adapter, compile-time image optimization and KV-backed sessions.
- `pnpm run preview:cloudflare` runs the built application in the local Workers runtime.
- `pnpm run deploy:cloudflare` deploys manually after authenticating Wrangler.

Current Astro 7 releases deploy server-rendered routes to **Workers with static assets**, not Cloudflare Pages. Do not create a Pages project or configure a Pages output directory. Both products appear under the same **Workers & Pages** dashboard heading.

### Create the Worker from GitHub

1. Cloudflare → **Workers & Pages** → **Create** → import `VSHT3/ib-ceska`.
2. Select branch `main`.
3. Set the build command to `pnpm run build:cloudflare`.
4. Set the deploy command to `pnpm exec wrangler deploy`.
5. Keep the Worker name `ib-ceska`, matching `wrangler.jsonc`.
6. Add these as encrypted Worker secrets, not plain variables and never repository files:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
7. Deploy and note the generated `https://ib-ceska.<account-subdomain>.workers.dev` URL.
8. In the `IB Ceska CMS` GitHub App, add (do not replace) `https://ib-ceska.<account-subdomain>.workers.dev/api/keystatic/github/oauth/callback` as another callback URL. GitHub Apps support multiple callback URLs, so the live Coolify callback can remain during testing.

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

Keep Coolify enabled until every check passes. Since the normal `pnpm run build` remains Node-based, the existing host is an immediate rollback path.

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

The app is connected through a **GitHub App** (`v-s-h-t3`), so deploys are automatic:

1. A change is pushed to `main` (either a `git push`, or a content **Save** in `/keystatic/` which commits to the repo).
2. GitHub notifies Coolify via webhook.
3. Coolify pulls the new commit, runs the build, and swaps in the new container — no manual step.

You only trigger a deploy by hand for the very first deploy or to force a rebuild.

## Build configuration

The site is Astro in **hybrid mode** (static pages + a Node server for `/keystatic/`), so it runs as a long-lived Node process — not a static file bundle.

| Setting       | Value                                                          |
| ------------- | -------------------------------------------------------------- |
| Build pack    | nixpacks (Node 22 auto-detected)                               |
| Build command | `pnpm run build` (nixpacks detects pnpm from `pnpm-lock.yaml`) |
| Start command | `node dist/server/entry.mjs`                                   |
| Exposed port  | `4321`                                                         |

### Required environment variables

All set in Coolify → app `IB Česká` → **Environment Variables** (runtime).

| Key                              | Value                                       | Why                                                                                                                                                        |
| -------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HOST`                           | `0.0.0.0`                                   | Astro's Node adapter binds `localhost` by default; inside a container that's unreachable. Must bind all interfaces or Coolify's proxy can't reach the app. |
| `PORT`                           | `4321`                                      | Matches the exposed port the proxy routes to.                                                                                                              |
| `KEYSTATIC_GITHUB_CLIENT_ID`     | (from the `IB Ceska CMS` GitHub App)        | Keystatic GitHub OAuth — identifies the app at login.                                                                                                      |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | (generated on the GitHub App, shown once)   | OAuth secret. Rotate by regenerating on GitHub + updating this var.                                                                                        |
| `KEYSTATIC_SECRET`               | random 32-byte hex (`openssl rand -hex 32`) | Signs the editor's login session cookie. Any random value; keep it stable.                                                                                 |

> **Three** Keystatic vars, not two — `KEYSTATIC_SECRET` is easy to miss. Without it the API throws "Missing required config … secret".

## ⚠️ The site MUST be served over HTTPS (not plain HTTP)

Keystatic computes a SHA digest of every entry in the browser using the Web Crypto API (`crypto.subtle`). **`crypto.subtle` only exists on a secure origin — HTTPS or `localhost`.** On plain `http://` it is `undefined`, and the CMS crashes with:

```
TypeError: Cannot read properties of undefined (reading 'digest')
Unable to load collection
```

Login still works (that's server-side), and pages may half-render, but **opening a collection or saving fails** until the site is HTTPS. Fix = give the app an `https://` FQDN in Coolify so Traefik issues a Let's Encrypt cert (this is why the temp sslip.io URL is `https://`, not `http://`). Ref: [Thinkmill/keystatic#182](https://github.com/Thinkmill/keystatic/issues/182).

## Verified working

| Route        | Result                                                                         |
| ------------ | ------------------------------------------------------------------------------ |
| `/`          | 200 — language-detect redirect to `/en/`                                       |
| `/en/`       | 200 — full homepage                                                            |
| `/keystatic` | 200 over HTTPS — login + **content Save commits to `main`** and auto-redeploys |

After a successful Save the editor page reloads after a few seconds — that's the auto-redeploy completing; normal.

## Switching to the real domain

After the Cloudflare Worker passes every preview check and the DNS zone is active:

1. Add `ib.gymnaziumceska.sk` as the Worker's Custom Domain.
2. Wait for Cloudflare to report the hostname and certificate as active.
3. Change the `IB Ceska CMS` GitHub App callback to `https://ib.gymnaziumceska.sk/api/keystatic/github/oauth/callback`.
4. Verify login and Save again on the real domain.
5. Disable Coolify auto-deploy only after the Cloudflare deployment is stable.

The `site` URL in `astro.config.mjs` is already `https://ib.gymnaziumceska.sk` (used for canonical links and the sitemap).

## Troubleshooting

- **App shows `exited:unhealthy` / 502:** almost always the `HOST`/`PORT` binding. Confirm both env vars are set and the container is listening on `0.0.0.0:4321`.
- **CMS error "Unable to load collection" / `reading 'digest'`:** the site is being served over plain HTTP. See the HTTPS section above — give the app an `https://` FQDN.
- **`/api/keystatic/github/login` → 500 "Missing required config":** one of the three `KEYSTATIC_*` env vars is missing (commonly `KEYSTATIC_SECRET`).
- **CMS login redirects to a 404/blank after authorizing:** the GitHub App **Callback URL** doesn't match the live origin (`https://…/api/keystatic/github/oauth/callback`).
- **Save does nothing:** if not the HTTPS issue above, confirm the `IB Ceska CMS` app is installed on `VSHT3/ib-ceska` with **Contents: read/write** + **Pull requests: read/write** (changing permissions requires re-approving the install).
- **Build fails:** check the deploy logs in Coolify. Node must be ≥ 22.12.0 (nixpacks uses 22).
- **Push didn't deploy:** confirm the `v-s-h-t3` deploy app webhook is still installed on `VSHT3/ib-ceska` and the branch is `main`.
- **Cloudflare build accidentally produces a Node build:** the build command must be `pnpm run build:cloudflare`, not `pnpm run build`.
- **Cloudflare deploy says Pages or `ASSETS` is reserved:** a Pages project was created. Use a Worker; current Astro Cloudflare adapters no longer support Pages SSR.
- **Cloudflare CMS reports missing config:** add all three `KEYSTATIC_*` values as Worker secrets. Build-time variables alone do not replace runtime secrets.
- **Custom Domain cannot be added:** confirm `gymnaziumceska.sk` is an active zone in the same Cloudflare account.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or the school:

- Coolify account / VPS server login while it remains the live host or rollback.
- Cloudflare account access for the Worker and DNS zone after cutover.
- DNS control for `ib.gymnaziumceska.sk`.
- Both GitHub Apps — `v-s-h-t3` (deploy) and `IB Ceska CMS` (CMS login, App ID `4043810`) — plus the three production `KEYSTATIC_*` env values.

See `HUMANTODO.md` → "Succession".
