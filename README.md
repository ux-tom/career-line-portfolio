# The Career Line

An AI UX Designer portfolio built as a customer journey map: the career is one continuous
horizontal timeline driven by vertical scroll, with projects, awards, and education as stops
that expand in place. See [`PROJECT.md`](./PROJECT.md) for the product brief and
[`PLAN.md`](./PLAN.md) for build phases and status.

## Stack

Next.js (App Router) + TypeScript, Tailwind CSS v4, deployed on Vercel from this repo.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint
npm run build   # production build
```

## Structure

- `app/` — pages, layout, global design tokens (`app/globals.css`)
- `components/` — page sections, including the Career Line timeline
- `content/` — timeline stops as markdown: `projects/`, `awards/`, `education/` (add a stop =
  add one file — see `content/README.md`), read at build time by `lib/timeline.ts`
- `data/` — `site.ts`: site-wide copy/config (name, email, socials, CV, journey widths)
- `public/` — static assets (CV, avatar)
- `ClaudeDesign/` — original visual reference export; not shipped source
