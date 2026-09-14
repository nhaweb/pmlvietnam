"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  testimonialsContent,
  type TestimonialItem,
} from "@/lib/site-config";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Mục 5 — Nhận xét khách hàng.
 * Card layout ref web4s.vn; Embla carousel khi có nhiều review.
 */
export function TestimonialSection() {
  const { eyebrow, heading, items } = testimonialsContent;

  if (items.length === 0) return null;

  const single = items.length === 1;

  return (
    <section
      id="nhan-xet"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 bg-gradient-to-b from-bg-secondary via-[#F3F6FA] to-bg-primary"
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader
          headingId="testimonials-heading"
          eyebrow={eyebrow}
          title={heading}
        />

        <div className="relative mt-10 sm:mt-12">
          {single ? (
            <div className="flex justify-center">
              <div className="w-[min(100%,36rem)]">
                <TestimonialCard item={items[0]} />
              </div>
            </div>
          ) : (
            <Carousel
              options={{
                align: "start",
                containScroll: "trimSnaps",
                dragFree: false,
              }}
              slideGap="4-5"
              bottomControls={{
                prevLabel: "Nhận xét trước",
                nextLabel: "Nhận xét sau",
              }}
              disableWhenEdge
              dotsLabel="Trang nhận xét"
              showDots
            >
              {items.map((item) => (
                <CarouselSlide
                  key={item.id}
                  className={cx("basis-full sm:basis-1/2 lg:basis-1/3")}
                >
                  <TestimonialCard item={item} />
                </CarouselSlide>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="relative flex h-full gap-3 overflow-hidden rounded-2xl border border-card-border bg-card p-4 shadow-[0_8px_24px_rgba(11,31,58,0.06)] sm:gap-4 sm:p-5">
      <span
        className="pointer-events-none absolute right-3 top-2 text-5xl font-serif leading-none text-cta/20 select-none sm:right-4 sm:text-6xl"
        aria-hidden
      >
        “
      </span>
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full bg-bg-secondary ring-2 ring-cta/15 sm:h-20 sm:w-20">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          unoptimized={item.image.src.endsWith(".svg")}
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-foreground sm:text-base">
          {item.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted sm:text-sm">{item.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
          {item.quote}
        </p>
      </div>
    </article>
  );
}
