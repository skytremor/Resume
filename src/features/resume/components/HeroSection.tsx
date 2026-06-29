import type { ResumeProfile } from "../types";

type HeroSectionProps = Readonly<{
  profile: ResumeProfile;
}>;

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <div className="min-w-0">
      <h1
        id="resume-title"
        className="mt-0 mb-2 max-w-[13ch] text-[clamp(2.65rem,14vw,4.9rem)] leading-[0.92] font-[850] lg:text-[4.75rem]"
      >
        {profile.name}
      </h1>
      <p className="m-0 mb-[10px] text-[clamp(1.12rem,4.4vw,1.5rem)] leading-[1.2] font-[850] text-resume-red">
        {profile.role}
      </p>
      <p className="m-0 mb-4 flex max-w-[38rem] flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(0.96rem,3vw,1.08rem)] leading-[1.35] text-[#d9e0e6]">
        {profile.highlights.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-3">
            {index > 0 ? (
              <span
                className="h-1 w-1 rounded-full bg-[#b7bec3]"
                aria-hidden="true"
              />
            ) : null}
            {item}
          </span>
        ))}
      </p>
      <p className="m-0 max-w-[760px] text-[clamp(0.98rem,2.7vw,1.08rem)] leading-[1.7] text-[#eef2f5]">
        {profile.bio}
      </p>
    </div>
  );
}
