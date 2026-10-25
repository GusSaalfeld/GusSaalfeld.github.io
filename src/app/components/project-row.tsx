import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the project list. On hover or focus, the title turns slime green and underlines
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-8 gap-y-1 py-5"
            >
                <span className="font-sans text-lg font-semibold leading-[1.35] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span className="text-lg leading-[1.55] text-quiet-muted">{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
