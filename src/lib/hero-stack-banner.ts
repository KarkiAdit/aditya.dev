import { getImage } from "astro:assets";

/** Full-bleed frosted slab shared by homepage hero and projects banner. */
export const HERO_STACK_BANNER_SECTION_CLASS =
  "homepage-stack-surface relative isolate box-border w-screen max-w-[100vw] shrink-0 overflow-x-clip";

/**
 * Fixed band for `object-cover` hero art:
 * - below `sm`: always 100vh (full-viewport slab)
 * - `sm+`: 16:9 band, capped at 100vh
 */
export const HERO_STACK_BANNER_FRAME_CLASS =
  "relative w-full overflow-hidden h-[85vh] sm:h-[min(100vh,56.25vw)]";

export const HERO_STACK_BANNER_IMG_CLASS =
  "absolute inset-0 h-full w-full object-cover object-center";

/** Media query for the narrow-viewport `<picture>` source. */
export const HERO_STACK_BANNER_SMALL_MEDIA = "(max-width: 639px)" as const;

type GetImageSrc = Parameters<typeof getImage>[0]["src"];

/** Parallel desktop (1920 webp) + mobile (960 webp) optimization for stack heroes. */
export async function getHeroStackBannerSources(
  desktopSrc: GetImageSrc,
  mobileSrc: GetImageSrc,
): Promise<{ srcDesktop: string; srcSmall: string }> {
  const [large, small] = await Promise.all([
    getImage({ src: desktopSrc, width: 1920, format: "webp" }),
    getImage({ src: mobileSrc, width: 960, format: "webp" }),
  ]);
  return { srcDesktop: large.src, srcSmall: small.src };
}
