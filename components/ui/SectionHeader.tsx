import type { ReactNode } from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export type SectionHeaderProps = {
  headingId: string;
  title: ReactNode;
  eyebrow?: string;
  tagline?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
  /** `dark` — white titles for navy/photo bands */
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
};

/**
 * Shared section heading — eyebrow + sentence-case title + optional tagline.
 * Brand lockups (NHAWEB.VN, Nhà/Web) stay as passed in `title`.
 */
export function SectionHeader({
  headingId,
  title,
  eyebrow,
  tagline,
  as: Tag = "h2",
  align = "center",
  tone = "light",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const dark = tone === "dark";

  return (
    <header
      className={cx(
        align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.14em] text-cta uppercase sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={headingId}
        className={cx(
          "text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-[2rem] lg:leading-snug",
          dark ? "text-white" : "text-foreground",
          eyebrow && "mt-3",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {tagline ? (
        <p
          className={cx(
            "mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base",
            dark ? "text-white/80" : "text-muted",
          )}
        >
          {tagline}
        </p>
      ) : null}
    </header>
  );
}
