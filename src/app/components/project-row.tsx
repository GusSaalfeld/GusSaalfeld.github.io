import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/types";

// One row of the project list: a 4:3 thumbnail of the work, then the title, which leads, above a
// line about it. From md up, the year sits at the right end of the title's line, like a page
// number in a table of contents, so the years line up down the list. Narrower, it goes under the
// title, so the title keeps the row's width. On hover or focus, the title turns slime green and
// underlines, and the thumbnail's edge turns green with it
export default function ProjectRow(project: Project) {
    return (
        <li>
            <Link
                href={`/portfolio/${project.path}`}
                className={`group grid items-start gap-x-6 py-6 ${project.thumbnail ? "grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[12rem_minmax(0,1fr)]" : ""}`}
            >
                {project.thumbnail && (
                    // Decorative beside the title, which names the project for screen readers. The edge
                    // keeps a white page or screenshot from melting into the paper
                    <div className="relative aspect-[4/3] overflow-hidden border border-quiet-rule bg-quiet-rule group-hover:border-quiet-link group-focus-visible:border-quiet-link">
                        <Image src={project.thumbnail} alt="" fill sizes="(min-width: 768px) 192px, 96px" className="object-cover" />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                        <span className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4">
                            {project.title}
                        </span>
                        {project.year && (
                            <span className="shrink-0 font-sans text-base tabular-nums text-quiet-muted">{project.year}</span>
                        )}
                    </div>
                    {project.hoverDescription && (
                        <span className="max-w-[62ch] text-lg leading-[1.55] text-quiet-muted">{project.hoverDescription}</span>
                    )}
                </div>
            </Link>
        </li>
    );
}
