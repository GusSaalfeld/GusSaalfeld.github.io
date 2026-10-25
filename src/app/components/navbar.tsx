"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

type NavBarProps = {
  children?: ReactNode
};

const NavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/work-experience", label: "Work Experience" },
  { href: "/about", label: "About Me" },
];

export default function NavBar({ children}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clear over the background at the top of the page, solid once scrolled or while the menu is open
  const solid = scrolled || menuOpen;

  return (
    <div
      className={`sticky top-0 z-50 flex items-center justify-between gap-4 border-b-2 px-8 py-4 font-mono text-white font-bold transition-colors duration-300 ${
        solid
          ? "bg-[var(--win-accent)] border-[var(--win-dark)]"
          : "bg-transparent border-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.8)]"
      }`}
    >
      {children && <div>{children}</div>}

      {/* Desktop links, highlighted like a 90s menu on hover */}
      <nav className="hidden md:flex gap-2">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1 text-white hover:bg-white hover:text-[var(--win-accent)] hover:[text-shadow:none]"
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
        className={`md:hidden shrink-0 p-1 bg-white text-[var(--win-accent)] ${menuOpen ? "win-sunken" : "win-raised"}`}
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
          className="md:hidden win-raised absolute left-0 right-0 top-full flex flex-col p-[3px] bg-white [text-shadow:none]"
        >
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-black hover:bg-[var(--win-accent)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
