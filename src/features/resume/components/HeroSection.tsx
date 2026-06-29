import type { ResumeProfile } from "../types";
import shellStyles from "../styles/resume-shell.module.css";

type HeroSectionProps = Readonly<{
  profile: ResumeProfile;
}>;

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <div className={shellStyles.heroCopy}>
      <h1 id="resume-title">{profile.name}</h1>
      <p className={shellStyles.role}>{profile.role}</p>
      <p className={shellStyles.subline}>
        {profile.highlights.map((item, index) => (
          <span key={item}>
            {index > 0 ? (
              <span className={shellStyles.sublineDivider} aria-hidden="true" />
            ) : null}
            {item}
          </span>
        ))}
      </p>
      <p className={shellStyles.bio}>{profile.bio}</p>
    </div>
  );
}
