import { cn } from "@/lib/utils";

/**
 * Merge with `cn(linkHoverUnderline, …)` on `Link` or `<a>`.
 * Default: no underline; hover / keyboard focus: underline with accent decoration.
 */
export const linkHoverUnderline =
  "no-underline underline-offset-4 decoration-2 decoration-primary/70 transition-[color,text-decoration-color] hover:underline hover:decoration-primary focus-visible:underline focus-visible:decoration-primary";

/**
 * Hero intro roles line (`CardDescription`) — `text-muted-foreground` + prominent weight.
 * With `--color-muted-foreground` in `theme.css`, matches `--foreground-muted`.
 */
export const heroIntroSupportingText =
  "font-prominent-copy text-muted-foreground";

/** Roles line in `Hero` intro card — size + weight + color */
export const heroIntroRolesTypography = cn(
  heroIntroSupportingText,
  "text-base md:text-lg",
);

/** Hero headline — matches `design-system` HomeHero display scale (`text-4xl` / `md:text-5xl`). */
export const heroIntroHeadlineTypography =
  "text-4xl font-extrabold tracking-tight text-primary md:text-5xl";

/**
 * Homepage hero one-line lead — display weight, slightly under {@link heroIntroHeadlineTypography};
 * scales down on narrow viewports.
 */
export const heroIntroLeadTypography =
  "text-xl font-extrabold tracking-tight text-foreground leading-snug sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight";

/**
 * Hero roles line — matches `design-system` HomeHero supporting paragraph (`text-lg` / `md:text-xl`).
 * Use on the homepage hero only; nav uses {@link heroIntroRolesTypography}.
 */
export const heroIntroRolesDisplayTypography = cn(
  "font-prominent-copy text-lg leading-relaxed text-foreground-muted md:text-xl",
);

/** Footer main nav — compact `text-sm`, same ink as hero roles */
export const mainNavLinkAppearance = cn(
  "text-sm transition-colors hover:text-primary",
  heroIntroSupportingText,
);

/** Header main nav — same ink/weight as strapline; type scales down on narrow viewports */
export const headerMainNavLinkAppearance = cn(
  heroIntroSupportingText,
  "transition-colors hover:text-primary",
  "text-xs sm:text-sm md:text-base lg:text-lg",
);
