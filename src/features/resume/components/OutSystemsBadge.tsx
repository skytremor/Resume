import { BrandAsset } from "./BrandAsset";

export function OutSystemsBadge() {
  return (
    <aside
      className="w-full max-w-[320px] rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[22px] text-center shadow-resume-panel"
      aria-label="OutSystems certification"
    >
      <div className="flex items-center justify-center gap-[10px]">
        <BrandAsset
          asset="outsystemsLogo"
          className="h-auto w-full max-w-44"
          decorative
          height={44}
          width={176}
        />
      </div>
      <p className="mt-[22px] mb-0 text-[1.72rem] font-[850]">EXPERT</p>
      <p className="mt-2 mb-0 text-[0.95rem] leading-[1.2] font-[850] text-resume-red">
        EXPERT DEVELOPER
      </p>
      <p
        className="mt-[9px] mb-0 font-mono text-[1.25rem] leading-none text-resume-red [word-spacing:0.28em]"
        aria-label="Three star certification"
      >
        <span aria-hidden="true">&#9733; &#9733; &#9733;</span>
      </p>
      <p className="mt-[9px] mb-0 text-[0.96rem] leading-[1.36] text-[#f6f6f6]">
        OutSystems Certified
        <br />
        Expert Developer
      </p>
    </aside>
  );
}
