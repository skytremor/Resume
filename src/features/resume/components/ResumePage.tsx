import { siteConfig } from "@/lib/site";

import type { ResumeContent } from "../types";
import { ContactList } from "./ContactList";
import { ExperienceSection } from "./ExperienceSection";
import { HeroSection } from "./HeroSection";
import { OutSystemsBadge } from "./OutSystemsBadge";
import { OverviewSection } from "./OverviewSection";
import { QualificationsAside } from "./QualificationsAside";
import shellStyles from "../styles/resume-shell.module.css";

type ResumePageProps = Readonly<{
  content: ResumeContent;
}>;

export function ResumePage({ content }: ResumePageProps) {
  return (
    <main className={shellStyles.pageShell} aria-label="Christian Rodriguez resume">
      <section className={shellStyles.resumeCanvas} aria-labelledby="resume-title">
        <div className={shellStyles.dotField} aria-hidden="true" />

        <header className={shellStyles.hero}>
          <HeroSection profile={content.profile} />
          <OutSystemsBadge />
        </header>

        <ContactList contacts={content.contacts} />

        <OverviewSection
          domains={content.domains}
          expertise={content.expertise}
          summary={content.profile.summary}
        />

        <section className={shellStyles.bodyGrid} aria-label="Resume details">
          <ExperienceSection experiences={content.experiences} />
          <QualificationsAside
            certifications={content.certifications}
            facts={content.facts}
            stack={content.stack}
          />
        </section>

        <blockquote className={shellStyles.quote}>
          <span className={shellStyles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          {content.quote}
          <span className={shellStyles.quoteMark} aria-hidden="true">
            &rdquo;
          </span>
        </blockquote>

        <footer className={shellStyles.footer}>
          <span className={shellStyles.statusDot} aria-hidden="true" />
          <span>{content.availability}</span>
          <span aria-hidden="true">/</span>
          <strong className={shellStyles.footerHighlight}>
            Let&apos;s build the future, together.
          </strong>
          <a href={siteConfig.githubProfileUrl}>GitHub</a>
        </footer>
      </section>
    </main>
  );
}
