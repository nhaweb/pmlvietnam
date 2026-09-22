import type { Metadata, MetadataRoute } from "next";
import {
  faqContent,
  logoPath,
  newsArticles,
  siteContact,
  socialLinks,
  type FaqItem,
  type NewsArticle,
  type NewsArticleBlock,
} from "@/lib/site-config";

/** Production canonical host — override via `NEXT_PUBLIC_SITE_URL` if needed. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://pmlvietnam.vn"
).replace(/\/$/, "");

export const SITE_NAME = "PML Vietnam";

export const DEFAULT_TITLE =
  "PML Vietnam | Giải pháp website, Chuyển đổi số cùng doanh nghiệp";

export const DEFAULT_DESCRIPTION =
  "PML Vietnam thiết kế website chuyên nghiệp, chuẩn SEO và cung cấp hệ sinh thái chuyển đổi số toàn diện, giúp doanh nghiệp bứt phá doanh thu môi trường số.";

/** Default social share image (existing brand banner). */
export const DEFAULT_OG_IMAGE = "/new-banner/pmlvietnam_banner_theo_yeu_cau.webp";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function brandTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Shared page metadata — title template in root layout appends `| PML Vietnam`.
 * Pass `title` without the brand suffix.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} — giải pháp website chuyên nghiệp`,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = brandTitle(title);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(logoPath),
    email: siteContact.email,
    telephone: `+84${siteContact.phoneTel.replace(/^0/, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address,
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: socialLinks.map((link) => link.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+84${siteContact.phoneTel.replace(/^0/, "")}`,
        contactType: "customer service",
        areaServed: "VN",
        availableLanguage: ["vi"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "vi-VN",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqPageJsonLd(items: FaqItem[] = faqContent.items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function firstArticleImage(blocks: NewsArticleBlock[]) {
  const image = blocks.find(
    (block): block is Extract<NewsArticleBlock, { type: "image" }> =>
      block.type === "image",
  );
  return image?.src;
}

export function articleJsonLd(article: NewsArticle) {
  const path = `/tin-tuc/${article.slug}`;
  const image = firstArticleImage(article.blocks) ?? article.banner.src;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    image: [absoluteUrl(image)],
    datePublished: article.banner.publishedAtIso,
    dateModified: article.banner.publishedAtIso,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(logoPath),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    inLanguage: "vi-VN",
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Static marketing routes for sitemap (no dynamic segments). */
export const STATIC_SITEMAP_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/gioi-thieu", changeFrequency: "monthly", priority: 0.8 },
  { path: "/giai-phap", changeFrequency: "monthly", priority: 0.9 },
  { path: "/thiet-ke-website", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/thiet-ke-website-tron-goi",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/thiet-ke-landing-page",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/thiet-ke-nhan-dien-thuong-hieu",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/cham-soc-website", changeFrequency: "monthly", priority: 0.8 },
  { path: "/seo-content", changeFrequency: "monthly", priority: 0.8 },
  { path: "/san-pham", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tin-tuc", changeFrequency: "weekly", priority: 0.8 },
  { path: "/lien-he", changeFrequency: "monthly", priority: 0.7 },
  { path: "/chinh-sach-bao-mat", changeFrequency: "yearly", priority: 0.3 },
  { path: "/dieu-khoan-su-dung", changeFrequency: "yearly", priority: 0.3 },
];

export function articleOgImage(article: NewsArticle) {
  return firstArticleImage(article.blocks) ?? article.banner.src;
}

export { newsArticles };
