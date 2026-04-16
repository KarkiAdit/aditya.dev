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

export const homepageStackLayout = {
  column: "flex w-full min-w-0 flex-col gap-0 pb-6 sm:pb-8 md:pb-10",
  heroSlab: "relative isolate pb-3 sm:pb-6 md:pb-8",
  heroPanel:
    "sticky top-0 z-[12] isolate min-h-0 w-full min-w-0",
  experienceSlab: "relative isolate pb-4 sm:pb-6 md:pb-8",
  moreSlab: "relative isolate pb-3 sm:pb-4 md:pb-5",
  surfacePanel:
    "homepage-stack-surface sticky top-0 z-[14] isolate w-full min-w-0 rounded-t-[1.25rem] pt-4 sm:pt-8 md:rounded-t-[1.5rem] md:pt-12 lg:pt-14",
  surfaceDeepPanel:
    "homepage-stack-surface-deep sticky top-0 z-[16] isolate w-full min-w-0 rounded-t-[1.25rem] pt-4 sm:pt-8 md:rounded-t-[1.5rem] md:pt-12 lg:pt-14",
} as const;
