import type { Metadata } from "next";
import { NewsListingSection } from "@/components/sections/NewsListingSection";
import { NewsPageBanner } from "@/components/sections/NewsPageBanner";
import { pageMetadata } from "@/lib/seo";
import { newsPageContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: newsPageContent.heading,
  description: newsPageContent.description,
  path: "/tin-tuc",
  image: newsPageContent.banner.src,
  imageAlt: newsPageContent.banner.alt,
});

export default function TinTucPage() {
  return (
    <>
      <NewsPageBanner />
      <NewsListingSection />
    </>
  );
}
