import DownloadLink from "@/app/components/download-link";
import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

// Work first: the name and a short lede that says what you write and why you, then the projects.
// The longer story and the photo are on the About page
export default function Portfolio() {
  return (
    <>
      <header>
        {/* The top of a 1.333 type scale: 18 body, 24 lede and project titles, 32 headings, 42, 57, 76 */}
        <h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1] tracking-[-0.025em] text-quiet-ink">
          Augustus Saalfeld
        </h1>
        {/* The lede, with the two downloads beside it from md up, lined up with its last line,
            and under it below. What a hiring manager most wants, in the first screen */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          {/* Set in the reading face, as the first line of the writing. Room for two sentences,
              about 30 to 45 words, in three or four lines */}
          <p className="max-w-[44ch] text-2xl leading-[1.4] text-quiet-ink text-pretty">
            As a programmer turned writer, I explain complex topics clearly. I write documentation that
            helps people use software, and articles that help your research reach more readers.
          </p>
          {/* The files go in public/ */}
          <div className="flex shrink-0 flex-wrap gap-3 md:flex-col">
            <DownloadLink primary href="/Augustus-Saalfeld-resume.pdf">Download resume (PDF)</DownloadLink>
            <DownloadLink href="/Augustus-Saalfeld-portfolio.pdf">Download portfolio (PDF)</DownloadLink>
          </div>
        </div>
      </header>
      <FeaturedProjects projects={ProjectList} />
    </>
  );
}
