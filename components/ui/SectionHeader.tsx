import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";
import Label from "./Label";

/**
 * The eyebrow/heading row repeated in SkillsProcess, Testimonials, and
 * CareerLine. `size="compact"` preserves CareerLine's smaller heading (its
 * sticky viewport is height-constrained) as an intentional named variant —
 * previously that was an accidental `sm:text-[34px]` vs `sm:text-[40px]`
 * drift rather than a deliberate choice.
 *
 * Outer spacing (margin/padding) is left to the caller via `className`,
 * since that varies legitimately by where the header sits (Skills/
 * Testimonials need `mb-12`; CareerLine's sits in its own padded wrapper).
 */
const heading = tv({
  base: "font-bold tracking-tight",
  variants: {
    size: {
      default: "text-[28px] sm:text-[40px]",
      compact: "text-[28px] sm:text-[34px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Props = VariantProps<typeof heading> & {
  title: string;
  label?: string;
  className?: string;
};

export default function SectionHeader({ title, label, size, className }: Props) {
  return (
    <div className={clsx("flex items-baseline justify-between gap-4", className)}>
      <h2 className={heading({ size })}>{title}</h2>
      {label && (
        <Label size="sm" tone="muted" className="hidden sm:block">
          {label}
        </Label>
      )}
    </div>
  );
}
