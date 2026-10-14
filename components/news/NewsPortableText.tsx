import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { Reveal } from "@/components/ui/Reveal";
import { newsImageUrl } from "@/lib/news";

const linkClassName =
  "font-semibold text-cta underline decoration-cta/40 underline-offset-4 transition-colors hover:text-cta/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Reveal amount="some">
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem] sm:leading-[1.75]">
          {children}
        </p>
      </Reveal>
    ),
    h2: ({ children }) => (
      <Reveal amount="some">
        <h2 className="pt-2 text-xl font-bold leading-snug tracking-tight text-foreground sm:pt-3 sm:text-2xl">
          {children}
        </h2>
      </Reveal>
    ),
    h3: ({ children }) => (
      <Reveal amount="some">
        <h3 className="pt-1 text-base font-bold leading-snug text-foreground sm:text-lg">
          {children}
        </h3>
      </Reveal>
    ),
    tagline: ({ children }) => (
      <Reveal amount="some">
        <p className="pt-2 text-center text-sm font-semibold leading-relaxed text-foreground sm:pt-3 sm:text-base">
          {children}
        </p>
      </Reveal>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Reveal amount="some">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/85 marker:text-cta sm:text-[0.9375rem] sm:leading-[1.75]">
          {children}
        </ul>
      </Reveal>
    ),
    number: ({ children }) => (
      <Reveal amount="some">
        <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground/85 marker:font-semibold marker:text-cta sm:text-[0.9375rem] sm:leading-[1.75]">
          {children}
        </ol>
      </Reveal>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    underline: ({ children }) => <u>{children}</u>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!href) return <>{children}</>;
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={linkClassName}>
            {children}
          </Link>
        );
      }
      const external = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          className={linkClassName}
          {...(external
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = newsImageUrl(value, 1600);
      if (!src) return null;
      const alt = typeof value?.alt === "string" ? value.alt : "";
      return (
        <Reveal amount="some">
          <figure className="overflow-hidden py-1 sm:py-2">
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={675}
              quality={85}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 80rem"
            />
          </figure>
        </Reveal>
      );
    },
  },
};

export function NewsPortableText({ value }: { value: PortableTextBlock[] }) {
  if (!value.length) return null;
  return <PortableText value={value} components={components} />;
}
