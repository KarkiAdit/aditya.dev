import { cn } from "@/lib/utils";

/**
 * Decorative layered waves above the hero canvas wash and below the card + portrait.
 * Muted blue-grey fills the lower area; pointer-events none.
 */
export function HeroEclipseOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[2] overflow-hidden", className)}
      aria-hidden
    >
      <svg
        className="h-full w-full min-h-0 min-w-0"
        viewBox="0 0 1200 675"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
      </svg>
    </div>
  );
}
