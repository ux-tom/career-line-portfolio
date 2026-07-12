import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * The mono pill button — previously 4 near-identical but not identical
 * implementations (Nav's CV pill, About's CV button, Contact's 3 buttons).
 * `tone` picks which section background it sits on (controls fill/outline
 * direction); `variant` picks how loud it is; `size` picks scale.
 *
 * Note: `size="md"` unifies two previously-different paddings (About's CV
 * button was px-[18px] py-2.5, Contact's were px-[22px] py-3) onto Contact's
 * — a deliberate fix of accidental drift, not a behavior change.
 */
const button = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono uppercase tracking-wide transition-colors",
  variants: {
    variant: {
      solid: "",
      outline: "border",
      ghost: "border",
    },
    tone: {
      onInk: "",
      onPaper: "",
    },
    size: {
      sm: "px-3 py-1.5 text-[11px]",
      md: "px-[22px] py-3 text-[12px]",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      tone: "onInk",
      class: "bg-paper text-ink hover:opacity-90",
    },
    {
      variant: "solid",
      tone: "onPaper",
      class: "bg-ink text-paper hover:opacity-90",
    },
    {
      variant: "outline",
      tone: "onInk",
      class: "border-paper text-paper hover:bg-paper hover:text-ink",
    },
    {
      variant: "outline",
      tone: "onPaper",
      class: "border-ink text-ink hover:bg-ink hover:text-paper",
    },
    {
      variant: "ghost",
      tone: "onInk",
      class: "border-paper/30 text-paper/70 hover:border-paper hover:text-paper",
    },
    {
      variant: "ghost",
      tone: "onPaper",
      class: "border-ink/30 text-ink/70 hover:border-ink hover:text-ink",
    },
  ],
  defaultVariants: {
    variant: "solid",
    tone: "onInk",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;
type OwnProps = ButtonVariants & { className?: string };

type AsAnchor = OwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = OwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export default function Button(props: AsAnchor | AsButton) {
  const { variant, tone, size, className, ...rest } = props;
  const classes = button({ variant, tone, size, className });

  if (rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
