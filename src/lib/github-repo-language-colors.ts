import { featuredNicheTechStackChipClassName } from "@/lib/projects-page";
import { cn } from "@/lib/utils";

const REPO_LANGUAGE_HEX: Readonly<Record<string, string>> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  /** Dark rust-orange (not neutral gray) for chip tints. */
  C: "#6C3A12",
  Ruby: "#701516",
  PHP: "#4F5D95",
  /** Dark burnt orange — chip tints / fallbacks. */
  Swift: "#A94E0E",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Astro: "#ff5a03",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  MDX: "#fcb32c",
  /** Featured / stack chips (same visual language as GitHub repo tiles on `/projects`). */
  SwiftUI: "#C06014",
  Firestore: "#FF9100",
  Xcode: "#147EFB",
  "Gemini API": "#7C6CF9",
  UIKit: "#E14942",
  StoreKit: "#0063D1",
  CloudFront: "#FF9900",
  PostgreSQL: "#336791",
  Redis: "#DC382D",
  "Google Analytics": "#F9AB00",
  "App Store": "#0D96F6",
  "iOS · AI": "#F05138",
  "Product · Systems": "#6366f1",
};

export function getRepoLanguageColor(name: string): string {
  return REPO_LANGUAGE_HEX[name] ?? "oklch(0.55 0.04 50)";
}

/**
 * Language bar columns — every fill is **`var(--primary)`** blended in OKLCH with `white`,
 * `var(--secondary)` (warm wash), or `var(--heading)` (same orange family, slightly richer) so
 * neighbors stay distinct while the chart stays on-brand.
 */
const GITHUB_DASHBOARD_LANGUAGE_BAR_SEGMENT_CLASSES = [
  "bg-[color-mix(in_oklch,var(--primary)_26%,white)]",
  "bg-[color-mix(in_oklch,var(--primary)_40%,var(--secondary))]",
  "bg-[color-mix(in_oklch,var(--primary)_52%,white)]",
  "bg-[color-mix(in_oklch,var(--primary)_34%,var(--secondary))]",
  "bg-primary",
  "bg-[color-mix(in_oklch,var(--primary)_72%,var(--heading))]",
  "bg-[color-mix(in_oklch,var(--primary)_46%,var(--secondary))]",
  "bg-[color-mix(in_oklch,var(--primary)_58%,white)]",
  "bg-[color-mix(in_oklch,var(--primary)_82%,var(--heading))]",
  "bg-[color-mix(in_oklch,var(--primary)_64%,var(--secondary))]",
] as const;

export function getGithubDashboardLanguageBarSegmentClass(segmentIndex: number): string {
  return GITHUB_DASHBOARD_LANGUAGE_BAR_SEGMENT_CLASSES[
    segmentIndex % GITHUB_DASHBOARD_LANGUAGE_BAR_SEGMENT_CLASSES.length
  ]!;
}

/** Pastel chip fill: keeps hue from `getRepoLanguageColor` without heavy saturation. */
export function getRepoLanguageChipBackgroundColor(name: string): string {
  const base = getRepoLanguageColor(name);
  return `color-mix(in oklch, ${base} 34%, white)`;
}

/**
 * Repo **language** + **topic** pills — same shell as featured project stack badges
 * (`featuredNicheTechStackChipClassName`). `cursor-inherit` so chips inside repo `<a>` tiles keep the
 * link pointer.
 */
export const githubDashboardLanguageChipClassName = cn(
  featuredNicheTechStackChipClassName,
  "cursor-inherit min-w-0 max-w-[14rem] shrink truncate",
);

export function formatRepoByteLabel(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}
