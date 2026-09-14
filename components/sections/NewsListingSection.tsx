import { NewsCard } from "@/components/news/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { publishedNewsItems } from "@/lib/site-config";

/**
 * Danh sách tin tại `/tin-tuc` — chỉ bài đã có nội dung chi tiết.
 */
export function NewsListingSection() {
  const items = publishedNewsItems;

  return (
    <section
      aria-label="Danh sách tin tức"
      className="bg-bg-secondary px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-site">
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
      </div>
    </section>
  );
}
