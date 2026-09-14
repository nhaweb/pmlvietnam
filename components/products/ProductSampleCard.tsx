import Link from "next/link";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import {
  productSampleHref,
  type ProductSampleItem,
} from "@/lib/site-config";

/**
 * Card mẫu giao diện — click → trang chi tiết `/san-pham/[slug]`.
 * Hover: orange border + title color.
 */
export function ProductSampleCard({ item }: { item: ProductSampleItem }) {
  return (
    <article className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-card-border bg-card transition-colors duration-200 hover:border-cta sm:min-h-[240px]">
      <Link
        href={productSampleHref(item)}
        className="absolute inset-0 block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cta"
        aria-label={`Xem mẫu ${item.title}`}
      >
        <ZoomableImage
          src={item.image.src}
          alt={item.image.alt}
          fill
          zoom={false}
          unoptimized={item.image.src.endsWith(".svg")}
          className="object-cover object-top"
          frameClassName="absolute inset-0 h-full w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 sm:text-xs">
            {item.groupLabel}
          </p>
          <span className="inline-block max-w-full rounded-lg bg-bg-primary px-3 py-2 text-xs font-bold leading-snug text-foreground shadow-sm transition-colors duration-200 group-hover:text-cta sm:text-sm">
            {item.title}
          </span>
        </div>
      </Link>
    </article>
  );
}
