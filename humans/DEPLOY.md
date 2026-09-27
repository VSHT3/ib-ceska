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

One non-disruptive option is a **partial (CNAME) zone** on Cloudflare Business
or Enterprise: the school adds a verification TXT record and later replaces
only its existing `ib` CNAME. See [partial-zone setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/)
and [Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
Another option on a Free plan is [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/)
with a Worker as the [fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin/).
The owner selected `morumori.com` as a possible backing zone, but Cloudflare
rejected an exact `ib.gymnaziumceska.sk/*` Worker route there (zone name
required). A `*/*` route would catch unrelated `morumori.com` traffic; do not
add it without a complete audit and exclusions, or use a dedicated zone.
Enabling SaaS on a Free-plan zone [requires payment information](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/enable/),
and the available CLI OAuth lacks DNS/custom-hostname permissions. No SaaS
resources were configured. Both approaches leave the school's parent
nameservers and mail untouched. Coordinate TLS validation and a rollback
window with the school administrator. See `GO-LIVE-HANDOFF.md`.

Until the school chooses and approves a route, use the existing HTTPS `workers.dev`
address. Do not promise working canonical links or social images there: the build's
`site` setting currently points at the school hostname, still served by Framer.

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

Only after the school approves a DNS approach and the necessary Cloudflare
zone/custom-hostname setup is active:

1. Coordinate replacement of the old Framer `ib` hostname with the school administrator.
2. For a partial zone, attach `ib.gymnaziumceska.sk` as the `ib-ceska` Worker's Custom Domain. For Cloudflare for SaaS, configure its custom hostname, fallback origin and narrowly scoped route to the Worker instead.
3. Pre-validate hostname ownership and TLS where the chosen setup allows it; have the DNS administrator change **only** the `ib` CNAME to its correct target. Do not touch parent nameservers. Confirm HTTPS certificate issuance.
4. Add `https://ib.gymnaziumceska.sk` to the Keystatic Cloud project's allowed URLs, keeping the working `workers.dev` URL.
5. Verify public pages, canonical links, images, Keystatic Cloud login and Save on the new origin. Keep `workers.dev` available until stable.

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
