import type { APIRoute } from 'astro';
import { reader } from '../lib/keystatic';

export const prerender = true;

const SITE = 'https://ib.gymnaziumceska.sk';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const news = await reader.collections.news.all();
  const sorted = news.sort(
    (a, b) => new Date(b.entry.date ?? 0).getTime() - new Date(a.entry.date ?? 0).getTime()
  );

  const items = sorted
    .map(({ slug, entry }) => {
      const link = `${SITE}/en/news/${slug}/`;
      const pubDate = entry.date ? new Date(entry.date).toUTCString() : '';
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      ${entry.excerpt ? `<description>${escapeXml(entry.excerpt)}</description>` : ''}
      ${entry.author ? `<author>${escapeXml(entry.author)}</author>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>IB Gymnázium Česká — News</title>
    <link>${SITE}/en/news/</link>
    <description>Announcements, deadlines, and stories from the IB programme at Súkromné Gymnázium Česká, Bratislava.</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
