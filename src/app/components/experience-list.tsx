import type { Role } from "@/app/types";

type ExperienceListProps = {
  title: string,
  roles: Role[],
};

// Roles as a ledger, ruled like Selected work so the two pages read as one site: when in its own
// column first, then the role, where, and what came of it. On phones the dates go above the role. Nothing here links to a page of its own, so there's no hover and no picture
export default function ExperienceList({ title, roles }: ExperienceListProps) {
  return (
    <section>
      <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        {title}
      </h2>
      <ul className="flex flex-col divide-y divide-quiet-rule border-y border-quiet-rule">
        {roles.map((role) => (
          <li key={role.title + role.organization} className="grid gap-x-6 gap-y-1 py-5 md:grid-cols-[9rem_minmax(0,1fr)]">
            {/* When, in ink. Without dates, it still holds the first column from md up, but takes no
                line on phones */}
            <span className={`pt-1.5 font-sans text-base font-medium leading-[1.3] text-quiet-ink ${role.dates ? "" : "hidden md:block"}`}>
              {role.dates}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink">{role.title}</h3>
              {role.organization && <p className="text-lg leading-[1.55] text-quiet-ink">{role.organization}</p>}
              {/* One point reads as a sentence; more than one, as a list */}
              {!role.points?.length ? null : role.points.length === 1 ? (
                <p className="mt-2 max-w-[62ch] text-lg leading-[1.55] text-quiet-muted text-pretty">{role.points[0]}</p>
              ) : (
                <ul className="mt-2 flex max-w-[62ch] list-disc flex-col gap-2 pl-5 text-lg leading-[1.55] text-quiet-muted marker:text-quiet-rule">
                  {role.points.map((point) => (
                    <li key={point} className="text-pretty">{point}</li>
                  ))}
                </ul>
              )}
              {role.link && (
                <a
                  href={role.link.href}
                  className="mt-2 self-start text-lg leading-[1.55] text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {role.link.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
