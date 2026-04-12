import type { SVGProps } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export type SocialGlyphProps = SVGProps<SVGSVGElement>;

export function XSocialIcon({ className, ...props }: SocialGlyphProps) {
  return (
    <X aria-hidden className={cn("size-5 shrink-0", className)} strokeWidth={2} {...props} />
  );
}

export function LinkedInGlyph({ className, ...props }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.657-.029-3.784-1.86-3.784-1.86 0-2.144 1.485-2.144 3.038v6.315H9.352V9h3.414v1.561h.05c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export function MediumGlyph({ className, ...props }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <path d="M4.265 5.458v13.084h4.571V5.458H4.265zm6.396 0v13.084h4.571V5.458h-4.571zm6.355 0v13.084h4.571V5.458h-4.571z" />
    </svg>
  );
}

const socialIconById = {
  x: XSocialIcon,
  linkedin: LinkedInGlyph,
  medium: MediumGlyph,
} as const;

export type SocialPlatformId = keyof typeof socialIconById;

export function SocialPlatformIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const Cmp = socialIconById[id as SocialPlatformId];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}
