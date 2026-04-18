import { getImage } from "astro:assets";

/** Full-bleed frosted slab — `/projects` banner (and any non-home hero). */
export const HERO_STACK_BANNER_SECTION_CLASS =
  "homepage-stack-surface relative isolate box-border w-screen max-w-[100vw] shrink-0 overflow-x-clip";

/** Homepage `/` hero — no frosted slab; matches `body` canvas behind the image. */
export const HERO_STACK_BANNER_SECTION_CLASS_MATCH_BODY =
  "relative isolate box-border w-screen max-w-[100vw] shrink-0 overflow-x-clip bg-transparent";

/**
 * Fixed band for `object-cover` hero art:
 * - below desktop: tall slab (immersive)
 * - desktop (1080px+): 16:9 band, capped at 100vh
 */
export const HERO_STACK_BANNER_FRAME_CLASS =
  "relative w-full overflow-hidden h-[85vh] min-[1080px]:h-[min(100vh,56.25vw)]";

export const HERO_STACK_BANNER_IMG_CLASS =
  "absolute inset-0 h-full w-full object-cover object-center";

/**
 * Media query for the “small” `<picture>` source.
 * Use the lighter hero asset until the viewport hits desktop width (1080px+).
 */
export const HERO_STACK_BANNER_SMALL_MEDIA = "(max-width: 1079px)" as const;

type GetImageSrc = Parameters<typeof getImage>[0]["src"];

/** Parallel desktop (1920 webp) + small (1280 webp) optimization for stack heroes. */
export async function getHeroStackBannerSources(
  desktopSrc: GetImageSrc,
  mobileSrc: GetImageSrc,
): Promise<{ srcDesktop: string; srcSmall: string }> {
  const [large, small] = await Promise.all([
    getImage({ src: desktopSrc, width: 1920, format: "webp" }),
    getImage({ src: mobileSrc, width: 1280, format: "webp" }),
  ]);
  return { srcDesktop: large.src, srcSmall: small.src };
}
