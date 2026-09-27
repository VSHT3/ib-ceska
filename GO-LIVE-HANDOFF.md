# School-domain handoff

For the person helping with the site tomorrow. The replacement IB site is already live at **https://ib-ceska.vsht.workers.dev**. Cloudflare Workers Builds deploys changes from `VSHT3/ib-ceska` → `main`. The site owner confirmed that the Keystatic Cloud CMS works. Do not recreate or rotate CMS credentials for the domain change.

## What is still missing

**https://ib.gymnaziumceska.sk still serves the old Framer site.** Its DNS is managed through Websupport: `gymnaziumceska.sk` uses Websupport nameservers and the `ib` hostname currently has a CNAME to `sites.framer.app`. The new site already uses `https://ib.gymnaziumceska.sk` for canonical URLs, sitemap and social-image URLs, so these do not point to the new site's assets until the hostname is cut over.

**Do not change the nameservers for `gymnaziumceska.sk`. Do not change the main school's website, MX or other mail records.** Only the `ib` hostname is in scope, and the school/domain administrator must authorize its replacement. Leave the current Framer site in place until a working replacement and rollback plan are agreed.

## Cloudflare setup completed on 2026-09-27

- Cloudflare for SaaS is enabled on the owner's Free-plan `morumori.com` zone. The `ib-ceska` Worker remains live at `https://ib-ceska.vsht.workers.dev`. No `gymnaziumceska.sk` zone or Workers Custom Domain was added.
- The proxied originless `AAAA` record `ib-ceska-fallback.morumori.com` → `100::` is the **Active** SaaS fallback origin. A proxied `CNAME` `ib-ceska.morumori.com` → `ib-ceska-fallback.morumori.com` is the **future target** for the school's `ib` record. `https://ib-ceska.morumori.com/en/` already serves the IB site; do not use it as the CMS origin without adding it to Keystatic Cloud first.
- Three Worker routes exist on `morumori.com`: `*/*` → `ib-ceska` (ID `0e63e99a81d640b4813055e5b726f5b7`), `analytics.morumori.com/*` → no Worker (ID `72e6cc55fa9f41cd8a8c16b083abe767`), and `morumori.com/*` → `morumori` (ID `716c38f94b774661bb215b77bd584efe`). The more-specific routes preserve the studio website and analytics. After all routes were added, `morumori.com` again showed the studio site, and `analytics.morumori.com/script.js` returned HTTP 200.
- The Cloudflare for SaaS custom hostname `ib.gymnaziumceska.sk` exists (ID `ccca0e9e-8d5b-4e4f-8330-a19f913a7615`) with **TXT certificate validation**. Its hostname status is **pending** and certificate status **pending_validation** until the school DNS administrator adds the TXT records below. **The school's `ib` CNAME still points to `sites.framer.app`; no school DNS was changed.**
- The owner confirmed Keystatic Cloud editing works on `workers.dev`. The three obsolete `KEYSTATIC_*` Worker secrets were removed. The old GitHub App's exposed client secret still needs revocation **in GitHub**, separately.

## School DNS records needed before cutover

Have the school's authorized DNS administrator add **both** of these TXT records in Websupport, leaving the existing `ib` CNAME in place for now. The values below were returned by Cloudflare on 2026-09-27; **recheck the Custom Hostname's current validation records before entering them**, because certificate tokens can expire.

| Type | Full DNS name                              | Value                                         |
| ---- | ------------------------------------------ | --------------------------------------------- |
| TXT  | `_cf-custom-hostname.ib.gymnaziumceska.sk` | `645d351a-1440-41b7-8208-37e8476265ba`        |
| TXT  | `_acme-challenge.ib.gymnaziumceska.sk`     | `849Op5vwfz1Xr11dklj5mzLDXGLQ3mLfPGZrhzlwa54` |

The first validates hostname ownership; the second validates the HTTPS certificate. Websupport may append the domain automatically, so check how its DNS form handles full names. Wait until Cloudflare reports **both** custom-hostname status and SSL certificate status as **Active**. If Cloudflare provides new TXT tokens, use those instead.

## Safe sequence

1. The school's authorized DNS administrator adds the **two TXT records above**, leaving the old `ib` CNAME to Framer unchanged. Confirm both the custom hostname and its certificate reach **Active** in Cloudflare. Allow for validation delays and refresh expired tokens if necessary.
2. The owner adds `https://ib.gymnaziumceska.sk` to the Keystatic Cloud project **`ib-ceska/ib-ceska`** as another allowed URL, retaining `https://ib-ceska.vsht.workers.dev`. No GitHub App callback is needed in Cloud mode.
3. Agree a cutover window and record the existing `ib` CNAME/TTL. Then the school administrator replaces **only** `ib.gymnaziumceska.sk`'s CNAME from `sites.framer.app` to **`ib-ceska.morumori.com`**. Do not change the school's parent nameservers, primary site, MX or other mail records. Keep `workers.dev` available.
4. Check HTTPS, `/`, `/en/`, `/sk/`, styles/images, school documents, navigation, canonical links, sitemap and social preview image URL. Test `/keystatic/` login and one real Save from the **new** origin; confirm its commit to `main` and automatic Worker rebuild. Confirm `analytics.morumori.com/script.js`, `morumori.com`, and the school homepage/mail still work.
5. If the new hostname fails, have the school administrator restore the recorded Framer CNAME. Do not remove the old target or the Worker `workers.dev` URL until the new route is stable.

The three old GitHub-mode Worker `KEYSTATIC_*` secrets have already been removed. The exposed `IB Ceska CMS` GitHub App client secret and installation **still need removal in GitHub** by the App owner; do that separately from the domain cutover. More detail: [`humans/DEPLOY.md`](humans/DEPLOY.md).
