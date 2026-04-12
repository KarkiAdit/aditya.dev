import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const overlayClassName = cn(
  "absolute inset-0 z-[3] flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none transition-colors duration-200",
  "group-hover:bg-black/55 group-active:bg-black/65",
  "focus-visible:bg-black/50 focus-visible:ring-2 focus-visible:ring-ring",
);

const readMorePillClassName = cn(
  buttonVariants({ variant: "secondary", size: "lg" }),
  "pointer-events-none shadow-sm transition-opacity duration-200",
  "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
);

function ReadMoreOnNotionLabel() {
  return <span className={readMorePillClassName}>Read More on Notion</span>;
}

export function SophisticationReadMoreOverlay({ notionHref }: { notionHref: string }) {
  const trimmed = notionHref.trim();
  const hasHref = trimmed.length > 0;

  if (hasHref) {
    return (
      <a
        href={trimmed}
        target="_blank"
        rel="noopener noreferrer"
        className={overlayClassName}
        aria-label="Read More on Notion — opens in a new tab"
      >
        <ReadMoreOnNotionLabel />
      </a>
    );
  }

  return (
    <button type="button" className={overlayClassName} aria-label="Read More on Notion — link not set yet">
      <ReadMoreOnNotionLabel />
    </button>
  );
}
