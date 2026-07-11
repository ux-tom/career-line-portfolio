# The Career Line

An AI UX Designer portfolio built as a customer journey map: the career is one continuous
horizontal timeline driven by vertical scroll, with case studies as stops that expand in
place. See [`PROJECT.md`](./PROJECT.md) for the product brief and [`PLAN.md`](./PLAN.md)
for build phases and status.

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
- `data/` — typed content: `caseStudies.ts` (add a stop = append one entry), `site.ts`
- `public/` — static assets (CV, avatar)
- `ClaudeDesign/` — original visual reference export; not shipped source
