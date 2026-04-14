import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const overlayClassName = cn(
  "absolute inset-0 z-[3] flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none transition-colors duration-200",
  "group-hover:bg-black/55 group-active:bg-black/65",
  "focus-visible:bg-black/50 focus-visible:ring-2 focus-visible:ring-ring",
);

export type SophisticationReadMoreOverlayProps = {
  notionHref: string;
  /** `compact` = smaller pill for narrow cards (e.g. memory lane). */
  pillSize?: "comfortable" | "compact";
  /** Merged onto the interactive overlay root. */
  className?: string;
};

function readMorePillClassName(pillSize: SophisticationReadMoreOverlayProps["pillSize"]) {
  const size = pillSize === "compact" ? "sm" : "lg";
  return cn(
    buttonVariants({ variant: "secondary", size }),
    "pointer-events-none shadow-sm transition-opacity duration-200",
    pillSize === "compact" && "max-w-[min(100%,11rem)] px-2.5 text-xs",
    "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
  );
}

function ReadMoreOnNotionLabel({ pillSize }: Pick<SophisticationReadMoreOverlayProps, "pillSize">) {
  return <span className={readMorePillClassName(pillSize)}>Read More on Notion</span>;
}

export function SophisticationReadMoreOverlay({
  notionHref,
  pillSize = "comfortable",
  className,
}: SophisticationReadMoreOverlayProps) {
  const trimmed = notionHref.trim();
  const hasHref = trimmed.length > 0;
  const rootClass = cn(overlayClassName, className);

  if (hasHref) {
    return (
      <a
        href={trimmed}
        target="_blank"
        rel="noopener noreferrer"
        className={rootClass}
        aria-label="Read More on Notion — opens in a new tab"
      >
        <ReadMoreOnNotionLabel pillSize={pillSize} />
      </a>
    );
  }

  return (
    <button type="button" className={rootClass} aria-label="Read More on Notion — link not set yet">
      <ReadMoreOnNotionLabel pillSize={pillSize} />
    </button>
  );
}
