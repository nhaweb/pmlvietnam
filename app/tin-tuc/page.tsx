import type { Metadata } from "next";
import { NewsListingSection } from "@/components/sections/NewsListingSection";
import { NewsPageBanner } from "@/components/sections/NewsPageBanner";
import { newsPageContent } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${newsPageContent.heading} | PML Vietnam`,
  description: newsPageContent.description,
};

export default function TinTucPage() {
  return (
    <>
      <NewsPageBanner />
      <NewsListingSection />
    </>
  );
}
