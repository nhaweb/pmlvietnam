import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleBanner } from "@/components/sections/NewsArticleBanner";
import { NewsArticleBody } from "@/components/sections/NewsArticleBody";
import { getNewsArticleBySlug, newsArticles } from "@/lib/site-config";

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
    return { title: "Tin tức | PML Vietnam" };
  }

  return {
    title: `${article.meta.title} | PML Vietnam`,
    description: article.meta.description,
  };
}

export default async function TinTucArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <NewsArticleBanner article={article} />
      <NewsArticleBody article={article} />
    </>
  );
}
