"use client";

import { useSyncExternalStore } from "react";
import { Label } from "@/components/ui";

/**
 * Reads token values live via getComputedStyle instead of hardcoding a
 * second copy of the hex/oklch strings from globals.css — so this can't
 * silently drift out of sync if a token changes there. Tokens are static
 * (no runtime mutation), so `subscribe` is a no-op — same
 * useSyncExternalStore pattern as lib/useReducedMotion.ts, which avoids the
 * setState-in-effect lint error a plain useEffect+useState version hits.
 */
const TOKENS = [
  { cssVar: "--color-ink", label: "Ink", usage: "Default background · About section text" },
  { cssVar: "--color-paper", label: "Paper", usage: "Default text · About section background" },
  { cssVar: "--color-accent", label: "Accent", usage: "The single reskin knob — CTAs, highlights" },
  { cssVar: "--color-surface", label: "Surface", usage: "Raised cards on ink (expanded stop, Measure cell)" },
] as const;

function subscribe() {
  return () => {};
}

function getSnapshot() {
  const styles = getComputedStyle(document.documentElement);
  return TOKENS.map((token) => styles.getPropertyValue(token.cssVar).trim()).join("|");
}

function getServerSnapshot() {
  return TOKENS.map(() => "").join("|");
}

export default function ColorSwatches() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const values = snapshot.split("|");

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {TOKENS.map((token, i) => (
        <div key={token.cssVar} className="flex flex-col gap-2">
          <div
            className="h-16 rounded-lg border border-paper/20"
            style={{ background: `var(${token.cssVar})` }}
            aria-hidden
          />
          <div className="text-sm font-bold">{token.label}</div>
          <Label size="xs">{token.cssVar}</Label>
          <Label size="xs">{values[i] || "…"}</Label>
          <p className="text-[12px] leading-snug text-paper/60">{token.usage}</p>
        </div>
      ))}
    </div>
  );
}
