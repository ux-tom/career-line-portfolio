import { type ReactNode } from "react";
import clsx from "clsx";

/**
 * The pulsing-dot eyebrow pill — was duplicated near-verbatim in Hero and
 * Contact (identical except Hero added `self-start`, which callers can still
 * pass in via `className` since that's a layout concern, not a style one).
 */
export default function StatusPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-paper/70",
        className
      )}
    >
      <span
        className="h-2 w-2 rounded-full bg-accent"
        style={{ animation: "blinkDot 2s infinite" }}
      />
      {children}
    </span>
  );
}
