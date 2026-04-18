export function siteUrl(): string {
  const fromAstro = import.meta.env.SITE;
  if (typeof fromAstro === "string" && fromAstro.trim().length > 0) {
    return fromAstro.replace(/\/$/, "");
  }
  const explicit = import.meta.env.PUBLIC_SITE_URL;
  if (typeof explicit === "string" && explicit.trim().length > 0) {
    return explicit.replace(/\/$/, "");
  }
  const cfPages = import.meta.env.CF_PAGES_URL;
  if (typeof cfPages === "string" && cfPages.trim().length > 0) {
    return cfPages.replace(/\/$/, "");
  }
  return "https://adityakarki.me";
}

/**
 * Absolute URL on this site for an Astro asset `src` (relative path or any absolute URL).
 * Ensures OG/Twitter images match `siteUrl()` even when `getImage` returns a full URL with a stale host.
 */
export function absoluteOnSite(assetHref: string): string {
  const base = siteUrl();
  const origin = new URL(base);
  try {
    const resolved = new URL(assetHref, origin);
    return new URL(
      `${resolved.pathname}${resolved.search}${resolved.hash}`,
      origin,
    ).href;
  } catch {
    const path = assetHref.startsWith("/") ? assetHref : `/${assetHref}`;
    return new URL(path, origin).href;
  }
}

/**
 * Trim text to a snippet-friendly length for `<meta name="description">` (search engines often show ~155–160 characters).
 * Avoids cutting mid-word when possible.
 */
export function clampMetaDescription(text: string, maxChars = 158): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= maxChars) return normalized;
  const slice = normalized.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(" ");
  const head = lastSpace > 40 ? slice.slice(0, lastSpace) : slice;
  return `${head.trimEnd()}…`;
}

/** Document `<title>`: home is just the name; inner pages use `Section | Name`. */
export function formatDocumentTitle(pageHeadline: string): string {
  const name = siteConfig.name;
  const head = pageHeadline.trim();
  if (head.length === 0 || head === name) return name;
  return `${head} | ${name}`;
}

/** Set `PUBLIC_NO_INDEX=true` on preview/beta Cloudflare envs when you are not ready for search indexing. */
export function robotsMetaContent(): string {
  return import.meta.env.PUBLIC_NO_INDEX === "true" ? "noindex, nofollow" : "index, follow";
}

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Public profile URLs for JSON-LD `sameAs` (env must be full URLs; GitHub derived from `PUBLIC_GITHUB_LOGIN`). */
export function profileSameAs(): string[] {
  const urls: string[] = [];
  const gh = import.meta.env.PUBLIC_GITHUB_LOGIN?.trim();
  if (gh) urls.push(`https://github.com/${gh}`);
  for (const key of ["PUBLIC_SOCIAL_LINKEDIN", "PUBLIC_SOCIAL_X", "PUBLIC_SOCIAL_MEDIUM"] as const) {
    const v = import.meta.env[key]?.trim();
    if (v && isHttpUrl(v)) urls.push(v);
  }
  return [...new Set(urls)];
}

/** ISO date (YYYY-MM-DD) for legal pages; update when privacy or terms copy changes meaningfully. */
export const LEGAL_PAGES_LAST_UPDATED = "2026-04-17";

/** Human-readable date for legal page footers (stable UTC calendar date). */
export function formatLegalDateDisplay(isoDateYmd: string): string {
  const [y, m, d] = isoDateYmd.split("-").map(Number);
  if (!y || !m || !d) return isoDateYmd;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Page-level JSON-LD for legal documents: `WebPage` linked to site `#website` / `#person`, plus `BreadcrumbList`.
 * Emitted as a second `<script type="application/ld+json">` alongside `siteJsonLd` (Person + WebSite).
 * Pass the same absolute URL as `<link rel="canonical">` (including trailing slash if your host uses it).
 */
export function legalPageStructuredData(options: {
  canonicalHref: string;
  headline: string;
  description: string;
  dateModified: string;
}): string {
  const base = siteUrl().replace(/\/$/, "");
  const url = options.canonicalHref.replace(/\/$/, "") === base ? `${base}/` : options.canonicalHref;

  const websiteId = `${base}/#website`;
  const personId = `${base}/#person`;
  const webPageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": webPageId,
      url,
      name: options.headline,
      description: options.description,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      author: { "@id": personId },
      dateModified: options.dateModified,
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${base}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: options.headline,
          item: url,
        },
      ],
    },
  ];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

