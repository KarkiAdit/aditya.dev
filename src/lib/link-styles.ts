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
 * Responsive scale for muted supporting body copy: memory-lane polaroid captions, featured
 * niche project descriptions, and dense project labels. Slightly larger than `text-xs` on
 * small viewports so long lines (e.g. project blurbs) stay readable without touching desktop sizes.
 */
export const denseMutedSupportingBodyTextScale =
  "text-sm tracking-tight leading-relaxed sm:text-base sm:leading-snug md:text-base md:leading-snug lg:text-lg xl:text-xl";

/** Memory-lane polaroid captions — uses {@link denseMutedSupportingBodyTextScale}. */
export const memoryLaneNoteBodyTypography = cn(
  heroIntroMutedClauseInk,
  denseMutedSupportingBodyTextScale,
);

/** Featured niche project description `<p>` — same tokens as memory-lane body (see {@link denseMutedSupportingBodyTextScale}). */
export const featuredNicheDescriptionTypography = cn(
  memoryLaneNoteBodyTypography,
  "text-pretty w-full min-w-0 max-w-prose sm:max-w-none",
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
