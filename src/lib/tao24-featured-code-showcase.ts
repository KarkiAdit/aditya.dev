/**
 * Curated file tree + design tokens for the tao24 featured card (`/projects`).
 * Consumed by `Tao24FeaturedCodeShowcase` and `FEATURED_NICHE_PROJECTS`.
 */
export type FeaturedNicheFileNode = {
  readonly name: string;
  readonly blurb?: string;
  /** If set (including `[]`), this node is a directory and shows a disclosure control. */
  readonly children?: readonly FeaturedNicheFileNode[];
};

export type FeaturedNicheDesignRow = {
  readonly token: string;
  readonly value: string;
  readonly kind: "color" | "type" | "space" | "radius";
  readonly note?: string;
};

export type FeaturedNicheCodeShowcase = {
  readonly noneTabLabel: string;
  readonly fileTabLabel: string;
  readonly designTabLabel: string;
  readonly fileRoots: readonly FeaturedNicheFileNode[];
  readonly designRows: readonly FeaturedNicheDesignRow[];
};

export const TAO24_FEATURED_CODE_SHOWCASE = {
  noneTabLabel: "None",
  fileTabLabel: "File structure",
  designTabLabel: "Design system",
  fileRoots: [
    {
      name: "tao24",
      children: [
        {
          name: "src",
          children: [
            { name: "Views", blurb: "the plate", children: [] },
            { name: "Screens", blurb: "coordinator", children: [] },
            { name: "Stores", blurb: "custom workers", children: [] },
            { name: "Services", blurb: "tailored workers", children: [] },
            { name: "Models", blurb: "ingredients", children: [] },
            { name: "Persistence", blurb: "data sync", children: [] },
            { name: "Resources", blurb: "binary assets used in build", children: [] },
            { name: "Core", blurb: "global logic", children: [] },
            {
              name: "Info.plist",
              blurb: "App configuration, URL types, permissions, and bundle metadata.",
            },
            { name: "Assets", blurb: "Asset catalogs and bundled media referenced by the target." },
            { name: "AppDelegate", blurb: "Application lifecycle and dependency bootstrap." },
            { name: "LaunchScreen", blurb: "Launch storyboard / initial interface." },
            { name: "SceneDelegate", blurb: "Scene sessions, window graph, and first coordinator handoff." },
          ],
        },
        { name: "CLAUDE.md", blurb: "Contributor and AI context for the repository." },
        { name: ".gitignore", blurb: "Version-control ignore rules." },
      ],
    },
  ],
  designRows: [
    {
      token: "color.background.canvas",
      value: "oklch(0.96 0.02 55)",
      kind: "color",
      note: "Warm off-white canvas; matches site chrome family.",
    },
    {
      token: "color.text.primary",
      value: "oklch(0.36 0.022 50)",
      kind: "color",
      note: "Body + labels on light surfaces.",
    },
    {
      token: "color.accent.action",
      value: "oklch(0.5 0.15 40)",
      kind: "color",
      note: "Primary CTAs; pairs with high-contrast label token.",
    },
    {
      token: "type.title.large",
      value: "22pt / Bold / -0.02em",
      kind: "type",
      note: "Screen titles; scales with Dynamic Type .largeTitle.",
    },
    {
      token: "type.body.default",
      value: "16pt / Medium / 0.01em",
      kind: "type",
      note: "Dense reading surfaces + settings copy.",
    },
    {
      token: "space.grid.base",
      value: "8pt",
      kind: "space",
      note: "All spacing snaps to multiples of 8.",
    },
    {
      token: "radius.card",
      value: "16pt",
      kind: "radius",
      note: "Cards + grouped table backgrounds.",
    },
    {
      token: "radius.control",
      value: "12pt",
      kind: "radius",
      note: "Buttons + chips inside habit rows.",
    },
  ],
} as const satisfies FeaturedNicheCodeShowcase;
