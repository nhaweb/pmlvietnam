/**
 * Import tin tức hard-code (`lib/site-config.ts`) lên Sanity.
 *
 *   npx sanity exec scripts/migrate-news-to-sanity.ts --with-user-token -- --dry
 *   npx sanity exec scripts/migrate-news-to-sanity.ts --with-user-token
 *
 * Chạy lại an toàn: bài trùng slug sẽ được cập nhật, không tạo bản sao.
 */
import { randomUUID } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import {
  newsArticleHref,
  newsArticles,
  publishedNewsItems,
  type NewsArticleBlock,
} from "../lib/site-config";

const DRY_RUN = process.argv.includes("--dry");
const client = getCliClient({ apiVersion: "2026-10-13" });

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

/** Mirrors `components/ui/RichText.tsx`: `***`, `**`, `*`, `<u>`, `[text](href)`. */
function parseInline(text: string, marks: string[] = [], markDefs: MarkDef[] = []) {
  const spans: Span[] = [];
  let buf = "";
  let i = 0;

  const flush = () => {
    if (buf) spans.push({ _type: "span", _key: key(), text: buf, marks: [...marks] });
    buf = "";
  };
  const nested = (inner: string, extra: string[]) => {
    flush();
    spans.push(...parseInline(inner, [...marks, ...extra], markDefs).spans);
  };

  while (i < text.length) {
    if (text[i] === "[") {
      const close = text.indexOf("](", i + 1);
      const endParen = close === -1 ? -1 : text.indexOf(")", close + 2);
      if (close !== -1 && endParen !== -1) {
        const label = text.slice(i + 1, close);
        const href = text.slice(close + 2, endParen);
        if (label && href) {
          const def: MarkDef = { _type: "link", _key: key(), href };
          markDefs.push(def);
          nested(label, [def._key]);
          i = endParen + 1;
          continue;
        }
      }
    }
    if (text.startsWith("<u>", i)) {
      const end = text.indexOf("</u>", i + 3);
      if (end !== -1) {
        nested(text.slice(i + 3, end), ["underline"]);
        i = end + 4;
        continue;
      }
    }
    if (text.startsWith("***", i)) {
      const end = text.indexOf("***", i + 3);
      if (end !== -1) {
        nested(text.slice(i + 3, end), ["strong", "em"]);
        i = end + 3;
        continue;
      }
    }
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        nested(text.slice(i + 2, end), ["strong"]);
        i = end + 2;
        continue;
      }
    }
    if (text[i] === "*") {
      const end = findClosingSingleAsterisk(text, i + 1);
      if (end !== -1) {
        nested(text.slice(i + 1, end), ["em"]);
        i = end + 1;
        continue;
      }
    }
    buf += text[i];
    i += 1;
  }
  flush();
  return { spans, markDefs };
}

function findClosingSingleAsterisk(text: string, from: number) {
  let j = from;
  while (j < text.length) {
    if (text[j] !== "*") {
      j += 1;
      continue;
    }
    let k = j;
    while (k < text.length && text[k] === "*") k += 1;
    if (k - j === 1) return j;
    j = k;
  }
  return -1;
}

function textBlock(
  text: string,
  style: string,
  extra: { listItem?: "bullet" | "number"; linkHref?: string } = {},
) {
  const markDefs: MarkDef[] = [];
  const baseMarks: string[] = [];
  if (extra.linkHref) {
    const def: MarkDef = { _type: "link", _key: key(), href: extra.linkHref };
    markDefs.push(def);
    baseMarks.push(def._key);
  }
  const { spans } = parseInline(text, baseMarks, markDefs);
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs,
    children: spans.length ? spans : [{ _type: "span", _key: key(), text: "", marks: [] }],
    ...(extra.listItem ? { listItem: extra.listItem, level: 1 } : {}),
  };
}

const assetCache = new Map<string, string>();
const missingImages: string[] = [];

async function uploadImage(src: string) {
  const cached = assetCache.get(src);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "public", decodeURI(src));
  if (!existsSync(filePath)) {
    missingImages.push(src);
    return null;
  }
  if (DRY_RUN) {
    assetCache.set(src, `dry-${src}`);
    return assetCache.get(src)!;
  }
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  assetCache.set(src, asset._id);
  return asset._id;
}

async function imageValue(src: string, alt: string) {
  const assetId = await uploadImage(src);
  if (!assetId) return null;
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, alt };
}

async function convertBlocks(blocks: NewsArticleBlock[]) {
  const out: unknown[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        out.push(textBlock(block.text, "normal"));
        break;
      case "heading":
        out.push(textBlock(block.text, block.level === 3 ? "h3" : "h2"));
        break;
      case "tagline":
        out.push(textBlock(block.text, "tagline"));
        break;
      case "link":
        out.push(textBlock(block.text, "normal", { linkHref: block.href }));
        break;
      case "list":
        for (const item of block.items) {
          out.push(textBlock(item, "normal", { listItem: block.ordered ? "number" : "bullet" }));
        }
        break;
      case "image": {
        const image = await imageValue(block.src, block.alt);
        if (image) out.push({ ...image, _key: key() });
        break;
      }
    }
  }
  return out;
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN — không ghi dữ liệu\n" : "Đang import lên Sanity…\n");

  const existing = await client.fetch<{ _id: string; slug: string }[]>(
    `*[_type == "newsArticle" && !(_id in path("drafts.**"))]{_id, "slug": slug.current}`,
  );
  const idBySlug = new Map(existing.map((doc) => [doc.slug, doc._id]));

  let created = 0;
  let updated = 0;

  for (const item of publishedNewsItems) {
    const article = newsArticles.find((a) => newsArticleHref(a.slug) === item.href);
    if (!article) continue;

    const mainImage = await imageValue(item.image.src, item.image.alt);
    const body = await convertBlocks(article.blocks);

    const fields = {
      title: item.title,
      slug: { _type: "slug", current: article.slug },
      publishedAt: new Date(article.banner.publishedAtIso).toISOString(),
      category: item.category,
      excerpt: item.excerpt,
      ...(mainImage ? { mainImage } : {}),
      body,
      seo: { title: article.meta.title, description: article.meta.description },
    };

    const existingId = idBySlug.get(article.slug);
    console.log(`${existingId ? "↻ cập nhật" : "+ tạo mới "}  ${article.slug}  (${body.length} block)`);

    if (DRY_RUN) {
      existingId ? updated++ : created++;
      continue;
    }
    if (existingId) {
      await client.patch(existingId).set(fields).commit();
      updated++;
    } else {
      await client.create({ _type: "newsArticle", ...fields });
      created++;
    }
  }

  console.log(`\nTạo mới: ${created} · Cập nhật: ${updated} · Ảnh: ${assetCache.size}`);
  if (missingImages.length) {
    console.warn(`\nKhông tìm thấy ${missingImages.length} ảnh trong public/:`);
    for (const src of missingImages) console.warn(`  - ${src}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
