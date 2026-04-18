import { Share2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type ThoughtShareButtonProps = {
  url: string;
  title: string;
  text?: string;
  /** Featured strip (light text) vs feed / article (primary ink) vs tonal secondary. */
  variant?: "onDark" | "onLight" | "secondary";
  /** Icon only — for compact rows (e.g. next to date on the hub). */
  iconOnly?: boolean;
  /** Placeholder posts — no share / copy action. */
  disabled?: boolean;
  className?: string;
};

export function ThoughtShareButton({
  url,
  title,
  text,
  variant = "onLight",
  iconOnly = false,
  disabled = false,
  className,
}: ThoughtShareButtonProps) {
  const [label, setLabel] = React.useState("Share");
  const [iconCopied, setIconCopied] = React.useState(false);

  const onClick = React.useCallback(async () => {
    if (disabled) return;
    const sharePayload = { title, text: text ?? title, url };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(sharePayload);
        return;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        if (iconOnly) {
          setIconCopied(true);
          window.setTimeout(() => setIconCopied(false), 2000);
        } else {
          setLabel("Copied");
          window.setTimeout(() => setLabel("Share"), 2000);
        }
        return;
      }
    } catch {
      /* fall through */
    }

    if (!iconOnly) {
      setLabel("Copy failed");
      window.setTimeout(() => setLabel("Share"), 2000);
    }
  }, [disabled, iconOnly, title, text, url]);

  const surfacePill =
    variant === "onDark"
      ? "border-white/35 bg-white/10 text-white hover:bg-white/16 focus-visible:ring-white/35"
      : variant === "secondary"
        ? "border-0 bg-secondary/72 text-secondary-foreground hover:bg-secondary/88 focus-visible:ring-ring/40"
        : "border-primary/25 text-primary hover:bg-primary/10 focus-visible:ring-ring/40";

  const surfaceIcon =
    variant === "onDark"
      ? "border-0 bg-white/10 text-white hover:bg-white/18 focus-visible:ring-white/35"
      : variant === "secondary"
        ? "border-0 bg-secondary/72 text-secondary-foreground hover:bg-secondary/88 focus-visible:ring-ring/40"
        : "border-0 bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-ring/40";

  if (iconOnly) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        title={
          disabled ? "Coming soon" : iconCopied ? "Link copied" : "Share"
        }
        aria-label={
          disabled
            ? "Share unavailable — coming soon"
            : iconCopied
              ? "Link copied to clipboard"
              : `Share “${title}”`
        }
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-md shadow-none transition-colors focus-visible:outline-none focus-visible:ring-2",
          surfaceIcon,
          disabled && "cursor-not-allowed opacity-40 hover:bg-transparent",
          className,
        )}
      >
        <Share2 className="size-[1.05rem] shrink-0 opacity-90" strokeWidth={2} aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold tracking-tight shadow-none transition-colors focus-visible:outline-none focus-visible:ring-2 sm:px-3.5 sm:text-base",
        surfacePill,
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
      aria-label={disabled ? "Share unavailable — coming soon" : `Share “${title}”`}
    >
      <Share2 className="size-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
      <span className="tabular-nums">{label}</span>
    </button>
  );
}
