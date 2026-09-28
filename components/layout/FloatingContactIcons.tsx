import type { ReactNode } from "react";
import { siteContact } from "@/lib/site-config";

/**
 * Phone → Zalo — fixed góc dưới phải, luôn hiện (ref vinahost.vn).
 * Desktop: nhãn dạng pill bên trái icon; mobile: chỉ icon tròn.
 */
export function FloatingContactIcons() {
  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-50 flex flex-col items-end gap-5 sm:bottom-6 sm:right-6"
      aria-label="Liên hệ nhanh"
    >
      <ContactButton
        href={`tel:${siteContact.phoneTel}`}
        ariaLabel={`Gọi ${siteContact.phoneDisplay}`}
        label={
          <>
            Hotline: <span className="text-cta">{siteContact.phoneDisplay}</span>
          </>
        }
        circleClassName="bg-cta text-white shadow-cta/40 focus-visible:ring-cta"
        variant="phone"
      >
        <PhoneIcon />
      </ContactButton>

      <ContactButton
        href={siteContact.zaloUrl}
        external
        ariaLabel="Chat Zalo"
        label={
          <>
            Zalo <span className="font-medium text-muted">(08:00 - 18:00)</span>
          </>
        }
        circleClassName="bg-[#0068FF] shadow-[#0068FF]/40 focus-visible:ring-[#0068FF]"
        variant="zalo"
      >
        <ZaloIcon />
      </ContactButton>
    </div>
  );
}

function ContactButton({
  href,
  external,
  ariaLabel,
  label,
  circleClassName,
  variant,
  children,
}: {
  href: string;
  external?: boolean;
  ariaLabel: string;
  label: ReactNode;
  circleClassName: string;
  variant: "phone" | "zalo";
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      className="group pointer-events-auto flex items-center focus-visible:outline-none"
    >
      <span className="contact-alo-label -mr-6 hidden whitespace-nowrap rounded-full border border-black/5 bg-white py-2.5 pl-4 pr-9 text-sm font-semibold text-footer shadow-lg shadow-black/10 lg:inline-flex lg:gap-1">
        {label}
      </span>
      <span
        className={`contact-alo contact-alo-${variant} relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 ${circleClassName}`}
      >
        <span className="contact-alo-ring" aria-hidden />
        <span className="contact-alo-ring contact-alo-ring-delay" aria-hidden />
        <span className="contact-alo-icon flex items-center justify-center">{children}</span>
      </span>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5A1 1 0 0 1 4 2.5h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

/**
 * Logo Zalo dạng bubble + chữ "Zalo" (như nút chat Zalo OA).
 * Bubble trắng trên nền xanh #0068FF của nút.
 */
function ZaloIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-10 w-10">
      <path
        fill="#fff"
        d="M24.2 9.2c-8.6 0-15.6 5.9-15.6 13.2 0 4.6 2.6 8.6 6.7 11l-1.5 5.5 5.9-2.3c1.4.4 2.9.6 4.5.6 8.6 0 15.6-5.9 15.6-13.2S32.8 9.2 24.2 9.2z"
      />
      <text
        x="24.2"
        y="26.2"
        textAnchor="middle"
        fill="#0068FF"
        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fontWeight="800"
        letterSpacing="-0.4"
      >
        Zalo
      </text>
    </svg>
  );
}
