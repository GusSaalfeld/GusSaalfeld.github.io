// src/components/ui/Card.tsx
import type { ReactNode } from "react";
import ProjectIcon from "./project-icon";

type CardProps = {
  title?: string;
  description?: string,
  projects: Project[],
  // No window frame of its own, for a section inside a shared window
  bare?: boolean,
};

export default function FeaturedProjects({ title, description, projects, bare }: CardProps) {
  return (
    <div className={bare ? "" : "win-raised bg-white p-[3px] text-black"}>
      <h2 className="px-8 pt-8 font-serif text-2xl font-semibold leading-[1.2] tracking-[-0.48px] text-[var(--win-accent)]">
        {title ?? "Featured Projects"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
        {projects.map((proj, i) => (
          <ProjectIcon
            key={proj.path}
            path={proj.path}
            title={proj.title}
            hoverDescription={proj.hoverDescription}
            iconPath={proj.iconPath}
            wide={projects.length % 2 === 1 && i === projects.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
