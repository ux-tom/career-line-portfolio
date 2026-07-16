/**
 * Timeline content pipeline.
 *
 * The Career Line carries three kinds of item — Projects, Awards, and Education
 * — each authored as a markdown file under `content/<type>/*.md` (structured
 * fields in the frontmatter, prose in the body). This module reads those files
 * at build time, validates them into a typed discriminated union, and returns
 * them sorted chronologically for the line to render.
 *
 * SERVER ONLY: uses `fs`. The Career Line stop components are `"use client"`, so
 * they can't call this — the server mount points (`app/page.tsx`,
 * `app/design-system/page.tsx`) call `getTimelineItems()` and pass the result
 * down as props. Importing this from a client component fails the build (by
 * design — it surfaces the mistake).
 *
 * To add an item: drop a markdown file in the matching folder. No layout code
 * changes. See `content/README.md` for the per-type templates.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type TimelineType = "project" | "award" | "education";

type BaseItem = {
  /** Slug from the filename — stable React key + anchor. */
  id: string;
  type: TimelineType;
  /** ISO `YYYY-MM` (or `YYYY-MM-DD`) — sorts the merged line chronologically. */
  date: string;
  /** Display year label, e.g. "2024". */
  year: string;
};

export type ProjectItem = BaseItem & {
  type: "project";
  /** Mono role label, e.g. "AI UX LEAD". */
  role: string;
  title: string;
  teaser: string;
  kpiTeaser: string;
  kpis: string[];
  /** Always exactly 3 steps, per the design brief. */
  steps: [string, string, string];
  projectShotAlt: string;
  meta: string[];
  /** Markdown body → HTML: the expanded-panel summary. */
  summaryHtml: string;
  /** When true, this stop is open by default on the line. */
  featured: boolean;
};

export type AwardItem = BaseItem & {
  type: "award";
  title: string;
  /** What was won — a rank ("1st place") and/or named awards ("Tech Visionary"). At least one. */
  awards: string[];
  /** Event/organizer, e.g. "CloudFest". */
  org?: string;
  link?: { label: string; url: string };
  /** Markdown body → HTML: optional short context shown when expanded. */
  contextHtml?: string;
};

export type EducationCourse = {
  name: string;
  provider: string;
  link?: string;
};

export type EducationItem = BaseItem & {
  type: "education";
  /** Group label; defaults to "Education". */
  title: string;
  /** Courses completed in this time period — rendered as a static list. */
  courses: EducationCourse[];
  /** Optional headline credential this group earned, e.g. ["NN/G CERTIFIED", "UX MANAGEMENT"] — short segments, each rendered as its own chip (so they wrap as a group rather than overflowing the compact card as one long unbreakable chip). Same treatment as a project's KPI teaser or an award's chips. */
  credential?: string[];
  /** Markdown body → HTML: optional note about this batch. */
  contextHtml?: string;
};

export type TimelineItem = ProjectItem | AwardItem | EducationItem;

const CONTENT_DIR = join(process.cwd(), "content");

/** Render a markdown body string to an HTML string (synchronous; trusted input). */
function renderBody(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return "";
  return marked.parse(trimmed, { async: false });
}

/** Throw a build-time error that names the offending file and field. */
function fail(file: string, message: string): never {
  throw new Error(`[timeline] ${file}: ${message}`);
}

function requireString(file: string, data: Record<string, unknown>, key: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `missing or empty required string field "${key}"`);
  }
  return value;
}

function requireStringArray(
  file: string,
  data: Record<string, unknown>,
  key: string
): string[] {
  const value = data[key];
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
    fail(file, `field "${key}" must be an array of strings`);
  }
  return value as string[];
}

function optionalString(data: Record<string, unknown>, key: string): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/** Like `requireStringArray`, but returns `undefined` when the field is absent. */
function optionalStringArray(
  file: string,
  data: Record<string, unknown>,
  key: string
): string[] | undefined {
  if (data[key] === undefined) return undefined;
  return requireStringArray(file, data, key);
}

/** Folder name per type — "education" is uncountable, so this isn't just `${type}s`. */
const TYPE_FOLDERS: Record<TimelineType, string> = {
  project: "projects",
  award: "awards",
  education: "education",
};

