import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CarFront,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Globe,
  Landmark,
  Languages,
  Mail,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  TimerReset,
  UserRound,
  Workflow,
} from "lucide-react";

import type { BrandAssetKey, ResumeUiIconKey } from "./types";

export type BrandAssetSpec = {
  alt: string;
  src: string;
  width: number;
  height: number;
  layout?: "square" | "wide";
  tone?: "default" | "light-on-dark";
};

export const uiIconRegistry: Record<ResumeUiIconKey, LucideIcon> = {
  analytics: BarChart3,
  apps: AppWindow,
  availability: TimerReset,
  car: CarFront,
  certification: Award,
  cloud: Cloud,
  code: Code2,
  database: Database,
  domain: Landmark,
  email: Mail,
  experience: BriefcaseBusiness,
  externalLink: ExternalLink,
  globe: Globe,
  info: ShieldCheck,
  languages: Languages,
  location: MapPin,
  stack: MonitorSmartphone,
  summary: UserRound,
  api: Workflow,
};

export const brandAssetRegistry: Record<BrandAssetKey, BrandAssetSpec> = {
  amazonwebservices: {
    alt: "Amazon Web Services logo",
    src: "/brands/devicon/amazonwebservices.svg",
    width: 128,
    height: 128,
    layout: "wide",
  },
  azure: {
    alt: "Azure logo",
    src: "/brands/devicon/azure.svg",
    width: 128,
    height: 128,
  },
  css3: {
    alt: "CSS3 logo",
    src: "/brands/devicon/css3.svg",
    width: 128,
    height: 128,
  },
  docker: {
    alt: "Docker logo",
    src: "/brands/devicon/docker.svg",
    width: 128,
    height: 128,
    layout: "wide",
  },
  git: {
    alt: "Git logo",
    src: "/brands/devicon/git.svg",
    width: 128,
    height: 128,
  },
  github: {
    alt: "GitHub logo",
    src: "/brands/simple-icons/github.svg",
    width: 24,
    height: 24,
    tone: "light-on-dark",
  },
  html5: {
    alt: "HTML5 logo",
    src: "/brands/devicon/html5.svg",
    width: 128,
    height: 128,
  },
  javascript: {
    alt: "JavaScript logo",
    src: "/brands/devicon/javascript.svg",
    width: 128,
    height: 128,
  },
  linkedin: {
    alt: "LinkedIn logo",
    src: "/brands/devicon/linkedin.svg",
    width: 128,
    height: 128,
  },
  outsystemsLogo: {
    alt: "OutSystems logo",
    src: "/brands/outsystems/logo.svg",
    width: 400,
    height: 100,
    layout: "wide",
  },
  outsystemsLogoMainColor: {
    alt: "OutSystems main color logo",
    src: "/brands/outsystems/logo-main-color.svg",
    width: 400,
    height: 100,
    layout: "wide",
  },
  postgresql: {
    alt: "PostgreSQL logo",
    src: "/brands/devicon/postgresql.svg",
    width: 128,
    height: 128,
  },
  react: {
    alt: "React logo",
    src: "/brands/devicon/react.svg",
    width: 128,
    height: 128,
  },
};
