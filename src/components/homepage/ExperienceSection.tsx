"use client";

import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Cloud, ExternalLink, GitCommit, Globe2, MapPinned, Search, Star } from "lucide-react";
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
  type GithubDashboardRepo,
  type GithubDashboardResult,
} from "@/lib/github-dashboard";
import { ExperienceSectionOceanWaveElement } from "@/components/homepage/ExperienceSectionOceanWaveElement";
import { formatRepoByteLabel, getRepoLanguageColor } from "@/lib/github-repo-language-colors";
import {
  heroIntroLeadMutedClauseCompactTypography,
  heroIntroLeadMutedClauseProfileTypography,
} from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

function ExperienceSectionWave() {
  const rootClassName = cn(
    "pointer-events-none relative z-0 h-full min-h-0 w-full overflow-hidden",
    "origin-bottom scale-y-[-1] translate-y-[var(--experience-wave-shift-y)]",
  );
  return <ExperienceSectionOceanWaveElement idPrefix="experience" rootClassName={rootClassName} />;
}

export type ExperienceSectionProps = {
  result: GithubDashboardResult;
  avatarSrc: string;
  className?: string;
};

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

function CareerRoadmapInteractiveSceneElement({ belowNextStopSlot }: { belowNextStopSlot?: ReactNode }) {
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
      className="relative mt-12 sm:mt-16"
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
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
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

      {belowNextStopSlot !== undefined ? (
        <div
          className={cn(
            "pointer-events-none absolute bottom-8 left-1/2 z-0 w-screen max-w-none -translate-x-1/2 sm:bottom-10",
            "[height:min(220px,30dvh)] min-h-[5rem] md:[height:min(200px,26dvh)] md:min-h-[6rem]",
          )}
          aria-hidden
        >
          {belowNextStopSlot}
        </div>
      ) : null}
    </div>
  );
}

function GitHubProfileElement({ data, avatarSrc }: { data: GithubDashboardData; avatarSrc: string }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)]">
      <div className="aspect-square w-[min(100%,18rem)] overflow-hidden rounded-full ring-2 ring-border/25 ring-offset-2 ring-offset-transparent sm:w-[min(100%,20rem)] md:w-[min(100%,22rem)] lg:w-full lg:max-w-[22rem]">
        <img
          src={avatarSrc}
          alt=""
          className="size-full object-cover object-[center_18%]"
          width={352}
          height={352}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex max-w-sm flex-col items-center gap-4">
        <p className={cn("text-balance", heroIntroLeadMutedClauseProfileTypography)}>
          {data.user.name ?? data.user.login}
        </p>
        <a
          href={data.user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-10 w-full max-w-xs items-center justify-center gap-2 px-5 text-sm font-semibold",
            careerCreamControlSurface,
          )}
          style={careerCreamControlStyle as CSSProperties}
        >
          GitHub profile
          <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden />
        </a>
      </div>
    </div>
  );
}

