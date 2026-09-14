import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { landingPageServiceContent } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thiết kế Landing page | PML Vietnam",
  description:
    "Thiết kế landing page tập trung chuyển đổi, tối ưu tốc độ, sẵn sàng chạy quảng cáo tại PML Vietnam.",
};

export default function ThietKeLandingPagePage() {
  return (
    <ServiceLandingPage
      content={{
        hero: landingPageServiceContent.hero,
        heroSectionId: "thiet-ke-landing-page",
        showSamples: true,
        intro: landingPageServiceContent.intro,
        cost: landingPageServiceContent.cost,
        why: landingPageServiceContent.why,
        whySectionId: "tai-sao-chon-landing",
        details: landingPageServiceContent.details,
        process: landingPageServiceContent.process,
        processSectionId: "quy-trinh-landing",
        faq: landingPageServiceContent.faq,
        faqSectionId: "faq-landing",
      }}
    />
  );
}
