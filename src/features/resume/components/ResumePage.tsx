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
        className="relative z-10 mx-auto grid w-full max-w-[1120px] content-start gap-[clamp(16px,2vw,22px)] overflow-visible px-[clamp(20px,4vw,36px)] py-[clamp(20px,4vw,36px)] lg:min-h-screen lg:p-[30px] print:w-[1024px] print:p-[30px]"
        aria-labelledby="resume-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.035),transparent_28%),radial-gradient(circle_at_100%_45%,rgba(255,49,41,0.07),transparent_20rem)]"
          aria-hidden="true"
        />

        <header className="relative z-10 grid items-start gap-6 pt-1 md:grid-cols-[minmax(0,1fr)_300px] md:gap-[30px] lg:min-h-[238px] lg:grid-cols-[minmax(0,1fr)_306px]">
          <HeroSection profile={content.profile} />
          <OutSystemsBadge />
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

        <blockquote className="relative z-10 flex flex-wrap items-center justify-center gap-1 rounded-lg border border-resume-line bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008)),var(--color-resume-panel)] p-[18px] text-center text-[clamp(1.05rem,4vw,1.55rem)] font-extrabold text-resume-muted shadow-resume-panel">
          <span
            className="text-[2.2rem] leading-[0.8] font-[850] text-resume-red"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          {content.quote}
          <span
            className="text-[2.2rem] leading-[0.8] font-[850] text-resume-red"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </blockquote>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-[10px] text-center text-[0.92rem] text-[#d8e0e7]">
          <span
            className="h-2.5 w-2.5 rounded-full bg-resume-green shadow-[0_0_0_6px_rgba(32,214,107,0.12)]"
            aria-hidden="true"
          />
          <span>{content.availability}</span>
          <span aria-hidden="true">/</span>
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
