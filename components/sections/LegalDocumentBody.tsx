import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { formatLegalHeading } from "@/components/sections/LegalDocumentHeader";
import type {
  LegalDocumentBlock,
  LegalListItem,
  LegalPageContent,
} from "@/lib/site-config";

type LegalDocumentBodyProps = {
  content: LegalPageContent;
  /** false khi trang đã render `LegalDocumentHeader` (tránh lặp tiêu đề). */
  showChrome?: boolean;
};

/**
 * Thân trang pháp lý — nền kem, cột trắng giữa (cùng nhịp bài tin tức).
 * Mặc định gồm breadcrumb + h1; tắt `showChrome` nếu dùng kèm header navy.
 */
export function LegalDocumentBody({
  content,
  showChrome = true,
}: LegalDocumentBodyProps) {
  return (
    <section
      aria-labelledby={showChrome ? "legal-document-heading" : undefined}
      aria-label={showChrome ? undefined : "Nội dung văn bản"}
      className="bg-bg-secondary py-10 px-5"
    >
      {showChrome ? (
        <div className="mx-auto max-w-[1280px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-muted sm:mb-8"
          >
            <ol className="flex min-w-0 flex-nowrap items-center gap-1.5">
              <li className="shrink-0">
                <Link
                  href="/"
                  className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                >
                  {content.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden className="shrink-0 text-card-border">
                /
              </li>
              <li
                aria-current="page"
                className="min-w-0 truncate font-medium text-foreground"
              >
                {content.breadcrumbCurrent}
              </li>
            </ol>
          </nav>
        </div>
      ) : null}

      <article className="mx-auto max-w-[1280px] bg-bg-primary px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        {showChrome ? (
          <Reveal amount={0.35}>
            <h1
              id="legal-document-heading"
              className="text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2rem]"
            >
              {formatLegalHeading(content.heading, content.headingLineBreakBefore)}
            </h1>
            {content.description ? (
              <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-foreground/85 sm:mt-6 sm:text-[0.9375rem] sm:leading-[1.75]">
                {content.description}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        <div className={showChrome ? "mt-6 space-y-5 sm:mt-8 sm:space-y-6" : "space-y-5 sm:space-y-6"}>
          {content.blocks.map((block, index) => (
            <Reveal key={`${block.type}-${index}`} amount="some">
              <DocumentBlock block={block} />
            </Reveal>
          ))}
        </div>
      </article>
    </section>
  );
}

function listItemKey(item: LegalListItem) {
  return typeof item === "string" ? item : item.text;
}

function listItemText(item: LegalListItem) {
  return typeof item === "string" ? item : item.text;
}

function listItemChildren(item: LegalListItem) {
  return typeof item === "string" ? undefined : item.children;
}

function DocumentBlock({ block }: { block: LegalDocumentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem] sm:leading-[1.75]">
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            id={block.id}
            className="scroll-mt-28 pt-2 text-xl font-bold leading-snug tracking-tight text-foreground sm:pt-3 sm:text-2xl"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={block.id}
          className="scroll-mt-28 pt-1 text-base font-bold leading-snug text-foreground sm:text-lg"
        >
          {block.text}
        </h3>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      const listClass = block.ordered
        ? "list-decimal space-y-4 pl-5 text-sm leading-relaxed text-foreground/85 marker:font-semibold marker:text-logo-web sm:text-[0.9375rem] sm:leading-[1.75]"
        : "list-disc space-y-3 pl-5 text-sm leading-relaxed text-foreground/85 marker:text-logo-web sm:text-[0.9375rem] sm:leading-[1.75]";

      return (
        <ListTag className={listClass}>
          {block.items.map((item) => {
            const children = listItemChildren(item);
            return (
              <li key={listItemKey(item)} className="pl-1">
                {listItemText(item)}
                {children ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted">
                    {children.map((child) => (
                      <li key={child}>{child}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ListTag>
      );
    }
    case "image":
      return (
        <figure className="py-1 sm:py-2">
          <Image
            src={block.src}
            alt={block.alt}
            width={800}
            height={450}
            quality={100}
            sizes="(max-width: 768px) 100vw, 80rem"
            className="h-auto w-full object-contain"
          />
        </figure>
      );
    case "note":
      return (
        <aside className="rounded-2xl border border-card-border bg-bg-secondary px-5 py-6 sm:px-7 sm:py-7">
          <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {block.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem] sm:leading-[1.75]">
            {block.text}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/85 sm:text-[0.9375rem]">
            {block.contacts.map((contact) => (
              <li key={contact.label}>
                <span className="font-semibold text-foreground">
                  {contact.label}:{" "}
                </span>
                <a
                  href={contact.href}
                  {...(contact.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                >
                  {contact.value}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      );
    default:
      return null;
  }
}
