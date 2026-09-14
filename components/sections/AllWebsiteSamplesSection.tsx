"use client";

import { useEffect, useState } from "react";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import {
  allWebsiteSamplesContent,
  type AllSampleItem,
  type AllSampleRow,
} from "@/lib/site-config";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Section 4 — Tất cả mẫu websites theo 10 nhóm ngành.
 * Heading giữa + grid flexible MSN + Embla carousel (prev/next, autoplay, swipe).
 * Vị trí item wide mỗi hàng random sau khi mount.
 * Click mẫu → Form "Đăng ký ngay".
 */
export function AllWebsiteSamplesSection() {
  const { heading, tagline, pages, autoplayMs } = allWebsiteSamplesContent;
  const pageCount = Math.max(1, pages.length);
  /** Pages sau khi random vị trí wide — tránh lệch SSR/CSR */
  const [mosaicPages, setMosaicPages] = useState<AllSampleRow[][]>(pages);
  const { openContactForm } = useContactForm();

  useEffect(() => {
    setMosaicPages(pages.map((page) => page.map(randomizeRowWide)));
  }, [pages]);

  return (
    <section
      id="mau-carousel"
      aria-labelledby="all-samples-heading"
      aria-roledescription="carousel"
      className="scroll-mt-24 bg-bg-secondary px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-site">
        <header className="mb-10 text-center sm:mb-14">
          <h2
            id="all-samples-heading"
            className="text-2xl font-bold uppercase text-foreground sm:text-3xl md:text-4xl"
          >
            {heading}
          </h2>
          {tagline ? (
            <p className="mt-4 text-sm font-semibold uppercase text-muted sm:text-base">
              {tagline}
            </p>
          ) : null}
        </header>
      </div>

      <Carousel
        className="mx-auto max-w-[min(100%,calc(var(--site-max)+5.5rem))]"
        options={{ loop: pageCount > 1, watchDrag: pageCount > 1 }}
        autoplayMs={pageCount > 1 ? autoplayMs : undefined}
        slideGap="4-5"
        sideControls={{
          prevLabel: "Trang mẫu trước",
          nextLabel: "Trang mẫu sau",
        }}
        dotsLabel="Trang mẫu website"
      >
        {mosaicPages.map((page, index) => (
          <CarouselSlide key={`all-samples-page-${index}`}>
            <div className="w-full space-y-4 sm:space-y-5">
              {page.map((row, rowIndex) => (
                <ul
                  key={`all-samples-row-${index}-${rowIndex}`}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5"
                >
                  {row.map((item) => (
                    <li
                      key={item.id}
                      className={cx(
                        item.size === "wide" && "sm:col-span-2 lg:col-span-2",
                        item.size === "small" && "lg:col-span-1",
                      )}
                    >
                      <SampleCard
                        item={item}
                        onSelect={() =>
                          openContactForm({
                            variant: "register",
                            selectedSample: item.title,
                          })
                        }
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}

function SampleCard({
  item,
  onSelect,
}: {
  item: AllSampleItem;
  onSelect: () => void;
}) {
  return (
    <article className="group relative min-h-[200px] overflow-hidden rounded-2xl border border-card-border transition-colors duration-200 hover:border-cta sm:min-h-[220px] lg:min-h-[240px]">
      <button
        type="button"
        onClick={onSelect}
        className="absolute inset-0 block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cta"
        aria-label={`Đăng ký mẫu ${item.title}`}
      >
        <ZoomableImage
          src={item.image.src}
          alt={item.image.alt}
          fill
          zoom={false}
          unoptimized={item.image.src.endsWith(".svg")}
          className="object-cover"
          frameClassName="absolute inset-0 h-full w-full"
          sizes={
            item.size === "wide"
              ? "(max-width: 1024px) 100vw, 40vw"
              : "(max-width: 1024px) 50vw, 20vw"
          }
        />

        <div className="absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-4">
          <span className="max-w-[min(100%,18rem)] rounded-lg bg-bg-primary px-3 py-2 text-center text-xs font-bold leading-snug tracking-wide text-foreground shadow-sm transition-colors duration-200 group-hover:text-cta sm:max-w-none sm:px-4 sm:text-sm md:text-base">
            {item.title}
          </span>
        </div>
      </button>
    </article>
  );
}

/** Hàng đủ 4: đúng 1 wide. Hàng ngắn (≤2): tất cả wide để cân lưới. */
function randomizeRowWide(row: AllSampleRow): AllSampleRow {
  if (row.length <= 2) {
    return row.map((item) => ({ ...item, size: "wide" as const }));
  }
  const wideIndex = Math.floor(Math.random() * row.length);
  return row.map((item, index) => ({
    ...item,
    size: index === wideIndex ? ("wide" as const) : ("small" as const),
  }));
}
