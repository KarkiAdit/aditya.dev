import { githubDashboardRepoCardPanelClassName } from "@/lib/github-dashboard-card";
import { cn } from "@/lib/utils";

/** “Polaroid hole” above the image well — shared by About me books + Memory Lane. */
export const polaroidCardPinClassName =
  "mx-auto mb-1.5 size-2.5 shrink-0 rounded-full border border-foreground/15 bg-background/40 shadow-[inset_0_1px_0_oklch(1_0_0/0.45)] sm:mb-2 sm:size-3";

/** Outer shell: repo-card surface + polaroid padding. */
export const polaroidCardFrameShellClassName = cn(
  githubDashboardRepoCardPanelClassName,
  "relative min-w-0 p-2 sm:p-2.5 md:p-3",
);

/** Inner image well — `[container-type:inline-size]` enables `cqi` in overlay caption `font-size` (fluid vs image width). */
export const polaroidCardImageWellClassName = cn(
  "relative w-full overflow-hidden rounded-[1px] border-2 border-primary/18 bg-muted/35 ring-1 ring-inset ring-primary/12 sm:rounded-sm",
  "[container-type:inline-size]",
  "transition-[border-color,box-shadow,ring-color] duration-300 ease-out",
  "group-hover:border-primary/38 group-hover:ring-primary/24 group-hover:shadow-md group-hover:shadow-primary/12",
);

export const polaroidCardImageDarkScrimClassName =
  "pointer-events-none absolute inset-0 z-[2] bg-black/60";

export const polaroidCardImageBottomGradientClassName =
  "pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-transparent";

/** Cover `<img>` — hover zoom / filter lift (parent must use `group`). */
export const polaroidCardCoverImageHoverClassName =
  "aspect-[4/5] min-h-[min(52dvh,420px)] w-full object-cover object-center transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.01] group-hover:brightness-[1.03] group-hover:saturate-[1.05] sm:min-h-[460px] md:min-h-[500px]";

/** `sizes` for polaroid cover images (About me + Memory Lane). */
export const polaroidCardCoverImageSizes =
  "(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 480px";

/** Top-centered overlay region for caption chips (pointer-events none). */
export const polaroidCardImageOverlaySlotClassName =
  "pointer-events-none absolute inset-0 z-[4] flex items-start justify-center px-4 py-[15%] sm:px-5";

/** Grid for polaroid strips on the homepage (books + memory lane). */
export const polaroidCardGridClassName = cn(
  "grid w-full min-w-0 justify-center",
  "grid-cols-[repeat(auto-fit,minmax(360px,1fr))]",
  "gap-3 sm:gap-4 md:gap-5",
);

/** `<article>` / card root wrapping a polaroid frame + hover group. */
export const polaroidCardArticleRootClassName = "group relative min-w-0 w-full origin-top";
