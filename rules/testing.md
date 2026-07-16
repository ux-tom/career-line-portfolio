# Testing & Verification

There is no test suite (marketing one-pager) — verification is build/lint + manual/browser
checks:

- Run `npm run lint` and `npm run build` before considering any phase done; fix all errors
  and warnings.
- After changes to the Career Line or timeline content, manually verify (or drive via the
  chrome-devtools MCP): scroll still moves the line, a stop expands/collapses, and adding a
  dummy markdown file under `content/projects/` (or `awards/`, `education/`) doesn't break
  the layout — it should just appear as a new stop, no layout-code change required. If a
  content file is missing a required frontmatter field, `next build` should fail with a
  `[timeline] content/<type>/<file>.md: ...` error naming the file and field — don't let that
  regress into a silent failure.
- Check the page at a mobile viewport width — the timeline must fall back to a vertical
  stack there, not break or overflow horizontally.
- Before a production deploy, run a Lighthouse pass and confirm no console errors.
