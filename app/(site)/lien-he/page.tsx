import type { Metadata } from "next";
import { ServicesContactSection } from "@/components/sections/ServicesContactSection";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ PML Vietnam để đăng ký tư vấn thiết kế website chuyên nghiệp, chuẩn SEO. Hotline/Zalo, địa chỉ và form gửi yêu cầu.",
  path: "/lien-he",
});

export default function LienHePage() {
  return (
    <Reveal>
      <ServicesContactSection />
    </Reveal>
  );
}
