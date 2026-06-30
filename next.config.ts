import type { NextConfig } from "next";

function getBasePath() {
  const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

  if (explicitBasePath) {
    return explicitBasePath.startsWith("/")
      ? explicitBasePath
      : `/${explicitBasePath}`;
  }

  const [repositoryOwner, repositoryName] =
    process.env.GITHUB_REPOSITORY?.split("/") ?? [];

  if (process.env.GITHUB_ACTIONS && repositoryName) {
    const rootPagesRepositoryName = repositoryOwner
      ? `${repositoryOwner.toLowerCase()}.github.io`
      : null;

    if (rootPagesRepositoryName === repositoryName.toLowerCase()) {
      return "";
    }

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
  experimental: {
    inlineCss: true,
  },
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
