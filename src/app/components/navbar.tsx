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

  // A menu bar in the window face colour. Like Windows 98, nothing fades: states swap instantly
  return (
    <div className="win-raised sticky top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-8 py-2 bg-face font-mono font-bold text-ink">
      {children && <div className="truncate">{children}</div>}

      {/* Desktop links, highlighted like a 90s menu on hover */}
      <nav className="hidden md:flex gap-1">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1 hover:bg-slime hover:text-white"
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
        className={`md:hidden shrink-0 p-2 bg-face ${menuOpen ? "win-sunken" : "win-raised"}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden>
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
          className="md:hidden win-raised absolute left-0 right-0 top-full flex flex-col p-[3px] bg-face"
        >
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 hover:bg-slime hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
