import type { ReactNode } from "react";
import Band, { SECTION_GAP } from "@/app/components/band";

type Props = {
  outcomes: ReactNode, // the Outcomes section
  challenges: ReactNode, // the Challenges section
};

// Outcomes and Challenges side by side from lg up: Outcomes in a narrow first column, so the results
// are read first and end near where the longer Challenges do. Below lg they stack, Outcomes first
export default function ResultsAndChallenges({ outcomes, challenges }: Props) {
  return (
    <Band className={SECTION_GAP}>
      <div className="grid gap-x-12 gap-y-18 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {outcomes}
        {challenges}
      </div>
    </Band>
  );
}
