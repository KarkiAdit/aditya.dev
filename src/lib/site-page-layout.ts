/**
 * Shared vertical rhythm + stack surfaces for pages that mirror the homepage
 * “glass stack” (e.g. `/projects`, future `/thoughts` listing, blog shells).
 *
 * Usage:
 * - **Below a stack hero** (`StackHeroBanner`): `PageStackBody` with default `stackVariant="belowHero"`.
 * - **No hero** (placeholder / blog index): `stackVariant="standalone"` + `wrapInnerColumn` so content gets `siteChromeInner` + section gaps.
 * - **No stack tint** (e.g. thoughts listing): `stackVariant="plain"` — same column rhythm as standalone, body canvas shows through. Use `plainTopPadding="compact"` for less space under the site nav (`pageStackPlainCompactMatchingMarginClass` mirrors that inset for inner gaps).
 * - **Inner sections**: use `pageStackContentInner` + `pageStackSectionInnerTopPaddingClass` on `/projects` slabs; homepage React sections import the same top padding token for parity. `/projects` plain featured column uses {@link pageStackKnowledgeSlabContentTopPaddingClass} only (no slab bottom pad under the dashboard).
 * - **Intro → body**: `pageStackSectionIntroToBodySpacingClass` / `pageStackSectionIntroToBodyFlexGapClass`; **Knowledge slab**: `pageStackKnowledgeSlabContentPaddingClass`; **GitHub snapshot**: `pageStackSnapshotHeadingTailPaddingClass`, `pageStackSnapshotIntroLeadToDashboardClass`, `pageStackSnapshotHeadingToLanguagesGapClass`.
 */
import { cn } from "@/lib/utils";

import { siteChromeInner } from "./site-chrome";

/** Top padding inside stack panels — matches `homepageStackLayout.surfacePanel` / hero stack. */
const PAGE_STACK_PANEL_TOP_PADDING = "pt-4 sm:pt-8 md:pt-12 lg:pt-14";

/**
 * Minimal gap between the site header and plain-stack content (navbar → first content).
 * Horizontal gutters come from `siteChromeGutters`; this is vertical only.
 */
const PAGE_STACK_PLAIN_TOP_PADDING_COMPACT = "pt-0 sm:pt-1 md:pt-1.5 lg:pt-2";

/**
 * Same breakpoint scale as `PAGE_STACK_PLAIN_TOP_PADDING_COMPACT`, as margin.
 * Use when vertical gap should match navbar → first row (e.g. genre switches → featured hero).
 */
export const pageStackPlainCompactMatchingMarginClass =
  "mt-0 sm:mt-1 md:mt-1.5 lg:mt-2";

/** Shared top seam for homepage stack slabs + `PageStackBody` below-hero panels (TL/TR match). */
export const pageStackRoundTopClass = "rounded-t-[1.25rem] md:rounded-t-[1.5rem]";

/**
 * Top padding inside stack panel content (below the rounded slab edge).
 * Homepage experience/more and `/projects` inner columns use the same scale.
 */
export const pageStackSectionInnerTopPaddingClass = "pt-4 sm:pt-6 md:pt-8";

/** Top inset for the primary “About / Knowledge” slab (shared with {@link pageStackKnowledgeSlabContentPaddingClass}). */
export const pageStackKnowledgeSlabContentTopPaddingClass =
  "pt-10 sm:pt-12 md:pt-14";

/** Bottom inset for the knowledge slab (omit on `/projects` plain stack to avoid a heavy tail under the GitHub chart). */
export const pageStackKnowledgeSlabContentBottomPaddingClass =
  "pb-10 sm:pb-12 md:pb-14";

/**
 * Vertical inset for the primary “About / Knowledge” slab (books grid).
 * Matches `HomeKnowledgeSection` inner padding and the `/projects` Featured column.
 */
export const pageStackKnowledgeSlabContentPaddingClass = cn(
  pageStackKnowledgeSlabContentTopPaddingClass,
  pageStackKnowledgeSlabContentBottomPaddingClass,
);

/**
 * Eyebrow + title cluster → next major block (books, polaroids, best-picks board).
 * Matches `HomeKnowledgeContent` header margin.
 */
export const pageStackSectionIntroToBodySpacingClass = "mb-10 sm:mb-12";

/**
 * Same rhythm as {@link pageStackSectionIntroToBodySpacingClass} for flex column shells
 * (e.g. More About Me: title stack → polaroid rail).
 */
export const pageStackSectionIntroToBodyFlexGapClass = "gap-10 sm:gap-12";

/**
 * “Live snapshot” title tail → GitHub grid (`ExperienceSection` `h2` bottom padding).
 */
export const pageStackSnapshotHeadingTailPaddingClass = "pb-8 sm:pb-10 md:pb-12";

