const fallbackSiteUrl = "https://skytremor.github.io";

export const siteConfig = {
  name: "Christian Rodriguez Resume",
  title: "Christian Rodriguez - OutSystems Expert Developer",
  description:
    "Christian Rodriguez is an OutSystems Expert Developer specializing in enterprise applications, integrations, workflow automation, and AI implementations.",
  socialDescription:
    "OutSystems Expert Developer resume covering enterprise delivery, integrations, workflow automation, and AI implementations.",
  author: "Christian Rodriguez",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
  githubProfileUrl: "https://github.com/skytremor",
} as const;
