import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * The bordered rounded panel shell — previously copy-pasted between
 * SkillsProcess's skill cards, Testimonials' quote cards, and hand-rolled
 * as a ternary in CaseStudyStop's collapsed/expanded stop container.
 * `state="active"` reproduces CaseStudyStop's "expanded" treatment; static
 * cards (Skills/Testimonials) just use the default state. `padding="none"`
 * lets CaseStudyStop control its own inner spacing (toggle button + detail
 * panel each need different padding) rather than one uniform card inset.
 */
const card = tv({
  base: "overflow-hidden rounded-[10px]",
  variants: {
    state: {
      default: "border border-paper/20 bg-ink",
      active: "border-[1.5px] border-paper bg-surface",
    },
    padding: {
      none: "",
      md: "p-[26px]",
    },
  },
  defaultVariants: {
    state: "default",
    padding: "md",
  },
});

type CardVariants = VariantProps<typeof card>;

type Props<T extends ElementType> = CardVariants & {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | keyof CardVariants>;

export default function Card<T extends ElementType = "div">({
  as,
  state,
  padding,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={card({ state, padding, className })} {...rest}>
      {children}
    </Tag>
  );
}
