import { defineMiddleware } from 'astro:middleware';
import { middleware as i18nMiddleware } from 'astro:i18n';

// Paths injected by integrations that live outside the /[locale]/ tree. With
// `prefixDefaultLocale: true`, Astro's i18n middleware 404s any path without a
// locale prefix, so these (Keystatic admin UI + its API) must skip i18n entirely.
const BYPASS_PREFIXES = ['/keystatic', '/api/keystatic'];

const i18n = i18nMiddleware({
  prefixDefaultLocale: true,
  redirectToDefaultLocale: false,
  fallbackType: 'redirect',
});

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  const bypass = BYPASS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );
  // For Keystatic routes, go straight to the matched route, skipping i18n.
  if (bypass) return next();
  // Everything else runs through Astro's own i18n routing middleware.
  return i18n(context, next);
});
