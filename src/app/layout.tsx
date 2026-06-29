import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

import "./globals.css";

const socialImages = undefined;

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
    images: socialImages,
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.socialDescription,
    images: socialImages,
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
