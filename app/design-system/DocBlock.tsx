import { type ReactNode } from "react";
import { Label } from "@/components/ui";

/** Labeled wrapper for a primitive's variant matrix. */
export function PrimitiveBlock({
  title,
  file,
  children,
}: {
  title: string;
  file: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <Label size="xs">{file}</Label>
      </div>
      {children}
    </div>
  );
}

/**
 * Labeled wrapper for a real, live-mounted section component. Deliberately
 * unstyled (no border/overflow wrapper) so it never interferes with a
 * component's own layout, positioning, or scroll math (CareerLine's
 * transform is relative to real document scroll; Hero is min-h-screen) —
 * every section already renders its own top divider, so no extra framing
 * is needed for visual separation.
 */
export function ComponentBlock({
  title,
  file,
  note,
  children,
}: {
  title: string;
  file: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 px-6 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <Label size="xs">{file}</Label>
        </div>
        {note && <p className="max-w-2xl text-sm text-paper/60">{note}</p>}
      </div>
      {children}
    </div>
  );
}
