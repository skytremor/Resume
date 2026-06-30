# skytremor.github.io

Christian Rodriguez's static resume site, built with Next.js App Router and exported for GitHub Pages.

Source repo: `skytremor/skytremor.github.io`
Live profile target: `https://skytremor.github.io/`

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
    globals.css             # Tailwind import, theme tokens, and global base rules
  features/resume/
    components/             # presentational sections with colocated Tailwind styling
    content/                # resume copy and structured data
    graphic-registry.ts     # typed UI icon and brand asset mappings
    types.ts                # shared resume types
  lib/
    cn.ts                   # tiny className helper
    site.ts                 # site metadata and external URLs
  public/brands/            # checked-in SVG brand assets used by the resume
```

## Where to edit

- Update resume text and links in `src/features/resume/content/resume-content.ts`.
- Update layout or metadata in `src/app/layout.tsx` and `src/lib/site.ts`.
- Update section structure in `src/features/resume/components/`.
- Update visuals directly in the relevant component JSX via Tailwind classes.
- Update vendored logos in `public/brands/` and the corresponding registry entries in `src/features/resume/graphic-registry.ts`.

## Scripts

- `npm run dev` starts local development.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run build` creates the static export in `out/`.
- `npm run check` runs lint, typecheck, and build together.

## GitHub Pages

- The generated site is valid for both project Pages and the root user site.
- The canonical production profile is `https://skytremor.github.io/`.
- Root-site deploys should export with `NEXT_PUBLIC_SITE_URL=https://skytremor.github.io` and no base path.
- The included workflow builds from source and deploys `out/` directly to GitHub Pages.
- When the repository name is `skytremor.github.io`, the workflow publishes the root user site with no base path.
- When the repository name is anything else, the workflow falls back to project Pages behavior and publishes under `/${repository-name}`.
- `.nojekyll` is included so GitHub Pages serves `/_next` assets correctly.

## Brand asset policy

- OutSystems assets come from the official SVG press kit first; PNG and JPG files are fallback exports only.
- Devicon is the default source for shipped technology logos such as HTML5, CSS3, JavaScript, Git, Docker, Azure, and PostgreSQL.
- Simple Icons is used for shipped brand marks where it is the best local source, such as GitHub.
- When a requested brand is not available from the preferred source, use the closest approved local asset or a Lucide fallback instead of loading remote media at runtime.
- Keep all shipped brand assets checked into `public/brands/`; do not hotlink CDN or vendor URLs from the UI.

## Notes for maintainers

- Keep `src/app/page.tsx` thin. Route files should compose features, not hold all content and styling logic.
- Keep resume content centralized in `resume-content.ts` instead of scattering strings across components.
- Prefer adding small section components over growing a single page file.
