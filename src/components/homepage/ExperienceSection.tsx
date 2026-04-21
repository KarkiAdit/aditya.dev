"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Cloud, ExternalLink, Globe2, MapPinned } from "lucide-react";
import {
  CAREER_CREAM_BG,
  CAREER_CREAM_BG_MUTED,
  CAREER_CREAM_INK,
  CAREER_ROAD_CARD_SHADOW_ACTIVE,
  CAREER_ROAD_CARD_SHADOW_IDLE,
  CAREER_ROAD_STOPS,
  CAREER_ROAD_TEAL,
  CAREER_ROAD_TEAL_BORDER_MUTED,
  careerCreamControlStyle,
  careerCreamControlSurface,
  type CareerPillIconId,
  type CareerStop,
} from "@/lib/career-roadmap";
import {
  DEMO_GITHUB_DASHBOARD_DATA,
  type GithubDashboardData,
  type GithubDashboardResult,
} from "@/lib/github-dashboard";
import { githubDashboardRepoCardPanelClassName } from "@/lib/github-dashboard-card";
import {
  formatRepoByteLabel,
  getGithubDashboardLanguageBarSegmentClass,
} from "@/lib/github-repo-language-colors";
import { homepageOverlaySpringTransition } from "@/lib/homepage/homepage-motion";
import {
  githubDashboardLegendTypography,
  heroIntroLeadMutedClauseCompactTypography,
  featuredIntroParagraphTypography,
  featuredNicheBestPicksLeadTypography,
} from "@/lib/link-styles";
import {
  experienceStackSectionTitleClassName,
  githubDashboardSectionHeadingClassName,
  pageStackSectionInnerTopPaddingClass,
  pageStackSectionIntroToBodySpacingClass,
  pageStackSnapshotHeadingTailPaddingClass,
  pageStackSnapshotHeadingToLanguagesGapClass,
  pageStackSnapshotIntroLeadToDashboardClass,
} from "@/lib/site-page-layout";
import { siteChromeGutters, siteChromeInner, siteChromeInnerFullWidth } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

export type ExperienceSectionProps = {
  result: GithubDashboardResult;
  avatarSrc: string;
  className?: string;
};

export type ExperienceRoadmapSectionProps = {
  className?: string;
};

export type LiveSnapshotSectionProps = {
  result: GithubDashboardResult;
  avatarSrc: string;
  className?: string;
  layout?: "page" | "embedded";
  heading?: string;
  /** Optional dek below the heading (e.g. projects page). */
  introLead?: string;
  /** If set and contained in `introLead`, that substring is wrapped in `<b>`. */
  introBoldSubstring?: string;
  /**
   * When false, only the heading + optional intro render (e.g. `/projects` inserts Best picks
   * before `LiveSnapshotGithubDashboard`).
   */
  showGithubDashboard?: boolean;
};

export type LiveSnapshotGithubDashboardProps = {
  result: GithubDashboardResult;
  avatarSrc: string;
  className?: string;
  /**
   * When true, adds top margin so the language row clears a preceding `h2` (use false when an intro
   * paragraph already provides separation).
   */
  gapAfterHeading?: boolean;
  /** When true, drops extra bottom padding on the chart shell (e.g. `/projects` live-snapshot tab). */
  trimBottomSpacing?: boolean;
  leftAlignLanguagesTypography?: boolean;
};

function JourneyBegunIntroLead({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0 w-full pt-1 text-left", className)}>
      <p
        className={cn(
          featuredNicheBestPicksLeadTypography,
          "mt-4 box-border max-w-none text-pretty font-extrabold tracking-tight text-foreground/85",
          "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
          "w-full min-w-0 self-stretch",
        )}
      >
        The journey has just begun. I am a <b>3x Google intern</b>, now stepping into a full-time role.
      </p>
    </div>
  );
}

function LiveSnapshotIntroLeadParagraph({
  text,
  boldSubstring,
  className,
}: {
  text: string;
  boldSubstring?: string;
  className: string;
}) {
  const phrase = boldSubstring?.trim();
  if (!phrase || !text.includes(phrase)) {
    return <p className={className}>{text}</p>;
  }
  const idx = text.indexOf(phrase);
  const before = text.slice(0, idx);
  const after = text.slice(idx + phrase.length);
  return (
    <p className={className}>
      {before}
      <b>{phrase}</b>
      {after}
    </p>
  );
}

