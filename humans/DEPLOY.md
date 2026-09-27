# DEPLOY — how the live site runs

Where the site is hosted, how a deploy happens, and what to do when something breaks. Developer-focused; non-developers can stop after "How updates go live".

## Where it lives

- **Host:** Cloudflare Workers with static assets.
- **Source:** GitHub repo `VSHT3/ib-ceska`, branch `main`.
- **Current URL:** `https://ib-ceska.vsht.workers.dev` (live since 2026-09-02).
- **Planned school hostname:** `https://ib.gymnaziumceska.sk` only after the school approves a DNS solution. The existing school DNS stays with its administrator.

### Keystatic Cloud cutover

The **currently deployed** CMS still uses the `IB Ceska CMS` GitHub App. The
next release uses Keystatic Cloud; teachers can sign in without GitHub accounts.
The owner must first create a Keystatic Cloud team and a project connected to
`VSHT3/ib-ceska` on [keystatic.cloud](https://keystatic.cloud). Invite each
teacher by email. Put unrelated sites in separate teams: membership grants
access to all projects in a team. The free team supports three users (owner
plus two teachers).

The Cloud project key `ib-ceska/ib-ceska` is configured in
`keystatic.config.ts`; no Worker secrets or build variables are needed for Cloud
authentication. The owner must complete the project in Keystatic Cloud: set
the primary project URL to `https://ib-ceska.vsht.workers.dev`, connect GitHub
owner `VSHT3` and repository `ib-ceska`, then invite the teachers. Local
`pnpm run dev` remains filesystem-based and requires no Cloud account. Finish
the project and repository connection before pushing Cloud-mode code to `main`.

After deployment, test an invited teacher signing in, opening a collection,
saving an edit to `main` and the resulting rebuild. Only then remove the old
`IB Ceska CMS` GitHub App installation, revoke its client secret (previously
exposed in chat), and remove obsolete `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET` and `KEYSTATIC_SECRET` Worker secrets. Do
not rotate the old secret instead of removing it after the switch.

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

A Worker **Custom Domain** requires an active Cloudflare zone. A plain CNAME from the
current DNS provider to `workers.dev` does **not** make a Worker Custom Domain work.
The non-disruptive Cloudflare option is a **partial (CNAME) zone**, which requires
Cloudflare Business or Enterprise: the school adds a verification TXT record and replaces
only the existing `ib` CNAME with the Cloudflare-provided hostname when ready to
cut over. The root nameservers, main website and mail stay put. On a partial zone,
Universal SSL may provision only after the CNAME is proxied; coordinate certificate
validation and a rollback window with the school administrator before the switch.
See [partial-zone setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/)
and [Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
Standalone subdomain zone delegation also avoids moving root nameservers, but Cloudflare
currently limits subdomain-zone setup to Enterprise.

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
The `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and
`KEYSTATIC_SECRET` Worker secrets are used only by the **currently deployed**
GitHub-mode version; remove them after Cloud login and Save work.

## ⚠️ The site MUST be served over HTTPS (not plain HTTP)

Keystatic computes a SHA digest of every entry in the browser using the Web Crypto API (`crypto.subtle`). **`crypto.subtle` only exists on a secure origin — HTTPS or `localhost`.** On plain `http://` it is `undefined`, and the CMS crashes with:

```
TypeError: Cannot read properties of undefined (reading 'digest')
Unable to load collection
```

Opening a collection or saving can fail on plain HTTP. Cloudflare supplies HTTPS for both `workers.dev` and Custom Domains. Ref: [Thinkmill/keystatic#182](https://github.com/Thinkmill/keystatic/issues/182).

## Verification boundary

Local builds and preview can verify static content and the Cloud-mode UI.
Signing in as a teacher and saving to `main` require a real Keystatic Cloud
project connected to the repository, an invited editor, and the deployed origin.

## Switching to the school hostname

Only after the school approves a DNS approach and the required zone is active:

1. Coordinate the replacement of the old Framer `ib` hostname with the school administrator.
2. Add `ib.gymnaziumceska.sk` as the Worker's Custom Domain and plan TLS validation.
3. On a partial-zone setup, have the DNS administrator change **only** the `ib` CNAME to the Cloudflare-provided target. Do not touch the root nameservers. Confirm HTTPS certificate issuance before considering the cutover complete.
4. Verify public pages, canonical links, images, Keystatic Cloud login and Save on the new origin.
5. Keep the `workers.dev` address available until the new origin is stable.

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