function readDir(type: TimelineType): { id: string; data: Record<string, unknown>; body: string }[] {
  const folder = TYPE_FOLDERS[type];
  const dir = join(CONTENT_DIR, folder);
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "README.md");
  } catch {
    return []; // a type folder may not exist yet — that's fine
  }
  return files.map((filename) => {
    const file = `content/${folder}/${filename}`;
    const raw = readFileSync(join(dir, filename), "utf8");
    const { data, content } = matter(raw);
    const id = filename.replace(/\.md$/, "");
    if (data.type && data.type !== type) {
      fail(file, `frontmatter type "${String(data.type)}" does not match its folder ("${type}")`);
    }
    return { id, data: data as Record<string, unknown>, body: content };
  });
}

function parseProject(file: string, id: string, data: Record<string, unknown>, body: string): ProjectItem {
  const steps = requireStringArray(file, data, "steps");
  if (steps.length !== 3) {
    fail(file, `"steps" must have exactly 3 entries (found ${steps.length})`);
  }
  return {
    id,
    type: "project",
    date: requireString(file, data, "date"),
    year: requireString(file, data, "year"),
    role: requireString(file, data, "role"),
    title: requireString(file, data, "title"),
    teaser: requireString(file, data, "teaser"),
    kpiTeaser: requireString(file, data, "kpiTeaser"),
    kpis: requireStringArray(file, data, "kpis"),
    steps: steps as [string, string, string],
    projectShotAlt: requireString(file, data, "projectShotAlt"),
    meta: requireStringArray(file, data, "meta"),
    summaryHtml: renderBody(body),
    featured: data.featured === true,
  };
}

function parseAward(file: string, id: string, data: Record<string, unknown>, body: string): AwardItem {
  const awards = requireStringArray(file, data, "awards");
  if (awards.length === 0) {
    fail(file, `"awards" must be a non-empty array`);
  }
  const rawLink = data.link as Record<string, unknown> | undefined;
  const link =
    rawLink && typeof rawLink.url === "string"
      ? { label: typeof rawLink.label === "string" ? rawLink.label : "View", url: rawLink.url }
      : undefined;
  const contextHtml = renderBody(body) || undefined;
  return {
    id,
    type: "award",
    date: requireString(file, data, "date"),
    year: requireString(file, data, "year"),
    title: requireString(file, data, "title"),
    awards,
    org: optionalString(data, "org"),
    link,
    contextHtml,
  };
}

function parseEducation(file: string, id: string, data: Record<string, unknown>, body: string): EducationItem {
  const rawCourses = data.courses;
  if (!Array.isArray(rawCourses) || rawCourses.length === 0) {
    fail(file, `"courses" must be a non-empty array`);
  }
  const courses: EducationCourse[] = rawCourses.map((c, i) => {
    if (typeof c !== "object" || c === null) {
      fail(file, `courses[${i}] must be an object with name + provider`);
    }
    const course = c as Record<string, unknown>;
    if (typeof course.name !== "string" || typeof course.provider !== "string") {
      fail(file, `courses[${i}] must have string "name" and "provider"`);
    }
    return {
      name: course.name,
      provider: course.provider,
      link: typeof course.link === "string" ? course.link : undefined,
    };
  });
  const contextHtml = renderBody(body) || undefined;
  return {
    id,
    type: "education",
    date: requireString(file, data, "date"),
    year: requireString(file, data, "year"),
    title: optionalString(data, "title") ?? "Education",
    courses,
    credential: optionalStringArray(file, data, "credential"),
    contextHtml,
  };
}

/**
 * Read every content file, validate it into a typed item, and return the merged
 * list sorted ascending by `date` (the line runs oldest → newest, left → right).
 */
export function getTimelineItems(): TimelineItem[] {
  const items: TimelineItem[] = [
    ...readDir("project").map(({ id, data, body }) =>
      parseProject(`content/projects/${id}.md`, id, data, body)
    ),
    ...readDir("award").map(({ id, data, body }) =>
      parseAward(`content/awards/${id}.md`, id, data, body)
    ),
    ...readDir("education").map(({ id, data, body }) =>
      parseEducation(`content/education/${id}.md`, id, data, body)
    ),
  ];

  return items.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