function CareerRoadCarSvg({ className, suffix }: { className?: string; suffix: string }) {
  const id = `career-car-${suffix}`;
  return (
    <svg className={className} viewBox="0 0 220 100" width="220" height="100" aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.72 0.1 50)" />
          <stop offset="45%" stopColor="oklch(0.62 0.14 44)" />
          <stop offset="100%" stopColor="oklch(0.52 0.13 36)" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.9 0.04 55 / 0.95)" />
          <stop offset="100%" stopColor="oklch(0.72 0.08 48 / 0.75)" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.88 0.03 52)" />
          <stop offset="100%" stopColor="oklch(0.62 0.04 48)" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="82" rx="88" ry="5" fill="oklch(0.42 0.06 48 / 0.14)" />
      <path
        fill={`url(#${id}-body)`}
        stroke="oklch(0.45 0.08 42 / 0.35)"
        strokeWidth="1"
        d="M 38 76 L 38 58 Q 38 48 52 44 L 112 38 Q 132 26 156 32 L 188 46 Q 196 52 198 62 L 200 72 L 200 76 L 176 76 Q 174 62 160 62 Q 146 62 144 76 L 76 76 Q 74 62 60 62 Q 46 62 44 76 Z"
      />
      <path
        fill={`url(#${id}-glass)`}
        stroke="oklch(0.5 0.06 50 / 0.25)"
        strokeWidth="0.75"
        d="M 120 40 L 158 33 Q 172 35 184 48 L 192 56 Q 174 42 152 40 L 120 41 Z"
      />
      <path fill="oklch(0.55 0.1 40 / 0.2)" d="M 54 52 L 112 45 L 116 52 L 56 58 Z" />
      <path
        stroke="oklch(0.92 0.05 55 / 0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        d="M 46 61 L 104 54"
      />
      <circle cx="60" cy="76" r="13" fill="oklch(0.32 0.03 48)" />
      <circle cx="60" cy="76" r="8" fill={`url(#${id}-rim)`} stroke="oklch(0.4 0.04 46 / 0.5)" strokeWidth="0.75" />
      <circle cx="60" cy="76" r="3" fill="oklch(0.35 0.03 50 / 0.6)" />
      <circle cx="160" cy="76" r="13" fill="oklch(0.32 0.03 48)" />
      <circle cx="160" cy="76" r="8" fill={`url(#${id}-rim)`} stroke="oklch(0.4 0.04 46 / 0.5)" strokeWidth="0.75" />
      <circle cx="160" cy="76" r="3" fill="oklch(0.35 0.03 50 / 0.6)" />
      <ellipse cx="194" cy="54" rx="5" ry="3.5" fill="oklch(0.93 0.08 55 / 0.85)" />
      <path fill="oklch(0.48 0.12 38 / 0.35)" d="M 36 63 Q 32 68 36 73 L 40 73 Q 42 68 40 63 Z" />
    </svg>
  );
}

const CAREER_ROAD_BAND_PCT = 46;

const careerRoadMarkerBadge =
  "max-w-[min(9.5rem,46vw)] text-balance text-center text-[0.55rem] font-bold leading-tight tracking-tight sm:max-w-[10.5rem] sm:text-[0.58rem]";

const experienceRoadPrimaryPillBadge =
  "inline-flex min-w-0 max-w-full items-center justify-center gap-1.5 rounded-full border border-transparent bg-primary px-3 py-1.5 text-center font-semibold text-primary-foreground shadow-none sm:gap-2 sm:px-3.5 sm:py-2";

const experienceRoadMutedPillBadge =
  "inline-flex items-center justify-center rounded-full border border-primary/35 bg-primary/12 px-2.5 py-1 text-center text-[0.6rem] font-semibold text-primary sm:px-3 sm:py-1.5 sm:text-xs";

