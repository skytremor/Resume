import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.socialDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "profile",
    images: [
      {
        url: siteConfig.socialImage,
        width: 1024,
        height: 1536,
        alt: "Christian Rodriguez OutSystems Expert Developer resume preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.socialDescription,
    images: [siteConfig.socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
