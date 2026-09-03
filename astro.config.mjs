// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// `astro dev` runs SSR in Node. The Cloudflare adapter runs dev SSR inside
// workerd, which has no filesystem and no CommonJS: Keystatic's local-mode
// reader returns empty collections and its API routes throw `exports is not
// defined`. Production is unaffected (Keystatic uses GitHub storage there).
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://ib.gymnaziumceska.sk',
  // `prerenderEnvironment: 'node'`: the adapter otherwise prerenders inside
  // workerd too, where the Keystatic reader finds no filesystem and every
  // collection builds empty (0 subjects, 0 news).
  adapter: isDev
    ? node({ mode: 'standalone' })
    : cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sk'],
    // Manual routing so src/middleware.ts can let Keystatic's injected routes
    // (/keystatic, /api/keystatic) bypass i18n. Built-in routing modes 404 any
    // path without a locale prefix, which kills the CMS admin routes.
    routing: 'manual',
  },
  vite: {
    // Vite 8's CSS minifier keeps Tailwind's modern media range syntax
    // (`@media (width>=40rem)`), which Safari <16.4 ignores outright — every
    // responsive breakpoint would collapse to the mobile layout. Downlevel to
    // `min-width` for ~4.7kB.
    build: { cssTarget: ['safari15', 'chrome100', 'firefox100', 'edge100'] },
    plugins: [tailwindcss()],
    // Dev server only: allow same-machine subresource requests that arrive with
    // Sec-Fetch-Site: cross-site (e.g. previewing via 0.0.0.0 / a different host
    // than localhost). Vite blocks these by default, which 403s /public assets
    // like the IB logos in some preview setups. No prod effect.
    server: {
      cors: true,
      allowedHosts: true,
    },
  },
  integrations: [mdx(), react(), keystatic()],
});
