import { CareWorkDetailsSection } from "@/components/sections/CareWorkDetailsSection";
import {
  CustomWebsiteCostSection,
  CustomWebsiteDetailsSection,
  CustomWebsiteIntroSection,
  type ServiceCostContent,
  type ServiceDetailsContent,
  type ServiceIntroContent,
} from "@/components/sections/CustomWebsiteArticleSections";
import { FaqSection, type FaqSectionContent } from "@/components/sections/FaqSection";
import { HeroSection, type HeroContent } from "@/components/sections/HeroSection";
import { ProcessImagesSection } from "@/components/sections/ProcessImagesSection";
import {
  ProcessSection,
  type ProcessSectionContent,
} from "@/components/sections/ProcessSection";
import { WebsiteSamplesSection } from "@/components/sections/WebsiteSamplesSection";
import {
  WhyChooseSection,
  type WhyChooseSectionContent,
} from "@/components/sections/WhyChooseSection";
import { Reveal } from "@/components/ui/Reveal";
import type {
  CareWorkComparisonContent,
  ContactFormRegisterKey,
} from "@/lib/site-config";

export type ServiceLandingContent = {
  hero: HeroContent;
  heroSectionId: string;
  /** Bản copy form CTA hero. Mặc định `contactFormContent.register`. */
  heroContactFormKey?: ContactFormRegisterKey;
  showSamples?: boolean;
  intro: ServiceIntroContent;
  /** Đoạn mô tả chi phí. Bỏ qua nếu dùng `costPackages`. */
  cost?: ServiceCostContent;
  /** Bảng so sánh gói (template `/giai-phap`) — thay khối chi phí dạng đoạn văn. */
  costPackages?: CareWorkComparisonContent;
  why: WhyChooseSectionContent;
  whySectionId: string;
  details?: ServiceDetailsContent;
  workComparison?: CareWorkComparisonContent;
  process: ProcessSectionContent;
  processSectionId: string;
  showProcessImages?: boolean;
  faq: FaqSectionContent;
  faqSectionId: string;
};

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  return (
    <>
      <HeroSection
        content={content.hero}
        sectionId={content.heroSectionId}
        contactFormKey={content.heroContactFormKey}
      />
      {content.showSamples ? (
        <Reveal>
          <WebsiteSamplesSection />
        </Reveal>
      ) : null}
      <Reveal>
        <CustomWebsiteIntroSection content={content.intro} />
      </Reveal>
      {content.costPackages ? (
        <Reveal>
          <CareWorkDetailsSection
            content={content.costPackages}
            showToggle={false}
          />
        </Reveal>
      ) : content.cost ? (
        <Reveal>
          <CustomWebsiteCostSection content={content.cost} />
        </Reveal>
      ) : null}
      <Reveal>
        <WhyChooseSection content={content.why} sectionId={content.whySectionId} />
      </Reveal>
      {content.details ? (
        <Reveal>
          <CustomWebsiteDetailsSection content={content.details} />
        </Reveal>
      ) : null}
      {content.workComparison ? (
        <Reveal>
          <CareWorkDetailsSection content={content.workComparison} />
        </Reveal>
      ) : null}
      <Reveal>
        <ProcessSection
          content={content.process}
          sectionId={content.processSectionId}
        />
      </Reveal>
      {content.showProcessImages !== false ? (
        <Reveal>
          <ProcessImagesSection />
        </Reveal>
      ) : null}
      <Reveal>
        <FaqSection content={content.faq} sectionId={content.faqSectionId} />
      </Reveal>
    </>
  );
}
