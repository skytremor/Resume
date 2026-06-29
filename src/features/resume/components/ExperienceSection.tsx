import type { Experience } from "../types";
import { CompanyLogo } from "./CompanyLogo";
import { SectionHeading } from "./SectionHeading";

type ExperienceSectionProps = Readonly<{
  experiences: Experience[];
}>;

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section
      className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:p-5"
      aria-label="Professional experience"
    >
      <SectionHeading icon="experience">Professional Experience</SectionHeading>

      <div className="relative grid gap-3 pl-5 sm:pl-6.5">
        {experiences.map((job, index) => (
          <article
            className="relative grid min-w-0 grid-cols-[56px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-2 rounded-lg border border-[rgba(148,163,184,0.16)] bg-resume-panel-soft p-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:p-3.5 md:grid-cols-[70px_76px_minmax(0,1fr)]"
            key={`${job.year}-${job.company}`}
          >
            <span
              aria-hidden="true"
              className="absolute -left-4.75 top-5 z-1 h-2.5 w-2.5 rounded-full bg-resume-red shadow-[0_0_0_4px_rgba(255,49,41,0.12)] sm:-left-6.25 sm:top-5.5 sm:h-3 sm:w-3"
            />
            {index < experiences.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-10 -left-3.5 top-6.5 w-0.5 rounded-full bg-resume-red sm:-bottom-9.5 sm:-left-5 sm:top-7"
              />
            ) : null}
            <div
              className="col-start-1 row-start-1 text-left text-resume-red"
              aria-label={`${job.year} ${job.period ?? ""}`}
            >
              <strong className="block font-mono text-[0.95rem] leading-none sm:text-base">
                {job.year}
              </strong>
              {job.period ? (
                <span className="mt-1 block text-[0.68rem] font-bold uppercase sm:text-[0.72rem]">
                  {job.period}
                </span>
              ) : null}
            </div>

            <CompanyLogo job={job} />

            <div className="col-start-2 row-span-2 row-start-1 min-w-0 md:col-start-3 md:row-span-1 md:row-start-1">
              <h3 className="mb-1.5 text-[0.98rem] leading-[1.28] text-white sm:text-base">
                {job.company}
                <span className="mt-1 block text-[0.8rem] font-extrabold text-resume-red sm:text-[0.84rem]">
                  {job.role}
                </span>
              </h3>
              <p className="mt-0 text-[0.9rem] leading-[1.58] text-resume-muted sm:text-[0.94rem] sm:leading-[1.65]">
                {job.summary}
              </p>
              <ul
                className="m-0 flex list-none flex-wrap gap-1.5 p-0"
                aria-label={`${job.company} skills`}
              >
                {job.tags.map((tag) => (
                  <li
                    className="inline-flex min-h-6.5 items-center rounded-[5px] border border-[rgba(148,163,184,0.18)] bg-[rgba(255,255,255,0.045)] px-2.25 py-1 text-[0.74rem] font-bold text-[#e7edf2] sm:min-h-7 sm:px-2.5 sm:py-1.25 sm:text-[0.78rem]"
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
