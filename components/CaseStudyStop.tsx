"use client";

import type { CaseStudy } from "@/data/caseStudies";
import { site } from "@/data/site";
import { Card, Chip, Label } from "@/components/ui";

type Props = {
  study: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
  /** "line" = horizontal Career Line stop; "stack" = vertical mobile/reduced-motion fallback. */
  layout: "line" | "stack";
};

/** Diagonal-hatch fill for the placeholder project shot (reference parity). */
const shotHatch =
  "repeating-linear-gradient(45deg, transparent 0 8px, var(--surface) 8px 16px)";

export default function CaseStudyStop({ study, expanded, onToggle, layout }: Props) {
  const panelId = `stop-${study.id}-panel`;

  const detail = (
    <div id={panelId} className="flex flex-col gap-6 border-t border-paper/20 px-5 pb-5 md:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-3.5 pt-4">
        <p className="text-[13px] leading-relaxed text-paper/70">{study.summary}</p>
        <ol className="flex flex-col gap-2">
          {study.steps.map((step, i) => (
            <li key={i} className="flex items-baseline gap-2.5">
              <Label size="2xs" tone="accent" className="shrink-0">
                0{i + 1}
              </Label>
              <span className="text-[12px] leading-relaxed text-paper/60">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2">
          {study.kpis.map((kpi) => (
            <Chip key={kpi} variant="outline">
              {kpi}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-2 pt-4 md:w-[200px]">
        <div
          role="img"
          aria-label={study.projectShotAlt}
          className="flex h-[130px] items-center justify-center rounded-md border border-dashed border-paper/30"
          style={{ backgroundImage: shotHatch }}
        >
          <Label size="2xs">Project shot</Label>
        </div>
        <Label as="div" size="xs" className="leading-relaxed">
          {study.meta.join(" · ")}
        </Label>
      </div>
    </div>
  );

  const toggleButton = (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={panelId}
      className="flex w-full flex-col gap-2 px-5 py-[18px] text-left"
    >
      <span className="flex items-baseline justify-between gap-4">
        <span className={layout === "line" ? "whitespace-nowrap text-[17px] font-bold" : "text-[17px] font-bold"}>
          {study.title}
        </span>
        {/* One-off mono text (13px, no uppercase/tracking) — doesn't fit the
            Label primitive's uppercase-tracking-wide base, kept inline. */}
        <span className="font-mono text-[13px] text-paper/50">
          {expanded ? "× CLOSE" : "+ OPEN"}
        </span>
      </span>
      <span
        className={
          layout === "line"
            ? "max-w-[280px] text-[12.5px] leading-snug text-paper/60"
            : "text-[12.5px] leading-snug text-paper/60"
        }
      >
        {study.teaser}
      </span>
      <Chip variant="solid" className="self-start">
        {study.kpiTeaser}
      </Chip>
    </button>
  );

  // --- Vertical stack (mobile / reduced motion) -------------------------
  if (layout === "stack") {
    return (
      <article className="py-6">
        <Label className="mb-2.5">
          {study.year} · {study.role}
        </Label>
        <Card padding="none" state={expanded ? "active" : "default"}>
          {toggleButton}
          {expanded && detail}
        </Card>
      </article>
    );
  }

  // --- Horizontal Career Line stop --------------------------------------
  return (
    <div className="relative flex flex-none flex-col items-stretch pb-32">
      <Label tone={expanded ? "accent" : "muted"} className="mb-2.5">
        {study.year} · {study.role}
      </Label>

      <div
        className="relative z-[1] transition-[width] duration-500 ease-out"
        style={{
          width: expanded ? site.journey.expandedWidthPx : site.journey.stopWidthPx,
        }}
      >
        <Card padding="none" state={expanded ? "active" : "default"}>
          {toggleButton}
          {expanded && detail}
        </Card>
      </div>

      {/* Marker dot sitting on the dashed line */}
      <span
        aria-hidden
        className={`absolute bottom-[89px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-paper ${
          expanded ? "bg-accent" : "bg-ink"
        }`}
      />
    </div>
  );
}
