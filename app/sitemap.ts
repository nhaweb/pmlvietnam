import type { MetadataRoute } from "next";
import { getNewsSitemapEntries } from "@/lib/news";
import {
  absoluteUrl,
  STATIC_SITEMAP_ROUTES,
} from "@/lib/seo";
import {
  productSampleHref,
  productsPageContent,
} from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    (route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );

  const articles = await getNewsSitemapEntries();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/tin-tuc/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt ?? lastModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = productsPageContent.items.map(
    (item) => ({
      url: absoluteUrl(productSampleHref(item)),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...articleEntries, ...productEntries];
}
