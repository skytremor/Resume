import type { Experience } from "../types";
import { CompanyLogo } from "./CompanyLogo";
import { SectionHeading } from "./SectionHeading";

type ExperienceSectionProps = Readonly<{
  experiences: Experience[];
}>;

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section
      className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-4.5adow-resume-panel lg:p-5"
      aria-label="Professional experience"
    >
      <SectionHeading icon="experience">Professional Experience</SectionHeading>

      <div className="relative grid gap-2.5 pl-6.5">
        {experiences.map((job, index) => (
          <article
            className="relative grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-start gap-x-3 gap-y-2.5 rounded-lg border border-[rgba(148,163,184,0.16)] bg-resume-panel-soft p-3.5 md:grid-cols-[70px_76px_minmax(0,1fr)]"
            key={`${job.year}-${job.company}`}
          >
            <span
              aria-hidden="true"
              className="absolute -left-6.25 top-5.5 z-1 h-3 w-3 rounded-full bg-resume-red shadow-[0_0_0_4px_rgba(255,49,41,0.12)]"
            />
            {index < experiences.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-9.5 -left-5 top-7 w-0.5 rounded-full bg-resume-red"
              />
            ) : null}
            <div
              className="col-start-1 row-start-1 text-left text-resume-red"
              aria-label={`${job.year} ${job.period ?? ""}`}
            >
              <strong className="block font-mono text-base leading-none">
                {job.year}
              </strong>
              {job.period ? (
                <span className="mt-1 block text-[0.72rem] font-bold uppercase">
                  {job.period}
                </span>
              ) : null}
            </div>

            <CompanyLogo job={job} />

            <div className="col-start-2 row-span-2 row-start-1 min-w-0 md:col-start-3 md:row-span-1 md:row-start-1">
              <h3 className="mb-1.75 text-base leading-[1.28] text-white">
                {job.company}
                <span className="mt-1 block text-[0.84rem] font-extrabold text-resume-red">
                  {job.role}
                </span>
              </h3>
              <p className="mt-0 text-[0.94rem] leading-[1.65] text-resume-muted">
                {job.summary}
              </p>
              <ul
                className="m-0 flex list-none flex-wrap gap-1.75 p-0"
                aria-label={`${job.company} skills`}
              >
                {job.tags.map((tag) => (
                  <li
                    className="inline-flex min-h-7 items-center rounded-[5px] border border-[rgba(148,163,184,0.18)] bg-[rgba(255,255,255,0.045)] px-2.5 py-1.25 text-[0.78rem] font-bold text-[#e7edf2]"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
