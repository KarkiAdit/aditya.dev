import { cn } from "@/lib/utils";

const REPO_LANGUAGE_HEX: Readonly<Record<string, string>> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Astro: "#ff5a03",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  MDX: "#fcb32c",
  /** Featured / stack chips (same visual language as `GitHubDashboardElement` repo tiles). */
  SwiftUI: "#F05138",
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

/** Pastel chip fill: keeps hue from `getRepoLanguageColor` without heavy saturation. */
export function getRepoLanguageChipBackgroundColor(name: string): string {
  const base = getRepoLanguageColor(name);
  return `color-mix(in oklch, ${base} 34%, white)`;
}

/** Rounded language / stack pill: light surface, readable label (not saturated GitHub-dark fills). */
export const githubDashboardLanguageChipClassName = cn(
  "inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-medium text-heading ring-1 ring-black/[0.08]",
  "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
);

export function formatRepoByteLabel(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}
