/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE?: string;
  readonly PUBLIC_SITE_URL?: string;
  /** If `true`, emit `noindex, nofollow` (use on Cloudflare preview / private beta). */
  readonly PUBLIC_NO_INDEX?: string;
  readonly PUBLIC_SOCIAL_X?: string;
  readonly PUBLIC_SOCIAL_LINKEDIN?: string;
  readonly PUBLIC_SOCIAL_MEDIUM?: string;
  /** GitHub username for the homepage dashboard (build-time fetch). */
  readonly PUBLIC_GITHUB_LOGIN?: string;
  /** Optional PAT for higher rate limits during `astro build` only (never `PUBLIC_`). */
  readonly GITHUB_TOKEN?: string;
  readonly CF_PAGES_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
