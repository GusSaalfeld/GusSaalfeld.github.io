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

  // A panel-coloured bar edged like the frame, all in the pixel face.
  // Like an 80s game, nothing fades: the selection bar jumps
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-8 py-3 bg-slime border-b-4 border-frame shadow-[0_4px_0_0_var(--rpg-frame-edge)] font-pixel text-xl text-parchment">
      {children && <div className="flex items-baseline gap-4 min-w-0">{children}</div>}

      {/* Desktop links */}
      <nav className="hidden md:flex gap-1">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 hover:bg-gold hover:text-slime"
          >
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
        className={`md:hidden shrink-0 p-2 border-4 border-frame ${menuOpen ? "bg-gold text-slime" : "bg-slime text-parchment"}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
          {menuOpen ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute left-0 right-0 top-full mt-1 flex flex-col p-1 bg-slime border-y-4 border-frame"
        >
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 hover:bg-gold hover:text-slime"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
