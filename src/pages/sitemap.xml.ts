import type { APIRoute } from 'astro';
import { getMypCurriculumPages } from '../data/myp-programme';
import { reader } from '../lib/keystatic';

export const prerender = true;

const SITE = 'https://ib.gymnaziumceska.sk';
const LOCALES = ['en', 'sk'] as const;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function localizedUrl(code: (typeof LOCALES)[number], path: string): string {
  return escapeXml(`${SITE}/${code}${path === '/' ? '/' : `${path}/`}`);
}

function urlEntry(path: string): string {
  const alternates = LOCALES.map(
    (code) =>
      `    <xhtml:link rel="alternate" hreflang="${code}" href="${localizedUrl(code, path)}"/>`,
  ).join('\n');
  return LOCALES.map(
    (code) =>
      `  <url>\n    <loc>${localizedUrl(code, path)}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl('en', path)}"/>\n  </url>`,
  ).join('\n');
}

export const GET: APIRoute = async () => {
  const [subjects, cas, tok, news, events] = await Promise.all([
    reader.collections.subjects.list(),
    reader.collections.cas.list(),
    reader.collections.tok.list(),
    reader.collections.news.list(),
    reader.collections.events.list(),
  ]);

  const paths = [
    '/',
    '/myp',
    '/dp',
    ...getMypCurriculumPages('en').map(({ href }) => href),
    '/dp/subjects',
    '/dp/cas',
    '/dp/tok',
    '/dp/ee',
    '/dp/build-your-diploma',
    ...(['myp', 'dp'] as const).flatMap((programme) =>
      ['mission', 'teachers', 'policies'].map((section) => `/${programme}/${section}`),
    ),
    '/news',
    '/gallery',
    '/admissions',
    '/search',
    '/privacy',
    ...subjects.map((slug) => `/dp/subjects/${slug}`),
    ...cas.map((slug) => `/dp/cas/${slug}`),
    ...tok.map((slug) => `/dp/tok/${slug}`),
    ...news.map((slug) => `/news/${slug}`),
    ...events.map((slug) => `/events/${slug}`),
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
