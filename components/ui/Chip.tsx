import { type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * KPI / label chip. Unifies CaseStudyStop's two prior chip treatments (an
 * outlined KPI chip and a solid kpiTeaser chip) — both now share the same
 * `uppercase tracking-wide` base, a small consistency fix over the original
 * (the solid variant previously lacked `tracking-wide`).
 */
const chip = tv({
  base: "inline-flex whitespace-nowrap items-center rounded font-mono text-[11px] uppercase tracking-wide",
  variants: {
    variant: {
      solid: "bg-paper px-[9px] py-[3px] text-ink",
      outline: "border border-paper/30 px-[9px] py-1 text-paper",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

type Props = VariantProps<typeof chip> & {
  className?: string;
  children: ReactNode;
};

export default function Chip({ variant, className, children }: Props) {
  return <span className={chip({ variant, className })}>{children}</span>;
}
