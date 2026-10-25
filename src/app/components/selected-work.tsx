"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/app/types";

type SelectedWorkProps = {
  title?: string;
  projects: Project[],
};

// Six layouts for the list, to compare. A temporary button switches between them; remove it,
// and the layouts that lose, once one is chosen
type Layout = "index" | "compact" | "grid" | "text" | "lead" | "ledger";
const Layouts: { id: Layout; label: string }[] = [
  { id: "index", label: "Index with preview" },
  { id: "compact", label: "Compact list" },
  { id: "grid", label: "Card grid" },
  { id: "text", label: "Text only" },
  { id: "lead", label: "Lead project and index" },
  { id: "ledger", label: "Ledger" },
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

// 3. Cards: a picture, then the title, year and description under it. Three columns from md up,
// two from sm, so each picture stays modest
function CardGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <li key={project.path}>
          <Link href={`/portfolio/${project.path}`} className="group flex flex-col gap-3">
            <Thumbnail project={project} sizes="(min-width: 768px) 290px, (min-width: 640px) 50vw, 100vw" />
            <span className="flex flex-col gap-1">
              <TitleLine project={project} size="text-xl" />
              {project.hoverDescription && <span className="text-base leading-[1.55] text-quiet-muted">{project.hoverDescription}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 4. Text only: the index without pictures. The quietest; the writing carries it
function TextOnly({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
      {projects.map((project) => (
        <li key={project.path}>
          <Link href={`/portfolio/${project.path}`} className="group flex flex-col gap-1 py-5">
            <TitleLine project={project} size="text-2xl" />
            {project.hoverDescription && <span className={DESCRIPTION}>{project.hoverDescription}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 5. The first project as a lead, its picture large beside its text, then the rest as a text index.
// Puts the strongest piece first, so order the list by strength
function LeadAndIndex({ projects }: { projects: Project[] }) {
  const [lead, ...rest] = projects;
  return (
    <div className="flex flex-col gap-12">
      <Link href={`/portfolio/${lead.path}`} className="group grid items-center gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-12">
        <Thumbnail project={lead} sizes="(min-width: 768px) 540px, 100vw" />
        <span className="flex flex-col gap-2">
          <TitleLine project={lead} size="text-[2rem]" />
          {lead.hoverDescription && <span className={DESCRIPTION}>{lead.hoverDescription}</span>}
        </span>
      </Link>
      <TextOnly projects={rest} />
    </div>
  );
}

// 6. A ledger, like a bibliography: the year in its own column first, then the title, what it is
// and who it's for, and its purpose, then a small picture at the right edge. Each line has its own
// look (ink sans title, muted sans format, muted serif purpose) so the eye can skim down any one.
// On phones the year goes above the title
function Ledger({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
      {projects.map((project) => (
        <li key={project.path}>
          <Link
            href={`/portfolio/${project.path}`}
            className="group grid grid-cols-[minmax(0,1fr)_5rem] items-start gap-x-6 gap-y-1 py-5 md:grid-cols-[8rem_minmax(0,1fr)_6rem]"
          >
            {/* With no year it still holds the first column from md up, but takes no line on phones */}
            <span className={`${YEAR} col-span-2 pt-1.5 md:col-span-1 ${project.year ? "" : "hidden md:block"}`}>{project.year}</span>
            <span className="flex flex-col gap-1">
              <span className={`${TITLE} text-2xl`}>{project.title}</span>
              {project.format && <span className="font-sans text-base text-quiet-muted">{project.format}</span>}
              {project.hoverDescription && <span className={DESCRIPTION}>{project.hoverDescription}</span>}
            </span>
            <Thumbnail project={project} sizes="96px" />
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
      {current === "text" && <TextOnly projects={projects} />}
      {current === "lead" && <LeadAndIndex projects={projects} />}
      {current === "ledger" && <Ledger projects={projects} />}

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
