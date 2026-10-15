import { NewsCard } from "@/components/news/NewsCard";
import { Pagination } from "@/components/ui/Pagination";
import { Reveal } from "@/components/ui/Reveal";
import type { NewsItem } from "@/lib/site-config";

export const NEWS_LIST_ANCHOR = "danh-sach-tin";

export function newsPageHref(page: number) {
  return page <= 1 ? "/tin-tuc" : `/tin-tuc?page=${page}`;
}

/**
 * Danh sách tin tại `/tin-tuc` — bài đã xuất bản trên Sanity, phân trang theo `?page=`.
 */
export function NewsListingSection({
  items,
  currentPage = 1,
  totalPages = 1,
}: {
  items: NewsItem[];
  currentPage?: number;
  totalPages?: number;
}) {
  return (
    <section
      id={NEWS_LIST_ANCHOR}
      aria-label="Danh sách tin tức"
      className="scroll-mt-24 bg-bg-secondary px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-site">
        {items.length === 0 ? (
          <p className="text-sm text-muted sm:text-base">Chưa có bài viết.</p>
        ) : (
        <ul className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal
                amount={0.15}
                delay={(index % 4) * 0.06}
                className="h-full"
              >
                <NewsCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
        )}

        <Pagination
          className="mt-10 sm:mt-12"
          currentPage={currentPage}
          totalPages={totalPages}
          hrefForPage={(page) => `${newsPageHref(page)}#${NEWS_LIST_ANCHOR}`}
          label="Trang tin tức"
          prevLabel="Trang tin trước"
          nextLabel="Trang tin sau"
        />
      </div>
    </section>
  );
}
