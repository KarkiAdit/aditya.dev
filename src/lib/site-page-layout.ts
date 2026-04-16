/**
 * Shared vertical rhythm + stack surfaces for pages that mirror the homepage
 * “glass stack” (e.g. `/projects`, future `/thoughts` listing, blog shells).
 *
 * Usage:
 * - **Below a stack hero** (`StackHeroBanner`): `PageStackBody` with default `stackVariant="belowHero"`.
 * - **No hero** (placeholder / blog index): `stackVariant="standalone"` + `wrapInnerColumn` so content gets `siteChromeInner` + section gaps.
 * - **Inner sections**: use `pageStackContentInner` on the flex column that holds stacked `<section>`s (e.g. `/projects` featured + career blocks).
 */
import { cn } from "@/lib/utils";

import { siteChromeInner } from "./site-chrome";

/** Top padding inside stack panels — matches `homepageStackLayout.surfacePanel` / hero stack. */
const PAGE_STACK_PANEL_TOP_PADDING = "pt-4 sm:pt-8 md:pt-12 lg:pt-14";

const PAGE_STACK_ROUND_TOP = "rounded-t-[1.25rem] md:rounded-t-[1.5rem]";

/**
 * Frosted column directly under a stack hero (rounded top seam + same top pad as homepage Experience).
 */
export const pageStackSurfaceBelowHeroClass = cn(
  "homepage-stack-surface isolate w-full min-w-0 overflow-x-clip",
  PAGE_STACK_ROUND_TOP,
  PAGE_STACK_PANEL_TOP_PADDING,
);

/**
 * Second frosted slab under the first stack surface — matches `homepage-stack-surface-deep` on the
 * homepage “more” panel for consistent depth and GSAP stack intros (`PageStackBody` + `/projects`).
 */
export const pageStackSurfaceDeepBelowHeroClass = cn(
  "homepage-stack-surface-deep isolate w-full min-w-0 overflow-x-clip",
  PAGE_STACK_ROUND_TOP,
  PAGE_STACK_PANEL_TOP_PADDING,
);

/**
 * Full-width stack surface when there is no banner above (blog / thoughts placeholder).
 */
export const pageStackSurfaceStandaloneClass = cn(
  "homepage-stack-surface isolate w-full min-w-0 overflow-x-clip",
  PAGE_STACK_PANEL_TOP_PADDING,
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
 * Direct children of a stack `<section>` on homepage-style pages: border + ring only,
 * no background fill (sits on `homepage-stack-surface`).
 */
export const pageStackSectionDirectPanelClass = cn(
  "rounded-2xl border border-border/30 ring-1 ring-inset ring-white/8",
);
