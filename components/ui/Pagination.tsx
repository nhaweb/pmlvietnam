import Link from "next/link";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a page number (page 1 should map to the canonical URL). */
  hrefForPage: (page: number) => string;
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
};

const BUTTON_BASE =
  "inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-2 border-cta px-2 text-sm font-semibold tabular-nums";

const BUTTON_INTERACTIVE =
  "bg-transparent text-cta transition-[color,background-color,transform] duration-200 hover:bg-cta hover:text-white active:scale-95 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

/**
 * Link-based pagination — prev/next + page numbers, same orange circle style
 * as the home carousel buttons. Crawlable (real `<a href>`), works without JS.
 */
export function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  label = "Phân trang",
  prevLabel = "Trang trước",
  nextLabel = "Trang sau",
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageItems(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label={label} className={cx("flex justify-center", className)}>
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <li>
          <EdgeButton
            direction="prev"
            label={prevLabel}
            href={hasPrev ? hrefForPage(currentPage - 1) : undefined}
          />
        </li>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              aria-hidden
              className="inline-flex h-10 w-6 items-center justify-center text-sm font-semibold text-cta"
            >
              …
            </li>
          ) : (
            <li key={page}>
              {page === currentPage ? (
                <span
                  aria-current="page"
                  className={cx(BUTTON_BASE, "bg-cta text-white")}
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={hrefForPage(page)}
                  aria-label={`Trang ${page}`}
                  className={cx(BUTTON_BASE, BUTTON_INTERACTIVE)}
                >
                  {page}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          <EdgeButton
            direction="next"
            label={nextLabel}
            href={hasNext ? hrefForPage(currentPage + 1) : undefined}
          />
        </li>
      </ul>
    </nav>
  );
}

function EdgeButton({
  direction,
  label,
  href,
}: {
  direction: "prev" | "next";
  label: string;
  href?: string;
}) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cx(BUTTON_BASE, "w-10 px-0 text-cta opacity-35")}
      >
        <ChevronIcon direction={direction} />
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      rel={direction}
      className={cx(BUTTON_BASE, BUTTON_INTERACTIVE, "w-10 px-0")}
    >
      <ChevronIcon direction={direction} />
    </Link>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-5 w-5">
      <path
        d={
          direction === "prev"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** First, last, current ±1; gaps collapse to an ellipsis (gap of 1 shows the page instead). */
function pageItems(current: number, total: number): Array<number | "ellipsis"> {
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...wanted]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const items: Array<number | "ellipsis"> = [];
  for (const page of sorted) {
    const prev = items[items.length - 1];
    if (typeof prev === "number") {
      if (page - prev === 2) items.push(prev + 1);
      else if (page - prev > 2) items.push("ellipsis");
    }
    items.push(page);
  }
  return items;
}
