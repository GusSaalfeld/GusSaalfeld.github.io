import { isLive } from "@/app/data/projects";
import type { Role } from "@/app/types";

type ExperienceListProps = {
  title: string,
  roles: Role[],
};

const LINK = "text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2";

// Roles on a timeline like Education's: the years in their own column, then the role and where on
// one line. No rules: across the site, rules mark rows you can click, and these are read, not
// clicked, so space alone separates the entries. A role with points is a full entry, set
// large; one without is a single compact line, set like Education's courses, so the roles with
// writing or engineering stand out while the order stays by date. On phones the years go above
export default function ExperienceList({ title, roles }: ExperienceListProps) {
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title}
      </h2>
      <ul className="flex flex-col gap-6">
        {roles.map((role) => {
          const points = role.points ?? [];
          const full = points.length > 0;
          return (
            <li key={role.title + role.organization} className="grid gap-x-6 gap-y-1 md:grid-cols-[9rem_minmax(0,1fr)]">
              {/* The years, in ink but regular weight, so they read as labels beside the bolder titles,
                  lined up with the first line of the role beside them */}
              <span className={`pt-1 font-sans text-base font-normal leading-[1.3] text-quiet-ink ${full ? "md:pt-1.5" : ""}`}>
                {role.dates}
              </span>
              <div>
                {/* The role, then where, on one line: the role bold in ink, where regular and muted, so the
                    titles are what a skimming reader picks up */}
                <h3
                  className={`font-sans text-quiet-ink ${
                    full ? "text-2xl font-semibold leading-[1.25]" : "text-lg font-semibold leading-[1.3]"
                  }`}
                >
                  {role.title}
                  {role.organization && <span className="font-normal text-quiet-muted">, {role.organization}</span>}
                </h3>
                {/* One point reads as a sentence; more than one, as a list */}
                {points.length === 1 && (
                  <p className="mt-2 max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">{points[0]}</p>
                )}
                {points.length > 1 && (
                  <ul className="mt-2 flex max-w-[62ch] list-disc flex-col gap-2 pl-5 text-lg leading-[1.55] text-quiet-ink marker:text-quiet-muted">
                    {points.map((point) => (
                      <li key={point} className="text-pretty">{point}</li>
                    ))}
                  </ul>
                )}
                {role.link && isLive(role.link.href) && (
                  <p className={full ? "mt-2 text-lg leading-[1.55]" : "text-base leading-[1.55]"}>
                    <a href={role.link.href} className={LINK}>{role.link.label}</a>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
