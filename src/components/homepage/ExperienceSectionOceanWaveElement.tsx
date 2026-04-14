import { cn } from "@/lib/utils";

type WavePoint = { x: number; y: number };

function catmullRomToCubicChain(points: readonly WavePoint[]): string {
  const n = points.length;
  if (n < 2) return "";
  const get = (i: number) => points[Math.max(0, Math.min(n - 1, i))];
  let d = "";
  for (let i = 0; i < n - 1; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function sampleSwellPoints(W: number, segments: number, phase: number, yLift: number): WavePoint[] {
  const pts: WavePoint[] = [];
  const baseline = 208;
  const cycles = Math.PI * 2.15;
  for (let k = 0; k <= segments; k++) {
    const x = Math.round(W - (k / segments) * W);
    const s = (W - x) / W;
    const u = s * cycles + phase;

    const primary = Math.sin(u * 0.62 + 0.08);
    const harmonic = 0.32 * Math.sin(u * 1.18 + 1.05);
    const cap = 0.06 * Math.sin(u * 2.4 + 0.5);
    let roll = primary + harmonic + cap;

    const crest = roll > 0 ? roll : 0;
    const trough = roll < 0 ? roll : 0;
    roll = Math.pow(crest, 0.72) + (-Math.pow(-trough, 1.08));

    const envelope = 0.88 + 0.12 * Math.sin(s * Math.PI);
    const amp = 24 * envelope;
    let y = baseline + roll * amp + yLift;
    y = Math.min(272, Math.max(132, y));
    pts.push({ x, y });
  }
  return pts;
}

function oceanWaveClipD(W: number, H: number, pts: readonly WavePoint[]): string {
  const curve = catmullRomToCubicChain(pts);
  return `M${W} ${H} L${W} ${pts[0].y}${curve} L0 ${H} Z`;
}

function oceanWaveCrestStrokeD(pts: readonly WavePoint[]): string {
  if (pts.length < 2) return "";
  return `M${pts[0].x} ${pts[0].y}${catmullRomToCubicChain(pts)}`;
}

export type ExperienceSectionOceanWaveElementProps = {
  idPrefix: string;
  rootClassName: string;
  className?: string;
};

export function ExperienceSectionOceanWaveElement({
  idPrefix,
  rootClassName,
  className,
}: ExperienceSectionOceanWaveElementProps) {
  const W = 1440;
  const H = 420;
  const segments = 88;

  const surfacePts = sampleSwellPoints(W, segments, 0, 0);
  const undertowPts = sampleSwellPoints(W, segments, 0.38, 14);
  const backSwellPts = sampleSwellPoints(W, segments, -0.52, 22);

  const clipPathD = oceanWaveClipD(W, H, surfacePts);
  const undertowD = oceanWaveClipD(W, H, undertowPts);
  const backSwellD = oceanWaveClipD(W, H, backSwellPts);
  const crestD = oceanWaveCrestStrokeD(surfacePts);

  const clipId = `${idPrefix}-wave-clip`;
  const waterGrad = `${idPrefix}-water-column`;
  const foamFilter = `${idPrefix}-foam-soft`;
  const glintGrad = `${idPrefix}-wave-glint`;

  return (
    <div aria-hidden className={cn("relative min-h-0 overflow-hidden", rootClassName, className)}>
      <svg
        className="experience-section-ocean-wave-drift absolute inset-y-0 left-[-6%] block h-full w-[112%] max-w-none"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={clipPathD} />
          </clipPath>
          <linearGradient id={waterGrad} x1="0" y1={H} x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.48 0.06 48 / 0.72)" />
            <stop offset="38%" stopColor="oklch(0.58 0.065 50 / 0.5)" />
            <stop offset="72%" stopColor="oklch(0.72 0.045 52 / 0.45)" />
            <stop offset="100%" stopColor="oklch(0.84 0.028 54 / 0.35)" />
          </linearGradient>
          <linearGradient id={glintGrad} x1="0%" y1="100%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="oklch(0.78 0.06 52 / 0)" />
            <stop offset="42%" stopColor="oklch(0.82 0.05 55 / 0.22)" />
            <stop offset="100%" stopColor="oklch(0.74 0.07 48 / 0)" />
          </linearGradient>
          <filter id={foamFilter} x="-8%" y="-25%" width="116%" height="150%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" />
          </filter>
        </defs>

        <path d={backSwellD} fill="oklch(0.5 0.055 46 / 0.2)" />
        <path d={undertowD} fill="oklch(0.56 0.07 49 / 0.16)" />

        <g clipPath={`url(#${clipId})`}>
          <rect width={W} height={H} fill={`url(#${waterGrad})`} />
          <rect width={W} height={H} fill={`url(#${glintGrad})`} />
        </g>

        <path
          d={crestD}
          fill="none"
          stroke="oklch(0.94 0.02 58 / 0.42)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${foamFilter})`}
          opacity={0.85}
        />
        <path
          d={crestD}
          fill="none"
          stroke="oklch(0.97 0.012 60 / 0.55)"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="nonScalingStroke"
        />
      </svg>
    </div>
  );
}
