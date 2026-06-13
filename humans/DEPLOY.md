# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Coolify, running on the VPS (Coolify server name `localhost`, host `host.docker.internal`).
- **Coolify project:** `IB Česká` → environment `production` → app `IB Česká`.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Temporary URL:** http://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io
  (auto-generated `sslip.io` domain — swap to `ib.gymnaziumceska.sk` once DNS points at the VPS).

## How updates go live (auto-deploy)

The app is connected through a **GitHub App** (`v-s-h-t3`), so deploys are automatic:

1. A change is pushed to `main` (either a `git push`, or a content **Save** in `/keystatic/` which commits to the repo).
2. GitHub notifies Coolify via webhook.
3. Coolify pulls the new commit, runs the build, and swaps in the new container — no manual step.

You only trigger a deploy by hand for the very first deploy or to force a rebuild.

## Build configuration

The site is Astro in **hybrid mode** (static pages + a Node server for `/keystatic/`), so it runs as a long-lived Node process — not a static file bundle.

| Setting        | Value                          |
| -------------- | ------------------------------ |
| Build pack     | nixpacks (Node 22 auto-detected) |
| Build command  | `npm run build`                |
| Start command  | `node dist/server/entry.mjs`   |
| Exposed port   | `4321`                         |

### Required environment variables

| Key    | Value     | Why                                                                 |
| ------ | --------- | ------------------------------------------------------------------- |
| `HOST` | `0.0.0.0` | Astro's Node adapter binds `localhost` by default; inside a container that's unreachable. Must bind all interfaces or Coolify's proxy can't reach the app. |
| `PORT` | `4321`    | Matches the exposed port the proxy routes to.                       |

**Not set yet (production CMS login):**

| Key                            | Status   |
| ------------------------------ | -------- |
| `KEYSTATIC_GITHUB_CLIENT_ID`   | missing  |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | missing |

Until these exist, `/keystatic/` loads but **GitHub login (and therefore saving) does not work**. See `HUMANTODO.md` → "Critical — before launch".

## First deploy was verified

| Route        | Result                                          |
| ------------ | ----------------------------------------------- |
| `/`          | 200 — language-detect redirect to `/en/`        |
| `/en/`       | 200 — full homepage                             |
| `/keystatic` | 200 — admin route served (Node adapter working) |

## Switching to the real domain

When DNS for `ib.gymnaziumceska.sk` points at the VPS:

1. In Coolify → app `IB Česká` → **Domains**, set the FQDN to `https://ib.gymnaziumceska.sk`.
2. Coolify requests a Let's Encrypt certificate automatically.
3. Once the production CMS login is configured, the OAuth callback URL on the GitHub App must match the real domain.

The `site` URL in `astro.config.mjs` is already `https://ib.gymnaziumceska.sk` (used for canonical links, sitemap, RSS).

## Troubleshooting

- **App shows `exited:unhealthy` / 502:** almost always the `HOST`/`PORT` binding. Confirm both env vars are set and the container is listening on `0.0.0.0:4321`.
- **Build fails:** check the deploy logs in Coolify. Node must be ≥ 22.12.0 (nixpacks uses 22).
- **Push didn't deploy:** confirm the GitHub App webhook is still installed on `VSHT3/ib-ceska` and the branch is `main`.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or the school:

- Coolify account / VPS server login.
- DNS control for `ib.gymnaziumceska.sk`.
- The GitHub App (`v-s-h-t3`) and the production Keystatic OAuth secrets.

See `HUMANTODO.md` → "Succession".
