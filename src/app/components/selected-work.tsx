import Image from "next/image";
import Link from "next/link";
import { hasLivePage } from "@/app/data/projects";
import { withItalics } from "@/app/lib/italics";
import type { Project } from "@/app/types";

type SelectedWorkProps = {
  title?: string;
  projects: Project[],
};

// The projects as a ledger, like a bibliography: the kind of writing in its own column first, then
// the title and one sentence on what it is, who it was for and what it achieved, then a small
// picture at the right edge. On phones the kind of writing goes above the title. Rules between rows:
// across the site, rules mark rows you can click, showing where each one starts and ends (lists you
// only read, like Experience's, are separated by space alone). A project whose page is ready is a link: on hover or focus, the title turns slime green
// and underlines, and the picture's edge turns green with it. Until then the row is plain text
export default function SelectedWork({ title, projects }: SelectedWorkProps) {
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title ?? "Selected work"}
      </h2>
      <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
        {projects.map((project) => {
          const live = hasLivePage(project);
          return (
            // The whole row is clickable, but only the title is the link: its ::after stretches over the
            // row (the li is positioned), so a screen reader announces just the title, not the row's
            // every word (Inclusive Components, Cards). The focus ring is drawn round the whole row
            <li
              key={project.path}
              className={`group relative grid grid-cols-[minmax(0,1fr)_5rem] items-start gap-x-6 gap-y-1 py-5 md:grid-cols-[9rem_minmax(0,1fr)_6rem] ${
                live ? "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-quiet-link has-[a:focus-visible]:outline" : ""
              }`}
            >
              {/* The kind of writing, in ink, so a reader sees what each piece is first. Without one, it
                  still holds the first column from md up, but takes no line on phones */}
              <span className={`col-span-2 pt-1.5 font-sans text-base font-normal leading-[1.3] text-quiet-ink md:col-span-1 ${project.genre ? "" : "hidden md:block"}`}>
                {project.genre}
              </span>
              <span className="flex flex-col gap-1">
                <h3 className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink">
                  {live ? (
                    <Link
                      href={`/portfolio/${project.path}`}
                      className="stretched-link after:absolute after:inset-0 after:z-10 group-hover:text-quiet-link group-hover:underline underline-offset-4"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
                {project.hoverDescription && (
                  <span className="max-w-[62ch] text-lg leading-[1.55] text-quiet-muted">{withItalics(project.hoverDescription)}</span>
                )}
              </span>
              {project.thumbnail && (
                // Decorative: the title names the project for screen readers. The edge keeps a white
                // page or screenshot from melting into the paper
                <div className={`relative aspect-[4/3] overflow-hidden border border-quiet-rule bg-white ${live ? "group-hover:border-quiet-link" : ""}`}>
                  <Image src={project.thumbnail} alt="" fill sizes="96px" className="object-cover object-left-top" />
                </div>
              )}
            </li>
          );
        })}
      </ul>

    </section>
  );
}
