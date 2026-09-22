import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { pageMetadata } from "@/lib/seo";
import { contentServiceContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "SEO Content — viết bài chuẩn SEO",
  description:
    "Dịch vụ viết bài SEO Content cho website doanh nghiệp: Standard, Pro và Premium. Nội dung độc quyền, tối ưu từ khóa, bàn giao đúng tiến độ cùng PML Vietnam.",
  path: "/pml-content",
});

export default function PmlContentPage() {
  return (
    <ServiceLandingPage
      content={{
        hero: contentServiceContent.hero,
        heroSectionId: "pml-content",
        intro: contentServiceContent.intro,
        costPackages: contentServiceContent.costPackages,
        why: contentServiceContent.why,
        whySectionId: "tai-sao-chon-pml-content",
        details: contentServiceContent.details,
        process: contentServiceContent.process,
        processSectionId: "quy-trinh-pml-content",
        showProcessImages: false,
        faq: contentServiceContent.faq,
        faqSectionId: "faq-pml-content",
      }}
    />
  );
}
