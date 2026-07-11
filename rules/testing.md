# Testing & Verification

There is no test suite (marketing one-pager) — verification is build/lint + manual/browser
checks:

- Run `npm run lint` and `npm run build` before considering any phase done; fix all errors
  and warnings.
- After changes to the Career Line or case-study data, manually verify (or drive via the
  chrome-devtools MCP): scroll still moves the line, a stop expands/collapses, and adding a
  dummy case study to `data/caseStudies.ts` doesn't break the layout.
- Check the page at a mobile viewport width — the timeline must fall back to a vertical
  stack there, not break or overflow horizontally.
- Before a production deploy, run a Lighthouse pass and confirm no console errors.
