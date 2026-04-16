import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

import { CURRENT_FOCUS_BOOKS, type CurrentFocusBookCard } from "@/lib/current-focus-books";
import type { FeaturedNicheImageAsset } from "@/lib/featured-niche-projects";

function viteGlobRasterStem(importPath: string): string {
  return importPath.replace(/^.*\//, "").replace(/\.(png|jpe?g)$/i, "");
}

/** Optimized book covers for `ProjectsKnowledgeSection` (matches `CURRENT_FOCUS_BOOKS` ids to files in `current-focus-books/`). */
export async function loadCurrentFocusBookCards(): Promise<readonly CurrentFocusBookCard[]> {
  const bookCoverGlob = import.meta.glob<{ default: ImageMetadata }>(
    "../assets/images/current-focus-books/*.{png,jpg,jpeg}",
    { eager: true },
  );

  const metaByStem = new Map(
    Object.entries(bookCoverGlob).map(([path, mod]) => [viteGlobRasterStem(path), mod.default] as const),
  );

  return Promise.all(
    CURRENT_FOCUS_BOOKS.map(async (book) => {
      const meta = metaByStem.get(book.id) ?? null;
      if (!meta) {
        return { ...book, cover: null as const };
      }
      const optimized = await getImage({ src: meta, width: 360, format: "webp" });
      const width = 360;
      const height = Math.max(1, Math.round((width * meta.height) / meta.width));
      return { ...book, cover: { src: optimized.src, width, height } };
    }),
  );
}

/** Basename → webp + dimensions for everything in `src/assets/images/featured-niche/`. */
export async function loadFeaturedNicheScreenshotMap(): Promise<
  Record<string, FeaturedNicheImageAsset>
> {
  const nicheImageGlob = import.meta.glob<{ default: ImageMetadata }>(
    "../assets/images/featured-niche/*.{png,jpg,jpeg}",
    { eager: true },
  );

  return Object.fromEntries(
    await Promise.all(
      Object.entries(nicheImageGlob).map(async ([path, mod]) => {
        const base = viteGlobRasterStem(path);
        const optimized = await getImage({ src: mod.default, width: 960, format: "webp" });
        const width = 960;
        const height = Math.max(1, Math.round((width * mod.default.height) / mod.default.width));
        const asset: FeaturedNicheImageAsset = { src: optimized.src, width, height };
        return [base, asset] as const;
      }),
    ),
  );
}
