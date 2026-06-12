import Markdoc, { type Node } from '@markdoc/markdoc';

type MarkdocValue = { node: Node } | (() => Promise<{ node: Node }>) | null | undefined;

/** Render a Keystatic markdoc field (deferred content field or inline value) to HTML. */
export async function renderMarkdoc(value: MarkdocValue): Promise<string> {
  if (!value) return '';
  const resolved = typeof value === 'function' ? await value() : value;
  if (!resolved?.node) return '';
  const renderable = Markdoc.transform(resolved.node);
  return Markdoc.renderers.html(renderable);
}

/** True when rendered HTML contains visible text. */
export function hasContent(html: string): boolean {
  return html.replace(/<[^>]*>/g, '').trim().length > 0;
}
