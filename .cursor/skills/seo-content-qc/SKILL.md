---
name: seo-content-qc
description: Post-draft QC for PML SEO articles — word count, plagiarism reminder, onpage pack. Do not restyle copy to beat AI detectors. Use after writing SEO Content, when the user mentions đạo văn, AI generation, Originality, GPTZero, or bàn giao bài.
---

# SEO Content QC

Chạy **sau** draft. Giọng và bố cục: `.cursor/skills/pml-seo-article/SKILL.md` + `local/seo-content/pml-seo-content.mdc`.

## Làm

1. Đếm từ khối **Nội dung bài**, **trừ Kết luận** (H1 → trước `## Kết luận`) — đúng gói. Không lấy CTA/hotline/tagline để “đủ từ”.
2. Title / meta / slug / 1 H1 / từ khóa / CTA còn đủ.
3. Format chữ: đậm từ khóa chính (không nhồi), nghiêng thuật ngữ/USP, `<u>` CTA + SĐT/URL — đúng bảng trong `pml-seo-article`. Thiếu hoặc nhồi format thì sửa.
4. Nhắc user chạy **đạo văn** (SmallSEOTools, Copyscape, Originality). Agent không bịa % nếu chưa chạy.
5. AI detector (nếu user chạy): ghi nhận. **Không** viết lại giọng trò chuyện / bỏ heading để hạ %. Trang lớn cũng hay bị cờ cao.
6. Chỉ sửa nếu: đạo văn trùng đoạn, sai sự thật, nhồi từ khóa, lệch số từ, thiếu CTA, sai format chữ, lạm dụng `;`, sai checklist gói. Trong **Nội dung bài**, đổi `;` thành dấu chấm / phẩy / “và” (trừ bảng onpage nội bộ).
7. Điểm AI tăng sau “humanize” → revert bản chuyên nghiệp (bài 1 vs bản khẩu ngữ).

## Không làm

- Phá cấu trúc “Năm lý do / Fanpage vs web / Kết luận + CTA”.
- Đòi 0% AI.
- Coi % detector là tiêu chí bàn giao.

## Ghi vào file bài

```
## QC
- Đạo văn: chưa chạy | tool + kết quả
- AI detector: không bắt buộc | tool + % (chỉ ghi nhận)
- Số từ: ghi số thân bài (H1 → trước Kết luận). Không tính Kết luận / CTA / tagline.
- Format chữ: đậm / nghiêng / gạch chân theo pml-seo-article
- Giọng: bản chuyên nghiệp (pml-seo-article)
```

Bàn giao khi: đúng gói + form + onpage + (đạo văn đã chạy hoặc user chấp nhận chạy sau).
