import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the project list. Hover and focus catch the torchlight: the row lifts and the title turns warm
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className="group -mx-3 grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-1 rounded-xl px-3 py-4 hover:bg-pool-edge focus-visible:bg-pool-edge"
            >
                <span className="font-display text-xl font-medium leading-[1.3] text-pool-moonlight group-hover:text-pool-torch group-focus-visible:text-pool-torch">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span className="text-lg leading-[1.5] text-pool-mist">{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
