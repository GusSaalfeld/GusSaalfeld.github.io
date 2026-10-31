import type { Metadata } from "next";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import DownloadLink from "@/app/components/download-link";
import ExperienceList from "@/app/components/experience-list";
import { EducationList, OtherWork, ToolGroups, WritingWork } from "@/app/data/experience";

export const metadata: Metadata = { title: "Experience" };

// Built from the portfolio page: a title and a lede with the resume beside it, then the history on
// one timeline: the roles with writing or engineering, education, other work, then the tools. The title is set like the About page's, in ink: only the name on the
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
      </Band>
      {/* The roles with writing or engineering first: recruiters scan job titles first */}
      <Band className={SECTION_GAP}>
        <ExperienceList title="Writing and engineering" roles={WritingWork} />
      </Band>
      {/* Education next: the 2026 graduate course shows the move into writing is current */}
      <Band className={SECTION_GAP}>
        <ExperienceList title="Education" roles={EducationList} />
      </Band>
      <Band className={SECTION_GAP}>
        <ExperienceList title="Other work" roles={OtherWork} />
      </Band>
      <Band className={SECTION_GAP}>
        <section>
          <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">Tools</h2>
          {/* The tools, grouped: the words a recruiter checks a match against, after the work they
              came from. Quiet, like the hobby captions: the group in the sans, the tools muted.
              Three across on wide screens, two, then one */}
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {ToolGroups.map((group) => (
              <div key={group.name}>
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">{group.name}</dt>
                <dd className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{group.tools}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Band>
    </>
  );
}
