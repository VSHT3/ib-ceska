// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://ib.gymnaziumceska.sk',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sk'],
    // Manual routing so src/middleware.ts can let Keystatic's injected routes
    // (/keystatic, /api/keystatic) bypass i18n. Built-in routing modes 404 any
    // path without a locale prefix, which kills the CMS admin routes.
    routing: 'manual',
  },
  vite: {
    plugins: [tailwindcss()],
    // Dev server only: allow same-machine subresource requests that arrive with
    // Sec-Fetch-Site: cross-site (e.g. previewing via 0.0.0.0 / a different host
    // than localhost). Astro 6 / Vite 6 block these by default, which 403s
    // /public assets like the IB logos in some preview setups. No prod effect.
    server: {
      cors: true,
      allowedHosts: true,
    },
  },
  integrations: [mdx(), react(), keystatic()],
});
