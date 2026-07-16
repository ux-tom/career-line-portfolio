"use client";

import type { TimelineItem } from "@/lib/timeline";
import { site } from "@/data/site";
import { Card, Chip, Label } from "@/components/ui";

type Props = {
  item: TimelineItem;
  expanded: boolean;
  onToggle: () => void;
  /** "line" = horizontal Career Line stop; "stack" = vertical mobile/reduced-motion fallback. */
  layout: "line" | "stack";
};

/** Diagonal-hatch fill for the placeholder project shot (reference parity). */
const shotHatch =
  "repeating-linear-gradient(45deg, transparent 0 8px, var(--surface) 8px 16px)";

/** Links inside rendered-markdown bodies pick up the accent underline treatment. */
const proseLinks = "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2";

/** Projects always expand; awards expand only if they carry context/a link; education always expands (the course list). */
function isExpandable(item: TimelineItem): boolean {
  if (item.type === "project") return true;
  if (item.type === "award") return Boolean(item.contextHtml || item.link);
  return true;
}

/** Mono eyebrow: the role for projects, the type label otherwise. */
function eyebrowText(item: TimelineItem): string {
  if (item.type === "project") return `${item.year} · ${item.role}`;
  return `${item.year} · ${item.type.toUpperCase()}`;
}

/** Collapsed / expanded stop widths, in px — projects are roomy, the rest compact. */
function widths(item: TimelineItem): { collapsed: number; expanded: number } {
  if (item.type === "project") {
    return { collapsed: site.journey.stopWidthPx, expanded: site.journey.expandedWidthPx };
  }
  return { collapsed: site.journey.compactWidthPx, expanded: site.journey.compactExpandedWidthPx };
}

