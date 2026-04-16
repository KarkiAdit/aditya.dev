import { githubDashboardRepoCardPanelClassName } from "@/lib/github-dashboard-card";
import {
  heroIntroMutedClauseInk,
  heroIntroSupportingText,
  memoryLaneNoteBodyTypography,
} from "@/lib/link-styles";
import { cn } from "@/lib/utils";

/**
 * Featured niche: category above the title — same glass + ink as main `Navbar` (`glass-lit`, `rounded-2xl`).
 */
export const featuredNicheCategoryChipClassName = cn(
  "glass-lit inline-flex cursor-default select-none items-center rounded-2xl px-2.5 py-1 sm:px-3 sm:py-1.5",
  heroIntroSupportingText,
  "text-xs font-semibold uppercase tracking-widest sm:text-sm",
);

/** Featured niche: stack pills — light orange wash from `--primary`, dark label for contrast. */
export const featuredNicheTechStackChipClassName = cn(
  "inline-flex cursor-default select-none rounded-full px-2.5 py-0.5 text-xs font-medium text-heading ring-1 ring-primary/25 sm:text-[0.8125rem]",
  "bg-[color-mix(in_oklch,var(--primary)_38%,white)]",
  "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
);

/** Section title above project-doc chips — same scale + weight as stack pills. */
export const featuredNicheProjectDocSectionLabelClassName = cn(
  memoryLaneNoteBodyTypography,
  "mb-2 font-semibold text-foreground-muted",
);

/**
 * Featured niche: outer frame for each screenshot (caption + image). Starts from the same
 * repo-style panel as the parent, then accent-tinted border + ring / shadow so tiles read as a layer above.
 */
export const featuredNicheScreenshotFigureClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "relative z-[2] w-fit max-w-full",
  "border-2 border-primary/38",
  "shadow-[0_2px_0_0_oklch(1_0.01_60_/_0.35),0_8px_22px_-6px_oklch(0.24_0.03_50_/_0.18),0_22px_52px_-14px_oklch(0.32_0.04_50_/_0.32)]",
  "ring-1 ring-inset ring-white/45",
);

/** Hero beside project docs: border frame only — no `bg-card` panel behind the image. */
export const featuredNicheHeroImageFrameNoPanelClassName = cn(
  "relative z-[2] w-full min-w-0 overflow-hidden rounded-2xl",
  "border border-primary/32",
  "bg-transparent shadow-none ring-0",
);

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

/** Same surface + type as stack pills, with an explicit border so badges read clearly. */
export const featuredNicheProjectDocChipClassName = cn(
  "inline-flex cursor-default select-none rounded-full px-2.5 py-0.5 text-xs font-medium text-heading sm:text-[0.8125rem]",
  "bg-transparent",
  "border border-primary/40 ring-1 ring-inset ring-primary/18",
);

/** Interactive affordance for doc chips (default arrow; pointer on hover; subtle button-like press). */
export const featuredNicheProjectDocChipLinkClassName = cn(
  "no-underline transition-all duration-200",
  "hover:cursor-pointer",
  "hover:bg-[color-mix(in_oklch,var(--primary)_14%,transparent)] hover:border-primary/55 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
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
 * `/projects` featured stack cards — same static surface as GitHub repo tiles on this page
 * (`bg-card/92` + border/ring/shadow).
 */
export const projectsPageStackCardClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "relative min-w-0",
);
