import { pageStackRoundTopClass } from "@/lib/site-page-layout";

/**
 * Homepage sticky stack: markup hooks + layout class strings shared by
 * `HomepageStackSections.astro` and `HomepageStackScroll.tsx`.
 */
export const HOMEPAGE_STACK_PANEL_SELECTOR = "[data-homepage-stack-panel]";

/**
 * HTML attribute for inner cards (e.g. featured project tiles on `/projects`) that should use the
 * same GSAP elastic intro as stack panels (`HomepageStackScroll`).
 */
export const HOMEPAGE_STACK_INTRO_CARD_ATTR = "data-homepage-stack-intro-card" as const;

export const HOMEPAGE_STACK_INTRO_CARD_SELECTOR = `[${HOMEPAGE_STACK_INTRO_CARD_ATTR}]`;

export const HOMEPAGE_STACK_ROLE = {
  hero: "hero",
  surface: "surface",
} as const;

/** Root id for `/projects` stack scroll intros (mirrors `#home-main-gate` on `/`). */
export const PROJECTS_STACK_GATE_ID = "projects-stack-gate";

/** `DataDashboard` root on `/projects` — fixed filter chrome + spacer sync script scope to this id. */
export const PROJECTS_BEST_PICKS_DASHBOARD_ID = "projects-best-picks-dashboard";

export const homepageStackLayout = {
  column: "flex w-full min-w-0 flex-col gap-0 pb-6 sm:pb-8 md:pb-10",
  /** No bottom spacer — sections stack flush; inner sections own any content inset. */
  heroSlab: "relative isolate pb-0",
  heroPanel:
    "sticky top-0 z-[12] isolate min-h-0 w-full min-w-0",
  aboutSlab: "relative isolate pb-0",
  memoryLaneSlab: "relative isolate pb-0",
  roadmapSlab: "relative isolate pb-0",
  /** `/projects` — featured intro + dashboard (best picks + live GitHub as tabs; single slab). */
  experienceSlab: "relative isolate pb-0",
  /** Reserved for extra slabs below the main experience column (unused on `/projects` today). */
  moreSlab: "relative isolate pb-0",
  /** First below hero only — body canvas repaint (see `.homepage-stack-panel-match-body`). */
  surfacePanel: `homepage-stack-panel-match-body sticky top-0 z-[14] isolate w-full min-w-0 ${pageStackRoundTopClass} pt-0`,
  /** Further slabs — transparent; no second painted panel (see `.homepage-stack-panel-plain`). */
  surfaceDeepPanel:
    "homepage-stack-panel-plain sticky top-0 z-[16] isolate w-full min-w-0 rounded-t-none pt-0",
} as const;
