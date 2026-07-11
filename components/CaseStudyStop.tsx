"use client";

import type { CaseStudy } from "@/data/caseStudies";
import { site } from "@/data/site";

function KpiChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-paper/25 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-paper/80">
      <span className="text-paper/50">{label}</span>
      <span className="text-accent">{value}</span>
    </span>
  );
}

type Props = {
  study: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
  /** "line" = horizontal Career Line stop; "stack" = vertical mobile/reduced-motion fallback. */
  layout: "line" | "stack";
};

export default function CaseStudyStop({ study, expanded, onToggle, layout }: Props) {
  const panelId = `stop-${study.id}-panel`;

  return (
    <article
      className={
        layout === "line"
          ? "relative shrink-0 border-l border-paper/20 pl-6 transition-[width] duration-300 ease-out"
          : "relative border-t border-paper/20 pt-6"
      }
      style={
        layout === "line"
          ? { width: expanded ? site.journey.expandedWidthPx : site.journey.stopWidthPx }
          : undefined
      }
    >
      {/* Marker dot on the line */}
      {layout === "line" && (
        <span
          aria-hidden
          className="absolute left-[-4.5px] top-0 h-2 w-2 rounded-full bg-accent"
        />
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="group flex w-full flex-col items-start gap-2 text-left"
      >
        <span className="font-mono text-[11px] tracking-wide text-paper/50">
          {study.year}
        </span>
        <span className="text-lg font-medium leading-snug sm:text-xl">
          {study.title}
        </span>
        <KpiChip label={study.teaser.label} value={study.teaser.value} />
        <span className="font-mono text-[11px] text-paper/50 group-hover:text-accent">
          {expanded ? "− collapse" : "+ expand"}
        </span>
      </button>

      {expanded && (
        <div id={panelId} className="mt-5 flex flex-col gap-5 pb-2">
          <p className="max-w-md text-sm leading-relaxed text-paper/80">
            {study.summary}
          </p>

          <ol className="flex flex-col gap-2">
            {study.process.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="font-mono text-[11px] text-paper/50">
                  0{i + 1}
                </span>
                <span className="text-sm">
                  <span className="font-medium">{step.title}.</span>{" "}
                  <span className="text-paper/70">{step.description}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-2">
            {study.kpis.map((kpi) => (
              <KpiChip key={kpi.label} label={kpi.label} value={kpi.value} />
            ))}
          </div>

          <div
            role="img"
            aria-label={study.projectShotAlt}
            className="flex aspect-video w-full max-w-md items-center justify-center border border-dashed border-paper/25 font-mono text-[11px] uppercase tracking-wide text-paper/50"
          >
            Project shot — placeholder
          </div>

          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[11px] text-paper/50">
            <dt>Role</dt>
            <dd>{study.role}</dd>
            <dt>Company</dt>
            <dd>{study.meta.company}</dd>
            <dt>Duration</dt>
            <dd>{study.meta.duration}</dd>
            <dt>Tools</dt>
            <dd>{study.meta.tools.join(" · ")}</dd>
          </dl>
        </div>
      )}
    </article>
  );
}
