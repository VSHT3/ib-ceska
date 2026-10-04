import type { APIRoute } from 'astro';
import { type Locale, l } from '../../../i18n/dictionaries';

// Keep legacy subject URLs as HTTP redirects, not duplicate catalogue pages.
export const prerender = false;

export const GET: APIRoute = ({ params, redirect }) =>
  redirect(l(`/dp/subjects/${params.slug}`, params.locale as Locale), 301);
