import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the roster. Hover and focus move the selection bar onto it, as picking a party
// member did: an instant swap to gold with slime-brown text
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-1 px-3 py-3 text-lg leading-[1.45] text-parchment hover:bg-gold hover:text-slime focus-visible:bg-gold focus-visible:text-slime"
            >
                <span className="font-pixel text-[length:var(--display-s)] leading-[1.3] text-gold group-hover:text-slime group-focus-visible:text-slime">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span>{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
