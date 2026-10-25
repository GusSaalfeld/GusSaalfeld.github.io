import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
  // No frame of its own, for a panel inside a shared frame
  bare?: boolean,
};

// Projects as a list in a panel, like the party roster along the bottom of The Bard's Tale
export default function FeaturedProjects({ title, projects, bare }: FeaturedProjectsProps) {
  const roster = (
    <div className="panel p-4 md:p-6">
      <h2 className="px-3 pt-1 pb-4 font-pixel text-[length:var(--display-m)] leading-[1.2] text-gold">
        {title ?? "Featured projects"}
      </h2>
      {/* Column headings. Hidden from screen readers, since each row's link already reads as title then description */}
      <div aria-hidden className="hidden sm:grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 px-3 pb-1 mb-2 border-b-4 border-frame-edge font-pixel text-[length:var(--display-s)] text-dust">
        <span>Name</span>
        <span>Description</span>
      </div>
      <ul className="flex flex-col">
        {projects.map((proj) => (
          <ProjectRow key={proj.path} {...proj} />
        ))}
      </ul>
    </div>
  );

  return bare ? roster : <div className="frame">{roster}</div>;
}
