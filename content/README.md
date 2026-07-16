# Timeline content

Everything on the Career Line (the dashed timeline) is authored here as markdown.
**One file = one stop.** To add an item, drop a `.md` file in the matching folder —
no layout or component code changes. Files are read at build time by
`lib/timeline.ts`, validated, and sorted **oldest → newest** by their `date`.

Each file is **YAML frontmatter** (the structured fields, between the `---` lines)
plus a **markdown body** (the prose). The body means different things per type —
see below. `id` (React key + anchor) comes from the filename, so name files with a
stable slug (e.g. `checkout-copilot.md`).

Common fields (all types):

| Field  | Required | Notes |
|--------|----------|-------|
| `type` | yes      | `project` \| `award` \| `education` — must match the folder |
| `date` | yes      | `YYYY-MM` (or `YYYY-MM-DD`) — sorts the line chronologically |
| `year` | yes      | Display label, e.g. `"2024"` (quote it — YAML reads bare numbers as ints) |

> YAML tip: quote any value containing a colon (`"ROLE: LEAD"`) or that you want
> kept as a string. The unicode minus `−` in KPIs is fine unquoted.

---

## `projects/` — full case study (expands to full detail)

```yaml
---
type: project
date: 2024-04
year: "2024"
role: AI UX LEAD                     # mono eyebrow label
title: Checkout Copilot
teaser: AI shopping assistant embedded in checkout.   # one collapsed-card line
kpiTeaser: +18% CONVERSION           # the single always-visible chip
kpis:                                # full KPI set, shown when expanded
  - +18% CONVERSION
  - −2.1s TO DECISION
  - "SHIPPED: 1 SPRINT"
steps:                               # EXACTLY 3, per the design brief
  - Discover — …
  - Design — …
  - Deliver + measure — …
projectShotAlt: Checkout Copilot — inline assistant placeholder
meta:                                # mono meta lines, joined with " · "
  - RETAIL PLATFORM · 12M MAU
  - 2024 · 10 WEEKS
  - "ROLE: AI UX LEAD"
featured: true                       # optional — this stop opens by default (pick one)
---

The markdown body is the expanded-panel summary paragraph.
```

## `awards/` — compact marker (minimal context+link expand)

```yaml
---
type: award
date: 2025-03
year: "2025"
title: CloudFest Hackathon
awards:                    # required, non-empty — a rank ("1st place") and/or named
  - Tech Visionary         # awards ("Tech Visionary"). One or more, rendered as chips.
  - Breaking Boundaries
org: CloudFest             # optional
link:                      # optional — shown as a chip when expanded
  label: View the project
  url: https://…
---

Optional body: one or two sentences of context, shown when the award is expanded.
Omit the body entirely and the award becomes a static (non-expanding) marker.
```

## `education/` — grouped courses by period (static list)

One file groups every course finished in the same period, so it reads as a single
compact stop. For "3 courses in Dec 2025 and 3 in Jul 2024", make two files
(`2025-12.md`, `2024-07.md`) — each becomes its own stop at its point on the line.

```yaml
---
type: education
date: 2024-07
year: "2024"
title: Education           # optional group label (defaults to "Education")
courses:                   # required, non-empty
  - name: Interaction Design Foundations
    provider: Provider name
    link: https://…        # optional per course
  - name: AI for Product Designers
    provider: Provider name
credential:                        # optional — set this on whichever group completes a
  - "NN/G CERTIFIED"               # real credential/certification. Short segments (each
  - "UX MANAGEMENT"                # its own chip, same treatment as a project's KPI teaser
                                    # or an award's chips) so it reads as a headline, not
                                    # buried in the course list — and so it wraps as a group
                                    # instead of overflowing the compact card as one long
                                    # unbreakable chip. Keep each segment short.
---

Optional body: a one-line note about this batch (or delete it).
```
