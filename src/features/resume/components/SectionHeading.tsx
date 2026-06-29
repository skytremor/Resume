import type { ResumeUiIconKey } from "../types";
import { Icon } from "./Icon";

type SectionHeadingProps = Readonly<{
  icon: ResumeUiIconKey;
  children: React.ReactNode;
}>;

export function SectionHeading({ icon, children }: SectionHeadingProps) {
  return (
    <h2 className="mb-3.75 grid min-h-4.5 grid-cols-[18px_minmax(0,1fr)] items-center gap-x-2.5 text-[0.96rem] leading-[1.22] font-[850] uppercase tracking-[0.04em] text-[#f7fafc]">
      <Icon className="self-center" graphic={{ type: "ui", key: icon }} />
      <span className="block">{children}</span>
    </h2>
  );
}
