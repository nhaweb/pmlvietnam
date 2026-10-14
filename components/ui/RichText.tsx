import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Inline Word/markdown: `**đậm**`, `*nghiêng*`, `***cả hai***`, `<u>gạch chân</u>`, `[text](href)`.
 */
export function RichText({ text }: { text: string }) {
  if (text.includes("\n")) {
    const lines = text.split("\n");
    return (
      <>
        {lines.map((line, index) => (
          <span key={`ln-${index}`}>
            {index > 0 ? <br /> : null}
            {hasRichMarkup(line) ? parseRichText(line) : line}
          </span>
        ))}
      </>
    );
  }
  if (!hasRichMarkup(text)) {
    return text;
  }
  return <>{parseRichText(text)}</>;
}

function hasRichMarkup(text: string) {
  return /[*]|<\/?u>|\[[^\]]+\]\([^)]+\)/.test(text);
}

const linkClassName =
  "font-semibold text-cta underline decoration-cta/40 underline-offset-2 transition-colors hover:text-cta/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta";

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={linkClassName}>
        {children}
      </Link>
    );
  }

  const pml = href.match(/^https?:\/\/(?:www\.)?pmlvietnam\.vn(\/.*)?$/i);
  if (pml) {
    return (
      <Link href={pml[1] || "/"} className={linkClassName}>
        {children}
      </Link>
    );
  }

  const newTab = href.startsWith("http://") || href.startsWith("https://");
  return (
    <a
      href={href}
      className={linkClassName}
      {...(newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

function parseRichText(text: string, keyPrefix = "r"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  let buf = "";
  let n = 0;

  const flush = () => {
    if (buf) {
      nodes.push(buf);
      buf = "";
    }
  };

  const pushMarked = (
    inner: string,
    wrap: (children: ReactNode, key: string) => ReactNode,
  ) => {
    flush();
    const key = `${keyPrefix}-${n}`;
    n += 1;
    const children = hasRichMarkup(inner) ? parseRichText(inner, key) : inner;
    nodes.push(wrap(children, key));
  };

  while (i < text.length) {
    if (text[i] === "[") {
      const close = text.indexOf("](", i + 1);
      const endParen = close === -1 ? -1 : text.indexOf(")", close + 2);
      if (close !== -1 && endParen !== -1) {
        const label = text.slice(i + 1, close);
        const href = text.slice(close + 2, endParen);
        if (label && href) {
          pushMarked(label, (children, key) => (
            <InlineLink key={key} href={href}>
              {children}
            </InlineLink>
          ));
          i = endParen + 1;
          continue;
        }
      }
    }

    if (text.startsWith("<u>", i)) {
      const end = text.indexOf("</u>", i + 3);
      if (end !== -1) {
        pushMarked(text.slice(i + 3, end), (children, key) => (
          <u key={key} className="underline underline-offset-2">
            {children}
          </u>
        ));
        i = end + 4;
        continue;
      }
    }

    if (text.startsWith("***", i)) {
      const end = text.indexOf("***", i + 3);
      if (end !== -1) {
        pushMarked(text.slice(i + 3, end), (children, key) => (
          <strong key={key} className="font-semibold">
            <em className="italic">{children}</em>
          </strong>
        ));
        i = end + 3;
        continue;
      }
    }

    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        pushMarked(text.slice(i + 2, end), (children, key) => (
          <strong key={key} className="font-semibold">
            {children}
          </strong>
        ));
        i = end + 2;
        continue;
      }
    }

    if (text[i] === "*") {
      const end = findClosingSingleAsterisk(text, i + 1);
      if (end !== -1) {
        pushMarked(text.slice(i + 1, end), (children, key) => (
          <em key={key} className="italic">
            {children}
          </em>
        ));
        i = end + 1;
        continue;
      }
    }

    buf += text[i];
    i += 1;
  }

  flush();
  return nodes;
}

function findClosingSingleAsterisk(text: string, from: number): number {
  let j = from;
  while (j < text.length) {
    if (text[j] !== "*") {
      j += 1;
      continue;
    }
    let k = j;
    while (k < text.length && text[k] === "*") {
      k += 1;
    }
    if (k - j === 1) {
      return j;
    }
    j = k;
  }
  return -1;
}
