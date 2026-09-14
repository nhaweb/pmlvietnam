import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CTAButton } from "@/components/ui/CTAButton";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { solutionPageContent } from "@/lib/site-config";

/**
 * Landing `/giai-phap` — dự án / mẫu website tiêu biểu.
 */
export function SolutionProjectsSection() {
  const { id, eyebrow, heading, tagline, catalogLabel, catalogHref, items } =
    solutionPageContent.projects;

  return (
    <section
      id={id}
      aria-labelledby="giai-phap-projects-heading"
      className="scroll-mt-24 bg-bg-primary"
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <header className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-cta uppercase sm:text-sm">
              {eyebrow}
            </p>
            <h2
              id="giai-phap-projects-heading"
              className="mt-3 text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2rem]"
            >
              {heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {tagline}
            </p>
          </header>
          <CTAButton
            href={catalogHref}
            className="shrink-0 whitespace-nowrap px-5 py-3 text-sm"
          >
            {catalogLabel}
            <ArrowIcon />
          </CTAButton>
        </div>

        <RevealStagger
          as="ul"
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {items.map((item) => (
            <RevealItem key={item.id} as="li">
              <Card
                className="group relative h-full hover-lift hover:border-cta"
                media={
                  <div className="relative aspect-[16/10] bg-bg-secondary">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="img-zoom object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                }
              >
                <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-cta">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link href={item.href} className="after:absolute after:inset-0">
                      {item.title}
                    </Link>
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        d="M4 10h12M12 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
