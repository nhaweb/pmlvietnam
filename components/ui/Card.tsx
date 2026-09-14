import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Optional media slot (image) — sits above body, clipped by card radius */
  media?: ReactNode;
  as?: "article" | "div" | "li" | "section";
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Shared card — border + full background fill (ref luvini.vn product cards).
 */
export function Card({
  children,
  media,
  className,
  as: Tag = "article",
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cx(
        "flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card",
        className,
      )}
      {...rest}
    >
      {media ? (
        <div className="relative shrink-0 overflow-hidden bg-bg-secondary">
          {media}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-4 sm:p-5">{children}</div>
    </Tag>
  );
}
