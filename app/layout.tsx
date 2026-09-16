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
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

/* Closest free alternative to Surt Expanded (perpetualny.com) — có subset Vietnamese */
const encodeSansExpanded = Encode_Sans_Expanded({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "thiết kế website",
    "website chuẩn SEO",
    "PML Vietnam",
    "chuyển đổi số",
    "landing page",
    "chăm sóc website",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: `${SITE_NAME} — giải pháp website chuyên nghiệp`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
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
  robots: {
    index: true,
    follow: true,
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
