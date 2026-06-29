# Christian Rodriguez Resume

Static resume site built with Next.js App Router and exported for GitHub Pages.

## Quick start

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Project shape

The codebase is intentionally split so a new developer can find the right file fast:

```text
src/
  app/
    layout.tsx              # global metadata, fonts, document shell
    page.tsx                # thin route entrypoint
    globals.css             # app-wide resets only
  features/resume/
    components/             # presentational sections and small UI primitives
    content/                # resume copy and structured data
    styles/                 # resume-specific CSS modules
    types.ts                # shared resume types
  lib/
    cn.ts                   # tiny className helper
    site.ts                 # site metadata and external URLs
```

## Where to edit

- Update resume text and links in `src/features/resume/content/resume-content.ts`.
- Update layout or metadata in `src/app/layout.tsx` and `src/lib/site.ts`.
- Update section structure in `src/features/resume/components/`.
- Update visuals in `src/features/resume/styles/`.

## Scripts

- `npm run dev` starts local development.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run build` creates the static export in `out/`.
- `npm run check` runs lint, typecheck, and build together.

## GitHub Pages

The site deploys through `.github/workflows/pages.yml`.

- Production builds use `output: "export"` and `trailingSlash: true`.
- `NEXT_PUBLIC_BASE_PATH` is used for project-site deployments.
- `NEXT_PUBLIC_SITE_URL` drives metadata and social URLs.

If the repository name changes, the workflow still builds the correct base path on GitHub Actions.

## Notes for maintainers

- Keep `src/app/page.tsx` thin. Route files should compose features, not hold all content and styling logic.
- Keep resume content centralized in `resume-content.ts` instead of scattering strings across components.
- Prefer adding small section components over growing a single page file.
