import type { Metadata } from "next";
import { AboutIntroSection } from "@/components/sections/AboutIntroSection";
import { AboutVisionSection } from "@/components/sections/AboutVisionSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Giới thiệu | PML Vietnam",
  description:
    "PML Vietnam — đồng hành chuyển đổi số cùng bạn. Giải pháp thiết kế và vận hành website hiện đại, tối ưu trải nghiệm với chi phí hợp lý.",
};

export default function GioiThieuPage() {
  return (
    <>
      <AboutIntroSection />
      <Reveal>
        <AboutVisionSection />
      </Reveal>
    </>
  );
}
