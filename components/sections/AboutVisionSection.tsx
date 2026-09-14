import Image from "next/image";
import {
  aboutVisionContent,
  type AboutIntroImagePosition,
  type AboutVisionBlockIcon,
} from "@/lib/site-config";

type AboutVisionSectionProps = {
  /** Override vị trí ảnh — mặc định `left` (ref InterData). */
  imagePosition?: AboutIntroImagePosition;
};

/**
 * Trang Giới thiệu — Section 2: Tầm nhìn – Sứ mệnh – Giá trị cốt lõi.
 * 2 cột hình trái / text phải; 4 sub-block icon + heading (ref interdata.vn/about-us).
 * Tái dùng cùng pattern layout + `imagePosition` như Section 1.
 */
export function AboutVisionSection({
  imagePosition = aboutVisionContent.imagePosition,
}: AboutVisionSectionProps) {
  const { id, title, brandNha, brandWeb, image, blocks } = aboutVisionContent;
  const imageFirst = imagePosition === "left";

  /** Text column: align right edge với max-w-site (--site-max); image cột kia flush mép viewport. */
  const textPadClass = imageFirst
    ? "px-4 sm:px-6 lg:pl-10 lg:pr-[max(2rem,calc((100vw-var(--site-max))/2+2rem))]"
    : "px-4 sm:px-6 lg:pr-10 lg:pl-[max(2rem,calc((100vw-var(--site-max))/2+2rem))]";

  return (
    <section
      id={id}
      aria-labelledby="about-vision-heading"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(11,31,58,0.05),transparent_50%),radial-gradient(ellipse_at_80%_55%,rgba(249,115,22,0.05),transparent_55%)]"
        aria-hidden
      />

      {/* Full-bleed 2 cột: image chạm mép; text ~1.5× rộng hơn hình */}
      <div
        className={`relative grid items-center gap-8 py-14 sm:gap-10 sm:py-16 lg:gap-40 lg:py-20 ${
          imageFirst
            ? "lg:grid-cols-[1fr_1.5fr]"
            : "lg:grid-cols-[1.5fr_1fr]"
        }`}
      >
        {/* Image column — không padding phía flush */}
        <div
          className={`relative w-full ${
            imageFirst ? "order-1 lg:order-1" : "order-2 lg:order-2"
          }`}
        >
          <div
            className={`relative aspect-[680/516] w-full overflow-hidden ${
              imageFirst
                ? "pr-4 sm:pr-6 lg:pr-0"
                : "pl-4 sm:pl-6 lg:pl-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              quality={100}
              className={`h-full w-full object-contain lg:pr-20 ${
                imageFirst ? "object-left" : "object-right"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text column */}
        <div
          className={`flex flex-col justify-center ${textPadClass} ${
            imageFirst ? "order-2 lg:order-2" : "order-1 lg:order-1"
          }`}
        >
          <h2
            id="about-vision-heading"
            className="text-2xl font-bold leading-tight tracking-normal text-foreground sm:text-3xl lg:text-[2rem] lg:leading-snug"
          >
            {title}
          </h2>

          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-logo-web px-3.5 py-1.5 text-sm font-semibold tracking-wide text-white shadow-sm">
              <span className="text-logo-nha">{brandNha}</span>
              <span className="ml-1">{brandWeb}</span>
            </span>
          </div>

          <ul className="mt-8 space-y-6 sm:mt-10 sm:space-y-7" role="list">
            {blocks.map((block) => (
              <li key={block.id} className="flex gap-3.5 sm:gap-4">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                  <VisionBlockIcon name={block.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-foreground sm:text-lg">
                    {block.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 sm:text-[0.9375rem]">
                    {block.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function VisionBlockIcon({ name }: { name: AboutVisionBlockIcon }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    className: "h-11 w-11 sm:h-12 sm:w-12",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "team":
      return (
        <svg {...common}>
          <circle cx="18" cy="16" r="5" fill="#F97316" />
          <circle cx="30" cy="16" r="5" fill="#0B1F3A" />
          <path
            d="M8 36c0-5.5 4.5-10 10-10h0c2.2 0 4.2.7 5.8 2"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24.2 28c1.6-1.3 3.6-2 5.8-2h0c5.5 0 10 4.5 10 10"
            stroke="#0B1F3A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="22" r="4.5" fill="#F97316" opacity="0.85" />
        </svg>
      );
    case "vision":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke="#0B1F3A" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="8" stroke="#F97316" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="3.5" fill="#F97316" />
          <path
            d="M24 6v4M24 38v4M6 24h4M38 24h4"
            stroke="#0B1F3A"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      );
    case "values":
      return (
        <svg {...common}>
          <path
            d="M10 34V22M18 34V16M26 34V24M34 34V12"
            stroke="#0B1F3A"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M8 30c6-2 10-10 14-14 4 2 10 6 16 2"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34 14h4v4"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke="#0B1F3A" strokeWidth="2.5" />
          <path
            d="M24 30V18M24 18l-5 5M24 18l5 5"
            stroke="#F97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 34h16"
            stroke="#0B1F3A"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      );
    default:
      return null;
  }
}
