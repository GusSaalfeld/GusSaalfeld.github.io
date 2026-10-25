import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the details list. Hover and focus select it like a file in Windows Explorer:
// an instant swap to slime brown and white
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-1 px-4 py-3 text-ink hover:bg-slime hover:text-white focus-visible:bg-slime focus-visible:text-white"
            >
                <span className="text-lg font-semibold leading-[1.3] text-slime group-hover:text-white group-focus-visible:text-white">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span className="text-lg leading-[1.45]">
                        {project.hoverDescription}
                    </span>
                )}
            </Link>
        </li>
    );
}
