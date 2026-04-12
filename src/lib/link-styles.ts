import { cn } from "@/lib/utils";

/**
 * Merge with `cn(linkHoverUnderline, …)` on `Link` or `<a>`.
 * Default: no underline; hover / keyboard focus: underline with accent decoration.
 */
export const linkHoverUnderline =
  "no-underline underline-offset-4 decoration-2 decoration-primary/70 transition-[color,text-decoration-color] hover:underline hover:decoration-primary focus-visible:underline focus-visible:decoration-primary";

/**
 * Muted supporting ink site-wide — **`font-prominent-copy`** + **`text-foreground-muted`**
 * (same as the hero lead spans: “Humans,” / “Yin as a Spiritual Thinker…”). Header nav, footer links,
 * and straplines should compose from this.
 */
export const heroIntroSupportingText =
  "font-prominent-copy text-foreground-muted";

/**
 * Muted clause inside the hero lead — **identical** to {@link heroIntroSupportingText}; kept for
 * readable call sites next to {@link heroIntroLeadTypography}.
 */
export const heroIntroMutedClauseInk = heroIntroSupportingText;

/** Roles line in `Hero` intro card — size + weight + color */
export const heroIntroRolesTypography = cn(
  heroIntroSupportingText,
  "text-base md:text-lg",
);

/** Hero headline — matches `design-system` HomeHero display scale (`text-4xl` / `md:text-5xl`). */
export const heroIntroHeadlineTypography =
  "text-4xl font-extrabold tracking-tight text-primary md:text-5xl";

/**
 * Hero lead line — responsive scale + rhythm only (no ink). Parent uses {@link heroIntroLeadTypography};
 * muted spans use {@link heroIntroMutedClauseInk}; standalone muted blocks use {@link heroIntroLeadMutedClauseTypography}.
 */
export const heroIntroLeadScaleTypography =
  "text-xl font-extrabold tracking-tight leading-snug sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight";

/**
 * Homepage hero one-line lead — {@link heroIntroLeadScaleTypography} + primary body ink.
 */
export const heroIntroLeadTypography = cn(heroIntroLeadScaleTypography, "text-foreground");

/**
 * Full hero-lead scale + **`text-primary-foreground`** — near-white from the primary pairing
 * (`theme.css` `--primary-foreground`, ~oklch 0.98 with a warm hint). Use on dark imagery where
 * saturated `text-primary` would be too heavy; “Aditya’s here.” stays `text-primary` on the light hero.
 */
export const heroIntroLeadPrimaryForegroundTypography = cn(
  heroIntroLeadScaleTypography,
  "text-primary-foreground",
);

/**
 * Full hero-lead scale + muted clause styling — use when the muted line is **not** inside a lead `<p>`
 * (e.g. About sophistication paragraph should match the hero continuation span).
 */
export const heroIntroLeadMutedClauseTypography = cn(
  heroIntroLeadScaleTypography,
  heroIntroMutedClauseInk,
);

/**
 * About body — same **`font-semibold`** + **`text-foreground-muted`** as the hero continuation
 * (“…flows as a Software Engineer…”); one responsive step smaller than {@link heroIntroLeadTypography}.
 */
export const aboutSectionHeroContinuationTypography = cn(
  "font-semibold text-foreground-muted text-pretty leading-relaxed",
  "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
);

/**
 * Hero roles line — matches `design-system` HomeHero supporting paragraph (`text-lg` / `md:text-xl`).
 * Use on the homepage hero only; nav uses {@link heroIntroRolesTypography}.
 */
export const heroIntroRolesDisplayTypography = cn(
  heroIntroSupportingText,
  "text-lg leading-relaxed md:text-xl",
);

/** Footer main nav — compact `text-sm`, same ink as hero roles */
export const mainNavLinkAppearance = cn(
  "text-sm transition-colors hover:text-primary",
  heroIntroSupportingText,
);

/**
 * Header main nav copy — size scale + {@link heroIntroSupportingText} (no link hover).
 * Use for static text that should match nav link typography; links use {@link headerMainNavLinkAppearance}.
 */
export const headerMainNavBodyTypography = cn(
  heroIntroSupportingText,
  "text-xs sm:text-sm md:text-base lg:text-lg",
);

/**
 * One step up from {@link headerMainNavBodyTypography} — same ink/weight, roomier scale for wide strips.
 */
export const headerMainNavBodyTypographyRoomy = cn(
  heroIntroSupportingText,
  "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
);

/** Header main nav links — {@link headerMainNavBodyTypography} + hover affordance */
export const headerMainNavLinkAppearance = cn(
  headerMainNavBodyTypography,
  "transition-colors hover:text-primary",
);
