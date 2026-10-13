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
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function SiteShell({ children }: { children: ReactNode }) {
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
          <Header />
          <main className="flex flex-1 flex-col">
            {children}
            <DefaultPageExtras />
          </main>
          <Footer />
          <FloatingContactIcons />
        </ContactFormProvider>
      </body>
    </html>
  );
}
