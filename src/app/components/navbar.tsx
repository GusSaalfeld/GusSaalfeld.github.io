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

  // A black bar edged like the frame. Like an 80s game, nothing fades: the selection bar jumps
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-8 py-3 bg-c64-black border-b-4 border-c64-orange shadow-[0_4px_0_0_var(--c64-brown)] text-[22px] text-c64-white">
      {children && <div className="flex items-baseline gap-4 min-w-0">{children}</div>}

      {/* Desktop links */}
      <nav className="hidden md:flex gap-1">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 hover:bg-c64-cyan hover:text-c64-black"
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
        className={`md:hidden shrink-0 p-2 border-4 border-c64-orange ${menuOpen ? "bg-c64-cyan text-c64-black" : "bg-c64-black text-c64-white"}`}
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
          className="md:hidden absolute left-0 right-0 top-full mt-1 flex flex-col p-1 bg-c64-black border-y-4 border-c64-orange"
        >
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 hover:bg-c64-cyan hover:text-c64-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
