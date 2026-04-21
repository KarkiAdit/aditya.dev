import * as React from "react";
import { BookOpen, Home, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Lucide strokes — light orange idle; current route uses slightly darker orange. */
const navLucideIconClass = (active: boolean) =>
  cn(
    "relative z-[1] size-[1.5rem] max-lg:size-[1.125rem] shrink-0 transition-[color,stroke]",
    active
      ? "text-nav-rail-active-icon stroke-nav-rail-active-icon group-hover:text-nav-rail-active-icon-hover group-hover:stroke-nav-rail-active-icon-hover"
      : "text-nav-rail-icon-muted stroke-nav-rail-icon-muted group-hover:text-nav-rail-icon-hover group-hover:stroke-nav-rail-icon-hover",
  );

/** Glassmorphic app-icon shell — see `.nav-rail-glass-tile` in `globals.css`. */
const tileShellClass = (active: boolean) =>
  cn(
    "nav-rail-glass-tile pointer-events-auto group mx-auto flex aspect-square size-11 max-lg:size-9 max-w-full shrink-0 items-center justify-center outline-none",
    active && "nav-rail-glass-tile--active",
    "active:scale-[0.97]",
  );

const navRailNavClass = cn(
  "flex flex-col items-center overflow-y-auto overscroll-contain py-1.5",
);

/** Single wrapper — frosted stack card (CSS); rail column aside stays transparent / click-through. */
const navRailIconGroupClass = cn(
  "nav-rail-icon-group-surface pointer-events-none flex w-fit flex-col items-center gap-2.5 rounded-2xl p-2.5 max-lg:gap-2 max-lg:rounded-xl max-lg:p-2",
);

type RailEntry = { href: string; label: string; icon: LucideIcon };

const RAIL_ENTRIES: readonly RailEntry[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "About", icon: UserRound },
  { href: "/thoughts", label: "My Thoughts", icon: BookOpen },
];

function isActiveNavPath(pathname: string, href: string): boolean {
  const path = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (href.includes("#")) {
    const pathPart = href.split("#")[0];
    const norm = pathPart === "" || pathPart === "/" ? "/" : pathPart;
    return norm === "/" && (path === "" || path === "/");
  }
  if (href === "/") return path === "" || path === "/";
  return path === href || path.startsWith(`${href}/`);
}

/** Destinations other than the current route — rail only shows where you can go next. */
function railEntriesExcludingCurrent(pathname: string): readonly RailEntry[] {
  return RAIL_ENTRIES.filter((entry) => !isActiveNavPath(pathname, entry.href));
}

const NavLucideTile = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    className?: string;
    style?: React.CSSProperties;
  }
>(function NavLucideTile({ href, label, active, icon: Icon, className, style }, ref) {
  return (
    <a
      ref={ref}
      href={href}
      style={style}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(tileShellClass(active), className)}
    >
      <Icon className={navLucideIconClass(active)} strokeWidth={2} aria-hidden />
      <span className="sr-only">{label}</span>
    </a>
  );
});

function NavRailLink({
  entry,
  pathname,
  className,
  style,
}: {
  entry: RailEntry;
  pathname: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const active = isActiveNavPath(pathname, entry.href);
  return (
    <NavLucideTile
      href={entry.href}
      label={entry.label}
      active={active}
      icon={entry.icon}
      className={className}
      style={style}
    />
  );
}

export type NavbarVariant = "overlay" | "static";

type NavbarProps = {
  className?: string;
  /** Kept for layout API (`BaseLayout`); rail is tile-only — no full-column wash. */
  variant?: NavbarVariant;
  /** Current path for active nav styling (e.g. `Astro.url.pathname`). */
  pathname?: string;
};

export function Navbar({ className, pathname = "" }: NavbarProps) {
  const railEntries = railEntriesExcludingCurrent(pathname);

  return (
    <aside
      className={cn(
        "pointer-events-none fixed bottom-[max(15%,env(safe-area-inset-bottom,0px))] left-0 top-auto z-50 flex w-[var(--sidebar-width)] flex-col items-stretch max-lg:z-[70]",
        className,
      )}
      aria-label="Site"
    >
      <div className="pointer-events-none flex w-full flex-col px-2 pb-0 pt-0 max-lg:px-1.5">
        <nav className={cn(navRailNavClass, "pointer-events-none")} aria-label="Main">
          <div className={navRailIconGroupClass}>
            {railEntries.map((entry) => (
              <NavRailLink key={entry.href} entry={entry} pathname={pathname} />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
