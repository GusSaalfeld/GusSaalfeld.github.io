import type { ReactNode } from "react";

type DownloadLinkProps = {
  href: string,        // a file in public/
  children: ReactNode, // the label: say what downloads, and its format
  primary?: boolean,   // filled slime green; otherwise outlined
};

// A link that downloads a file, styled as a button: at least 48px tall for touch, with a
// download arrow so it's clear it saves a file rather than opening a page
export default function DownloadLink({ href, children, primary }: DownloadLinkProps) {
  // One rule for every button on hover: the green turns to ink. Outlined ones stay outlined, so
  // they never look like the filled one
  const look = primary
    ? "bg-quiet-link text-quiet-paper hover:bg-quiet-ink"
    : "border border-quiet-link text-quiet-link hover:border-quiet-ink hover:text-quiet-ink";
  return (
    <a
      href={href}
      download
      className={`inline-flex min-h-12 items-center gap-2 px-5 font-sans text-base font-semibold sm:whitespace-nowrap ${look}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
      </svg>
      {children}
    </a>
  );
}
