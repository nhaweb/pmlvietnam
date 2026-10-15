import {
  footerContent,
  industryGroups,
  navItems,
  productSampleHref,
  productsPageContent,
  searchPopularSuggestions,
  searchPromoSuggestions,
  type SearchSuggestion,
} from "./site-config";

export type SearchResultGroups = {
  popular: SearchSuggestion[];
  templates: SearchSuggestion[];
  pages: SearchSuggestion[];
  promo: SearchSuggestion[];
};

type SearchEntry = SearchSuggestion & { keywords?: string };

/**
 * Bỏ dấu tiếng Việt để "xay dung" khớp "Xây dựng".
 * NFD + đ/Đ; bỏ dấu câu để "&" / "-" không chặn substring.
 */
export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function haystack(entry: SearchEntry) {
  return normalizeSearch(
    entry.keywords ? `${entry.label} ${entry.keywords}` : entry.label,
  );
}

function queryTokens(query: string) {
  return normalizeSearch(query).split(" ").filter(Boolean);
}

/** Mọi từ trong query đều phải xuất hiện — không phụ thuộc thứ tự ("ban hang website"). */
function matchesQuery(entry: SearchEntry, query: string) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return true;
  const text = haystack(entry);
  return tokens.every((token) => text.includes(token));
}

function matchScore(entry: SearchEntry, query: string) {
  const q = normalizeSearch(query);
  const label = normalizeSearch(entry.label);
  if (!q) return 0;
  if (label === q) return 0;
  if (label.startsWith(q)) return 1;
  const labelIndex = label.indexOf(` ${q}`);
  if (labelIndex >= 0) return 2;
  if (label.includes(q)) return 3;
  return 4;
}

function sortMatches(items: SearchEntry[], query: string) {
  return [...items].sort((a, b) => {
    const score = matchScore(a, query) - matchScore(b, query);
    if (score !== 0) return score;
    return a.label.localeCompare(b.label, "vi");
  });
}

function uniqueByHref(items: SearchEntry[]): SearchSuggestion[] {
  const seen = new Set<string>();
  const result: SearchSuggestion[] = [];
  for (const item of items) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    result.push({ id: item.id, label: item.label, href: item.href });
  }
  return result;
}

function templateEntries(): SearchEntry[] {
  const groups: SearchEntry[] = industryGroups.map((group) => ({
    id: `group-${group.id}`,
    label: group.label,
    href: `/san-pham#${group.id}`,
    keywords: group.occupations.join(" "),
  }));

  const samples: SearchEntry[] = productsPageContent.items.map((item) => ({
    id: `sample-${item.id}`,
    label: item.title,
    href: productSampleHref(item),
  }));

  return [...groups, ...samples];
}

function pageEntries(): SearchEntry[] {
  const pages: SearchEntry[] = [];

  for (const item of navItems) {
    pages.push({ id: `nav-${item.href}`, label: item.label, href: item.href });
    for (const child of item.children ?? []) {
      pages.push({
        id: `nav-${child.href}`,
        label: child.label,
        href: child.href,
      });
    }
  }

  for (const link of footerContent.info.links) {
    pages.push({
      id: `footer-info-${link.href}`,
      label: link.label,
      href: link.href,
    });
  }
  for (const link of footerContent.help.links) {
    pages.push({
      id: `footer-help-${link.href}`,
      label: link.label,
      href: link.href,
    });
  }

  return uniqueByHref(pages);
}

const SITE_TEMPLATES = templateEntries();
const SITE_PAGES = pageEntries();

function pagesFor(newsPages: SearchSuggestion[] = []): SearchEntry[] {
  return [...SITE_PAGES, ...newsPages];
}

/** Từ quá chung — khớp gần như mọi entry nên không dùng để gợi ý liên quan. */
const GENERIC_TOKENS = new Set([
  "web",
  "website",
  "trang",
  "mau",
  "thiet",
  "ke",
  "cho",
  "va",
  "cua",
  "the",
  "nao",
  "gi",
]);

/**
 * Gợi ý khi không có kết quả khớp đủ mọi từ: xếp theo số từ có nghĩa trùng.
 * Trả về rỗng nếu query không có từ nào đủ đặc trưng.
 */
export function relatedSearchSuggestions(
  query: string,
  newsPages?: SearchSuggestion[],
  limit = 5,
): SearchSuggestion[] {
  const tokens = queryTokens(query).filter(
    (token) => token.length >= 3 && !GENERIC_TOKENS.has(token),
  );
  if (tokens.length === 0) return [];

  const pool = [
    ...searchPopularSuggestions,
    ...SITE_TEMPLATES,
    ...pagesFor(newsPages),
    ...searchPromoSuggestions,
  ];

  const scored = pool
    .map((entry) => {
      const text = haystack(entry);
      const hits = tokens.filter((token) => text.includes(token)).length;
      return { entry, hits };
    })
    .filter(({ hits }) => hits > 0)
    .sort(
      (a, b) =>
        b.hits - a.hits || a.entry.label.localeCompare(b.entry.label, "vi"),
    )
    .map(({ entry }) => entry);

  return uniqueByHref(scored).slice(0, limit);
}

export function filterSearchResults(
  query: string,
  newsPages?: SearchSuggestion[],
): SearchResultGroups {
  const q = query.trim();
  const pagesSource = pagesFor(newsPages);

  if (!q) {
    return {
      popular: searchPopularSuggestions,
      templates: [],
      pages: [],
      promo: searchPromoSuggestions,
    };
  }

  const popular = sortMatches(
    searchPopularSuggestions.filter((item) => matchesQuery(item, q)),
    q,
  );
  const promo = sortMatches(
    searchPromoSuggestions.filter((item) => matchesQuery(item, q)),
    q,
  );
  const shown = new Set([...popular, ...promo].map((item) => item.href));

  const templates = uniqueByHref(
    sortMatches(
      SITE_TEMPLATES.filter(
        (item) => matchesQuery(item, q) && !shown.has(item.href),
      ),
      q,
    ),
  );
  templates.forEach((item) => shown.add(item.href));

  const pages = uniqueByHref(
    sortMatches(
      pagesSource.filter(
        (item) => matchesQuery(item, q) && !shown.has(item.href),
      ),
      q,
    ),
  );

  return { popular, templates, pages, promo };
}
