import { cn } from "@/lib/cn";

import { resumePanelClass } from "../styles";
import type { ResumeFact, TechItem } from "../types";
import { CheckItem } from "./CheckItem";
import { Icon } from "./Icon";
import { OutSystemsBadge } from "./OutSystemsBadge";
import { SectionHeading } from "./SectionHeading";

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
  const visibleCertifications = certifications.slice(0, 4);
  const hiddenCertifications = certifications.slice(4);

  return (
    <aside
      className="relative z-10 grid gap-[14px]"
      aria-label="Additional qualifications"
    >
      <section className={cn(resumePanelClass, "p-[18px] lg:p-5")}>
        <SectionHeading icon="certification">
          Certifications &amp; Specializations
        </SectionHeading>

        <div className="mb-4">
          <div className="relative aspect-[384/488] w-full max-w-[9.5rem] shrink-0 overflow-visible sm:max-w-42">
            <OutSystemsBadge compact />
          </div>
        </div>

        <ul className="m-0 grid list-none gap-[9px] p-0">
          {visibleCertifications.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>

        {hiddenCertifications.length > 0 ? (
          <details className="mt-3">
            <summary className="cursor-pointer text-[0.84rem] font-extrabold text-resume-red">
              See {hiddenCertifications.length} more
            </summary>

            <ul className="mt-3 grid list-none gap-[9px] p-0">
              {hiddenCertifications.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </details>
        ) : null}
      </section>

      <section className={cn(resumePanelClass, "p-[18px] lg:p-5")}>
        <SectionHeading icon="stack">Technical Stack</SectionHeading>

        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(82px,1fr))] gap-x-3 gap-y-4 p-0">
          {stack.map((item) => (
            <li
              className="grid min-h-[68px] min-w-0 content-start justify-items-center gap-[7px] text-center text-[0.78rem] font-bold text-[#eef2f4]"
              key={item.label}
            >
              <Icon graphic={item.icon} size="stack" />
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(resumePanelClass, "p-[18px] lg:p-5")}>
        <SectionHeading icon="info">Other Info</SectionHeading>

        <ul className="m-0 grid list-none gap-[9px] p-0">
          {facts.map((item) => (
            <li
              className="flex min-w-0 items-center gap-[10px] text-[0.91rem] leading-[1.35] text-[#dde4ea]"
              key={item.text}
            >
              <Icon graphic={{ type: "ui", key: item.icon }} />
              {item.text}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
