/**
 * Tailwind class tokens for dashboard filter chrome (`components/additional/DataDashboard` hubs: `/thoughts`, `/projects`).
 */

export const THOUGHT_HUB_GENRE_CHROME_SHELL =
  "thought-genre-chrome pointer-events-none fixed left-[var(--sidebar-width)] right-0 top-0 z-40 bg-transparent pt-[max(2rem,env(safe-area-inset-top))]";

export const THOUGHT_HUB_GENRE_FILTER_CARD =
  "nav-rail-icon-group-surface mr-2 w-fit max-w-full min-w-0 rounded-2xl p-2.5 sm:mr-3 max-lg:rounded-xl max-lg:p-2";

export const THOUGHT_HUB_FILTER_NAV = "flex min-w-0 w-full max-w-full flex-wrap gap-2";

export const THOUGHT_HUB_FEED_ROW = "thought-feed-row min-w-0 py-4 sm:py-5";

export const THOUGHT_HUB_FEED_THUMB =
  "relative h-[4.75rem] w-full shrink-0 overflow-hidden rounded-md bg-transparent sm:h-[5.75rem] sm:rounded-lg";

/** Subgenre chips on the featured hero cover (`ThoughtFeaturedSection`) — outline on photo, no fill. */
export const THOUGHT_HUB_PILL_ON_MEDIA =
  "inline-flex items-center rounded-full border border-white/88 bg-transparent px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white/88 shadow-none sm:px-3 sm:py-1.5 sm:text-[0.8125rem]";

export const THOUGHT_HUB_FEED_META_READ =
  "text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-lg";

export const THOUGHT_HUB_FEED_META_READ_DISABLED =
  "text-base font-semibold text-foreground-muted/50 cursor-not-allowed select-none sm:text-lg";

export const THOUGHT_HUB_FEATURED_META_READ = "thought-btn-primary";

export const THOUGHT_HUB_FEATURED_META_READ_DISABLED =
  "thought-btn-primary pointer-events-none cursor-not-allowed select-none opacity-45";

export const THOUGHT_HUB_PAGER_NAV =
  "thought-feed-pagination mt-8 flex hidden flex-wrap items-center justify-center gap-2 bg-transparent sm:mt-10 sm:gap-3";

export const THOUGHT_HUB_PAGER_ARROW =
  "thought-btn-secondary min-w-10 px-3 py-1.5 disabled:pointer-events-none disabled:opacity-35 sm:min-w-11";

export const THOUGHT_HUB_FEATURED_TITLE =
  "text-balance break-words font-sans text-[1.875rem] font-bold leading-[1.12] tracking-tight sm:text-[2.5rem] sm:leading-[1.1] md:text-[2.75rem] md:leading-[1.09] lg:text-[3rem] lg:leading-[1.08]";

export const THOUGHT_HUB_FEED_TITLE =
  "text-pretty text-lg font-semibold leading-snug tracking-tight text-heading break-words sm:text-xl md:text-2xl lg:text-3xl";
