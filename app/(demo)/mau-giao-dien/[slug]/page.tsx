import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateLiveDemoFrame } from "@/components/sections/TemplateLiveDemoFrame";
import { pageMetadata } from "@/lib/seo";
import {
  getProductSampleById,
  getProductSamplesWithLiveDemo,
  templateLiveDemoHref,
} from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductSamplesWithLiveDemo().map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProductSampleById(slug);
  if (!item?.liveUrl) {
    return pageMetadata({
      title: "Mẫu giao diện",
      description: "Demo mẫu giao diện website.",
      path: "/san-pham",
      noIndex: true,
    });
  }

  const path = templateLiveDemoHref(item)!;
  return pageMetadata({
    title: `Demo ${item.title}`,
    description: `Xem demo trực tiếp mẫu website ${item.title} — giao diện hiện đại, chuẩn SEO tại PML Vietnam.`,
    path,
    image: item.image.src,
    imageAlt: item.image.alt,
    noIndex: true,
  });
}

export default async function TemplateLiveDemoPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getProductSampleById(slug);
  if (!item?.liveUrl) notFound();

  return <TemplateLiveDemoFrame item={item} liveUrl={item.liveUrl} />;
}
