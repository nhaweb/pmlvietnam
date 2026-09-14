import type { Metadata } from "next";
import { Encode_Sans_Expanded } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ContactFormProvider } from "@/components/contact/ContactFormProvider";
import { DefaultPageExtras } from "@/components/layout/DefaultPageExtras";
import { FloatingContactIcons } from "@/components/layout/FloatingContactIcons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

/* Closest free alternative to Surt Expanded (perpetualny.com) — có subset Vietnamese */
const encodeSansExpanded = Encode_Sans_Expanded({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PML Vietnam | Giải pháp website, Chuyển đổi số cùng doanh nghiệp",
  description:
    "PML Vietnam thiết kế website chuyên nghiệp, chuẩn SEO và cung cấp hệ sinh thái chuyển đổi số toàn diện, giúp doanh nghiệp bứt phá doanh thu môi trường số.",
  verification: {
    other: {
      "facebook-domain-verification": "r262f7qlxtdsgl8nf4kg4vekrjzxn6",
    },
  },
  icons: {
    icon: [
      {
        url: "/seo/pmlvietnam_favicon.webp?v=4",
        type: "image/webp",
      },
    ],
    shortcut: "/seo/pmlvietnam_favicon.webp?v=4",
    apple: [
      {
        url: "/seo/pmlvietnam_favicon.webp?v=4",
        type: "image/webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${encodeSansExpanded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-primary text-foreground">
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
