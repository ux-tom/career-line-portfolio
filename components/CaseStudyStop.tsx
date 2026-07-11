"use client";

import type { CaseStudy } from "@/data/caseStudies";
import { site } from "@/data/site";

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
              <span className="shrink-0 font-mono text-[10px] text-accent">
                0{i + 1}
              </span>
              <span className="text-[12px] leading-relaxed text-paper/60">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2">
          {study.kpis.map((kpi) => (
            <span
              key={kpi}
              className="whitespace-nowrap rounded border border-paper/30 px-[9px] py-1 font-mono text-[11px] uppercase tracking-wide text-paper"
            >
              {kpi}
            </span>
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
          <span className="font-mono text-[10px] uppercase tracking-wide text-paper/50">
            Project shot
          </span>
        </div>
        <div className="font-mono text-[10.5px] leading-relaxed text-paper/50">
          {study.meta.join(" · ")}
        </div>
      </div>
    </div>
  );

  // --- Vertical stack (mobile / reduced motion) -------------------------
  if (layout === "stack") {
    return (
      <article className="py-6">
        <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wide text-paper/50">
          {study.year} · {study.role}
        </div>
        <div
          className={`overflow-hidden rounded-[10px] ${
            expanded ? "border-[1.5px] border-paper bg-surface" : "border border-paper/20 bg-ink"
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="flex w-full flex-col gap-2 px-5 py-[18px] text-left"
          >
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-[17px] font-bold">{study.title}</span>
              <span className="font-mono text-[13px] text-paper/50">
                {expanded ? "× CLOSE" : "+ OPEN"}
              </span>
            </span>
            <span className="text-[12.5px] leading-snug text-paper/60">
              {study.teaser}
            </span>
            <span className="self-start whitespace-nowrap rounded bg-paper px-[9px] py-[3px] font-mono text-[11px] text-ink">
              {study.kpiTeaser}
            </span>
          </button>
          {expanded && detail}
        </div>
      </article>
    );
  }

  // --- Horizontal Career Line stop --------------------------------------
  return (
    <div className="relative flex flex-none flex-col items-stretch pb-24">
      <div
        className={`mb-2.5 font-mono text-[11px] uppercase tracking-wide ${
          expanded ? "text-accent" : "text-paper/50"
        }`}
      >
        {study.year} · {study.role}
      </div>

      <div
        className={`relative z-[1] overflow-hidden rounded-[10px] transition-[width] duration-500 ease-out ${
          expanded ? "border-[1.5px] border-paper bg-surface" : "border border-paper/20 bg-ink"
        }`}
        style={{
          width: expanded ? site.journey.expandedWidthPx : site.journey.stopWidthPx,
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="flex w-full flex-col gap-2 px-5 py-[18px] text-left"
        >
          <span className="flex items-baseline justify-between gap-4">
            <span className="whitespace-nowrap text-[17px] font-bold">
              {study.title}
            </span>
            <span className="font-mono text-[13px] text-paper/50">
              {expanded ? "× CLOSE" : "+ OPEN"}
            </span>
          </span>
          <span className="max-w-[280px] text-[12.5px] leading-snug text-paper/60">
            {study.teaser}
          </span>
          <span className="self-start whitespace-nowrap rounded bg-paper px-[9px] py-[3px] font-mono text-[11px] text-ink">
            {study.kpiTeaser}
          </span>
        </button>
        {expanded && detail}
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
