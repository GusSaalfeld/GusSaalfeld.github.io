import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
};

// Projects as a list, one row each. Each project is an oat in the petri dish, in the same order
export default function FeaturedProjects({ title, projects }: FeaturedProjectsProps) {
  return (
    <section className="border-t border-lab-line px-6 md:px-12 py-10">
      <h2 className="mb-4 text-[1.75rem] md:text-[2rem] font-semibold leading-[1.15] tracking-[-0.01em] text-lab-ink">
        {title ?? "Featured projects"}
      </h2>
      <ul className="flex flex-col divide-y divide-lab-line">
        {projects.map((proj, index) => (
          <ProjectRow key={proj.path} index={index} {...proj} />
        ))}
      </ul>
    </section>
  );
}
