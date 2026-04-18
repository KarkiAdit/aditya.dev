import path from "node:path";

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const contentRoot = path.resolve(process.cwd(), "content");

/** Used for the Thoughts hub genre filter: Spirituality, Philosophy, Science, Additional. */
const thoughtGenreSchema = z.enum(["spirituality", "philosophy", "science", "additional"]);

const projectScreenshotSchema = z.object({
  slug: z.string(),
  label: z.string(),
});

const projectDocLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

const projectSetupCodeSchema = z.object({
  sectionTitle: z.string(),
  code: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: path.join(contentRoot, "projects") }),
  schema: z.object({
    /** Sort key for the best-picks tab strip (ascending). */
    order: z.number().int(),
    categoryChip: z.string(),
    title: z.string(),
    /** Short lead shown above the project card (same as legacy `FeaturedNicheProject.description`). */
    description: z.string(),
    githubUrl: z.string().url(),
    /** Optional hero image stem — file `public/projects/{slug}.png` (or `.jpeg`). */
    heroImageSlug: z.string().optional(),
    researchPaper: projectDocLinkSchema.optional(),
    techStack: z.array(z.string()).min(1),
    screenshots: z.array(projectScreenshotSchema).default([]),
    projectDocs: z.array(projectDocLinkSchema).optional(),
    setupCode: projectSetupCodeSchema.optional(),
    /** Wires in a built-in interactive showcase from `src/lib/tao24-featured-code-showcase.ts`. */
    codeShowcaseKey: z.enum(["tao24"]).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: path.join(contentRoot, "blog") }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    /** Primary shelf for hub filters. */
    genre: thoughtGenreSchema,
    /** Narrower topics for chips (navbar already shows the main genre); exactly two per post. */
    subgenres: z.array(z.string().min(1)).length(2),
    /** When true, prefer this post as the featured hero (otherwise the newest post is featured). */
    featured: z.boolean().optional(),
    /** Optional hero / card image (`public/` path, e.g. `/photos/post-cover.jpg`). */
    coverImage: z.string().optional(),
    /**
     * `false` = not released yet (hub actions disabled, release line shows `N/A`).
     * Omit or `true` = released; see `releasedDate` vs `date` for the displayed release date.
     * Preprocess accepts string `"true"` / `"false"` from YAML edge cases.
     */
    isReleased: z.preprocess(
      (val) => {
        if (val === undefined || val === null) return undefined;
        if (val === false || val === "false" || val === "False" || val === "FALSE") return false;
        if (val === true || val === "true" || val === "True" || val === "TRUE") return true;
        return val;
      },
      z.boolean().optional(),
    ),
    /** Optional; when released, shown instead of `date` as the public “released” date. */
    releasedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects };
