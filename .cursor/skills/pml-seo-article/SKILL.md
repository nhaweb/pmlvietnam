---
name: pml-seo-article
description: Writes PML Content SEO articles in the professional Standard voice (bản 1): structured H2/H3, brand-safe Vietnamese, package word counts, onpage pack, 18-item checklist. Use when writing or revising SEO Content articles, bài Standard/Pro/Premium, form khách, local/seo-content, or pml-seo-content.mdc.
---

# Viết bài PML Content (giọng bản 1)

Đọc `local/seo-content/pml-seo-content.mdc` rồi form khách. Sau draft, đọc `.cursor/skills/seo-content-qc/SKILL.md`.

**Mẫu giọng:** bản chuyên nghiệp trong `local/seo-content/bai-1-website-chuyen-nghiep.md` (heading rõ, lịch sự, CTA đầy đủ). **Không** lặp bản “humanize” khẩu ngữ (mình/tụi mình/kể chuyện) — đã fail detector và fail thương hiệu.

## Giọng

- Tiếng Việt trang trọng, dễ đọc, đúng chính tả. Câu vừa, đoạn không quá dài.
- Được: H2/H3, 3–5 luận điểm đánh số, gạch đầu dòng, kết + CTA.
- Cấm: giọng chat, “nói thiệt”, anecdote bịa, phá heading để hạ % AI.
- Chi tiết chỉ lấy từ form, site PML (`lib/site-config.ts`: SĐT, địa chỉ, quy trình 5 bước, USP), không bịa case study.

## Chữ đậm / nghiêng / gạch chân (bắt buộc trong khối Nội dung bài)

Dùng đúng ba kiểu này; không bỏ, không thay bằng CAPS hay màu.

| Kiểu | Markdown | Dùng cho | Không dùng cho |
|---|---|---|---|
| **Đậm** | `**…**` | Từ khóa chính (lần đầu ở mở bài + 1–2 lần nhấn ở H2/kết, không mỗi câu). Nút/câu CTA chính. Tên gói khi so sánh (Standard/Pro/Premium). | Cả đoạn, cả heading, mọi lần xuất hiện từ khóa |
| *Nghiêng* | `*…*` | Thuật ngữ phụ, tên sản phẩm/dịch vụ khách, USP ngắn, trích ý khách. Từ khóa phụ (gói Pro+) lần nhấn. | CTA chính, H1 |
| Gạch chân | `<u>…</u>` | Câu kêu gọi hành động (vd. `<u>**Đăng ký tư vấn**</u>`). Số điện thoại / Zalo / URL liên hệ ở khối CTA. | Từ khóa giữa bài, heading |

Quy tắc CTA cuối bài: vừa **đậm** vừa `<u>` gạch chân cho đúng một cụm hành động. Link vẫn markdown `[text](url)`; phần text CTA được `<u>`.

Ví dụ:

```markdown
Một **website chuyên nghiệp** giúp khách hiểu bạn bán gì.

PML Vietnam nổi bật nhờ *nền tảng công nghệ riêng*.

<u>**Đăng ký tư vấn**</u> tại [pmlvietnam.vn/lien-he](https://pmlvietnam.vn/lien-he) hoặc Zalo <u>0908 985 844</u>.
```

Ít hơn vẫn hơn: tối đa ~6–8 cụm đậm, ~4 nghiêng, 1 cụm CTA gạch chân (+ SĐT/URL). Nhồi format = fail QC.

## Gói (số từ / độ sâu)

| Gói | Từ | Bắt checklist mdc mục 4 |
|---|---|---|
| Standard | 800–1.000 | 1–5, 7, 10–13, 17–18. Không bắt 6, 8, 9, 14–16 |
| Pro | 1.200–1.500 | Thêm từ khóa phụ, internal, readability |
| Premium | 1.800–2.500 | Thêm external, đối thủ (có nguồn), FAQ |

Đếm từ **chỉ khối nội dung bài**. Lệch hạn mức thì cắt/bổ trước khi giao.

## Onpage (mọi gói)

- 1 H1 = tên bài khách đặt (hoặc gần đúng).
- Title SEO < 60 ký tự; meta < 160; có từ khóa chính.
- Slug không dấu, có từ khóa.
- Từ khóa chính: ô khách nếu có; không thì SEO Engineer chọn 1 cụm khớp title + ngành — ghi rõ nguồn.
- CTA: ô khách; trống thì form `/lien-he` + `siteContact`.
- Ảnh: không generate; ghi alt + gợi ý asset. PML tự làm hình.
- Lưu `local/seo-content/<slug>.md` (nhánh `pml-content`). Không commit `app/` `/tin-tuc` trừ khi user bảo publish.

## File bài — cấu trúc

1. Bảng onpage (title, meta, slug, H1, từ khóa, số từ, CTA).
2. `## Nội dung bài` — H1/H2/H3, đậm/nghiêng/`<u>`, checklist 18 mục + QC như bản 1.
3. **Thêm** (không thay checklist): `SEO Title` / `Meta Description` / `Title bài viết`, `<Chèn hình ở đây: …webp>`, `Xem chi tiết nội dung tại đây` + href, giờ làm việc, tagline cuối — mẫu Word tin tức PML. Map developer (và snippet `blocks` nếu có) đặt ngoài khối copy Docs.

Trang giới thiệu dịch vụ (6 section) ≠ bài SEO cho khách: 6 section chỉ khi sửa `/seo-content` hoặc copy landing.

## Cấm

- Đuổi điểm GPTZero/Originality bằng đổi giọng.
- Nhồi từ khóa mỗi H2.
- Số liệu giá/gói bịa; giá gói dịch vụ content lấy mdc mục 2 trừ khi user nói lấy giá trên site.
- Trộn Next.js/Supabase vào bài khách.
