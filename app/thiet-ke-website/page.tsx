import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { pageMetadata } from "@/lib/seo";
import { websiteFeaturesComparisonContent, websiteServiceContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Thiết kế website",
  description:
    "Thiết kế website chuyên nghiệp, chuẩn SEO, giao diện hiện đại. Triển khai 5–7 ngày, dễ quản trị tại PML Vietnam.",
  path: "/thiet-ke-website",
});

export default function ThietKeWebsitePage() {
  return (
    <ServiceLandingPage
      content={{
        hero: websiteServiceContent.hero,
        heroSectionId: "thiet-ke-website",
        showSamples: true,
        intro: websiteServiceContent.intro,
        cost: websiteServiceContent.cost,
        why: websiteServiceContent.why,
        whySectionId: "tai-sao-chon-website",
        details: websiteServiceContent.details,
        workComparison: websiteFeaturesComparisonContent,
        process: websiteServiceContent.process,
        processSectionId: "quy-trinh-website",
        faq: websiteServiceContent.faq,
        faqSectionId: "faq-website",
      }}
    />
  );
}
