import type { Metadata } from "next";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-bg-secondary px-4 py-20 text-center sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cta">
        404
      </p>
      <h1 className="mt-3 max-w-xl text-3xl font-semibold text-footer sm:text-4xl">
        Không tìm thấy trang
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        Đường dẫn có thể đã thay đổi hoặc không còn tồn tại. Quay lại trang chủ
        để tiếp tục khám phá giải pháp website của PML Vietnam.
      </p>
      <div className="mt-8">
        <CTAButton href="/">Về trang chủ</CTAButton>
      </div>
    </section>
  );
}
