"use client";

import { useState } from "react";

// A temporary tool for comparing the display font (names, headings, menus). Each click switches
// to the next candidate by setting data-display-font on <html>, which globals.css reads.
// Remove this, and the fonts that lose, once one is chosen
const Fonts = [
  { id: "kode", label: "Kode Mono" },
  { id: "share-tech", label: "Share Tech Mono" },
  { id: "oxanium", label: "Oxanium" },
  { id: "tektur", label: "Tektur" },
  { id: "b612", label: "B612 Mono" },
  { id: "space", label: "Space Mono" },
];

export default function FontToggle() {
  const [index, setIndex] = useState(0);

  const next = () => {
    const nextIndex = (index + 1) % Fonts.length;
    setIndex(nextIndex);
    document.documentElement.dataset.displayFont = Fonts[nextIndex].id;
  };

  // In the display font itself, so the button shows off the current choice
  return (
    <button
      type="button"
      onClick={next}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-slime border-4 border-frame shadow-[0_0_0_4px_#000] font-pixel text-lg text-parchment hover:bg-gold hover:text-slime"
    >
      Font: {Fonts[index].label}
    </button>
  );
}
