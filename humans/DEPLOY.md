# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Cloudflare Workers with static assets.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Current URL:** `https://ib-ceska.vsht.workers.dev` (live since 2026-09-02).
- **Planned school hostname:** `https://ib.gymnaziumceska.sk` only after the school approves a DNS solution. The existing school DNS stays with its administrator.

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

### Verify before changing DNS

Check all of the following on the `workers.dev` URL after the Cloud cutover:

| Check             | Expected result                                                |
| ----------------- | -------------------------------------------------------------- |
| `/`               | 200 and language redirect behavior works                       |
| `/en/` and `/sk/` | Both localized homepages load with images and styles           |
| `/keystatic`      | Cloud sign-in appears over HTTPS                               |
| Teacher login     | Invited teacher can open a collection without a GitHub account |
| Save an edit      | A commit reaches `main` and triggers a new Worker build        |

Complete every check before attaching the school domain.

### School hostname without moving the school's DNS

**Do not change the nameservers for `gymnaziumceska.sk` as part of this project.**
The school's authoritative DNS remains at its current provider, and `ib.gymnaziumceska.sk`
currently serves the old Framer site. Replacing that one hostname needs the school/domain
administrator's approval; it does not require changing the main school's site or mail.

A Worker **Custom Domain** requires an active Cloudflare zone. A plain CNAME
from the current DNS provider to `workers.dev` does **not** make one work.
There is no `gymnaziumceska.sk` zone in this Cloudflare account.

The chosen approach is [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/)
on the owner's `morumori.com` Free-plan zone, with the [Worker as fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin/).
SaaS is enabled. `ib-ceska-fallback.morumori.com` is a proxied originless
`AAAA` record (`100::`) and the **Active** fallback origin. The proxied
`ib-ceska.morumori.com` CNAME points to that fallback; it already serves
the IB site through the `*/*` → `ib-ceska` Worker route.

Two more-specific routes protect unrelated traffic: `analytics.morumori.com/*`
has **no Worker** (and analytics currently resolves directly to `87.106.7.54`),
while `morumori.com/*` runs the original `morumori` Worker. Both analytics
`/script.js` and the studio homepage were verified after routing changed.
The SaaS custom hostname `ib.gymnaziumceska.sk` is created but still
**pending**: the school DNS administrator must publish its hostname and
certificate TXT validation records before changing only the `ib` CNAME to
`ib-ceska.morumori.com`. See `GO-LIVE-HANDOFF.md` for the exact records,
current statuses, verification steps and rollback. Parent nameservers and
mail records must remain unchanged.

The alternative, if SaaS is abandoned, is a [partial zone](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/)
on Cloudflare Business or Enterprise. A plain CNAME to `workers.dev` does
not configure a Worker Custom Domain.

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

Opening a collection or saving can fail on plain HTTP. Cloudflare supplies HTTPS for both `workers.dev` and Custom Domains. Ref: [Thinkmill/keystatic#182](https://github.com/Thinkmill/keystatic/issues/182).

## Verification boundary

The owner confirmed Keystatic Cloud editing works on the `workers.dev`
address. Teacher invitations and CMS login/Save on the school hostname remain
unverified until those accounts/origin exist.

## Switching to the school hostname

Only after the school DNS administrator approves replacing its `ib` hostname:

1. Have the administrator add the two TXT records in `GO-LIVE-HANDOFF.md`, leaving the Framer CNAME unchanged until Cloudflare reports hostname and SSL statuses **Active**. Refresh expired certificate tokens if needed.
2. Add `https://ib.gymnaziumceska.sk` to Keystatic Cloud project `ib-ceska/ib-ceska` as an allowed URL while keeping the `workers.dev` URL.
3. Have the administrator replace **only** the `ib.gymnaziumceska.sk` CNAME from `sites.framer.app` to `ib-ceska.morumori.com`. Do not touch parent nameservers or mail.
4. Verify HTTPS, public pages, analytics script, the morumori studio site, Keystatic Cloud login and Save on the new origin. Keep `workers.dev` available and restore the old Framer CNAME if the new route fails.

The `site` URL in `astro.config.mjs` is already `https://ib.gymnaziumceska.sk`
(used for canonical links, social images and the sitemap).

## Troubleshooting

- **CMS error "Unable to load collection" / `reading 'digest'`:** confirm the browser is using an HTTPS Worker or Custom Domain URL.
- **Cloud login redirects to an unauthorized origin:** ensure the Keystatic Cloud project URL includes the current origin `https://ib-ceska.vsht.workers.dev` (without `/keystatic`).
- **Cloud login or Save fails:** confirm the Cloud project is connected to `VSHT3/ib-ceska`, the editor belongs to its team, and the current build contains the correct project identifier.
- **Live pages show no subjects/news (e.g. "0 subjects, 0 groups") but the build succeeded:** the Cloudflare adapter prerendered inside `workerd`, where the Keystatic reader has no filesystem. `astro.config.mjs` must keep `prerenderEnvironment: 'node'` on `cloudflare(...)`. Verify locally: `pnpm run build`, then check `dist/client/en/subjects/index.html` contains subject links.
- **Push didn't deploy:** confirm Workers Builds is connected to `VSHT3/ib-ceska` and the production branch is `main`.
- **Cloudflare deploy says Pages or `ASSETS` is reserved:** a Pages project was created. Use a Worker; current Astro Cloudflare adapters no longer support Pages SSR.
- **Custom Domain cannot be added:** confirm the approved Cloudflare zone is active in the same account.

## Succession — what to hand over

These are **not** in the repo and must be transferred to the next maintainer or school:

- Cloudflare account access for the Worker and any future school-hostname zone.
- School administrator contact for DNS control over `ib.gymnaziumceska.sk`.
- Keystatic Cloud team ownership, project settings and editor invitations; the
  owner also needs GitHub access to maintain the repository connection.

See `HUMANTODO.md` → "Succession".