export default function TimelineStop({ item, expanded, onToggle, layout }: Props) {
  const panelId = `stop-${item.id}-panel`;
  const expandable = isExpandable(item);
  const isOpen = expanded && expandable;
  const { collapsed, expanded: expandedWidth } = widths(item);

  // --- Per-type card head (collapsed content) --------------------------
  let head: React.ReactNode = null;
  if (item.type === "project") {
    head = (
      <>
        <span className="flex items-baseline justify-between gap-4">
          <span className={layout === "line" ? "whitespace-nowrap text-[17px] font-bold" : "text-[17px] font-bold"}>
            {item.title}
          </span>
          {/* One-off mono text (13px, no uppercase/tracking) — doesn't fit the
              Label primitive's uppercase-tracking-wide base, kept inline. */}
          <span className="font-mono text-[13px] text-paper/50">{expanded ? "× CLOSE" : "+ OPEN"}</span>
        </span>
        <span
          className={
            layout === "line"
              ? "max-w-[280px] text-[12.5px] leading-snug text-paper/60"
              : "text-[12.5px] leading-snug text-paper/60"
          }
        >
          {item.teaser}
        </span>
        <Chip variant="solid" className="self-start">
          {item.kpiTeaser}
        </Chip>
      </>
    );
  } else if (item.type === "award") {
    head = (
      <>
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 text-[16px] font-bold leading-snug">{item.title}</span>
          {expandable && (
            <span className="shrink-0 whitespace-nowrap font-mono text-[13px] text-paper/50">
              {expanded ? "× CLOSE" : "+ OPEN"}
            </span>
          )}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {item.awards.map((award) => (
            <Chip key={award} variant="solid">
              {award}
            </Chip>
          ))}
        </span>
      </>
    );
  } else {
    const courseCount = `${item.courses.length} course${item.courses.length === 1 ? "" : "s"}`;
    head = (
      <>
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 text-[16px] font-bold leading-snug">{item.title}</span>
          <span className="shrink-0 whitespace-nowrap font-mono text-[13px] text-paper/50">
            {expanded ? "× CLOSE" : "+ OPEN"}
          </span>
        </span>
        {item.credential && (
          <span className="flex flex-wrap items-center gap-2">
            {item.credential.map((segment) => (
              <Chip key={segment} variant="solid">
                {segment}
              </Chip>
            ))}
          </span>
        )}
        <Label size="xs">{courseCount}</Label>
      </>
    );
  }

  // --- Per-type expanded detail panel ----------------------------------
  let detail: React.ReactNode = null;
  if (isOpen && item.type === "project") {
    detail = (
      <div id={panelId} className="flex flex-col gap-6 border-t border-paper/20 px-5 pb-5 md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5 pt-4">
          <div
            className={`text-[13px] leading-relaxed text-paper/70 ${proseLinks}`}
            dangerouslySetInnerHTML={{ __html: item.summaryHtml }}
          />
          <ol className="flex flex-col gap-2">
            {item.steps.map((step, i) => (
              <li key={i} className="flex items-baseline gap-2.5">
                <Label size="2xs" tone="accent" className="shrink-0">
                  0{i + 1}
                </Label>
                <span className="text-[12px] leading-relaxed text-paper/60">{step}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-2">
            {item.kpis.map((kpi) => (
              <Chip key={kpi} variant="outline">
                {kpi}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 pt-4 md:w-[200px]">
          <div
            role="img"
            aria-label={item.projectShotAlt}
            className="flex h-[130px] items-center justify-center rounded-md border border-dashed border-paper/30"
            style={{ backgroundImage: shotHatch }}
          >
            <Label size="2xs">Project shot</Label>
          </div>
          <Label as="div" size="xs" className="leading-relaxed">
            {item.meta.join(" · ")}
          </Label>
        </div>
      </div>
    );
  } else if (isOpen && item.type === "award") {
    detail = (
      <div id={panelId} className="flex flex-col gap-3 border-t border-paper/20 px-5 pb-5 pt-4">
        {item.contextHtml && (
          <div
            className={`text-[12.5px] leading-relaxed text-paper/70 ${proseLinks}`}
            dangerouslySetInnerHTML={{ __html: item.contextHtml }}
          />
        )}
        {item.link && (
          <a href={item.link.url} target="_blank" rel="noopener noreferrer" className="self-start">
            <Chip variant="outline">{item.link.label} ↗</Chip>
          </a>
        )}
      </div>
    );
  } else if (isOpen && item.type === "education") {
    detail = (
      <div id={panelId} className="flex flex-col gap-3 border-t border-paper/20 px-5 pb-5 pt-4">
        <ul className="flex flex-col gap-2.5">
          {item.courses.map((course, i) => (
            <li key={i} className="flex flex-col gap-0.5">
              {course.link ? (
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-paper/80 underline-offset-2 hover:text-accent hover:underline"
                >
                  {course.name}
                </a>
              ) : (
                <span className="text-[13px] font-medium text-paper/80">{course.name}</span>
              )}
              <Label size="2xs">{course.provider}</Label>
            </li>
          ))}
        </ul>
        {item.contextHtml && (
          <div
            className={`text-[12px] leading-relaxed text-paper/60 ${proseLinks}`}
            dangerouslySetInnerHTML={{ __html: item.contextHtml }}
          />
        )}
      </div>
    );
  }

  // --- Card (shared shell) ---------------------------------------------
  const cardBody = expandable ? (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={panelId}
      className="flex w-full flex-col gap-2 px-5 py-[18px] text-left"
    >
      {head}
    </button>
  ) : (
    <div className="flex w-full flex-col gap-2 px-5 py-[18px]">{head}</div>
  );

  const card = (
    <Card padding="none" state={isOpen ? "active" : "default"}>
      {cardBody}
      {detail}
    </Card>
  );

  // --- Vertical stack (mobile / reduced motion) ------------------------
  if (layout === "stack") {
    return (
      <article className="py-6">
        <Label className="mb-2.5">{eyebrowText(item)}</Label>
        {card}
      </article>
    );
  }

  // --- Horizontal Career Line stop -------------------------------------
  return (
    <div className="relative flex flex-none flex-col items-stretch pb-32">
      <Label tone={isOpen ? "accent" : "muted"} className="mb-2.5">
        {eyebrowText(item)}
      </Label>

      <div
        className="relative z-[1] transition-[width] duration-500 ease-out"
        style={{ width: isOpen ? expandedWidth : collapsed }}
      >
        {card}
      </div>

      {/* Marker dot sitting on the dashed line */}
      <span
        aria-hidden
        className={`absolute bottom-[89px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-paper ${
          isOpen ? "bg-accent" : "bg-ink"
        }`}
      />
    </div>
  );
}
