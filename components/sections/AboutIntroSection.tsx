import Image from "next/image";
import {
  aboutIntroContent,
  type AboutIntroImagePosition,
} from "@/lib/site-config";

type AboutIntroSectionProps = {
  /** Override vị trí ảnh — mặc định lấy từ `aboutIntroContent` (right). */
  imagePosition?: AboutIntroImagePosition;
};

/**
 * Trang Giới thiệu — Section 1: Giới thiệu chung.
 * 2 cột text + hình trong `max-w-site`.
 * Nền `#F7F6F2`; ảnh bo `100% 100% 0 0` (vòm trên).
 */
export function AboutIntroSection({
  imagePosition = aboutIntroContent.imagePosition,
}: AboutIntroSectionProps) {
  const { id, brandNha, brandWeb, tagline, body, image } = aboutIntroContent;
  const imageFirst = imagePosition === "left";

  return (
    <section
      id={id}
      aria-labelledby="about-intro-heading"
      className="relative scroll-mt-24 overflow-hidden bg-bg-secondary"
    >
      <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
        {/* Text column */}
        <div
          className={`flex flex-col justify-center ${
            imageFirst ? "order-2 lg:order-2" : "order-1 lg:order-1"
          }`}
        >
          <h1
            id="about-intro-heading"
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-snug"
          >
            <span className="text-logo-nha">{brandNha}</span>{" "}
            <span className="text-logo-web">{brandWeb}</span>
            <span className="mt-2 block text-xl font-bold tracking-normal text-foreground sm:text-2xl lg:text-[1.65rem]">
              {tagline}
            </span>
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/80 sm:mt-8 sm:text-base">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Image column — nằm trong max-w-site, bo vòm trên */}
        <div
          className={`relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none ${
            imageFirst ? "order-1 lg:order-1" : "order-2 lg:order-2"
          }`}
        >
          <div className="relative aspect-[680/516] w-full overflow-hidden rounded-t-[100%]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              quality={100}
              className="h-full w-full object-contain object-center"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
