import { siteConfig } from "@/lib/site";

import type { Experience } from "../types";
import { CompanyLogo } from "./CompanyLogo";
import { SectionHeading } from "./SectionHeading";
import shellStyles from "../styles/resume-shell.module.css";

type ExperienceSectionProps = Readonly<{
  experiences: Experience[];
}>;

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className={shellStyles.panel} aria-label="Professional experience">
      <SectionHeading icon="briefcase">Professional Experience</SectionHeading>

      <div className={shellStyles.timeline}>
        {experiences.map((job) => (
          <article className={shellStyles.job} key={`${job.year}-${job.company}`}>
            <div className={shellStyles.year} aria-label={`${job.year} ${job.period ?? ""}`}>
              <strong>{job.year}</strong>
              {job.period ? <span>{job.period}</span> : null}
            </div>

            <CompanyLogo job={job} />

            <div className={shellStyles.jobCopy}>
              <h3>
                {job.company}
                <span>{job.role}</span>
              </h3>
              <p className={shellStyles.bodyCopy}>{job.summary}</p>
              <ul className={shellStyles.tags} aria-label={`${job.company} skills`}>
                {job.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <a className={shellStyles.githubButton} href={siteConfig.githubProfileUrl}>
        View more on GitHub
        <span aria-hidden="true">-</span>
      </a>
    </section>
  );
}
