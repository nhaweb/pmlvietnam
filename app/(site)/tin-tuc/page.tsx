import type { Metadata } from "next";
import { NewsListingSection } from "@/components/sections/NewsListingSection";
import { NewsPageBanner } from "@/components/sections/NewsPageBanner";
import { getPublishedNewsItems } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { newsPageContent } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: newsPageContent.heading,
  description: newsPageContent.description,
  path: "/tin-tuc",
  image: newsPageContent.banner.src,
  imageAlt: newsPageContent.banner.alt,
});

export default async function TinTucPage() {
  const items = await getPublishedNewsItems();

  return (
    <>
      <NewsPageBanner />
      <NewsListingSection items={items} />
    </>
  );
}
