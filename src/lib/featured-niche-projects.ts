import type { FeaturedNicheCodeShowcase } from "@/lib/tao24-featured-code-showcase";

/**
 * Curated “niche showcase” projects for `/projects` featured section.
 * **Source of truth:** `content/projects/*.mdx` (see `collectionEntryToFeaturedNicheProject` in `projects-content.ts`).
 * Drop rasters into `public/projects/` using each screenshot’s `slug`
 * (e.g. `recipe-dashboard.png`, `tao24-blackbox-design.jpeg`); register dimensions in `projects-public-images.ts`.
 */
export type FeaturedNicheScreenshot = {
  /** Filename stem in `public/projects/` (e.g. `recipe-dashboard` → `/projects/recipe-dashboard.png`). */
  slug: string;
  label: string;
};

/** Public URL + display dimensions (see `getFeaturedNichePublicImageMap`). */
export type FeaturedNicheImageAsset = {
  src: string;
  width: number;
  height: number;
};

export type FeaturedNicheResearchLink = {
  readonly label: string;
  readonly href: string;
};

/** Static setup snippet rendered as a dark code block (e.g. Python classifier usage). */
export type FeaturedNicheSetupCode = {
  readonly sectionTitle: string;
  readonly code: string;
};

export type FeaturedNicheProjectDocLink = {
  readonly label: string;
  readonly href: string;
};

export type FeaturedNicheProject = {
  id: string;
  /** Line shown in the glass chip above the title (e.g. `Chrome · ML`). */
  categoryChip: string;
  title: string;
  description: string;
  /** Optional: a single full-width hero image inside the card (`public/projects/{slug}.png`). */
  heroImageSlug?: string;
  githubUrl: string;
  /** Optional; shown beside “Open repository” when `href` is non-empty. */
  researchPaper?: FeaturedNicheResearchLink;
  techStack: readonly string[];
  screenshots: readonly FeaturedNicheScreenshot[];
  /** Optional doc areas (links). */
  projectDocs?: readonly FeaturedNicheProjectDocLink[];
  setupCode?: FeaturedNicheSetupCode;
  /** Optional interactive file tree + design tokens (React island). */
  codeShowcase?: FeaturedNicheCodeShowcase;
};

/** Fourth dashboard tab — live language chart + profile (URL `?pick=github-snapshot`). */
export const GITHUB_SNAPSHOT_PICK_ID = "github-snapshot" as const;
