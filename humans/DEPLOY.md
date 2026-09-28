# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Cloudflare Workers with static assets.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Public school URL:** `https://ib.gymnaziumceska.sk` (live).
- **Alternate Worker URL:** `https://ib-ceska.vsht.workers.dev` (kept for fallback and CMS access).

### Keystatic Cloud cutover

The deployed CMS now uses Keystatic Cloud. The owner confirmed login and editing
work on `https://ib-ceska.vsht.workers.dev/keystatic/`; teachers can be invited
to the team later without GitHub accounts. Team membership covers every project
in that team. The free team supports three users (owner plus two teachers).

The Cloud project key `ib-ceska/ib-ceska` is configured in
`keystatic.config.ts`; no Worker secret or build variable is needed for Cloud
authentication. Local `pnpm run dev` remains filesystem-based.

The old GitHub-mode `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET` and `KEYSTATIC_SECRET` Worker secrets were
removed on 2026-09-27; the Cloud login screen still loads. The exposed
`IB Ceska CMS` GitHub App client secret and installation must still be revoked
by the GitHub App owner separately. Do not treat deleting Worker secrets as
revoking the GitHub App credential.

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
6. Complete the Keystatic Cloud project `ib-ceska/ib-ceska` and its primary
   project URL/repository connection before deploying Cloud-mode code.
7. Deploy and note the generated `https://ib-ceska.<account-subdomain>.workers.dev` URL.

The Cloudflare adapter provisions an `ASSETS` binding for the static site and a `SESSION` KV binding for Astro sessions. No manual KV namespace is required by the repository configuration.

### Production smoke checks

The school hostname serves both `/en/` and `/sk/` over HTTPS. The Cloudflare
for SaaS custom hostname and certificate became **Active** on 2026-09-28
after automatic HTTP validation. `/keystatic/` displays Keystatic Cloud
sign-in, but authenticated login and Save on the school hostname have **not**
been verified; the owner confirmed CMS editing on `workers.dev`.

After changing the hostname or Worker routes, check public pages, images,
documents, the CMS, `analytics.morumori.com/script.js`, and `morumori.com`.
Keep the alternate Worker URL available for troubleshooting.

### School hostname without moving the school's DNS

**Do not change the nameservers for `gymnaziumceska.sk`.** The school manages
its authoritative DNS at Websupport. Only its `ib.gymnaziumceska.sk` CNAME
points to `ib-ceska.morumori.com`; its main site and mail records stay put.

The school hostname is a [Cloudflare for SaaS custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)
on the owner's `morumori.com` zone, **not** a Worker Custom Domain or a
`gymnaziumceska.sk` Cloudflare zone. The Active fallback origin is a proxied
originless `AAAA 100::` at `ib-ceska-fallback.morumori.com`. A proxied CNAME
at `ib-ceska.morumori.com` points to it.

Worker routes on the `morumori.com` zone:

| Pattern                    | Worker     | Reason                       |
| -------------------------- | ---------- | ---------------------------- |
| `*/*`                      | `ib-ceska` | Serve SaaS custom hostnames  |
| `analytics.morumori.com/*` | none       | Preserve analytics           |
| `morumori.com/*`           | `morumori` | Preserve the studio homepage |

The more-specific routes must remain in place when the wildcard route is
changed. The school hostname and certificate are **Active** using automatic
**HTTP** domain validation; no TXT records were required. If changing the
validation method, confirm a replacement certificate is Active before assuming
the school hostname will continue to work.

### CMS editor access

Invite editors individually to the Keystatic Cloud team. Removing their team
membership revokes access to every project in that team. Teachers do not need
repository collaborator accounts; the owner connects GitHub once. See
`humans/CONTENT.md` for the editing workflow.

