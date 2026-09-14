# Task List – Trang Giới thiệu (About Us) – PML Vietnam

## Section 1: Giới thiệu chung
- [x] Build component 2 cột: **text trái – hình phải**
- [x] Ref layout theo interdata.vn/about-us → xem cách set container width, spacing giữa 2 cột
- [ ] **Cần xác nhận với design**: pixel size chuẩn cho hình bên phải *(tạm dùng native 395×600)*
- [x] Responsive: xử lý stack dọc trên mobile (text trước → hình dưới)
- [x] Nội dung text: "PML Vietnam -  Đồng hành chuyển đổi số cùng bạn

    PML Vietnam mang đến giải pháp thiết kế và vận hành website hiện đại, tối ưu trải nghiệm người dùng với chi phí hợp lý. Chúng tôi giúp cá nhân và doanh nghiệp sở hữu website chuyên nghiệp mà không cần am hiểu công nghệ, để tập trung phát triển kinh doanh và tăng trưởng doanh số."
- [x] Image bên phải public\about-us\gioi-thieu-chung.webp

## Section 2: Tầm nhìn – Sứ mệnh – Giá trị cốt lõi
- [x] Build component 2 cột: **hình trái – text phải** (layout ngược Section 1)
- [x] Nội dung có 4 sub-block: Đội ngũ, Tầm nhìn, Giá trị cốt lõi, Định hướng phát triển → dùng heading nhỏ (h3/h4) cho từng sub-block
- [ ] **Cần xác nhận với design**: pixel size chuẩn cho hình bên trái *(tạm dùng native 680×516)*
- [x] Tái sử dụng pattern layout từ Section 1 với prop `imagePosition: 'left' | 'right'`
- [x] Nội dung:  
Title: Tầm nhìn - Sứ mệnh - Giá trị cốt lõi

Đội ngũ
PML Vietnam được xây dựng bởi đội ngũ có hơn 7 năm kinh nghiệm phát triển website và 17 năm kinh nghiệm kiểm thử chất lượng phần mềm tại TMA Solutions. Nền tảng chuyên môn vững chắc giúp chúng tôi tạo ra những website hiện đại, ổn định, dễ sử dụng và đáp ứng tốt nhu cầu kinh doanh thực tế.

Tầm nhìn

Ứng dụng công nghệ hiện đại và bền vững để giúp cá nhân, hộ kinh doanh và doanh nghiệp vừa và nhỏ xây dựng hiện diện trực tuyến chuyên nghiệp, từng bước phát triển thương hiệu và nâng cao hiệu quả kinh doanh trên môi trường số.

Giá trị cốt lõi

PML Vietnam lấy trải nghiệm người dùng làm trung tâm, không ngừng sáng tạo và đổi mới trong từng giải pháp. Chúng tôi đề cao sự trung thực, minh bạch và luôn nỗ lực hoàn thiện sản phẩm đúng với những gì đã cam kết cùng khách hàng.

Định hướng phát triển

PML Vietnam hướng đến trở thành đơn vị cung cấp dịch vụ thiết kế và vận hành website tiên phong trong việc ứng dụng công nghệ hiện đại. Mục tiêu của chúng tôi là mang đến những giải pháp website hiệu quả, dễ mở rộng và có khả năng hỗ trợ doanh nghiệp vừa và nhỏ tiếp cận khách hàng, phát triển thương hiệu và thúc đẩy doanh số.

- [x] image: public\about-us\gioi-thieu-chung-tam-nhin.webp

## Section 3: Hành trình phát triển
- [ ] **Đang thiếu content** → cần xin thêm nội dung/timeline từ client
- [ ] Tạm placeholder hoặc bỏ qua section này ở lần build đầu
- [ ] Follow-up: hỏi khách hàng có milestone/dấu mốc nào muốn đưa vào (timeline ngang hoặc dọc)

## Section 4: Trải nghiệm dịch vụ cao cấp
- [ ] Hiển thị title + logo PML Vietnam (`Nhà_Web_logo.webp`)
- [ ] Build 3 banner/card ngang: **Thiết kế Website / Chăm sóc Website / Thiết kế nhận diện thương hiệu**
  - [ ] Style: nền cam, chữ trắng
  - [ ] Mỗi card click → điều hướng tới trang ngành tương ứng (cần xác định route/slug)
- [ ] Responsive: 3 card ngang desktop → stack hoặc scroll ngang trên mobile

---

## ⚠️ Open questions cần confirm trước khi code
1. Pixel size chuẩn cho ảnh ở Section 1 & 2 (width/height hoặc aspect ratio)
2. Nội dung/asset cho Section 3 (Hành trình phát triển) – hiện chưa có
3. Route đích khi click 3 category ở Section 4 (page riêng hay anchor scroll tới section dịch vụ?)
