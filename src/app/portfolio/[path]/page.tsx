import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import DownloadLink from "@/app/components/download-link";
import { ProjectList } from "@/app/data/projects";
import type { Project } from "@/app/types";

// A project's own page, one for each project with a page in the data. Writing samples and other
// work share the layout; a writing sample adds its purpose and audience. The writing itself comes
// before anything said about it: previews of its first pages, and the whole piece to download.
// Previous and Next, at the end where a reader decides what's next, step through the pages of the
// same kind in Selected work's order, wrapping round at either end

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
const LINK = "underline decoration-1 underline-offset-4 hover:text-quiet-link hover:decoration-2";

export default async function ProjectPage({ params }: Props) {
  const { path } = await params;
  const project = WITH_PAGES.find((p) => p.path === path);
  if (!project) notFound();
  const page = project.page!;
  const writing = page.kind === "writing";

  // The pages of this kind, and this one's place among them. With only one, there's nowhere to go
  const kind = WITH_PAGES.filter((p) => p.page!.kind === page.kind);
  const at = kind.indexOf(project);
  const previous = kind.length > 1 ? kind[(at - 1 + kind.length) % kind.length] : undefined;
  const next = kind.length > 1 ? kind[(at + 1) % kind.length] : undefined;
  const noun = writing ? "sample" : "project";

  // What it's for, who for, and its form, in one row: short facts to scan before reading
  const facts = [
    ["Purpose", page.purpose],
    ["Audience", page.audience],
    ["Format", page.format],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        {/* In ink and underlined, so it reads as a link at a glance */}
        <Link href="/portfolio" className={`font-sans text-base text-quiet-ink ${LINK}`}>
          Back to portfolio
        </Link>

        <h1 className="mt-6 max-w-[30ch] font-sans text-[2.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-quiet-ink text-balance">
          {project.title}
        </h1>
        {/* The kind of work in ink, then when, muted, as in the lists */}
        <p className="mt-3 font-sans text-base leading-[1.3]">
          <span className="text-quiet-ink">{project.genre}</span>
          <span className="text-quiet-muted">, {page.date}</span>
        </p>

        {/* What it is, with the whole piece beside it from md up, as on the other pages */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <p className="max-w-[44ch] md:max-w-[52ch] text-xl md:text-2xl md:short:text-xl leading-[1.4] text-quiet-ink text-pretty">
            {page.summary}
          </p>
          {page.sample && (
            <div className="flex shrink-0">
              <DownloadLink primary href={page.sample.href}>{page.sample.label}</DownloadLink>
            </div>
          )}
        </div>

        {facts.length > 0 && (
          <dl className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-3">
            {facts.map(([name, text]) => (
              <div key={name}>
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">{name}</dt>
                <dd className="mt-1 text-base leading-[1.55] text-quiet-ink text-pretty">{text}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* The piece itself: the top of its first pages side by side, where the headings and first
            lines are, each opening the whole piece. Two across on phones. A thin edge keeps white
            pages from melting into the paper */}
        {page.previews && page.previews.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {page.previews.map((preview, i) => (
              <li key={preview.src} className={i === 2 ? "hidden sm:block" : ""}>
                <a
                  href={page.sample?.href ?? preview.src}
                  className="relative block aspect-[4/3] overflow-hidden border border-quiet-rule bg-white hover:border-quiet-link"
                >
                  <Image
                    src={preview.src}
                    alt={preview.alt}
                    fill
                    sizes="(min-width: 1024px) 296px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover object-top"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
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

      {/* Each problem in bold, with what I did about it beneath: the decisions behind the piece */}
      <Band className={SECTION_GAP}>
        <section>
          <h2 className={`mb-6 ${HEADING}`}>Challenges</h2>
          <ul className="flex max-w-[62ch] flex-col gap-6">
            {page.challenges.map(({ problem, solution }) => (
              <li key={problem}>
                <p className="font-sans text-lg font-semibold leading-[1.35] text-quiet-ink text-pretty">{problem}</p>
                <p className="mt-1 text-lg leading-[1.55] text-quiet-ink text-pretty">{solution}</p>
              </li>
            ))}
          </ul>
        </section>
      </Band>

      {/* The neighbours, with their titles to give a reason to go on. Ruled, as rows you can click */}
      {(previous || next) && (
        <Band className={SECTION_GAP}>
          <nav aria-label={`More ${noun}s`} className="grid gap-6 border-y border-quiet-rule py-6 md:grid-cols-2">
            {previous && <Neighbour project={previous} label={`Previous ${noun}`} />}
            {next && <Neighbour project={next} label={`Next ${noun}`} alignEnd />}
          </nav>
        </Band>
      )}
    </>
  );
}

function Neighbour({ project, label, alignEnd }: { project: Project, label: string, alignEnd?: boolean }) {
  return (
    <Link href={`/portfolio/${project.path}`} className={`group flex flex-col gap-1 ${alignEnd ? "md:items-end md:text-right" : ""}`}>
      <span className="font-sans text-base leading-[1.3] text-quiet-muted">{label}</span>
      <span className="max-w-[28ch] font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink text-balance group-hover:text-quiet-link group-hover:underline underline-offset-4">
        {project.title}
      </span>
    </Link>
  );
}
