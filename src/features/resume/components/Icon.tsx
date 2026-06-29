import { cn } from "@/lib/cn";

import type { ResumeIconName } from "../types";
import shellStyles from "../styles/resume-shell.module.css";
import visualStyles from "../styles/resume-visuals.module.css";

type IconProps = Readonly<{
  name: ResumeIconName;
  className?: string;
}>;

export function Icon({ name, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(shellStyles.icon, visualStyles[name], className)}
    />
  );
}
