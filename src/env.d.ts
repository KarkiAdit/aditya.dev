/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SOCIAL_X?: string;
  readonly PUBLIC_SOCIAL_LINKEDIN?: string;
  readonly PUBLIC_SOCIAL_MEDIUM?: string;
  readonly CF_PAGES_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
