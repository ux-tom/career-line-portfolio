"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineItem } from "@/lib/timeline";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Label, SectionHeader } from "@/components/ui";
import TimelineStop from "./TimelineStop";

/**
 * The Career Line — the site's centerpiece. A sticky section pins the
 * viewport while vertical scroll progress drives horizontal translateX
 * across a track of timeline stops (projects, awards, education — see
 * `lib/timeline.ts`). Click a stop to expand it in place.
 *
 * Falls back to a plain vertical stack when the user prefers reduced
 * motion, or below the mobile breakpoint (the horizontal mechanic is
 * desktop-first per the brief) — same data, same TimelineStop component,
 * no sticky/scroll math.
 */

type Props = {
  items: TimelineItem[];
};

/** Dashed horizontal "line" the stops sit on (reference parity). */
const dashedLine =
  "repeating-linear-gradient(90deg, var(--paper) 0 6px, transparent 6px 14px)";

/** Distance from the track's shared bottom baseline up to the line's vertical
 * center — matches each stop's marker dot (`bottom-[89px]` + half its own
 * height) so the line, the small dots, and the big terminal marker all sit
 * on the exact same horizontal plane. */
const LINE_OFFSET_PX = 96;

export default function CareerLine({ items }: Props) {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nextStopButtonRef = useRef<HTMLAnchorElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [lineWidthPx, setLineWidthPx] = useState(0);
  // Default-open whichever project is marked `featured` in its frontmatter
  // (falls back to the first project, or nothing if there are no projects).
  const defaultOpenId =
    items.find((item) => item.type === "project" && item.featured)?.id ??
    items.find((item) => item.type === "project")?.id ??
    null;
  const [expandedId, setExpandedId] = useState<string | null>(defaultOpenId);
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
  // Also measures the dashed line's stopping point: the horizontal distance
  // from the track's start to the center of the terminal "+" marker, so the
  // line — now drawn inside the (translated) track rather than as a fixed
  // viewport-width overlay — visually ends exactly at that marker at every
  // scroll position, not just at the final one.
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

      const button = nextStopButtonRef.current;
      if (button) {
        // getBoundingClientRect, not offsetLeft: the button sits inside its
        // own positioned wrapper (for its own centering), so offsetParent
        // wouldn't be the track. Rects stay comparable regardless of the
        // track's current scroll transform, since both move by the same delta.
        const trackRect = currentTrack.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        setLineWidthPx(buttonRect.left - trackRect.left + buttonRect.width / 2);
      }
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
    <SectionHeader
      title="The career line"
      label="Click a stop to open it · New work appends →"
      size="compact"
      className="px-6 sm:px-10"
    />
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
          {items.map((item) => (
            <TimelineStop
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => toggle(item.id)}
              layout="stack"
            />
          ))}
          <NextStopLink />
        </div>
      </section>
    );
  }

  const firstYear = items[0]?.year;
  const lineStats = firstYear
    ? `${items.length} stops · ${firstYear} — ${new Date().getFullYear()}`
    : "The line starts here";

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
            ref={trackRef}
            className="relative flex items-end gap-7 px-10 pr-[15vw] will-change-transform"
          >
            <div
              aria-hidden
              className="absolute left-0 h-0.5 opacity-70"
              style={{ backgroundImage: dashedLine, bottom: LINE_OFFSET_PX, width: lineWidthPx }}
            />
            {items.map((item) => (
              <TimelineStop
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => toggle(item.id)}
                layout="line"
              />
            ))}
            <NextStopNode buttonRef={nextStopButtonRef} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-6 pb-6 pt-3.5 sm:px-10">
          <Label>Keep scrolling to travel the line</Label>
          <Label>{lineStats}</Label>
        </div>
      </div>
    </section>
  );
}

/** Diameter of the terminal "+" marker, in px — bigger than a stop's 14px dot
 * so it reads as the line's endpoint, not just another stop. */
const NEXT_STOP_MARKER_PX = 88;

/** Breathing room between the "Next stop" label and the marker's top edge. */
const NEXT_STOP_LABEL_GAP_PX = 20;

/** End-of-track "your project" node (line mode): a large marker sitting
 * directly on the dashed line — same plane as every stop's dot, just bigger
 * — with an opaque fill so the line visually terminates into it rather than
 * bleeding through a transparent ring. The wrapper's bottom padding must
 * clear the marker's full vertical footprint (it pokes above the padding
 * region by design, to sit centered on the line) or its top edge overlaps
 * the label above it. */
function NextStopNode({ buttonRef }: { buttonRef: React.Ref<HTMLAnchorElement> }) {
  const markerTopPx = LINE_OFFSET_PX + NEXT_STOP_MARKER_PX / 2;
  return (
    <div
      className="relative flex flex-none flex-col items-center"
      style={{ width: 150, paddingBottom: markerTopPx + NEXT_STOP_LABEL_GAP_PX }}
    >
      <Label as="div" className="text-center leading-relaxed">
        Next stop:
        <br />
        Your project
      </Label>
      <a
        ref={buttonRef}
        href="#contact"
        aria-label="Next stop: your project — go to contact"
        className="absolute left-1/2 z-[1] flex -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-dashed border-paper/50 bg-ink text-3xl transition-colors hover:border-paper"
        style={{
          width: NEXT_STOP_MARKER_PX,
          height: NEXT_STOP_MARKER_PX,
          bottom: LINE_OFFSET_PX - NEXT_STOP_MARKER_PX / 2,
        }}
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
      <Label>Next stop</Label>
      <span className="text-lg font-bold text-accent">Your project →</span>
    </a>
  );
}
