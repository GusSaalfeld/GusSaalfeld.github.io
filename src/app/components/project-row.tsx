"use client";

import Link from "next/link";
import type { Project } from "@/app/types";
import { FOCUS_EVENT, type FocusDetail } from "@/app/lib/slime/Dish";

// Tell the petri dish which oat to point out: this project's, or none with -1
const pointTo = (detail: FocusDetail) => window.dispatchEvent(new CustomEvent(FOCUS_EVENT, { detail }));

// One row of the project list. Hovering or focusing it rings its oat in the dish and labels it
export default function ProjectRow({ index, ...project }: Project & { index: number }) {
    const point = () => pointTo({ index, title: project.title });
    const unpoint = () => pointTo({ index: -1, title: "" });
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                onMouseEnter={point} onMouseLeave={unpoint} onFocus={point} onBlur={unpoint}
                className="group -mx-3 grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-1 rounded-md px-3 py-4 hover:bg-lab-paper focus-visible:bg-lab-paper"
            >
                <span className="text-xl font-semibold leading-[1.3] text-lab-ink group-hover:text-lab-marker group-focus-visible:text-lab-marker">
                    {project.title}
                </span>
                {project.hoverDescription && (
                    <span className="text-lg leading-[1.5] text-lab-graphite">{project.hoverDescription}</span>
                )}
            </Link>
        </li>
    );
}
