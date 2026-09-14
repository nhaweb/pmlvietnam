import type { Metadata } from "next";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { ProductsPageBanner } from "@/components/sections/ProductsPageBanner";

export const metadata: Metadata = {
  title: "Sản phẩm — Mẫu giao diện | PML Vietnam",
  description:
    "Kho mẫu giao diện website PML Vietnam theo 10 nhóm ngành nghề. Chọn mẫu phù hợp và đăng ký triển khai chuẩn SEO.",
};

export default function SanPhamPage() {
  return (
    <>
      <ProductsPageBanner />
      <ProductsCatalogSection />
    </>
  );
}
