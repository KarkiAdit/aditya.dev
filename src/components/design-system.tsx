import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type SwatchItem = {
  label: string;
  hint: string;
  swatch: string;
  swatchExtra?: string;
};

const coreSwatches: readonly SwatchItem[] = [
  {
    label: "background",
    hint: "Canvas / base wash",
    swatch: "bg-background",
    swatchExtra: "border border-border",
  },
  {
    label: "foreground",
    hint: "Primary text",
    swatch: "bg-foreground",
  },
  {
    label: "foreground-muted",
    hint: "Supporting copy",
    swatch: "bg-foreground-muted",
  },
  {
    label: "heading",
    hint: "Display & titles",
    swatch: "bg-heading",
  },
];

const surfaceSwatches: readonly SwatchItem[] = [
  {
    label: "card",
    hint: "Raised panels",
    swatch: "bg-card",
    swatchExtra: "border border-border/60",
  },
  {
    label: "card-subtle",
    hint: "Soft fill",
    swatch: "bg-card-subtle",
    swatchExtra: "border border-border/40",
  },
  {
    label: "card-foreground",
    hint: "Text on cards",
    swatch: "bg-card-foreground",
  },
];

const interactiveSwatches: readonly SwatchItem[] = [
  {
    label: "primary",
    hint: "Actions & links",
    swatch: "bg-primary",
  },
  {
    label: "primary-foreground",
    hint: "On primary",
    swatch: "bg-primary-foreground",
    swatchExtra: "border border-border/50",
  },
  {
    label: "border",
    hint: "Hairlines & dividers",
    swatch: "bg-border",
    swatchExtra: "min-h-14 border border-foreground/10",
  },
  {
    label: "ring",
    hint: "Focus affordance",
    swatch: "bg-ring",
    swatchExtra: "min-h-14",
  },
];

const radiusSteps = [
  { label: "radius-sm", className: "rounded-sm" },
  { label: "radius-md", className: "rounded-md" },
  { label: "radius-lg", className: "rounded-lg" },
  { label: "radius-xl", className: "rounded-xl" },
] as const;

function HomeHero() {
  return (
    <section className="flex w-full flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
        {siteConfig.author}
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-lg font-prominent-copy leading-relaxed text-foreground-muted md:text-xl">
        {siteConfig.rolesLine}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="rounded-full px-8">
          Learn more
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full text-foreground hover:bg-card-subtle"
        >
          {`Get in touch >`}
        </Button>
      </div>
      <article className="glass-lit mt-14 w-full max-w-lg rounded-xl px-8 py-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-card-foreground">Design System Check</h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground-muted md:text-base">
          Frosted white glass on a soft gradient canvas. Light bleeds through the blur — clean, airy,
          Apple-inspired.
        </p>
        <Button variant="link" className="mt-5 h-auto p-0 text-foreground">
          {`View details >`}
        </Button>
      </article>
    </section>
  );
}

function SwatchGrid({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly SwatchItem[];
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-heading">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-foreground-muted">{description}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="glass-frame flex flex-col gap-3 p-4 text-left shadow-sm"
          >
            <div
              className={cn("h-20 w-full shadow-inner", item.swatch, item.swatchExtra)}
              aria-hidden
            />
            <div>
              <p className="font-mono text-xs font-medium text-card-foreground">{item.label}</p>
              <p className="mt-0.5 text-xs text-foreground-muted">{item.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DesignSystemPreview() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16 md:py-24">
      <HomeHero />

      <header className="space-y-4 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-widest text-foreground-muted">
          Design system preview
        </p>
        <h2 className="heading-gradient max-w-3xl text-balance text-4xl font-extrabold tracking-tighter md:text-5xl">
          Generic color tokens on <span className="text-heading">{siteConfig.name}</span>
        </h2>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground-muted">
          Every swatch below uses semantic Tailwind classes wired through{" "}
          <span className="font-mono text-sm text-card-foreground">src/styles/theme.css</span>{" "}
          so you can tune the palette once and see it propagate.
        </p>
      </header>

      <SwatchGrid
        title="Core"
        description="Background and type ramps that anchor the whole interface."
        items={coreSwatches}
      />

      <SwatchGrid
        title="Surfaces"
        description="Depth for cards and layered UI without leaving the token set."
        items={surfaceSwatches}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-heading">Glass utilities</h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
            From globals: frosted panels that sit on the warm canvas without hard rectangles.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-frame p-6">
            <p className="font-medium text-card-foreground">glass-frame</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Lighter blur, subtle rim light — good for wrapping content sections.
            </p>
          </div>
          <div className="glass-lit rounded-lg p-6">
            <p className="font-medium text-card-foreground">glass-lit</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Slightly stronger blur and lift for hero cards or featured blocks.
            </p>
          </div>
        </div>
      </section>

      <SwatchGrid
        title="Interactive & chrome"
        description="Primary fills, focus rings, and borders that stay in sync with the core ramp."
        items={interactiveSwatches}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-heading">Radius scale</h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
            Mapped from theme tokens — resize the viewport to see how corners stay consistent.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {radiusSteps.map((step) => (
            <div
              key={step.label}
              className={cn(
                "flex flex-col justify-between border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm",
                step.className,
              )}
            >
              <div className={cn("h-16 bg-primary/85", step.className)} />
              <p className="mt-4 font-mono text-xs font-medium text-card-foreground">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-heading">Buttons</h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
            Shadcn primitives using the same primary and border tokens.
          </p>
        </div>
        <div className="glass-lit flex flex-wrap items-center gap-3 rounded-lg p-6">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link style</Button>
        </div>
      </section>

      <footer className="border-t border-border pt-8 text-center text-sm text-foreground-muted md:text-left">
        <p>
          Swap values in <span className="font-mono text-card-foreground">:root</span> — this page
          is only here to visualize the contract.
        </p>
      </footer>
    </main>
  );
}
