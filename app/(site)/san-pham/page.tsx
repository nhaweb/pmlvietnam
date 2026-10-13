import type { Metadata } from "next";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { ProductsPageBanner } from "@/components/sections/ProductsPageBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sản phẩm — Mẫu giao diện",
  description:
    "Kho mẫu giao diện website PML Vietnam theo 10 nhóm ngành nghề. Chọn mẫu phù hợp và đăng ký triển khai chuẩn SEO.",
  path: "/san-pham",
  image: "/san-pham/banner/banner.webp",
});

export default function SanPhamPage() {
  return (
    <>
      <ProductsPageBanner />
      <ProductsCatalogSection />
    </>
  );
}