function GitHubDashboardElement({ data }: { data: GithubDashboardData }) {
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const totalBytes = useMemo(
    () => data.languageUsage.reduce((s, u) => s + u.bytes, 0),
    [data.languageUsage],
  );

  const filteredRepos = useMemo(() => {
    let list: GithubDashboardRepo[] = [...data.repos];

    if (languageFilter) {
      list = list.filter((r) => {
        const langs = data.repoLanguages[String(r.id)];
        return langs !== undefined && langs[languageFilter] !== undefined && langs[languageFilter] > 0;
      });
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false) ||
          r.topics.some((t) => t.toLowerCase().includes(q)),
      );
    }

    list.sort((a, b) => {
      const dc = b.commitCount - a.commitCount;
      if (dc !== 0) return dc;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return list;
  }, [data.repos, data.repoLanguages, languageFilter, query]);

  const barSegments = useMemo(() => {
    if (totalBytes <= 0) return [];
    const cap = 10;
    return data.languageUsage.slice(0, cap).map((u) => ({
      ...u,
      pct: (u.bytes / totalBytes) * 100,
    }));
  }, [data.languageUsage, totalBytes]);

  return (
    <div className="flex min-w-0 flex-col gap-6">
        <div
          role="group"
          aria-label="Languages in selected repositories. Click a segment to filter the list below."
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">Languages</p>
          <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full ring-1 ring-border/30">
            {barSegments.map((u) => (
              <button
                key={u.name}
                type="button"
                className={cn(
                  "min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "transition-[opacity,filter] duration-200",
                  languageFilter && languageFilter !== u.name ? "opacity-35" : "opacity-100 hover:brightness-110",
                )}
                style={{ width: `${u.pct}%`, backgroundColor: getRepoLanguageColor(u.name) }}
                title={`${u.name} — ${formatRepoByteLabel(u.bytes)} bytes`}
                aria-pressed={languageFilter === u.name}
                onClick={() => setLanguageFilter((cur) => (cur === u.name ? null : u.name))}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.65rem] text-foreground-muted sm:text-xs">
            {barSegments.map((u) => (
              <li key={u.name} className="inline-flex items-center gap-1.5">
                <span className="size-2 shrink-0 rounded-sm" style={{ backgroundColor: getRepoLanguageColor(u.name) }} />
                <span className="text-foreground/90">{u.name}</span>
                <span className="tabular-nums">{((u.bytes / totalBytes) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-w-0">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories…"
            className="h-10 w-full rounded-full border border-border/40 bg-background/60 py-2 pl-10 pr-4 text-sm outline-none ring-offset-transparent placeholder:text-foreground-muted focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search repositories"
          />
        </div>

        <ul className="grid min-w-0 list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-border/30 bg-card/55 p-4 ring-1 ring-inset ring-white/12",
                  "shadow-[0_2px_4px_-1px_oklch(0.32_0.035_48_/_0.09),0_8px_24px_-6px_oklch(0.36_0.04_50_/_0.18)]",
                  "transition-[box-shadow,background-color,border-color]",
                  "hover:border-border/45 hover:bg-card/72",
                  "hover:shadow-[0_4px_8px_-2px_oklch(0.32_0.035_48_/_0.11),0_14px_34px_-8px_oklch(0.38_0.04_50_/_0.22)]",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("min-w-0 truncate", heroIntroLeadMutedClauseCompactTypography)}>{repo.name}</span>
                  <span className="flex shrink-0 flex-col items-end gap-1 text-xs text-foreground-muted">
                    {repo.commitCount > 0 ? (
                      <span className="inline-flex items-center gap-0.5 tabular-nums">
                        <GitCommit className="size-3.5" aria-hidden />
                        {repo.commitCount}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-0.5 tabular-nums">
                      <Star className="size-3.5" aria-hidden />
                      {repo.stars}
                    </span>
                  </span>
                </div>
                {repo.description ? (
                  <p className="mt-2 line-clamp-2 text-xs leading-snug text-foreground/80">{repo.description}</p>
                ) : (
                  <p className="mt-2 text-xs italic text-foreground-muted">No description</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {repo.language ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[0.65rem] font-medium text-white ring-1 ring-black/15",
                        "shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_10px_-2px_rgba(0,0,0,0.32)]",
                      )}
                      style={{ backgroundColor: getRepoLanguageColor(repo.language) }}
                    >
                      {repo.language}
                    </span>
                  ) : null}
                  {repo.topics.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-muted/50 px-2 py-0.5 text-[0.65rem] text-foreground-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>

        {filteredRepos.length === 0 ? (
          <p className="text-center text-sm text-foreground-muted">No repositories match the current filters.</p>
        ) : null}
    </div>
  );
}

export function ExperienceSection({ result, avatarSrc, className }: ExperienceSectionProps) {
  const isDemo = !result.ok;
  const displayData: GithubDashboardData = isDemo ? DEMO_GITHUB_DASHBOARD_DATA : result.data;

  return (
    <section
      className={cn(
        "w-full scroll-mt-[var(--navbar-height)]",
        "[--experience-wave-shift-y:min(0.35rem,0.6dvh)]",
        className,
      )}
      aria-labelledby="works-heading"
    >
      <div className={cn(siteChromeGutters)}>
        <div className={cn(siteChromeInner, "py-0")}>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">Experience</p>
              <h2
                id="works-heading"
                className="heading-gradient mt-2 text-balance text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl"
              >
                And here&apos;s my works
              </h2>
            </div>
            {isDemo ? (
              <span className="shrink-0 rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-foreground-muted">
                Sample data
              </span>
            ) : null}
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-16">
            <GitHubProfileElement data={displayData} avatarSrc={avatarSrc} />
            <GitHubDashboardElement data={displayData} />
          </div>

          <CareerRoadmapInteractiveSceneElement belowNextStopSlot={<ExperienceSectionWave />} />
        </div>
      </div>
    </section>
  );
}
