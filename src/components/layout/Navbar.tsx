import Link from "next/link";

import { linkHoverUnderline } from "@/lib/link-styles";
import { siteConfig } from "@/lib/metadata";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-6 px-6 py-2 md:py-2.5">
        <Link
          href="/"
          className={cn(
            linkHoverUnderline,
            "text-xl font-extrabold tracking-tighter text-primary transition-colors hover:text-primary/90 sm:text-2xl md:text-3xl",
          )}
        >
          {siteConfig.author}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                linkHoverUnderline,
                "text-sm font-prominent-copy text-foreground-muted transition-colors hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
