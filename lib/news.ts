import type { PortableTextBlock } from "next-sanity";
import { newsArticleHref, type NewsItem } from "@/lib/site-config";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  newsArticleQuery,
  newsListQuery,
  newsSlugsQuery,
} from "@/sanity/lib/queries";

type SanityImage = {
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
  asset?: { _ref?: string } | null;
};

type NewsCardDoc = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  category: string | null;
  mainImage: SanityImage | null;
};

type NewsArticleDoc = NewsCardDoc & {
  _updatedAt?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: SanityImage | null;
    noIndex?: boolean | null;
  } | null;
  body?: PortableTextBlock[] | null;
};

export type CmsNewsArticle = {
  slug: string;
  meta: {
    title: string;
    description: string;
    noIndex: boolean;
    ogImage: { src: string; alt: string; width: number; height: number };
  };
  banner: {
    src: string;
    alt: string;
    badge: string;
    publishedAt: string;
    publishedAtIso: string;
  };
  updatedAtIso: string;
  body: PortableTextBlock[];
};

const TIME_ZONE = "Asia/Ho_Chi_Minh";

function zonedParts(iso: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${get("day")}/${get("month")}/${get("year")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function newsImageUrl(
  image: SanityImage | null | undefined,
  width: number,
) {
  if (!image?.asset?._ref) return null;
  return urlFor(image).width(width).auto("format").url();
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** JPG rather than auto/webp: Zalo's link preview does not reliably render webp. */
function ogImageUrl(image: SanityImage) {
  return urlFor(image)
    .width(OG_WIDTH)
    .height(OG_HEIGHT)
    .fit("crop")
    .format("jpg")
    .quality(85)
    .url();
}

function toNewsItem(doc: NewsCardDoc): NewsItem | null {
  if (!doc.slug || !doc.title || !doc.publishedAt) return null;
  const src = newsImageUrl(doc.mainImage, 960);
  if (!src) return null;
  return {
    id: doc._id,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    date: zonedParts(doc.publishedAt).date,
    href: newsArticleHref(doc.slug),
    category: doc.category?.trim() || "Tin tức",
    image: {
      src,
      alt: doc.mainImage?.alt?.trim() || doc.title,
    },
  };
}

export async function getPublishedNewsItems(): Promise<NewsItem[]> {
  const { data } = await sanityFetch({ query: newsListQuery });
  const docs = (data ?? []) as NewsCardDoc[];
  return docs.flatMap((doc) => {
    const item = toNewsItem(doc);
    return item ? [item] : [];
  });
}

export async function getNewsArticle(
  slug: string,
): Promise<CmsNewsArticle | null> {
  const { data } = await sanityFetch({
    query: newsArticleQuery,
    params: { slug },
  });
  const doc = data as NewsArticleDoc | null;
  if (!doc?.slug || !doc.title || !doc.publishedAt) return null;
  const src = newsImageUrl(doc.mainImage, 1920);
  if (!src) return null;
  const published = zonedParts(doc.publishedAt);
  const ogSource = doc.seo?.ogImage?.asset?._ref ? doc.seo.ogImage : doc.mainImage!;
  return {
    slug: doc.slug,
    meta: {
      title: doc.seo?.title?.trim() || doc.title,
      description: doc.seo?.description?.trim() || doc.excerpt || doc.title,
      noIndex: doc.seo?.noIndex === true,
      ogImage: {
        src: ogImageUrl(ogSource),
        alt: doc.mainImage?.alt?.trim() || doc.title,
        width: OG_WIDTH,
        height: OG_HEIGHT,
      },
    },
    banner: {
      src,
      alt: doc.mainImage?.alt?.trim() || doc.title,
      badge: doc.category?.trim() || "Tin tức",
      publishedAt: `${published.time} - ${published.date}`,
      publishedAtIso: doc.publishedAt,
    },
    updatedAtIso: doc._updatedAt ?? doc.publishedAt,
    body: doc.body ?? [],
  };
}

export async function getNewsSitemapEntries() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<
      Array<{ slug: string; publishedAt: string | null; updatedAt: string | null }>
    >(newsSlugsQuery);
  return slugs ?? [];
}
