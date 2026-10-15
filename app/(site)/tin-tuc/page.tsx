import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NewsListingSection,
  newsPageHref,
} from "@/components/sections/NewsListingSection";
import { NewsPageBanner } from "@/components/sections/NewsPageBanner";
import { getPublishedNewsItems } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { newsPageContent } from "@/lib/site-config";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function parsePage(raw: string | string[] | undefined): number | null {
  if (raw === undefined) return 1;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!/^\d+$/.test(value)) return null;
  const page = Number(value);
  return page >= 1 ? page : null;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const page = parsePage((await searchParams).page) ?? 1;

  return pageMetadata({
    title:
      page > 1
        ? `${newsPageContent.heading} — Trang ${page}`
        : newsPageContent.heading,
    description: newsPageContent.description,
    path: newsPageHref(page),
    image: newsPageContent.banner.src,
    imageAlt: newsPageContent.banner.alt,
  });
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const page = parsePage((await searchParams).page);
  if (page === null) notFound();

  const items = await getPublishedNewsItems();
  const { pageSize } = newsPageContent;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  if (page > totalPages) notFound();

  const pageItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <NewsPageBanner />
      <NewsListingSection
        items={pageItems}
        currentPage={page}
        totalPages={totalPages}
      />
    </>
  );
}
