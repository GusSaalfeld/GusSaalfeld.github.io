import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import DownloadLink from "@/app/components/download-link";
import { ProjectList } from "@/app/data/projects";

// A project's own page, one for each project with a page in the data. Two kinds share the layout:
// a writing sample adds its purpose and audience under the title; either can offer the piece to
// download. Back goes to the portfolio; Previous and Next cycle through the pages of the same kind,
// writing samples or other work, in Selected work's order, wrapping round at either end

const WITH_PAGES = ProjectList.filter((project) => project.page);

// Built ahead of time, as the site is exported as static files: only these paths exist
export const dynamicParams = false;
export function generateStaticParams() {
  return WITH_PAGES.map((project) => ({ path: project.path }));
}

type Props = { params: Promise<{ path: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const project = WITH_PAGES.find((p) => p.path === path);
  return project ? { title: project.title, description: project.page?.summary } : {};
}

const HEADING = "font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink";
const NAV_LINK = "text-quiet-muted hover:text-quiet-link hover:underline underline-offset-4";

export default async function ProjectPage({ params }: Props) {
  const { path } = await params;
  const index = WITH_PAGES.findIndex((p) => p.path === path);
  if (index === -1) notFound();
  const project = WITH_PAGES[index];
  const page = project.page!;
  const writing = page.kind === "writing";
  // The pages of this kind, and this one's place among them. With only one, there's nowhere to go
  const kind = WITH_PAGES.filter((p) => p.page!.kind === page.kind);
  const at = kind.indexOf(project);
  const previous = kind.length > 1 ? kind[(at - 1 + kind.length) % kind.length] : undefined;
  const next = kind.length > 1 ? kind[(at + 1) % kind.length] : undefined;
  const noun = writing ? "sample" : "project";

  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        {/* Back to the list, and to the projects either side of this one in it */}
        <nav aria-label="Projects" className="mb-6 flex flex-wrap justify-between gap-x-6 gap-y-2 font-sans text-base">
          <Link href="/portfolio" className={NAV_LINK}>Back to portfolio</Link>
          <span className="flex gap-6">
            {previous && <Link href={`/portfolio/${previous.path}`} className={NAV_LINK}>Previous {noun}</Link>}
            {next && <Link href={`/portfolio/${next.path}`} className={NAV_LINK}>Next {noun}</Link>}
          </span>
        </nav>

        <h1 className="max-w-[30ch] font-sans text-[2.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-quiet-ink text-balance">
          {project.title}
        </h1>
        {/* The kind of work in ink, then when, muted, as in the lists */}
        <p className="mt-3 font-sans text-base leading-[1.3]">
          <span className="text-quiet-ink">{project.genre}</span>
          <span className="text-quiet-muted">, {page.date}</span>
        </p>

        {/* A writing sample's purpose and audience: what it's for, and who for. Side by side from md up */}
        {writing && (page.purpose || page.audience) && (
          <dl className="mt-6 grid max-w-[52rem] gap-x-12 gap-y-4 md:grid-cols-2">
            {page.purpose && (
              <div>
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">Purpose</dt>
                <dd className="mt-1 text-lg leading-[1.55] text-quiet-ink text-pretty">{page.purpose}</dd>
              </div>
            )}
            {page.audience && (
              <div>
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">Audience</dt>
                <dd className="mt-1 text-lg leading-[1.55] text-quiet-ink text-pretty">{page.audience}</dd>
              </div>
            )}
          </dl>
        )}

        {/* The summary as the lede, with the piece to download beside it from md up, as on the other pages */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <p className="max-w-[44ch] md:max-w-[52ch] text-xl md:text-2xl md:short:text-xl leading-[1.4] text-quiet-ink text-pretty">
            {page.summary}
          </p>
          {page.sample && (
            <div className="flex shrink-0">
              <DownloadLink primary href={page.sample.href}>{page.sample.label}</DownloadLink>
            </div>
          )}
        </div>
      </Band>

      {/* The picture across the column */}
      <Band className={SECTION_GAP}>
        <div className="relative aspect-[16/9] overflow-hidden bg-quiet-rule">
          <Image src={page.image.src} alt={page.image.alt} fill sizes="(min-width: 1024px) 928px, 100vw" className="object-cover" />
        </div>
      </Band>

      <Band className={SECTION_GAP}>
        <section>
          <h2 className={`mb-6 ${HEADING}`}>Outcomes</h2>
          <ul className="flex max-w-[62ch] list-disc flex-col gap-2 pl-5 text-lg leading-[1.55] text-quiet-ink marker:text-quiet-muted">
            {page.outcomes.map((outcome) => (
              <li key={outcome} className="text-pretty">{outcome}</li>
            ))}
          </ul>
        </section>
      </Band>

      {/* The story, as situation, task, action, and result: each part named in the left column,
          like the dates on the Experience page */}
      <Band className={SECTION_GAP}>
        <section>
          <h2 className={`mb-6 ${HEADING}`}>How it came together</h2>
          <dl className="flex flex-col gap-6">
            {(
              [
                ["Situation", page.star.situation],
                ["Task", page.star.task],
                ["Action", page.star.action],
                ["Result", page.star.result],
              ] as const
            ).map(([part, text]) => (
              <div key={part} className="grid gap-x-6 gap-y-1 md:grid-cols-[9rem_minmax(0,1fr)]">
                <dt className="pt-0.5 font-sans text-base leading-[1.3] text-quiet-ink">{part}</dt>
                <dd className="max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">{text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Band>
    </>
  );
}
