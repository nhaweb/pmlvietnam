import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ProcessImagesSection } from "@/components/sections/ProcessImagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WebsiteSamplesSection } from "@/components/sections/WebsiteSamplesSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <ProcessSection />
      </Reveal>
      <Reveal>
        <WebsiteSamplesSection />
      </Reveal>
      <Reveal>
        <WhyChooseSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <ProcessImagesSection />
      </Reveal>
      <Reveal>
        <TestimonialSection />
      </Reveal>
      <Reveal>
        <NewsSection />
      </Reveal>
    </>
  );
}
