import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  STATIC_SITEMAP_ROUTES,
} from "@/lib/seo";
import {
  newsArticles,
  productSampleHref,
  productsPageContent,
} from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    (route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );

  const articleEntries: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: absoluteUrl(`/tin-tuc/${article.slug}`),
    lastModified: new Date(article.banner.publishedAtIso),
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
