# PML Vietnam Homepage — Content Update (từ sheet "Trang chủ")

> File này bổ sung content THẬT cho các section trước đây đánh dấu placeholder trong `nhaweb-landing-tasks.md`. Dùng kèm file đó, không thay thế.

---

## Mapping với task cũ

| # sheet mới | Nội dung | Khớp với task cũ | Trạng thái |
|---|---|---|---|
| 1 Banner | chờ pixel size | Header/Hero area | ⏳ chờ dev cung cấp pixel |
| 2 Giới thiệu ngắn | chưa có nội dung | mới, chưa có trong task cũ | ⏳ chờ content |
| 3 Dịch vụ/Sản phẩm nổi bật | 5 website nổi bật (bento) | Section 3 | ✅ layout 5 mẫu |
| 4 Tin tức/Sự kiện | 5/hàng | Section 8 cũ (phần "tin tức") | ✅ `NewsSection` carousel |
| 5 Nhận xét khách hàng | có content thật | **mới**, chưa có trong task cũ | ✅ sẵn sàng làm, layout ref web4s.vn |
| 6 Logo đối tác | chưa có | **mới** | ⏳ để slot trống, ẩn section nếu chưa có logo |
| 7 Form Đăng ký tư vấn | có đầy đủ field | Section 7 cũ ("Đăng ký tư vấn" CTA) | ✅ sẵn sàng làm |
| 8 Form Đăng ký ngay | có đầy đủ field | Section 8 cũ (form số điện thoại) — **cập nhật**: form giờ có nhiều field hơn, không chỉ số điện thoại | ✅ ContactFormModal register |
| 9–14 Footer | có đầy đủ nội dung | Section 9 cũ (footer) | ✅ sẵn sàng làm |

---

## Nội dung chi tiết

### 3. Dịch vụ / Sản phẩm nổi bật
- Hiện tại: **chỉ 5 mẫu website nổi bật** (layout bento: 1 card cao + 4 card 2×2)
- Data-driven từ array `websiteSamplesContent.items` — dễ swap ảnh/title sau
- Chờ ảnh mẫu thật để thay placeholder SVG

### 4. Tin tức / Sự kiện mới nhất
- ✅ `NewsSection` — 5 tin/hàng, carousel `<` `>` + auto next 4s + kéo/vuốt (cùng pattern slider mẫu website cũ)
- Data: `newsContent` trong `lib/site-config.ts` (placeholder — swap khi có bài thật)
- Card riêng: ảnh trên + category/date + title + excerpt (khác card mẫu website)

### 5. Nhận xét của khách hàng
- Layout: giống web4s.vn
- Nội dung mẫu đầu tiên (dùng làm placeholder/demo trong lúc chưa có thêm):
  - Tên: Phạm Minh Luân
  - Chức danh: Chủ shop Luvini & Co
  - Nội dung: đánh giá về PML Vietnam (chất lượng thiết kế, tỉ mỉ, phù hợp ngành)
- Nên build dạng carousel/slider vì sau này sẽ có nhiều review hơn (dù hiện tại chỉ có 1)

### 6. Logo đối tác
- Chưa có logo nào — **chưa cần build UI ngay**, chỉ cần chừa placeholder/component rỗng, ẩn section này (không render) cho tới khi có data thật
- Ghi chú: sau này chọn 1 trong 2 kiểu hiển thị — full logo grid hoặc slide ngang

### 7. Form "Đăng ký tư vấn"
- Layout: trái là hình ảnh PML Vietnam (ảnh update sau, để placeholder image), phải là form
- Heading: "PML Vietnam XIN CHÀO!" + text phụ (luôn sẵn sàng lắng nghe...)
- Fields:
  - Tên của bạn * (required)
  - Số điện thoại * (required)
  - Email (optional)
  - Nội dung bạn cần hỗ trợ (textarea, optional)
- Button: "Đăng ký tư vấn" — dùng component `CTAButton` đã làm ở Task 1.2
- Hotline/Zalo hiển thị kèm: 0907566279
- Submit: gửi email tới `nhaweb.vn@gmail.com` (cần bàn API route: dùng service gì để gửi mail — Resend, Nodemailer, hay form service ngoài?)

### 8. Form "Đăng ký ngay"
- Layout tương tự Form 7 nhưng title **động** theo mẫu web khách vừa chọn (VD: "Mẫu thời trang số 1")
- Fields giống hệt Form 7 (Tên*, SĐT*, Email, Nội dung)
- Button: "Đăng ký ngay"
- Submit: cũng gửi về `nhaweb.vn@gmail.com`, kèm tên mẫu web đã chọn trong nội dung mail
- **Lưu ý:** đây là bản cập nhật so với task cũ (Section 8 cũ chỉ có 1 field số điện thoại) — nếu đã build theo task cũ rồi thì cần sửa lại thêm field
- ✅ Đã làm: `ContactFormModal` variant=`register` + Section 8 CTA; click mẫu website / Hero "Đăng ký ngay" mở modal. API `/api/contact` đang stub (log) — chờ chọn service gửi mail.

> Gợi ý: Form 7 và 8 nên dùng chung 1 component `ContactFormModal`, khác nhau qua prop `variant` ("consult" | "register") để đổi title/button text, tránh duplicate code.

### 9–14. Footer
- **#9 Logo + social**: `Nhà_Web_logo.webp`, icon Facebook/Youtube/Tiktok có hyperlink. Nếu chữ "Web" bị mờ trên nền navy thì đổi nền footer sáng lên chút: `#1E293B` thay vì `#0B1F3A` (áp dụng nếu cần, test trực quan trước)
- **#10 Cột "Dịch vụ"**: liệt kê lại đúng danh sách dịch vụ đang có ở Header menu (tái dùng data source, đừng hard-code trùng 2 chỗ)
- **#11 Cột "Thông tin"**: Giới thiệu / Quy trình làm việc / Dự án / Tin tức (chờ update nội dung/link sau)
- **#12 Cột "Trợ giúp"**: Hướng dẫn sử dụng / Các chính sách / Bảo mật thông tin (chờ update sau)
- **#13 Cột "Liên hệ"**: 
  - Phone: 0907566279
  - Email: nhaweb.vn@gmail.com
  - Địa chỉ: 208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh (link Google Maps)
- **#14 Copyright**: "Bản quyền © 2026 | PML Vietnam – Thiết kế & Vận hành website", căn giữa

---

## Task còn thiếu cần bổ sung vào file task chính

- [x] Task mới: `TestimonialSection` (mục 5)
- [ ] Task mới: `PartnerLogos` (mục 6) — build rỗng/ẩn trước
- [x] Task mới: `ContactFormModal` dùng chung cho Form 7 + 8, có variant prop
- [~] Task mới: API route gửi email (`/api/contact`) — stub nhận payload; chờ chọn service gửi mail
- [x] Cập nhật lại Task Section 8 cũ: đổi từ "chỉ số điện thoại" thành full form 4 field (qua modal)
- [ ] Footer (#9-14): giờ đã đủ content, có thể build thật thay vì chờ

## Còn thiếu, chưa build được ngay
- Pixel size banner (mục 1) — chờ dev
- Nội dung giới thiệu ngắn <200 từ (mục 2) — chờ content
- Ảnh PML Vietnam cho Form 7 & 8 — chờ ảnh
- Logo đối tác (mục 6) — chờ đối tác