/**
 * Intro lead paragraph → GitHub grid when the dashboard follows.
 */
export const pageStackSnapshotIntroLeadToDashboardClass = "mb-8 sm:mb-10 md:mb-12";

/** Snapshot `h2` (no intro) → GitHub stack (languages row): one margin rhythm, do not stack with `h2` padding-bottom. */
export const pageStackSnapshotHeadingToLanguagesGapClass = "mt-8 sm:mt-10 md:mt-12";

/** Same as {@link pageStackSnapshotHeadingToLanguagesGapClass} (legacy export for Astro call sites). */
export const pageStackSnapshotHeadingToDashboardMarginTopClass = pageStackSnapshotHeadingToLanguagesGapClass;

/**
 * Large stack slab titles — solid `text-heading` (theme `--heading`) so titles read clearly red-orange
 * (not gradient clip text, which can look neutral if clipping fails).
 */
export const experienceStackSectionTitleClassName = cn(
  "mt-2 text-balance text-3xl font-extrabold tracking-tighter text-heading sm:text-4xl md:text-5xl",
);

/**
 * GitHub / live snapshot / Featured embedded `h2` — same scale as {@link experienceStackSectionTitleClassName},
 * with a max width for long titles.
 */
export const githubDashboardSectionHeadingClassName = cn(
  experienceStackSectionTitleClassName,
  "max-w-3xl",
);

/**
 * Frosted column directly under a stack hero (rounded top seam + same top pad as homepage Experience).
 */
export const pageStackSurfaceBelowHeroClass = cn(
  "homepage-stack-surface isolate w-full min-w-0 overflow-x-clip",
  pageStackRoundTopClass,
  PAGE_STACK_PANEL_TOP_PADDING,
);

/**
 * Second frosted slab under the first stack surface — matches `homepage-stack-surface-deep` on the
 * homepage “more” panel for GSAP stack intros.
 */
export const pageStackSurfaceDeepBelowHeroClass = cn(
  "homepage-stack-surface-deep isolate w-full min-w-0 overflow-x-clip",
  pageStackRoundTopClass,
  PAGE_STACK_PANEL_TOP_PADDING,
);

/**
 * First slab below the stack hero only (`/projects` career block) — body canvas + rounded seam.
 */
export const pageStackPanelMatchBodyBelowHeroClass = cn(
  "homepage-stack-panel-match-body isolate w-full min-w-0 overflow-x-clip",
  pageStackRoundTopClass,
  "pt-0",
);

/**
 * Slabs after the first below-hero — no body repaint or frame (`homepageStackLayout.surfaceDeepPanel`).
 */
export const pageStackPanelPlainDeepBelowHeroClass = cn(
  "homepage-stack-panel-plain isolate w-full min-w-0 overflow-x-clip",
  "rounded-t-none",
  "pt-0",
);

/**
 * Full-width stack surface when there is no banner above (blog / thoughts placeholder).
 */
export const pageStackSurfaceStandaloneClass = cn(
  "homepage-stack-surface isolate w-full min-w-0 overflow-x-clip",
  PAGE_STACK_PANEL_TOP_PADDING,
);

const pageStackPlainColumnBaseClass = "isolate w-full min-w-0 overflow-x-clip";

/** Same width/padding as standalone, without frosted `homepage-stack-surface` fill. */
export const pageStackPlainColumnClass = cn(pageStackPlainColumnBaseClass, PAGE_STACK_PANEL_TOP_PADDING);

/** Plain column with less space below the navbar. */
export const pageStackPlainColumnCompactTopClass = cn(
  pageStackPlainColumnBaseClass,
  PAGE_STACK_PLAIN_TOP_PADDING_COMPACT,
);

/**
 * Vertical gap between major sections inside the inner column (projects page, future blog layout).
 * Tuned to mirror homepage stack slab rhythm (`homepageStackLayout.experienceSlab` / `moreSlab` padding).
 */
export const pageStackSectionGapClass = "gap-12 md:gap-16 lg:gap-20";

/**
 * Bottom padding for the stack main column — matches `homepageStackLayout.column` tail.
 */
export const pageStackColumnBottomPaddingClass = "pb-6 sm:pb-8 md:pb-10";

/** `siteChromeInner` + flex column + homepage-aligned section gaps. */
export const pageStackContentInner = cn(
  siteChromeInner,
  "flex min-w-0 flex-col",
  pageStackSectionGapClass,
);

/**
 * Direct children of a stack panel on homepage-style pages: border + ring only,
 * no background fill (sits on `homepage-stack-surface`).
 */
export const pageStackSectionDirectPanelClass = cn(
  "rounded-2xl border border-border/30 ring-1 ring-inset ring-white/8",
);
