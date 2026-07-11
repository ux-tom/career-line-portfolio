# CLAUDE.md

This file is the central orchestrator for Claude in this project.

## Project Context

@PROJECT.md

## Current Plan

@PLAN.md

## Rules

<!-- Use @ includes for rules files — this avoids maintaining a manual list that can go out of sync.
     If you ever switch to a bullet-point list instead, always Glob .claude/rules/** first. -->
@rules/code-quality.md
@rules/testing.md
@AGENTS.md

## Project-Specific Instructions

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel from
GitHub. See `AGENTS.md` for a framework-version warning (Next 16 / React 19 / Tailwind v4
are newer than most training data) — check `node_modules/next/dist/docs/` before assuming
an API.
