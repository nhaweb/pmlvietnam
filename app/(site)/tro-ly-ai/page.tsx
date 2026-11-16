import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { pageMetadata } from "@/lib/seo";
import { agentServiceContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Trợ lý AI — Chatbox AI thông minh cho website doanh nghiệp",
  description:
    "Dịch vụ tích hợp PML Agent: Trợ lý AI và Chatbox AI thông minh cho website doanh nghiệp. Tư vấn 24/7, tự động cập nhật Database & Knowledge Base riêng, đa ngôn ngữ cùng PML Vietnam.",
  path: "/tro-ly-ai",
});

export default function TroLyAiPage() {
  return (
    <ServiceLandingPage
      content={{
        hero: agentServiceContent.hero,
        heroSectionId: "pml-agent",
        heroContactFormKey: "pmlAgent",
        intro: agentServiceContent.intro,
        costPackages: agentServiceContent.costPackages,
        why: agentServiceContent.why,
        whySectionId: "tai-sao-chon-pml-agent",
        details: agentServiceContent.details,
        process: agentServiceContent.process,
        processSectionId: "quy-trinh-pml-agent",
        showProcessImages: false,
        faq: agentServiceContent.faq,
        faqSectionId: "faq-pml-agent",
      }}
    />
  );
}

