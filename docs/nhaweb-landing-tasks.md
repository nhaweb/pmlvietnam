# PML Vietnam Landing Page — Task Breakdown cho Cursor

## 1. Setup nền tảng (làm trước tiên, mọi task sau phụ thuộc vào đây)

- [x] Task 1.1: Cập nhật Tailwind config / design tokens theo màu + font ở mục 0
- [x] Task 1.2: Component `CTAButton` (nền cam #F97316, chữ trắng, bo tròn — ref vinahost.vn nút "Xem thêm")
- [x] Task 1.3: Component `Card` dùng chung (border + bg full, ref luvini.vn)
- [x] Task 1.4: Utility/hook cho hiệu ứng click-to-zoom ảnh (ref tma.vn) — có thể tái dùng GSAP hoặc CSS scale transition

## 2. Layout shell

- [x] Task 2.1: `Header` — nền trắng, menu có sub-menu dropdown + hover highlight (đã có mẫu hành vi ở luvini.vn — có thể tái dùng code cũ nếu template đã có)
- [x] Task 2.2: `Footer` — nền navy #0B1F3A, layout lấy từ sheet "Trang chủ" (item #9–#14, cần export/paste nội dung sheet ra text cho AI đọc)
- [x] Task 2.3: `FloatingContactIcons` — Phone + Zalo, fixed góc dưới phải (ref interdata.vn)

## 3. Section theo thứ tự trên trang

- [x] **Section 1** — Hero dịch vụ: bên trái text cố định + 6 bullet (dùng dấu ✓), bên phải hình ảnh. Layout đúng như web4s.vn (không sáng tạo thêm, copy bố cục). Bullet content:
  - Thời gian triển khai 5–7 ngày
  - Giao diện hiện đại & chuẩn SEO (PageSpeed >90 điểm)
  - Hiển thị tốt trên mọi thiết bị
  - Giao diện quản trị dễ sử dụng
  - Sử dụng công nghệ hiện đại, bền vững
  - Đội ngũ hỗ trợ chuyên nghiệp

- [x] **Section 2** — Quy trình 5 bước dạng hình tròn, text mô tả bên dưới mỗi hình, tiêu đề giữa "QUY TRÌNH 5 BƯỚC" (đen, in đậm). Ref interdata.vn. *(copy bước đang placeholder TODO trong `processStepsContent` — swap khi có content/ảnh thật từ email)*

- [x] **Section 3** — Heading giữa "MẪU WEBSITE NỔI BẬT". **Chỉ 5 website nổi bật**, layout bento: 1 card cao trái + 4 card nhỏ 2×2 phải; ảnh full + nhãn trắng đáy. Tagline: "GIAO DIỆN HIỆN ĐẠI, CHUẨN SEO, ĐA DẠNG LĨNH VỰC"

- [x] ~~**Section 4**~~ — gộp vào Section 3 (5 mẫu cố định, không carousel)

- [x] **Section 5** — FAQ: "CÂU HỎI THƯỜNG GẶP VỀ DỊCH VỤ THIẾT KẾ WEBSITE CHUYÊN NGHIỆP TẠI PML Vietnam". Layout ref web4s.vn. *(tạm dùng Q&A + ảnh crop từ mẫu web4s — swap trong `faqContent` khi có bản final)*

- [x] **Section 6** — Text giữa "Quy trình 5 bước" + text trái / hình phải (placeholder). ⚠️ Content/hình final CHƯA CÓ — swap `section6Content` khi có.

- [x] **Section 7** — "TẠI SAO BẠN NÊN CHỌN… / NỀN TẢNG CÔNG NGHỆ…". Glass cards 2×4 + CTA "Đăng ký tư vấn". ⚠️ Ảnh nền collage final CHƯA CÓ — đang dùng placeholder; swap trong `whyChooseContent`.

- [x] **Section 8** — Form "Đăng ký ngay" (4 field qua `ContactFormModal` variant=register; Section 8 là CTA mở modal)

- [ ] **Section 9** — Footer info đầy đủ theo sheet "Trang chủ" #9–#14

## 4. Chi tiết bổ sung (áp dụng xuyên suốt, không phải section riêng)

- [ ] Khi click vào bất kỳ dịch vụ nào → trang đó luôn hiện info block cố định (cần ảnh mẫu từ email để build đúng UI)
- [x] Modal/form đăng ký dùng chung (`ContactFormModal` variant consult|register) — Section 7 CTA, Hero, mẫu website, Section 8

---

## Cách dùng file này với Cursor

1. Paste **mục 0 (Design Tokens)** vào đầu MỌI task mới (system context) — có thể lưu thành `.cursor/rules` hoặc file `DESIGN_SPEC.md` trong repo để Cursor tự đọc.
2. Với mỗi task, kèm theo **screenshot site ref tương ứng** trực tiếp trong chat — đừng chỉ dán link, vì Cursor không tự mở link được.
3. Làm theo thứ tự: **Setup → Layout shell → Section 1–4 (content đã rõ) → Section 5–8 (đánh dấu placeholder, dễ swap khi có content thật) → Section 9**.
4. Với Section 5–8: nói rõ với Cursor "build placeholder, để prop/data tách riêng ra 1 object/config để sau này swap nội dung không cần sửa layout".
