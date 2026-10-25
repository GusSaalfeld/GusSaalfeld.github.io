import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the project list: the title, which leads, above a line about it. On hover or
// focus, the title turns slime green and underlines
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link href={`/portfolio/${project.path}`} className="group flex flex-col gap-2 py-6">
                <span className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span className="max-w-[62ch] text-lg leading-[1.55] text-quiet-muted">{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
