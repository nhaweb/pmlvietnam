import Image from "next/image";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { solutionPageContent } from "@/lib/site-config";

const STEP_OFFSET = [
  "lg:pt-0",
  "lg:pt-8",
  "lg:pt-2",
  "lg:pt-10",
  "lg:pt-1",
] as const;

/**
 * Landing `/giai-phap` — 5 nhu cầu, layout giống quy trình 5 bước.
 * Icon: `public/icon-giai-phap/`.
 */
export function SolutionNeedsSection() {
  const { id, heading, items } = solutionPageContent.needs;

  return (
    <section
      id={id}
      aria-labelledby="giai-phap-needs-heading"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/process/section2-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader headingId="giai-phap-needs-heading" title={heading} />

        <RevealStagger
          as="ul"
          className="mt-12 flex flex-col items-center gap-10 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-16 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-4"
          stagger={0.1}
        >
          {items.map((item, index) => (
            <RevealItem
              key={item.id}
              as="li"
              className={`flex w-full max-w-[16rem] justify-center sm:max-w-none lg:w-[18%] ${STEP_OFFSET[index]}`}
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
                    className="h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(11,31,58,0.08)] rounded-full"
                    sizes="96px"
                  />
                </div>
                <h3 className="mt-5 text-sm font-semibold leading-snug text-foreground sm:text-[0.9375rem]">
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