Optionally add Cloudflare Zero Trust Access as a **self-hosted application**
for the CMS paths on each editor-facing hostname, allowing the same individual
email addresses. Do not gate the whole Worker: public pages must stay public.
Test the Cloud sign-in and Save flow end to end before enabling extra gating.
See [Worker Access path protection](https://developers.cloudflare.com/workers/configuration/cloudflare-access/#protect-a-specific-hostname-custom-domain-or-path).

## How updates go live (auto-deploy)

Cloudflare Workers Builds watches `main`:

1. A change is pushed to `main` (either a `git push`, or a content **Save** in `/keystatic/` which commits to the repo).
2. Cloudflare builds the Worker and static assets.
3. A successful build becomes the production Worker version.

Use `pnpm run deploy` only for an intentional manual deployment.

## Build configuration

The site is Astro in **hybrid mode**: public pages are prerendered, while `/keystatic/` is served by the Worker. In Cloud mode editor authentication and repository access are handled by Keystatic Cloud.

| Setting           | Value                 |
| ----------------- | --------------------- |
| Production branch | `main`                |
| Build command     | `pnpm run build`      |
| Deploy command    | `npx wrangler deploy` |
| Wrangler config   | `wrangler.jsonc`      |

### Cloud project configuration

`keystatic.config.ts` specifies the Cloud project key `ib-ceska/ib-ceska`.
No Cloud project environment variable or Worker runtime secret is required.
The old GitHub-mode Worker secrets were removed after the owner confirmed the
Cloud CMS works. The old GitHub App installation and exposed client secret
still need revocation at GitHub; this is separate from Cloudflare configuration.

## ⚠️ The site MUST be served over HTTPS (not plain HTTP)

Keystatic computes a SHA digest of every entry in the browser using the Web Crypto API (`crypto.subtle`). **`crypto.subtle` only exists on a secure origin — HTTPS or `localhost`.** On plain `http://` it is `undefined`, and the CMS crashes with:

```
TypeError: Cannot read properties of undefined (reading 'digest')
Unable to load collection
```

Opening a collection or saving can fail on plain HTTP. Cloudflare serves HTTPS for `workers.dev` and for the school's SaaS custom hostname. Ref: [Thinkmill/keystatic#182](https://github.com/Thinkmill/keystatic/issues/182).

## Verification boundary and rollback

The owner confirmed Keystatic Cloud editing on `workers.dev`. The public
school-origin pages and CMS sign-in screen load, but an **authenticated**
login and Save from `https://ib.gymnaziumceska.sk/keystatic/` remain to be
verified. If Cloud rejects the new origin, add
`https://ib.gymnaziumceska.sk` to project `ib-ceska/ib-ceska`'s allowed URLs,
retaining the `workers.dev` URL. Verify the resulting commit to `main` and
automatic rebuild before onboarding editors there.

If the school hostname fails, the authorized Websupport DNS administrator
can restore **only** its previous `ib` CNAME (`sites.framer.app`) while the
Worker remains reachable at `workers.dev`. Do not change parent nameservers,
school mail or unrelated DNS. After restoration, recheck certificate status,
analytics, and the `morumori.com` studio homepage.

The `site` URL in `astro.config.mjs` is `https://ib.gymnaziumceska.sk`
(used for canonical links, social images and the sitemap).

## Troubleshooting

- **CMS error "Unable to load collection" / `reading 'digest'`:** confirm the browser is using HTTPS.
- **Cloud login redirects to an unauthorized origin:** add `https://ib.gymnaziumceska.sk` to Keystatic Cloud project `ib-ceska/ib-ceska`'s allowed URLs, retaining the working `workers.dev` URL.
- **Cloud login or Save fails:** confirm the Cloud project is connected to `VSHT3/ib-ceska`, the editor belongs to its team, and the current build contains the correct project identifier.
- **Live pages show no subjects/news (e.g. "0 subjects, 0 groups") but the build succeeded:** the Cloudflare adapter prerendered inside `workerd`, where the Keystatic reader has no filesystem. `astro.config.mjs` must keep `prerenderEnvironment: 'node'` on `cloudflare(...)`. Verify locally: `pnpm run build`, then check `dist/client/en/subjects/index.html` contains subject links.
- **Push didn't deploy:** confirm Workers Builds is connected to `VSHT3/ib-ceska` and the production branch is `main`.
- **Cloudflare deploy says Pages or `ASSETS` is reserved:** a Pages project was created. Use a Worker; current Astro Cloudflare adapters no longer support Pages SSR.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or school:

- Cloudflare account access for the Worker and any future school-hostname zone.
- School administrator contact for DNS control over `ib.gymnaziumceska.sk`.
- Keystatic Cloud team ownership, project settings and editor invitations; the
  owner also needs GitHub access to maintain the repository connection.

See `HUMANTODO.md` → "Succession".
