import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { newsPageContent } from "@/lib/site-config";

/**
 * Banner đầu trang listing `/tin-tuc`.
 * Vị trí title đồng bộ `/san-pham` — offset giữa-trái trên vùng nền trống.
 */
export function NewsPageBanner() {
  const { heading, description, banner, breadcrumbHome, breadcrumbCurrent } =
    newsPageContent;

  return (
    <section
      aria-labelledby="news-listing-heading"
      className="relative isolate overflow-hidden bg-secondary"
    >
      <div className="relative mx-auto w-full min-h-[11.5rem] sm:min-h-[13rem] md:aspect-[1920/500] md:min-h-0 md:max-h-[500px]">
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[38%_center] sm:object-[42%_center] md:object-center"
        />

        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <Reveal
            amount={0.35}
            className="ml-[12%] max-w-[min(36rem,58%)] sm:ml-[16%] sm:max-w-[min(40rem,52%)] md:ml-[18%] lg:ml-[20%]"
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-2 text-sm text-logo-web/70"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-logo-web focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden className="text-logo-web/40">
                  /
                </li>
                <li className="font-semibold text-logo-web">
                  {breadcrumbCurrent}
                </li>
              </ol>
            </nav>

            <div>
              <h1
                id="news-listing-heading"
                className="text-2xl font-bold leading-[1.15] tracking-tight text-logo-web sm:text-3xl md:text-4xl"
              >
                {heading}
              </h1>
              {description ? (
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-logo-web/80 sm:mt-2.5 sm:max-w-[42ch] sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
