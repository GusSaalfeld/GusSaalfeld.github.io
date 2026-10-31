import type { Metadata } from "next";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import DownloadLink from "@/app/components/download-link";
import ExperienceList from "@/app/components/experience-list";
import Education from "@/app/components/education";
import { CourseList, Degree, ToolGroups, WorkList } from "@/app/data/experience";

export const metadata: Metadata = { title: "Experience" };

// Built from the portfolio page: a title and a lede with the resume beside it, then the history as
// a ledger like Selected work. The title is set like the About page's, in ink: only the name on the
// portfolio page shows the slime
export default function Experience() {
  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        <h1 className="font-sans text-[2.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-quiet-ink">
          Experience
        </h1>
        {/* The lede, with the resume beside it from md up, lined up with its last line, and under it below */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <p className="max-w-[44ch] md:max-w-[52ch] text-2xl short:text-xl leading-[1.4] text-quiet-ink text-pretty">
            I&rsquo;ve written documentation in almost every role I&rsquo;ve had, from software teams to the coffee shop.
          </p>
          <div className="flex shrink-0">
            <DownloadLink primary href="/Augustus-Saalfeld-resume.pdf">Download resume (PDF)</DownloadLink>
          </div>
        </div>
        {/* The tools, grouped: the words a recruiter scans for. Quiet, like the hobby captions:
            the group in the sans, the tools muted. Three across on wide screens, two, then one */}
        <dl className="mt-12 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {ToolGroups.map((group) => (
            <div key={group.name}>
              <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">{group.name}</dt>
              <dd className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{group.tools}</dd>
            </div>
          ))}
        </dl>
      </Band>
      <Band className={SECTION_GAP}>
        <ExperienceList title="Work" roles={WorkList} />
      </Band>
      <Band className={SECTION_GAP}>
        <Education degree={Degree} courses={CourseList} />
      </Band>
    </>
  );
}
