import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/types";

// A description with *asterisks* around words that should be italic, such as a book's title.
// Splitting on the pattern alternates plain and italic runs: the odd pieces are the italic ones
function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/).map((piece, i) => (i % 2 ? <em key={i}>{piece}</em> : piece));
}

type SelectedWorkProps = {
  title?: string;
  projects: Project[],
};

// The projects as a ledger, like a bibliography: what was made and the year in their own column
// first, then the title and one sentence on what it is, who it was for and what it achieved, then
// a small picture at the right edge. On phones the artefact and year go side by side above the
// title. Rules between rows to scan by. On hover or focus, the title turns slime green and
// underlines, and the picture's edge turns green with it
export default function SelectedWork({ title, projects }: SelectedWorkProps) {
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title ?? "Selected work"}
      </h2>
      <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
        {projects.map((project) => (
          <li key={project.path}>
            <Link
              href={`/portfolio/${project.path}`}
              className="group grid grid-cols-[minmax(0,1fr)_5rem] items-start gap-x-6 gap-y-1 py-5 md:grid-cols-[9rem_minmax(0,1fr)_6rem]"
            >
              {/* What was made, in ink, so a reader sees what each piece is first; then the year, muted.
                  Stacked from md up, side by side on phones. With neither, it still holds the first
                  column from md up, but takes no line on phones */}
              <span className={`col-span-2 flex flex-wrap items-baseline gap-x-3 pt-1.5 font-sans text-base md:col-span-1 md:flex-col md:gap-y-0.5 ${project.artefact || project.year ? "" : "hidden md:flex"}`}>
                {project.artefact && <span className="font-medium leading-[1.3] text-quiet-ink">{project.artefact}</span>}
                {project.year && <span className="tabular-nums text-quiet-muted">{project.year}</span>}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4">
                  {project.title}
                </span>
                {project.hoverDescription && (
                  <span className="max-w-[62ch] text-lg leading-[1.55] text-quiet-muted">{withItalics(project.hoverDescription)}</span>
                )}
              </span>
              {project.thumbnail && (
                // Decorative: the title names the project for screen readers. The edge keeps a white
                // page or screenshot from melting into the paper
                <div className="relative aspect-[4/3] overflow-hidden border border-quiet-rule bg-quiet-rule group-hover:border-quiet-link group-focus-visible:border-quiet-link">
                  <Image src={project.thumbnail} alt="" fill sizes="96px" className="object-cover" />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
