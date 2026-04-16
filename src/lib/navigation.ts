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
