import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateDetailSection } from "@/components/sections/TemplateDetailSection";
import { Reveal } from "@/components/ui/Reveal";
import {
  getProductSampleById,
  getRelatedProductSamples,
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
    return { title: "Mẫu giao diện | PML Vietnam" };
  }

  const title = `${templateDetailContent.form1TitlePrefix} ${item.title}`;
  return {
    title: `${title} | PML Vietnam`,
    description: `${title} — giao diện hiện đại, chuẩn SEO, tốc độ tải dưới 2 giây. Xem thực tế và đăng ký tư vấn triển khai tại PML Vietnam.`,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getProductSampleById(slug);
  if (!item) notFound();

  const relatedItems = getRelatedProductSamples(item);

  return (
    <Reveal trigger="mount">
      <TemplateDetailSection item={item} relatedItems={relatedItems} />
    </Reveal>
  );
}
