import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import {
  customWebsiteCostContent,
  customWebsiteDetailsContent,
  customWebsiteFaqContent,
  customWebsiteHeroContent,
  customWebsiteIntroContent,
  customWebsiteProcessContent,
  customWebsiteWhyChooseContent,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thiết kế website theo yêu cầu | PML Vietnam",
  description:
    "Thiết kế website theo yêu cầu, độc quyền giao diện — tùy chỉnh tính năng, tối ưu trải nghiệm, dễ mở rộng cùng PML Vietnam.",
};

export default function ThietKeWebsiteTheoYeuCauPage() {
  return (
    <ServiceLandingPage
      content={{
        hero: customWebsiteHeroContent,
        heroSectionId: "thiet-ke-theo-yeu-cau",
        showSamples: true,
        intro: customWebsiteIntroContent,
        cost: customWebsiteCostContent,
        why: customWebsiteWhyChooseContent,
        whySectionId: "tai-sao-chon-theo-yeu-cau",
        details: customWebsiteDetailsContent,
        process: customWebsiteProcessContent,
        processSectionId: "quy-trinh-theo-yeu-cau",
        faq: customWebsiteFaqContent,
        faqSectionId: "faq-theo-yeu-cau",
      }}
    />
  );
}
