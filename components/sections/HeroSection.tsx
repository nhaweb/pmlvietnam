"use client";

import Image from "next/image";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { CTAButton } from "@/components/ui/CTAButton";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { heroContent } from "@/lib/site-config";

export type HeroContent = {
  eyebrow?: string;
  headline: string;
  bullets: string[];
  ctaLabel: string;
  autoplayMs: number;
  banners: Array<{ src: string; alt: string }>;
};

type HeroSectionProps = {
  /** Override content — mặc định `heroContent` trang chủ. */
  content?: HeroContent;
  /** Section id — trang dịch vụ có thể đổi để tránh trùng `#dich-vu`. */
  sectionId?: string;
};

/**
 * Section 1 — Hero dịch vụ.
 * Layout: text trái + bullet ✓, media phải (Embla autoplay loop).
 */
export function HeroSection({
  content = heroContent,
  sectionId = "dich-vu",
}: HeroSectionProps) {
  const { eyebrow, headline, bullets, ctaLabel, banners, autoplayMs } = content;
  const { openContactForm } = useContactForm();
  const count = banners.length;

  return (
    <section
      id={sectionId}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#EEF4FB] via-bg-primary to-bg-secondary"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-[-4rem] h-72 w-72 rounded-full bg-cta/10 blur-3xl" />
        <div className="absolute -right-16 bottom-[-3rem] h-80 w-80 rounded-full bg-footer/10 blur-3xl" />
        <div className="absolute left-1/3 top-8 h-40 w-40 rounded-full bg-cta/5 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.14em] text-cta uppercase sm:text-sm">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="hero-heading"
            className={`text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem] lg:leading-snug ${eyebrow ? "mt-3" : ""}`}
          >
            {headline}
          </h1>

          <RevealStagger
            as="ul"
            className="mt-6 space-y-3"
            stagger={0.07}
            aria-label="Ưu điểm dịch vụ"
          >
            {bullets.map((item) => (
              <RevealItem key={item} as="li">
                <span className="flex items-start gap-3 text-sm tracking-wide text-foreground sm:text-base">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_4px_10px_rgba(249,115,22,0.35)]"
                    aria-hidden
                  >
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </span>
              </RevealItem>
            ))}
          </RevealStagger>

          <div className="mt-8 flex justify-center lg:justify-start">
            <CTAButton
              type="button"
              className="px-8 py-3.5 text-base font-bold"
              onClick={() => openContactForm({ variant: "register" })}
            >
              {ctaLabel}
            </CTAButton>
          </div>
        </div>

        <div className="relative w-full lg:h-full">
          {/* Mobile giữ tỉ lệ banner 757×394; desktop cao bằng cột text (headline → CTA) */}
          <div
            className="relative aspect-[757/394] w-full overflow-hidden rounded-2xl border-2 border-white shadow-[0_16px_48px_rgba(11,31,58,0.14)] ring-1 ring-footer/5 lg:aspect-auto lg:h-full"
            role="region"
            aria-roledescription="carousel"
            aria-label="Banner dịch vụ PML Vietnam"
          >
            <Carousel
              className="absolute inset-0 h-full bg-bg-secondary"
              viewportClassName="h-full"
              containerClassName="h-full"
              options={{
                loop: count > 1,
                watchDrag: count > 1,
                duration: 25,
              }}
              autoplayMs={count > 1 ? autoplayMs : undefined}
              showDots={false}
            >
              {banners.map((banner, i) => (
                <CarouselSlide
                  key={`${banner.src}-${i}`}
                  className="relative h-full"
                >
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={i === 0}
                    draggable={false}
                    quality={100}
                    className="object-cover object-center select-none"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </CarouselSlide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
