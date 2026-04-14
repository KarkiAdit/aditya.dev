/** Unified teal-blue for experience road UI (card frame, pole, links). */
export const CAREER_ROAD_TEAL = "oklch(0.48 0.1 228)";
export const CAREER_ROAD_TEAL_SOFT = "oklch(0.9 0.038 228 / 0.52)";
export const CAREER_ROAD_TEAL_BORDER_MUTED = "oklch(0.48 0.1 228 / 0.38)";

/** Layered shadows so regulatory cards read slightly above the scenic backdrop. */
export const CAREER_ROAD_CARD_SHADOW_IDLE =
  "0 14px 38px -6px oklch(0.26 0.045 48 / 0.34), 0 8px 22px oklch(0.36 0.035 50 / 0.2), 0 2px 8px oklch(0.32 0.03 49 / 0.22), inset 0 1px 0 oklch(1 0.02 58 / 0.22)";

export const CAREER_ROAD_CARD_SHADOW_ACTIVE = `0 24px 58px -8px ${CAREER_ROAD_TEAL_SOFT}, 0 14px 34px -6px oklch(0.3 0.09 228 / 0.34), 0 5px 14px oklch(0.34 0.05 50 / 0.24), inset 0 1px 0 oklch(1 0.02 58 / 0.26)`;

/** Tao-style cream capsules (~#E8E0D8 / #4A403A): labels + Next stop. */
export const CAREER_CREAM_BG = "#E8E0D8";
export const CAREER_CREAM_BG_MUTED = "#DDD5CC";
/** Hover / pressed surface for cream controls (Next stop). */
export const CAREER_CREAM_BG_HOVER = "#D4CCC2";
export const CAREER_CREAM_INK = "#4A403A";

/** CSS variables for `careerCreamControlSurface*` pills (GitHub profile, Next stop, memory-lane disabled CTA). */
export const careerCreamControlStyle = {
  "--career-cream-bg": CAREER_CREAM_BG,
  "--career-cream-hover": CAREER_CREAM_BG_HOVER,
  "--career-cream-ink": CAREER_CREAM_INK,
} as const;

/** Shared Tao cream capsule: same shell as the GitHub profile link (border + fill + shadow). */
export const careerCreamControlSurfaceBase =
  "rounded-full border border-foreground/15 bg-[var(--career-cream-bg)] text-[var(--career-cream-ink)] shadow-sm";

export const careerCreamControlSurfaceInteractive =
  "transition-colors hover:border-foreground/22 hover:bg-[var(--career-cream-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A403A]/30 focus-visible:ring-offset-2";

/** Full interactive pill (base + hover / focus). */
export const careerCreamControlSurface = `${careerCreamControlSurfaceBase} ${careerCreamControlSurfaceInteractive}`;

/** Same pill as GitHub profile, visually quieted for disabled / unavailable. */
export const careerCreamControlSurfaceDisabled = `${careerCreamControlSurfaceBase} cursor-not-allowed opacity-[0.88] saturate-[0.88] outline-none focus-visible:ring-2 focus-visible:ring-[#4A403A]/22 focus-visible:ring-offset-2`;

/** Which glyph to show inside the primary (red) marker pill on the sign card. */
export type CareerPillIconId = "google-cloud" | "google-play" | "google-maps" | "google-geo";

/** Stops on the career road. Shown in the Experience / interactive roadmap on the homepage. */
export type CareerStop = {
  /** Short label on signs and road markers (e.g. product, year). */
  marker: string;
  /** Icon beside the marker in the primary pill (Google product / GEO). */
  pillIcon: CareerPillIconId;
  /** Organization or team name */
  company: string;
  kind: "Internship" | "Full-time";
  /** Job title or position name */
  role: string;
  /** Dates, duration, location, work arrangement, etc. (for screen readers / future use) */
  timeline: string;
  /** Optional narrative; shown clamped in the UI */
  description?: string;
  href?: string;
};

export const CAREER_ROAD_STOPS: readonly CareerStop[] = [
  {
    marker: "Google Cloud, 2023",
    pillIcon: "google-cloud",
    company: "Google",
    kind: "Internship",
    role: "Software Engineering Intern",
    timeline: "May 2023 – Aug 2023 · 4 mos · Manhattan, NY · Hybrid",
    description:
      "Enhanced a key web product for the Google Cloud Alerting Team. Integrated two reusable filters into the alerting policy JSON with comprehensive UI testing. Skills: Angular, TypeScript, and related web stack.",
  },
  {
    marker: "Play Store, 2024",
    pillIcon: "google-play",
    company: "Google",
    kind: "Internship",
    role: "Software Engineering Intern",
    timeline: "May 2024 – Aug 2024 · 4 mos · Austin, TX · Hybrid",
    description:
      "Developed and delivered two production-ready projects using Java for the Play Store’s stream publishing platform, impacting a live play stream with over 1.5 billion users. Used Python with the Gemini API for a class-based prompt engineering prototype for internal testing automation. Skills: Backend/Platforms, Java, and related stack.",
  },
  {
    marker: "Google Maps, 2025",
    pillIcon: "google-maps",
    company: "Google",
    kind: "Internship",
    role: "Software Engineering Intern",
    timeline: "May 2025 – Aug 2025 · 4 mos · San Francisco, CA · Hybrid",
    description:
      "Spearheaded UI/UX enhancements for Google Maps Mobile, writing 1,500+ lines of native iOS code for the saved page. Partnered with design and product on strategy, bug fixes, and a reusable component for the iOS Maps org. Skills: iOS Development, Mobile Applications, and related stack.",
  },
  {
    marker: "GEO, 2026",
    pillIcon: "google-geo",
    company: "GEO",
    kind: "Full-time",
    role: "Software Engineer / Full Stack",
    timeline: "Jun 8, 2025 – present",
  },
];
