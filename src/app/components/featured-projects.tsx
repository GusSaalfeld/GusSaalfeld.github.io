import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
};

// Projects as a list, one row each, divided by hairlines
export default function FeaturedProjects({ title, projects }: FeaturedProjectsProps) {
  return (
    <div className="panel p-5 md:p-8">
      <h2 className="mb-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-pool-moonlight">
        {title ?? "Featured projects"}
      </h2>
      <ul className="flex flex-col divide-y divide-pool-edge">
        {projects.map((proj) => (
          <ProjectRow key={proj.path} {...proj} />
        ))}
      </ul>
    </div>
  );
}
