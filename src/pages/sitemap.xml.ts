import type { APIRoute } from 'astro';
import { reader } from '../lib/keystatic';

export const prerender = true;

const SITE = 'https://ib.gymnaziumceska.sk';
const LOCALES = ['en', 'sk'] as const;

function urlEntry(path: string): string {
  const alternates = LOCALES.map(
    (code) =>
      `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE}/${code}${path === '/' ? '/' : path + '/'}"/>`
  ).join('\n');
  return LOCALES.map(
    (code) =>
      `  <url>\n    <loc>${SITE}/${code}${path === '/' ? '/' : path + '/'}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en${path === '/' ? '/' : path + '/'}"/>\n  </url>`
  ).join('\n');
}

export const GET: APIRoute = async () => {
  const [subjects, cas, tok, news] = await Promise.all([
    reader.collections.subjects.list(),
    reader.collections.cas.list(),
    reader.collections.tok.list(),
    reader.collections.news.list(),
  ]);

  const paths = [
    '/',
    '/subjects',
    '/cas',
    '/tok',
    '/ee',
    '/news',
    ...subjects.map((slug) => `/subjects/${slug}`),
    ...cas.map((slug) => `/cas/${slug}`),
    ...tok.map((slug) => `/tok/${slug}`),
    ...news.map((slug) => `/news/${slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map(urlEntry).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
