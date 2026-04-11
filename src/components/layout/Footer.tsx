import Link from "next/link";

import { SocialPlatformIcon } from "@/components/icons/social-platform-icons";
import { linkHoverUnderline } from "@/lib/link-styles";
import { siteConfig } from "@/lib/metadata";
import { footerLegal, mainNav, socialProfiles } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const firstName = siteConfig.author.split(" ")[0] ?? siteConfig.author;

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  const visibleSocial = socialProfiles.filter(
    (profile): profile is (typeof profile & { href: string }) => Boolean(profile.href),
  );

  return (
    <footer
      className={cn(
        "mt-auto w-full bg-transparent",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-6 py-3 md:py-3.5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <p className="max-w-md text-pretty text-sm font-prominent-copy leading-relaxed text-foreground-muted">
            <span className="font-byline-name text-primary">{siteConfig.author}</span>
            {` is a ${siteConfig.rolesLine}.`}
          </p>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  linkHoverUnderline,
                  "text-sm font-prominent-copy text-foreground-muted transition-colors hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className={cn(
            "mt-2.5 overflow-x-auto py-1 md:mt-3",
            "text-xs text-foreground-muted",
          )}
        >
          {visibleSocial.length > 0 ? (
            <div className="grid w-full min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6">
              <div className="flex min-w-0 flex-col gap-1.5 justify-self-start">
                <span className="font-semibold uppercase tracking-widest">
                  {`Follow ${firstName}:`}
                </span>
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {visibleSocial.map((profile) => (
                    <li key={profile.id}>
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={profile.title}
                        aria-label={profile.title}
                        className={cn(
                          linkHoverUnderline,
                          "inline-flex items-center text-foreground-muted transition-colors hover:text-primary",
                        )}
                      >
                        <SocialPlatformIcon id={profile.id} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="justify-self-center whitespace-nowrap text-center">
                {`© ${year} ${siteConfig.author}`}
              </p>

              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-end gap-x-5 justify-self-end sm:gap-x-6"
              >
                {footerLegal.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      linkHoverUnderline,
                      "font-semibold uppercase tracking-wider transition-colors hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : (
            <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <p className="whitespace-nowrap">{`© ${year} ${siteConfig.author}`}</p>
              <nav aria-label="Legal" className="flex items-center gap-x-5 sm:gap-x-6">
                {footerLegal.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      linkHoverUnderline,
                      "font-semibold uppercase tracking-wider transition-colors hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
