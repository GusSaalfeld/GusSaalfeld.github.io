"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type NavBarProps = {
  children?: ReactNode
};

const NavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/work-experience", label: "Work experience" },
  { href: "/about", label: "About me" },
];

export default function NavBar({ children}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // The bench, a little see-through, ruled off from the page below
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-12 py-4 bg-lab-bench/90 backdrop-blur-sm border-b border-lab-line text-lab-ink">
      {children && <div className="min-w-0 truncate">{children}</div>}

      {/* Desktop links */}
      <nav className="hidden md:flex gap-6">
        {NavLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-lab-graphite hover:text-lab-marker">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden shrink-0 p-2 -m-2 hover:text-lab-marker"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {menuOpen ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute left-0 right-0 top-full flex flex-col px-3 py-2 bg-lab-bench border-b border-lab-line"
        >
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 rounded-md hover:bg-lab-paper hover:text-lab-marker"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
