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

- [x] Phase 3: The Career Line (core mechanic)

  Built `components/CareerLine.tsx` (sticky wrapper, ResizeObserver-measured scroll runway,
  rAF-throttled scroll → `translate3d` on the track, driven via direct DOM mutation rather
  than React state to avoid a re-render per scroll frame) and `components/CaseStudyStop.tsx`
  (collapsed KPI-teaser chip that expands inline to summary, 3 process steps, full KPI set,
  project-shot placeholder, and meta). `prefers-reduced-motion` (via a `useSyncExternalStore`
  hook in `lib/useReducedMotion.ts`) swaps the whole mechanic for a plain vertical stack —
  same data, same component, no scroll math — which will double as the Phase 5 mobile
  fallback. Ends with a "Next stop: your project →" link into `#contact`.
  Code review: Passed. Fixed two real issues found during review: (1) `react-hooks/set-state-in-effect`
  lint error in the reduced-motion hook — rewritten with `useSyncExternalStore`, the correct
  primitive for subscribing to external browser state; (2) a `maxWidth: 320` cap that silently
  overrode `site.journey`'s configurable stop width on any normal desktop screen, defeating
  the brief's "line length should stay easily configurable" requirement — replaced the vw+cap
  scheme with plain px constants (`stopWidthPx`/`expandedWidthPx`) that actually govern layout.
  Verified live in Chrome: scroll drives translateX smoothly across the full range, click
  expand/collapse works and the wrapper's scroll runway self-corrects via ResizeObserver, the
  last stop + CTA land together at 100% scroll, reduced-motion renders the clean stacked
  fallback, and the console is error-free throughout.

- [x] Phase 4: Supporting sections

  Built `Hero.tsx`, `About.tsx` (deliberately inverted to a light bg/ink-text section —
  holistic/systematic positioning + the three AI meanings + CV download), `SkillsProcess.tsx`
  (3 cards + Discover→Design→Deliver→Measure loop strip), `Testimonials.tsx` (3 placeholder
  quotes), `Contact.tsx` (`#contact`, "Next stop: your project." + email/intro-call/CV
  buttons), and `Footer.tsx` (copyright + socials + email). `page.tsx` now composes all of
  it in order; Footer sits outside `<main>` as its own landmark.
  Code review: Passed. Fixed a real duplicate-React-key bug caught via the dev server's error
  overlay — `Testimonials.tsx` keyed by `testimonial.name`, but all 3 placeholders share
  "Placeholder Name", so React was warning about duplicate/unstable keys; switched to index
  (safe for this static, non-reorderable list). Also swapped straight quotes for proper
  curly quotes in the About body copy for typographic correctness.
  Verified live in Chrome: full page scroll end-to-end (Hero → Career Line → About → Skills
  & Process → Testimonials → Contact → Footer), zero console messages, zero dev-overlay
  issues, `tsc`/lint/build all clean.

- [x] Phase 5: Responsive, a11y & performance

  Added `lib/useIsMobile.ts` (same `useSyncExternalStore` pattern as the reduced-motion
  hook) so `CareerLine` falls back to the vertical stack below 768px, not just under
  reduced motion. Upgraded section eyebrows from `<p>` to `<h2>` across `CareerLine`,
  `SkillsProcess`, and `Testimonials` for real heading-based navigation; `Footer` moved
  outside `<main>` as its own landmark. Added a global on-brand `:focus-visible` ring
  (accent outline, `app/globals.css`) since the default blue ring is low-contrast on ink.
  Generated `app/icon.tsx` and `app/opengraph-image.tsx` with `next/og` (a hand-converted
  hex value stands in for `--accent` since Satori doesn't support `oklch()`), removing the
  stale default `favicon.ico`.
  Code review: Passed. A Lighthouse accessibility pass (96/100) caught a real, systemic
  issue: the `text-paper/40` and `text-ink/50` opacity levels used for mono labels/eyebrows
  across five components measured 3.5–3.7:1 contrast, below WCAG AA's 4.5:1 floor. Computed
  the actual luminance math for both token pairs (paper-on-ink needs ≥/50, ink-on-paper
  needs ≥/60), fixed all five instances, and documented the floor as a comment in
  `globals.css` next to the tokens so it isn't reintroduced. Re-run: Lighthouse
  Accessibility/Best-Practices/SEO all 100/100, 46/46 audits passed. Verified in Chrome:
  clean render and zero console errors at a 500px mobile width with the stacked fallback
  active, and a visible accent focus ring on Tab. A performance trace on the dev server
  measured LCP 224ms and CLS 0.00 (production build should be at least as good).

- [x] Phase 6: Ship

  Pushed to GitHub `main` and confirmed Vercel's production deploy. The user connected the
  GitHub Git-integration in the Vercel dashboard (the one step that had to happen manually —
  OAuth authorization isn't CLI-completable); the very next push (real name/email/LinkedIn)
  triggered an automatic production deploy with no CLI involvement, confirming
  preview-on-PR/deploy-on-push is fully live. https://career-line-portfolio.vercel.app
  serves the finished site (verified HTTP 200 with the real identity content present).
  No custom domain requested.
  Code review: Passed. Remaining content gaps the brief calls for, intentionally not
  fabricated: the halftone avatar image, `city`, `introCallUrl`, and a real `public/cv.pdf`
  (the CV buttons currently point at a file that doesn't exist yet) — all clearly marked
  PLACEHOLDER in `data/site.ts`.
