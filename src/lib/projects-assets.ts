import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

import { CURRENT_FOCUS_BOOKS, type CurrentFocusBookCard } from "@/lib/current-focus-books";

export { getFeaturedNichePublicImageMap } from "@/lib/projects-public-images";

function viteGlobRasterStem(importPath: string): string {
  return importPath.replace(/^.*\//, "").replace(/\.(png|jpe?g)$/i, "");
}

/** Optimized book covers for the home knowledge section (matches `CURRENT_FOCUS_BOOKS` ids to files in `current-focus-books/`). */
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
