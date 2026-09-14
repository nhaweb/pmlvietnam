"use client";

import Link from "next/link";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { ProductSampleCard } from "@/components/products/ProductSampleCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { HoverScrollPreview } from "@/components/ui/HoverScrollPreview";
import {
  templateDetailContent,
  type ProductSampleItem,
  type TemplateFeatureIcon,
} from "@/lib/site-config";

export type TemplateDetailSectionProps = {
  item: ProductSampleItem;
  relatedItems: ProductSampleItem[];
};

/**
 * Trang chi tiết mẫu — layout 2 cột ref web4s.vn/thoitrang09.
 * Trái: preview + "Xem thực tế" (chữ cam, viền cam).
 * Phải: 2 form viền cam bo cong (ref luvini) + CTA "Đăng ký tư vấn".
 */
export function TemplateDetailSection({
  item,
  relatedItems,
}: TemplateDetailSectionProps) {
  const { openContactForm } = useContactForm();
  const copy = templateDetailContent;
  const formTitle = `${copy.form1TitlePrefix} ${item.title}`;
  const handover =
    item.isReadyTemplate === false ? copy.customHandover : copy.readyHandover;

  return (
    <section
      aria-labelledby="template-detail-heading"
      className="scroll-mt-24 bg-bg-secondary px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-site">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-muted sm:mb-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              >
                {copy.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden className="text-card-border">
              /
            </li>
            <li>
              <Link
                href="/san-pham"
                className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              >
                {copy.breadcrumbCatalog}
              </Link>
            </li>
            <li aria-hidden className="text-card-border">
              /
            </li>
            <li>
              <Link
                href={`/san-pham#${item.groupId}`}
                className="transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              >
                {item.groupLabel}
              </Link>
            </li>
            <li aria-hidden className="text-card-border">
              /
            </li>
            <li className="font-semibold text-foreground">{item.title}</li>
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-stretch lg:gap-x-8 lg:gap-y-5">
          {/* Absolute fill on lg so the screenshot cannot inflate the grid
              row (lg:h-full % height is indefinite on auto rows). */}
          <div className="relative h-[22rem] min-h-0 sm:h-[28rem] lg:col-start-1 lg:row-start-1 lg:h-auto">
            <div className="h-full overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm lg:absolute lg:inset-0">
              <HoverScrollPreview
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width ?? 1600}
                height={item.image.height ?? 1200}
                unoptimized={item.image.src.endsWith(".svg")}
                frameClassName="h-full w-full bg-bg-secondary"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
          </div>

          <div className="flex justify-center lg:col-start-1 lg:row-start-2">
            <a
              href={item.liveUrl ?? copy.liveViewFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={liveViewClassName()}
            >
              {copy.liveViewLabel}
              <ExternalLinkIcon />
            </a>
          </div>

          <div className="lg:col-start-2 lg:row-start-1">
            <h1
              id="template-detail-heading"
              className="text-2xl font-bold leading-tight text-foreground sm:text-3xl"
            >
              {formTitle}
            </h1>

            <div className="mt-5 space-y-4">
              <article className="rounded-2xl border-2 border-cta bg-bg-primary p-5 sm:p-6">
                <ul className="grid grid-cols-4 gap-2 sm:gap-4">
                  {copy.features.map((feature) => (
                    <li
                      key={feature.icon}
                      className="flex min-w-0 flex-col items-center gap-2 text-center sm:gap-2.5"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center text-cta sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                        <FeatureIcon name={feature.icon} />
                      </span>
                      <p className="text-[11px] font-semibold leading-snug text-foreground sm:text-xs lg:text-sm">
                        {feature.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border-2 border-cta bg-bg-primary p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  {copy.benefitsTitle}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {[handover, ...copy.benefits].map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm leading-snug text-foreground sm:text-[0.9375rem]"
                    >
                      <span className="mt-0.5 inline-flex shrink-0 text-cta">
                        <CheckCircleIcon />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="flex justify-center lg:col-start-2 lg:row-start-2">
            <CTAButton
              type="button"
              className="w-1/2 min-w-[10.5rem] px-5 py-3.5 text-sm font-bold sm:text-base"
              onClick={() =>
                openContactForm({
                  variant: "consult",
                  selectedSample: formTitle,
                })
              }
            >
              {copy.consultLabel}
            </CTAButton>
          </div>
        </div>

        {relatedItems.length > 0 ? (
          <div className="mt-14 sm:mt-16">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-2xl">
              {copy.similarHeading}
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {relatedItems.map((related) => (
                <li key={related.id}>
                  <ProductSampleCard item={related} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function liveViewClassName() {
  return "inline-flex items-center justify-center gap-2 rounded-full border-2 border-cta bg-transparent px-6 py-2.5 text-sm font-semibold text-cta transition-colors hover:bg-cta/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2";
}

function FeatureIcon({ name }: { name: TemplateFeatureIcon }) {
  switch (name) {
    case "devices":
      return <DevicesIcon />;
    case "seo":
      return <SeoIcon />;
    case "admin":
      return <AdminIcon />;
    case "speed":
      return <SpeedIcon />;
  }
}

function DevicesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
      <rect
        x="4"
        y="10"
        width="28"
        height="20"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M12 34h12"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <rect
        x="30"
        y="18"
        width="14"
        height="20"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M34 34h6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
      <path
        d="M24 6 8 13v11c0 9.5 6.8 16.2 16 19 9.2-2.8 16-9.5 16-19V13L24 6Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="m17 24 5 5 10-11"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M16 18h16M16 24h16M16 30h10"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="24" cy="26" r="16" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M24 26 33 15"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M12 26h3M33 26h3M24 13v3"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="m6.5 10.2 2.4 2.4 4.6-5.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M6.5 3.5H3.5A1.5 1.5 0 0 0 2 5v7.5A1.5 1.5 0 0 0 3.5 14H11a1.5 1.5 0 0 0 1.5-1.5V9.5M9 2.5h4.5V7M7.5 8.5 13.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
