"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavBarProps = {
  children?: ReactNode
};

const NavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" }, // the sign-off at the bottom of every page
];

// Whether a link is the page you're on. The bare address is the portfolio, and a project's page
// counts as the portfolio. Contact is a place on every page, never a page of its own
function isCurrent(href: string, pathname: string) {
  if (href === "/portfolio") return pathname === "/" || pathname.startsWith("/portfolio");
  return href.startsWith("/") && pathname.startsWith(href);
}

export default function NavBar({ children}: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  // Contact jumps to the sign-off at the bottom of the page; on a page that leaves it off (the 404
  // page), it goes to the portfolio's instead
  const toContact = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!document.querySelector("[data-no-contact]")) return;
    e.preventDefault();
    router.push("/#contact");
  };

  // Plain paper, ruled off below, its contents lined up with the page's column. Four one-word
  // links fit on a phone, so they're always in view: beside the name from md up, under it below
  return (
    <div className="sticky top-0 z-50 px-6 md:px-12 bg-quiet-paper border-b border-quiet-rule font-sans text-quiet-ink">
      {/* 72px tall from md up, 56px on short screens to leave room for the work */}
      <div className="column flex flex-col gap-y-2 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6 md:short:py-4">
        {children && <div className="min-w-0 truncate">{children}</div>}

        {/* The page you're on is in ink and underlined, and announced as the current page */}
        <nav aria-label="Site" className="flex flex-wrap gap-x-5 gap-y-1 md:gap-x-6">
          {NavLinks.map((link) => {
            const current = isCurrent(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === "#contact" ? toContact : undefined}
                aria-current={current ? "page" : undefined}
                className={`underline-offset-4 hover:text-quiet-link hover:underline ${
                  current ? "text-quiet-ink underline decoration-1" : "text-quiet-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
