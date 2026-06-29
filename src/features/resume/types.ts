export type ResumeIconName =
  | "pin"
  | "mail"
  | "linkedin"
  | "github"
  | "person"
  | "bank"
  | "briefcase"
  | "award"
  | "monitor"
  | "info"
  | "headset"
  | "clock"
  | "timer"
  | "car"
  | "language";

export type CompanyLogoVariant =
  | "police"
  | "ngs"
  | "horne"
  | "santander"
  | "oil"
  | "personas";

export type TechIconVariant =
  | "osMark"
  | "html5"
  | "js"
  | "sql"
  | "api"
  | "git"
  | "docker"
  | "azure"
  | "aws"
  | "pg"
  | "powerbi"
  | "ms";

export type ContactLink = {
  label: string;
  value: string;
  href?: string;
  icon: ResumeIconName;
};

export type Experience = {
  year: string;
  period?: string;
  company: string;
  role: string;
  summary: string;
  tags: string[];
  logoVariant: CompanyLogoVariant;
  logoText?: string;
};

export type TechItem = {
  label: string;
  iconVariant: TechIconVariant;
  iconText?: string;
};

export type ResumeFact = {
  text: string;
  icon: ResumeIconName;
};

export type ResumeProfile = {
  name: string;
  role: string;
  highlights: string[];
  bio: string;
  summary: string[];
};

export type ResumeContent = {
  profile: ResumeProfile;
  contacts: ContactLink[];
  expertise: string[];
  domains: string[];
  experiences: Experience[];
  certifications: string[];
  stack: TechItem[];
  facts: ResumeFact[];
  quote: string;
  availability: string;
};
