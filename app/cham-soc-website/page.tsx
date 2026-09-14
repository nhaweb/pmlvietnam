import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { careServiceContent } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Chăm sóc website | PML Vietnam",
  description:
    "Dịch vụ chăm sóc website: bảo trì, bảo mật, sao lưu và hỗ trợ cập nhật nội dung cùng PML Vietnam.",
};

export default function ChamSocWebsitePage() {
  return (
    <ServiceLandingPage
      content={{
        hero: careServiceContent.hero,
        heroSectionId: "cham-soc-website",
        intro: careServiceContent.intro,
        cost: careServiceContent.cost,
        why: careServiceContent.why,
        whySectionId: "tai-sao-chon-cham-soc",
        details: careServiceContent.details,
        workComparison: careServiceContent.workComparison,
        process: careServiceContent.process,
        processSectionId: "quy-trinh-cham-soc",
        showProcessImages: false,
        faq: careServiceContent.faq,
        faqSectionId: "faq-cham-soc",
      }}
    />
  );
}
