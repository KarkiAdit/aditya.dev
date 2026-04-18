"use client";

import { useCallback, useState } from "react";

import type {
  FeaturedNicheCodeShowcase,
  FeaturedNicheDesignRow,
  FeaturedNicheFileNode,
} from "@/lib/tao24-featured-code-showcase";
import { githubDashboardRepoCardPanelClassName } from "@/lib/github-dashboard-card";
import { heroIntroMutedClauseInk } from "@/lib/link-styles";
import {
  featuredNicheBadgeLabelTypographyClassName,
  featuredNicheCategoryChipClassName,
} from "@/lib/projects-page";
import { cn } from "@/lib/utils";

type ShowcaseView = "none" | "files" | "design";

/** Same ink family as project blurbs, one step smaller — no lg/xl ramp inside the showcase. */
const showcaseCompactBodyClass = cn(
  heroIntroMutedClauseInk,
  "text-xs leading-snug sm:text-sm sm:leading-relaxed",
);

const showcaseSectionLabelClass = cn(
  "mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground-muted sm:text-xs",
);

const treeBodyClass = cn(showcaseCompactBodyClass, "text-pretty font-mono");

/** Inactive tab: same footprint as category badge, no cream fill (matches chip chrome only on hover). */
const tabButtonIdleClass = cn(
  "inline-flex select-none items-center rounded-sm px-3 py-1.5 sm:px-3.5 sm:py-[0.42rem]",
  featuredNicheBadgeLabelTypographyClassName,
  "text-foreground-muted",
  "border border-transparent",
  "cursor-pointer transition-[color,background-color,border-color,box-shadow] duration-200",
  "hover:border-primary/14 hover:bg-[oklch(0.987_0.022_58_/_0.55)] hover:text-heading",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
);

const tabButtonSelectedClass = cn(
  featuredNicheCategoryChipClassName,
  "cursor-pointer normal-case",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
);

