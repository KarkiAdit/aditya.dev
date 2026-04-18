import { THOUGHT_HUB_PILL_ON_MEDIA } from "@/lib/thoughts-hub-layout";
import { cn } from "@/lib/utils";

export const linkHoverUnderline =
  "no-underline underline-offset-4 decoration-2 decoration-primary/70 transition-[color,text-decoration-color] hover:underline hover:decoration-primary focus-visible:underline focus-visible:decoration-primary";

export const heroIntroSupportingText =
  "font-prominent-copy text-foreground-muted";

export const heroIntroMutedClauseInk = heroIntroSupportingText;

export const heroIntroRolesTypography = cn(
  heroIntroSupportingText,
  "text-base md:text-lg",
);

export const heroIntroHeadlineTypography =
  "text-4xl font-extrabold tracking-tight text-primary md:text-5xl";

export const heroIntroLeadScaleTypography =
  "text-2xl font-extrabold tracking-tight leading-snug sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight";

export const heroIntroLeadTypography = cn(heroIntroLeadScaleTypography, "text-foreground");

export const heroIntroLeadPrimaryForegroundTypography = cn(
  heroIntroLeadScaleTypography,
  "text-primary-foreground",
);

/** Hero lead line scale + muted clause (e.g. “bridging the two as a Writer.”). */
export const heroIntroLeadMutedClauseTypography = cn(
  heroIntroLeadScaleTypography,
  heroIntroMutedClauseInk,
);

/** Same color/weight as `heroIntroLeadMutedClauseTypography`; reduced scale for dense UI. */
export const heroIntroLeadMutedClauseCompactTypography = cn(
  heroIntroMutedClauseInk,
  "text-sm tracking-tight leading-snug sm:text-base md:text-lg",
);

/** Muted clause ink at a prominent scale for profile / display names (sidebar). */
export const heroIntroLeadMutedClauseProfileTypography = cn(
  heroIntroMutedClauseInk,
  "text-xl tracking-tight leading-snug sm:text-2xl md:text-3xl",
);

/**
 * Peach-cream title ink — `/thoughts` featured hero title on dark scrims.
 */
export const featuredHeroCreamInkClass = "text-[oklch(0.985_0.055_46)]";

/** Body/summary ink on dark scrims (featured Thoughts summary, polaroid overlays, meta on media). */
export const textOnDarkScrimClass = "text-white/82";

/**
 * Responsive scale for muted supporting body copy: memory-lane polaroid captions, featured
 * niche project descriptions, and dense project labels. Slightly larger than `text-xs` on
 * small viewports so long lines (e.g. project blurbs) stay readable without touching desktop sizes.
 */
export const denseMutedSupportingBodyTextScale =
  "text-xs tracking-tight leading-relaxed sm:text-sm sm:leading-snug md:text-base md:leading-snug lg:text-lg xl:text-xl";

/** Memory-lane polaroid captions — uses {@link denseMutedSupportingBodyTextScale}. */
export const memoryLaneNoteBodyTypography = cn(
  heroIntroMutedClauseInk,
  denseMutedSupportingBodyTextScale,
);

/**
 * Overlay copy on polaroid-style cards — same chip shell as Thoughts featured media
 * ({@link THOUGHT_HUB_PILL_ON_MEDIA}), with sentence case and fluid type slightly above the stock
 * `text-[0.7rem]` pill (`cqi` vs `polaroidCardImageWellClassName`).
 */
export const polaroidOverlayCaptionTypography = cn(
  THOUGHT_HUB_PILL_ON_MEDIA,
  /** Shrink-wrap the glass chip to the text (up to max width); avoid full-bleed colored bar. */
  "w-fit max-w-[min(100%,min(42rem,92vw))] min-w-0 whitespace-normal text-pretty text-center normal-case font-medium tracking-tight",
  "px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3",
  /** ~0.8rem floor → ~1.45rem cap; a step larger than the default pill body size. */
  "text-[clamp(0.8125rem,calc(0.38rem+3.5cqi),1.4375rem)] leading-[clamp(1.28rem,calc(0.72rem+3.85cqi),1.72rem)]",
);

