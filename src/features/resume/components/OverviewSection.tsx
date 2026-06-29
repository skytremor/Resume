import { SectionHeading } from "./SectionHeading";
import shellStyles from "../styles/resume-shell.module.css";

type OverviewSectionProps = Readonly<{
  summary: string[];
  expertise: string[];
  domains: string[];
}>;

export function OverviewSection({
  summary,
  expertise,
  domains,
}: OverviewSectionProps) {
  return (
    <section className={shellStyles.overview} aria-label="Profile overview">
      <article className={shellStyles.panel}>
        <SectionHeading icon="person">Professional Summary</SectionHeading>
        <div className={shellStyles.copyStack}>
          {summary.map((paragraph) => (
            <p className={shellStyles.bodyCopy} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <article className={shellStyles.panel}>
        <SectionHeading icon="code">Core Expertise</SectionHeading>
        <ul className={shellStyles.checkGrid}>
          {expertise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className={shellStyles.panel}>
        <SectionHeading icon="bank">Domain Knowledge</SectionHeading>
        <ul className={shellStyles.checkList}>
          {domains.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
