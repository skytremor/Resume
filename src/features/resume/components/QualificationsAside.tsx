import { cn } from "@/lib/cn";

import type { ResumeFact, TechItem } from "../types";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";
import shellStyles from "../styles/resume-shell.module.css";
import visualStyles from "../styles/resume-visuals.module.css";

type QualificationsAsideProps = Readonly<{
  certifications: string[];
  stack: TechItem[];
  facts: ResumeFact[];
}>;

export function QualificationsAside({
  certifications,
  stack,
  facts,
}: QualificationsAsideProps) {
  return (
    <aside className={shellStyles.sideStack} aria-label="Additional qualifications">
      <section className={cn(shellStyles.panel, shellStyles.certifications)}>
        <SectionHeading icon="award">Certifications</SectionHeading>

        <div className={shellStyles.miniOs} aria-hidden="true">
          <span className={visualStyles.osMark} />
          <span className={shellStyles.osName}>outsystems</span>
        </div>
        <p className={shellStyles.expertRole}>EXPERT DEVELOPER</p>
        <p className={shellStyles.stars} aria-label="Three star certification">
          <span aria-hidden="true">&#9733; &#9733; &#9733;</span>
        </p>

        <ul className={shellStyles.checkList}>
          {certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={shellStyles.panel}>
        <SectionHeading icon="monitor">Technical Stack</SectionHeading>

        <ul className={shellStyles.stackGrid}>
          {stack.map((item) => (
            <li key={item.label}>
              <span
                aria-hidden="true"
                className={cn(shellStyles.techBadge, visualStyles[item.iconVariant])}
              >
                {item.iconText}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section className={shellStyles.panel}>
        <SectionHeading icon="info">Other Info</SectionHeading>

        <ul className={shellStyles.iconList}>
          {facts.map((item) => (
            <li key={item.text}>
              <Icon name={item.icon} />
              {item.text}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