/** `<p>` wrapping {@link polaroidOverlayCaptionTypography} — use on book + memory-lane polaroids. */
export const polaroidOverlayCaptionElementClassName = cn(
  "m-0 inline-flex min-w-0 justify-center p-0",
  polaroidOverlayCaptionTypography,
);

/** Featured niche project description `<p>` — same tokens as memory-lane body (see {@link denseMutedSupportingBodyTextScale}). */
export const featuredNicheDescriptionTypography = cn(
  memoryLaneNoteBodyTypography,
  "text-pretty w-full min-w-0 max-w-prose sm:max-w-none",
);

/**
 * Lead copy above best-picks cards and the live-snapshot chart — same ink/scale family as
 * {@link featuredNicheDescriptionTypography} but built without `max-w-prose` so lines can use the
 * full content width (that token’s prose cap was still narrowing blurbs vs. the card below).
 */
export const featuredNicheBestPicksLeadTypography = cn(
  memoryLaneNoteBodyTypography,
  "block !w-full min-w-0 !max-w-none self-stretch text-pretty",
);

/**
 * `/projects` Featured block intro (`LiveSnapshotSection` `introLead`) — larger responsive scale.
 */
export const featuredIntroParagraphTypography = cn(
  featuredNicheDescriptionTypography,
  "w-full min-w-0 max-w-none self-stretch text-balance font-extrabold tracking-tight text-foreground/85",
  "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
);

/**
 * Experience journey line, project card descriptions / screenshot asides — extrabold, `text-foreground/85`,
 * slightly smaller type than {@link featuredIntroParagraphTypography}.
 */
export const featuredSectionLeadTypography = cn(
  featuredNicheDescriptionTypography,
  "w-full min-w-0 max-w-none self-stretch text-balance font-extrabold tracking-tight text-foreground/85",
  "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
);

/**
 * Main project card dek — same ink/weight as {@link featuredSectionLeadTypography}, with a
 * slightly smaller responsive scale for dense Best-picks card copy; stretches across the card
 * (`self-stretch` + no max-width cap).
 */
export const featuredProjectDescriptionTypography = cn(
  featuredSectionLeadTypography,
  "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
  "w-full min-w-0 max-w-none self-stretch",
);

/**
 * GitHub dashboard: language legend + profile name — solid body ink, one step up from the
 * previous compact scale (still smaller than {@link featuredProjectDescriptionTypography}).
 */
export const githubDashboardLegendTypography = cn(
  "text-pretty font-semibold text-foreground/92 tracking-tight leading-snug",
  "text-xs sm:text-sm md:text-base",
);

export const aboutSectionHeroContinuationTypography = cn(
  "font-semibold text-foreground-muted text-pretty leading-relaxed",
  "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
);

export const heroIntroRolesDisplayTypography = cn(
  heroIntroSupportingText,
  "text-lg leading-relaxed md:text-xl",
);

/**
 * Primary `Button variant="default"` surfaces: readable ink on `--primary`,
 * `--secondary` hover / focus / active (hero, entrance splash, Notion CTAs).
 */
export const primaryCtaInteractiveClassName = cn(
  "shadow-none transition-colors duration-200 !text-background/82",
  "hover:!bg-secondary hover:!text-secondary-foreground",
  "focus-visible:!bg-secondary focus-visible:!text-secondary-foreground",
  "active:!bg-secondary/80 active:!text-secondary-foreground",
);

export const mainNavLinkAppearance = cn(
  "text-sm transition-colors hover:text-primary",
  heroIntroSupportingText,
);

export const headerMainNavBodyTypography = cn(
  heroIntroSupportingText,
  "text-sm sm:text-base md:text-base lg:text-lg",
);

export const headerMainNavBodyTypographyRoomy = cn(
  heroIntroSupportingText,
  "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
);

export const headerMainNavLinkAppearance = cn(
  headerMainNavBodyTypography,
  "transition-colors hover:text-primary",
);
