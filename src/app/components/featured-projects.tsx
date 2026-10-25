import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
};

// Projects as a plain list: a title and a line about each
export default function FeaturedProjects({ title, projects }: FeaturedProjectsProps) {
  return (
    <section className="bg-quiet-paper border-t border-quiet-rule px-6 md:px-12 py-12">
      <div className="column">
        <h2 className="mb-6 font-sans text-[1.75rem] md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
          {title ?? "Featured projects"}
        </h2>
        <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
          {projects.map((proj) => (
            <ProjectRow key={proj.path} {...proj} />
          ))}
        </ul>
      </div>
    </section>
  );
}