export function siteJsonLd(options?: { personImage?: string }): string {
  const base = siteUrl();
  const homeUrl = `${base}/`;
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const sameAs = profileSameAs();

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: homeUrl,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.bio,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.worksFor.name,
      url: siteConfig.worksFor.url,
    },
  };

  if (options?.personImage) person.image = options.personImage;
  if (sameAs.length > 0) person.sameAs = sameAs;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: homeUrl,
    name: siteConfig.name,
    /** Snippet-style site line; `Person` carries the longer bio to avoid repeating the same paragraph twice. */
    description: siteConfig.metaDescription,
    publisher: { "@id": personId },
    inLanguage: "en-US",
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [website, person],
  });
}

/**
 * JSON-LD for a single essay (`BlogPosting`): one graph, no duplicate Article microdata in HTML.
 * `description` should match the on-page dek (full `summary`); keep meta descriptions snippet-sized separately.
 */
export function thoughtPostStructuredData(options: {
  canonicalHref: string;
  headline: string;
  description: string;
  datePublished: string;
  imageUrl?: string;
}): string {
  const base = siteUrl().replace(/\/$/, "");
  const url = options.canonicalHref.replace(/\/$/, "") === base ? `${base}/` : options.canonicalHref;
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const postingId = `${url}#blogposting`;

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": postingId,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage`, url },
    url,
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
    inLanguage: "en-US",
  };

  if (options.imageUrl) blogPosting.image = options.imageUrl;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [blogPosting],
  });
}

export const siteConfig = {
  name: "Aditya Karki",
  title: "Aditya Karki",
  /**
   * Homepage `<meta name="description">` / OG / Twitter (snippet-length, tuned for search result display).
   * The longer story lives in {@link siteConfig.bio} and JSON-LD.
   */
  metaDescription:
    "Aditya Karki — Google software engineer, writer, and spiritual thinker. Portfolio and essays on engineering, consciousness, Buddhist & Taoist philosophy, and long-form ideas.",
  /**
   * Richer narrative for JSON-LD (`Person` + `WebSite` description) and on-page identity; not limited to snippet length.
   */
  bio: "Aditya Karki: Software Engineer at Google and 3x SWE Intern. I bridge the gap between complex systems and human consciousness, writing at the intersection of professional engineering, Buddhist and Taoist philosophy, and spiritual discipline.",
  jobTitle: "Software Engineer",
  worksFor: {
    name: "Google",
    url: "https://www.google.com",
  },
  author: "ADITYA KARKI",
  rolesLine: "Software Engineer, Writer, and Spiritual Thinker",
  get url() {
    return siteUrl();
  },
} as const;

/** `/thoughts` — matches hub genres (spirituality, philosophy, science) and the site’s themes. */
export const thoughtsHubMetaDescription =
  "Thoughts and essays by Aditya Karki on spirituality, philosophy, science, and software—long-form writing where engineering meets the Gita, Taoism, meditation, and modern life.";

/** `/projects` — featured work, GitHub, and reading aligned with the projects page content. */
export const projectsHubMetaDescription =
  "Software engineering projects by Aditya Karki: featured builds, GitHub repos, technical notes and screenshots, plus current reading and focus areas.";

export type ArticleOpenGraph = {
  publishedTime: string;
  modifiedTime?: string;
};
