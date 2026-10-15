import Link from "next/link";
import { NewsPortableText } from "@/components/news/NewsPortableText";
import { newsPageContent } from "@/lib/site-config";
import type { CmsNewsArticle } from "@/lib/news";

/**
 * Thân bài tin tức — nền kem hai bên, cột trắng giữa.
 * Nội dung Portable Text từ Sanity. Reveal từng block để nội dung dài không kẹt opacity.
 */
export function NewsArticleBody({ article }: { article: CmsNewsArticle }) {
  const { body, meta } = article;
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
          <NewsPortableText value={body} />
        </div>
      </article>
    </section>
  );
}
