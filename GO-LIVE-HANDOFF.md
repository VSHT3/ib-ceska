# School-domain handoff

For the person helping with the site tomorrow. The replacement IB site is already live at **https://ib-ceska.vsht.workers.dev**. Cloudflare Workers Builds deploys changes from `VSHT3/ib-ceska` → `main`. The site owner confirmed that the Keystatic Cloud CMS works. Do not recreate or rotate CMS credentials for the domain change.

## What is still missing

**https://ib.gymnaziumceska.sk still serves the old Framer site.** Its DNS is managed through Websupport: `gymnaziumceska.sk` uses Websupport nameservers and the `ib` hostname currently has a CNAME to `sites.framer.app`. The new site already uses `https://ib.gymnaziumceska.sk` for canonical URLs, sitemap and social-image URLs, so these do not point to the new site's assets until the hostname is cut over.

**Do not change the nameservers for `gymnaziumceska.sk`. Do not change the main school's website, MX or other mail records.** Only the `ib` hostname is in scope, and the school/domain administrator must authorize its replacement. Leave the current Framer site in place until a working replacement and rollback plan are agreed.

## Safe sequence

1. Ask the school/domain administrator for permission and access to change **only** `ib.gymnaziumceska.sk`. Confirm whether they have already chosen a Cloudflare-compatible custom-hostname solution and who owns the Cloudflare account. Record the existing `ib` DNS record and TTL before changing anything.
2. Choose the hostname setup **before** editing DNS. A Cloudflare Workers Custom Domain needs an active Cloudflare zone; simply pointing an external-DNS CNAME at `workers.dev` is **not sufficient**. One supported approach that leaves Websupport authoritative is Cloudflare's **partial (CNAME) zone**, which requires Business or Enterprise. It uses a verification TXT record and then a CNAME change for only `ib`. This is a paid-plan decision for the school/owner; do not enable or purchase it without approval. See [partial-zone setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/) and [Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/). If choosing another approach, verify its Worker routing and TLS requirements first.
3. Once the approved zone/setup is active, attach **`ib.gymnaziumceska.sk`** to the existing **`ib-ceska` Worker**. Coordinate replacing only the old `ib` DNS record with the correct target supplied by that setup. On a partial zone, certificate issuance may complete only after the CNAME is proxied: plan a short validation/rollback window with the DNS administrator. Keep the `workers.dev` address working.
4. In the Keystatic Cloud project **`ib-ceska/ib-ceska`**, add the new `https://ib.gymnaziumceska.sk` project URL without removing `https://ib-ceska.vsht.workers.dev`. Cloud login must be authorized for the new origin. No GitHub App callback URL is needed for Cloud mode.
5. Check HTTPS and the certificate, `/`, `/en/`, `/sk/`, styles/images, school documents, navigation, canonical links, sitemap and social preview image URL. Check `/keystatic/` login and one real Save from the new origin, confirm its commit to `main` and automatic Worker rebuild. The existing owner has confirmed CMS works on the Worker address; this new-origin check is still necessary. Confirm the school homepage and mail are unaffected.
6. If the new hostname fails, coordinate restoring the recorded `ib` Framer DNS record with the administrator; the Worker remains reachable on `workers.dev`. Do not remove the old hostname or rollback option until the new route is stable.

The old GitHub OAuth App and its exposed client secret are obsolete after the Keystatic Cloud cutover. Remove the App installation/secret and unused Worker `KEYSTATIC_*` secrets **separately**, only after confirming Cloud login and Save, rather than during the DNS change. More detail: [`humans/DEPLOY.md`](humans/DEPLOY.md).
