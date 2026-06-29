export type ResumeUiIconKey =
  | "analytics"
  | "api"
  | "apps"
  | "availability"
  | "car"
  | "certification"
  | "cloud"
  | "code"
  | "database"
  | "domain"
  | "email"
  | "experience"
  | "externalLink"
  | "globe"
  | "info"
  | "languages"
  | "location"
  | "stack"
  | "summary";

export type BrandAssetKey =
  | "amazonwebservices"
  | "azure"
  | "css3"
  | "docker"
  | "git"
  | "github"
  | "html5"
  | "javascript"
  | "linkedin"
  | "outsystemsLogo"
  | "outsystemsLogoMainColor"
  | "postgresql"
  | "react";

export type ResumeGraphic =
  | {
      type: "brand";
      key: BrandAssetKey;
    }
  | {
      type: "ui";
      key: ResumeUiIconKey;
    };

export type CompanyLogoVariant =
  | "police"
  | "ngs"
  | "horne"
  | "santander"
  | "oil"
  | "personas";

export type ContactLink = {
  label: string;
  value: string;
  href?: string;
  icon: ResumeGraphic;
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
  icon: ResumeGraphic;
};

export type ResumeFact = {
  text: string;
  icon: ResumeUiIconKey;
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
