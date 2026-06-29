import { cn } from "@/lib/cn";

import type { ResumeIconName } from "../types";
import shellStyles from "../styles/resume-shell.module.css";
import visualStyles from "../styles/resume-visuals.module.css";

type SectionHeadingProps = Readonly<{
  icon: ResumeIconName | "code";
  children: React.ReactNode;
}>;

export function SectionHeading({ icon, children }: SectionHeadingProps) {
  return (
    <h2 className={shellStyles.sectionHeading}>
      {icon === "code" ? (
        <span className={shellStyles.codeIcon} aria-hidden="true">
          &lt;/&gt;
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(shellStyles.icon, visualStyles[icon])}
        />
      )}
      {children}
    </h2>
  );
}
