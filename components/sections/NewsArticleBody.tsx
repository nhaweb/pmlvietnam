import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import {
  newsPageContent,
  type NewsArticle,
  type NewsArticleBlock,
} from "@/lib/site-config";

/**
 * Thân bài tin tức — nền kem hai bên, cột trắng giữa (brief PML).
 * Reveal từng block (không wrap cả bài) để tránh opacity:0 kẹt trên nội dung dài.
 */
export function NewsArticleBody({ article }: { article: NewsArticle }) {
  const { blocks, meta } = article;
  const { breadcrumbHome, breadcrumbCurrent } = newsPageContent;

  return (
    <section
      aria-label="Nội dung bài viết"
      className="bg-bg-secondary py-10 px-5"
    >
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
                {breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden className="shrink-0 text-card-border">
              /
            </li>
            <li className="shrink-0">
              <Link
                href="/tin-tuc"
                className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              >
                {breadcrumbCurrent}
              </Link>
            </li>
            <li aria-hidden className="shrink-0 text-card-border">
              /
            </li>
            <li
              aria-current="page"
              className="min-w-0 truncate text-foreground"
              title={meta.title}
            >
              {meta.title}
            </li>
          </ol>
        </nav>
      </div>

      <article className="mx-auto max-w-[1280px] bg-bg-primary px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="space-y-5 sm:space-y-6">
          {blocks.map((block, index) => (
            <Reveal key={`${block.type}-${index}`} amount="some">
              <ArticleBlock block={block} />
            </Reveal>
          ))}
        </div>
      </article>
    </section>
  );
}

function ArticleBlock({ block }: { block: NewsArticleBlock }) {
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
          <h2 className="pt-2 text-xl font-bold leading-snug tracking-tight text-foreground sm:pt-3 sm:text-2xl">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="pt-1 text-base font-bold leading-snug text-foreground sm:text-lg">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="overflow-hidden py-1 sm:py-2">
          <Image
            src={block.src}
            alt={block.alt}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 80rem"
          />
        </figure>
      );
    case "tagline":
      return (
        <p className="pt-2 text-center text-sm font-semibold leading-relaxed text-foreground sm:pt-3 sm:text-base">
          {block.text}
        </p>
      );
    default:
      return null;
  }
}
