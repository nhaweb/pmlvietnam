import type { ReactNode } from "react";
import { Suspense } from "react";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ContactFormProvider } from "@/components/contact/ContactFormProvider";
import { DefaultPageExtras } from "@/components/layout/DefaultPageExtras";
import { FloatingContactIcons } from "@/components/layout/FloatingContactIcons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { encodeSansExpanded } from "@/lib/fonts";
import { getPublishedNewsItems } from "@/lib/news";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { publishedNewsItems, type SearchSuggestion } from "@/lib/site-config";
import { SanityLive } from "@/sanity/lib/live";

export async function SiteShell({ children }: { children: ReactNode }) {
  const newsPages = await loadNewsSearchPages();

  return (
    <html
      lang="vi"
      className={`${encodeSansExpanded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-primary text-foreground">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ContactFormProvider>
          <Header newsPages={newsPages} />
          <main className="flex flex-1 flex-col">
            {children}
            <DefaultPageExtras />
          </main>
          <Footer />
          <FloatingContactIcons />
        </ContactFormProvider>
        <SanityLive />
      </body>
    </html>
  );
}

async function loadNewsSearchPages(): Promise<SearchSuggestion[]> {
  try {
    const items = await getPublishedNewsItems();
    return items.map((item) => ({
      id: item.id,
      label: item.title,
      href: item.href,
    }));
  } catch (error) {
    console.error("Không tải được tin tức từ Sanity cho ô tìm kiếm.", error);
    return publishedNewsItems.map((item) => ({
      id: item.id,
      label: item.title,
      href: item.href,
    }));
  }
}