function CareerPillIcon({ pillIcon, className }: { pillIcon: CareerPillIconId; className?: string }) {
  const iconClass = cn("size-3.5 shrink-0 opacity-95 sm:size-4", className);
  switch (pillIcon) {
    case "google-cloud":
      return <Cloud className={iconClass} strokeWidth={2.25} aria-hidden />;
    case "google-play":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M9 6v12l9-6-9-6z" />
        </svg>
      );
    case "google-maps":
      return <MapPinned className={iconClass} strokeWidth={2.25} aria-hidden />;
    case "google-geo":
      return <Globe2 className={iconClass} strokeWidth={2.25} aria-hidden />;
    default: {
      const _exhaustive: never = pillIcon;
      return _exhaustive;
    }
  }
}

function CareerRoadmapElement() {
  const band = CAREER_ROAD_BAND_PCT;
  const mountainBottom = `${band + 6}%`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.78_0.1_42)] via-[oklch(0.88_0.06_50)] to-[oklch(0.96_0.03_55)]" />
      <div className="career-shimmer absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_108%,oklch(0.86_0.08_48_/_0.32)_0%,transparent_58%)]" />
      <div
        className="career-sun-pulse absolute right-[12%] top-[8%] size-[4.25rem] rounded-full bg-primary/35 blur-[0.5px]"
        style={{
          boxShadow: "0 0 48px oklch(0.72 0.12 42 / 0.35), 0 0 80px oklch(0.82 0.08 50 / 0.2)",
        }}
      />
      <div className="career-cloud-a absolute left-[4%] top-[14%] h-5 w-28 rounded-full bg-card/55 blur-md" />
      <div className="career-cloud-b absolute right-[22%] top-[18%] h-5 w-32 rounded-full bg-card/45 blur-lg" />
      <div
        className="career-cloud-a absolute left-[36%] top-[10%] h-4 w-20 rounded-full bg-card/40 blur-sm"
        style={{ animationDelay: "-5s" }}
      />

      <svg
        className="absolute left-0 w-full text-foreground/35"
        style={{ bottom: mountainBottom, height: "26%" }}
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,100 L0,52 L48,28 L92,58 L128,22 L168,62 L210,30 L252,58 L288,24 L332,55 L368,32 L400,48 L400,100 Z"
        />
      </svg>
      <svg
        className="absolute left-0 w-full text-foreground/45"
        style={{ bottom: `${band + 4}%`, height: "18%" }}
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,80 L0,38 L55,18 L95,48 L140,12 L188,52 L238,20 L285,50 L330,16 L380,45 L400,32 L400,80 Z" />
      </svg>

      <div className="absolute bottom-0 left-0 right-0" style={{ height: `${band}%` }}>
        <div
          className="relative h-full w-full border-t-[3px] border-border/50"
          style={{
            background: "linear-gradient(180deg, oklch(0.48 0.04 48) 0%, oklch(0.34 0.035 50) 72%, oklch(0.3 0.03 52) 100%)",
            boxShadow:
              "inset 0 3px 0 oklch(0.55 0.04 50 / 0.2), inset 0 -12px 28px oklch(0.22 0.03 48 / 0.32)",
          }}
        >
          <div className="absolute left-[4%] right-[4%] top-[22%] h-px bg-primary-foreground/35" />
          <div className="absolute left-[4%] right-[4%] bottom-[26%] h-px bg-primary-foreground/35" />
          <div
            className="absolute left-[5%] right-[5%] top-1/2 h-[3px] -translate-y-1/2"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                oklch(0.97 0.02 55 / 0.88) 0 20px,
                transparent 20px 40px
              )`,
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function CareerRegulatorySign({
  stop,
  active,
  rootClassName,
  alwaysShowBodyOnNarrow,
}: {
  stop: CareerStop;
  active: boolean;
  rootClassName?: string;
  alwaysShowBodyOnNarrow?: boolean;
}) {
  const bodyText = stop.description ?? stop.role;

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 basis-0 flex-col items-center transition-transform duration-300",
        active && "motion-reduce:transform-none sm:-translate-y-0.5",
        rootClassName,
      )}
    >
      <div
        className={cn(
          "w-full min-h-[7.5rem] rounded-2xl border-2 bg-card/92 backdrop-blur-[3px] ring-1 ring-inset ring-white/12 sm:min-h-[8.5rem]",
          active ? "px-3 py-3 sm:px-4 sm:py-4" : "px-2 py-3 opacity-[0.9] sm:px-3 sm:py-4",
        )}
        style={
          active
            ? {
                borderColor: CAREER_ROAD_TEAL,
                boxShadow: CAREER_ROAD_CARD_SHADOW_ACTIVE,
              }
            : {
                borderColor: CAREER_ROAD_TEAL_BORDER_MUTED,
                boxShadow: CAREER_ROAD_CARD_SHADOW_IDLE,
              }
        }
      >
        {active ? (
          <div className="w-full break-words text-left selection:bg-[oklch(0.9_0.04_228_/_0.45)]">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <span className={cn(experienceRoadPrimaryPillBadge, "text-balance text-xs normal-case leading-snug sm:text-sm")}>
                <CareerPillIcon pillIcon={stop.pillIcon} />
                <span className="min-w-0 max-w-full break-words text-balance line-clamp-2">{stop.marker}</span>
              </span>
              <span className={cn(experienceRoadMutedPillBadge, "uppercase tracking-wide")}>{stop.kind}</span>
            </div>
            {bodyText ? (
              <p
                className={cn(
                  alwaysShowBodyOnNarrow && active
                    ? "mt-3 block text-pretty text-balance line-clamp-2"
                    : "mt-3 hidden text-pretty text-balance sm:mt-3 sm:block sm:line-clamp-2",
                  heroIntroLeadMutedClauseCompactTypography,
                  "text-xs sm:text-sm md:text-base",
                )}
              >
                {bodyText}
              </p>
            ) : null}
            {stop.href ? (
              <a
                href={stop.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-bold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-90"
                style={{ color: CAREER_ROAD_TEAL }}
                onClick={(e) => e.stopPropagation()}
              >
                Link
                <ExternalLink className="size-3 opacity-80" aria-hidden />
              </a>
            ) : null}
          </div>
        ) : (
          <div
            className={cn(
              "flex min-h-[5rem] flex-col items-center justify-center py-2 sm:min-h-[5.5rem]",
              heroIntroLeadMutedClauseCompactTypography,
              "text-center",
            )}
          >
            <span className={cn(experienceRoadPrimaryPillBadge, "max-w-[11rem] text-balance text-xs normal-case sm:text-sm")}>
              <CareerPillIcon pillIcon={stop.pillIcon} />
              <span className="min-w-0 max-w-full break-words text-balance line-clamp-2">{stop.marker}</span>
            </span>
          </div>
        )}
      </div>
      <div
        className="h-8 w-1.5 shrink-0 rounded-full shadow-sm ring-1 ring-inset ring-white/15 sm:h-10"
        style={{
          background: `linear-gradient(180deg, ${CAREER_ROAD_TEAL} 0%, oklch(0.45 0.08 228 / 0.55) 100%)`,
        }}
        aria-hidden
      />
    </div>
  );
}

function CareerRoadmapInteractiveSceneElement() {
  const stops = CAREER_ROAD_STOPS;
  const n = stops.length;
  const [stopIdx, setStopIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  const carLeftPct = useMemo(() => {
    if (n <= 1) return 50;
    return ((stopIdx + 0.5) / n) * 100;
  }, [n, stopIdx]);

  const goNext = useCallback(() => {
    if (n === 0) return;
    setStopIdx((i) => (i + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    if (n === 0) return;
    setStopIdx((i) => (i - 1 + n) % n);
  }, [n]);

  if (n === 0) {
    return null;
  }

  const current: CareerStop = stops[Math.min(stopIdx, n - 1)]!;

  const onRoadContextMenu = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      goNext();
    },
    [goNext],
  );

  const onRoadKeyDown = useCallback(
    (e: { key: string; preventDefault: () => void }) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <div
      id="career-roadmap-interactive-scene"
      className="relative mt-0 pb-4 sm:pb-8 md:pb-12 lg:pb-14"
      aria-label="Interactive career roadmap"
    >
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 md:justify-end md:gap-3">
          <p className="min-w-0 flex-1 text-left text-xs font-semibold text-foreground-muted md:hidden">
            Swipe left or right
          </p>
          <p className="hidden shrink-0 text-xs font-semibold text-foreground-muted md:block">
            Click Right or Left
          </p>
          <button
            type="button"
            onClick={goNext}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 px-4 text-xs font-semibold",
              careerCreamControlSurface,
            )}
            style={careerCreamControlStyle as CSSProperties}
          >
            Next stop
            <ChevronRight className="size-3.5 shrink-0 opacity-80" aria-hidden />
          </button>
        </div>

        <div
          role="application"
          tabIndex={0}
          aria-label={`Career road, left to right. ${current.marker}: ${current.role} at ${current.company}. On small screens, swipe the card left or right to change stop. Right-click the road or use Next stop. Arrow keys move between stops.`}
          onContextMenu={onRoadContextMenu}
          onKeyDown={onRoadKeyDown}
          className={cn(
            "relative isolate min-h-[22rem] cursor-context-menu select-none overflow-hidden rounded-xl bg-transparent outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[27rem]",
          )}
        >
          <CareerRoadmapElement />
          <p className="sr-only" aria-live="polite">
            {`${current.marker}: ${current.role} at ${current.company}. ${current.timeline}.`}
          </p>

          <div className="absolute inset-0 z-20 flex flex-col">
            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              <div className="flex min-h-0 flex-1 flex-col px-2 pb-0 pt-4 md:hidden">
                <motion.div
                  key={stopIdx}
                  className="mx-auto w-full max-w-lg cursor-grab touch-pan-y pb-1 active:cursor-grabbing"
                  drag={reduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.78}
                  onDragEnd={(_, info) => {
                    if (reduceMotion) return;
                    const thresholdPx = 56;
                    const v = info.velocity.x;
                    if (info.offset.x < -thresholdPx || v < -380) {
                      goNext();
                    } else if (info.offset.x > thresholdPx || v > 380) {
                      goPrev();
                    }
                  }}
                  initial={reduceMotion ? false : { opacity: 0.92, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={homepageOverlaySpringTransition}
                >
                  <CareerRegulatorySign
                    stop={stops[Math.min(stopIdx, n - 1)]!}
                    active
                    alwaysShowBodyOnNarrow
                    rootClassName="w-full max-w-lg flex-none basis-auto"
                  />
                </motion.div>
              </div>

              <div className="hidden min-h-0 flex-1 flex-row items-end justify-around gap-2 px-2 pb-0 pt-4 sm:gap-4 sm:px-6 sm:pt-5 md:flex">
                {stops.map((s, i) => (
                  <CareerRegulatorySign key={s.marker} stop={s} active={i === stopIdx} />
                ))}
              </div>
            </div>

            <div className="relative w-full shrink-0" style={{ height: `${CAREER_ROAD_BAND_PCT}%` }}>
              <div className="absolute inset-x-0 top-1 z-10 hidden justify-around px-4 sm:px-8 md:flex" aria-hidden>
                {stops.map((s, i) => (
                  <div key={`post-${s.marker}`} className="flex min-w-0 max-w-[24%] flex-col items-center sm:max-w-[22%]">
                    <span
                      className={cn(
                        careerRoadMarkerBadge,
                        "rounded-full border-0 px-2 py-1 shadow-none sm:px-2.5 sm:py-1.5",
                      )}
                      style={{
                        backgroundColor: i === stopIdx ? CAREER_CREAM_BG : CAREER_CREAM_BG_MUTED,
                        color: CAREER_CREAM_INK,
                      }}
                    >
                      {s.marker}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 top-1 z-10 flex justify-center px-4 md:hidden" aria-hidden>
                <span
                  className={cn(careerRoadMarkerBadge, "rounded-full border-0 px-3 py-1.5 shadow-none")}
                  style={{ backgroundColor: CAREER_CREAM_BG, color: CAREER_CREAM_INK }}
                >
                  {stops[Math.min(stopIdx, n - 1)]!.marker}
                </span>
              </div>

              <div
                className="absolute bottom-2 z-10 w-[min(9.5rem,30vw)] max-w-[9.5rem] -translate-x-1/2 transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:bottom-3"
                style={{ left: `${carLeftPct}%` }}
                aria-hidden
              >
                <CareerRoadCarSvg
                  className="w-full -scale-x-100 drop-shadow-[0_10px_20px_oklch(0.25_0.05_48_/_0.45)]"
                  suffix="track"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** GitHub mark (this lucide version has no `Github` icon) — `currentColor` for link hover. */
function GitHubProfileMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Compact profile chip — same creamy card surface as GitHub repo tiles (`githubDashboardRepoCardPanel`). */
function GitHubProfileChartOverlay({ data, avatarSrc }: { data: GithubDashboardData; avatarSrc: string }) {
  const displayName = data.user.name ?? data.user.login;
  return (
    <div
      className={cn(
        githubDashboardRepoCardPanelClassName,
        "inline-flex w-fit max-w-[min(100%,30rem)] min-h-0 flex-row items-center gap-3.5 px-3.5 py-3 sm:gap-4 sm:px-4 sm:py-3.5 md:gap-4 md:px-5 md:py-4",
        "transition-[box-shadow,background-color,border-color,ring-color]",
        "hover:border-secondary/50 hover:bg-card/98 hover:ring-secondary/28 hover:shadow-md",
      )}
    >
      <div className="size-16 shrink-0 overflow-hidden rounded-full border border-secondary/40 bg-secondary/35 sm:size-20">
        <img
          src={avatarSrc}
          alt=""
          className="size-full object-cover object-[center_18%]"
          width={256}
          height={256}
          loading="lazy"
          decoding="async"
        />
      </div>
      <a
        href={data.user.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${displayName} on GitHub (opens in new tab)`}
        className={cn(
          "group/profile-link inline-flex min-w-0 max-w-[14rem] flex-1 items-center gap-2 sm:max-w-[16rem] md:max-w-[18rem]",
          "text-foreground/90 transition-colors hover:text-heading",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <span
          className={cn(
            "min-w-0 truncate text-left",
            githubDashboardLegendTypography,
            "text-base sm:text-lg md:text-xl",
          )}
        >
          {displayName}
        </span>
        <GitHubProfileMark className="size-[1.125rem] shrink-0 opacity-85 transition-opacity group-hover/profile-link:opacity-100 sm:size-5" />
      </a>
    </div>
  );
}

