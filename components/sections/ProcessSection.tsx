import Image from "next/image";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  processStepsContent,
  type ProcessStepItem,
} from "@/lib/site-config";

/** Stagger vertical resting positions — matches airy OS-logo layout */
const STEP_OFFSET = [
  "lg:pt-0",
  "lg:pt-8",
  "lg:pt-2",
  "lg:pt-10",
  "lg:pt-1",
] as const;

export type ProcessSectionContent = {
  heading: string;
  steps: ProcessStepItem[];
};

type ProcessSectionProps = {
  /** Override content — mặc định `processStepsContent` trang chủ. */
  content?: ProcessSectionContent;
  sectionId?: string;
};

/**
 * Section 2 — Quy trình 5 bước: tối giản logo tròn + title, float nhẹ lên xuống.
 * Icon lấy từ `public/process/image.png` (crop → `public/process/icons/`).
 */
export function ProcessSection({
  content = processStepsContent,
  sectionId = "quy-trinh",
}: ProcessSectionProps) {
  const { heading, steps } = content;

  return (
    <section
      id={sectionId}
      aria-labelledby="process-heading"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/process/section2-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader
          headingId="process-heading"
          title="Quy trình 5 bước"
          tagline={heading !== "Quy trình 5 bước" ? heading : undefined}
        />

        <RevealStagger
          as="ol"
          className="mt-12 flex flex-col items-center gap-10 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-16 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-4"
          stagger={0.1}
        >
          {steps.map((item, index) => (
            <RevealItem
              key={item.id}
              as="li"
              className={`flex w-full max-w-[11.5rem] justify-center sm:max-w-none lg:w-[18%] ${STEP_OFFSET[index]}`}
            >
                <div
                  className="process-float flex flex-col items-center text-center"
                  style={{
                    animationDelay: `${index * 0.45}s`,
                    animationDuration: `${3.6 + (index % 3) * 0.4}s`,
                  }}
                >
                  <div className="relative h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24">
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={256}
                      height={256}
                      className="h-full w-full rounded-full object-contain drop-shadow-[0_8px_20px_rgba(11,31,58,0.08)]"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="mt-5 whitespace-pre-line text-sm font-semibold leading-snug text-foreground sm:text-[0.9375rem]">
                    {item.title}
                  </h3>
                </div>
              </RevealItem>
            ))}
        </RevealStagger>
      </div>
    </section>
  );
}
