"use client";

import Link from "next/link";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import {
  premiumServicesContent,
  type PremiumServiceIcon,
} from "@/lib/site-config";

const pillClassName =
  "premium-service-pill group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 sm:px-6 sm:py-3 sm:text-sm";

/**
 * CTA dịch vụ cao cấp — heading + brand underline + pill buttons.
 * Nằm trên PhoneContactSection; pill có `href` điều hướng trang dịch vụ,
 * còn lại mở form đăng ký. Nền cam ngã bóng (ref vinahost.vn title card).
 */
export function PremiumServicesSection() {
  const { eyebrow, brandDomain, services, id } = premiumServicesContent;
  const { openContactForm } = useContactForm();

  return (
    <section
      id={id}
      aria-labelledby="premium-services-heading"
      className="scroll-mt-24 bg-bg-primary"
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-medium text-foreground sm:text-lg lg:text-xl">
            {eyebrow}
          </p>
          <h2
            id="premium-services-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {brandDomain}
          </h2>
          <div
            className="relative mx-auto mt-1 flex w-[min(100%,18rem)] items-end justify-center sm:w-[min(100%,22rem)]"
            aria-hidden
          >
            <PencilIcon className="absolute -left-1 bottom-0.5 h-5 w-5 sm:h-6 sm:w-6" />
            <BrushUnderline className="h-3 w-full sm:h-3.5" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:gap-4">
          {[services.slice(0, 3), services.slice(3)].map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              role="list"
            >
              {row.map((service) => (
                <li key={service.id}>
                  {service.href ? (
                    <Link href={service.href} className={pillClassName}>
                      <span>{service.label}</span>
                      <span className="premium-service-pill__icon inline-flex shrink-0">
                        <ServiceIcon name={service.icon} />
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openContactForm({
                          variant: "register",
                          selectedSample: service.label,
                        })
                      }
                      className={pillClassName}
                    >
                      <span>{service.label}</span>
                      <span className="premium-service-pill__icon inline-flex shrink-0">
                        <ServiceIcon name={service.icon} />
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 19.5 7 17l9.2-9.2 2.3 2.3L9.3 19.3l-4.8.2Z"
        fill="#F5C518"
        stroke="#0B1F3A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="m16.2 7.8 2.3 2.3 1.4-1.4a1.6 1.6 0 0 0 0-2.3l-.3-.3a1.6 1.6 0 0 0-2.3 0l-1.1 1.7Z"
        fill="#F97316"
        stroke="#0B1F3A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7 17 5.2 18.8"
        stroke="#0B1F3A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrushUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 14"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 9c28-4.5 56-6.5 92-6.2 38.5.4 74 3.2 112 5.2 22 1.2 42 1.6 60 .4"
        stroke="#1B78E0"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.5c36-2.8 78-3.6 128-2.2 34 1 62 2.4 92 1.6"
        stroke="#38BDF8"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function ServiceIcon({ name }: { name: PremiumServiceIcon }) {
  const common = {
    viewBox: "0 0 20 20",
    fill: "none",
    className: "h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "website":
      return (
        <svg {...common}>
          <rect
            x="2.5"
            y="3.5"
            width="15"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M2.5 7h15M8 17h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "landing":
      return (
        <svg {...common}>
          <rect
            x="4"
            y="2.5"
            width="12"
            height="15"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 6.5h6M7 10h6M7 13.5h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "branding":
      return (
        <svg {...common}>
          <circle
            cx="7"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="13"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="10"
            cy="13"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "fullpackage":
      return (
        <svg {...common}>
          <path
            d="M3.5 7.5 10 4l6.5 3.5v7L10 18l-6.5-3.5v-7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M10 4v14M3.5 7.5 10 11l6.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "care":
      return (
        <svg {...common}>
          <path
            d="M12.8 3.8a3.2 3.2 0 0 1 2.9 4.6L10 16.2 4.3 8.4a3.2 3.2 0 0 1 5.2-3.7l.5.6.5-.6a3.2 3.2 0 0 1 2.3-1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
