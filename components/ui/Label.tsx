import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * The mono uppercase label pattern repeated across nearly every component
 * (eyebrows, meta lines, KPI meta, nav links, footer text). Two axes:
 * `surface` picks the right contrast-safe color for the section it sits on
 * (see the AA floor documented in globals.css), `tone` picks how loud it is.
 */
const label = tv({
  base: "font-mono uppercase tracking-wide",
  variants: {
    surface: {
      ink: "",
      paper: "",
    },
    tone: {
      muted: "",
      strong: "",
      accent: "text-accent",
    },
    size: {
      "2xs": "text-[10px]",
      xs: "text-[10.5px]",
      sm: "text-[11px]",
    },
  },
  compoundVariants: [
    { surface: "ink", tone: "muted", class: "text-paper/50" },
    { surface: "ink", tone: "strong", class: "text-paper/70" },
    { surface: "paper", tone: "muted", class: "text-ink/60" },
    { surface: "paper", tone: "strong", class: "text-ink/70" },
  ],
  defaultVariants: {
    surface: "ink",
    tone: "muted",
    size: "sm",
  },
});

type LabelVariants = VariantProps<typeof label>;

type Props<T extends ElementType> = LabelVariants & {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | keyof LabelVariants>;

export default function Label<T extends ElementType = "span">({
  as,
  surface,
  tone,
  size,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={label({ surface, tone, size, className })} {...rest}>
      {children}
    </Tag>
  );
}
