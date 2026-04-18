import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

import type { FeaturedNicheProject } from "@/lib/featured-niche-projects";
import { TAO24_FEATURED_CODE_SHOWCASE } from "@/lib/tao24-featured-code-showcase";

/** Tab order in the best-picks strip (`order` ascending). */
export function sortProjectEntries(
  entries: CollectionEntry<"projects">[],
): CollectionEntry<"projects">[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export async function getSortedProjectEntries(): Promise<CollectionEntry<"projects">[]> {
  return sortProjectEntries(await getCollection("projects"));
}

/** Maps a collection entry to the dashboard `FeaturedNicheProject` shape (incl. runtime code showcase). */
export function collectionEntryToFeaturedNicheProject(
  entry: CollectionEntry<"projects">,
): FeaturedNicheProject {
  const d = entry.data;
  const base: FeaturedNicheProject = {
    id: entry.id,
    categoryChip: d.categoryChip,
    title: d.title,
    description: d.description,
    githubUrl: d.githubUrl,
    heroImageSlug: d.heroImageSlug,
    researchPaper: d.researchPaper,
    techStack: d.techStack,
    screenshots: d.screenshots,
    projectDocs: d.projectDocs,
    setupCode: d.setupCode,
  };
  if (d.codeShowcaseKey === "tao24") {
    return { ...base, codeShowcase: TAO24_FEATURED_CODE_SHOWCASE };
  }
  return base;
}

export function validDashboardProjectPickIds(entries: CollectionEntry<"projects">[]): string[] {
  return sortProjectEntries(entries).map((e) => e.id);
}

/** True when the MDX file has content after the frontmatter (omit extended prose + border when false). */
export function projectEntryHasMdxBody(entry: CollectionEntry<"projects">): boolean {
  const raw = "body" in entry ? (entry as { body?: string }).body : undefined;
  return typeof raw === "string" && raw.trim().length > 0;
}