function FileTreeBranch({
  nodes,
  parentPath,
  expanded,
  toggle,
  depth,
}: {
  nodes: readonly FeaturedNicheFileNode[];
  parentPath: string;
  expanded: ReadonlySet<string>;
  toggle: (path: string) => void;
  depth: number;
}) {
  return (
    <ul
      className={cn("space-y-0.5", depth > 0 && "ml-2 border-l border-border/25 pl-2.5")}
      role="group"
    >
      {nodes.map((node) => {
        const path = parentPath ? `${parentPath}/${node.name}` : node.name;
        const isDirectory = node.children !== undefined;
        const childNodes = node.children ?? [];
        const hasNested = childNodes.length > 0;
        const isOpen = expanded.has(path);
        return (
          <li key={path} role="treeitem" aria-expanded={isDirectory ? isOpen : undefined}>
            <div className="flex items-start gap-0.5">
              {isDirectory ? (
                <button
                  type="button"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                  aria-label={isOpen ? `Collapse ${node.name}` : `Expand ${node.name}`}
                  onClick={() => toggle(path)}
                >
                  <span className="text-[0.65rem] font-bold" aria-hidden>
                    {isOpen ? "▾" : "▸"}
                  </span>
                </button>
              ) : (
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center text-[0.55rem] text-foreground-muted/70"
                  aria-hidden
                >
                  ◦
                </span>
              )}
              <div className="min-w-0 flex-1">
                <span
                  className={cn(featuredNicheBadgeLabelTypographyClassName, "text-pretty leading-snug")}
                >
                  {node.name}
                </span>
                {isDirectory && node.blurb ? (
                  <p className={cn(showcaseCompactBodyClass, "mt-0.5 text-pretty leading-snug")}>
                    <span className="text-foreground-muted/80">←</span> {node.blurb}
                  </p>
                ) : null}
                {isDirectory && isOpen && hasNested ? (
                  <FileTreeBranch
                    nodes={childNodes}
                    parentPath={path}
                    expanded={expanded}
                    toggle={toggle}
                    depth={depth + 1}
                  />
                ) : null}
                {!isDirectory && node.blurb ? (
                  <p className={cn(showcaseCompactBodyClass, "mt-0.5 text-pretty")}>{node.blurb}</p>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function DesignPreview({ row }: { row: FeaturedNicheDesignRow }) {
  if (row.kind === "color") {
    return (
      <div
        className="h-8 w-full max-w-[4.5rem] shrink-0 rounded-lg border border-border/30 shadow-inner"
        style={{ background: row.value }}
        title={row.value}
      />
    );
  }
  if (row.kind === "type") {
    return (
      <div className="flex max-w-[8rem] items-baseline gap-1 rounded-lg border border-border/30 bg-muted/25 px-2 py-1.5">
        <span className="text-[0.65rem] font-bold tracking-tight text-heading">Aa</span>
        <span className="text-[0.6rem] text-foreground-muted">{row.value.split("/")[0]?.trim()}</span>
      </div>
    );
  }
  if (row.kind === "space") {
    return (
      <div className="flex h-8 items-end gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-sm bg-primary/55"
            style={{ height: `${(i + 1) * 4 + 4}px` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className="h-8 w-14 shrink-0 rounded-lg border border-border/30 bg-card/55"
      style={{ borderRadius: row.value.replace("pt", "px") }}
    />
  );
}

export function Tao24FeaturedCodeShowcase({ showcase }: { showcase: FeaturedNicheCodeShowcase }) {
  const [tab, setTab] = useState<ShowcaseView>("none");
  const [expanded, setExpanded] = useState(() => new Set<string>(["tao24", "tao24/src"]));
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const toggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const onCopyRow = useCallback(async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      window.setTimeout(() => {
        setCopiedToken((t) => (t === token ? null : t));
      }, 1600);
    } catch {
      setCopiedToken(null);
    }
  }, []);

  return (
    <div className="flex w-full min-w-0 flex-col items-start space-y-4">
      <div
        className="flex w-fit max-w-full flex-wrap gap-2"
        role="tablist"
        aria-label="tao24 architecture views"
      >
        <button
          id="tao24-tab-none"
          type="button"
          role="tab"
          aria-selected={tab === "none"}
          aria-controls="tao24-showcase-none"
          className={tab === "none" ? tabButtonSelectedClass : tabButtonIdleClass}
          onClick={() => setTab("none")}
        >
          {showcase.noneTabLabel}
        </button>
        <button
          id="tao24-tab-files"
          type="button"
          role="tab"
          aria-selected={tab === "files"}
          aria-controls="tao24-showcase-files"
          className={tab === "files" ? tabButtonSelectedClass : tabButtonIdleClass}
          onClick={() => setTab("files")}
        >
          {showcase.fileTabLabel}
        </button>
        <button
          id="tao24-tab-design"
          type="button"
          role="tab"
          aria-selected={tab === "design"}
          aria-controls="tao24-showcase-design"
          className={tab === "design" ? tabButtonSelectedClass : tabButtonIdleClass}
          onClick={() => setTab("design")}
        >
          {showcase.designTabLabel}
        </button>
      </div>

      <div
        id="tao24-showcase-none"
        role="tabpanel"
        aria-labelledby="tao24-tab-none"
        hidden={tab !== "none"}
        className="sr-only"
      >
        <p>No detail view is open. Choose file structure or design system to explore.</p>
      </div>

      <div
        className={cn(githubDashboardRepoCardPanelClassName, "w-full min-w-0 p-4 sm:p-5")}
        role="tabpanel"
        id="tao24-showcase-files"
        aria-labelledby="tao24-tab-files"
        hidden={tab !== "files"}
      >
        <p className={showcaseSectionLabelClass}>Repository layout</p>
        <div className="max-h-[min(52vh,28rem)] overflow-y-auto overscroll-y-contain pr-1">
          <FileTreeBranch
            nodes={showcase.fileRoots}
            parentPath=""
            expanded={expanded}
            toggle={toggle}
            depth={0}
          />
        </div>
      </div>

      <div
        className={cn(githubDashboardRepoCardPanelClassName, "w-full min-w-0 p-2 sm:p-3")}
        role="tabpanel"
        id="tao24-showcase-design"
        aria-labelledby="tao24-tab-design"
        hidden={tab !== "design"}
      >
        <p className={cn(showcaseSectionLabelClass, "mb-2 px-2 pt-1")}>
          Tokens — click a row to copy the token name
        </p>
        <ul className="divide-y divide-border/20 overflow-hidden rounded-xl border border-border/25 bg-card/55 ring-1 ring-inset ring-white/12">
          {showcase.designRows.map((row) => (
            <li key={row.token}>
              <button
                type="button"
                className="flex w-full gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/20 focus-visible:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/35 sm:items-center sm:gap-4 sm:py-2.5"
                onClick={() => void onCopyRow(row.token)}
              >
                <div className="shrink-0 pt-0.5">
                  <DesignPreview row={row} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className={cn(treeBodyClass, "font-semibold text-foreground")}>{row.token}</span>
                    {copiedToken === row.token ? (
                      <span className={cn(showcaseCompactBodyClass, "font-semibold text-primary")}>
                        Copied
                      </span>
                    ) : null}
                  </div>
                  <p className={cn(treeBodyClass, "mt-0.5 text-foreground-muted")}>{row.value}</p>
                  {row.note ? (
                    <p className={cn(showcaseCompactBodyClass, "mt-1.5 text-pretty")}>{row.note}</p>
                  ) : null}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
