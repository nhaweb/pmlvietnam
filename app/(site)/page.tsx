import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ProcessImagesSection } from "@/components/sections/ProcessImagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WebsiteSamplesSection } from "@/components/sections/WebsiteSamplesSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  absoluteUrl,
  faqPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
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
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
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
