import Image from "next/image";
import { solutionPageContent } from "@/lib/site-config";

/**
 * Landing `/giai-phap` — mobile: ảnh riêng; md+: ảnh desktop 1920×620.
 */
export function SolutionBannerSection() {
  const { id, image, imageMobile } = solutionPageContent.banner;

  return (
    <section
      id={id}
      aria-label={image.alt}
      className="relative isolate overflow-hidden bg-cta"
    >
      <div className="relative mx-auto w-full md:hidden">
        <Image
          src={imageMobile.src}
          alt={imageMobile.alt}
          width={imageMobile.width}
          height={imageMobile.height}
          priority
          quality={100}
          sizes="100vw"
          className="h-auto w-full object-cover object-center"
        />
      </div>

      <div className="relative mx-auto hidden w-full aspect-[1920/620] max-h-[620px] md:block">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
