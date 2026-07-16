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
  - `data/site.ts` → `city` — resolved: `city: "Netherlands"`. A city+targetCity split
    ("BASED: Wijchen · OPEN TO: Utrecht") was tried first but read as redundant once both
    were set to the same country, so this settled on a single country-level field;
    `About.tsx`'s meta label is back to plain "BASED: Netherlands".
  - `introCallUrl` — resolved: removed. The user is job-hunting (an employer), not
    client-hunting, so a "Book an intro call" self-service scheduling link didn't fit;
    the button and the `introCallUrl` field were deleted from `Contact.tsx`/`data/site.ts`.
    Contact is now just email + CV download.
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

- [x] Phase 10: Temporary noindex safeguard

  The live site (`data/caseStudies.ts`, `testimonials` in `data/site.ts`) still carries
  fictional placeholder content per Phase 7 — invented KPIs, "Placeholder Co.", "Placeholder
  Name" quotes — and the user flagged that recruiters could land on it as-is. Investigated
  gating the production URL behind Vercel Deployment Protection first: Password Protection
  requires the paid "Advanced Deployment Protection" add-on, and even free Vercel
  Authentication (SSO protection) explicitly refuses to cover the production domain/alias
  on the Hobby plan ("Vercel Authentication is not available on your plan for production
  deployments" — confirmed via direct API call) — it only gates preview URLs and per-deploy
  unique URLs, not `career-line-portfolio.vercel.app` itself. So there is no free way to
  hide the production URL from a direct visitor. Given that, this phase adds `robots:
  noindex` site-wide (root `layout.tsx` metadata, matching the pattern already used on
  `/design-system`) plus an `app/robots.ts` disallowing all crawlers, so the site at least
  drops out of search-engine discovery while Phase 7's real content is still pending. This
  is a stopgap, not a fix: anyone with the direct URL can still see placeholder content —
  Phase 7 (real case studies/testimonials/CV/etc.) is the actual resolution and should be
  prioritized. Remove the noindex once Phase 7 ships.
  Code review: Passed. Verified against a local production build (`npm run start`): the
  root `<meta name="robots" content="noindex, nofollow">` tag renders on `/`, and
  `/robots.txt` serves `Disallow: /` for all user agents. Confirmed the SSO/Vercel-
  Authentication toggle enabled earlier in this session was disabled again afterward, so no
  dangling protection setting was left on the Vercel project. `lint`/`tsc --noEmit`/`build`
  all clean.

- [x] Phase 11: Timeline content pipeline & multi-type stops

  The dashed line only carried one item type (Projects, `data/caseStudies.ts`), with
  `CareerLine`/`CaseStudyStop` hard-wired to the full project shape. This phase generalizes
  the line to carry three types — Projects, Awards (e.g. a CloudFest hackathon win), and
  Education (courses grouped by time period) — each authored as a markdown file under
  `content/` and read at build time. Introduces a typed discriminated union + server-side
  loader (`lib/timeline.ts`, using `gray-matter` + `marked`), since the stop components are
  `"use client"` and can't read `fs` — content loads in the server mount points
  (`app/page.tsx`, `app/design-system/page.tsx`) and passes down as props. `CaseStudyStop`
  is renamed to `TimelineStop` and switches on `item.type`: Projects keep full expand,
  Awards are compact with a minimal context+link expand, Education is a static grouped
  course list. Subtle type coding via a mono eyebrow label (PROJECT/AWARD/EDUCATION); same
  card/marker system otherwise. Migrates the 4 existing projects to `.md`, scaffolds one
  award + one education placeholder, and adds `content/README.md` documenting each type's
  schema + blank templates. Also derives the now-dynamic stop count/year-range (was
  hardcoded), retires `data/caseStudies.ts`, and updates the affected `rules/code-quality.md`
  content rule + `PROJECT.md` architecture note. Done = the line renders all three types in
  chronological order (projects full, awards/education compact) with a working stacked mobile
  fallback, adding an item is dropping a markdown file with no layout-code change, and
  lint/build/Lighthouse stay clean.
  Code review: Passed. Fixed a real bug caught during verification: `lib/timeline.ts`'s
  `readDir()` built the content folder path as `` `${type}s` ``, which pluralizes `education`
  to `educations` — a folder that doesn't exist — so the education stop silently vanished
  (the missing-folder `catch` swallows it and returns `[]`, no build error). Replaced the
  pluralization guess with an explicit `TYPE_FOLDERS` map. Also proved the build-time
  validation works as designed: deliberately stripped a required field from the award file,
  confirmed `next build` failed with a clear `[timeline] content/awards/….md: missing or
  empty required string field "placement"` error naming the exact file and field, then
  restored it. Verified via chrome-devtools MCP at 1440×900 on both `/` and `/design-system`:
  all 6 stops (4 projects + 1 award + 1 education group) render in chronological order with
  correct eyebrow type labels; the CloudFest award expands to its context paragraph + a
  "VIEW THE PROJECT ↗" link chip; the education stop renders its course list statically
  (non-expandable, links work); the featured project (`copilot`, via frontmatter `featured:
  true`) still opens by default; the footer stat line now reads "6 STOPS · 2022 — 2026",
  correctly derived instead of the old hardcoded "4 stops · 2022 — 2026". Confirmed the
  stacked mobile fallback (500px) renders all three types with no horizontal overflow, and
  Lighthouse Accessibility/Best Practices are still 100/100 (SEO's 66 is the pre-existing
  Phase-10 noindex, unrelated). Console clean throughout. Also confirmed the evolvability
  contract still holds: dropped a dummy 5th project markdown file, rebuilt, saw it appear as
  a 7th stop with zero layout-code changes, then removed it. `lint`/`tsc --noEmit`/`build`
  all clean.

  **Follow-up (same day):** the user's real CloudFest facts didn't fit the placeholder
  schema — they won two named awards (Tech Visionary, Breaking Boundaries), not a ranked
  "1st place" + track — so `AwardItem`'s `placement`/`category` fields were replaced with a
  single `awards: string[]` (one or more chips), which is more accurate for hackathons in
  general. This also fixed a real layout bug caught in the process: the compact award card's
  "+ OPEN"/"× CLOSE" indicator had no `whitespace-nowrap`/`shrink-0`, so at `compactWidthPx`
  it could break mid-word onto a second line alongside a wrapping title; fixed by pinning the
  indicator's width and letting the title wrap independently (`min-w-0`, `items-start`).
  Populated real content: `content/awards/cloudfest-hackathon.md` now carries the real award
  names (date and project link are still placeholder, flagged in-file); `content/education/`
  now has two real groups from the user's NN/g UX Certification (Management specialty) —
  `2024-12.md` (Customer Journey Management, Service Blueprinting) and `2025-12.md`
  (DesignOps: Scaling UX Design, Design Tradeoffs and UX Decision-Making, UX Leader:
  Essential Skills for Any UX Practitioner), with the certificate-completion note attached to
  the later group's body per the user's choice. `content/README.md`'s award template updated
  to match. Verified via chrome-devtools MCP at 1440×900: the award card's title now wraps
  cleanly without breaking the toggle text, both education groups render with correct courses
  and the certificate note, footer count reads "7 STOPS · 2022 — 2026". Confirmed no
  horizontal overflow at 500px and Lighthouse Accessibility/Best Practices still 100/100.
  `lint`/`tsc --noEmit`/`build` all clean.

  **Follow-up 2 (same day):** the user felt the NN/g certification deserved a headline signal,
  not a trailing sentence — added an optional `EducationItem.credential?: string[]` (short
  segments, each its own chip, same treatment as a KPI teaser/award chip) and set it on
  `2025-12.md`. First attempt used a single long chip string, which overflowed the compact
  card's border (`Chip`'s `whitespace-nowrap` had nowhere to wrap); fixed by splitting it into
  two short chips ("NN/G CERTIFIED", "UX MANAGEMENT") that wrap as a group, reusing the same
  pattern already proven safe by the award chips. Adding the credential made education cards
  visibly taller, so education stops were made expandable (`isExpandable` now always `true`
  for education): collapsed shows title + credential chips + a computed "`N` courses" teaser
  + a "+ OPEN" toggle; expanding reveals the full course list and the context note, moved into
  a new `detail` branch in `TimelineStop.tsx`.

  **Follow-up 3 (same day):** moved the terminal "+" ("Next stop: your project") marker onto
  the line itself and made the line stop there, per the user's request that it "pull more
  attention." Previously the dashed line was a `position: absolute; inset-x-0` overlay fixed
  to the viewport (always full-width regardless of scroll or content), and the "+" button
  floated above it matching the card-float convention. Reworked both: the dashed line now
  lives inside `trackRef` (which gained `position: relative`) with an explicit pixel `width`
  measured via `getBoundingClientRect` from the track's start to the "+" marker's horizontal
  center — so it scrolls with the content and its length is real, not decorative — and the
  marker itself grew from 56px to 88px (`NEXT_STOP_MARKER_PX`), absolutely positioned at the
  same vertical plane as every stop's dot (`LINE_OFFSET_PX`, shared constant), with an opaque
  `bg-ink` fill so the line visually terminates into it rather than showing through a
  transparent ring. Caught a real overlap bug in the process: the bigger marker's top edge
  (it intentionally pokes above its wrapper's padding region to center on the line) initially
  extended into the "Next stop" label's flow area above it, since the wrapper's padding wasn't
  sized to clear the marker's full footprint — fixed by computing the wrapper's
  `paddingBottom` from the marker's actual geometry plus a label gap, instead of a fixed
  `pb-32`. Verified via chrome-devtools MCP at 1440×900: at the end of the line the marker
  sits centered on the line with the dashes terminating exactly at it and no label/marker
  overlap; at a mid-scroll position the line still correctly spans the full visible viewport
  (hasn't reached its real end yet), confirming the effect only reads as "the line stops here"
  once the marker has actually scrolled into place. No horizontal overflow at 500px, Lighthouse
  Accessibility/Best Practices still 100/100, console clean, `lint`/`tsc --noEmit`/`build` all
  clean.
