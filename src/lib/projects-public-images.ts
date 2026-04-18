import type { FeaturedNicheImageAsset } from "@/lib/featured-niche-projects";

/**
 * Raster files in `public/projects/` (same stems as `heroImageSlug` / `screenshots[].slug` in `content/projects/*.mdx`).
 * Intrinsic dimensions are used only to size `<img>`; URLs are plain public paths like blog `coverImage`.
 */
const PUBLIC_PROJECT_IMAGE_META: Record<string, { file: string; w: number; h: number }> = {
  "recipe-ai-assistant": { file: "recipe-ai-assistant.png", w: 461, h: 915 },
  "recipe-ai-lists": { file: "recipe-ai-lists.png", w: 1206, h: 2622 },
  "recipe-dashboard": { file: "recipe-dashboard.png", w: 1206, h: 2622 },
  "surf-shelter-prediction": { file: "surf-shelter-prediction.png", w: 930, h: 585 },
  "tao24-blackbox-design": { file: "tao24-blackbox-design.jpeg", w: 1640, h: 2148 },
  "tao24-initialmvp-home": { file: "tao24-initialmvp-home.png", w: 1320, h: 2868 },
};

const DISPLAY_MAX_WIDTH = 960;

/** Stem → `{ src: "/projects/…", width, height }` for the projects dashboard. */
export function getFeaturedNichePublicImageMap(): Record<string, FeaturedNicheImageAsset> {
  const out: Record<string, FeaturedNicheImageAsset> = {};
  for (const [slug, { file, w, h }] of Object.entries(PUBLIC_PROJECT_IMAGE_META)) {
    const width = Math.min(DISPLAY_MAX_WIDTH, w);
    const height = Math.max(1, Math.round((width * h) / w));
    out[slug] = { src: `/projects/${file}`, width, height };
  }
  return out;
}
