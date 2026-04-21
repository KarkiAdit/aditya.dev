import * as React from "react";

import { cn } from "@/lib/utils";

const controlClass = cn(
  "border-0 bg-transparent p-0 font-sans font-medium text-[#6b6b6b] underline-offset-4 transition-colors",
  "cursor-pointer hover:text-[#242424] hover:underline",
  "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#242424]/25",
);

/**
 * Browser back with `/thoughts` fallback when there is no prior history entry (e.g. opened in a new tab).
 */
export function ThoughtPostBackLink() {
  const onClick = React.useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.assign("/thoughts");
  }, []);

  return (
    <button type="button" onClick={onClick} className={controlClass} aria-label="Back to previous page">
      Back <span aria-hidden="true">&gt;</span>
    </button>
  );
}
