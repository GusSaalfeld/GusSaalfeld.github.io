import type { Role } from "@/app/types";

type EducationProps = {
  degree: Role,
  courses: Role[],
};

// The degree and the courses since, on the work list's date column, so education reads as the same
// timeline, but with no rules: space alone separates the entries. The degree is larger and bold;
// the courses are smaller
export default function Education({ degree, courses }: EducationProps) {
  const row = "grid gap-x-6 gap-y-1 md:grid-cols-[9rem_minmax(0,1fr)]";
  const year = "pt-1 font-sans text-base font-medium leading-[1.3] text-quiet-ink";
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">Education</h2>
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
    </section>
  );
}
