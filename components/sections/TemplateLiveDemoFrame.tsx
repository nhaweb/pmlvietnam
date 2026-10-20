import Link from "next/link";
import {
  productSampleHref,
  templateDetailContent,
  type ProductSampleItem,
} from "@/lib/site-config";

type TemplateLiveDemoFrameProps = {
  item: ProductSampleItem;
  liveUrl: string;
};

/**
 * Thanh chrome mỏng + iframe full-viewport cho demo live trên domain mình.
 */
export function TemplateLiveDemoFrame({
  item,
  liveUrl,
}: TemplateLiveDemoFrameProps) {
  const chrome = templateDetailContent.liveDemoChrome;
  const detailHref = productSampleHref(item);

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex shrink-0 items-center gap-2 border-b border-card-border bg-bg-primary px-3 py-2.5 sm:gap-3 sm:px-4">
        <Link
          href={chrome.backHref}
          className="shrink-0 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted transition-colors hover:bg-bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta sm:text-sm"
        >
          ← {chrome.backLabel}
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground sm:text-base">
            <span className="mr-2 inline-block rounded bg-cta/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cta sm:text-[11px]">
              {chrome.badge}
            </span>
            {item.title}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href={detailHref}
            className="hidden rounded-lg border border-card-border px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-cta hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta sm:inline-flex sm:text-sm"
          >
            {chrome.detailLabel}
          </Link>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-card-border px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-cta hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta md:inline-flex md:text-sm"
          >
            {chrome.openExternalLabel}
          </a>
          <Link
            href={chrome.ctaHref}
            className="rounded-lg bg-cta px-2.5 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 sm:px-3 sm:text-sm"
          >
            {chrome.ctaLabel}
          </Link>
        </div>
      </header>

      <iframe
        title={`Demo — ${item.title}`}
        src={liveUrl}
        className="h-full w-full flex-1 border-0 bg-white"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allow="fullscreen"
      />
    </div>
  );
}
