type PublicSocialKey =
  | "PUBLIC_SOCIAL_X"
  | "PUBLIC_SOCIAL_LINKEDIN"
  | "PUBLIC_SOCIAL_MEDIUM";

function readPublicEnv(key: PublicSocialKey): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export const mainNav = [
  { href: "/thoughts", label: "My Thoughts", shortLabel: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/", label: "Home" },
] as const satisfies ReadonlyArray<{
  readonly href: string;
  readonly label: string;
  readonly shortLabel?: string;
}>;

export const footerLegal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

function normalizePathname(pathname: string): string {
  const trimmed =
    pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return trimmed || "/";
}

/**
 * Fixed left rail (glass tiles): shown on main site sections only.
 * Hidden on legal pages and individual long-form posts so reading/legal layouts stay full-width.
 */
export function shouldShowSiteNav(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === "/privacy-policy" || path === "/terms") return false;
  if (path.startsWith("/thoughts/")) return false;
  if (path.startsWith("/blogs/")) return false;
  return true;
}

const socialDefaults = {
  x: "X",
  linkedin: "L",
  medium: "M",
} as const;

export const socialProfiles = [
  {
    id: "x",
    label: "X",
    title: "X",
    href: readPublicEnv("PUBLIC_SOCIAL_X") ?? socialDefaults.x,
  },
  {
    id: "linkedin",
    label: "in",
    title: "LinkedIn",
    href: readPublicEnv("PUBLIC_SOCIAL_LINKEDIN") ?? socialDefaults.linkedin,
  },
  {
    id: "medium",
    label: "Medium",
    title: "Medium",
    href: readPublicEnv("PUBLIC_SOCIAL_MEDIUM") ?? socialDefaults.medium,
  },
] as const;
