import { cn } from "@/lib/utils";

export type HeroEclipseOverlayVariant = "hero" | "bottom-mirrored";

export type HeroEclipseOverlayProps = {
  className?: string;
  variant?: HeroEclipseOverlayVariant;
};

const eclipsePaths = (
  <>
    <path
      className="fill-[oklch(0.62_0.06_255_/_0.5)]"
      d="M0,675 L0,520 C140,480 280,540 420,500 C560,460 700,420 840,440 C980,460 1100,400 1200,410 L1200,675 Z"
    />
    <path
      className="fill-[oklch(0.55_0.09_255_/_0.68)]"
      d="M0,675 L0,560 C160,500 320,560 480,520 C640,480 800,430 960,450 C1040,460 1120,430 1200,438 L1200,675 Z"
    />
    <path
      className="fill-[oklch(0.5_0.1_255_/_0.78)]"
      d="M0,675 L0,600 C200,540 400,600 600,560 C780,525 960,470 1200,485 L1200,675 Z"
    />
  </>
);

export function HeroEclipseOverlay({
  className,
  variant = "hero",
}: HeroEclipseOverlayProps) {
  const isBottomMirrored = variant === "bottom-mirrored";

  return (
    <div
      className={cn(
        "pointer-events-none overflow-hidden",
        isBottomMirrored
          ? "absolute bottom-0 left-0 right-0 z-0 h-[min(40vh,26rem)] min-h-[12rem]"
          : "absolute inset-0 z-[2]",
        className,
      )}
      aria-hidden
    >
      <svg
        className="h-full w-full min-h-0 min-w-0"
        viewBox="0 0 1200 675"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isBottomMirrored ? (
          <g transform="translate(1200 0) scale(-1 1)">{eclipsePaths}</g>
        ) : (
          eclipsePaths
        )}
      </svg>
    </div>
  );
}
