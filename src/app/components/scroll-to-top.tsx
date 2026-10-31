"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Opens every new page at its top. Next scrolls a new page's content into view instead, which
// leaves the banner and the page's title above the screen when the window is short. Only a change
// of page counts: the Contact link changes the address's #, not its path, so it still glides there
export default function ScrollToTop() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return; // a link to a place on the new page: let it go there
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
