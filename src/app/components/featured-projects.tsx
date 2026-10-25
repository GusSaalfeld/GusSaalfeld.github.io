import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
};

// Projects as a plain list: a title and a line about each, with rules between rows to scan by
export default function FeaturedProjects({ title, projects }: FeaturedProjectsProps) {
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title ?? "Selected work"}
      </h2>
      <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
        {projects.map((proj) => (
          <ProjectRow key={proj.path} {...proj} />
        ))}
      </ul>
    </section>
  );
}
