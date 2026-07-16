# Code Quality

- **Design tokens only.** Never hardcode `#111`, `#faf9f6`, or the accent color in a
  component — use the Tailwind tokens (`bg-ink`, `text-paper`, `text-accent`, etc.) defined
  in `app/globals.css`. If a new token is needed, add it there, not inline.
- **Content lives in `content/`/`data/`, not components.** Timeline stops (projects, awards,
  education) are markdown files under `content/` — see `content/README.md` for the per-type
  schema — loaded at build time via `lib/timeline.ts` (server-only; `"use client"` components
  can't call it). Site copy (name, email, socials, CV) and KPI-adjacent config live in
  `data/site.ts`. Components read from these — never hardcode copy that should be swappable.
  To add a timeline item, drop a markdown file in the matching `content/` folder; no layout
  code changes.
- **Client components are opt-in.** This is a mostly-static marketing page. Only mark a
  component `"use client"` when it genuinely needs interactivity (scroll listeners, click
  state) — the Career Line and case-study expand/collapse need it; most others don't.
- After editing any component, verify every prop/type it consumes still matches its shape
  in `data/`, and that no removed export is still imported elsewhere.
- Respect `prefers-reduced-motion` in any scroll- or transform-driven component (the Career
  Line especially).
