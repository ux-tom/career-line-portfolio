"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import CaseStudyStop from "./CaseStudyStop";

/**
 * The Career Line — the site's centerpiece. A sticky section pins the
 * viewport while vertical scroll progress drives horizontal translateX
 * across a track of case-study stops. Click a stop to expand it in place.
 *
 * Falls back to a plain vertical stack when the user prefers reduced
 * motion, or below the mobile breakpoint (the horizontal mechanic is
 * desktop-first per the brief) — same data, same CaseStudyStop component,
 * no sticky/scroll math.
 */

/** Dashed horizontal "line" the stops sit on (reference parity). */
const dashedLine =
  "repeating-linear-gradient(90deg, var(--paper) 0 6px, transparent 6px 14px)";

export default function CareerLine() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  // Default-open the "copilot" stop, matching the reference's initial state.
  const [expandedId, setExpandedId] = useState<string | null>("copilot");
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const useLine = !prefersReducedMotion && !isMobile;

  function toggle(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  // Measure how far the track overflows the viewport — that's how much
  // vertical scroll runway the wrapper section needs to provide. Re-runs
  // whenever the track's content changes width (e.g. a stop expands) via
  // ResizeObserver, so it self-corrects without a dedicated effect per stop.
  useEffect(() => {
    if (!useLine) return;
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const currentTrack = trackRef.current;
      if (!currentTrack) return;
      const trackWidth = currentTrack.scrollWidth;
      const viewportWidth = window.innerWidth;
      setScrollDistance(Math.max(trackWidth - viewportWidth, 0));
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [useLine]);

  // Drive the transform directly on the DOM node (not via React state) so
  // scrolling doesn't trigger a re-render every frame.
  useEffect(() => {
    if (!useLine || scrollDistance === 0) return;
    let raf = 0;

    function apply() {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;
      const scrolled = -wrapper.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / scrollDistance, 0), 1);
      track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`;
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [useLine, scrollDistance]);

  const header = (
    <div className="flex items-baseline justify-between gap-4 px-6 sm:px-10">
      <h2 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
        The career line
      </h2>
      <span className="hidden font-mono text-[11px] uppercase tracking-wide text-paper/50 sm:block">
        Click a stop to open it · New work appends →
      </span>
    </div>
  );

  // --- Vertical stack (mobile / reduced motion) -------------------------
  if (!useLine) {
    return (
      <section
        id="work"
        aria-label="Career line"
        className="border-t border-paper/15 py-20"
      >
        {header}
        <div className="mt-6 flex flex-col divide-y divide-paper/10 px-6 sm:px-10">
          {caseStudies.map((study) => (
            <CaseStudyStop
              key={study.id}
              study={study}
              expanded={expandedId === study.id}
              onToggle={() => toggle(study.id)}
              layout="stack"
            />
          ))}
          <NextStopLink />
        </div>
      </section>
    );
  }

  // --- Horizontal Career Line -------------------------------------------
  return (
    <section
      id="work"
      ref={wrapperRef}
      aria-label="Career line"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-t border-paper/15">
        <div className="pt-20">{header}</div>

        <div className="relative flex flex-1 items-end">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-24 h-0.5 opacity-70"
            style={{ backgroundImage: dashedLine }}
          />
          <div
            ref={trackRef}
            className="flex items-end gap-7 px-10 pr-[15vw] will-change-transform"
          >
            {caseStudies.map((study) => (
              <CaseStudyStop
                key={study.id}
                study={study}
                expanded={expandedId === study.id}
                onToggle={() => toggle(study.id)}
                layout="line"
              />
            ))}
            <NextStopNode />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-6 pb-6 pt-3.5 font-mono text-[11px] uppercase tracking-wide text-paper/50 sm:px-10">
          <span>Keep scrolling to travel the line</span>
          <span>4 stops · 2022 — 2026</span>
        </div>
      </div>
    </section>
  );
}

/** End-of-track "your project" node with the dashed + circle (line mode). */
function NextStopNode() {
  return (
    <div className="flex flex-none flex-col items-center gap-3 pb-[130px]" style={{ width: 150 }}>
      <div className="text-center font-mono text-[11px] uppercase leading-relaxed tracking-wide text-paper/50">
        Next stop:
        <br />
        Your project
      </div>
      <a
        href="#contact"
        aria-label="Next stop: your project — go to contact"
        className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-dashed border-paper/50 text-2xl transition-colors hover:border-paper"
      >
        +
      </a>
    </div>
  );
}

/** End-of-list CTA for the stacked fallback. */
function NextStopLink() {
  return (
    <a href="#contact" className="flex flex-col items-start gap-2 border-t border-accent/40 py-6">
      <span className="font-mono text-[11px] uppercase tracking-wide text-paper/50">
        Next stop
      </span>
      <span className="text-lg font-bold text-accent">Your project →</span>
    </a>
  );
}
