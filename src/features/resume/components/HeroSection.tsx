import { resumeSurfaceStrongClass } from "../styles";
import type { ResumeProfile } from "../types";

type HeroSectionProps = Readonly<{
  profile: ResumeProfile;
}>;

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <div className="min-w-0">
      <h1
        id="resume-title"
        className="mt-0 mb-3 max-w-[10ch] text-[clamp(2.35rem,14vw,4.9rem)] leading-[0.92] font-[850] sm:mb-5 sm:max-w-[13ch] lg:text-[4.75rem]"
      >
        {profile.name}
      </h1>
      <p className="m-0 mb-3.5 text-[clamp(1rem,4.4vw,1.5rem)] leading-[1.2] font-[850] text-resume-red sm:mb-5">
        {profile.role}
      </p>
      <p className="m-0 mb-4 flex max-w-[38rem] flex-wrap items-center gap-x-2.5 gap-y-2.5 text-[clamp(0.92rem,3vw,1.08rem)] leading-[1.35] text-[#d9e0e6] sm:mb-5 sm:gap-x-4 sm:gap-y-3">
        {profile.highlights.map((item, index) => (
          <span
            key={item}
            className={`inline-flex items-center gap-2.5 rounded-full px-3 py-1 text-[0.88rem] font-semibold sm:gap-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-inherit sm:font-normal ${resumeSurfaceStrongClass}`}
          >
            {index > 0 ? (
              <span
                className="hidden h-1 w-1 rounded-full bg-[#b7bec3] sm:inline-block"
                aria-hidden="true"
              />
            ) : null}
            {item}
          </span>
        ))}
      </p>
      <p className="m-0 max-w-[760px] text-[clamp(0.96rem,2.7vw,1.08rem)] leading-[1.62] text-[#eef2f5] sm:leading-[1.7]">
        {profile.bio}
      </p>
    </div>
  );
}
