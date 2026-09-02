# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Coolify, running on the VPS (Coolify server name `localhost`, host `host.docker.internal`).
- **Coolify project:** `IB Česká` → environment `production` → app `IB Česká`.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Temporary URL (HTTPS):** https://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io
  (auto-generated `sslip.io` domain with a Let's Encrypt cert — swap to `ib.gymnaziumceska.sk` once DNS points at the VPS).

### Two separate GitHub Apps — don't confuse them

| App                               | Purpose                                                               | Where configured         |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------ |
| `v-s-h-t3`                        | Coolify ↔ GitHub: pulls the repo and fires the auto-deploy webhook    | Coolify → Sources        |
| `IB Ceska CMS` (App ID `4043810`) | Keystatic CMS login: lets editors authenticate + commit content edits | github.com/settings/apps |

The `IB Ceska CMS` app's **Callback URL** must match the live origin exactly:
`https://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io/api/keystatic/github/oauth/callback`

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

When DNS for `ib.gymnaziumceska.sk` points at the VPS:

1. In Coolify → app `IB Česká` → **Domains**, set the FQDN to `https://ib.gymnaziumceska.sk`.
2. Coolify requests a Let's Encrypt certificate automatically.
3. Once the production CMS login is configured, the OAuth callback URL on the GitHub App must match the real domain.

The `site` URL in `astro.config.mjs` is already `https://ib.gymnaziumceska.sk` (used for canonical links and the sitemap).

## Troubleshooting

- **App shows `exited:unhealthy` / 502:** almost always the `HOST`/`PORT` binding. Confirm both env vars are set and the container is listening on `0.0.0.0:4321`.
- **CMS error "Unable to load collection" / `reading 'digest'`:** the site is being served over plain HTTP. See the HTTPS section above — give the app an `https://` FQDN.
- **`/api/keystatic/github/login` → 500 "Missing required config":** one of the three `KEYSTATIC_*` env vars is missing (commonly `KEYSTATIC_SECRET`).
- **CMS login redirects to a 404/blank after authorizing:** the GitHub App **Callback URL** doesn't match the live origin (`https://…/api/keystatic/github/oauth/callback`).
- **Save does nothing:** if not the HTTPS issue above, confirm the `IB Ceska CMS` app is installed on `VSHT3/ib-ceska` with **Contents: read/write** + **Pull requests: read/write** (changing permissions requires re-approving the install).
- **Build fails:** check the deploy logs in Coolify. Node must be ≥ 22.12.0 (nixpacks uses 22).
- **Push didn't deploy:** confirm the `v-s-h-t3` deploy app webhook is still installed on `VSHT3/ib-ceska` and the branch is `main`.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or the school:

- Coolify account / VPS server login.
- DNS control for `ib.gymnaziumceska.sk`.
- Both GitHub Apps — `v-s-h-t3` (deploy) and `IB Ceska CMS` (CMS login, App ID `4043810`) — plus the three production `KEYSTATIC_*` env values.

See `HUMANTODO.md` → "Succession".
