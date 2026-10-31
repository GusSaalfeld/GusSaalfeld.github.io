import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import DownloadLink from "@/app/components/download-link";
import { ProjectList } from "@/app/data/projects";
import { plain, withItalics } from "@/app/lib/italics";
import type { Project } from "@/app/types";

// A project's own page, one for each project with a page in the data. Writing samples and other
// work share the layout; a writing sample adds its purpose and audience. The writing itself comes
// before anything said about it: previews of its first pages, and the whole piece to download.
// Previous and Next, small at the top for skimmers and titled at the end for readers who finish,
// step through every project page in Selected work's order, wrapping round at either end

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
  return project ? { title: project.title, description: project.page && plain(project.page.summary) } : {};
}

const HEADING = "font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink";
const LINK = "underline decoration-1 underline-offset-4 hover:text-quiet-link hover:decoration-2";

export default async function ProjectPage({ params }: Props) {
  const { path } = await params;
  const project = WITH_PAGES.find((p) => p.path === path);
  if (!project) notFound();
  const page = project.page!;

  // This page's place among all the project pages. With only one, there's nowhere to go
  const at = WITH_PAGES.indexOf(project);
  const count = WITH_PAGES.length;
  const previous = count > 1 ? WITH_PAGES[(at - 1 + count) % count] : undefined;
  const next = count > 1 ? WITH_PAGES[(at + 1) % count] : undefined;
  const noun = "project";

  // What it's for, who for, its form, and what it's made with, in one row: short facts to scan
  const facts = [
    ["Purpose", page.purpose],
    ["Audience", page.audience],
    ["Format", page.format],
    ["Built with", page.builtWith],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        {/* In ink and underlined, so they read as links at a glance: back to the list, and a quick
            way on for someone skimming samples. The titled links at the end are for readers who finish */}
        <nav aria-label="Project navigation" className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-sans text-base text-quiet-ink">
          <Link href="/portfolio" className={LINK}>Back to portfolio</Link>
          {(previous || next) && (
            <span className="flex gap-6">
              {previous && <Link href={`/portfolio/${previous.path}`} className={LINK}>Previous {noun}</Link>}
              {next && <Link href={`/portfolio/${next.path}`} className={LINK}>Next {noun}</Link>}
            </span>
          )}
        </nav>

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
            {withItalics(page.summary)}
          </p>
          {page.sample && (
            <div className="flex shrink-0">
              <DownloadLink primary href={page.sample.href}>{page.sample.label}</DownloadLink>
            </div>
          )}
        </div>

        {(facts.length > 0 || page.services) && (
          <dl className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-3">
            {facts.map(([name, text]) => (
              <div key={name}>
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">{name}</dt>
                <dd className="mt-1 text-base leading-[1.55] text-quiet-ink text-pretty">{withItalics(text)}</dd>
              </div>
            ))}
            {/* What it runs, one app a line, the app in ink and what it's for muted. Two of the
                three columns, in two columns of its own from sm up */}
            {page.services && (
              <div className="md:col-span-2">
                <dt className="font-sans text-base font-semibold leading-[1.3] text-quiet-ink">Services</dt>
                <dd className="mt-1">
                  <ul className="grid gap-x-8 text-base leading-[1.55] sm:grid-cols-2">
                    {page.services.map((service) => (
                      <li key={service.name}>
                        <span className="text-quiet-ink">{service.name}</span>
                        <span className="text-quiet-muted">, {service.role}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
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

      {/* What the project produced: each document named, with what it is; a link once its file is added */}
      {page.documents && page.documents.length > 0 && (
        <Band className={SECTION_GAP}>
          <section>
            <h2 className={`mb-6 ${HEADING}`}>What I delivered</h2>
            <ul className="grid max-w-[62rem] gap-x-8 gap-y-6 md:grid-cols-2">
              {page.documents.map((doc) => (
                <li key={doc.name}>
                  <p className="font-sans text-lg font-semibold leading-[1.35] text-quiet-ink">
                    {doc.href ? <a href={doc.href} className={LINK}>{withItalics(doc.name)}</a> : withItalics(doc.name)}
                  </p>
                  <p className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{withItalics(doc.description)}</p>
                </li>
              ))}
            </ul>
          </section>
        </Band>
      )}

      <Band className={SECTION_GAP}>
        <section>
          <h2 className={`mb-6 ${HEADING}`}>Outcomes</h2>
          <ul className="flex max-w-[62ch] list-disc flex-col gap-2 pl-5 text-lg leading-[1.55] text-quiet-ink marker:text-quiet-muted">
            {page.outcomes.map((outcome) => (
              <li key={outcome} className="text-pretty">{withItalics(outcome)}</li>
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
                <p className="font-sans text-lg font-semibold leading-[1.35] text-quiet-ink text-pretty">{withItalics(problem)}</p>
                <p className="mt-1 text-lg leading-[1.55] text-quiet-ink text-pretty">{withItalics(solution)}</p>
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
