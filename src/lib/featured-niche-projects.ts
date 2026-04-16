import type { FeaturedNicheCodeShowcase } from "@/lib/tao24-featured-code-showcase";
import { TAO24_FEATURED_CODE_SHOWCASE } from "@/lib/tao24-featured-code-showcase";

/**
 * Curated “niche showcase” projects for `/projects` featured section.
 * Drop images into `src/assets/images/featured-niche/` using each entry’s `slug`
 * (e.g. `recipe-dashboard.png`, `tao24-blackbox-design.jpeg`).
 */
export type FeaturedNicheScreenshot = {
  /** Filename stem in `featured-niche/` (e.g. `recipe-dashboard` → `recipe-dashboard.png`). */
  slug: string;
  label: string;
};

/** Optimized URL + display dimensions (built in `loadFeaturedNicheScreenshotMap`). */
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
  /** Optional: a single full-width hero image inside the card (uses `featured-niche/` slug). */
  heroImageSlug?: string;
  githubUrl: string;
  /** Optional; shown beside “Open repository” when `href` is non-empty. */
  researchPaper?: FeaturedNicheResearchLink;
  techStack: readonly string[];
  screenshots: readonly FeaturedNicheScreenshot[];
  /** Optional copy to the right of the screenshot grid (`sm+`); stacks below on narrow viewports. */
  screenshotsAside?: string;
  /** Optional doc areas (links). */
  projectDocs?: readonly FeaturedNicheProjectDocLink[];
  setupCode?: FeaturedNicheSetupCode;
  /** Optional interactive file tree + design tokens (React island). */
  codeShowcase?: FeaturedNicheCodeShowcase;
};

export const FEATURED_NICHE_PROJECTS = [
  {
    id: "surf-shelter",
    categoryChip: "Chrome · ML",
    title: "Surf Shelter",
    description:
      "An intelligent Chrome web extension powered by ML to classify and filter harmful websites.",
    heroImageSlug: "surf-shelter-prediction",
    githubUrl: "https://github.com/KarkiAdit/surf-shelter-frontend-client-engine",
    researchPaper: {
      label: "Research paper",
      href: "https://wjaets.com/content/surf-shelter-big-data-driven-risk-assessment-system-using-multi-label-classification",
    },
    techStack: [
      "Chrome Extension API",
      "React",
      "Tailwind",
      "TypeScript",
      "Vite",
      "gRPC",
      "Python",
      "Docker",
      "GCS",
      "NumPy",
      "Pandas",
      "SVM",
      "NLP",
      "Ensemble Methods",
      "Common Crawl",
    ],
    screenshots: [],
    projectDocs: [
      {
        label: "System design",
        href: "https://www.figma.com/design/37sRjFaQVnCcbRczoH4A57/Surf-Shelter---System-Design--Copy-?node-id=0-1&t=VSrCwvMCyjfMQStu-1",
      },
      {
        label: "Model processor",
        href: "https://www.figma.com/design/yTsK5z1sEQAJRjd1upW5ud/surf-shelter-multi-level-classifier-workflow?node-id=0-1&t=93vBw4JuGABAYajE-1",
      },
      {
        label: "Frontend client",
        href: "https://www.figma.com/design/pmF6znoIFyRMIU4y7iLpM2/Frontend-Client-Engine---High-Level-Design?t=93vBw4JuGABAYajE-1",
      },
      {
        label: "Backend engine",
        href: "https://www.figma.com/design/dfn7pFHtY1qHkVtC0LjXq6/Data-Server-Engine---High-Level-Design?t=93vBw4JuGABAYajE-1",
      },
    ],
  },
  {
    id: "recipe-with-ai",
    categoryChip: "iOS · AI",
    title: "Recipe with AI",
    description:
      "A full-stack iOS app built with SwiftUI and data enrichment powered by Gemini—from the home surface to an in-flow AI assistant.",
    githubUrl: "https://github.com/KarkiAdit/recipe-with-ai",
    techStack: ["SwiftUI", "Firestore", "Xcode", "Gemini API"],
    screenshots: [
      { slug: "recipe-dashboard", label: "User Dashboard" },
      { slug: "recipe-ai-assistant", label: "AI Assistant" },
      { slug: "recipe-ai-lists", label: "AI-generated lists in Home" },
    ],
    screenshotsAside:
      "Seamlessly engineer any custom recipe with AI-powered precision",
  },
  {
    id: "tao24",
    categoryChip: "Product · Systems",
    title: "tao24",
    description:
      "A private personal-growth habit tracker built around “Self Challenges”—quiet structure for momentum without the noise of social feeds.",
    githubUrl: "https://github.com/KarkiAdit/tao24",
    techStack: [
      "UIKit",
      "StoreKit",
      "Xcode",
      "CloudFront",
      "PostgreSQL",
      "Redis",
      "Go",
      "Google Analytics",
      "App Store",
    ],
    screenshots: [
      { slug: "tao24-initialmvp-home", label: "Today's Habits" },
      { slug: "tao24-blackbox-design", label: "Blackbox system design" },
    ],
    screenshotsAside:
      "A precision-engineered tracking system designed to build consistency and refine your personal growth journey through optimized behavioral loops.",
    codeShowcase: TAO24_FEATURED_CODE_SHOWCASE,
  },
] as const satisfies readonly FeaturedNicheProject[];
