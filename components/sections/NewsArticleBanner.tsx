import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { NewsArticle } from "@/lib/site-config";

/**
 * Banner bài tin tức — full-bleed ảnh + overlay tối, title + badge + ngày (ref web4s).
 */
export function NewsArticleBanner({ article }: { article: NewsArticle }) {
  const { meta, banner } = article;

  return (
    <section
      aria-labelledby="news-article-heading"
      className="relative isolate overflow-hidden bg-logo-web"
    >
      <div className="relative mx-auto w-full min-h-[14rem] sm:min-h-[16rem] md:aspect-[1920/560] md:min-h-0 md:max-h-[28rem]">
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-logo-web/55" aria-hidden />

        <div className="relative mx-auto flex h-full max-w-site items-center px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-20 lg:px-8 lg:pb-12">
          <Reveal amount={0.35}>
            <div className="max-w-3xl lg:max-w-4xl">
              <h1
                id="news-article-heading"
                className="text-2xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl"
              >
                {meta.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:mt-4 sm:gap-3">
                <span className="inline-flex items-center rounded-full bg-[#90cdf4] px-2.5 py-0.5 text-xs font-semibold text-logo-web sm:text-sm">
                  {banner.badge}
                </span>
                <time
                  dateTime={banner.publishedAtIso}
                  className="text-sm text-white/95 sm:text-[0.9375rem]"
                >
                  {banner.publishedAt}
                </time>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
