import { PhoneContactSection } from "@/components/sections/PhoneContactSection";
import { PremiumServicesSection } from "@/components/sections/PremiumServicesSection";
import { Reveal } from "@/components/ui/Reveal";

/**
 * CTA dịch vụ + banner đăng ký — hiện sau nội dung mọi trang, kể cả `/giai-phap`.
 */
export function DefaultPageExtras() {
  return (
    <>
      <Reveal>
        <PremiumServicesSection />
      </Reveal>
      <Reveal>
        <PhoneContactSection />
      </Reveal>
    </>
  );
}
