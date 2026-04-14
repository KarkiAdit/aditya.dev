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
  return "https://adityakarki.com.np";
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
    description: siteConfig.bio,
    publisher: { "@id": personId },
    inLanguage: "en-US",
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [website, person],
  });
}

export const siteConfig = {
  name: "Aditya Karki",
  title: "Aditya Karki",
  /**
   * Homepage meta description, Open Graph / Twitter, and JSON-LD (`Person` + `WebSite`).
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
