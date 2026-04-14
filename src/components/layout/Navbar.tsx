import { headerMainNavLinkAppearance, linkHoverUnderline } from "@/lib/link-styles";
import { mainNav } from "@/lib/navigation";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

const mainNavShell =
  "glass-lit flex flex-wrap items-center justify-start gap-x-2 gap-y-1 rounded-2xl px-2 py-1 sm:gap-x-4 sm:px-3 sm:py-1.5 md:gap-x-6 md:px-4 md:py-2";

export type NavbarVariant = "overlay" | "static";

export function Navbar({
  className,
  variant = "static",
}: {
  className?: string;
  variant?: NavbarVariant;
}) {
  return (
    <header
      className={cn(
        "z-50 w-full bg-transparent",
        variant === "overlay" ? "absolute left-0 right-0 top-0" : "relative",
        className,
      )}
    >
      <div className={siteChromeGutters}>
        <div
          className={cn(
            siteChromeInner,
            "flex min-h-[var(--navbar-height)] items-center justify-start py-2 md:py-2.5",
          )}
        >
          <nav aria-label="Main" className={mainNavShell}>
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(linkHoverUnderline, headerMainNavLinkAppearance)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
