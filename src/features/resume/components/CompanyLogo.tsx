import { cn } from "@/lib/cn";

import type { Experience } from "../types";
import shellStyles from "../styles/resume-shell.module.css";
import visualStyles from "../styles/resume-visuals.module.css";

type CompanyLogoProps = Readonly<{
  job: Experience;
}>;

export function CompanyLogo({ job }: CompanyLogoProps) {
  if (job.logoVariant === "personas") {
    return (
      <div
        className={cn(shellStyles.logo, visualStyles.personas)}
        aria-label="Personas and Bancolombia logo"
      >
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div
      className={cn(shellStyles.logo, visualStyles[job.logoVariant])}
      aria-label={`${job.company} logo`}
    >
      {job.logoText}
      {job.logoVariant === "horne" ? <small>ENTREPRENEURS</small> : null}
    </div>
  );
}
