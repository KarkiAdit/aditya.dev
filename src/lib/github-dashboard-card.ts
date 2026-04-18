import { cn } from "@/lib/utils";

/**
 * Repository tile surface (`<a>` around each repo card). Used on nested cards under stack
 * sections (e.g. `/projects` live GitHub snapshot).
 */
export const githubDashboardRepoCardClassName = cn(
  "flex h-full min-h-0 w-full flex-col rounded-2xl border border-secondary/35 bg-card/92 p-4 ring-1 ring-inset ring-secondary/20",
  "shadow-sm",
  "transition-[box-shadow,background-color,border-color,ring-color]",
  "hover:border-secondary/50 hover:bg-card/98 hover:ring-secondary/28 hover:shadow-md",
);

/** Same surface as repo tiles, without hover (figures, static panels). */
export const githubDashboardRepoCardPanelClassName = cn(
  "flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-secondary/35 bg-card/92 ring-1 ring-inset ring-secondary/20 shadow-sm",
);
