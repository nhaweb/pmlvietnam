import type { Metadata } from "next";
import { CareWorkDetailsSection } from "@/components/sections/CareWorkDetailsSection";
import { ServicesContactSection } from "@/components/sections/ServicesContactSection";
import { SolutionBannerSection } from "@/components/sections/SolutionBannerSection";
import { SolutionNeedsSection } from "@/components/sections/SolutionNeedsSection";
import { SolutionProjectsSection } from "@/components/sections/SolutionProjectsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { Reveal } from "@/components/ui/Reveal";
import {
  solutionPageContent,
  websiteFeaturesComparisonContent,
  websitePackageComparisonContent,
  whyChooseContent,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: solutionPageContent.meta.title,
  description: solutionPageContent.meta.description,
};

export default function GiaiPhapPage() {
  return (
    <>
      <SolutionBannerSection />
      <Reveal>
        <SolutionNeedsSection />
      </Reveal>
      <Reveal>
        <WhyChooseSection
          content={whyChooseContent}
          sectionId="tai-sao-chon-giai-phap"
        />
      </Reveal>
      <Reveal>
        <SolutionProjectsSection />
      </Reveal>
      <Reveal>
        <div className=" bg-bg-secondary">
        <CareWorkDetailsSection
          content={websitePackageComparisonContent}
          showToggle={false}
        />
        </div>
        
      </Reveal>
      <Reveal>
          <CareWorkDetailsSection
            content={websiteFeaturesComparisonContent}
            showToggle={false}
            bgColor="bg-white"
          />
      </Reveal>
      <Reveal>
        <ServicesContactSection
          sectionId={solutionPageContent.formSectionId}
          headingAs="h2"
          embed
        />
      </Reveal>
    </>
  );
}
