# PLAN.md

## Goal

Build and ship "The Career Line" portfolio — a Next.js site hosted on Vercel and
version-controlled on GitHub — as a maintainable, evolving replacement for the Claude
Design standalone export.

## Phases

- [x] Phase 1: Scaffold & tooling

  Stood up the Next.js 16 (App Router, TypeScript, Tailwind v4, ESLint) project at the repo
  root, initialized git, created the GitHub repo (github.com/ux-tom/career-line-portfolio),
  and linked/deployed the Vercel project. Design tokens (`--ink`, `--paper`, `--accent`,
  `--line-length`) are defined in `app/globals.css` via Tailwind v4 `@theme`, Space Grotesk +
  Space Mono are wired via `next/font/google`, and base metadata/OpenGraph is set in
  `layout.tsx`. Known gap: Vercel's GitHub Git-integration auto-connect failed (needs a
  one-time authorization in the Vercel dashboard, not completable from the CLI) — flagged
  to the user; deploys work via `vercel` CLI in the meantime, and Phase 6 will confirm the
  Git integration is finished before calling the project shippable.
  Code review: Passed. Fixed a stale placeholder in `metadataBase` (layout.tsx) to point at
  the real deployed URL instead of a `your-portfolio.vercel.app` placeholder.

- [x] Phase 2: Data layer & config

  Created `data/caseStudies.ts` (typed `CaseStudy[]`, the 4 placeholder stops — Support
  Triage AI, Onboarding Rebuild, Checkout Copilot, DesignOps Agent) and `data/site.ts`
  (identity/contact placeholders, hero/about/skills copy written from the brief, 3
  placeholder testimonials, and `journey.stopSpacingVw` for the Phase 3 scroll mechanic).
  Every case study carries a KPI teaser, full KPI set, exactly 3 process steps (enforced by
  a tuple type), summary, and meta. Adding a stop is appending one object to the array — no
  layout code involved.
  Code review: Passed. `tsc --noEmit` and `npm run lint` both clean; no components consume
  this data yet (that's Phase 3/4), so nothing else to verify at this stage.

- [ ] Phase 3: The Career Line (core mechanic)

  Build the sticky, scroll-driven horizontal timeline: vertical scroll progress maps to
  `translateX` across `--line-length`; stops show always-visible KPI teaser chips and
  expand inline on click (summary, process steps, full KPIs, project-shot placeholder,
  meta). Layout must absorb N stops and end with "Next stop: your project →" into Contact.
  Done when scroll-driven travel is smooth, expand/collapse works, and
  `prefers-reduced-motion` is respected.

- [ ] Phase 4: Supporting sections

  Build Hero, About (holistic/systematic positioning + the three AI meanings + CV
  download), Skills & Process (3 cards + Discover→Design→Deliver→Measure loop strip),
  Testimonials (3 placeholder quotes), and Contact ("Next stop: your project." + footer
  links). Done when the full page reads top-to-bottom on desktop with all placeholder
  content in place.

- [ ] Phase 5: Responsive, a11y & performance

  Add a vertical stacked fallback for the Career Line below the mobile breakpoint (the
  horizontal mechanic stays desktop-only), verify reduced-motion, keyboard focus, semantic
  landmarks, and alt text, and add favicon + generated `opengraph-image`. Run a Lighthouse
  pass via the chrome-devtools MCP. Done when mobile and desktop are both clean with no
  console errors and good Core Web Vitals.

- [ ] Phase 6: Ship

  Push to GitHub `main` and confirm Vercel's production deploy from the connected repo
  (preview-on-PR, promote-to-prod). Optionally attach a custom domain. Done when there is a
  live production URL and auto-deploy on push is confirmed working.
