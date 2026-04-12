/**
 * Root-relative URLs for files in `public/` (served at the site root).
 *
 * Layout:
 * - `videos/` — hero loops, motion clips
 * - `images/` — posters, blog, project stills (add paths when files exist)
 */
export const publicAssets = {
  hero: {
    /** Home hero background (muted, looping). `.mp4` or `.mov` (browser-dependent). */
    video: "/videos/hero.MOV",
    /** Portrait / cutout layered above the video (left column on `md+`). */
    portrait: "/images/hero.png",
  },
} as const satisfies {
  hero: { video: string; portrait?: string; poster?: string };
};
