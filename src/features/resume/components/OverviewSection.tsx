import { SectionHeading } from "./SectionHeading";

type OverviewSectionProps = Readonly<{
  summary: string[];
  expertise: string[];
  domains: string[];
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

export function OverviewSection({
  summary,
  expertise,
  domains,
}: OverviewSectionProps) {
  return (
    <section
      className="relative z-10 grid gap-[14px] md:grid-cols-[1fr_1.1fr] lg:grid-cols-[minmax(0,31fr)_minmax(0,40fr)_minmax(0,29fr)]"
      aria-label="Profile overview"
    >
      <article className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:p-5">
        <SectionHeading icon="summary">Professional Summary</SectionHeading>
        <div className="grid gap-[14px]">
          {summary.map((paragraph) => (
            <p
              className="mt-0 text-[0.94rem] leading-[1.65] text-resume-muted"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel lg:border-l lg:pt-5 lg:pr-5 lg:pb-5 lg:pl-[18px]">
        <SectionHeading icon="code">Core Expertise</SectionHeading>
        <ul className="m-0 grid list-none gap-[10px] p-0 md:grid-cols-2">
          {expertise.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </article>

      <article className="rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] shadow-resume-panel md:col-span-2 lg:col-span-1 lg:border-l lg:pt-5 lg:pr-5 lg:pb-5 lg:pl-[18px]">
        <SectionHeading icon="domain">Domain Knowledge</SectionHeading>
        <ul className="m-0 grid list-none gap-[9px] p-0">
          {domains.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </article>
    </section>
  );
}
