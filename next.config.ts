import type { NextConfig } from "next";

function getBasePath() {
  const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

  if (explicitBasePath) {
    return explicitBasePath.startsWith("/")
      ? explicitBasePath
      : `/${explicitBasePath}`;
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

  if (process.env.GITHUB_ACTIONS && repositoryName) {
    return `/${repositoryName}`;
  }

  return "";
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
