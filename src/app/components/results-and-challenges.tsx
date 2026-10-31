"use client";

import { useState, type ReactNode } from "react";
import Band, { SECTION_GAP } from "@/app/components/band";

type Props = {
  outcomes: ReactNode, // the Outcomes section
  challenges: ReactNode, // the Challenges section
};

// TRIAL: Outcomes and Challenges one after the other, or side by side, with a button to switch.
// Side by side, from lg up, Outcomes takes a narrow first column, so it's read first and ends near
// where the longer Challenges do; below lg they stack either way. Once one is chosen, keep it and
// remove the other, the state, and the button
export default function ResultsAndChallenges({ outcomes, challenges }: Props) {
  const [sideBySide, setSideBySide] = useState(false);

  return (
    <>
      {sideBySide ? (
        <Band className={SECTION_GAP}>
          <div className="grid gap-x-12 gap-y-16 lg:grid-cols-[18rem_minmax(0,1fr)]">
            {outcomes}
            {challenges}
          </div>
        </Band>
      ) : (
        <>
          <Band className={SECTION_GAP}>{outcomes}</Band>
          <Band className={SECTION_GAP}>{challenges}</Band>
        </>
      )}

      {/* The switch, pinned to the screen's corner while the trial lasts */}
      <button
        type="button"
        onClick={() => setSideBySide(!sideBySide)}
        className="fixed bottom-6 right-6 z-50 flex min-h-12 items-center gap-3 whitespace-nowrap border border-quiet-ink bg-quiet-paper px-5 font-sans text-base font-semibold text-quiet-ink shadow-sm hover:bg-quiet-ink hover:text-quiet-paper"
      >
        <span>{sideBySide ? "After: side by side" : "Before: one after the other"}</span>
        <span className="text-quiet-link">Show {sideBySide ? "before" : "after"}</span>
      </button>
    </>
  );
}
