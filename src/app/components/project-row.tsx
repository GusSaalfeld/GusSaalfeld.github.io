import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the project list: a 4:3 thumbnail of the work, then the title, which leads, above a
// line about it. On hover or focus, the title turns slime green and underlines
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className={`group grid items-start gap-x-6 py-6 ${project.thumbnail ? "grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[10rem_minmax(0,1fr)]" : ""}`}
            >
                {project.thumbnail && (
                    // Decorative beside the title, which names the project for screen readers
                    <div className="relative aspect-[4/3] overflow-hidden bg-quiet-rule">
                        <Image src={project.thumbnail} alt="" fill sizes="(min-width: 768px) 160px, 96px" className="object-cover" />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <span className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4">
                        {project.title}
                    </span>
                    {project.hoverDescription && (
                        <span className="max-w-[62ch] text-lg leading-[1.55] text-quiet-muted">{project.hoverDescription}</span>
                    )}
                </div>
            </Link>
        </li>
    );
}
