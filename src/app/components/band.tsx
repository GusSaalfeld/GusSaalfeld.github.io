import type { ReactNode } from "react";

// A full-width strip of paper holding the page's centred column. Pages are stacked from these,
// rather than set on one paper panel, so something between them (the name's .slime-letters) can
// reach the slime behind the page. A band's own padding spaces it from the next, in multiples of
// 24px; className sets it
export default function Band({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-quiet-paper px-6 md:px-12 ${className}`}>
      <div className="column">{children}</div>
    </div>
  );
}

// The space after a section, the same on every page: 48px, 72px from md up, and 48px on short
// screens so the first project's thumbnail shows on a laptop
export const SECTION_GAP = "pb-12 md:pb-18 short:pb-12 md:short:pb-12";
// The space above a page's first band: 24px on short screens
export const PAGE_TOP = "pt-12 md:pt-18 short:pt-6 md:short:pt-6";
