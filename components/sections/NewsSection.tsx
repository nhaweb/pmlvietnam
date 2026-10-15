"use client";

import { NewsCard } from "@/components/news/NewsCard";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { newsContent, type NewsItem } from "@/lib/site-config";

/**
 * Task 4 — Tin tức / Sự kiện mới nhất.
 * Heading giữa + grid 5 item/hàng + Embla carousel (prev/next, autoplay, swipe).
 */
export function NewsSection({ items }: { items: NewsItem[] }) {
  const { heading, tagline, itemsPerRow, autoplayMs } = newsContent;
  const pages = chunkItems(items, itemsPerRow);
  const pageCount = Math.max(1, pages.length);

  return (
    <section
      id="tin-tuc"
      aria-labelledby="news-heading"
      aria-roledescription="carousel"
      className="scroll-mt-24 bg-bg-secondary px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-site">
        <SectionHeader
          headingId="news-heading"
          title={heading}
          tagline={tagline}
          className="mb-10 sm:mb-14"
        />
        {items.length === 0 ? (
          <p className="text-sm text-muted sm:text-base">Chưa có bài viết.</p>
        ) : null}
      </div>

      {items.length > 0 ? (
      <Carousel
        className="mx-auto max-w-[min(100%,calc(var(--site-max)+5.5rem))]"
        options={{ loop: pageCount > 1, watchDrag: pageCount > 1 }}
        autoplayMs={pageCount > 1 ? autoplayMs : undefined}
        slideGap="4-5"
        sideControls={{
          prevLabel: "Tin trước",
          nextLabel: "Tin sau",
        }}
        dotsLabel="Trang tin tức"
      >
        {pages.map((page, index) => (
          <CarouselSlide key={`news-page-${index}`}>
            <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
              {page.map((item) => (
                <li key={item.id} className="min-h-0 h-full">
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          </CarouselSlide>
        ))}
      </Carousel>
      ) : null}
    </section>
  );
}

function chunkItems<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}
