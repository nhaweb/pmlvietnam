import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type CTAButtonProps = {
  children: ReactNode;
  className?: string;
  /** When set, renders Next.js Link instead of button */
  href?: string;
  target?: string;
  rel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/**
 * Primary CTA — nền cam #F97316, chữ trắng, bo tròn, hover lift.
 */
export function CTAButton({
  children,
  className,
  href,
  target,
  rel,
  type = "button",
  onClick,
  ...buttonProps
}: CTAButtonProps) {
  const classes = cx(baseClassName, className);

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick as never}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
}
