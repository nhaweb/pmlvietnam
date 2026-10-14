import assert from "node:assert/strict";
import { test } from "node:test";
import {
  filterSearchResults,
  normalizeSearch,
  relatedSearchSuggestions,
} from "./search.ts";
import { searchPopularSuggestions } from "./site-config.ts";

test("normalizeSearch matches accented and unaccented Vietnamese", () => {
  assert.equal(normalizeSearch("xây dựng"), "xay dung");
  assert.equal(normalizeSearch("xay dung"), "xay dung");
  assert.equal(normalizeSearch("Thiết kế"), normalizeSearch("thiet ke"));
  assert.equal(normalizeSearch("Điều khoản"), "dieu khoan");
  assert.equal(normalizeSearch("đào tạo"), "dao tao");
});

test("popular suggestions omit catalog / process / terms shortcuts", () => {
  const labels = searchPopularSuggestions.map((item) => item.label);
  assert.equal(labels.includes("Mẫu giao diện website"), false);
  assert.equal(labels.includes("Quy trình làm việc"), false);
  assert.equal(labels.includes("Điều khoản sử dụng"), false);
});

test("empty query keeps curated suggestions and hides site catalog", () => {
  const results = filterSearchResults("");
  assert.ok(results.popular.length > 0);
  assert.equal(results.templates.length, 0);
  assert.equal(results.pages.length, 0);
});

test("xây dựng and xay dung return the same construction results", () => {
  const accented = filterSearchResults("xây dựng");
  const plain = filterSearchResults("xay dung");

  const accentedHrefs = [
    ...accented.templates,
    ...accented.pages,
  ].map((item) => item.href);
  const plainHrefs = [...plain.templates, ...plain.pages].map(
    (item) => item.href,
  );

  assert.deepEqual(accentedHrefs, plainHrefs);
  assert.ok(
    accented.templates.some((item) => item.label === "Xây dựng & Bất động sản"),
  );
  assert.ok(
    accented.templates.some((item) =>
      item.label.toLowerCase().includes("xây dựng"),
    ),
  );
});

test("query words match regardless of order", () => {
  const ordered = filterSearchResults("noi that xuong go");
  const reversed = filterSearchResults("xuong go noi that");
  const hrefs = (r: ReturnType<typeof filterSearchResults>) =>
    [...r.templates, ...r.pages].map((item) => item.href).sort();
  assert.ok(hrefs(ordered).length > 0);
  assert.deepEqual(hrefs(ordered), hrefs(reversed));
});

test("related suggestions recover partial matches when strict search is empty", () => {
  const query = "spa zzzqqq";
  const strict = filterSearchResults(query);
  assert.equal(
    strict.popular.length + strict.templates.length + strict.pages.length + strict.promo.length,
    0,
  );
  const related = relatedSearchSuggestions(query);
  assert.ok(related.length > 0);
  assert.ok(related.length <= 5);
});

test("related suggestions ignore generic-only queries", () => {
  assert.deepEqual(relatedSearchSuggestions("website zz"), []);
});
