import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { productsPageContent, templateDetailContent } from "@/lib/site-config";

/**
 * Banner đầu trang `/san-pham`.
 * Mobile: ảnh riêng 768×768; md+: ảnh desktop 1920×500.
 * Text nằm trên vùng cam trống (giữa-trái), tránh cụm shape trái + laptop phải.
 */
export function ProductsPageBanner() {
  const { heading, description, banner, bannerMobile } = productsPageContent;
  const { breadcrumbHome, breadcrumbCatalog } = templateDetailContent;

  return (
    <section
      aria-labelledby="products-heading"
      className="relative isolate overflow-hidden bg-cta"
    >
      {/* Mobile banner */}
      <div className="relative mx-auto w-full md:hidden">
        <Image
          src={bannerMobile.src}
          alt={bannerMobile.alt}
          width={bannerMobile.width}
          height={bannerMobile.height}
          priority
          quality={90}
          sizes="100vw"
          className="h-auto w-full object-cover object-center"
        />
      </div>

      {/* Desktop banner */}
      <div className="relative mx-auto hidden w-full aspect-[1920/500] max-h-[500px] md:block">
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-site flex-col justify-center px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <Reveal
          amount={0.35}
          className="pointer-events-auto max-w-[min(36rem,85%)] sm:max-w-[min(40rem,70%)] md:ml-[18%] md:max-w-[min(40rem,52%)] lg:ml-[20%]"
        >
          <nav aria-label="Breadcrumb" className="mb-2 text-sm text-white/90">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden className="text-white/55">
                /
              </li>
              <li className="font-semibold text-white">{breadcrumbCatalog}</li>
            </ol>
          </nav>

          <div>
            <h1
              id="products-heading"
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl"
            >
              {heading}
            </h1>
            {description ? (
              <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-white/95 sm:mt-2.5 sm:max-w-[42ch] sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
