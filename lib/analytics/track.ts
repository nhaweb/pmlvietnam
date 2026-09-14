import { hasGoogleTag, hasMetaPixel } from "@/lib/analytics/config";

type FbqCommand = (...args: unknown[]) => void;

type GtagCommand = (
  command: "config" | "event" | "js" | "set",
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    fbq?: FbqCommand & { queue?: unknown[] };
    _fbq?: FbqCommand;
    gtag?: GtagCommand;
    dataLayer?: unknown[];
  }
}

function fbq(...args: unknown[]) {
  if (!hasMetaPixel || typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

function gtag(...args: Parameters<GtagCommand>) {
  if (!hasGoogleTag || typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

export function trackPageView(url?: string) {
  const path =
    url ??
    (typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : undefined);

  fbq("track", "PageView");

  if (path) {
    gtag("event", "page_view", { page_path: path });
  } else {
    gtag("event", "page_view");
  }
}

export function trackEngagedVisitor() {
  fbq("trackCustom", "EngagedVisitor");
  gtag("event", "EngagedVisitor");
}

export function trackConsultationClick(params?: { variant?: string }) {
  const payload = params?.variant ? { variant: params.variant } : undefined;
  fbq("trackCustom", "ConsultationClick", payload);
  gtag("event", "ConsultationClick", payload);
}

export function trackLead(params?: { variant?: string }) {
  const payload = params?.variant ? { variant: params.variant } : undefined;
  fbq("track", "Lead", payload);
  gtag("event", "generate_lead", payload);
}
