import { SITE_URL } from './firebaseConfig';

export interface RouteMeta {
  title: string;
  description: string;
  /** Absolute or root-relative path. Empty string means the site root. */
  path: string;
  /** Keeps marketing pages out of the index (thank-you, admin). */
  noindex?: boolean;
}

const BRAND = 'Startup Junction';

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: `${BRAND} — Turn Your Idea Into Something Real`,
    description:
      'Startup Junction helps students and aspiring founders turn ideas, problems and skills into real products, teams and ventures through mentorship, guidance and practical support. Free to join.',
    path: '/',
  },
  '/about': {
    title: `About Us — ${BRAND}`,
    description:
      'Why Startup Junction exists, how we work with founders, and our commitments on idea privacy, zero upfront charges and honest feedback.',
    path: '/about',
  },
  '/how-it-works': {
    title: `How It Works — ${BRAND}`,
    description:
      'From applying to building with your team: the Startup Junction process, the phases we work through, and what happens after you submit.',
    path: '/how-it-works',
  },
  '/faq': {
    title: `FAQ — ${BRAND}`,
    description:
      'Answers about eligibility, costs, confidentiality, time commitment, team building and what happens after you apply to Startup Junction.',
    path: '/faq',
  },
  '/apply': {
    title: `Apply — ${BRAND}`,
    description:
      'Apply to Startup Junction. Tell us about yourself, your education, your skills and your startup idea. Takes about 5 minutes.',
    path: '/apply',
  },
  '/privacy': {
    title: `Privacy & Idea Confidentiality — ${BRAND}`,
    description:
      'How Startup Junction collects, uses and protects your application data and your startup ideas, and how to request access or deletion.',
    path: '/privacy',
  },
  '/terms': {
    title: `Terms & Founder Principles — ${BRAND}`,
    description:
      'The nature of Startup Junction, our no-guarantee policy on venture outcomes, founder integrity expectations and code of conduct.',
    path: '/terms',
  },
  '/thank-you': {
    title: `Application Received — ${BRAND}`,
    description: 'Your Startup Junction application has been received.',
    path: '/thank-you',
    noindex: true,
  },
};

const FALLBACK: RouteMeta = {
  title: `${BRAND} — Turn Your Idea Into Something Real`,
  description:
    'Startup Junction helps students and aspiring founders turn ideas into real products, teams and startups.',
  path: '/',
};

export function getRouteMeta(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (ROUTE_META[clean]) return ROUTE_META[clean];
  if (clean.startsWith('/admin')) {
    return { ...FALLBACK, title: `Admin — ${BRAND}`, path: clean, noindex: true };
  }
  return { ...FALLBACK, path: clean };
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

const OG_IMAGE = '/og-image.png';
const TWITTER_IMAGE = '/og-image.png';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applies title, description, canonical, robots and social-card tags for the
 * active route. The SPA ships one HTML document, so these have to be updated
 * on every client-side navigation.
 */
export function applyRouteMeta(meta: RouteMeta) {
  document.title = meta.title;

  upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
  upsertMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  );

  const canonical = absoluteUrl(meta.path);
  upsertLink('canonical', canonical);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);

  upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', BRAND);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', absoluteUrl(OG_IMAGE));
  upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
  upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', `${BRAND} — Turn Your Idea Into Something Real`);

  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteUrl(TWITTER_IMAGE));
}