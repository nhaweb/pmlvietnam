import { siteContact } from "@/lib/site-config";

/**
 * Phone → Zalo — fixed góc dưới phải, luôn hiện.
 */
export function FloatingContactIcons() {
  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6"
      aria-label="Liên hệ nhanh"
    >
      <a
        href={`tel:${siteContact.phoneTel}`}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white shadow-lg shadow-cta/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
        aria-label={`Gọi ${siteContact.phoneDisplay}`}
      >
        <PhoneIcon />
      </a>

      <a
        href={siteContact.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#0068FF] shadow-lg shadow-[#0068FF]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF] focus-visible:ring-offset-2"
        aria-label="Chat Zalo"
      >
        <ZaloIcon />
      </a>
    </div>
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
