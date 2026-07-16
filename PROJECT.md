# PROJECT.md

## Product Name

The Career Line — AI UX Designer Portfolio

## Elevator Pitch

A one-page portfolio for an AI UX Designer, built as a customer journey map: the career
itself is a continuous horizontal timeline ("the line") that vertical scroll drives the
visitor along. Projects, awards, and education are stops that expand in place. Recruiters
and hiring managers experience the craft — systematic, holistic, KPI-driven design — by
navigating it.

## Architecture

Single-page Next.js (App Router) app, statically rendered where possible. One `page.tsx`
composes ordered sections (Hero → Career Line → About → Skills & Process → Testimonials →
Contact). The Career Line is the centerpiece: a sticky section whose scroll progress is
mapped to `translateX`, moving timeline "stops" horizontally. Stops come in three types —
Projects, Awards, Education — each authored as a markdown file under `content/` (frontmatter
for structured fields, prose in the body; see `content/README.md`), read at build time by
`lib/timeline.ts` and passed into `<CareerLine>` as props from the server page components.
Site copy (name, email, socials, CV, journey widths) lives in `data/site.ts`. Adding a new
timeline item is dropping one markdown file — no layout code touched. Below a mobile
breakpoint, the timeline falls back to a vertical stack (the horizontal-scroll mechanic is
desktop-first).

## Tech Stack

- **Next.js (App Router) + TypeScript** — chosen for OG/SEO metadata quality (recruiter
  link-sharing), built-in font/image optimization, and file-based data-driven structure.
- **Tailwind CSS v4** (CSS-first `@theme`) — design tokens as CSS variables so accent color
  and scroll-journey length stay easily configurable, per the design brief.
- **Space Grotesk** (display/body) + **Space Mono** (labels/KPI chips) via `next/font/google`.
- **Vercel** — hosting, preview deployments per PR, production deploy on push to `main`.
- **GitHub** — version control, source of truth for Vercel's Git integration.

## Business Logic

- **Evolvability constraint:** the site must absorb new timeline items (projects, awards, or
  education) without layout changes. Each item is one markdown file under `content/<type>/`;
  `lib/timeline.ts` reads and validates the folder at build time, and the Career Line
  component maps over the resulting list and lays itself out for N stops of any mix of types.
- **KPI teaser → detail pattern (projects):** every project stop always shows a compact KPI
  teaser chip on the line (mono type, ~11px). Clicking it expands inline to reveal the full
  KPI set, a 3-step process summary, project-shot placeholder, and meta — detail is
  progressive, not front-loaded. Awards and education use lighter variants of the same idea
  (chips as the headline signal — award names, or a certification badge — with a compact or
  no expand), so a course list or a hackathon win doesn't read as heavy as a full case study.
- **Append-to-the-right growth model:** timeline items are ordered chronologically by their
  `date` frontmatter across all three types (2022→2025 placeholders and real content now);
  the line always ends with a large "Next stop: your project" marker sitting on the line
  itself → Contact, so new work extends the line rather than replacing anything.
- **Three meanings of "AI" (must read clearly in About/Skills copy):** (1) vibe-codes working
  prototypes — real interactions, not mockups; (2) uses AI to compress design cycles — days
  instead of weeks; (3) builds AI systems that keep designing on-brand after handoff.

## Design Principles

<!-- From the Claude Design brief. See ClaudeDesign/Portfolio Site (standalone).html for the
     original visual reference/export this build is re-implemented from. -->

- **Emotional goal:** In the first 3 seconds, a recruiter should feel "this person thinks
  in systems" — calm, precise, confident. Not flashy; measured.
- **Reward mechanic:** Scrolling forward is rewarded with narrative progress along a visible
  timeline and concrete KPIs at every stop — curiosity ("what's the next stop?") pulls the
  visitor toward Contact, mirroring how a good journey map rewards a user's next action.
- **Anti-pattern:** Never a generic scroll-jacked portfolio template with stock gradients,
  card-shadow decoration, or vague "passionate designer" copy. No gradients, no decoration —
  borders, grids, and typography carry the design.
- **Tone:** Minimal mono, dark ink (`#111`) and warm off-white (`#faf9f6`), single purple
  accent (`oklch(0.62 0.17 297.5)`, tweakable). The brand promise: work that is fast, systematic,
  and provably effective — one line, measured at every stop.
