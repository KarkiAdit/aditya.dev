/**
 * Static copy for the Memory Lane polaroid strip (`MoreAboutMeSection`).
 * Image URLs are resolved in `src/pages/index.astro` via `getImage`; this module holds captions + Notion
 * slots only. {@link MEMORY_LANE_SLOT_COUNT} must match the number of optimized assets in the page.
 */

/** Slots reserved for memory-lane assets (order: hometown → … → SF). */
export const MEMORY_LANE_SLOT_COUNT = 7 as const;

/** How many polaroids the homepage grid renders today (subset of {@link MEMORY_LANE_SLOT_COUNT}). */
export const MEMORY_LANE_HOMEPAGE_POLAROID_COUNT = 3 as const;

export type MemoryLaneSevenStrings = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export const memoryLaneNotionHrefs = ["", "", "", "", "", "", ""] as const satisfies MemoryLaneSevenStrings;

export const memoryLaneNoteBodies = [
  "Hometown Skies",
  "Author in Play",
  "Run Untangles",
  "Lifting keeps me honest: reps, form, no stories.",
  "When the mind is loud, breath resets everything.",
  "New York taught urgency without stealing kindness.",
  "San Francisco taught layers for fog and change.",
] as const satisfies MemoryLaneSevenStrings;
