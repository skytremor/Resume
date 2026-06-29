import { siteConfig } from "@/lib/site";

import type { ResumeContent } from "../types";
import { AnimatedMeshBackground } from "./AnimatedMeshBackground";
import { ContactList } from "./ContactList";
import { ExperienceSection } from "./ExperienceSection";
import { HeroSection } from "./HeroSection";
import { Icon } from "./Icon";
import { OutSystemsBadge } from "./OutSystemsBadge";
import { OverviewSection } from "./OverviewSection";
import { QualificationsAside } from "./QualificationsAside";

type ResumePageProps = Readonly<{
  content: ResumeContent;
}>;

export function ResumePage({ content }: ResumePageProps) {
  return (
    <main
      className="relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_10%_4%,rgba(255,49,41,0.12),transparent_22rem),radial-gradient(circle_at_94%_20%,rgba(32,214,107,0.08),transparent_20rem),#000]"
      aria-label="Christian Rodriguez resume"
    >
      <AnimatedMeshBackground />
      <section
        className="relative z-10 mx-auto grid w-full max-w-[1120px] content-start gap-[clamp(14px,2vw,22px)] overflow-visible px-[clamp(16px,4vw,36px)] py-[clamp(16px,4vw,36px)] lg:min-h-screen lg:p-[30px] print:w-[1024px] print:p-[30px]"
        aria-labelledby="resume-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.035),transparent_28%),radial-gradient(circle_at_100%_45%,rgba(255,49,41,0.07),transparent_20rem)]"
          aria-hidden="true"
        />

        <header className="relative z-10 grid items-start gap-5 pt-1 sm:gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-[30px] lg:min-h-[238px] lg:grid-cols-[minmax(0,1fr)_306px]">
          <HeroSection profile={content.profile} />
          <div className="relative aspect-[384/488] w-full max-w-[11.5rem] shrink-0 justify-self-center overflow-visible sm:max-w-[12.75rem] md:max-w-50 md:justify-self-end">
            <OutSystemsBadge />
          </div>
        </header>

        <ContactList contacts={content.contacts} />

        <OverviewSection
          domains={content.domains}
          expertise={content.expertise}
          summary={content.profile.summary}
        />

        <section
          className="relative z-10 grid gap-[14px] lg:grid-cols-[minmax(0,1fr)_312px] lg:items-start"
          aria-label="Resume details"
        >
          <ExperienceSection experiences={content.experiences} />
          <QualificationsAside
            certifications={content.certifications}
            facts={content.facts}
            stack={content.stack}
          />
        </section>

        <blockquote className="relative z-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] px-4 py-[16px] text-center text-[clamp(0.98rem,4vw,1.55rem)] font-extrabold text-resume-muted shadow-resume-panel sm:p-[18px]">
          <span
            className="text-[1.9rem] leading-[0.8] font-[850] text-resume-red sm:text-[2.2rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          {content.quote}
          <span
            className="text-[1.9rem] leading-[0.8] font-[850] text-resume-red sm:text-[2.2rem]"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </blockquote>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-x-[10px] gap-y-2 text-center text-[0.9rem] text-[#d8e0e7] sm:text-[0.92rem]">
          <span
            className="h-2.5 w-2.5 rounded-full bg-resume-green shadow-[0_0_0_6px_rgba(32,214,107,0.12)]"
            aria-hidden="true"
          />
          <span>{content.availability}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            /
          </span>
          <strong className="text-resume-red">
            Let&apos;s build the future, together.
          </strong>
          <a
            className="inline-flex items-center gap-2 text-[#eef2f5] no-underline hover:text-white print:no-underline"
            href={siteConfig.githubProfileUrl}
          >
            <Icon graphic={{ type: "brand", key: "github" }} />
            GitHub
            <Icon graphic={{ type: "ui", key: "externalLink" }} />
          </a>
        </footer>
      </section>
    </main>
  );
}
