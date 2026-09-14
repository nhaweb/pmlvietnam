import { SectionHeader } from "@/components/ui/SectionHeader";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import {
  customWebsiteCostContent,
  customWebsiteDetailsContent,
  customWebsiteIntroContent,
} from "@/lib/site-config";

export type ServiceIntroContent = {
  id: string;
  heading: string;
  intro: string;
  highlightTitle: string;
  points: string[];
  note: string;
  image: { src: string; alt: string };
};

export type ServiceCostContent = {
  id: string;
  heading: string;
  body: string;
};

export type ServiceDetailsContent = {
  id: string;
  heading: string;
  items: string[];
};

type IntroProps = {
  content?: ServiceIntroContent;
};

/**
 * Khối intro 2 cột — ảnh + bullets (ref web4s).
 */
export function CustomWebsiteIntroSection({
  content = customWebsiteIntroContent,
}: IntroProps) {
  const { id, heading, intro, highlightTitle, points, note, image } = content;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(249,115,22,0.06),transparent_50%),radial-gradient(ellipse_at_10%_80%,rgba(11,31,58,0.04),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader headingId={`${id}-heading`} title={heading} />

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-foreground/80 sm:mt-8 sm:text-base">
          {intro}
        </p>

        <div className="mx-auto mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          <div className="relative mx-auto aspect-[25/13] w-full max-w-lg overflow-hidden rounded-2xl border border-card-border bg-bg-secondary shadow-[0_12px_40px_rgba(11,31,58,0.08)] lg:max-w-none">
            <ZoomableImage
              src={image.src}
              alt={image.alt}
              fill
              zoom={false}
              className="object-cover object-center"
              frameClassName="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
              {highlightTitle}
            </h3>
            <ul className="mt-5 space-y-4" role="list">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem]"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cta"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-foreground/75 sm:text-[0.9375rem]">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type CostProps = {
  content?: ServiceCostContent;
};

/** Khối chi phí / phạm vi dịch vụ. */
export function CustomWebsiteCostSection({
  content = customWebsiteCostContent,
}: CostProps) {
  const { id, heading, body } = content;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 bg-bg-secondary"
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader
          headingId={`${id}-heading`}
          title={heading}
          tagline={body}
        />
      </div>
    </section>
  );
}

type DetailsProps = {
  content?: ServiceDetailsContent;
};

/** Khối thông tin chi tiết dịch vụ. */
export function CustomWebsiteDetailsSection({
  content = customWebsiteDetailsContent,
}: DetailsProps) {
  const { id, heading, items } = content;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 bg-bg-primary"
    >
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeader headingId={`${id}-heading`} title={heading} />

        <ul
          className="mx-auto mt-10 max-w-3xl space-y-4 sm:mt-12"
          role="list"
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-card-border bg-bg-secondary/60 px-4 py-4 text-sm leading-relaxed text-foreground/85 sm:gap-4 sm:px-5 sm:py-5 sm:text-[0.9375rem]"
            >
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta text-white"
                aria-hidden
              >
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
