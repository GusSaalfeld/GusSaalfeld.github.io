import ProjectRow from "./project-row";
import type { Project } from "@/app/types";

type FeaturedProjectsProps = {
  title?: string;
  projects: Project[],
  // No window frame of its own, for a section inside a shared window
  bare?: boolean,
};

// Projects as a details list, like Windows Explorer's Details view
export default function FeaturedProjects({ title, projects, bare }: FeaturedProjectsProps) {
  return (
    <div className={bare ? "" : "win-raised bg-face p-[3px] text-ink"}>
      <div className="px-2 pb-2 md:px-3 md:pb-3">
        <div className="win-sunken bg-paper p-2 md:p-4">
          <h2 className="px-4 pt-4 pb-4 text-2xl font-semibold leading-[1.2] tracking-[-0.48px] text-slime">
            {title ?? "Featured projects"}
          </h2>
          {/* Column headers, as raised buttons. Hidden from screen readers, since each row's link already reads as title then description */}
          <div aria-hidden className="hidden sm:grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] font-mono text-sm font-semibold text-ink">
            <span className="win-raised bg-face px-4 py-1">Name</span>
            <span className="win-raised bg-face px-4 py-1">Description</span>
          </div>
          <ul className="flex flex-col py-1">
            {projects.map((proj) => (
              <ProjectRow key={proj.path} {...proj} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
