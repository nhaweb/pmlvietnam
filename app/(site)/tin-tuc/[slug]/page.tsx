import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleBanner } from "@/components/sections/NewsArticleBanner";
import { NewsArticleBody } from "@/components/sections/NewsArticleBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsArticle, getNewsSitemapEntries } from "@/lib/news";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { newsPageContent } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getNewsSitemapEntries();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) {
    return pageMetadata({
      title: "Tin tức",
      description: newsPageContent.description,
      path: "/tin-tuc",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: article.meta.title,
    description: article.meta.description,
    path: `/tin-tuc/${article.slug}`,
    image: article.meta.ogImage.src,
    imageAlt: article.meta.ogImage.alt,
    imageWidth: article.meta.ogImage.width,
    imageHeight: article.meta.ogImage.height,
    type: "article",
    publishedTime: article.banner.publishedAtIso,
    noIndex: article.meta.noIndex,
  });
}

export default async function TinTucArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: newsPageContent.breadcrumbHome, path: "/" },
          { name: newsPageContent.breadcrumbCurrent, path: "/tin-tuc" },
          { name: article.meta.title, path: `/tin-tuc/${article.slug}` },
        ])}
      />
      <NewsArticleBanner article={article} />
      <NewsArticleBody article={article} />
    </>
  );
}
