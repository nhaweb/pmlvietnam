import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleBanner } from "@/components/sections/NewsArticleBanner";
import { NewsArticleBody } from "@/components/sections/NewsArticleBody";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  articleOgImage,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import {
  getNewsArticleBySlug,
  newsArticles,
  newsPageContent,
} from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) {
    return pageMetadata({
      title: "Tin tức",
      description: newsPageContent.description,
      path: "/tin-tuc",
      noIndex: true,
    });
  }

  const image = articleOgImage(article);

  return pageMetadata({
    title: article.meta.title,
    description: article.meta.description,
    path: `/tin-tuc/${article.slug}`,
    image,
    imageAlt: article.banner.alt,
    type: "article",
    publishedTime: article.banner.publishedAtIso,
  });
}

export default async function TinTucArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
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
