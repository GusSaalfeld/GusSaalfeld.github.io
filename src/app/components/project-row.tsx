import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the roster. Hover and focus move the selection bar onto it, as picking a party
// member did: an instant swap to cyan with black text
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 px-3 py-2 text-[22px] leading-[1.3] text-c64-white hover:bg-c64-cyan hover:text-c64-black focus-visible:bg-c64-cyan focus-visible:text-c64-black"
            >
                <span className="text-c64-yellow group-hover:text-c64-black group-focus-visible:text-c64-black">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span>{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
