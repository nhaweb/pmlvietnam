import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateDetailSection } from "@/components/sections/TemplateDetailSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, SITE_NAME } from "@/lib/seo";
import {
  getProductSampleById,
  getRelatedProductSamples,
  productSampleHref,
  productsPageContent,
  templateDetailContent,
} from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productsPageContent.items.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProductSampleById(slug);
  if (!item) {
    return pageMetadata({
      title: "Mẫu giao diện",
      description: productsPageContent.description,
      path: "/san-pham",
      noIndex: true,
    });
  }

  const title = `${templateDetailContent.form1TitlePrefix} ${item.title}`;
  return pageMetadata({
    title,
    description: `${title} — giao diện hiện đại, chuẩn SEO, tốc độ tải dưới 2 giây. Xem thực tế và đăng ký tư vấn triển khai tại PML Vietnam.`,
    path: productSampleHref(item),
    image: item.image.src,
    imageAlt: item.image.alt,
  });
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getProductSampleById(slug);
  if (!item) notFound();

  const relatedItems = getRelatedProductSamples(item);
  const title = `${templateDetailContent.form1TitlePrefix} ${item.title}`;
  const path = productSampleHref(item);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description: `${title} — mẫu giao diện website tại ${SITE_NAME}`,
          url: absoluteUrl(path),
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: absoluteUrl("/"),
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(item.image.src),
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: templateDetailContent.breadcrumbHome, path: "/" },
          {
            name: templateDetailContent.breadcrumbCatalog,
            path: "/san-pham",
          },
          { name: item.title, path },
        ])}
      />
      <Reveal trigger="mount">
        <TemplateDetailSection item={item} relatedItems={relatedItems} />
      </Reveal>
    </>
  );
}
