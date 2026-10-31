"use client";

import { useState } from "react";
import type { Role } from "@/app/types";

type EducationProps = {
  degree: Role,
  courses: Role[],
};

// TRIAL: three layouts for the education section, with a button to switch between them. Each leads
// with the degree, larger and bold, and drops the ruled rows. Once one is chosen, keep it and remove
// the others and the button
const OPTIONS = ["A", "B", "C"] as const;
type Option = (typeof OPTIONS)[number];
const NAMES: Record<Option, string> = {
  A: "Diploma: the degree in the reading serif",
  B: "Side by side: degree left, courses right",
  C: "On the timeline: the work list's date column",
};

const HEADING = "font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink";

export default function Education({ degree, courses }: EducationProps) {
  const [option, setOption] = useState<Option>("A");
  const next = OPTIONS[(OPTIONS.indexOf(option) + 1) % OPTIONS.length];

  return (
    <section>
      <h2 className={`mb-6 ${HEADING}`}>Education</h2>
      {option === "A" && <Diploma degree={degree} courses={courses} />}
      {option === "B" && <SideBySide degree={degree} courses={courses} />}
      {option === "C" && <Timeline degree={degree} courses={courses} />}

      {/* The switch, pinned to the screen's corner while the trial lasts */}
      <button
        type="button"
        onClick={() => setOption(next)}
        className="fixed bottom-6 right-6 z-50 flex min-h-12 whitespace-nowrap items-center gap-3 border border-quiet-ink bg-quiet-paper px-5 font-sans text-base font-semibold text-quiet-ink shadow-sm hover:bg-quiet-ink hover:text-quiet-paper"
      >
        <span>Education option {option} of 3</span>
        <span className="hidden font-normal sm:inline">{NAMES[option]}</span>
        <span className="text-quiet-link">Show {next}</span>
      </button>
    </section>
  );
}

// A: the degree set like the title on a diploma, in the reading serif, large and bold, with the
// school and year under it. The courses follow as plain lines, smaller, under their own label
function Diploma({ degree, courses }: EducationProps) {
  return (
    <div>
      <p className="max-w-[24ch] font-serif text-[2rem] font-bold leading-[1.2] text-quiet-ink text-balance">{degree.title}</p>
      <p className="mt-3 text-2xl leading-[1.4] text-quiet-ink">
        {degree.organization}, {degree.dates}
      </p>
      {degree.points?.map((point) => (
        <p key={point} className="mt-4 max-w-[62ch] text-lg leading-[1.55] text-quiet-muted text-pretty">{point}</p>
      ))}
      <h3 className="mt-12 font-sans text-lg font-semibold text-quiet-ink">Since then</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {courses.map((course) => (
          <li key={course.title} className="text-lg leading-[1.55] text-quiet-ink">
            {course.title}<span className="text-quiet-muted">, {course.organization}, {course.dates}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// B: the degree on the left at heading size, bold, in the sans; the courses in a narrow column on
// the right, smaller. Below md, the courses follow the degree
function SideBySide({ degree, courses }: EducationProps) {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <p className="max-w-[26ch] font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink text-balance">{degree.title}</p>
        <p className="mt-3 text-lg leading-[1.55] text-quiet-ink">
          {degree.organization}, {degree.dates}
        </p>
        {degree.points?.map((point) => (
          <p key={point} className="mt-4 max-w-[62ch] text-lg leading-[1.55] text-quiet-muted text-pretty">{point}</p>
        ))}
      </div>
      <div>
        <h3 className="font-sans text-lg font-semibold text-quiet-ink">Since then</h3>
        <ul className="mt-3 flex flex-col gap-4">
          {courses.map((course) => (
            <li key={course.title} className="flex flex-col">
              <span className="font-sans text-base font-medium leading-[1.3] text-quiet-ink">{course.title}</span>
              <span className="text-base leading-[1.55] text-quiet-muted">{course.organization}, {course.dates}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// C: keeps the work list's date column, so education reads as the same timeline, but with no rules:
// space alone separates the entries. The degree is larger and bold; the courses are smaller
function Timeline({ degree, courses }: EducationProps) {
  const row = "grid gap-x-6 gap-y-1 md:grid-cols-[9rem_minmax(0,1fr)]";
  const year = "pt-1 font-sans text-base font-medium leading-[1.3] text-quiet-ink";
  return (
    <div className="flex flex-col gap-10">
      <div className={row}>
        <span className={`${year} md:pt-2.5`}>{degree.dates}</span>
        <div>
          <p className="max-w-[26ch] font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink text-balance">{degree.title}</p>
          <p className="mt-2 text-lg leading-[1.55] text-quiet-ink">{degree.organization}</p>
          {degree.points?.map((point) => (
            <p key={point} className="mt-3 max-w-[62ch] text-lg leading-[1.55] text-quiet-muted text-pretty">{point}</p>
          ))}
        </div>
      </div>
      {courses.map((course) => (
        <div key={course.title} className={row}>
          <span className={year}>{course.dates}</span>
          <div>
            <p className="font-sans text-lg font-semibold leading-[1.3] text-quiet-ink">{course.title}</p>
            <p className="text-lg leading-[1.55] text-quiet-ink">{course.organization}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
