import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalPageContent } from "@/lib/site-config";

export function formatLegalHeading(
  heading: string,
  lineBreakBefore?: string,
) {
  if (!lineBreakBefore) return heading;
  const index = heading.indexOf(lineBreakBefore);
  if (index <= 0) return heading;
  return (
    <>
      {heading.slice(0, index).trimEnd()}
      <br />
      <span className="whitespace-nowrap">{lineBreakBefore}</span>
    </>
  );
}

/**
 * Header trang pháp lý — nền navy, breadcrumb + tiêu đề.
 */
export function LegalDocumentHeader({ content }: { content: LegalPageContent }) {
  const {
    heading,
    headingLineBreakBefore,
    description,
    breadcrumbHome,
    breadcrumbCurrent,
  } = content;

  return (
    <section
      aria-labelledby="legal-document-heading"
      className="bg-logo-web"
    >
      <div className="mx-auto max-w-site px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <Reveal amount={0.35}>
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-logo-web"
                >
                  {breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li className="font-semibold text-white">{breadcrumbCurrent}</li>
            </ol>
          </nav>

          <h1
            id="legal-document-heading"
            className="max-w-3xl text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            {formatLegalHeading(heading, headingLineBreakBefore)}
          </h1>
          {description ? (
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-white/80 sm:mt-3.5 sm:text-base">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