function formatGithubLanguageShareAxisTick(value: number): string {
  if (value <= 0) return "0%";
  if (value >= 10) return `${Math.round(value)}%`;
  return `${value.toFixed(1)}%`;
}

function GithubLanguageBarAxisDisplayName({ name }: { name: string }) {
  if (name === "TypeScript") {
    return (
      <>
        <span className="sm:hidden">TypeSc</span>
        <span className="hidden sm:inline">{name}</span>
      </>
    );
  }
  return <>{name}</>;
}

function GitHubLanguagesBar({
  data,
  trimBottomSpacing = false,
  leftAlignLanguagesTypography = false,
}: {
  data: GithubDashboardData;
  trimBottomSpacing?: boolean;
  leftAlignLanguagesTypography?: boolean;
}) {
  const totalBytes = useMemo(
    () => data.languageUsage.reduce((s, u) => s + u.bytes, 0),
    [data.languageUsage],
  );

  const barSegments = useMemo(() => {
    if (totalBytes <= 0) return [];
    const cap = 10;
    return data.languageUsage.slice(0, cap).map((u) => ({
      ...u,
      pct: (u.bytes / totalBytes) * 100,
    }));
  }, [data.languageUsage, totalBytes]);

  /** Plot scale is 0–100% of total bytes; each bar height matches that language's actual share. */
  const yAxisMaxPct = 100;
  const yMidShare = 50;

  if (barSegments.length === 0) return null;

  const columnTemplate = `repeat(${barSegments.length}, minmax(0, 1fr))`;

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-2xl border border-primary/20 bg-card/70 text-foreground shadow-sm ring-1 ring-inset ring-secondary/35 backdrop-blur-xl",
        trimBottomSpacing
          ? "pt-4 pb-0 sm:pt-5 sm:pb-0"
          : "py-4 sm:py-5",
      )}
      role="group"
      aria-label={`Languages in selected repositories. Each bar height is that language's share of total bytes (0 to 100 percent).`}
    >
      <div className="grid w-full min-w-0 grid-cols-[minmax(3rem,3.75rem)_1fr] grid-rows-[auto_auto] gap-x-2 gap-y-0 sm:gap-x-3">
        <div
          className="row-start-1 flex min-h-[45vh] flex-col justify-between self-stretch pt-1 pr-1.5 text-right text-xs font-medium tabular-nums leading-none text-heading sm:pr-2 sm:text-sm md:text-base"
          aria-hidden="true"
        >
          <span>{formatGithubLanguageShareAxisTick(yAxisMaxPct)}</span>
          <span>{formatGithubLanguageShareAxisTick(yMidShare)}</span>
          <span>0%</span>
        </div>
        <div className="row-start-1 flex min-h-[45vh] min-w-0 flex-col border-b-2 border-l-2 border-heading/45 pl-2 sm:pl-2.5">
          <div
            className="grid min-h-[45vh] w-full flex-1 gap-1.5 sm:gap-2 md:gap-3"
            style={{ gridTemplateColumns: columnTemplate }}
          >
            {barSegments.map((u, i) => (
              <div
                key={u.name}
                className="group/langbar flex h-full min-h-0 min-w-0 flex-col justify-end self-stretch rounded-none"
                title={`${u.name} — ${formatRepoByteLabel(u.bytes)} bytes (${u.pct.toFixed(1)}%)`}
              >
                <div className="mx-auto flex h-full min-h-0 w-full max-w-[3.75rem] flex-col justify-end sm:max-w-[4.25rem]">
                  <div
                    className={cn(
                      "w-full shrink-0 rounded-none shadow-sm ring-1 ring-inset ring-primary/15 transition-[filter,transform] duration-200",
                      "group-hover/langbar:brightness-105",
                      getGithubDashboardLanguageBarSegmentClass(i),
                    )}
                    style={{ height: `${u.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row-start-2 col-start-1" aria-hidden="true" />

        <div className="row-start-2 min-w-0 pt-2">
          <div className="grid w-full gap-1.5 sm:gap-2" style={{ gridTemplateColumns: columnTemplate }}>
            {barSegments.map((u) => (
              <div
                key={`${u.name}-label`}
                className={cn(
                  "flex min-w-0 flex-col gap-1 px-0.5",
                  leftAlignLanguagesTypography
                    ? "items-start text-left"
                    : "items-center text-center",
                )}
              >
                <span className="line-clamp-2 w-full max-w-[6rem] text-sm font-semibold leading-snug tracking-tight text-heading sm:max-w-none sm:text-base md:text-lg">
                  <GithubLanguageBarAxisDisplayName name={u.name} />
                </span>
                <span className="text-sm tabular-nums text-foreground/85 sm:text-base md:text-[1.05rem]">
                  {u.pct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <p
            className={cn(
              "mt-3 pb-2 text-sm font-semibold tracking-wide text-foreground/70 sm:pb-2.5 sm:text-base md:pb-3 md:text-lg",
              leftAlignLanguagesTypography ? "text-left" : "text-center",
            )}
          >
            languages used
          </p>
        </div>
      </div>
    </div>
  );
}

function GitHubProfileAndRepositoriesBlock({
  data,
  avatarSrc,
  gapAfterHeading = true,
  trimBottomSpacing = false,
  leftAlignLanguagesTypography = false,
}: {
  data: GithubDashboardData;
  avatarSrc: string;
  gapAfterHeading?: boolean;
  trimBottomSpacing?: boolean;
  leftAlignLanguagesTypography?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-8 sm:gap-10",
        gapAfterHeading ? pageStackSnapshotHeadingToLanguagesGapClass : undefined,
      )}
    >
      <div className="relative min-w-0 w-full">
        <div className="pointer-events-none absolute right-[10%] top-[10%] z-20">
          <div className="pointer-events-auto">
            <GitHubProfileChartOverlay data={data} avatarSrc={avatarSrc} />
          </div>
        </div>
        <div
          className={cn(
            "min-w-0 px-0 pt-2",
            trimBottomSpacing ? "pb-0" : "pb-2 sm:pb-3",
          )}
        >
          <GitHubLanguagesBar
            data={data}
            trimBottomSpacing={trimBottomSpacing}
            leftAlignLanguagesTypography={leftAlignLanguagesTypography}
          />
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection({ result, avatarSrc, className }: ExperienceSectionProps) {
  const isDemo = !result.ok;
  const displayData: GithubDashboardData = isDemo ? DEMO_GITHUB_DASHBOARD_DATA : result.data;

  return (
    <div
      role="region"
      className={cn("w-full scroll-mt-8 bg-transparent", className)}
      aria-labelledby="works-heading"
    >
      <div className={cn(siteChromeGutters)}>
        <div className={cn(siteChromeInner, "py-0", pageStackSectionInnerTopPaddingClass)}>
          <div
            className={cn(
              "flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
              pageStackSectionIntroToBodySpacingClass,
            )}
          >
            <div className="flex min-w-0 w-full flex-1 flex-col items-stretch">
              <h2 id="works-heading" className={experienceStackSectionTitleClassName}>
                Experience
              </h2>
              <JourneyBegunIntroLead />
            </div>
            {isDemo ? (
              <span className="shrink-0 rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-foreground-muted">
                Sample data
              </span>
            ) : null}
          </div>

          <CareerRoadmapInteractiveSceneElement />
          <h2 className={githubDashboardSectionHeadingClassName}>
            A live snapshot of my latest work.
          </h2>

          <GitHubProfileAndRepositoriesBlock data={displayData} avatarSrc={avatarSrc} gapAfterHeading />
        </div>
      </div>
    </div>
  );
}

export function ExperienceRoadmapSection({ className }: ExperienceRoadmapSectionProps) {
  return (
    <div
      role="region"
      className={cn("w-full scroll-mt-8 bg-transparent", className)}
      aria-label="Experience roadmap"
    >
      <div className={cn(siteChromeGutters)}>
        <div className={cn(siteChromeInnerFullWidth, "py-0", pageStackSectionInnerTopPaddingClass)}>
          <div
            className={cn(
              "flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
              pageStackSectionIntroToBodySpacingClass,
            )}
          >
            <div className="flex min-w-0 w-full flex-1 flex-col items-stretch">
              <h2 className={experienceStackSectionTitleClassName}>Experience</h2>
              <JourneyBegunIntroLead />
            </div>
          </div>
          <CareerRoadmapInteractiveSceneElement />
        </div>
      </div>
    </div>
  );
}

export function LiveSnapshotGithubDashboard({
  result,
  avatarSrc,
  className,
  gapAfterHeading = true,
  trimBottomSpacing = false,
  leftAlignLanguagesTypography = false,
}: LiveSnapshotGithubDashboardProps) {
  const isDemo = !result.ok;
  const displayData: GithubDashboardData = isDemo ? DEMO_GITHUB_DASHBOARD_DATA : result.data;

  return (
    <div
      role="region"
      aria-label="GitHub profile and repositories"
      className={cn("w-full scroll-mt-8 bg-transparent", className)}
    >
      <GitHubProfileAndRepositoriesBlock
        data={displayData}
        avatarSrc={avatarSrc}
        gapAfterHeading={gapAfterHeading}
        trimBottomSpacing={trimBottomSpacing}
        leftAlignLanguagesTypography={leftAlignLanguagesTypography}
      />
    </div>
  );
}

export function LiveSnapshotSection({
  result,
  avatarSrc,
  className,
  layout = "page",
  heading = "A live snapshot of my latest work.",
  introLead,
  introBoldSubstring,
  showGithubDashboard = true,
}: LiveSnapshotSectionProps) {
  const hasIntroLead = Boolean(introLead?.trim());

  const inner = (
    <>
      <h2
        className={cn(
          githubDashboardSectionHeadingClassName,
          !showGithubDashboard && !hasIntroLead ? pageStackSnapshotHeadingTailPaddingClass : undefined,
        )}
      >
        {heading}
      </h2>
      {hasIntroLead && introLead ? (
        <LiveSnapshotIntroLeadParagraph
          text={introLead}
          boldSubstring={introBoldSubstring}
          className={cn(
            featuredIntroParagraphTypography,
            "mt-4 text-pretty",
            showGithubDashboard ? pageStackSnapshotIntroLeadToDashboardClass : "mb-0",
          )}
        />
      ) : null}

      {showGithubDashboard ? (
        <LiveSnapshotGithubDashboard
          result={result}
          avatarSrc={avatarSrc}
          gapAfterHeading={!hasIntroLead}
        />
      ) : null}
    </>
  );

  return (
    <div
      role="region"
      className={cn("w-full scroll-mt-8 bg-transparent", className)}
      aria-label={heading.trim() || "Live snapshot"}
    >
      {layout === "embedded" ? (
        inner
      ) : (
        <div className={cn(siteChromeGutters)}>
          <div className={cn(siteChromeInner, "py-0", pageStackSectionInnerTopPaddingClass)}>
            {inner}
          </div>
        </div>
      )}
    </div>
  );
}
