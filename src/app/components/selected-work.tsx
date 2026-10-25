"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/app/types";

type SelectedWorkProps = {
  title?: string;
  projects: Project[],
};

// Three layouts for the list, to compare. A temporary button switches between them; remove it,
// and the layouts that lose, once one is chosen
type Layout = "index" | "compact" | "grid";
const Layouts: { id: Layout; label: string }[] = [
  { id: "index", label: "Index with preview" },
  { id: "compact", label: "Compact list" },
  { id: "grid", label: "Card grid" },
];

// Shared by every layout. The title turns slime green and underlines on hover or focus, and the
// thumbnail's edge turns green with it
const TITLE = "font-sans font-semibold leading-[1.25] text-quiet-ink group-hover:text-quiet-link group-hover:underline group-focus-visible:text-quiet-link underline-offset-4";
const YEAR = "shrink-0 font-sans text-base tabular-nums text-quiet-muted";
const DESCRIPTION = "max-w-[62ch] text-lg leading-[1.55] text-quiet-muted";

// A 4:3 picture of the work, edged so a white page or screenshot keeps its shape on the paper.
// Decorative: the title beside it names the project for screen readers
function Thumbnail({ project, sizes, className = "" }: { project: Project; sizes: string; className?: string }) {
  if (!project.thumbnail) return null;
  return (
    <div className={`relative aspect-[4/3] overflow-hidden border border-quiet-rule bg-quiet-rule group-hover:border-quiet-link group-focus-visible:border-quiet-link ${className}`}>
      <Image src={project.thumbnail} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

// The title with its year right after it, close enough to read together
function TitleLine({ project, size }: { project: Project; size: string }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-3">
      <span className={`${TITLE} ${size}`}>{project.title}</span>
      {project.year && <span className={YEAR}>{project.year}</span>}
    </span>
  );
}

// 1. A typographic index: compact text rows, and beside them one preview that shows whichever
// project is hovered or focused (the first until then), staying in view as the list scrolls.
// Phones can't hover, so there each row carries its own small thumbnail instead
function IndexWithPreview({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_20rem]">
      <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
        {projects.map((project, index) => (
          <li key={project.path}>
            <Link
              href={`/portfolio/${project.path}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-x-4 py-5 md:grid-cols-1"
            >
              <Thumbnail project={project} sizes="80px" className="md:hidden" />
              <span className="flex flex-col gap-1">
                <TitleLine project={project} size="text-2xl" />
                {project.hoverDescription && <span className={DESCRIPTION}>{project.hoverDescription}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div aria-hidden className="hidden md:block">
        {/* Below the sticky navbar */}
        <div className="sticky top-24">
          <Thumbnail project={projects[active]} sizes="320px" />
        </div>
      </div>
    </div>
  );
}

// 2. The row list, tightened: a smaller thumbnail, the text centred on it, the year by the title
function CompactList({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
      {projects.map((project) => (
        <li key={project.path}>
          <Link
            href={`/portfolio/${project.path}`}
            className="group grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-6 py-4 md:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <Thumbnail project={project} sizes="(min-width: 768px) 128px, 80px" />
            <span className="flex flex-col gap-1">
              <TitleLine project={project} size="text-xl" />
              {project.hoverDescription && <span className={DESCRIPTION}>{project.hoverDescription}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 3. Two columns of cards: a large picture, then the title, year and description under it
function CardGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.path}>
          <Link href={`/portfolio/${project.path}`} className="group flex flex-col gap-4">
            <Thumbnail project={project} sizes="(min-width: 640px) 440px, 100vw" />
            <span className="flex flex-col gap-1">
              <TitleLine project={project} size="text-2xl" />
              {project.hoverDescription && <span className={DESCRIPTION}>{project.hoverDescription}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// The projects under a heading, in whichever layout is chosen
export default function SelectedWork({ title, projects }: SelectedWorkProps) {
  const [layout, setLayout] = useState(0);
  const current = Layouts[layout].id;
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title ?? "Selected work"}
      </h2>
      {current === "index" && <IndexWithPreview projects={projects} />}
      {current === "compact" && <CompactList projects={projects} />}
      {current === "grid" && <CardGrid projects={projects} />}

      {/* The temporary layout switch */}
      <button
        type="button"
        onClick={() => setLayout((layout + 1) % Layouts.length)}
        className="fixed bottom-4 right-4 z-50 min-h-12 border border-quiet-ink bg-quiet-paper px-4 font-sans text-base text-quiet-ink hover:bg-quiet-ink hover:text-quiet-paper"
      >
        Layout {layout + 1} of {Layouts.length}: {Layouts[layout].label}
      </button>
    </section>
  );
}
