import type { ResumeFact, TechItem } from "../types";
import { BrandAsset } from "./BrandAsset";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

type QualificationsAsideProps = Readonly<{
  certifications: string[];
  stack: TechItem[];
  facts: ResumeFact[];
}>;

function CheckItem({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <li className="flex gap-2.5 text-[0.91rem] leading-[1.35] text-[#dde4ea]">
      <span
        className="mt-[0.08em] grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border-[1.5px] border-resume-red text-[0.54rem] leading-none font-[850] text-resume-red"
        aria-hidden="true"
      >
        &#10003;
      </span>
      <span>{children}</span>
    </li>
  );
}

export function QualificationsAside({
  certifications,
  stack,
  facts,
}: QualificationsAsideProps) {
  return (
    <aside
      className="relative z-10 grid gap-[14px]"
      aria-label="Additional qualifications"
    >
      <section className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:p-5">
        <SectionHeading icon="certification">Certifications</SectionHeading>

        <div
          className="mb-2 flex items-center justify-center gap-[10px]"
          aria-hidden="true"
        >
          <BrandAsset
            asset="outsystemsLogo"
            className="h-auto w-full max-w-[148px]"
            decorative
            height={36}
            width={148}
          />
        </div>
        <p className="mt-0 mb-0 text-center text-[0.95rem] leading-[1.2] font-[850] text-resume-red">
          EXPERT DEVELOPER
        </p>
        <p
          className="mt-[9px] mb-4 text-center font-mono text-[1.25rem] leading-none text-resume-red [word-spacing:0.28em]"
          aria-label="Three star certification"
        >
          <span aria-hidden="true">&#9733; &#9733; &#9733;</span>
        </p>

        <ul className="m-0 grid list-none gap-[9px] p-0">
          {certifications.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:p-5">
        <SectionHeading icon="stack">Technical Stack</SectionHeading>

        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 md:grid-cols-3">
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

      <section className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:p-5">
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
