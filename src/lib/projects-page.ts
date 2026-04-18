import { githubDashboardRepoCardPanelClassName } from "@/lib/github-dashboard-card";
import { heroIntroMutedClauseInk } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

/**
 * Cream fill shared by featured project cards and in-card badges (category, stack, doc chips)
 * so chips sit on almost the same surface as the card body.
 */
const featuredNicheCreamSurface = "bg-[oklch(0.987_0.022_58_/_0.96)]";

/** Size, weight, tracking, and ink shared by category badges and aligned labels (e.g. Tao24 file tree). */
export const featuredNicheBadgeLabelTypographyClassName = cn(
  "text-xs font-semibold tracking-wide text-heading sm:text-[0.8125rem]",
);

/**
 * Featured niche: category badge — cream tile (card-adjacent) + heading ink + whisper of primary edge.
 */
export const featuredNicheCategoryChipClassName = cn(
  "inline-flex cursor-default select-none items-center rounded-sm px-3 py-1.5 sm:px-3.5 sm:py-[0.42rem]",
  featuredNicheBadgeLabelTypographyClassName,
  "lowercase",
  featuredNicheCreamSurface,
  "border border-primary/16",
  "ring-1 ring-inset ring-white/40",
  "shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.45)]",
);

/** Featured niche: stack pills — same cream family as the card; primary only in the hairline edge. */
export const featuredNicheTechStackChipClassName = cn(
  "inline-flex cursor-default select-none rounded-full px-3 py-1 text-[0.8125rem] font-semibold text-heading sm:text-sm",
  featuredNicheCreamSurface,
  "border border-primary/14",
  "ring-1 ring-inset ring-white/35",
  "shadow-[0_1px_2px_oklch(0.35_0.03_50_/_0.06)]",
);

/**
 * "Documentation" heading above doc chips — solid `text-heading`, bold for emphasis;
 * centered on narrow viewports, left-aligned from `sm` up.
 */
export const featuredNicheProjectDocSectionLabelClassName = cn(
  "m-0 mb-2 w-full text-balance text-center font-sans text-[1.5rem] font-bold leading-snug tracking-tight text-heading sm:text-left sm:text-[1.625rem]",
);

/**
 * Featured niche: outer frame for each screenshot (caption + image). Light orange border + wash;
 * hover deepens border/ring and lifts shadow. Use with `group/shot` + `group-hover/shot:` on inner `<img>`.
 */
export const featuredNicheScreenshotFigureClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "group/shot relative z-[2] w-fit max-w-full",
  "border-2 border-primary/26 bg-[color-mix(in_oklch,var(--primary)_9%,var(--card))]",
  "ring-1 ring-inset ring-primary/18",
  "shadow-[0_2px_0_0_oklch(1_0.01_60_/_0.35),0_8px_22px_-6px_oklch(0.24_0.03_50_/_0.18),0_22px_52px_-14px_oklch(0.32_0.04_50_/_0.32)]",
  "transition-[border-color,box-shadow,background-color,ring-color] duration-300 ease-out",
  "hover:border-primary/44 hover:bg-[color-mix(in_oklch,var(--primary)_14%,var(--card))] hover:ring-primary/28",
  "hover:shadow-[0_2px_0_0_oklch(1_0.01_60_/_0.4),0_12px_32px_-8px_oklch(0.5_0.1_42_/_0.2),0_24px_56px_-14px_oklch(0.38_0.06_48_/_0.28)]",
);

/**
 * Screenshot tile with figcaption + image: inner image area flex-fills below the caption.
 * Viewport cap applies on large screens only (`lg:max-h-[45vh]`).
 */
export const featuredNicheScreenshotCaptionedFigureClassName = cn(
  featuredNicheScreenshotFigureClassName,
  "flex min-h-0 flex-col overflow-hidden lg:max-h-[45vh]",
);

/** Hero beside project docs: light orange frame + hover (no full card panel). */
export const featuredNicheHeroImageFrameNoPanelClassName = cn(
  "group/hero relative z-[2] w-full min-w-0 overflow-hidden rounded-2xl",
  "border-2 border-primary/26 bg-primary/[0.06] ring-1 ring-inset ring-primary/16 shadow-sm",
  "transition-[border-color,box-shadow,ring-color,background-color] duration-300 ease-out",
  "hover:border-primary/42 hover:bg-primary/[0.1] hover:ring-primary/24 hover:shadow-md hover:shadow-primary/15",
);

