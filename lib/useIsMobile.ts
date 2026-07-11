"use client";

import { useSyncExternalStore } from "react";

// The Career Line's horizontal scroll mechanic is desktop-first per the
// design brief; below this width it falls back to a vertical stack
// (components/CareerLine.tsx), same as the prefers-reduced-motion path.
const QUERY = "(max-width: 767px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  // No viewport info on the server — default to desktop, matching the
  // "line" layout that Phase 3 renders by default.
  return false;
}

/** True below the mobile breakpoint (max-width: 767px). */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
