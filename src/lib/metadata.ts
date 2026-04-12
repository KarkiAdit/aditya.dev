export function siteUrl(): string {
  const explicit = import.meta.env.PUBLIC_SITE_URL;
  if (typeof explicit === "string" && explicit.trim().length > 0) {
    return explicit.replace(/\/$/, "");
  }
  const cfPages = import.meta.env.CF_PAGES_URL;
  if (typeof cfPages === "string" && cfPages.trim().length > 0) {
    return cfPages.replace(/\/$/, "");
  }
  return "https://aditya.dev";
}

export const siteConfig = {
  name: "aditya.dev",
  title: "aditya.dev",
  description: "Personal portfolio — software, writing, and projects.",
  author: "ADITYA KARKI",
  rolesLine: "Software Engineer, Writer, and Spiritual Thinker",
  get url() {
    return siteUrl();
  },
} as const;
