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
};

export function getRepoLanguageColor(name: string): string {
  return REPO_LANGUAGE_HEX[name] ?? "oklch(0.55 0.04 50)";
}

export function formatRepoByteLabel(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}
