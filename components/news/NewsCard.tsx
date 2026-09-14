import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import type { NewsItem } from "@/lib/site-config";

/**
 * Card tin tức — dùng chung carousel trang chủ và listing `/tin-tuc`.
 * `h-full` + flex column để các card trong cùng hàng cao bằng nhau.
 */
export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={item.href} className="group flex h-full outline-none">
      <Card
        as="div"
        className="flex h-full w-full flex-col transition-colors duration-200 group-hover:border-cta"
        media={
          <ZoomableImage
            src={item.image.src}
            alt={item.image.alt}
            width={640}
            height={400}
            zoom={false}
            unoptimized={item.image.src.endsWith(".svg")}
            className="aspect-[4/3] w-full object-cover"
            frameClassName="aspect-[4/3] w-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
        }
      >
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center justify-between gap-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
            <span className="text-cta">{item.category}</span>
            <time dateTime={toIsoDate(item.date)}>{item.date}</time>
          </div>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-cta sm:text-[0.9375rem]">
            {item.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
            {item.excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}

/** Parse dd/MM/yyyy → yyyy-MM-dd for <time dateTime> */
function toIsoDate(displayDate: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(displayDate);
  if (!match) return undefined;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}
