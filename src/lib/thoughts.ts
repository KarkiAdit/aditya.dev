import fs from "node:fs";
import path from "node:path";

import type { CollectionEntry } from "astro:content";

import { featuredHeroCreamInkClass, textOnDarkScrimClass } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

export type ThoughtGenreId = CollectionEntry<"blog">["data"]["genre"];

/** Non-featured posts per page on `/thoughts` (client-side pager in `ThoughtsDashboard`). */
export const THOUGHT_FEED_PAGE_SIZE = 5;

export const THOUGHT_GENRE_ORDER: readonly ThoughtGenreId[] = [
  "philosophy",
  "spirituality",
  "science",
  "additional",
] as const;

export const THOUGHT_GENRE_LABEL: Record<ThoughtGenreId, string> = {
  spirituality: "Spirituality",
  philosophy: "Philosophy",
  science: "Science",
  additional: "Additional",
};

export function thoughtGenreLabel(id: ThoughtGenreId): string {
  return THOUGHT_GENRE_LABEL[id];
}

/** When `coverImage` is omitted, no placeholder raster — callers render gradient-only heroes / omit figures. */
export function thoughtResolvedCoverImage(entry: CollectionEntry<"blog">): string | null {
  const raw = entry.data.coverImage?.trim();
  return raw || null;
}

/** `isReleased: false` in frontmatter (or string `"false"` after parse) = not yet released. */
export function thoughtIsUnreleased(entry: CollectionEntry<"blog">): boolean {
  const v = entry.data.isReleased as boolean | string | undefined;
  if (v === false) return true;
  if (typeof v === "string" && v.toLowerCase() === "false") return true;
  return false;
}

/** `null` when unreleased (show `N/A`); else `releasedDate` or `date`. */
export function thoughtReleasedDateOrNull(entry: CollectionEntry<"blog">): Date | null {
  if (thoughtIsUnreleased(entry)) return null;
  return entry.data.releasedDate ?? entry.data.date;
}

/** Shared “Mar 2, 2026” formatting for article meta and the thoughts hub. */
export function formatThoughtDisplayDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** ISO + display string when the post has a public release date; `null` when unreleased (`N/A` in UI). */
export function thoughtReleaseIsoAndDisplay(
  entry: CollectionEntry<"blog">,
): { iso: string; text: string } | null {
  const d = thoughtReleasedDateOrNull(entry);
  if (!d) return null;
  return { iso: d.toISOString(), text: formatThoughtDisplayDate(d) };
}

/** Muted secondary on the light page canvas (feed summaries, hub meta row, empty state). */
export const THOUGHT_SECONDARY_MUTED_CLASS =
  "text-pretty text-base font-normal leading-relaxed text-foreground-muted sm:text-lg sm:leading-relaxed";

/** Featured hero — title / chips / N/A (peach-cream, high L, extra chroma vs primary-foreground). */
export const THOUGHT_FEATURED_CREAM_CLASS = featuredHeroCreamInkClass;

/** Featured hero — muted separators on cream title. */
export const THOUGHT_FEATURED_CREAM_FAINT_CLASS = "text-[oklch(0.985_0.055_46_/_0.42)]";

/** Featured hero — summary on black scrim (steps toward article dek scale). */
export const THOUGHT_SECONDARY_ON_DARK_CLASS = cn(
  "text-pretty font-normal font-sans text-base leading-snug sm:text-lg sm:leading-snug md:text-xl md:leading-snug lg:text-2xl",
  textOnDarkScrimClass,
);

/** Featured hero — meta row (date) on black scrim — secondary to title. */
export const THOUGHT_SECONDARY_META_ON_DARK_CLASS = cn(
  "text-pretty text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed",
  textOnDarkScrimClass,
);

export function thoughtSlugFromEntryId(id: string): string {
  return id.replace(/\.mdx$/i, "").replaceAll("\\", "/");
}

/** ~220 wpm; reads MDX file from disk at build time. */
export function thoughtReadingMinutesFromEntryId(entryId: string): number {
  const filePath = path.join(process.cwd(), "content", "blog", path.basename(entryId));
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/m, "");
    const words = body.trim().split(/\s+/).filter((w) => w.length > 0).length;
    return Math.max(1, Math.round(words / 220));
  } catch {
    return 1;
  }
}

export function thoughtPostHref(entry: CollectionEntry<"blog">): string {
  return `/thoughts/${thoughtSlugFromEntryId(entry.id)}`;
}

function thoughtEntryBasename(id: string): string {
  const norm = id.replaceAll("\\", "/");
  const parts = norm.split("/");
  return parts[parts.length - 1] ?? norm;
}

/** Match hub pin to collection `id` (glob ids may omit `.mdx`). */
function thoughtEntryMatchesHubPin(id: string, pinnedBasename: string): boolean {
  const entryStem = thoughtEntryBasename(id).replace(/\.mdx$/i, "");
  const pinStem = pinnedBasename.replace(/\.mdx$/i, "");
  return entryStem === pinStem;
}

/**
 * Optional hub “Featured” override: `content/blog` filename (e.g. `post.mdx`).
 * If set, that entry is used when its `genre` matches; otherwise the newest post in the genre wins.
 */
export const THOUGHT_HUB_FEATURED_BASENAME: Partial<Record<ThoughtGenreId, string>> = {
  spirituality: "deep-dive-10-days-vipassana-retreat.mdx",
  science: "astrophysics-decoding-black-holes.mdx",
};

export function compareThoughtPostsByDate(
  a: CollectionEntry<"blog">,
  b: CollectionEntry<"blog">,
): number {
  return b.data.date.getTime() - a.data.date.getTime();
}

/** Valid `g` query value for `/thoughts`, or `null` if missing/invalid. */
export function thoughtGenreFromQueryParam(raw: string | null): ThoughtGenreId | null {
  if (raw === "spirituality" || raw === "philosophy" || raw === "science" || raw === "additional") {
    return raw;
  }
  return null;
}

/**
 * Featured hero per genre: pinned file in {@link THOUGHT_HUB_FEATURED_BASENAME} when valid,
 * otherwise the newest post in that genre (same order as the hub feed).
 */
export function featuredFirstPostByGenre(
  sortedNewestFirst: CollectionEntry<"blog">[],
): Record<ThoughtGenreId, CollectionEntry<"blog"> | null> {
  const out = {} as Record<ThoughtGenreId, CollectionEntry<"blog"> | null>;
  for (const g of THOUGHT_GENRE_ORDER) {
    const basename = THOUGHT_HUB_FEATURED_BASENAME[g];
    if (basename) {
      const pinned = sortedNewestFirst.find(
        (p) => thoughtEntryMatchesHubPin(p.id, basename) && p.data.genre === g,
      );
      if (pinned) {
        out[g] = pinned;
        continue;
      }
    }
    out[g] = sortedNewestFirst.find((p) => p.data.genre === g) ?? null;
  }
  return out;
}

export function thoughtFeedExcludingGenreFeatured(
  sortedNewestFirst: CollectionEntry<"blog">[],
  featuredByGenre: Record<ThoughtGenreId, CollectionEntry<"blog"> | null>,
): CollectionEntry<"blog">[] {
  const ids = new Set<string>();
  for (const g of THOUGHT_GENRE_ORDER) {
    const f = featuredByGenre[g];
    if (f) ids.add(f.id);
  }
  return sortedNewestFirst.filter((p) => !ids.has(p.id));
}
