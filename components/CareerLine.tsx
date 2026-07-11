"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
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
export default function CareerLine() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
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

  if (!useLine) {
    return (
      <section id="work" aria-label="Career line" className="px-6 py-24">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
          Work — the career line
        </h2>
        <div className="mt-10 flex flex-col divide-y divide-paper/10">
          {caseStudies.map((study) => (
            <CaseStudyStop
              key={study.id}
              study={study}
              expanded={expandedId === study.id}
              onToggle={() => toggle(study.id)}
              layout="stack"
            />
          ))}
        </div>
        <NextStopLink layout="stack" />
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={wrapperRef}
      aria-label="Career line"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <h2 className="pointer-events-none absolute left-6 top-8 z-10 font-mono text-[11px] uppercase tracking-widest text-paper/50">
          Work — the career line
        </h2>
        <div className="flex flex-1 items-center">
          <div
            ref={trackRef}
            className="flex items-center gap-16 pl-[8vw] pr-[20vw] will-change-transform"
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
            <NextStopLink layout="line" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NextStopLink({ layout }: { layout: "line" | "stack" }) {
  return (
    <a
      href="#contact"
      className={
        layout === "line"
          ? "flex shrink-0 flex-col items-start gap-2 border-l border-accent/40 pl-6"
          : "mt-10 flex flex-col items-start gap-2 border-t border-accent/40 pt-6"
      }
      style={layout === "line" ? { width: site.journey.stopWidthPx } : undefined}
    >
      <span className="font-mono text-[11px] tracking-wide text-paper/50">
        Next stop
      </span>
      <span className="text-lg font-medium text-accent">Your project →</span>
    </a>
  );
}