/** Inner raster for hero / screenshot — subtle zoom on frame hover. */
export const featuredNicheRasterImgHoverClassName =
  "transition duration-500 ease-out group-hover/shot:scale-[1.02] group-hover/hero:scale-[1.02]";

/** Featured niche: dark monospace block for setup snippets (e.g. Surf Shelter classifier). */
export const featuredNicheSetupCodePreClassName = cn(
  "overflow-x-auto rounded-xl border border-primary/18 p-4 ring-1 ring-inset ring-primary/12",
  "bg-[color-mix(in_oklch,var(--primary)_10%,white)]",
  "shadow-[inset_0_1px_0_0_oklch(1_0.01_60_/_0.10)]",
  "text-left font-mono text-[0.75rem] leading-relaxed text-foreground sm:text-[0.8125rem]",
);

/** Same typography as Tao24 `Tao24FeaturedCodeShowcase` file-structure tabs (no filled background). */
export const featuredNicheSetupCodeToggleSummaryClassName = cn(
  heroIntroMutedClauseInk,
  "flex cursor-pointer list-none items-center justify-between gap-3",
  "text-sm font-semibold leading-relaxed",
  "rounded-xl px-3 py-2 transition-colors",
  "text-foreground-muted hover:bg-muted/40 hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
);

/** Outer chrome matching the tablist wrapper (`githubDashboardRepoCardPanelClassName` + `p-1`). */
export const featuredNicheSetupCodeToggleOuterClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "p-1",
);

/** Inner well: `rounded-xl bg-muted/20 p-1` (tab row container). */
export const featuredNicheSetupCodeToggleWellClassName =
  "w-full rounded-xl bg-muted/20 p-1";

export const featuredNicheSetupCodeToggleHintClassName =
  "text-xs font-semibold leading-relaxed text-foreground-muted/80";

/** Same cream family as stack pills; border + ring separate chips from the card field. */
export const featuredNicheProjectDocChipClassName = cn(
  "inline-flex cursor-default select-none rounded-full px-3 py-1 text-[0.8125rem] font-semibold text-heading sm:text-sm",
  featuredNicheCreamSurface,
  "border border-primary/14",
  "ring-1 ring-inset ring-white/35",
  "shadow-[0_1px_2px_oklch(0.35_0.03_50_/_0.05)]",
);

/** Interactive affordance for doc chips (default arrow; pointer on hover; subtle button-like press). */
export const featuredNicheProjectDocChipLinkClassName = cn(
  "no-underline transition-all duration-200",
  "hover:cursor-pointer",
  "hover:border-primary/26 hover:bg-[oklch(0.983_0.026_58_/_0.98)] hover:shadow-[0_1px_2px_oklch(0.35_0.03_50_/_0.07)]",
  "active:translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
);

/** Mirrors `buttonVariants` default + lg from `@/components/ui/button` (static HTML). */
export const projectsPagePrimaryButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-4xl border border-transparent bg-clip-padding bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none select-none hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px";

/** Mirrors secondary + lg. */
export const projectsPageSecondaryButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-4xl border border-transparent bg-clip-padding bg-secondary px-4 text-sm font-medium whitespace-nowrap text-secondary-foreground transition-all outline-none select-none hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px";

/**
 * Research paper CTA — same footprint as lg toolbar buttons (`h-10`, horizontal padding),
 * same `text-heading` ink as featured niche badges, no background fill.
 */
export const researchPaperSecondaryButtonClassName = cn(
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-4xl border border-transparent bg-transparent px-4 text-sm font-medium whitespace-nowrap text-heading underline underline-offset-4 decoration-primary/55 outline-none select-none",
  "transition-colors hover:text-primary hover:decoration-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px",
);

/**
 * `/projects` featured stack cards — same chrome as GitHub repo tiles, with a warmer cream fill
 * so the slab reads softer than `bg-card/92` alone.
 */
export const projectsPageStackCardClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "relative min-w-0",
  featuredNicheCreamSurface,
);
