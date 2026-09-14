"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import {
  websiteSamplesContent,
  type SampleItem,
} from "@/lib/site-config";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Section 3 — 5 nhóm ngành nổi bật (bento).
 * Bento: 1 card cao trái + lưới 2×2 bên phải.
 * Click nhóm ngành → trang `/san-pham` (lọc theo nhóm).
 */
export function WebsiteSamplesSection() {
  const { heading, tagline, items } = websiteSamplesContent;

  return (
    <section
      id="mau-website"
      aria-labelledby="samples-heading"
      className="bg-bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-site">
        <SectionHeader
          headingId="samples-heading"
          title={heading}
          tagline={tagline}
          className="mb-10 sm:mb-14"
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:min-h-[560px]">
          {items.map((item) => (
            <li
              key={item.id}
              className={cx(
                item.featured && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
                !item.featured && "min-h-[220px] sm:min-h-[240px]",
              )}
            >
              <SampleCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SampleCard({ item }: { item: SampleItem }) {
  return (
    <article
      className={cx(
        "group relative h-full overflow-hidden rounded-2xl border border-card-border transition-colors duration-200 hover:border-cta",
        item.featured ? "min-h-[320px] sm:min-h-[360px] lg:min-h-full" : "",
      )}
    >
      <Link
        href={item.href}
        className="absolute inset-0 block w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cta"
        aria-label={`Xem mẫu website ${item.title}`}
      >
        <ZoomableImage
          src={item.imageMobile.src}
          alt={item.imageMobile.alt}
          fill
          zoom={false}
          className="object-cover md:hidden"
          frameClassName="absolute inset-0 h-full w-full md:hidden"
          sizes="100vw"
        />
        <ZoomableImage
          src={item.image.src}
          alt={item.image.alt}
          fill
          zoom={false}
          className="object-cover hidden md:block"
          frameClassName="absolute inset-0 h-full w-full hidden md:block"
          sizes={
            item.featured
              ? "(max-width: 1024px) 100vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
          <span className="mx-auto block w-fit rounded-lg bg-bg-primary px-4 py-2.5 text-center text-sm font-bold tracking-wide text-foreground shadow-sm transition-colors duration-200 group-hover:text-cta sm:px-5 sm:text-base">
            {item.title}
          </span>
        </div>
      </Link>
    </article>
  );
}
