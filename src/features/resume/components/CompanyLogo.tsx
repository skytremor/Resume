import { cn } from "@/lib/cn";

import type { Experience } from "../types";

type CompanyLogoProps = Readonly<{
  job: Experience;
}>;

export function CompanyLogo({ job }: CompanyLogoProps) {
  const baseClassName =
    "grid min-h-[58px] place-items-center self-start justify-self-center text-center font-mono text-white md:col-start-2 md:row-start-1";

  if (job.logoVariant === "personas") {
    return (
      <div
        className={cn(baseClassName, "relative h-[55px] w-[55px]")}
        aria-label="Personas and Bancolombia logo"
      >
        <span className="absolute left-[5px] top-2 h-[15px] w-[45px] skew-y-[-9deg] rounded-[3px] border border-[rgba(255,255,255,0.55)] bg-[#244fb2]" />
        <span className="absolute left-[5px] top-[23px] h-[15px] w-[45px] skew-y-[-9deg] rounded-[3px] border border-[rgba(255,255,255,0.55)] bg-[#f1d21d]" />
        <span className="absolute left-[5px] top-[38px] h-[15px] w-[45px] skew-y-[-9deg] rounded-[3px] border border-[rgba(255,255,255,0.55)] bg-[#ef2a1f]" />
      </div>
    );
  }

  if (job.logoVariant === "oil") {
    return (
      <div
        className={cn(
          baseClassName,
          "h-[58px] w-14 [background:linear-gradient(#fff,#fff)_12px_8px/2px_38px_no-repeat,linear-gradient(#fff,#fff)_33px_8px/2px_38px_no-repeat,linear-gradient(63deg,transparent_46%,#fff_47%_51%,transparent_52%)_8px_11px/31px_35px_no-repeat,linear-gradient(117deg,transparent_46%,#fff_47%_51%,transparent_52%)_8px_11px/31px_35px_no-repeat,linear-gradient(#fff,#fff)_5px_46px/43px_3px_no-repeat,linear-gradient(#fff,#fff)_1px_52px/55px_3px_no-repeat,linear-gradient(90deg,#f26d21,#ff271f)_38px_36px/13px_7px_no-repeat]",
        )}
        aria-label={`${job.company} logo`}
      />
    );
  }

  const variantClassName: Record<
    Exclude<Experience["logoVariant"], "personas" | "oil">,
    string
  > = {
    police:
      "h-[62px] w-[52px] rotate-[8deg] rounded-[45%_45%_48%_48%] border-2 border-[#e0bf27] text-[7px] font-[850] text-[#f5d03d] [background:radial-gradient(circle_at_50%_45%,#223e82_0_30%,transparent_31%),linear-gradient(130deg,#edc733,#1a4e93_42%,#101b4c_43%_73%,#e5bc24_74%)]",
    ngs: "text-[1.55rem] font-[850] italic",
    horne: "text-[1.08rem] font-bold",
    santander:
      "h-11 w-[49px] rounded-[50%_50%_44%_44%] [clip-path:polygon(50%_0,88%_47%,82%_100%,18%_100%,12%_47%)] [background:radial-gradient(ellipse_at_48%_23%,transparent_0_28%,#ff2119_29%_52%,transparent_53%),linear-gradient(135deg,transparent_0_32%,#ff2119_33%_64%,transparent_65%),#ff2119]",
  };

  return (
    <div
      className={cn(baseClassName, variantClassName[job.logoVariant])}
      aria-label={`${job.company} logo`}
    >
      {job.logoText}
      {job.logoVariant === "horne" ? (
        <small className="mt-0.5 block text-[0.28rem] tracking-[1.1px]">
          ENTREPRENEURS
        </small>
      ) : null}
    </div>
  );
}
