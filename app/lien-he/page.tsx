import type { Metadata } from "next";
import { ServicesContactSection } from "@/components/sections/ServicesContactSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Liên hệ | PML Vietnam",
  description:
    "Liên hệ PML Vietnam để đăng ký tư vấn thiết kế website chuyên nghiệp, chuẩn SEO. Hotline/Zalo, địa chỉ và form gửi yêu cầu.",
};

export default function LienHePage() {
  return (
    <Reveal>
      <ServicesContactSection />
    </Reveal>
  );
}
