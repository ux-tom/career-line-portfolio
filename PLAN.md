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

- [ ] Phase 7: Real content handoff

  Everything the brief calls placeholder that's still fake, owned by the user (not a code
  task — the site works correctly with these values, they just aren't real yet):
  - `data/site.ts`: `city` (currently "City, Country"), `introCallUrl` (currently a fake
    cal.com link — either supply a real booking link or remove the "Book an intro call"
    button in `components/Contact.tsx` if it's not wanted).
  - `public/cv.pdf`: add the real file — `cvUrl: "/cv.pdf"` already points here, the
    Download CV buttons in `About.tsx`/`Contact.tsx` will pick it up automatically.
  - `data/site.ts` → `testimonials`: swap the 3 "Placeholder Name / Placeholder Co." quotes
    for real ones.
  - `data/caseStudies.ts`: the 4 case studies (Support Triage AI, Onboarding Rebuild,
    Checkout Copilot, DesignOps Agent) are fictional placeholders with invented KPIs and a
    "Placeholder Co." — replace with real projects, or keep the structure and rewrite the
    content once real case studies are ready. Each project's shot is currently a bordered
    "Project shot — placeholder" box in `CaseStudyStop.tsx`; swap in real screenshots when
    available.
  - Halftone avatar: the brief calls for one, but no component currently renders an image
    anywhere on the site — this needs both the image asset AND a decision on where it goes
    (Hero? About?) before it can be added; flag when ready and it can be wired in.

- [x] Phase 8: Reference-parity restyle

  The live site drifted from the original Claude Design export
  (`ClaudeDesign/Portfolio Site (standalone).html`, the decoded visual source of truth) in
  structure, layout, and copy. This phase restyles every section to render almost
  identically to that reference, using the reference's copy verbatim, while keeping the
  real identity data (name/email/LinkedIn) and the project's engineering upgrades (mobile
  vertical-stack + reduced-motion fallbacks, a11y focus ring, design-token discipline —
  reference greys reproduced via `paper`-opacity tokens, not hardcoded hex). Adds the
  fixed top nav (avatar + name + role + section links + CV pill) that was missing, wires
  the embedded halftone avatar (`public/halftone-avatar.png`) into the nav + About, and
  reshapes `data/caseStudies.ts` (sentence teaser + string KPIs/steps/meta) and
  `data/site.ts` to carry the reference copy. Intentional on-brand deviations from the
  reference: Space Mono for labels (per PROJECT.md, vs the reference's system mono), and
  Dribbble dropped from the footer. `city`/`cvUrl`/`introCallUrl`/testimonials/case-study
  content stay Phase-7 placeholders — this phase changes how the site *looks and reads*,
  not whether that data is real.
  Code review: Passed. Fixed three real issues found during verification: (1) the
  horizontal Career Line's dashed guideline sat below the stop-marker dots (`items-center`
  on the track) instead of running through them — switched to `items-end` so dots land on
  the line, matching the reference; (2) clicking a nav link (e.g. `#skills`) scrolled the
  section title under the new fixed nav — added `scroll-mt-20` to every anchor-target
  section (a plain `section[id] { scroll-margin-top }` rule silently didn't compile under
  Tailwind v4's CSS layers, so the utility class was used instead, consistent with how
  Contact already handled this in earlier phases); (3) a Lighthouse regression — the new
  `--surface` token (`#1a1a18`, raised card backgrounds) dropped accent-on-surface text
  (case-study step numbers, the Measure process cell) to 4.39:1 contrast, below WCAG AA;
  computed the actual luminance math and darkened the token to `#161614` (4.57:1, passes,
  and matches the reference's own card-bg hex), documenting the floor in `globals.css` so
  it isn't relightened later. Also stacked the case-study detail panel and project-shot box
  to single-column below `md` (was a fixed-width two-column flex row that crowded a 500px
  viewport). Verified via chrome-devtools MCP against the decoded reference at 1440×900:
  nav, hero, career-line (collapsed + expanded + scroll→translateX), about with the
  halftone avatar, skills cards + process strip, testimonials, and contact/footer are all
  near-identical section for section; the `copilot` stop opens by default as in the
  reference. Confirmed zero console errors/warnings, zero horizontal overflow and a working
  stacked fallback at 500px, and a clean `lint`/`tsc --noEmit`/`build`. Re-ran Lighthouse
  after the surface-token fix: Accessibility/Best Practices/SEO all 100/100, 47/47 audits
  passed.

- [x] Phase 9: Design system extraction

  The 9 section components each hardcode their own Tailwind classNames, so the same
  visual ideas (pill buttons, KPI chips, the status-dot eyebrow, bordered cards, section
  eyebrow/heading rows, the mono muted-label pattern) are re-implemented slightly
  differently in multiple places — including one real drift bug (CareerLine's section
  heading is `sm:text-[34px]` vs Skills/Testimonials' `sm:text-[40px]`, clearly a
  copy-paste accident, not intent). This phase extracts the duplicated pieces into
  shared primitives in `components/ui/` (`Button`, `Chip`, `StatusPill`, `Card`,
  `SectionHeader`, `Label`, `Avatar` — built with the newly-added `tailwind-variants` +
  `clsx`), refactors every section component to consume them instead of inline
  duplicates, and adds an unlisted `/design-system` catalog page (`robots: noindex`, not
  linked from Nav/Footer) that documents Foundations (live-read color tokens, type
  scale, spacing/radius conventions, motion demo), the full `ui/` primitive variant
  matrix, and the real section components mounted directly. Because the catalog page
  imports the same component modules as the live site, editing a shared primitive
  changes both at once — no separate syncing step. Done = `/` is pixel-equivalent to
  its pre-refactor visuals (verified via chrome-devtools screenshot comparison),
  `/design-system` renders every primitive/variant and every section component
  correctly (including CareerLine's scroll mechanic working when mounted there), and
  lint/tsc/build/Lighthouse all stay clean.
  Code review: Passed. Along the way, fixed the CareerLine heading-size drift
  intentionally by naming it `SectionHeader`'s `size="compact"` variant instead of
  leaving it an accident, and unified the two inconsistent KPI-chip treatments (the
  solid teaser chip was missing `tracking-wide`) onto one `Chip` primitive. Also
  unified About's CV button padding (previously `px-[18px] py-2.5`, a one-off) onto
  `Button`'s canonical `md` size (`px-[22px] py-3`) shared with Contact's buttons — a
  ~4px cosmetic delta, deliberate. `Label`/`Card` needed generic `<T extends
  ElementType>` typing (not a fixed `as?: ElementType` union) so TypeScript would accept
  element-specific props like `href`/`target` when rendered `as="a"` — caught by `tsc`
  during the refactor. Two dependency issues surfaced and were fixed: `tailwind-variants`
  needed `tailwind-merge` as an explicit peer install (build failed with "module not
  found" until added), and the first `ColorSwatches` draft used `useEffect` +
  `setState`, which trips the project's `react-hooks/set-state-in-effect` lint rule —
  rewrote it with `useSyncExternalStore`, matching the existing convention in
  `lib/useReducedMotion.ts`/`lib/useIsMobile.ts`. Verified via chrome-devtools MCP: `/`
  screenshotted section-by-section at 1440×900 (hero, career line collapsed+expanded,
  about, skills, testimonials, contact, footer) is pixel-identical to the pre-refactor
  site; `/design-system` renders all Foundations (live-read token swatches, confirmed
  reading real computed values not a hardcoded copy), the full Button/Chip/Card/
  SectionHeader/Label/Avatar variant matrices, and every section component mounted
  live — including clicking a Career Line stop to expand/collapse it, which worked
  correctly on this second route too. Confirmed `<meta name="robots" content="noindex,
  nofollow">` is present and the page isn't linked from Nav or Footer. Zero console
  errors on either route, zero horizontal overflow at 500px on either route, and a
  clean `lint`/`tsc --noEmit`/`build`.
