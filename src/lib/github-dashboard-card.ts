import { cn } from "@/lib/utils";

/**
 * Repository tile surface from `GitHubDashboardElement` in `ExperienceSection.tsx`
 * (`<a>` around each repo). Use on nested cards under stack sections (e.g. `/projects`).
 */
export const githubDashboardRepoCardClassName = cn(
  "flex h-full min-h-0 w-full flex-col rounded-2xl border border-border/30 bg-card/92 p-4 ring-1 ring-inset ring-white/22",
  "shadow-[0_2px_4px_-1px_oklch(0.32_0.035_48_/_0.09),0_8px_24px_-6px_oklch(0.36_0.04_50_/_0.18)]",
  "transition-[box-shadow,background-color,border-color]",
  "hover:border-border/45 hover:bg-card/98",
  "hover:shadow-[0_4px_8px_-2px_oklch(0.32_0.035_48_/_0.11),0_14px_34px_-8px_oklch(0.38_0.04_50_/_0.22)]",
);

/** Same surface as repo tiles, without hover (figures, static panels). */
export const githubDashboardRepoCardPanelClassName = cn(
  "flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/92 ring-1 ring-inset ring-white/22",
  "shadow-[0_2px_4px_-1px_oklch(0.32_0.035_48_/_0.09),0_8px_24px_-6px_oklch(0.36_0.04_50_/_0.18)]",
);
