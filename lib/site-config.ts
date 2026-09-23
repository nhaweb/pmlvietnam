/**
 * Site-wide nav + contact + footer copy.
 * Swap values here without editing layout components.
 */

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Mega dropdown — chia đều 2 cột (vd. Mẫu giao diện 5 | 5) */
  columns?: 2;
};

export type SocialLink = {
  id: "facebook" | "youtube" | "tiktok";
  label: string;
  href: string;
};

export const siteContact = {
  phoneDisplay: "0908 985 844",
  phoneTel: "0908985844",
  zaloUrl: "https://zalo.me/0908985844",
  email: "pmluanvn@gmail.com",
  address: "208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=208+Tr%C6%B0%E1%BB%9Dng+Chinh,+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+B%C3%ACnh,+TP.+H%E1%BB%93+Ch%C3%AD+Minh",
};

/**
 * 10 nhóm ngành — nguồn: docs/10-nhom-nganh.md
 * Dùng chung mega menu "Mẫu giao diện" + AllWebsiteSamplesSection.
 */
export type IndustryGroup = {
  id: string;
  label: string;
  /** Ngành nghề thuộc nhóm — tham chiếu content, chưa dùng UI */
  occupations: string[];
};

export const industryGroups: IndustryGroup[] = [
  {
    id: "dich-vu-thuong-mai",
    label: "Dịch vụ & Thương mại",
    occupations: [
      "Nhà hàng, quán ăn",
      "Quán cà phê, trà sữa",
      "Spa, thẩm mỹ viện",
      "Salon tóc, nail",
      "Dịch vụ giặt ủi",
      "Trung tâm gym, yoga",
    ],
  },
  {
    id: "ban-le-tmdt",
    label: "Bán lẻ & Thương mại điện tử",
    occupations: [
      "Cửa hàng thời trang",
      "Cửa hàng mỹ phẩm",
      "Cửa hàng thú cưng",
      "Siêu thị mini, tạp hóa",
      "Thực phẩm & Đồ uống",
      "Cửa hàng hoa, cây cảnh",
      "Cửa hàng đồ gia dụng",
      "Cửa hàng thiết bị điện tử",
      "Cửa hàng điện máy",
    ],
  },
  {
    id: "san-xuat-cong-nghiep",
    label: "Sản xuất & Công nghiệp",
    occupations: [
      "Xưởng may mặc",
      "Nhà máy thực phẩm chế biến",
      "Xưởng gỗ & nội thất",
      "Sản xuất bao bì, in ấn",
      "Cơ khí, kim loại",
    ],
  },
  {
    id: "xay-dung-bds",
    label: "Xây dựng & Bất động sản",
    occupations: [
      "Công ty xây dựng, thiết kế nội thất",
      "Đại lý bất động sản",
      "Dự án khu đô thị, căn hộ",
      "Cho thuê văn phòng, nhà ở",
    ],
  },
  {
    id: "giao-duc-dao-tao",
    label: "Giáo dục & Đào tạo",
    occupations: [
      "Trường mầm non, tiểu học, trung học",
      "Trung tâm ngoại ngữ",
      "Trung tâm đào tạo kỹ năng",
      "Gia sư, dạy kèm",
    ],
  },
  {
    id: "y-te-suc-khoe",
    label: "Y tế & Sức khỏe",
    occupations: [
      "Phòng khám đa khoa",
      "Nhà thuốc, dược phẩm",
      "Thiết bị y tế",
      "Trung tâm vật lý trị liệu",
    ],
  },
  {
    id: "du-lich-khach-san",
    label: "Du lịch & Khách sạn",
    occupations: [
      "Công ty du lịch, lữ hành",
      "Khách sạn, resort",
      "Homestay, căn hộ dịch vụ",
      "Địa điểm vui chơi, giải trí",
    ],
  },
  {
    id: "luat-tai-chinh",
    label: "Luật, Tài chính",
    occupations: [
      "Công ty luật, văn phòng luật sư",
      "Tư vấn tài chính, đầu tư",
      "Bảo hiểm",
      "Kế toán, thuế",
    ],
  },
  {
    id: "cong-nghe-dich-vu-so",
    label: "Công nghệ & Dịch vụ số",
    occupations: [
      "Công ty phần mềm",
      "Dịch vụ IT",
      "Marketing số",
      "AI và tự động hóa",
    ],
  },
  {
    id: "dich-vu-chuyen-nghiep",
    label: "Dịch vụ chuyên nghiệp",
    occupations: ["Thương hiệu cá nhân"],
  },
];

/** Mega menu "Mẫu giao diện" (trái 5 | phải 5) — trang sản phẩm theo nhóm ngành. */
export const templateCategoryLinks: NavChild[] = industryGroups.map((group) => ({
  label: group.label,
  href: `/san-pham#${group.id}`,
}));

/** Footer cột Dịch vụ — cùng danh sách submenu Header. */
export const serviceNavLinks: NavChild[] = [
  { label: "Thiết kế website", href: "/thiet-ke-website" },
  { label: "Thiết kế Landing page", href: "/thiet-ke-landing-page" },
  {
    label: "Thiết kế nhận diện thương hiệu",
    href: "/thiet-ke-nhan-dien-thuong-hieu",
  },
  {
    label: "Thiết kế website trọn gói",
    href: "/thiet-ke-website-tron-goi",
  },
  { label: "Chăm sóc website", href: "/cham-soc-website" },
  { label: "SEO Content", href: "/seo-content" },
];

/** Menu chính — logo + CTA giữ nguyên ở Header; cấu trúc theo mockup. */
export const navItems: NavItem[] = [
  {
    label: "Trang chủ",
    href: "/",
    children: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Giải pháp", href: "/giai-phap" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
  {
    label: "Dịch vụ",
    href: "/#dich-vu",
    children: serviceNavLinks,
  },
  {
    label: "Mẫu giao diện",
    href: "/san-pham",
    columns: 2,
    children: templateCategoryLinks,
  },
  { label: "Tin tức", href: "/tin-tuc" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/pmlvietnam.vn",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@pmlvietnam",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@pmlvietnam.vn",
  },
];

export const footerContent = {
  /** #10 — tái dùng `serviceNavLinks` */
  servicesTitle: "Dịch vụ",
  /** #11 — link/nội dung cập nhật sau */
  info: {
    title: "Thông tin",
    links: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Giải pháp website", href: "/giai-phap" },
      { label: "Liên hệ", href: "/lien-he" },
      { label: "Quy trình làm việc", href: "/#quy-trinh" },
      { label: "Dự án", href: "/san-pham" },
      { label: "Tin tức", href: "/tin-tuc" },
    ],
  },
  /** #12 — link/nội dung cập nhật sau */
  help: {
    title: "Trợ giúp",
    links: [
      { label: "Hướng dẫn sử dụng", href: "/#huong-dan" },
      { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
      { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
      {
        label: "Tính năng & nội dung",
        href: "/giai-phap#tinh-nang-noi-dung-website",
      },
    ],
  },
  contactTitle: "Liên hệ",
  /** #14 */
  copyright:
    "© 2026 PML Vietnam | Giải pháp website, chuyển đổi số cùng doanh nghiệp",
};

export const logoPath = "/logo/pmlvietnam_logo_header.webp";
export const footerLogoPath = "/logo/pmlvietnam_logo_header.webp";

/**
 * Header search — gợi ý khi chưa gõ (ref luvini.vn dropdown).
 * Lọc có dấu / không dấu và catalog trang nằm ở `lib/search.ts`.
 */
export type SearchSuggestion = {
  id: string;
  label: string;
  href: string;
};

export const searchPopularSuggestions: SearchSuggestion[] = [
  {
    id: "giai-phap",
    label: "Giải pháp website",
    href: "/giai-phap",
  },
  {
    id: "thiet-ke-website",
    label: "Thiết kế website",
    href: "/thiet-ke-website",
  },
  {
    id: "thiet-ke-landing-page",
    label: "Thiết kế Landing page",
    href: "/thiet-ke-landing-page",
  },
  {
    id: "mau-web-ban-hang",
    label: "Mẫu web bán hàng",
    href: "/san-pham#ban-le-tmdt",
  },
  {
    id: "cham-soc-website",
    label: "Chăm sóc website",
    href: "/cham-soc-website",
  },
  {
    id: "pml-content",
    label: "SEO Content",
    href: "/seo-content",
  },
  {
    id: "thiet-ke-tron-goi",
    label: "Thiết kế website trọn gói",
    href: "/thiet-ke-website-tron-goi",
  },
  {
    id: "nhan-dien-thuong-hieu",
    label: "Thiết kế nhận diện thương hiệu",
    href: "/thiet-ke-nhan-dien-thuong-hieu",
  },
];

export const searchPromoSuggestions: SearchSuggestion[] = [
  {
    id: "uu-dai-thiet-ke",
    label: "Ưu đãi thiết kế website",
    href: "/#lien-he",
  },
];

/**
 * Trang Giới thiệu — Section 1: Giới thiệu chung.
 * Layout 2 cột text trái / hình phải (ref interdata.vn/about-us).
 * Ảnh: `public/about-us/gioi-thieu-chung1.webp` (1360×1032) — nền asset trắng.
 * `imagePosition` dùng lại cho Section 2 (hình trái / text phải).
 */
export type AboutIntroImagePosition = "left" | "right";

export const aboutIntroContent = {
  id: "gioi-thieu-chung",
  /** Brand line — hiển thị "PML" cam + "Vietnam" navy */
  brandNha: "PML",
  brandWeb: "VIETNAM",
  tagline: "Đồng hành chuyển đổi số cùng bạn",
  body: [
    "PML Vietnam mang đến giải pháp thiết kế và vận hành website hiện đại, tối ưu trải nghiệm người dùng với chi phí hợp lý. Chúng tôi giúp cá nhân và doanh nghiệp sở hữu website chuyên nghiệp mà không cần am hiểu công nghệ, để tập trung phát triển kinh doanh và tăng trưởng doanh số.",
  ],
  image: {
    src: "/about-us/pmlvietnam_gioi_thieu_chung.webp",
    alt: "PML Vietnam — giới thiệu chung, đồng hành chuyển đổi số cùng bạn",
    width: 1360,
    height: 1032,
  },
  imagePosition: "right" as AboutIntroImagePosition,
};

/**
 * Trang Giới thiệu — Section 2: Tầm nhìn – Sứ mệnh – Giá trị cốt lõi.
 * Layout 2 cột hình trái / text phải (ref interdata.vn/about-us “Tham vọng & mục tiêu”).
 * Ảnh: `public/about-us/gioi-thieu-chung-tam-nhin.webp` (680×516).
 */
export type AboutVisionBlockIcon =
  | "team"
  | "vision"
  | "values"
  | "growth";

export type AboutVisionBlock = {
  id: string;
  icon: AboutVisionBlockIcon;
  title: string;
  body: string;
};

export const aboutVisionContent = {
  id: "tam-nhin-su-menh",
  title: "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi",
  /** Badge dưới title — "PML" cam + "Vietnam" trắng trên nền navy (ref InterData brand chip). */
  brandNha: "PML",
  brandWeb: "Vietnam",
  image: {
    src: "/about-us/gioi-thieu-chung-tam-nhin.webp",
    alt: "PML Vietnam — tầm nhìn, sứ mệnh và giá trị cốt lõi",
    width: 680,
    height: 516,
  },
  imagePosition: "left" as AboutIntroImagePosition,
  blocks: [
    {
      id: "doi-ngu",
      icon: "team" as AboutVisionBlockIcon,
      title: "Đội ngũ",
      body: "PML Vietnam được xây dựng bởi đội ngũ có hơn 9 năm kinh nghiệm phát triển website và 19+ năm kinh nghiệm kiểm thử chất lượng phần mềm tại TMA Solutions. Nền tảng chuyên môn vững chắc giúp chúng tôi tạo ra những website hiện đại, ổn định, dễ sử dụng và đáp ứng tốt nhu cầu kinh doanh thực tế.",
    },
    {
      id: "tam-nhin",
      icon: "vision" as AboutVisionBlockIcon,
      title: "Tầm nhìn",
      body: "Ứng dụng công nghệ hiện đại và bền vững để giúp cá nhân, hộ kinh doanh và doanh nghiệp vừa và nhỏ xây dựng hiện diện trực tuyến chuyên nghiệp, từng bước phát triển thương hiệu và nâng cao hiệu quả kinh doanh trên môi trường số.",
    },
    {
      id: "gia-tri",
      icon: "values" as AboutVisionBlockIcon,
      title: "Giá trị cốt lõi",
      body: "PML Vietnam lấy trải nghiệm người dùng làm trung tâm, không ngừng sáng tạo và đổi mới trong từng giải pháp. Chúng tôi đề cao sự trung thực, minh bạch và luôn nỗ lực hoàn thiện sản phẩm đúng với những gì đã cam kết cùng khách hàng.",
    },
    {
      id: "dinh-huong",
      icon: "growth" as AboutVisionBlockIcon,
      title: "Định hướng phát triển",
      body: "PML Vietnam hướng đến trở thành đơn vị cung cấp dịch vụ thiết kế và vận hành website tiên phong trong việc ứng dụng công nghệ hiện đại. Mục tiêu của chúng tôi là mang đến những giải pháp website hiệu quả, dễ mở rộng và có khả năng hỗ trợ doanh nghiệp vừa và nhỏ tiếp cận khách hàng, phát triển thương hiệu và thúc đẩy doanh số.",
    },
  ] satisfies AboutVisionBlock[],
};

/**
 * Section 1 — Hero (text trái + banner phải).
 * Ảnh 757×394 (`public/new-banner`); khung desktop cao bằng cột text, mobile giữ tỉ lệ gốc.
 */
export const heroContent = {
  eyebrow: "Thiết kế & vận hành website",
  headline: "Dịch vụ thiết kế website chuyên nghiệp, uy tín, chuẩn SEO",
  bullets: [
    "Thời gian triển khai 5–7 ngày",
    "Giao diện hiện đại & chuẩn SEO (PageSpeed >90 điểm)",
    "Hiển thị tốt trên mọi thiết bị",
    "Giao diện quản trị dễ sử dụng",
    "Sử dụng công nghệ hiện đại, bền vững",
  ],
  ctaLabel: "Đăng ký ngay",
  ctaHref: "/#lien-he",
  autoplayMs: 5000,
  banners: [
    {
      src: "/new-banner/pmlvietnam_banner_theo_yeu_cau.webp",
      alt: "Thiết kế website theo yêu cầu — PML Vietnam",
    },
    {
      src: "/new-banner/pmlvietnam_landing_page_university.webp",
      alt: "Thiết kế landing page — PML Vietnam",
    },
    {
      src: "/new-banner/pmlvietnam_banner_personal_branding.webp",
      alt: "Thiết kế nhận diện thương hiệu — PML Vietnam",
    },
    {
      src: "/new-banner/pmlvietnam_banner_cham_soc_website.webp",
      alt: "Dịch vụ chăm sóc website — PML Vietnam",
    },
  ],
};

/**
 * Section 2 — Quy trình 5 bước (icon + title blocks).
 * Icon lấy từ `public/process/icons/`.
 * Ảnh infographic chuyển sang `processImagesContent` / ProcessImagesSection.
 */
export type ProcessStepItem = {
  id: string;
  step: string;
  title: string;
  description: string;
  /** Path relative to /public */
  iconSrc: string;
};

export const processStepsContent = {
  heading: "Quy trình 5 bước",
  steps: [
    {
      id: "step-1",
      step: "Bước 1",
      title: "Tiếp nhận yêu cầu và tư vấn\ngiải pháp",
      description: "Lắng nghe nhu cầu, ngành nghề, chức năng cần thiết",
      iconSrc: "/process/icons/step-1-consult.png",
    },
    {
      id: "step-2",
      step: "Bước 2",
      title: "Lập kế hoạch và chốt phạm vi",
      description:
        "Xây dựng cấu trúc, tính năng, nội dung cần chuẩn bị, tiến độ",
      iconSrc: "/process/icons/step-2-plan.png",
    },
    {
      id: "step-3",
      step: "Bước 3",
      title: "Thiết kế và xây dựng website",
      description:
        "Thiết kế giao diện, màu sắc, hình ảnh, nội dung theo phạm vi đã chốt",
      iconSrc: "/process/icons/step-3-build.png",
    },
    {
      id: "step-4",
      step: "Bước 4",
      title: "Kiểm thử và tối ưu",
      description: "Kiểm tra website trước khi bàn giao",
      iconSrc: "/process/icons/step-4-test.png",
    },
    {
      id: "step-5",
      step: "Bước 5",
      title: "Nghiệm thu, bàn giao, vận hành",
      description:
        "Gửi website hoàn chỉnh cho khách, bàn giao tài khoản, hướng dẫn và hỗ trợ vận hành",
      iconSrc: "/process/icons/step-5-handover.png",
    },
  ] satisfies ProcessStepItem[],
};

/**
 * Section 3 — 5 nhóm ngành nổi bật (không phải 5 mẫu web đơn lẻ).
 * Layout bento: 1 card cao trái (featured) + 4 card nhỏ 2×2 bên phải.
 * Nguồn nhãn: docs/10-nhom-nganh.md (+ “Thương hiệu cá nhân” thuộc nhóm 10).
 * Click → trang `/san-pham` (lọc theo nhóm ngành).
 * Ảnh: `public/mau-website-noi-bat/{pc|mobile}/…` — pc từ `md`, mobile dưới `md`.
 */
export type SampleItem = {
  id: string;
  /** Tên nhóm ngành hiển thị trên card */
  title: string;
  category: string;
  /** Link tới catalog sản phẩm (có thể kèm hash nhóm ngành) */
  href: string;
  /** Ảnh desktop (`public/mau-website-noi-bat/pc`) */
  image: { src: string; alt: string };
  /** Ảnh mobile (`public/mau-website-noi-bat/mobile`) */
  imageMobile: { src: string; alt: string };
  /** Card cao full-height bên trái (chỉ 1 item) */
  featured?: boolean;
};

/** Ảnh mockup theo nhóm ngành — dùng chung section nổi bật + lưới tất cả mẫu. */
const INDUSTRY_GROUP_IMAGES: Partial<Record<string, string>> = {
  "dich-vu-thuong-mai":
    "/san-pham/dich-vu-thuong-mai/dich_vu_thuong_mai.webp",
  "ban-le-tmdt": encodeURI(
    "/Tat_ca_website/Bán lẻ_thương_mại_điện tử/cua-hang-thoi-trang.webp",
  ),
  "san-xuat-cong-nghiep": encodeURI(
    "/Tat_ca_website/Sản xuất công nghiệp/xuong-may-mac.webp",
  ),
  "xay-dung-bds": encodeURI(
    "/Tat_ca_website/Xây dựng bất động sản/dai-ly-bat-dong-san.webp",
  ),
  "giao-duc-dao-tao": encodeURI(
    "/Tat_ca_website/Giáo dục đào tạo/truong-mau-non-tieu-hoc-trung-hoc.webp",
  ),
  "y-te-suc-khoe": encodeURI(
    "/Tat_ca_website/Y tế sức khỏe/phong-kham-da-khoa.webp",
  ),
  "du-lich-khach-san": encodeURI(
    "/Tat_ca_website/Du lịch khách sạn/hotel-resort.webp",
  ),
  "luat-tai-chinh": encodeURI(
    "/Tat_ca_website/Luật tài chính/cty-luat-van-phong-luat-su.webp",
  ),
  "cong-nghe-dich-vu-so": encodeURI(
    "/Tat_ca_website/Công nghệ Dịch vụ số/cty-phan-mem.webp",
  ),
  "dich-vu-chuyen-nghiep": encodeURI(
    "/Tat_ca_website/Dịch vụ chuyên nghiệp/thuong-hieu-ca-nhan.webp",
  ),
};

/** Ảnh section “Mẫu website nổi bật” — `pc/` từ md, `mobile/` dưới md. */
const FEATURED_SAMPLE_IMAGES = {
  "dich-vu-thuong-mai": {
    pc: "/mau-website-noi-bat/pc/dich_vu_thuong_mai_pc.webp",
    mobile: "/mau-website-noi-bat/mobile/dich_vu_thuong_mai_mobile.webp",
  },
  "ban-le-tmdt": {
    pc: "/mau-website-noi-bat/pc/ban_le_thuong_mai_dien_tu_pc.webp",
    mobile: "/mau-website-noi-bat/mobile/ban_le_thuong_mai_dien_tu_mobile.webp",
  },
  "xay-dung-bds": {
    pc: "/mau-website-noi-bat/pc/xay_dung_bat_dong_san_pc.webp",
    mobile: "/mau-website-noi-bat/mobile/xay_dung_bat_dong_san_mobile.webp",
  },
  "du-lich-khach-san": {
    pc: "/mau-website-noi-bat/pc/du_lich_khach_san_pc.webp",
    mobile: "/mau-website-noi-bat/mobile/du_lich_khach_san_mobile.webp",
  },
  "thuong-hieu-ca-nhan": {
    pc: "/mau-website-noi-bat/pc/thuong_hieu_ca_nhan_pc.webp",
    mobile: "/mau-website-noi-bat/mobile/thuong_hieu_ca_nhan_mobile.webp",
  },
} as const;

function featuredSampleImage(
  key: keyof typeof FEATURED_SAMPLE_IMAGES,
  alt: string,
) {
  const { pc, mobile } = FEATURED_SAMPLE_IMAGES[key];
  return {
    image: { src: pc, alt },
    imageMobile: { src: mobile, alt },
  };
}

export const websiteSamplesContent: {
  heading: string;
  tagline: string;
  items: SampleItem[];
} = {
  heading: "Mẫu website nổi bật",
  tagline: "Giao diện hiện đại, chuẩn SEO, đa dạng lĩnh vực",
  /** Đúng 5 nhóm ngành: featured đứng đầu, 4 còn lại xếp 2×2 */
  items: [
    {
      id: "s1",
      title: "Dịch vụ & Thương mại",
      category: "Dịch vụ & Thương mại",
      href: "/san-pham#dich-vu-thuong-mai",
      ...featuredSampleImage(
        "dich-vu-thuong-mai",
        "Mẫu website nhóm Dịch vụ & Thương mại",
      ),
      featured: true,
    },
    {
      id: "s2",
      title: "Bán lẻ & Thương mại điện tử",
      category: "Bán lẻ & Thương mại điện tử",
      href: "/san-pham#ban-le-tmdt",
      ...featuredSampleImage(
        "ban-le-tmdt",
        "Mẫu website nhóm Bán lẻ & Thương mại điện tử",
      ),
    },
    {
      id: "s3",
      title: "Xây dựng & Bất động sản",
      category: "Xây dựng & Bất động sản",
      href: "/san-pham#xay-dung-bds",
      ...featuredSampleImage(
        "xay-dung-bds",
        "Mẫu website nhóm Xây dựng & Bất động sản",
      ),
    },
    {
      id: "s4",
      title: "Du lịch & Khách sạn",
      category: "Du lịch & Khách sạn",
      href: "/san-pham#du-lich-khach-san",
      ...featuredSampleImage(
        "du-lich-khach-san",
        "Mẫu website nhóm Du lịch & Khách sạn",
      ),
    },
    {
      id: "s5",
      title: "Thương hiệu cá nhân",
      category: "Dịch vụ chuyên nghiệp",
      href: "/san-pham#dich-vu-chuyen-nghiep",
      ...featuredSampleImage(
        "thuong-hieu-ca-nhan",
        "Mẫu website Thương hiệu cá nhân",
      ),
    },
  ] satisfies SampleItem[],
};

/**
 * Section 4 — Tất cả mẫu websites theo 10 nhóm ngành (docs/10-nhom-nganh.md).
 * Desktop: lưới 5 cột; hàng đủ 4 item = 1 wide (span 2) + 3 small (span 1).
 * Hàng cuối có thể 2 item (nhóm 9–10).
 * Carousel `<` `>` + auto next 4s khi >1 page.
 */
export type AllSampleSize = "wide" | "small";

export type AllSampleItem = {
  id: string;
  title: string;
  category: string;
  image: { src: string; alt: string };
  /** wide = span 2 cột; small = span 1 */
  size: AllSampleSize;
};

/** Mỗi hàng: 2–4 item; hàng đủ 4 thì đúng 1 item `wide` (tổng span = 5) */
export type AllSampleRow = AllSampleItem[];

const SAMPLE_IMAGE_SRC = [
  "/samples/sample-1.svg",
  "/samples/sample-2.svg",
  "/samples/sample-3.svg",
  "/samples/sample-4.svg",
  "/samples/sample-5.svg",
  "/samples/sample-6.svg",
  "/samples/sample-7.svg",
  "/samples/sample-8.svg",
] as const;

function industryGroupToSample(
  group: IndustryGroup,
  index: number,
  size: AllSampleSize,
): AllSampleItem {
  const src =
    INDUSTRY_GROUP_IMAGES[group.id] ??
    SAMPLE_IMAGE_SRC[index % SAMPLE_IMAGE_SRC.length];
  return {
    id: group.id,
    title: group.label,
    category: group.label,
    size,
    image: {
      src,
      alt: `Mẫu website ${group.label}`,
    },
  };
}

/** Chia 10 nhóm thành các hàng mosaic: 4 + 4 + 2 */
function buildIndustrySampleRows(groups: IndustryGroup[]): AllSampleRow[] {
  const chunkSizes = [4, 4, 2] as const;
  const rows: AllSampleRow[] = [];
  let offset = 0;

  for (const chunkSize of chunkSizes) {
    const slice = groups.slice(offset, offset + chunkSize);
    if (slice.length === 0) break;
    const wideIndex = 0;
    rows.push(
      slice.map((group, i) =>
        industryGroupToSample(
          group,
          offset + i,
          slice.length <= 2 || i === wideIndex ? "wide" : "small",
        ),
      ),
    );
    offset += chunkSize;
  }

  return rows;
}

export const allWebsiteSamplesContent = {
  heading: "Dịch vụ thiết kế website Chuyên Nghiệp - Chuẩn SEO",
  tagline: "Giao diện hiện đại, chuẩn SEO, đa dạng lĩnh vực",
  autoplayMs: 4000,
  /**
   * 1 page = 10 nhóm ngành (3 hàng: 4 + 4 + 2).
   * `size` trong data chỉ là fallback SSR — client sẽ random lại
   * vị trí item wide mỗi hàng khi mount.
   */
  pages: [buildIndustrySampleRows(industryGroups)] satisfies AllSampleRow[][],
};

/**
 * Trang `/san-pham` — catalog tất cả mẫu giao diện theo ngành nghề
 * (docs/10-nhom-nganh.md). Mỗi nghề = 1 mẫu; lọc theo nhóm ngành.
 */
export type ProductSampleItem = {
  id: string;
  title: string;
  /** Id nhóm ngành — dùng filter + hash `/san-pham#…` */
  groupId: string;
  groupLabel: string;
  image: { src: string; alt: string; width?: number; height?: number };
  /** URL xem thực tế — hiện nút "Xem thực tế" khi có */
  liveUrl?: string;
  /**
   * `true` (mặc định) = mẫu có sẵn, bàn giao 3–5 ngày.
   * `false` = thiết kế mới, 15–20 ngày tùy độ phức tạp.
   */
  isReadyTemplate?: boolean;
};

function slugifyOccupation(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Demo live theo nghề — bổ sung khi có site thật. */
const TEMPLATE_LIVE_DEMOS: Record<string, string> = {
  "Thực phẩm & Đồ uống": "https://luvini.vn",
};

const TEMPLATE_IMAGE_SIZE = { width: 1080, height: 720 } as const;

function templatePreview(folder: string, file: string) {
  return {
    src: encodeURI(`/Tat_ca_website/${folder}/${file}`),
    ...TEMPLATE_IMAGE_SIZE,
  };
}

/** Screenshot / thumbnail theo nghề — hover-scroll trên trang chi tiết. */
const TEMPLATE_PREVIEW_IMAGES: Record<
  string,
  { src: string; width: number; height: number }
> = {
  "Nhà hàng, quán ăn": {
    src: "/san-pham/dich-vu-thuong-mai/nha_hang_quan_an.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Quán cà phê, trà sữa": {
    src: "/san-pham/dich-vu-thuong-mai/quan_cafe_tra_sua.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Spa, thẩm mỹ viện": {
    src: "/san-pham/dich-vu-thuong-mai/spa_tham_my_vien.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Salon tóc, nail": {
    src: "/san-pham/dich-vu-thuong-mai/salon_toc_nail.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Dịch vụ giặt ủi": {
    src: "/san-pham/dich-vu-thuong-mai/dich_vu_giat_ui.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Trung tâm gym, yoga": {
    src: "/san-pham/dich-vu-thuong-mai/trung_tam_gym_yoga.webp",
    ...TEMPLATE_IMAGE_SIZE,
  },
  "Thực phẩm & Đồ uống": {
    src: "/san-pham/ban-le-&-tmdt/luvini.png",
    width: 1651,
    height: 4240,
  },
  "Cửa hàng thời trang": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-thoi-trang.webp",
  ),
  "Cửa hàng mỹ phẩm": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua_hang_my_pham.webp",
  ),
  "Cửa hàng thú cưng": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-thu-cung.webp",
  ),
  "Siêu thị mini, tạp hóa": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "sieu-thi-mini-tap-hoa.webp",
  ),
  "Cửa hàng hoa, cây cảnh": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-hoa-cay-canh.webp",
  ),
  "Cửa hàng đồ gia dụng": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-do-gia-dung.webp",
  ),
  "Cửa hàng thiết bị điện tử": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-thiet-bi-dien-tu.webp",
  ),
  "Cửa hàng điện máy": templatePreview(
    "Bán lẻ_thương_mại_điện tử",
    "cua-hang-dien-may.webp",
  ),
  "Xưởng may mặc": templatePreview(
    "Sản xuất công nghiệp",
    "xuong-may-mac.webp",
  ),
  "Nhà máy thực phẩm chế biến": templatePreview(
    "Sản xuất công nghiệp",
    "nha-may-thuc-pham-che-bien.webp",
  ),
  "Xưởng gỗ & nội thất": templatePreview(
    "Sản xuất công nghiệp",
    "xuong-go-nôi-that.webp",
  ),
  "Sản xuất bao bì, in ấn": templatePreview(
    "Sản xuất công nghiệp",
    "san-xuat-bao-bi-in-an.webp",
  ),
  "Cơ khí, kim loại": templatePreview(
    "Sản xuất công nghiệp",
    "co-khi-kim-loai.webp",
  ),
  "Công ty xây dựng, thiết kế nội thất": templatePreview(
    "Xây dựng bất động sản",
    "cty-xay-dung-thiet-ke-noi-that.webp",
  ),
  "Đại lý bất động sản": templatePreview(
    "Xây dựng bất động sản",
    "dai-ly-bat-dong-san.webp",
  ),
  "Dự án khu đô thị, căn hộ": templatePreview(
    "Xây dựng bất động sản",
    "du-an-khu-do-thi-can-ho.webp",
  ),
  "Cho thuê văn phòng, nhà ở": templatePreview(
    "Xây dựng bất động sản",
    "cho-thue-van-phong-nha-o.webp",
  ),
  "Trường mầm non, tiểu học, trung học": templatePreview(
    "Giáo dục đào tạo",
    "truong-mau-non-tieu-hoc-trung-hoc.webp",
  ),
  "Trung tâm ngoại ngữ": templatePreview(
    "Giáo dục đào tạo",
    "trung-tam-ngoai-ngu.webp",
  ),
  "Trung tâm đào tạo kỹ năng": templatePreview(
    "Giáo dục đào tạo",
    "trung-tam-dao-tao-ky-nang.webp",
  ),
  "Gia sư, dạy kèm": templatePreview(
    "Giáo dục đào tạo",
    "gia-su-day-kem.webp",
  ),
  "Phòng khám đa khoa": templatePreview(
    "Y tế sức khỏe",
    "phong-kham-da-khoa.webp",
  ),
  "Nhà thuốc, dược phẩm": templatePreview(
    "Y tế sức khỏe",
    "nha-thuoc-duoc-pham.webp",
  ),
  "Thiết bị y tế": templatePreview("Y tế sức khỏe", "thiet-bi-y-te.webp"),
  "Trung tâm vật lý trị liệu": templatePreview(
    "Y tế sức khỏe",
    "trung-tam-tam-ly-tri-lieu.webp",
  ),
  "Công ty du lịch, lữ hành": templatePreview(
    "Du lịch khách sạn",
    "du-lich-lu-hanh.webp",
  ),
  "Khách sạn, resort": templatePreview(
    "Du lịch khách sạn",
    "hotel-resort.webp",
  ),
  "Homestay, căn hộ dịch vụ": templatePreview(
    "Du lịch khách sạn",
    "homestay-can-ho-dich-vu.webp",
  ),
  "Địa điểm vui chơi, giải trí": templatePreview(
    "Du lịch khách sạn",
    "dia-chi-vui-choi-giai-tri.webp",
  ),
  "Công ty luật, văn phòng luật sư": templatePreview(
    "Luật tài chính",
    "cty-luat-van-phong-luat-su.webp",
  ),
  "Tư vấn tài chính, đầu tư": templatePreview(
    "Luật tài chính",
    "tu-van-tai-chinh-dau-tu.webp",
  ),
  "Bảo hiểm": templatePreview("Luật tài chính", "bao-hiem.webp"),
  "Kế toán, thuế": templatePreview("Luật tài chính", "ke-toan-thue.webp"),
  "Công ty phần mềm": templatePreview(
    "Công nghệ Dịch vụ số",
    "cty-phan-mem.webp",
  ),
  "Dịch vụ IT": templatePreview("Công nghệ Dịch vụ số", "dich-vu-it.webp"),
  "Marketing số": templatePreview(
    "Công nghệ Dịch vụ số",
    "marketing-so.webp",
  ),
  "AI và tự động hóa": templatePreview(
    "Công nghệ Dịch vụ số",
    "ai-tu-dong-hoa.webp",
  ),
  "Thương hiệu cá nhân": templatePreview(
    "Dịch vụ chuyên nghiệp",
    "thuong-hieu-ca-nhan.webp",
  ),
};

function buildProductSamples(groups: IndustryGroup[]): ProductSampleItem[] {
  const items: ProductSampleItem[] = [];
  let imageIndex = 0;

  for (const group of groups) {
    for (const occupation of group.occupations) {
      const preview = TEMPLATE_PREVIEW_IMAGES[occupation];
      const src =
        preview?.src ?? SAMPLE_IMAGE_SRC[imageIndex % SAMPLE_IMAGE_SRC.length];
      imageIndex += 1;
      items.push({
        id: `${group.id}-${slugifyOccupation(occupation)}`,
        title: occupation,
        groupId: group.id,
        groupLabel: group.label,
        liveUrl: TEMPLATE_LIVE_DEMOS[occupation],
        isReadyTemplate: true,
        image: {
          src,
          alt: `Mẫu website ${occupation}`,
          width: preview?.width,
          height: preview?.height,
        },
      });
    }
  }

  return items;
}

export const productsPageContent = {
  heading: "Mẫu giao diện website",
  tagline: "Đa dạng ngành nghề - chọn mẫu phù hợp và đăng ký triển khai",
  /** Dòng phụ trên banner — ngắn để vừa khung 1920×500. */
  description:
    "Giao diện hiện đại, chuẩn SEO, dễ vận hành. Chọn mẫu sẵn, bàn giao trong 3-5 ngày.",
  highlights: ["10 nhóm ngành", "Chuẩn SEO", "Bàn giao 3-5 ngày"],
  banner: {
    src: "/san-pham/banner/banner.webp",
    alt: "Mẫu giao diện website PML Vietnam trên nền cam thương hiệu",
    /** Ảnh gốc 1920×500 — aspect lock trên desktop, catalog còn trong viewport. */
    width: 1920,
    height: 500,
  },
  /** Banner mobile riêng — `/mau-giao-dien/baner_mau_giao_dien_mobile.webp` (768×768). */
  bannerMobile: {
    src: "/mau-giao-dien/baner_mau_giao_dien_mobile.webp",
    alt: "Mẫu giao diện website PML Vietnam trên nền cam thương hiệu",
    width: 768,
    height: 768,
  },
  allFilterLabel: "Tất cả",
  emptyFilterMessage: "Chưa có mẫu trong nhóm ngành này.",
  registerHint: "Chọn mẫu để xem chi tiết và đăng ký triển khai",
  filters: industryGroups.map((group) => ({
    id: group.id,
    label: group.label,
  })),
  items: buildProductSamples(industryGroups),
};

export type TemplateFeatureIcon =
  | "devices"
  | "seo"
  | "admin"
  | "speed";

/**
 * Trang chi tiết mẫu `/san-pham/[slug]` (ref web4s.vn/thoitrang09).
 * Trái: preview + "Xem thực tế". Phải: 2 form viền cam (ref card luvini.vn).
 *
 * Tốc độ tải: ghi "dưới 2 giây" — ngưỡng LCP tốt của Google là < 2.5s;
 * "dưới 1 giây" trên mobile 4G không ổn định nên không dùng cho copy marketing.
 */
export const templateDetailContent = {
  liveViewLabel: "Xem thực tế",
  /** Fallback demo khi mẫu chưa có liveUrl riêng — swap khi có site thật */
  liveViewFallbackUrl: "https://luvini.vn/",
  consultLabel: "Đăng ký tư vấn",
  similarHeading: "Mẫu website tương tự",
  breadcrumbHome: "Trang chủ",
  breadcrumbCatalog: "Mẫu giao diện",
  form1TitlePrefix: "Mẫu Website",
  features: [
    {
      icon: "devices" as const,
      label: "Hiển thị tốt trên mọi thiết bị",
    },
    {
      icon: "seo" as const,
      label: "Giao diện hiện đại, chuẩn SEO",
    },
    {
      icon: "admin" as const,
      label: "Giao diện quản trị dễ sử dụng",
    },
    {
      icon: "speed" as const,
      label: "Tốc độ tải trang dưới 3 giây",
    },
  ] satisfies Array<{ icon: TemplateFeatureIcon; label: string }>,
  benefitsTitle: "Quyền lợi khi sở hữu website tại PML Vietnam",
  readyHandover: "Thời gian bàn giao: 3–5 ngày",
  customHandover: "Thời gian bàn giao: 15–20 ngày (tùy độ phức tạp)",
  benefits: [
    "Bảo hành trọn đời website",
    "Bàn giao đầy đủ mã nguồn website",
    "Tặng thêm ngôn ngữ tiếng Anh",
    "Tặng SSL/HTTPS bảo mật",
    // "Tặng gói gửi email: tối đa 20 mail/ngày đến địa chỉ email cá nhân",
    "Tặng thiết kế Hero Banner (số lượng tùy theo gói)",
    "Hỗ trợ nhập bài viết/sản phẩm (số lượng tùy theo gói)",
    "Mã nguồn sử dụng: Next.js, Tailwind CSS, Headless CMS",
  ],
};

export function productSampleHref(item: Pick<ProductSampleItem, "id">) {
  return `/san-pham/${item.id}`;
}

export function getProductSampleById(
  id: string,
): ProductSampleItem | undefined {
  return productsPageContent.items.find((item) => item.id === id);
}

export function getRelatedProductSamples(
  item: ProductSampleItem,
  limit = 8,
): ProductSampleItem[] {
  const sameGroup = productsPageContent.items.filter(
    (candidate) =>
      candidate.groupId === item.groupId && candidate.id !== item.id,
  );
  if (sameGroup.length >= limit) return sameGroup.slice(0, limit);

  const others = productsPageContent.items.filter(
    (candidate) =>
      candidate.id !== item.id && candidate.groupId !== item.groupId,
  );
  return [...sameGroup, ...others].slice(0, limit);
}

/**
 * Task 4 — Tin tức / Sự kiện mới nhất.
 * Carousel trang chủ: 5 item/hàng. Listing đầy đủ tại `/tin-tuc`.
 * Chi tiết bài viết tại `/tin-tuc/[slug]` khi có nội dung trong `newsArticles`.
 * Item chưa có bài chi tiết vẫn giữ trong `items`; site chỉ hiện `publishedNewsItems`.
 * TODO: thay title/excerpt/date/image bằng bài thật khi có CMS / content.
 */
export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  /** Đường dẫn — `/tin-tuc/[slug]` nếu đã có bài, `/tin-tuc` nếu chưa. */
  href: string;
  category: string;
  image: { src: string; alt: string };
};

/** Slug bài viết đầy đủ đầu tiên (docx PML). */
export const NEWS_ARTICLE_SLUG_TRENDS_2026 =
  "xu-huong-thiet-ke-website-doanh-nghiep-2026" as const;

/** Slug bài viết SEO (`public/tin-tuc/vi-sao`). */
export const NEWS_ARTICLE_SLUG_SEO =
  "vi-sao-website-chuan-seo-giup-tang-khach-hang-tiem-nang" as const;

export function newsArticleHref(slug: string) {
  return `/tin-tuc/${slug}`;
}

export const newsContent = {
  heading: "Tin tức / Sự kiện mới nhất",
  tagline: "Cập nhật xu hướng thiết kế web, SEO và vận hành số",
  /** Auto-next carousel (ms) — cùng pattern slider mẫu website */
  autoplayMs: 4000,
  /** Số tin / hàng (desktop) */
  itemsPerRow: 5 as const,
  items: [
    {
      id: "news-1",
      title: "5 xu hướng thiết kế website doanh nghiệp năm 2026",
      excerpt:
        "Website không chỉ là kênh thông tin — năm 2026 là lúc doanh nghiệp cần chiến lược thiết kế website giới thiệu bài bản.",
      date: "28/08/2026",
      href: newsArticleHref(NEWS_ARTICLE_SLUG_TRENDS_2026),
      category: "Xu hướng",
      image: {
        src: "/tin-tuc/website_doanh_nghiep_pml.webp",
        alt: "Xu hướng thiết kế website giới thiệu doanh nghiệp 2026",
      },
    },
    {
      id: "news-2",
      title: "Vì sao website chuẩn SEO giúp tăng khách hàng tiềm năng",
      excerpt:
        "Website đẹp chưa đủ nếu khách hàng không tìm thấy bạn trên Google. Chuẩn SEO giúp doanh nghiệp xuất hiện đúng lúc khách đang có nhu cầu.",
      date: "28/07/2026",
      href: newsArticleHref(NEWS_ARTICLE_SLUG_SEO),
      category: "SEO",
      image: {
        src: "/tin-tuc/vi-sao/thumbnail-tin-tuc-chuan-seo.webp",
        alt: "Vì sao website chuẩn SEO giúp khách hàng dễ tìm thấy doanh nghiệp",
      },
    },
    {
      id: "news-3",
      title: "Checklist bàn giao website cho đội vận hành nội bộ",
      excerpt:
        "TODO: Tóm tắt ngắn — tài khoản, hướng dẫn CMS và quy trình bảo trì.",
      date: "22/07/2026",
      href: "/tin-tuc",
      category: "Vận hành",
      image: {
        src: "/samples/sample-3.svg",
        alt: "Minh họa checklist bàn giao website",
      },
    },
    {
      id: "news-4",
      title: "Landing page bán hàng: bố cục chuyển đổi tốt nhất",
      excerpt:
        "TODO: Tóm tắt ngắn — hero rõ ràng, CTA nổi bật và social proof.",
      date: "15/07/2026",
      href: "/tin-tuc",
      category: "Landing page",
      image: {
        src: "/samples/sample-4.svg",
        alt: "Minh họa tin tức landing page",
      },
    },
    {
      id: "news-5",
      title: "PML Vietnam đồng hành cùng shop Luvini & Co nâng cấp website",
      excerpt:
        "TODO: Tóm tắt ngắn — case study thiết kế theo ngành thời trang.",
      date: "08/07/2026",
      href: "/tin-tuc",
      category: "Dự án",
      image: {
        src: "/samples/sample-5.svg",
        alt: "Minh họa case study dự án PML Vietnam",
      },
    },
    {
      id: "news-6",
      title: "Giao diện quản trị dễ dùng: tiêu chí chọn nền tảng website",
      excerpt:
        "TODO: Tóm tắt ngắn — cập nhật nội dung nhanh, phân quyền và bảo mật.",
      date: "01/07/2026",
      href: "/tin-tuc",
      category: "Công nghệ",
      image: {
        src: "/samples/sample-6.svg",
        alt: "Minh họa giao diện quản trị website",
      },
    },
    {
      id: "news-7",
      title: "Sự kiện: Workshop tối ưu trải nghiệm người dùng trên web",
      excerpt:
        "TODO: Tóm tắt ngắn — chia sẻ thực tế UX/UI cho doanh nghiệp vừa và nhỏ.",
      date: "24/06/2026",
      href: "/tin-tuc",
      category: "Sự kiện",
      image: {
        src: "/samples/sample-7.svg",
        alt: "Minh họa sự kiện workshop UX",
      },
    },
    {
      id: "news-8",
      title: "Thiết kế web F&B: ảnh món ăn và đặt bàn online hiệu quả",
      excerpt:
        "TODO: Tóm tắt ngắn — gallery, menu số và tích hợp đặt chỗ.",
      date: "18/06/2026",
      href: "/tin-tuc",
      category: "Ngành nghề",
      image: {
        src: "/samples/sample-8.svg",
        alt: "Minh họa website ngành F&B",
      },
    },
    {
      id: "news-9",
      title: "Bảo mật thông tin khách hàng trên website doanh nghiệp",
      excerpt:
        "TODO: Tóm tắt ngắn — HTTPS, form liên hệ an toàn và chính sách dữ liệu.",
      date: "10/06/2026",
      href: "/tin-tuc",
      category: "Bảo mật",
      image: {
        src: "/samples/sample-1.svg",
        alt: "Minh họa bảo mật website",
      },
    },
    {
      id: "news-10",
      title: "Lịch bảo trì website định kỳ giúp giảm rủi ro downtime",
      excerpt:
        "TODO: Tóm tắt ngắn — backup, cập nhật plugin và giám sát tốc độ.",
      date: "02/06/2026",
      href: "/tin-tuc",
      category: "Bảo trì",
      image: {
        src: "/samples/sample-2.svg",
        alt: "Minh họa bảo trì website",
      },
    },
  ] satisfies NewsItem[],
};

/**
 * Trang listing `/tin-tuc` — danh sách tin hiện có (ref catalog `/san-pham`).
 */
export const newsPageContent = {
  heading: "Tin tức",
  description:
    "Cập nhật xu hướng thiết kế web, SEO và vận hành số từ PML Vietnam.",
  breadcrumbHome: "Trang chủ",
  breadcrumbCurrent: "Tin tức",
  banner: {
    src: "/tin-tuc/banner_tin_tuc.webp",
    alt: "Banner trang tin tức PML Vietnam",
  },
};

/**
 * Bài viết chi tiết tại `/tin-tuc/[slug]`.
 * Nguồn: `public/tin-tuc/PML Vietnam_Tin tức.docx`, `public/tin-tuc/vi-sao`.
 */
export type NewsArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "tagline"; text: string };

export type NewsArticle = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  banner: {
    src: string;
    alt: string;
    badge: string;
    publishedAt: string;
    publishedAtIso: string;
  };
  blocks: NewsArticleBlock[];
};

export const newsArticles: NewsArticle[] = [
  {
  slug: NEWS_ARTICLE_SLUG_TRENDS_2026,
  meta: {
    title:
      "Xu hướng thiết kế website giới thiệu doanh nghiệp 2026: Chuyển đổi số cùng PML Vietnam",
    description:
      "Năm 2026 hứa hẹn nhiều thay đổi đột phá trong thiết kế website giới thiệu doanh nghiệp. PML Vietnam đồng hành chuyển đổi số với giải pháp hiện đại, tối ưu hiệu suất.",
  },
  banner: {
    src: "/tin-tuc/banner_tin_tuc.webp",
    alt: "Banner tin tức — xu hướng thiết kế website doanh nghiệp 2026",
    badge: "Xu hướng",
    publishedAt: "10:14 - 28/08/2026",
    publishedAtIso: "2026-08-28T10:14:00+07:00",
  },
  blocks: [
    {
      type: "paragraph",
      text: "Trong bối cảnh kinh doanh ngày càng số hóa, một website không chỉ là một kênh thông tin mà còn là bộ mặt, là trung tâm tương tác của doanh nghiệp với khách hàng. Đặc biệt, năm 2026 hứa hẹn nhiều thay đổi đột phá, đòi hỏi doanh nghiệp phải có một chiến lược thiết kế website giới thiệu doanh nghiệp bài bản và cập nhật xu hướng.",
    },
    {
      type: "image",
      src: "/tin-tuc/website_doanh_nghiep_pml.webp",
      alt: "Thiết kế website giới thiệu doanh nghiệp hiện đại",
    },
    {
      type: "heading",
      level: 2,
      text: "Tại sao thiết kế website giới thiệu doanh nghiệp là ưu tiên hàng đầu trong năm 2026?",
    },
    {
      type: "paragraph",
      text: "Website chính là cửa ngõ đầu tiên mà khách hàng tiềm năng tiếp cận doanh nghiệp trong kỷ nguyên số. Đầu tư vào thiết kế website giới thiệu doanh nghiệp không chỉ là một lựa chọn mà là một yếu tố sống còn để duy trì và phát triển sự cạnh tranh.",
    },
    {
      type: "heading",
      level: 3,
      text: "Nâng tầm thương hiệu và uy tín",
    },
    {
      type: "paragraph",
      text: "Một website được thiết kế website giới thiệu doanh nghiệp chuyên nghiệp, với giao diện hiện đại, nội dung mạch lạc và hình ảnh sắc nét, sẽ ngay lập tức tạo dựng ấn tượng về một doanh nghiệp uy tín và đáng tin cậy. Đây là nơi bạn có thể thể hiện rõ ràng tầm nhìn, sứ mệnh, giá trị cốt lõi và câu chuyện thương hiệu của mình, giúp khách hàng hiểu rõ hơn về doanh nghiệp bạn.",
    },
    {
      type: "image",
      src: "/tin-tuc/website_doanh_nghiep_pml_1.webp",
      alt: "Website chuyên nghiệp nâng tầm thương hiệu doanh nghiệp",
    },
    {
      type: "heading",
      level: 3,
      text: "Tiếp cận khách hàng không giới hạn",
    },
    {
      type: "paragraph",
      text: "Không giống như các kênh truyền thống bị giới hạn về không gian và thời gian, website hoạt động 24/7, không biên giới. Điều này cho phép doanh nghiệp tiếp cận một lượng lớn khách hàng tiềm năng mọi lúc, mọi nơi, mở rộng thị trường và cơ hội kinh doanh. Một dịch vụ thiết kế website giới thiệu doanh nghiệp chất lượng sẽ đảm bảo khả năng hiển thị tốt trên các công cụ tìm kiếm, thu hút thêm lưu lượng truy cập.",
    },
    {
      type: "heading",
      level: 3,
      text: "Kênh thông tin chính thức và tin cậy",
    },
    {
      type: "paragraph",
      text: "Website là nguồn thông tin chính thức và cập nhật nhất về doanh nghiệp, sản phẩm, dịch vụ, tin tức và các hoạt động khác. Khách hàng có thể dễ dàng tìm thấy những gì họ cần mà không cần phải liên hệ trực tiếp, tiết kiệm thời gian cho cả hai bên. Thông qua việc thiết kế website giới thiệu doanh nghiệp, bạn kiểm soát hoàn toàn thông điệp truyền tải.",
    },
    {
      type: "image",
      src: "/tin-tuc/website_doanh_nghiep_pml_2.webp",
      alt: "Website là kênh thông tin chính thức của doanh nghiệp",
    },
    {
      type: "heading",
      level: 3,
      text: "Công cụ hỗ trợ kinh doanh và bán hàng",
    },
    {
      type: "paragraph",
      text: "Ngoài việc giới thiệu, website còn có thể tích hợp các tính năng hỗ trợ kinh doanh như biểu mẫu liên hệ, tư vấn trực tuyến, tích hợp cửa hàng trực tuyến (e-commerce), cổng thanh toán, v.v. Điều này không chỉ giúp tối ưu hóa quy trình bán hàng mà còn nâng cao trải nghiệm khách hàng.",
    },
    {
      type: "heading",
      level: 3,
      text: "Tối ưu chi phí marketing",
    },
    {
      type: "paragraph",
      text: "So với các hình thức quảng cáo truyền thống, sở hữu một website giúp doanh nghiệp tối ưu hóa chi phí marketing về lâu dài. Website là nền tảng cốt lõi cho mọi chiến dịch marketing số (SEO, SEM, Social Media, Email Marketing,….), mang lại hiệu quả bền vững và có thể đo lường được.",
    },
    {
      type: "heading",
      level: 2,
      text: "Các xu hướng nổi bật trong thiết kế website giới thiệu doanh nghiệp năm 2026",
    },
    {
      type: "paragraph",
      text: "Để website của bạn không bị lỗi thời và phát huy tối đa hiệu quả, việc nắm bắt các xu hướng thiết kế website giới thiệu doanh nghiệp mới nhất là vô cùng quan trọng.",
    },
    {
      type: "heading",
      level: 3,
      text: "Thiết kế mobile-first và responsive",
    },
    {
      type: "paragraph",
      text: "Với lượng người dùng di động ngày càng tăng, việc thiết kế ưu tiên trải nghiệm trên điện thoại thông minh (mobile-first) và có khả năng thích ứng linh hoạt trên mọi thiết bị (responsive design) là điều bắt buộc. Website cần hiển thị hoàn hảo trên mọi kích thước màn hình, đảm bảo trải nghiệm người dùng liền mạch.",
    },
    {
      type: "heading",
      level: 3,
      text: "Trải nghiệm người dùng (UX) và giao diện (UI) tối ưu",
    },
    {
      type: "paragraph",
      text: "UX/UI là yếu tố then chốt quyết định sự thành công của website. Một website có UX tốt phải dễ điều hướng, tốc độ tải nhanh, nội dung dễ đọc và hình ảnh hấp dẫn. UI cần trực quan, nhất quán với nhận diện thương hiệu và mang lại cảm giác dễ chịu cho người dùng.",
    },
    {
      type: "heading",
      level: 3,
      text: "Tích hợp trí tuệ nhân tạo (AI) và chatbot",
    },
    {
      type: "paragraph",
      text: "AI và chatbot sẽ tiếp tục là xu hướng mạnh mẽ, giúp cá nhân hóa trải nghiệm khách hàng, cung cấp hỗ trợ 24/7, trả lời câu hỏi, hướng dẫn tìm kiếm và thậm chí là đề xuất sản phẩm/dịch vụ phù hợp, giảm tải cho đội ngũ hỗ trợ.",
    },
    {
      type: "image",
      src: "/tin-tuc/website_doanh_nghiep_pml_3.webp",
      alt: "Tích hợp AI và chatbot trên website doanh nghiệp",
    },
    {
      type: "heading",
      level: 3,
      text: "Nội dung tương tác và đa phương tiện",
    },
    {
      type: "paragraph",
      text: "Nội dung không chỉ dừng lại ở văn bản. Video, hình ảnh động, infographics, 3D modelling và các yếu tố tương tác khác sẽ giúp thu hút sự chú ý, truyền tải thông điệp hiệu quả hơn và giữ chân người dùng lâu hơn trên website.",
    },
    {
      type: "heading",
      level: 3,
      text: "Tối ưu hóa hiệu suất và tốc độ tải trang",
    },
    {
      type: "paragraph",
      text: "Trong thời đại mà sự kiên nhẫn của người dùng ngày càng giảm, tốc độ tải trang là cực kỳ quan trọng. Một website chậm sẽ khiến khách hàng rời đi. Doanh nghiệp cần đảm bảo website được tối ưu hóa về hình ảnh, mã nguồn và sử dụng hosting chất lượng cao. Đây là một tiêu chí quan trọng khi lựa chọn đơn vị cung cấp giải pháp thiết kế website giới thiệu doanh nghiệp.",
    },
    {
      type: "heading",
      level: 3,
      text: "Bảo mật và quyền riêng tư dữ liệu",
    },
    {
      type: "paragraph",
      text: "Với những lo ngại ngày càng tăng về an ninh mạng và quyền riêng tư, website cần được trang bị chứng chỉ SSL, các biện pháp bảo mật mạnh mẽ và tuân thủ các quy định về bảo vệ dữ liệu. Sự tin cậy là yếu tố then chốt để xây dựng mối quan hệ với khách hàng.",
    },
    {
      type: "heading",
      level: 3,
      text: "Cá nhân hóa trải nghiệm người dùng",
    },
    {
      type: "paragraph",
      text: "Tương lai của web là cá nhân hóa. Website có khả năng ghi nhớ hành vi người dùng, đề xuất nội dung hoặc sản phẩm phù hợp, tạo ra trải nghiệm độc đáo cho từng cá nhân, từ đó tăng tỷ lệ chuyển đổi và lòng trung thành của khách hàng.",
    },
    {
      type: "heading",
      level: 2,
      text: "Kết luận",
    },
    {
      type: "paragraph",
      text: "Năm 2026 là thời điểm vàng để doanh nghiệp tăng tốc chuyển đổi số, và một website chuyên nghiệp là nền tảng không thể thiếu. Việc đầu tư vào thiết kế website giới thiệu doanh nghiệp không chỉ là một khoản chi mà là một khoản đầu tư chiến lược mang lại lợi nhuận lâu dài. PML Vietnam giúp bạn có một giải pháp thiết kế website giới thiệu doanh nghiệp không chỉ đẹp về giao diện, mạnh mẽ về tính năng mà còn được tối ưu hóa cho hiệu suất và tương lai.",
    },
    {
      type: "image",
      src: "/tin-tuc/website_doanh_nghiep_pml_4.webp",
      alt: "PML Vietnam — giải pháp website hiện đại cho doanh nghiệp",
    },
    {
      type: "tagline",
      text: "PML Vietnam - Cung cấp giải pháp website hiện đại cho cá nhân, hộ kinh doanh và doanh nghiệp.",
    },
  ] satisfies NewsArticleBlock[],
  },
  {
    slug: NEWS_ARTICLE_SLUG_SEO,
    meta: {
      title:
        "Vì sao website chuẩn SEO giúp khách hàng dễ tìm thấy doanh nghiệp của bạn?",
      description:
        "Website đẹp chưa đủ nếu khách hàng không tìm thấy bạn trên Google. Tìm hiểu vì sao website chuẩn SEO giúp doanh nghiệp xuất hiện đúng lúc khách đang có nhu cầu.",
    },
    banner: {
      src: "/tin-tuc/banner_tin_tuc.webp",
      alt: "Banner tin tức - vì sao website chuẩn SEO giúp tăng khách hàng tiềm năng",
      badge: "SEO",
      publishedAt: "10:14 - 28/07/2026",
      publishedAtIso: "2026-07-28T10:14:00+07:00",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Bạn đã có một website đẹp, đầy đủ thông tin về sản phẩm và dịch vụ nhưng có một câu hỏi quan trọng là: khách hàng có dễ dàng tìm thấy bạn khi họ đang cần sản phẩm hoặc dịch vụ của bạn không?",
      },
      {
        type: "paragraph",
        text: "Hãy thử hình dung một tình huống rất đơn giản. Một khách hàng đang cần thiết kế website cho doanh nghiệp, họ mở Google và tìm kiếm \"thiết kế website chuyên nghiệp\".",
      },
      {
        type: "paragraph",
        text: "Nếu website của bạn xuất hiện ở những vị trí đầu tiên, khách hàng có thể bấm vào, xem dịch vụ, tham khảo sản phẩm và liên hệ với bạn. Nhưng nếu website nằm ở trang 5, trang 10 hoặc thậm chí Google không hiểu rõ website của bạn đang cung cấp dịch vụ gì, khách hàng gần như sẽ không nhìn thấy bạn.",
      },
      {
        type: "paragraph",
        text: "Đó chính là lý do website chuẩn SEO quan trọng. SEO không chỉ là câu chuyện dành cho lập trình viên hay chuyên gia marketing. Hiểu đơn giản, SEO giúp website của bạn được Google hiểu rõ hơn và giúp khách hàng dễ tìm thấy bạn hơn.",
      },
      {
        type: "image",
        src: "/tin-tuc/vi-sao/tin-tuc-website-chuan-seo.webp",
        alt: "Search engine optimization giúp khách hàng tìm thấy website doanh nghiệp",
      },
      {
        type: "heading",
        level: 2,
        text: "1. Khách hàng tìm kiếm - website của bạn có xuất hiện không?",
      },
      {
        type: "paragraph",
        text: "Ngày nay, trước khi mua một sản phẩm hoặc sử dụng một dịch vụ, rất nhiều người có thói quen lên Google tìm kiếm. Ví dụ: \"thiết kế website giá bao nhiêu?\", \"thiết kế logo bao nhiêu tiền?\", \"thiết kế website theo yêu cầu?\", \"giá chăm sóc website\", \"thiết kế website gần Tân Bình, uy tín?\".",
      },
      {
        type: "paragraph",
        text: "Người tìm kiếm những từ khóa này thường đã có nhu cầu thật. Nếu website của bạn xuất hiện đúng lúc họ đang tìm kiếm, bạn có cơ hội tiếp cận một khách hàng đang quan tâm đến sản phẩm hoặc dịch vụ của mình. Ngược lại, nếu website không xuất hiện hoặc xuất hiện quá xa, khách hàng sẽ tìm đến một doanh nghiệp khác.",
      },
      {
        type: "paragraph",
        text: "Vì vậy, một website đẹp nhưng khó được tìm thấy cũng giống như một cửa hàng được trang trí rất đẹp nhưng nằm ở nơi khách hàng không biết đến.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Website đẹp chưa chắc đã mang lại khách hàng",
      },
      {
        type: "paragraph",
        text: "Nhiều doanh nghiệp khi làm website thường quan tâm trước tiên đến giao diện: \"Website phải đẹp.\" Điều đó hoàn toàn đúng, nhưng một website hiệu quả cần nhiều hơn thế. Khách hàng cần: Tìm thấy, hiểu, tin tưởng, liên hệ, rồi mới mua hàng.",
      },
      {
        type: "paragraph",
        text: "Nếu website chỉ đẹp mà khách hàng không tìm thấy thì website chưa phát huy được hết giá trị. Ví dụ, bạn có một showroom rất đẹp, sản phẩm tốt và nhân viên tư vấn chuyên nghiệp. Nhưng nếu không có biển hiệu, không có địa chỉ rõ ràng và khách hàng không biết showroom nằm ở đâu thì việc có một cửa hàng đẹp cũng không giúp bạn bán được nhiều hàng. Website cũng tương tự. SEO chính là một phần giúp khách hàng tìm được \"cửa hàng\" của bạn trên Google.",
      },
      {
        type: "image",
        src: "/tin-tuc/vi-sao/tin-tuc-seo-khach-hang-can.webp",
        alt: "Hành trình khách hàng từ tìm thấy, hiểu, tin tưởng, liên hệ đến mua hàng",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Website chuẩn SEO giúp Google hiểu bạn đang bán gì",
      },
      {
        type: "paragraph",
        text: "Google phải xử lý hàng triệu website mỗi ngày. Muốn đưa một website đến đúng người tìm kiếm, Google cần hiểu website này nói về lĩnh vực gì, doanh nghiệp đang cung cấp sản phẩm hoặc dịch vụ nào, nội dung nào quan trọng, trang nào trả lời tốt câu hỏi của khách hàng, và website có dễ sử dụng hay không.",
      },
      {
        type: "paragraph",
        text: "Một website được xây dựng tốt sẽ giúp Google dễ hiểu những thông tin này hơn. Ví dụ, nếu bạn kinh doanh dịch vụ thiết kế website, website nên thể hiện rõ: bạn là ai, bạn cung cấp dịch vụ gì, dành cho ai, bạn giải quyết vấn đề gì, và khách hàng có thể liên hệ như thế nào. Khi nội dung được tổ chức rõ ràng, cả Google và khách hàng đều dễ hiểu website của bạn hơn.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Khách hàng ở lại lâu hơn khi website dễ sử dụng",
      },
      {
        type: "paragraph",
        text: "Bạn có bao giờ bấm vào một website rồi thoát ngay vì trang tải quá lâu? Hoặc trên điện thoại chữ quá nhỏ, hình ảnh bị lệch, nút liên hệ khó tìm? Đây là những trải nghiệm khiến khách hàng nhanh chóng rời khỏi website.",
      },
      {
        type: "paragraph",
        text: "Một website chuẩn SEO không chỉ quan tâm đến việc Google có tìm thấy website hay không, mà còn quan tâm đến trải nghiệm của người truy cập. Ví dụ: website tải nhanh, hiển thị tốt trên điện thoại, nội dung dễ đọc, hình ảnh phù hợp, menu dễ sử dụng, thông tin liên hệ rõ ràng, nút gọi điện, đăng ký hoặc gửi yêu cầu dễ tìm.",
      },
      {
        type: "paragraph",
        text: "Hãy tưởng tượng bạn bước vào một cửa hàng. Nếu mọi thứ được sắp xếp rõ ràng, nhân viên dễ tìm, sản phẩm dễ xem và thanh toán thuận tiện, bạn sẽ có xu hướng ở lại lâu hơn. Website cũng vậy. Trải nghiệm tốt giúp khách hàng dễ tiếp tục tìm hiểu và thực hiện hành động hơn.",
      },
      {
        type: "heading",
        level: 2,
        text: "5. Khách hàng không phải lúc nào cũng tìm kiếm để mua ngay",
      },
      {
        type: "paragraph",
        text: "Đây là một điểm rất quan trọng. Một người tìm kiếm trên Google hôm nay chưa chắc sẽ mua hàng ngay hôm nay. Ví dụ, một chủ doanh nghiệp đang tìm \"Website doanh nghiệp cần có những gì?\" Họ có thể chưa có ý định thuê đơn vị thiết kế website ngay lập tức. Nhưng nếu họ đọc được một bài viết hữu ích trên website của bạn, hiểu thêm về website và nhận thấy bạn có chuyên môn, họ có thể nhớ đến thương hiệu của bạn. Một thời gian sau, khi có nhu cầu làm website, họ có thể quay lại tìm bạn. Đó là cách nội dung trên website từng bước xây dựng sự tin tưởng với khách hàng.",
      },
      {
        type: "paragraph",
        text: "Thay vì chỉ nói \"Hãy mua dịch vụ của chúng tôi\", bạn đang giúp khách hàng hiểu vấn đề, tìm giải pháp, biết đến doanh nghiệp, tin tưởng, rồi liên hệ khi có nhu cầu.",
      },
      {
        type: "heading",
        level: 2,
        text: "6. Website có thể tiếp tục tìm kiếm khách hàng ngay cả khi bạn không chạy quảng cáo",
      },
      {
        type: "paragraph",
        text: "Quảng cáo có một đặc điểm rất dễ hiểu: bạn trả tiền để có lượt tiếp cận, khi ngân sách quảng cáo dừng, lượng khách hàng đến từ quảng cáo cũng có thể giảm. SEO hoạt động theo cách khác. Khi một bài viết hoặc một trang dịch vụ của bạn được Google đánh giá tốt và có vị trí tìm kiếm tốt, khách hàng vẫn có thể tìm thấy nội dung đó mỗi ngày.",
      },
      {
        type: "paragraph",
        text: "Điều này không có nghĩa là SEO hoàn toàn miễn phí hoặc website lên Google một lần rồi giữ vị trí mãi mãi. SEO cần thời gian, nội dung chất lượng và quá trình cải thiện liên tục. Nhưng nếu làm tốt, website có thể trở thành một kênh thu hút khách hàng lâu dài, thay vì chỉ phụ thuộc vào quảng cáo.",
      },
      {
        type: "heading",
        level: 2,
        text: "7. Vậy website chuẩn SEO thực sự mang lại điều gì cho doanh nghiệp?",
      },
      {
        type: "paragraph",
        text: "Nếu nói theo cách đơn giản nhất: website chuẩn SEO giúp rút ngắn khoảng cách giữa khách hàng đang có nhu cầu và doanh nghiệp đang cung cấp giải pháp.",
      },
      {
        type: "heading",
        level: 3,
        text: "Tăng khả năng xuất hiện trên các công cụ tìm kiếm",
      },
      {
        type: "paragraph",
        text: "Website chuẩn SEO giúp website của bạn xuất hiện ở vị trí cao trong kết quả tìm kiếm của các công cụ như Google, Bing, v.v. Điều này rất quan trọng vì người dùng thường chỉ chú ý đến các kết quả tìm kiếm ở trang đầu tiên.",
      },
      {
        type: "heading",
        level: 3,
        text: "Giảm chi phí quảng cáo",
      },
      {
        type: "paragraph",
        text: "Khi website của bạn đạt thứ hạng cao nhờ SEO, bạn không cần phải chi tiêu quá nhiều cho quảng cáo trả phí. SEO giúp giảm chi phí quảng cáo và tạo ra nguồn khách hàng bền vững hơn, giúp doanh nghiệp tiết kiệm ngân sách và tối ưu hóa chi phí marketing.",
      },
      {
        type: "heading",
        level: 3,
        text: "Tăng khả năng tương tác và giữ chân khách hàng",
      },
      {
        type: "paragraph",
        text: "SEO không chỉ tối ưu hóa nội dung cho người dùng mà còn giúp cải thiện các yếu tố kỹ thuật như tốc độ tải trang, thiết kế thân thiện với điện thoại, cấu trúc URL hợp lý, và các yếu tố khác giúp website của bạn dễ sử dụng hơn. Khi khách hàng có trải nghiệm tốt trên website, họ sẽ có xu hướng quay lại và tương tác lâu dài với thương hiệu.",
      },
      {
        type: "heading",
        level: 3,
        text: "Cải thiện độ tin cậy và uy tín của thương hiệu",
      },
      {
        type: "paragraph",
        text: "Website được tối ưu hóa SEO tốt sẽ được Google và các công cụ tìm kiếm đánh giá cao và xếp hạng cao. Điều này không chỉ giúp website của bạn xuất hiện ở vị trí tốt mà còn tạo ra ấn tượng tốt với người dùng. Khi người dùng thấy website của bạn xuất hiện ở các vị trí cao trong kết quả tìm kiếm, họ sẽ cảm thấy tin tưởng hơn và dễ dàng quyết định sử dụng sản phẩm hoặc dịch vụ của bạn.",
      },
      {
        type: "image",
        src: "/tin-tuc/vi-sao/chuan-seo-mang-lai-cho-doanh-nghiep.webp",
        alt: "Bốn lợi ích website chuẩn SEO mang lại cho doanh nghiệp",
      },
      {
        type: "heading",
        level: 2,
        text: "Kết luận",
      },
      {
        type: "paragraph",
        text: "Website chuẩn SEO không phải là một khái niệm quá kỹ thuật. Hiểu đơn giản, đó là cách xây dựng website sao cho Google dễ hiểu, khách hàng dễ tìm, dễ xem, dễ tin tưởng và dễ liên hệ với doanh nghiệp. Một website đẹp giúp bạn tạo ấn tượng, một website có nội dung tốt giúp khách hàng hiểu bạn.",
      },
      {
        type: "paragraph",
        text: "Nhưng một website được xây dựng tốt và chuẩn SEO sẽ giúp khách hàng có nhu cầu có cơ hội tìm thấy bạn ngay khi họ đang tìm kiếm giải pháp. Và đó mới là giá trị lâu dài của một website đối với doanh nghiệp.",
      },
      {
        type: "paragraph",
        text: "Bạn đã sẵn sàng để website thực sự hỗ trợ doanh nghiệp? Nếu bạn đang cần xây dựng một website mới hoặc muốn cải thiện website hiện tại, PML Vietnam có thể đồng hành cùng bạn từ giao diện đến nội dung, hướng đến một website đẹp, hiện đại và chuyên nghiệp, đồng thời thân thiện với Google, chuẩn SEO và dễ sử dụng trên mọi thiết bị.",
      },
      {
        type: "tagline",
        text: "PML Vietnam - Cung cấp giải pháp website hiện đại cho cá nhân, hộ kinh doanh và doanh nghiệp.",
      },
    ] satisfies NewsArticleBlock[],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

/**
 * Tin đã có nội dung chi tiết — listing, carousel và search chỉ hiện các item này.
 * Không xóa draft khỏi `newsContent.items`.
 */
export const publishedNewsItems: NewsItem[] = newsContent.items.filter((item) =>
  newsArticles.some(
    (article) =>
      item.href === newsArticleHref(article.slug) && article.blocks.length > 0,
  ),
);

/**
 * Section 5 — FAQ (layout ref web4s.vn).
 * Ảnh: `public/update/faq-nha-web.webp` (964×656).
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqContent = {
  heading:
    "Câu hỏi thường gặp về dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam",
  image: {
    src: "/update/faq-nha-web.webp",
    alt: "Minh họa FAQ — giải pháp, chi phí, quy trình thiết kế website",
  },
  items: [
    {
      id: "faq-1",
      question:
        "Bảng giá thiết kế website chuyên nghiệp tại PML Vietnam giá khoảng bao nhiêu?",
      answer:
        "Tại PML Vietnam mức giá thiết kế website trọn gói thông thường sẽ là 4.000.000 ngoài ra bạn còn được thêm rất nhiều các quà tặng hấp dẫn như: tặng tên miền, tặng SSL... Trong trường hợp những website có nhiều yêu cầu phức tạp chúng tôi sẽ luôn đưa ra mức giá mà bạn cảm thấy hài lòng nhất.",
    },
    {
      id: "faq-2",
      question: "Thiết kế website có chuẩn SEO không?",
      answer:
        "Tất cả website đều chuẩn SEO là quá trình tạo dựng một trang web không chỉ đẹp mắt, thân thiện với người dùng mà còn được tối ưu hóa để các công cụ tìm kiếm như Google, Bing... dễ dàng hiểu và xếp hạng cao trong kết quả tìm kiếm. Điều này giúp website của bạn có khả năng tiếp cận được nhiều khách hàng tiềm năng hơn.",
    },
    {
      id: "faq-3",
      question:
        "Chi phí cho dịch vụ chăm sóc website thường dao động như thế nào?",
      answer:
        "Chi phí cho dịch vụ chăm sóc website tại PML Vietnam được xác định dựa trên nhiều yếu tố. Chúng tôi cung cấp nhiều gói dịch vụ với mức giá linh hoạt, giúp khách hàng dễ dàng lựa chọn gói phù hợp với ngân sách và nhu cầu của mình.",
    },
    {
      id: "faq-4",
      question:
        "Khi thiết kế website trọn gói có đội ngũ hỗ trợ tôi trong quá trình sử dụng không?",
      answer:
        "Chắc chắn là Có. Chúng tôi luôn có những đội ngũ chuyên gia giàu kinh nghiệm luôn túc trực qua các kênh như Zalo, Messenger, Hotline nếu bạn cần hỗ trợ gì hãy liên hệ với chúng tôi qua những kênh trên nhé.",
    },
    {
      id: "faq-5",
      question:
        "PML Vietnam có hỗ trợ hướng dẫn hoặc nhập liệu bài viết chuẩn SEO lên cho khách được không?",
      answer:
        "Sau khi hoàn thành website, PML Vietnam sẽ hướng dẫn khách hàng nhập liệu bài viết chuẩn SEO thông qua giao diện quản trị mà chúng tôi thiết kế người không rành về công nghệ cũng có thể làm được.",
    },
  ] satisfies FaqItem[],
};

/**
 * Section 6 — ảnh infographic quy trình full-width (không chia text / image).
 * Desktop: `public/update/quy-trinh-5-buoc.webp` (1920×902).
 * Mobile: `public/process/5-step-mobile.png` (864×1821).
 */
export const processImagesContent = {
  heading: "Quy trình 5 bước",
  image: {
    src: "/update/quy-trinh-5-buoc.webp",
    alt: "Quy trình 5 bước PML Vietnam — tiếp nhận yêu cầu, lập kế hoạch, thiết kế & xây dựng, kiểm thử & tối ưu, nghiệm thu bàn giao",
    width: 1920,
    height: 902,
  },
  imageMobile: {
    src: "/process/5-step-mobile.png",
    alt: "Quy trình 5 bước PML Vietnam — tiếp nhận yêu cầu, lập kế hoạch, thiết kế & xây dựng, kiểm thử & tối ưu, nghiệm thu bàn giao",
    width: 864,
    height: 1821,
  },
};

/** @deprecated Dùng `processImagesContent` — giữ alias tạm nếu có import cũ. */
export const section6Content = processImagesContent;

/**
 * Section 7 — Why choose PML Vietnam (format tạm ref Mắt Bão WS glass cards).
 * TODO: swap `backgroundImage` + icon assets khi khách cung cấp ảnh final.
 */
export type WhyChooseItem = {
  id: string;
  label: string;
  /** Số lớn accent (vd. "9+", "19+") — ưu tiên hơn icon */
  highlight?: string;
  /**
   * Icon key khi không có highlight.
   * Map tới SVG nội bộ trong `WhyChooseSection`.
   */
  icon?:
    | "code"
    | "templates"
    | "tech"
    | "admin"
    | "scale"
    | "support";
};

export const whyChooseContent = {
  heading:
    "Tại sao bạn nên chọn dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam?",
  subheading: "Nền tảng công nghệ tạo nên sự khác biệt của PML Vietnam",
  ctaLabel: "Đăng ký tư vấn",
  ctaHref: "/#lien-he",
  /** Collage tạm từ mẫu web — thay bằng ảnh nền section 7 khi có */
  backgroundImage: {
    src: "/samples/sample-1.svg",
    alt: "",
  },
  items: [
    {
      id: "reason-1",
      highlight: "9+",
      label: "Năm kinh nghiệm trong lĩnh vực thiết kế website",
    },
    {
      id: "reason-2",
      highlight: "19+",
      label: "Năm kinh nghiệm công nghệ",
    },
    {
      id: "reason-3",
      icon: "code",
      label: "Phát triển hoàn toàn bằng mã nguồn riêng",
    },
    {
      id: "reason-4",
      icon: "templates",
      label: "Mẫu web hiện đại theo từng ngành nghề",
    },
    {
      id: "reason-5",
      icon: "tech",
      label: "Sử dụng công nghệ hiện đại, bền vững",
    },
    {
      id: "reason-6",
      icon: "admin",
      label: "Giao diện quản trị dễ sử dụng",
    },
    {
      id: "reason-7",
      icon: "scale",
      label: "Dễ nâng cấp và mở rộng",
    },
    {
      id: "reason-8",
      icon: "support",
      label: "Đội ngũ hỗ trợ chuyên nghiệp",
    },
  ] satisfies WhyChooseItem[],
};

/**
 * Mục 5 — Nhận xét khách hàng (layout card ref web4s.vn, hiển thị carousel).
 * Thêm item vào `items` khi có review mới — không cần sửa layout.
 */
export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: { src: string; alt: string };
};

export const testimonialsContent = {
  eyebrow: "Khách hàng nói gì về dịch vụ thiết kế website",
  heading: "Phản hồi trong quá trình phục vụ khách hàng",
  items: [
    {
      id: "t1",
      name: "Phạm Minh Luân",
      role: "Chủ shop Luvini & Co",
      quote:
        "Thiết kế của PML Vietnam rất tỉ mỉ và chuyên nghiệp — màu sắc, bố cục đều phù hợp đúng ngành hàng của shop. Từ ý tưởng đến bàn giao được chăm chút, giúp Luvini & Co có diện mạo online đúng chất thương hiệu.",
      image: {
        src: "/customer/khach_hang_luvini.png",
        alt: "Ảnh Phạm Minh Luân — Chủ shop Luvini & Co",
      },
    },
  ] satisfies TestimonialItem[],
};

/**
 * Section — CTA dịch vụ cao cấp (trên PhoneContactSection).
 * Ref layout interdata.vn: heading + domain underline + pill buttons gradient.
 */
export type PremiumServiceIcon =
  | "website"
  | "landing"
  | "branding"
  | "fullpackage"
  | "care"
  | "content";

export type PremiumServiceItem = {
  id: string;
  label: string;
  icon: PremiumServiceIcon;
  /** Khi có — pill điều hướng tới trang dịch vụ thay vì mở form đăng ký. */
  href?: string;
};

export const premiumServicesContent = {
  id: "dich-vu",
  eyebrow: "Trải nghiệm dịch vụ cao cấp ngay tại",
  /** Domain-style brand line (ref INTERDATA.VN) */
  brandDomain: "PML VIETNAM",
  services: [
    {
      id: "thiet-ke-website",
      label: "Thiết kế website",
      icon: "website",
      href: "/thiet-ke-website",
    },
    {
      id: "thiet-ke-landing-page",
      label: "Thiết kế Landing page",
      icon: "landing",
      href: "/thiet-ke-landing-page",
    },
    {
      id: "thiet-ke-nhan-dien",
      label: "Thiết kế nhận diện thương hiệu",
      icon: "branding",
      href: "/thiet-ke-nhan-dien-thuong-hieu",
    },
    {
      id: "thiet-ke-tron-goi",
      label: "Thiết kế website trọn gói",
      icon: "fullpackage",
      href: "/thiet-ke-website-tron-goi",
    },
    {
      id: "cham-soc-website",
      label: "Chăm sóc website",
      icon: "care",
      href: "/cham-soc-website",
    },
    {
      id: "pml-content",
      label: "SEO Content",
      icon: "content",
      href: "/seo-content",
    },
  ] satisfies PremiumServiceItem[],
};

/**
 * Shared contact form (Form 7 "Đăng ký tư vấn" + Form 8 "Đăng ký ngay").
 * Dùng qua `ContactFormModal` với `variant`: "consult" | "register".
 */
export type ContactFormVariant = "consult" | "register";

/** Bản copy form đăng ký — `register` mặc định, `thietKeWebsite` cho trang thiết kế website, `chamSocWebsite` cho trang chăm sóc website, `pmlContent` cho trang SEO Content. */
export type ContactFormRegisterKey =
  | "register"
  | "thietKeWebsite"
  | "chamSocWebsite"
  | "pmlContent";

export const contactFormContent = {
  image: {
    src: "/form/dang_ky_tu_van.png",
    alt: "PML Vietnam — dịch vụ thiết kế website chuyên nghiệp",
  },
  consult: {
    heading: "PML VIETNAM XIN CHÀO!",
    subheading:
      "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên hành trình số hóa.",
    submitLabel: "Đăng ký tư vấn",
  },
  register: {
    /** Dùng khi mở form không gắn mẫu cụ thể */
    defaultHeading: "Đăng ký ngay",
    subheading:
      "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai mẫu website phù hợp.",
    submitLabel: "Đăng ký ngay",
  },
  thietKeWebsite: {
    defaultHeading: "Đăng ký ngay",
    subheading:
      "Để lại thông tin - PML Vietnam sẽ liên hệ tư vấn và triển khai gói logo phù hợp.",
    submitLabel: "Đăng ký ngay",
  },
  chamSocWebsite: {
    defaultHeading: "Đăng ký ngay",
    subheading:
      "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai gói chăm sóc website phù hợp.",
    submitLabel: "Đăng ký ngay",
  },
  pmlContent: {
    defaultHeading: "Đăng ký ngay",
    subheading:
      "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai gói SEO Content phù hợp.",
    submitLabel: "Đăng ký ngay",
  },
  fields: {
    name: { label: "Tên của bạn", placeholder: "Nguyễn Văn A", required: true },
    phone: {
      label: "Số điện thoại",
      placeholder: "0908 985 844",
      required: true,
    },
    email: {
      label: "Email",
      placeholder: "email@domain.com",
      required: false,
    },
    message: {
      label: "Nội dung bạn cần hỗ trợ",
      placeholder: "Mô tả ngắn nhu cầu của bạn…",
      required: false,
    },
  },
  successTitle: "Gửi thông tin thành công!",
  successMessage:
    "Cảm ơn bạn đã tin tưởng PML Vietnam. Chúng tôi sẽ liên hệ sớm nhất.",
  /** Section 8 CTA banner — mở modal register */
  section: {
    id: "lien-he",
    headline:
      "Khởi tạo Web đơn giản - Dễ vận hành - Dễ tăng trưởng doanh thu",
    subheadline: "Thiết kế Website chuyên nghiệp tại PML Vietnam ngay",
    ctaLabel: "Đăng ký ngay",
    bannerColor: "#1E293B",
    illustration: {
      src: "/support/bot-remove-bg.png",
      alt: "Bot hỗ trợ đăng ký website PML Vietnam",
    },
  },
};

/** @deprecated Dùng `contactFormContent` — giữ alias tạm nếu còn import cũ */
export const phoneContactContent = contactFormContent.section;

/**
 * Trang Liên hệ — hero form (ref interdata.vn/contact).
 * Layout: info trái + form phải trên nền gradient xanh.
 * Form thêm field Số điện thoại so với mẫu InterData gốc.
 */
export const lienHePageContent = {
  id: "lien-he",
  eyebrow: "Liên hệ",
  heading: "Liên hệ PML Vietnam",
  intro:
    "Để lại thông tin, đội ngũ PML Vietnam sẽ tư vấn giải pháp website phù hợp với nhu cầu của bạn.",
  hotlineLabel: "Hotline / Zalo",
  workingHours: "Giờ làm việc: Thứ 2 - Thứ 7: 8:00 - 18:00",
  termsLabel: "Tôi đồng ý với Thỏa thuận & Điều khoản sử dụng",
  termsHref: "/dieu-khoan-su-dung",
  submitLabel: "Gửi liên hệ",
  fields: {
    name: {
      label: "Họ tên",
      placeholder: "Nguyễn Văn A",
      required: true,
    },
    phone: {
      label: "Số điện thoại",
      placeholder: "0908 985 844",
      required: true,
    },
    email: {
      label: "Email",
      placeholder: "email@domain.com",
      required: true,
    },
    message: {
      label: "Nội dung liên hệ",
      placeholder: "Mô tả ngắn nhu cầu dịch vụ của bạn…",
      required: false,
    },
  },
  successTitle: "Gửi liên hệ thành công!",
  successMessage:
    "Cảm ơn bạn đã liên hệ PML Vietnam. Chúng tôi sẽ phản hồi sớm nhất.",
};

/**
 * Trang `/giai-phap` — landing quảng cáo gom dịch vụ website (7 section).
 * Banner overlay trên asset 1920×620; nhu cầu theo layout quy trình 5 bước;
 * why / gói PMLCare / form liên hệ / footer tái dùng section sẵn có.
 */
export type SolutionNeedItem = {
  id: string;
  title: string;
  /** Path relative to /public — `public/icon-giai-phap/` */
  iconSrc: string;
};

export type SolutionProjectItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  image: { src: string; alt: string };
};

export const solutionPageContent = {
  meta: {
    title: "Giải pháp thiết kế & vận hành website",
    description:
      "Thiết kế và vận hành website chuyên nghiệp, chuẩn SEO, hiển thị tốt trên mọi thiết bị. Để lại thông tin để PML Vietnam tư vấn giải pháp phù hợp.",
  },
  banner: {
    id: "giai-phap-banner",
    image: {
      src: "/giai-phap/hero-banner-giai-phap.webp",
      alt: "Thiết kế và vận hành website chuyên nghiệp tại PML Vietnam",
      width: 1920,
      height: 620,
    },
    imageMobile: {
      src: "/giai-phap/hero-banner-giai-phap-mobile.webp",
      alt: "Thiết kế và vận hành website chuyên nghiệp tại PML Vietnam",
      width: 768,
      height: 768,
    },
  },
  needs: {
    id: "nhu-cau",
    heading: "Có phải doanh nghiệp của bạn đang gặp các vấn đề này?",
    items: [
      {
        id: "need-1",
        iconSrc: "/icon-giai-phap/no-website.webp",
        title: "Chưa có website để giới thiệu doanh nghiệp và dịch vụ.",
      },
      {
        id: "need-2",
        iconSrc: "/icon-giai-phap/website-cu.webp",
        title: "Website cũ, giao diện lỗi thời, khó thao tác.",
      },
      {
        id: "need-3",
        iconSrc: "/icon-giai-phap/chi-phi-Ads.webp",
        title: "Tốn chi phí Ads nhưng tỉ lệ chuyển đổi thấp.",
      },
      {
        id: "need-4",
        iconSrc: "/icon-giai-phap/hinh-anh-thuong-hieu.webp",
        title: "Hình ảnh thương hiệu chưa xứng tầm với sản phẩm.",
      },
      {
        id: "need-5",
        iconSrc: "/icon-giai-phap/chiec-luoc-thuc-hien.webp",
        title: "Chưa có chiến lược thực hiện online hiệu quả.",
      },
    ] satisfies SolutionNeedItem[],
  },
  projects: {
    id: "du-an-tieu-bieu",
    eyebrow: "Dự án tiêu biểu",
    heading: "Một số website chúng tôi đã thực hiện",
    tagline:
      "Giao diện hiện đại, chuẩn SEO, dễ vận hành theo từng ngành nghề.",
    catalogLabel: "Xem tất cả mẫu website",
    catalogHref: "/san-pham",
    items: [
      {
        id: "luvini",
        title: "Luvini & Co.",
        description: "Website giới thiệu thương hiệu và sản phẩm",
        href: "https://luvini.vn",
        external: true,
        image: {
          src: "/san-pham/ban-le-&-tmdt/luvini.png",
          alt: "Website Luvini & Co do PML Vietnam thực hiện",
        },
      },
      {
        id: "thoi-trang",
        title: "Cửa hàng thời trang",
        description: "Website bán lẻ thời trang, catalog sản phẩm",
        href: "/san-pham/ban-le-tmdt-cua-hang-thoi-trang",
        image: {
          src: "/san-pham/ban-le-&-tmdt/cua_hang_thoi_trang_nho.png",
          alt: "Mẫu website cửa hàng thời trang PML Vietnam",
        },
      },
      {
        id: "nha-hang",
        title: "Nhà hàng, quán ăn",
        description: "Website giới thiệu thực đơn và thương hiệu F&B",
        href: "/san-pham/dich-vu-thuong-mai-nha-hang-quan-an",
        image: {
          src: "/san-pham/dich-vu-thuong-mai/nha_hang_quan_an.webp",
          alt: "Mẫu website nhà hàng, quán ăn PML Vietnam",
        },
      },
      {
        id: "spa",
        title: "Spa, thẩm mỹ viện",
        description: "Website dịch vụ spa, liệu trình và đặt lịch",
        href: "/san-pham/dich-vu-thuong-mai-spa-tham-my-vien",
        image: {
          src: "/san-pham/dich-vu-thuong-mai/spa_tham_my_vien.webp",
          alt: "Mẫu website spa, thẩm mỹ viện PML Vietnam",
        },
      },
    ] satisfies SolutionProjectItem[],
  },
  formSectionId: "dang-ky",
};

/**
 * Trang Thiết kế website theo yêu cầu (`/thiet-ke-website-theo-yeu-cau`).
 * Bố cục ref web4s.vn/thiet-ke-website-theo-yeu-cau; hero/FAQ/why/process tái dùng pattern trang chủ.
 * Ảnh minh họa: `public/services/thiet-ke-website-theo-yeu-cau.webp.png` (swap khi có bản final).
 */
export const customWebsiteHeroContent = {
  eyebrow: "Website độc quyền",
  headline: "Thiết Kế Website Theo Yêu Cầu, Độc Quyền Giao Diện",
  bullets: [
    "Thiết kế độc quyền theo thương hiệu",
    "Tùy chỉnh tính năng linh hoạt",
    "Tối ưu trải nghiệm người dùng",
    "Dễ dàng mở rộng trong tương lai",
    "Chủ động về công nghệ & hiệu suất",
  ],
  ctaLabel: "Đăng ký ngay",
  ctaHref: "/#lien-he",
  autoplayMs: 5000,
  banners: [
    {
      src: "/thiet-ke-web-tron-goi/banner_theo_yeu_cau.webp",
      alt: "Thiết kế website theo yêu cầu — PML Vietnam",
    },
    {
      src: "/thiet-ke-web-tron-goi/banner_theo_yeu_cau_en.webp",
      alt: "Custom website design — PML Vietnam",
    },
  ],
};

export const customWebsiteIntroContent = {
  id: "ban-biet-gi",
  heading: "Bạn biết gì về thiết kế website theo yêu cầu?",
  intro:
    "Thiết kế website theo yêu cầu là dựa vào nhu cầu, sở thích riêng biệt của mỗi khách hàng về website mà từ đó chúng tôi sẽ xây dựng một trang web đúng như họ mong muốn. Đây được xem là một loại hình dịch vụ được sử dụng khá phổ biến hiện nay, giúp doanh nghiệp sở hữu một giao diện hoàn chỉnh và độc nhất cho thương hiệu của mình.",
  highlightTitle:
    "Thiết kế web theo yêu cầu sẽ dễ dàng thu hút được sự chú ý của người dùng hơn bởi ý tưởng website đẹp – độc – lạ",
  points: [
    "Bạn là người luôn ưu thích sự khác biệt, có nhiều ý tưởng mới lạ và không muốn tuân theo bất kỳ một khuôn mẫu hay nguyên tắc nào về thiết kế website.",
    "Bạn cần tích hợp nhiều yếu tố vào trong hệ thống trang web của mình và có những yêu cầu riêng biệt mà một mẫu web sẵn không thể đáp ứng.",
    "Bạn mong muốn được thoải mái sáng tạo và thể hiện phong cách của riêng mình giúp sản phẩm trở nên hoàn hảo và độc đáo nhất.",
  ],
  note: "Tuy nhiên, do tính chất trang website được thiết kế riêng dựa trên yêu cầu của khách hàng, vậy nên cần có thời gian bàn bạc và thống nhất, lên kế hoạch cụ thể cho từng thành phần của website.",
  image: {
    src: "/thiet-ke-web-tron-goi/banner_theo_yeu_cau.webp",
    alt: "Thiết kế website theo yêu cầu — giao diện độc quyền PML Vietnam",
  },
};

export const customWebsiteCostContent = {
  id: "chi-phi",
  heading: "Chi phí làm website theo yêu cầu có cao không?",
  body: "Chi phí thiết kế web theo yêu cầu chắc chắn sẽ cao hơn so với thiết kế theo mẫu giao diện web đã có sẵn (tùy theo mức độ thiết kế đơn giản hay phức tạp). Tuy nhiên, việc xây dựng một website theo yêu cầu sẽ giúp bạn sở hữu ngay một trang web độc đáo, “có 1 không 2” và mang phong cách riêng của mình giúp khách hàng dễ dàng ghi nhớ thương hiệu của bạn hơn.",
};

export const customWebsiteDetailsContent = {
  id: "thong-tin-chi-tiet",
  heading:
    "Thông tin chi tiết dịch vụ thiết kế website theo yêu cầu tại PML Vietnam",
  items: [
    "Tất cả các gói thiết kế website của PML Vietnam bao gồm tính năng và nội dung website, tùy vào gói dịch vụ khách hàng lựa chọn mà bạn sẽ được tặng thêm tên miền quốc tế, banner, Google Maps, công cụ hỗ trợ SEO để chạy quảng cáo.",
    "Chi phí: Khi PML Vietnam nắm bắt được ý tưởng và yêu cầu của khách hàng, chúng tôi sẽ gửi bảng giá thiết kế website theo yêu cầu phù hợp nhằm tiết kiệm chi phí tối đa nhất cho khách hàng.",
    "Các module cơ bản được tích hợp trên website: Trang chủ, Giới thiệu, Sản phẩm, Dịch vụ, Tin tức, Đối tác, Tuyển dụng, Liên hệ,… Tuy nhiên, phụ thuộc vào lĩnh vực kinh doanh và nhu cầu mà khách hàng có thể tạo web theo yêu cầu với những tính năng riêng để phục vụ mục đích của mình.",
    "Thời gian hoàn thiện web đúng tiến độ trong hợp đồng, đảm bảo chất lượng.",
    "Chế độ bảo trì, chăm sóc khách hàng sau khi hoàn thiện Website vẫn tận tình, chu đáo.",
  ],
};

export const customWebsiteWhyChooseContent = {
  ...whyChooseContent,
  heading:
    "Tại sao bạn nên chọn dịch vụ thiết kế website theo yêu cầu tại PML Vietnam?",
  subheading:
    "Nếu bạn đang khó khăn trong việc chưa biết lựa chọn một đơn vị thiết kế web theo yêu cầu giá cả phải chăng, chuyên nghiệp, vậy đến ngay với PML Vietnam bạn sẽ hài lòng tuyệt đối bởi:",
};

export const customWebsiteProcessContent = {
  ...processStepsContent,
  heading: "Quy trình thiết kế website theo yêu cầu tại PML Vietnam",
};

export const customWebsiteFaqContent = {
  heading:
    "Câu hỏi thường gặp về thiết kế website theo yêu cầu tại PML Vietnam",
  image: faqContent.image,
  items: [
    {
      id: "cyw-faq-1",
      question: "Thiết kế website theo yêu cầu là gì?",
      answer:
        "Thiết kế website theo yêu cầu là thiết kế một website theo mong muốn để phù hợp với cá tính cũng như sở thích của người sở hữu chúng. Cá nhân hay một chủ doanh nghiệp đầy ắp các ý tưởng độc đáo, bạn mong muốn sở hữu được một website mang đậm chất riêng của mình, vậy tạo website theo yêu cầu sẽ là lựa chọn thích hợp dành cho bạn.",
    },
    {
      id: "cyw-faq-2",
      question: "Tôi được yêu cầu những gì khi làm website theo yêu cầu?",
      answer:
        "Bạn có thể yêu cầu chọn tên miền/ hạ tầng máy chủ lưu trữ phù hợp; yêu cầu thiết kế giao diện web theo ý tưởng của mình; yêu cầu sắp xếp bố cục, vị trí các module; yêu cầu tích hợp thêm hoặc bỏ bớt tính năng không cần thiết để đảm bảo đúng mục đích sử dụng web.",
    },
    {
      id: "cyw-faq-3",
      question:
        "Chi phí đầu tư cho một website thiết kế riêng theo yêu cầu có cao không?",
      answer:
        "Chi phí thiết kế web theo yêu cầu chắc chắn sẽ cao hơn so với thiết kế theo mẫu giao diện web đã có sẵn (tùy theo mức độ thiết kế đơn giản hay phức tạp). Nhưng bạn hoàn toàn yên tâm bởi chi phí đầu tư tương xứng với chất lượng, bạn sẽ sở hữu một website độc nhất vô nhị, theo đúng mong muốn của bản thân.",
    },
    {
      id: "cyw-faq-4",
      question: "Tôi sẽ nhận được web sau bao nhiêu ngày?",
      answer:
        "Phụ thuộc vào yêu cầu của khách hàng, độ phức tạp của website mà thời gian tạo web sẽ dao động từ 20 đến 30 ngày.",
    },
    {
      id: "cyw-faq-5",
      question:
        "Tôi chưa có ý tưởng gì cho giao diện web, vậy có tạo website được không?",
      answer:
        "Hoàn toàn được, nếu bạn chưa có ý tưởng thiết kế giao diện hay chưa lựa chọn được màu sắc web, đội ngũ PML Vietnam sẽ tư vấn giao diện/ màu sắc phù hợp với nhu cầu, lĩnh vực kinh doanh của bạn.",
    },
    {
      id: "cyw-faq-6",
      question: "Tôi có thể tự chỉnh sửa/ cập nhật thông tin lên web không?",
      answer:
        "Chắc chắn là được. Khi thiết kế website tại PML Vietnam, khách hàng sẽ được cung cấp một tài khoản quản trị admin để chủ động cập nhật nội dung/ chỉnh sửa theo mong muốn của mình.",
    },
  ] satisfies FaqItem[],
};

const sharedHeroBanners = [
  {
    src: "/new-banner/pmlvietnam_banner_theo_yeu_cau.webp",
    alt: "Thiết kế website theo yêu cầu — PML Vietnam",
  },
  {
    src: "/new-banner/pmlvietnam_landing_page_university.webp",
    alt: "Thiết kế landing page — PML Vietnam",
  },
  {
    src: "/new-banner/pmlvietnam_banner_personal_branding.webp",
    alt: "Thiết kế nhận diện thương hiệu — PML Vietnam",
  },
  {
    src: "/new-banner/pmlvietnam_banner_cham_soc_website.webp",
    alt: "Dịch vụ chăm sóc website — PML Vietnam",
  },
] as const;

const sharedServiceImage = {
  src: "/new-banner/pmlvietnam_landing_page_university.webp",
  alt: "Thiết kế website chuyên nghiệp tại PML Vietnam",
};

/** Trang /thiet-ke-website */
export const websiteServiceContent = {
  hero: {
    eyebrow: "Website theo mẫu",
    headline: "Thiết kế website chuyên nghiệp, chuẩn SEO, giao trong 5–7 ngày",
    bullets: [
      "Triển khai nhanh 5–7 ngày làm việc",
      "Giao diện hiện đại, tối ưu PageSpeed",
      "Hiển thị tốt trên mọi thiết bị",
      "Giao diện quản trị dễ sử dụng",
      "Chuẩn SEO kỹ thuật từ ngày bàn giao",
    ],
    ctaLabel: "Đăng ký ngay",
    autoplayMs: 5000,
    banners: [...sharedHeroBanners],
  },
  intro: {
    id: "gioi-thieu-thiet-ke-website",
    heading: "Thiết kế website theo mẫu phù hợp với ngành nghề của bạn",
    intro:
      "PML Vietnam giúp cá nhân và doanh nghiệp sở hữu website chuyên nghiệp từ kho mẫu hiện đại, tinh chỉnh theo thương hiệu — không cần am hiểu kỹ thuật, vẫn ra mắt nhanh và dễ vận hành.",
    highlightTitle: "Website theo mẫu giúp bạn ra mắt nhanh mà vẫn chỉn chu",
    points: [
      "Chọn mẫu đúng ngành, chỉnh màu sắc – nội dung – thông tin liên hệ theo thương hiệu.",
      "Tối ưu hiển thị trên điện thoại, máy tính bảng và máy tính.",
      "Bàn giao kèm hướng dẫn quản trị để bạn tự cập nhật bài viết, sản phẩm, banner.",
    ],
    note: "Nếu mẫu sẵn chưa đủ, đội ngũ PML Vietnam sẽ tư vấn nâng cấp tính năng hoặc chuyển sang thiết kế theo yêu cầu.",
    image: sharedServiceImage,
  },
  cost: {
    id: "chi-phi-thiet-ke-website",
    heading: "Chi phí thiết kế website tại PML Vietnam như thế nào?",
    body: "Gói website theo mẫu thường bắt đầu từ mức trọn gói minh bạch (bao gồm giao diện, nội dung cơ bản và các quà tặng như tên miền, SSL tùy gói). Website phức tạp hơn sẽ được báo giá sau khi nắm nhu cầu — luôn hướng tới mức hợp lý để bạn an tâm đầu tư.",
  },
  why: {
    ...whyChooseContent,
    heading: "Tại sao chọn PML Vietnam để thiết kế website?",
    subheading:
      "Triển khai nhanh, giao diện hiện đại, chuẩn SEO và đội ngũ đồng hành sau bàn giao.",
  },
  details: {
    id: "chi-tiet-thiet-ke-website",
    heading: "Những gì bạn nhận được khi thiết kế website tại PML Vietnam",
    items: [
      "Website hoàn chỉnh theo mẫu đã chọn, tinh chỉnh thương hiệu và nội dung.",
      "Tối ưu tốc độ, hiển thị đa thiết bị và nền tảng SEO kỹ thuật.",
      "Tài khoản quản trị để tự cập nhật tin tức, sản phẩm, hình ảnh.",
      "Hướng dẫn vận hành và hỗ trợ trong thời gian bảo hành.",
    ],
  },
  process: {
    ...processStepsContent,
    heading: "Quy trình thiết kế website tại PML Vietnam",
  },
  faq: {
    heading: "Câu hỏi thường gặp về thiết kế website tại PML Vietnam",
    image: faqContent.image,
    items: [
      {
        id: "web-faq-1",
        question: "Thiết kế website theo mẫu mất bao lâu?",
        answer:
          "Thông thường 5–7 ngày làm việc sau khi chốt mẫu, nội dung và thông tin thương hiệu. Gói có nhiều hạng mục tùy chỉnh có thể kéo dài hơn theo phạm vi đã thống nhất.",
      },
      {
        id: "web-faq-2",
        question: "Tôi có tự cập nhật website sau khi bàn giao không?",
        answer:
          "Có. Bạn được cấp tài khoản quản trị để đăng bài, sửa nội dung, cập nhật sản phẩm mà không cần biết lập trình.",
      },
      {
        id: "web-faq-3",
        question: "Website có chuẩn SEO không?",
        answer:
          "Website được tối ưu kỹ thuật (tốc độ, thẻ meta, cấu trúc, hiển thị mobile). Nội dung SEO chuyên sâu có thể bổ sung theo gói hoặc dịch vụ chăm sóc.",
      },
      {
        id: "web-faq-4",
        question: "Nếu tôi muốn giao diện độc quyền thì sao?",
        answer:
          "Bạn có thể chọn dịch vụ thiết kế website trọn gói / theo yêu cầu để có giao diện riêng, không dùng mẫu có sẵn.",
      },
    ] satisfies FaqItem[],
  },
};

/** Trang /thiet-ke-landing-page */
export const landingPageServiceContent = {
  hero: {
    eyebrow: "Landing page chuyển đổi",
    headline: "Thiết kế landing page tập trung chuyển đổi, sẵn sàng chạy ads",
    bullets: [
      "Một trang – một mục tiêu chuyển đổi",
      "CTA rõ ràng, form thu lead gọn",
      "Tối ưu tốc độ để chạy quảng cáo",
      "Bố cục hiện đại, đúng thông điệp chiến dịch",
      "Dễ chỉnh nội dung khi đổi offer",
    ],
    ctaLabel: "Đăng ký tư vấn",
    autoplayMs: 5000,
    banners: [
      {
        src: "/new-landing-page/banner_landing_page_flash_sale.webp",
        alt: "Landing page flash sale — mẫu PML Vietnam",
      },
      {
        src: "/new-landing-page/banner_landing_page_order.webp",
        alt: "Landing page đặt món giao hàng — mẫu PML Vietnam",
      },
      {
        src: "/new-landing-page/banner_landing_page_university.webp",
        alt: "Landing page trường học — mẫu PML Vietnam",
      },
    ],
  },
  intro: {
    id: "gioi-thieu-landing-page",
    heading: "Landing page giúp chiến dịch quảng cáo ra lead tốt hơn",
    intro:
      "Landing page là trang đích tập trung một hành động: đăng ký, đặt lịch, mua ngay hoặc để lại thông tin. PML Vietnam thiết kế trang gọn, tải nhanh, thông điệp rõ — phù hợp chạy Facebook Ads, Google Ads.",
    highlightTitle: "Khi nào bạn nên làm landing page thay vì website đầy đủ?",
    points: [
      "Bạn đang chạy quảng cáo và cần trang đích đúng offer, không phân tán sang nhiều menu.",
      "Bạn ra mắt sản phẩm / khóa học / sự kiện và cần thu lead trong thời gian ngắn.",
      "Bạn muốn đo lường chuyển đổi rõ ràng: mỗi trang một chiến dịch.",
    ],
    note: "Landing page có thể đứng độc lập hoặc gắn thêm vào website hiện có của bạn.",
    image: {
      src: "/new-landing-page/banner_landing_page_flash_sale.webp",
      alt: "Thiết kế landing page chuyển đổi — PML Vietnam",
    },
  },
  cost: {
    id: "chi-phi-landing-page",
    heading: "Chi phí thiết kế landing page có cao không?",
    body: "Landing page thường nhẹ hơn website nhiều trang nên chi phí và thời gian triển khai thấp hơn. Mức giá phụ thuộc số phiên bản (A/B), số form và mức độ thiết kế. PML Vietnam báo giá sau khi nắm offer, đối tượng và kênh quảng cáo bạn sẽ chạy.",
  },
  why: {
    ...whyChooseContent,
    heading: "Tại sao chọn PML Vietnam thiết kế landing page?",
    subheading:
      "Tập trung chuyển đổi, tải nhanh, CTA rõ — sẵn sàng gắn pixel và form lead.",
  },
  details: {
    id: "chi-tiet-landing-page",
    heading: "Landing page PML Vietnam gồm những gì?",
    items: [
      "Bố cục 1 trang: hero, lợi ích, social proof, FAQ ngắn và CTA.",
      "Form đăng ký / nút liên hệ / Zalo tùy mục tiêu chiến dịch.",
      "Tối ưu tốc độ và hiển thị mobile — quan trọng khi chạy ads.",
      "Bàn giao kèm hướng dẫn chỉnh nội dung khi đổi chương trình khuyến mãi.",
    ],
  },
  process: {
    ...processStepsContent,
    heading: "Quy trình thiết kế landing page tại PML Vietnam",
  },
  faq: {
    heading: "Câu hỏi thường gặp về thiết kế landing page",
    image: faqContent.image,
    items: [
      {
        id: "lp-faq-1",
        question: "Landing page khác website như thế nào?",
        answer:
          "Website có nhiều trang, menu, blog. Landing page thường chỉ một trang, một lời kêu gọi hành động — dùng để chuyển đổi từ quảng cáo hoặc chiến dịch cụ thể.",
      },
      {
        id: "lp-faq-2",
        question: "Làm landing page mất bao lâu?",
        answer:
          "Thông thường nhanh hơn website đầy đủ. Khi nội dung và offer đã rõ, PML Vietnam có thể triển khai trong vài ngày làm việc.",
      },
      {
        id: "lp-faq-3",
        question: "Có gắn Facebook Pixel / Google Tag được không?",
        answer:
          "Được. Chúng tôi hỗ trợ gắn mã đo lường theo yêu cầu để bạn theo dõi chuyển đổi trên kênh ads.",
      },
      {
        id: "lp-faq-4",
        question: "Tôi có thể dùng landing page song song với website không?",
        answer:
          "Có. Nhiều khách hàng giữ website giới thiệu thương hiệu và dùng landing page riêng cho từng chiến dịch.",
      },
    ] satisfies FaqItem[],
  },
};

/** Trang /thiet-ke-nhan-dien-thuong-hieu */
export const brandingServiceContent = {
  hero: {
    eyebrow: "Nhận diện thương hiệu",
    headline: "Thiết kế nhận diện thương hiệu đồng bộ từ logo đến website",
    bullets: [
      "Logo và hệ thống nhận diện rõ ràng",
      "Bảng màu, kiểu chữ thống nhất",
      "Ứng dụng lên website, card, social",
      "Định vị thương hiệu dễ nhớ",
      "Đồng bộ trải nghiệm online – offline",
    ],
    ctaLabel: "Đăng ký tư vấn",
    autoplayMs: 5000,
    banners: [
      {
        src: "/nhan-dien-thuong-hieu/banner_personal_branding.webp",
        alt: "Thiết kế nhận diện thương hiệu — PML Vietnam",
      },
      {
        src: "/nhan-dien-thuong-hieu/banner_personal_branding_1.webp",
        alt: "Bộ nhận diện thương hiệu cá nhân — mẫu PML Vietnam",
      },
    ],
  },
  intro: {
    id: "gioi-thieu-nhan-dien",
    heading: "Nhận diện thương hiệu giúp khách nhớ bạn ngay từ lần đầu",
    intro:
      "PML Vietnam đồng hành thiết kế logo và hệ thống nhận diện để website, ấn phẩm và kênh social cùng một giọng điệu. Thương hiệu nhất quán giúp khách tin hơn và dễ lựa chọn bạn giữa thị trường.",
    highlightTitle: "Bộ nhận diện không chỉ là logo",
    points: [
      "Logo chính / đảo nền, khoảng cách an toàn và ứng dụng tối thiểu.",
      "Bảng màu cam – navy PML Vietnam có thể chuyển thành palette riêng cho thương hiệu của bạn.",
      "Hướng dẫn dùng trên website, fanpage, card visit và bao bì cơ bản.",
    ],
    note: "Có thể làm nhận diện độc lập hoặc kết hợp khi thiết kế website mới để tiết kiệm vòng chỉnh sửa.",
    image: {
      src: "/about-us/pmlvietnam_gioi_thieu_chung.webp",
      alt: "Thiết kế nhận diện thương hiệu — PML Vietnam",
    },
  },
  cost: {
    id: "chi-phi-nhan-dien",
    heading: "Chi phí thiết kế nhận diện thương hiệu",
    body: "Mức đầu tư phụ thuộc phạm vi: chỉ logo, bộ nhận diện cơ bản, hay kèm guideline website. PML Vietnam tư vấn gói phù hợp quy mô — hộ kinh doanh, shop, hay doanh nghiệp — trước khi triển khai.",
  },
  why: {
    ...whyChooseContent,
    heading: "Tại sao làm nhận diện cùng PML Vietnam?",
    subheading:
      "Thiết kế để dùng được trên web và vận hành thật, không chỉ file đẹp để cất.",
  },
  details: {
    id: "chi-tiet-nhan-dien",
    heading: "Bạn nhận được gì từ gói nhận diện?",
    items: [
      "Logo vector và các biến thể cần dùng trên nền sáng / tối.",
      "Bảng màu, font và nguyên tắc bố cục cơ bản.",
      "File bàn giao để đưa lên website, social và in ấn.",
    ],
  },
  process: {
    ...processStepsContent,
    heading: "Quy trình thiết kế nhận diện tại PML Vietnam",
  },
  faq: {
    heading: "Câu hỏi thường gặp về thiết kế nhận diện thương hiệu",
    image: faqContent.image,
    items: [
      {
        id: "br-faq-1",
        question: "Tôi đã có logo, có cần làm lại không?",
        answer:
          "Không bắt buộc. Nếu logo ổn, PML Vietnam có thể chuẩn hóa file, bảng màu và cách dùng trên website. Làm mới khi logo khó đọc, không scale hoặc không còn đúng định vị.",
      },
      {
        id: "br-faq-2",
        question: "Nhận diện có đi kèm website không?",
        answer:
          "Có thể đặt riêng hoặc combo với thiết kế website để màu sắc, font và bố cục thống nhất từ ngày đầu.",
      },
      {
        id: "br-faq-3",
        question: "Bàn giao những định dạng file nào?",
        answer:
          "Thông thường gồm file vector và PNG/WebP dùng web. Chi tiết danh mục file sẽ ghi trong phạm vi gói đã chốt.",
      },
      {
        id: "br-faq-4",
        question: "Mất bao lâu để có bộ nhận diện?",
        answer:
          "Phụ thuộc vào số lần chỉnh sửa. Sau khi thống nhất yêu cầu, chúng tôi sẽ đề xuất lịch trình cụ thể trong bước lập kế hoạch.",
      },
    ] satisfies FaqItem[],
  },
};

/**
 * Bảng so sánh công việc chăm sóc website (`/cham-soc-website`).
 * Nguồn: `public/cham-soc-website/Cham_soc_website.xlsx`.
 */
export type CareWorkValue =
  | { kind: "quota"; label: string }
  | { kind: "included" }
  | { kind: "excluded" };

export type CareWorkItem = {
  id: string;
  label: string;
  values: [CareWorkValue, CareWorkValue, CareWorkValue];
  /** Hàng nổi bật (vd. giá) */
  highlight?: boolean;
};

export type CareWorkGroup = {
  id: string;
  title: string;
  items: CareWorkItem[];
};

export type CareWorkPackage = {
  id: string;
  name: string;
  tagline: string;
  shortName?: string;
  featured?: boolean;
  /** Giá khởi điểm — hiện trên card gói khi có */
  price?: string;
};

export type CareWorkNote = {
  id: string;
  title: string;
  body: string;
};

export type CareWorkFooterLink = {
  prefix: string;
  linkLabel: string;
  href: string;
};

export type CareWorkComparisonContent = {
  id: string;
  heading: string;
  tagline: string;
  toggleShow: string;
  toggleHide: string;
  /** Bỏ qua thì không hiện nút đăng ký trên từng cột gói. */
  ctaLabel?: string;
  includedLabel: string;
  excludedLabel: string;
  mobileTabsLabel: string;
  /** Ghi đè subheading Form 8 khi đăng ký từ bảng so sánh gói */
  registerSubheading?: string;
  packages: [CareWorkPackage, CareWorkPackage, CareWorkPackage];
  groups: CareWorkGroup[];
  notes?: CareWorkNote[];
  /** Bỏ accordion nhóm, hiện thẳng các hàng so sánh */
  flat?: boolean;
  footerLink?: CareWorkFooterLink;
};

const careIncluded = { kind: "included" } as const satisfies CareWorkValue;
const careExcluded = { kind: "excluded" } as const satisfies CareWorkValue;
const careQuota = (label: string): CareWorkValue => ({ kind: "quota", label });
const careQuotaRow = (
  a: string,
  b: string,
  c: string,
): [CareWorkValue, CareWorkValue, CareWorkValue] => [
  careQuota(a),
  careQuota(b),
  careQuota(c),
];
const careAllIncluded: [CareWorkValue, CareWorkValue, CareWorkValue] = [
  careIncluded,
  careIncluded,
  careIncluded,
];
const careFlagRow = (
  a: boolean,
  b: boolean,
  c: boolean,
): [CareWorkValue, CareWorkValue, CareWorkValue] => [
  a ? careIncluded : careExcluded,
  b ? careIncluded : careExcluded,
  c ? careIncluded : careExcluded,
];

export const careWorkComparisonContent = {
  id: "chi-tiet-cong-viec-cham-soc",
  heading: "Chi tiết chăm sóc website",
  tagline:
    "Hãy lựa chọn gói chăm sóc website phù hợp với nhu cầu của bạn.",
  toggleShow: "Xem chi tiết công việc chăm sóc website",
  toggleHide: "Ẩn chi tiết công việc chăm sóc website",
  ctaLabel: "Đăng ký ngay",
  includedLabel: "Bao gồm",
  excludedLabel: "Không bao gồm",
  mobileTabsLabel: "Chọn gói chăm sóc website",
  registerSubheading:
    "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai gói chăm sóc website phù hợp.",
  packages: [
    {
      id: "standard",
      name: "PMLCare Standard",
      shortName: "Standard",
      tagline: "Phù hợp với nhu cầu quản trị website cơ bản",
    },
    {
      id: "pro",
      name: "PMLCare Pro",
      shortName: "Pro",
      tagline: "Phù hợp với nhu cầu cập nhật và tối ưu website thường xuyên",
      featured: true,
    },
    {
      id: "premium",
      name: "PMLCare Premium",
      shortName: "Premium",
      tagline: "Phù hợp với nhu cầu chăm sóc và tối ưu website chuyên sâu",
    },
  ],
  groups: [
    {
      id: "noi-dung",
      title: "Quản trị nội dung website",
      items: [
        {
          id: "cap-nhat-noi-dung",
          label:
            "Cập nhật nội dung do doanh nghiệp cung cấp (Cập nhật tên website, Số điện thoại, Email, địa chỉ cho website)",
          values: careQuotaRow("10 lần/tháng", "15 lần/tháng", "20 lần/tháng"),
        },
        {
          id: "san-pham-dich-vu-tin",
          label: "Tạo, cập nhật, xóa sản phẩm, dịch vụ, tin tức cho website",
          values: careQuotaRow(
            "50 đơn vị/tháng",
            "100 đơn vị/tháng",
            "200 đơn vị/tháng",
          ),
        },
        {
          id: "banner-quan-tri",
          label: "Tạo, cập nhật, xóa Banner cho website theo yêu cầu",
          values: careQuotaRow("10 lần/tháng", "15 lần/tháng", "20 lần/tháng"),
        },
        {
          id: "thiet-ke-banner",
          label: "Thiết kế banner",
          values: careQuotaRow(
            "3 banner/tháng",
            "5 banner/tháng",
            "10 banner/tháng",
          ),
        },
      ],
    },
    {
      id: "giao-dien",
      title: "Quản trị giao diện website",
      items: [
        {
          id: "kieu-chu",
          label: "Thay đổi kiểu chữ toàn website",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "mau-chu-dao",
          label: "Thay đổi màu chủ đạo trên website",
          values: careQuotaRow("1 lần/tháng", "3 lần/tháng", "5 lần/tháng"),
        },
        {
          id: "logo",
          label: "Thay đổi Logo theo yêu cầu (Khách hàng cung cấp logo)",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "menu",
          label: "Sắp xếp vị trí Menu chính theo yêu cầu",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "slide-banner",
          label: "Thay đổi nội dung/hình ảnh Slide, Banner",
          values: careQuotaRow("3 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "trang-don",
          label: "Cập nhật phần trang đơn, nội dung giới thiệu trên trang chủ",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "trinh-bay-san-pham",
          label: "Trình bày sản phẩm trang chủ",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "trinh-bay-dich-vu",
          label: "Trình bày dịch vụ trang chủ",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "trinh-bay-tin-tuc",
          label: "Trình bày tin tức trang chủ",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "an-hien-thanh-phan",
          label: "Ẩn/Hiện các đoạn thành phần trên trang chủ",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "mang-xa-hoi",
          label: "Thay đổi đường dẫn các nút mạng xã hội",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "footer",
          label: "Cập nhật thông tin các cột footer",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
        {
          id: "toi-uu-hinh",
          label: "Tối ưu hình ảnh trên website",
          values: careQuotaRow("2 lần/tháng", "5 lần/tháng", "10 lần/tháng"),
        },
      ],
    },
    {
      id: "ky-thuat",
      title: "Quản trị kỹ thuật website",
      items: [
        {
          id: "bao-tri",
          label:
            "Quản trị, bảo trì, vận hành và xử lý các sự cố phát sinh liên quan đến website",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "sao-luu",
          label:
            "Sao lưu dữ liệu trên website, phục hồi dữ liệu mới nhất khi có sự cố",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "gia-han",
          label:
            "Nhắc nhở gia hạn dịch vụ tên miền (nếu đăng ký hàng năm) để tránh website bị gián đoạn do hết hạn",
          values: [careIncluded, careIncluded, careIncluded],
        },
      ],
    },
    {
      id: "seo",
      title: "Tối ưu SEO cho website",
      items: [
        {
          id: "pagespeed",
          label: "Kiểm tra website thân thiện Google",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "analytics",
          label: "Phân tích lượng truy cập Google Analytics",
          values: [careExcluded, careExcluded, careIncluded],
        },
        {
          id: "google-maps",
          label: "Đăng ký thông tin doanh nghiệp trên Google Maps",
          values: [careExcluded, careExcluded, careIncluded],
        },
        {
          id: "sitemap",
          label: "Sitemap cho website",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "chinh-sua-sitemap",
          label: "Chỉnh sửa sitemap",
          values: [careExcluded, careExcluded, careIncluded],
        },
        {
          id: "redirect-404",
          label: "Chuyển hướng truy cập các link lỗi 404 - không tìm thấy trang",
          values: [careIncluded, careIncluded, careIncluded],
        },
      ],
    },
  ],
} satisfies CareWorkComparisonContent;

/**
 * Bảng so sánh gói thiết kế website trên `/giai-phap`.
 * Layout tái dùng CareWorkDetailsSection; nội dung PMLWeb Standard / Pro / Custom.
 */
export const websitePackageComparisonContent = {
  id: "goi-thiet-ke-website",
  heading: "Giải pháp website linh hoạt cho mọi doanh nghiệp",
  tagline: "Hãy lựa chọn gói thiết kế website phù hợp với nhu cầu của bạn.",
  toggleShow: "Xem chi tiết gói thiết kế website",
  toggleHide: "Ẩn chi tiết gói thiết kế website",
  ctaLabel: "Đăng ký ngay",
  includedLabel: "Bao gồm",
  excludedLabel: "Không bao gồm",
  mobileTabsLabel: "Chọn gói thiết kế website",
  registerSubheading:
    "Để lại thông tin - PML Vietnam sẽ liên hệ tư vấn gói thiết kế website phù hợp.",
  flat: true,

  packages: [
    {
      id: "standard",
      name: "PMLWeb Standard",
      shortName: "Standard",
      tagline:
        "Phù hợp với doanh nghiệp/cá nhân cần một website chuyên nghiệp để giới thiệu thương hiệu, sản phẩm hoặc dịch vụ.",
    },
    {
      id: "pro",
      name: "PMLWeb Pro",
      shortName: "Pro",
      tagline:
        "Phù hợp với doanh nghiệp muốn website có khả năng quản trị nội dung và hỗ trợ hoạt động kinh doanh, marketing.",
      featured: true,
    },
    {
      id: "custom",
      name: "PMLWeb Custom",
      shortName: "Custom",
      tagline:
        "Phù hợp với doanh nghiệp có yêu cầu riêng về tính năng, giao diện hoặc cần xây dựng hệ thống website theo mô hình kinh doanh.",
    },
  ],
  groups: [
    {
      id: "tinh-nang",
      title: "Tính năng",
      items: [
        {
          id: "gia",
          label: "Giá",
          values: careQuotaRow(
            "Từ 4.000.000đ",
            "Từ 5.900.000đ",
            "Từ 7.900.000đ",
          ),
        },
        {
          id: "seo",
          label: "SEO",
          values: careQuotaRow(
            "Giao diện chuẩn SEO",
            "Tối ưu chuẩn SEO",
            "Tối ưu chuẩn SEO",
          ),
        },
        {
          id: "cms",
          label: "CMS",
          values: careQuotaRow(
            "CMS cơ bản",
            "CMS đầy đủ",
            "CMS đầy đủ và tính năng tùy chỉnh",
          ),
        },
        {
          id: "marketing",
          label: "Marketing",
          values: [
            careQuota("Cơ bản"),
            careQuota("Tối ưu cho marketing"),
            careQuota("Tối ưu cho marketing"),
          ],
        },
        {
          id: "ngon-ngu",
          label: "Ngôn ngữ",
          values: careQuotaRow("1", "2", "3+"),
        },
        {
          id: "chuc-nang",
          label: "Tính năng",
          values: careQuotaRow(
            "Tính năng cơ bản",
            "Tính năng nâng cao",
            "Tính năng nâng cao và tích hợp hệ thống khác",
          ),
        },
      ],
    },
  ],
} satisfies CareWorkComparisonContent;

/**
 * Bảng chi tiết tính năng và nội dung website (`/giai-phap`, `/thiet-ke-website`).
 * Layout tái dùng CareWorkDetailsSection (accordion nhóm như chăm sóc website).
 * Nguồn: `public/giai-phap/PML_Vietnam_Tính năng_nội dung_website.xlsx`.
 */
export const websiteFeaturesComparisonContent = {
  id: "tinh-nang-noi-dung-website",
  heading: "Chi tiết tính năng và nội dung website",
  tagline:
    "So sánh tính năng tích hợp và hạn mức hoàn thiện nội dung theo từng gói PMLWeb.",
  toggleShow: "Xem chi tiết tính năng và nội dung website",
  toggleHide: "Ẩn chi tiết tính năng và nội dung website",
  ctaLabel: "Đăng ký ngay",
  includedLabel: "Bao gồm",
  excludedLabel: "Không bao gồm",
  mobileTabsLabel: "Chọn gói thiết kế website",
  registerSubheading:
    "Để lại thông tin - PML Vietnam sẽ liên hệ tư vấn gói thiết kế website phù hợp.",
  packages: websitePackageComparisonContent.packages,
  groups: [
    {
      id: "thong-tin-chung",
      title: "Thông tin chung",
      items: [
        {
          id: "noi-dung-luu-tru",
          label: "Nội dung lưu trữ",
          values: careQuotaRow("1.000 bài", "5.000 bài", "10.000 bài"),
        },
        {
          id: "trang-bo-cuc-luu-tru",
          label: "Trang bố cục lưu trữ",
          values: careQuotaRow("50 trang", "100 trang", "250 trang"),
        },
        {
          id: "mau-website",
          label: "Mẫu website",
          values: careQuotaRow(
            "Hiện đại, cao cấp",
            "Hiện đại, cao cấp",
            "Hiện đại, cao cấp",
          ),
        },
        {
          id: "ngon-ngu-goi",
          label: "Ngôn ngữ",
          values: careQuotaRow("1", "2", "3+"),
        },
        {
          id: "luu-tru-bang-thong",
          label: "Lưu trữ và băng thông",
          values: careQuotaRow(
            "Không giới hạn",
            "Không giới hạn",
            "Không giới hạn",
          ),
        },
        {
          id: "sao-luu-du-lieu",
          label: "Sao lưu dữ liệu",
          values: careQuotaRow("Hàng tuần", "Hàng tuần", "Hàng tuần"),
        },
        {
          id: "cong-cu-quan-tri",
          label: "Công cụ quản trị website",
          values: careAllIncluded,
        },
        {
          id: "ssl",
          label: "Chứng chỉ bảo mật SSL",
          values: careAllIncluded,
        },
        {
          id: "email-thong-bao",
          label: "Email thông báo",
          values: careFlagRow(false, true, true),
        },
        {
          id: "nut-goi-dien",
          label: "Nút gọi điện nhanh",
          values: careAllIncluded,
        },
        {
          id: "nut-chat",
          label: "Nút chat trực tiếp",
          values: careQuotaRow(
            "Zalo, Messenger",
            "Zalo, Messenger, trợ lý AI",
            "Zalo, Messenger, trợ lý AI",
          ),
        },
        {
          id: "tuy-chinh-logo-banner",
          label: "Tùy chỉnh logo, hero banner",
          values: careAllIncluded,
        },
        {
          id: "tuy-chinh-chan-trang",
          label: "Tùy chỉnh nội dung chân trang",
          values: careAllIncluded,
        },
        {
          id: "them-tinh-nang",
          label: "Thêm tính năng website",
          values: careFlagRow(false, true, true),
        },
      ],
    },
    {
      id: "cong-cu-seo",
      title: "Công cụ hỗ trợ SEO",
      items: [
        {
          id: "toi-uu-google",
          label: "Tối ưu hiển thị Google",
          values: careAllIncluded,
        },
        {
          id: "so-do-website",
          label: "Sơ đồ website & Lập chỉ mục",
          values: careAllIncluded,
        },
        {
          id: "loi-ky-thuat-seo",
          label: "Kiểm soát lỗi kỹ thuật SEO",
          values: careAllIncluded,
        },
        {
          id: "trinh-soan-thao-seo",
          label: "Trình soạn thảo chuẩn SEO",
          values: careAllIncluded,
        },
        {
          id: "seo-ban-hang",
          label: "SEO cho website bán hàng",
          values: careAllIncluded,
        },
        {
          id: "google-analytics",
          label: "Google Analytics",
          values: careAllIncluded,
        },
        {
          id: "google-search-console",
          label: "Google Search Console",
          values: careAllIncluded,
        },
        {
          id: "meta-pixel",
          label: "Meta Pixel",
          values: careAllIncluded,
        },
      ],
    },
    {
      id: "quan-ly-ban-hang",
      title: "Quản lý bán hàng",
      items: [
        {
          id: "san-pham",
          label: "Sản phẩm",
          values: careAllIncluded,
        },
        {
          id: "danh-muc-san-pham",
          label: "Danh mục sản phẩm",
          values: careAllIncluded,
        },
        {
          id: "thuoc-tinh-san-pham",
          label: "Thuộc tính sản phẩm",
          values: careAllIncluded,
        },
        {
          id: "gio-hang",
          label: "Giỏ hàng",
          values: careFlagRow(false, true, true),
        },
        {
          id: "thanh-toan",
          label: "Thanh toán",
          values: careFlagRow(false, true, true),
        },
        {
          id: "don-hang",
          label: "Đơn hàng",
          values: careFlagRow(false, true, true),
        },
        {
          id: "ton-kho",
          label: "Tồn kho",
          values: careFlagRow(false, true, true),
        },
        {
          id: "khach-hang",
          label: "Khách hàng",
          values: careFlagRow(false, true, true),
        },
        {
          id: "khuyen-mai",
          label: "Khuyến mãi",
          values: careFlagRow(false, true, true),
        },
        {
          id: "bao-cao-kinh-doanh",
          label: "Báo cáo kinh doanh",
          values: careFlagRow(false, false, true),
        },
        {
          id: "chuyen-khoan-qr",
          label: "Chuyển khoản ngân hàng (Mã QR)",
          values: careFlagRow(false, true, true),
        },
        {
          id: "cong-thanh-toan",
          label: "Kết nối cổng thanh toán",
          values: careFlagRow(false, true, true),
        },
        {
          id: "don-vi-van-chuyen",
          label: "Kết nối đơn vị vận chuyển",
          values: careFlagRow(false, false, true),
        },
      ],
    },
    {
      id: "hoan-thien-noi-dung",
      title: "Hoàn thiện nội dung",
      items: [
        {
          id: "nhap-lieu",
          label: "Nhập liệu nội dung",
          values: careQuotaRow("60 ĐVT", "150 ĐVT", "250 ĐVT"),
        },
        {
          id: "thiet-ke-banner",
          label: "Thiết kế Banner / Poster",
          values: careQuotaRow("3 banner", "6 banner", "12 banner"),
        },
        {
          id: "doi-mau-kieu-chu",
          label: "Thay đổi màu sắc, kiểu chữ",
          values: careQuotaRow("1 lần", "3 lần", "5 lần"),
        },
        {
          id: "doi-trang-bo-cuc",
          label: "Thay đổi trang bố cục",
          values: careQuotaRow("1 lần", "3 lần", "5 lần"),
        },
      ],
    },
    {
      id: "xu-ly-hinh-anh",
      title: "Xử lý hình ảnh",
      items: [
        {
          id: "doi-kich-thuoc-anh",
          label: "Thay đổi kích thước ảnh",
          values: careAllIncluded,
        },
        {
          id: "tang-chat-luong-anh",
          label: "Tăng chất lượng ảnh",
          values: careAllIncluded,
        },
        {
          id: "tim-kiem-hinh-anh",
          label: "Tìm kiếm hình ảnh",
          values: careAllIncluded,
        },
        {
          id: "hieu-ung-anh-sang",
          label: "Chỉnh hiệu ứng ánh sáng",
          values: careAllIncluded,
        },
        {
          id: "cat-nen-anh",
          label: "Cắt nền ảnh",
          values: careAllIncluded,
        },
        {
          id: "chen-logo-anh",
          label: "Chèn logo vào ảnh",
          values: careAllIncluded,
        },
      ],
    },
    {
      id: "sang-tao-noi-dung",
      title: "Sáng tạo nội dung",
      items: [
        {
          id: "sang-tao-noi-dung-website",
          label: "Sáng tạo nội dung website",
          values: careAllIncluded,
        },
        {
          id: "dang-noi-dung",
          label: "Đăng nội dung lên website",
          values: careAllIncluded,
        },
      ],
    },
    {
      id: "kenh-ho-tro",
      title: "Kênh hỗ trợ kỹ thuật",
      items: [
        {
          id: "ho-tro-email",
          label: "Email",
          values: careAllIncluded,
        },
        {
          id: "ho-tro-dien-thoai",
          label: "Điện thoại",
          values: careAllIncluded,
        },
        {
          id: "ho-tro-zalo",
          label: "Zalo chat",
          values: careAllIncluded,
        },
        {
          id: "chia-se-man-hinh",
          label: "Chia sẻ màn hình",
          values: careAllIncluded,
        },
      ],
    },
  ],
} satisfies CareWorkComparisonContent;

/**
 * Bảng so sánh gói thiết kế logo / nhận diện (`/thiet-ke-nhan-dien-thuong-hieu`).
 * Nguồn: `public/nhan-dien-thuong-hieu/Nhan_dien_thuong_hieu_Logo.xlsx`.
 */
export const brandingWorkComparisonContent = {
  id: "chi-tiet-goi-nhan-dien",
  heading: "Chi tiết gói nhận diện",
  tagline:
    "So sánh hạn mức thiết kế logo theo từng gói PMLGo. Chọn gói phù hợp quy mô thương hiệu của bạn.",
  toggleShow: "Xem chi tiết các gói thiết kế logo",
  toggleHide: "Ẩn chi tiết các gói thiết kế logo",
  ctaLabel: "Đăng ký ngay",
  registerSubheading:
    "Để lại thông tin - PML Vietnam sẽ liên hệ tư vấn và triển khai gói logo phù hợp.",
  includedLabel: "Bao gồm",
  excludedLabel: "Không bao gồm",
  mobileTabsLabel: "Chọn gói thiết kế logo",
  packages: [
    {
      id: "standard",
      name: "PMLGo Standard",
      shortName: "Standard",
      tagline:
        "Thiết kế logo cơ bản, phù hợp nhu cầu xây dựng thương hiệu ban đầu.",
    },
    {
      id: "pro",
      name: "PMLGo Pro",
      shortName: "Pro",
      tagline:
        "Thiết kế logo chuyên nghiệp, phù hợp doanh nghiệp cần hình ảnh thương hiệu chỉn chu.",
      featured: true,
    },
    {
      id: "premium",
      name: "PMLGo Premium",
      shortName: "Premium",
      tagline:
        "Thiết kế logo chuyên sâu, phù hợp doanh nghiệp muốn xây dựng nhận diện thương hiệu bài bản.",
    },
  ],
  groups: [
    {
      id: "thiet-ke-logo",
      title: "Thiết kế logo",
      items: [
        {
          id: "ban-demo",
          label: "Số bản demo",
          values: careQuotaRow("2 bản demo", "4 bản demo", "6 bản demo"),
        },
        {
          id: "thoi-gian",
          label: "Thời gian thiết kế",
          values: careQuotaRow("1-2 ngày", "1-2 ngày", "1-2 ngày"),
        },
        {
          id: "chinh-sua",
          label: "Số lần chỉnh sửa",
          values: careQuotaRow(
            "5 lần",
            "Đến khi hài lòng",
            "Đến khi hài lòng",
          ),
        },
        {
          id: "ho-tro-ky-thuat",
          label: "Kỹ thuật hỗ trợ riêng",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "mockup",
          label: "Demo kèm mockup phối cảnh",
          values: [careIncluded, careIncluded, careIncluded],
        },
        {
          id: "doi-thu",
          label: "Kiểm tra đối thủ cùng ngành",
          values: careQuotaRow("50 đối thủ", "100 đối thủ", "200 đối thủ"),
        },
        {
          id: "ban-giao",
          label: "File bàn giao",
          values: careQuotaRow(
            "PNG, JPEG, PDF, AI",
            "PNG, JPEG, PDF, AI",
            "PNG, JPEG, PDF, AI",
          ),
        },
      ],
    },
  ],
  notes: [
    {
      id: "an-pham",
      title: "Ấn phẩm thương hiệu",
      body: "Thiết kế đồng bộ các ấn phẩm thương hiệu, từ namecard, profile đến bao bì, poster và biển bảng. Giúp doanh nghiệp xây dựng hình ảnh chuyên nghiệp và nhất quán.",
    },
    {
      id: "bao-ho",
      title: "Bảo hộ thương hiệu",
      body: "Sau khi hoàn thiện logo, PML Vietnam hỗ trợ khách hàng đăng ký quyền tác giả cho logo hoặc đăng ký nhãn hiệu tại Cục Sở hữu trí tuệ, giúp bảo vệ tài sản thương hiệu và hạn chế rủi ro bị sao chép hoặc sử dụng trái phép. Dịch vụ hỗ trợ gồm: tư vấn hình thức bảo hộ phù hợp, kiểm tra sơ bộ khả năng đăng ký, chuẩn bị hồ sơ và hỗ trợ thủ tục nộp đơn.",
    },
  ],
} satisfies CareWorkComparisonContent;

/** Trang /cham-soc-website */
export const careServiceContent = {
  hero: {
    eyebrow: "Vận hành bền vững",
    headline: "Chăm sóc website — bảo trì, bảo mật, cập nhật nội dung",
    bullets: [
      "Theo dõi uptime và xử lý sự cố",
      "Cập nhật bảo mật, sao lưu định kỳ",
      "Hỗ trợ chỉnh nội dung khi bạn cần",
      "Tối ưu tốc độ theo thời gian",
      "Đầu mối kỹ thuật rõ ràng, phản hồi nhanh",
    ],
    ctaLabel: "Đăng ký ngay",
    autoplayMs: 5000,
    banners: [
      {
        src: "/cham-soc-website/banner_cham_soc_website.webp",
        alt: "Dịch vụ chăm sóc website — PML Vietnam",
      },
      {
        src: "/cham-soc-website/banner_website_maintenance.webp",
        alt: "Website maintenance service — PML Vietnam",
      },
    ],
  },
  intro: {
    id: "gioi-thieu-cham-soc",
    heading: "Website cần được chăm sóc sau ngày bàn giao",
    intro:
      "Ra mắt chỉ là bước đầu. PML Vietnam nhận chăm sóc website để site luôn chạy, an toàn và cập nhật — bạn tập trung kinh doanh, phần kỹ thuật có đội ngũ theo sát.",
    highlightTitle: "Chăm sóc website phù hợp khi bạn…",
    points: [
      "Không có nhân sự IT nội bộ để theo plugin, hosting, SSL, backup.",
      "Cần chỉnh banner, bài viết, form mà không muốn tự mò hệ thống.",
      "Muốn có người xử lý khi site chậm, lỗi hoặc bị spam.",
    ],
    note: "Gói chăm sóc áp dụng cho website PML Vietnam triển khai hoặc site sẵn có sau khi khảo sát.",
    image: {
      src: "/cham-soc-website/banner_cham_soc_website.webp",
      alt: "Dịch vụ chăm sóc website — PML Vietnam",
    },
  },
  cost: {
    id: "chi-phi-cham-soc",
    heading: "Chi phí chăm sóc website tính như thế nào?",
    body: "Thường theo gói tháng / quý tùy mức hỗ trợ: chỉ bảo trì kỹ thuật, hay kèm cập nhật nội dung. PML Vietnam khảo sát hiện trạng rồi đề xuất gói rõ việc — không phát sinh hạng mục mơ hồ.",
  },
  why: {
    ...whyChooseContent,
    heading: "Tại sao giao chăm sóc website cho PML Vietnam?",
    subheading:
      "Cùng đội ngũ hiểu website của bạn — xử lý nhanh, bảo mật và vận hành ổn định.",
  },
  details: {
    id: "chi-tiet-cham-soc",
    heading: "Gói chăm sóc website thường bao gồm",
    items: [
      "Theo dõi hoạt động, xử lý sự cố và hỗ trợ kỹ thuật qua kênh đã chốt.",
      "Sao lưu định kỳ, theo dõi SSL và các bản vá bảo mật cần thiết.",
      "Hỗ trợ cập nhật nội dung trong hạn mức gói (banner, bài, thông tin liên hệ).",
      "Tư vấn cải thiện tốc độ / SEO kỹ thuật khi phát hiện vấn đề.",
    ],
  },
  workComparison: careWorkComparisonContent,
  process: {
    ...processStepsContent,
    heading: "Quy trình nhận chăm sóc website tại PML Vietnam",
  },
  faq: {
    heading: "Câu hỏi thường gặp về chăm sóc website",
    image: faqContent.image,
    items: [
      {
        id: "care-faq-1",
        question: "Website không làm tại PML Vietnam có thuê chăm sóc được không?",
        answer:
          "Có, sau khi khảo sát công nghệ và quyền truy cập. Một số hệ thống đặc thù sẽ được báo phạm vi rõ trước khi nhận.",
      },
      {
        id: "care-faq-2",
        question: "Sự cố ngoài giờ có được hỗ trợ không?",
        answer:
          "Mức SLA (thời gian phản hồi, ngoài giờ) phụ thuộc gói đã ký. Gói tiêu chuẩn xử lý trong giờ làm việc; sự cố nghiêm trọng được ưu tiên theo thỏa thuận.",
      },
      {
        id: "care-faq-3",
        question: "Chăm sóc có gồm viết bài SEO không?",
        answer:
          "Cập nhật nội dung kỹ thuật (đăng bài bạn soạn, sửa trang) nằm trong gói. Viết nội dung SEO chuyên sâu là hạng mục riêng nếu bạn cần.",
      },
      {
        id: "care-faq-4",
        question: "Tôi có thể hủy gói khi không còn nhu cầu?",
        answer:
          "Có. Điều khoản gia hạn / chấm dứt được ghi trong hợp đồng hoặc báo giá gói chăm sóc.",
      },
    ] satisfies FaqItem[],
  },
};

/**
 * Bảng so sánh gói viết bài SEO (`/seo-content`).
 * Nguồn: Google Doc PML Content — 3 gói Standard / Pro / Premium.
 */
export const contentWorkComparisonContent = {
  id: "chi-phi-pml-content",
  heading: "Chi phí dịch vụ viết bài SEO Content",
  tagline:
    "So sánh hạn mức, độ sâu SEO và mức giá để chọn đúng nhu cầu theo từng gói PML Content.",
  toggleShow: "Xem chi tiết gói viết bài SEO Content",
  toggleHide: "Ẩn chi tiết gói viết bài SEO Content",
  ctaLabel: "Đăng ký ngay",
  includedLabel: "Bao gồm",
  excludedLabel: "Không bao gồm",
  mobileTabsLabel: "Chọn gói PML Content",
  registerSubheading:
    "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai gói SEO Content phù hợp.",
  flat: true,
  packages: [
    {
      id: "standard",
      name: "PML Content Standard",
      shortName: "Standard",
      tagline:
        "Phù hợp với nhu cầu viết nội dung cơ bản, cập nhật tin tức, sản phẩm/dịch vụ định kỳ cho website.",
      price: "140.000 đ/bài",
    },
    {
      id: "pro",
      name: "PML Content Pro",
      shortName: "Pro",
      tagline:
        "Phù hợp với doanh nghiệp cần nội dung có chiều sâu hơn, tối ưu SEO kỹ hơn, tần suất đăng bài đều đặn.",
      featured: true,
      price: "220.000 đ/bài",
    },
    {
      id: "premium",
      name: "PML Content Premium (VIP)",
      shortName: "Premium",
      tagline:
        "Dành cho doanh nghiệp muốn đầu tư nội dung chất lượng cao, mang tính chiến lược dài hạn.",
      price: "290.000 đ/bài",
    },
  ],
  groups: [
    {
      id: "goi-viet-bai",
      title: "Hạng mục gói viết bài",
      items: [
        {
          id: "so-luong",
          label: "Số lượng tối thiểu",
          values: careQuotaRow(
            "Từ 5 bài / đơn hàng",
            "Từ 10 bài / đơn hàng",
            "Từ 20 bài / đơn hàng",
          ),
        },
        {
          id: "do-dai",
          label: "Độ dài bài viết",
          values: careQuotaRow(
            "800 – 1.000 từ/bài",
            "1.200 – 1.500 từ/bài",
            "1.800 – 2.500 từ/bài",
          ),
        },
        {
          id: "toi-uu-seo",
          label: "Tối ưu SEO",
          values: careQuotaRow(
            "Tối ưu từ khóa chính, tiêu đề, thẻ mô tả cơ bản",
            "Nghiên cứu từ khóa phụ, cấu trúc heading chuẩn SEO",
            "Nghiên cứu chuyên sâu đối thủ & thị trường ngành",
          ),
        },
        {
          id: "noi-dung-van-phong",
          label: "Nội dung / văn phong",
          values: careQuotaRow(
            "Rõ ràng, đúng chính tả, dễ đọc, phù hợp đại trà",
            "Lồng ghép insight khách hàng, tăng khả năng chuyển đổi",
            "Nội dung độc quyền, tối ưu toàn diện: từ khóa, cấu trúc, CTA",
          ),
        },
        {
          id: "tu-khoa-chinh",
          label: "Tối ưu từ khóa chính, tiêu đề, thẻ mô tả",
          values: careAllIncluded,
        },
        {
          id: "tu-khoa-phu-heading",
          label: "Từ khóa phụ và cấu trúc heading chuẩn SEO",
          values: careFlagRow(false, true, true),
        },
        {
          id: "insight-chuyen-doi",
          label: "Insight khách hàng, tăng khả năng chuyển đổi",
          values: careFlagRow(false, true, true),
        },
        {
          id: "doi-thu-thi-truong",
          label: "Nghiên cứu đối thủ và thị trường ngành",
          values: careFlagRow(false, false, true),
        },
        {
          id: "cta-toan-dien",
          label: "Tối ưu CTA và cấu trúc bài toàn diện",
          values: careFlagRow(false, false, true),
        },
        {
          id: "doc-quyen",
          label: "Nội dung độc quyền, kiểm tra trùng lặp trước bàn giao",
          values: careAllIncluded,
        },
      ],
    },
  ],
  notes: [
    {
      id: "gia-linh-hoat",
      title: "Chi phí linh hoạt theo yêu cầu",
      body: "Chi phí có thể thay đổi tùy độ dài bài viết, mức độ nghiên cứu từ khóa và yêu cầu chuyên sâu của từng ngành.",
    },
  ],
} satisfies CareWorkComparisonContent;

/** Trang /seo-content */
export const contentServiceContent = {
  hero: {
    eyebrow: "Giải pháp SEO website",
    headline: "Dịch vụ viết bài SEO Content chuyên nghiệp",
    bullets: [
      "Nội dung chuẩn SEO, tối ưu từ khóa theo đúng ngành nghề",
      "Đội ngũ Content nắm rõ hành vi tìm kiếm & thuật toán Google",
      "Cam kết nội dung độc quyền, không trùng lặp, không đạo văn",
      "Bàn giao đúng tiến độ, hỗ trợ chỉnh sửa theo yêu cầu",
      "Đa dạng gói dịch vụ, phù hợp mọi ngân sách doanh nghiệp",
    ],
    ctaLabel: "Đăng ký ngay",
    ctaSubheading:
      "Để lại thông tin — PML Vietnam sẽ liên hệ tư vấn và triển khai gói SEO Content phù hợp.",
    autoplayMs: 5000,
    banners: [
      {
        src: "/pml-content/banner_seo_content.webp",
        alt: "SEO Content — PML Vietnam",
      },
      {
        src: "/pml-content/banner_seo_strategy.webp",
        alt: "SEO Strategy — PML Vietnam",
      },
    ],
  },
  intro: {
    id: "gioi-thieu-pml-content",
    heading: "Vì sao doanh nghiệp cần viết bài chuẩn SEO?",
    intro:
      "Một website đẹp nhưng không có nội dung chất lượng thì rất khó lên top Google. Bài viết chuẩn SEO không chỉ giúp website được công cụ tìm kiếm đánh giá cao mà còn mang lại nhiều lợi ích thiết thực cho doanh nghiệp.",
    highlightTitle: "Bạn nhận được gì khi website có nội dung chuẩn SEO?",
    points: [
      "Tăng khả năng hiển thị website trên trang kết quả tìm kiếm (SERP).",
      "Thu hút đúng khách hàng tiềm năng đang có nhu cầu thực sự.",
      "Xây dựng uy tín thương hiệu thông qua nội dung giá trị, chuyên sâu.",
      "Tiết kiệm chi phí quảng cáo về lâu dài so với chạy ads liên tục.",
      "Hỗ trợ chuyển đổi tốt hơn nhờ nội dung đánh trúng insight khách hàng.",
    ],
    note: "Nếu website của bạn chưa có chiến lược nội dung bài bản, đây chính là lúc cần đầu tư vào dịch vụ viết bài chuẩn SEO.",
    image: {
      src: "/pml-content/banner_seo_strategy.webp",
      alt: "SEO Strategy — PML Vietnam",
    },
  },
  costPackages: contentWorkComparisonContent,
  why: {
    ...whyChooseContent,
    heading: "Tại sao giao viết bài SEO Content cho PML Vietnam?",
    subheading:
      "Đội ngũ Content nắm hành vi tìm kiếm và thuật toán Google — nội dung độc quyền, đúng ngành, đúng tiến độ.",
  },
  details: {
    id: "ban-nhan-duoc-pml-content",
    heading: "Bạn nhận được gì khi sử dụng dịch vụ PML Content?",
    items: [
      "Bài viết hoàn chỉnh, tối ưu chuẩn SEO Onpage.",
      "Nghiên cứu từ khóa phù hợp với ngành nghề, khu vực kinh doanh.",
      "Văn phong tự nhiên, dễ đọc, phù hợp đối tượng khách hàng mục tiêu.",
      "Cam kết nội dung độc quyền, kiểm tra trùng lặp trước khi bàn giao.",
      "Hỗ trợ chỉnh sửa theo góp ý sau khi bàn giao (trong phạm vi thỏa thuận).",
      "Thời gian bàn giao rõ ràng theo từng gói dịch vụ.",
    ],
  },
  process: {
    ...processStepsContent,
    heading: "Quy trình nhận viết bài SEO Content tại PML Vietnam",
  },
  faq: {
    heading: "Câu hỏi thường gặp về dịch vụ viết bài SEO Content",
    image: faqContent.image,
    items: [
      {
        id: "content-faq-1",
        question:
          "Tôi có thể chọn gói dịch vụ nào phù hợp với ngân sách của mình?",
        answer:
          "PML Vietnam có 3 gói: Standard, Pro và Premium (VIP), tương ứng với các mức chi phí và độ chuyên sâu khác nhau. Bạn có thể trao đổi trực tiếp để được tư vấn gói phù hợp nhất với nhu cầu và ngân sách.",
      },
      {
        id: "content-faq-2",
        question: "Nội dung bài viết có đảm bảo không trùng lặp không?",
        answer:
          "Có. Mỗi bài viết đều được kiểm tra độ trùng lặp trước khi bàn giao cho khách hàng, đảm bảo nội dung độc quyền.",
      },
      {
        id: "content-faq-3",
        question: "Sau khi nhận bài, tôi có được chỉnh sửa lại không?",
        answer:
          "Có, bạn sẽ được hỗ trợ chỉnh sửa theo góp ý trong phạm vi thỏa thuận ban đầu để đảm bảo nội dung đúng ý và đúng định hướng thương hiệu.",
      },
      {
        id: "content-faq-4",
        question: "Thời gian bàn giao bài viết mất bao lâu?",
        answer:
          "Thời gian bàn giao phụ thuộc vào gói dịch vụ và số lượng/độ dài bài viết, sẽ được thông báo rõ khi nhận yêu cầu cụ thể.",
      },
      {
        id: "content-faq-5",
        question: "Dịch vụ này có bao gồm hình ảnh minh họa không?",
        answer:
          "Dịch vụ tập trung vào nội dung văn bản chuẩn SEO. Hình ảnh minh họa (nếu cần) sẽ được trao đổi riêng theo yêu cầu.",
      },
    ] satisfies FaqItem[],
  },
};

/**
 * Trang pháp lý `/chinh-sach-bao-mat` và `/dieu-khoan-su-dung`.
 * Nội dung từ `public/chinh-sach-bao-mat/` và `public/dieu-khoan-su-dung/`.
 */
export type LegalListItem = string | { text: string; children?: string[] };

export type LegalDocumentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; items: LegalListItem[]; ordered?: boolean }
  | { type: "image"; src: string; alt: string }
  | {
      type: "note";
      title: string;
      text: string;
      contacts: Array<{
        label: string;
        value: string;
        href: string;
        external?: boolean;
      }>;
    };

export type LegalPageContent = {
  heading: string;
  description: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  tocLabel?: string;
  /** Xuống dòng trước cụm này để không tách giữa các từ (vd. "PML Vietnam"). */
  headingLineBreakBefore?: string;
  blocks: LegalDocumentBlock[];
};

export const privacyPolicyPageContent: LegalPageContent = {
  heading: "Chính sách bảo mật thông tin",
  description:
    "Chính sách bảo mật thông tin này nhằm giúp quý khách hiểu về cách website thu thập và sử dụng thông tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể cung cấp thông qua trang web khi khách hàng đăng ký các gói dịch vụ hoặc gửi thư góp ý về sản phẩm, dịch vụ của PML Vietnam.",
  breadcrumbHome: "Trang chủ",
  breadcrumbCurrent: "Chính sách bảo mật",
  blocks: [
    {
      type: "image",
      src: "/chinh-sach-bao-mat/chinh_sach_bao_mat.webp",
      alt: "Minh họa chính sách bảo mật thông tin PML Vietnam",
    },
    {
      type: "heading",
      level: 2,
      text: "1. PML Vietnam thu thập thông tin khách hàng từ đâu?",
    },
    {
      type: "list",
      items: [
        "Nhận thông tin khách hàng qua mẫu đăng ký thông tin được đặt trên trang chủ, và các trang con trên website của PML Vietnam.",
        "Thông tin khách hàng để lại qua các kênh khác nhau hay thông qua các cuộc khảo sát/ đăng ký trực tiếp trên website.",
        "Thông tin người dùng có thể bao gồm: Họ tên, số điện thoại, email, tên đơn vị/ công ty, …",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "2. Mục đích sử dụng thông tin khách hàng",
    },
    {
      type: "list",
      items: [
        "Gửi thông báo liên quan đến các dịch vụ và tài khoản bao gồm: Hướng dẫn quản trị web, báo giá, thông tin gia hạn, thông báo kế hoạch bảo trì hay nâng cấp dịch vụ…",
        "Gửi thông báo liên quan đến các sự kiện quan trọng, chương trình khuyến mãi, ưu đãi của PML Vietnam.",
        "Giải đáp các thắc mắc hay cung cấp thông tin tư vấn dịch vụ cho khách hàng.",
        "Khảo sát ý kiến khách hàng để nâng cao chất lượng dịch vụ hay tìm hiểu các nhu cầu khác của khách hàng.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "3. Vấn đề bảo mật thông tin khách hàng",
    },
    {
      type: "paragraph",
      text: "PML Vietnam luôn hiểu rằng việc bảo mật thông tin khách hàng là vô cùng quan trọng. Chúng tôi cam kết không bán, cho thuê hay chia sẻ thông tin của khách hàng với bất kỳ ai. Tuy nhiên trong trường hợp người dùng có dấu hiệu vi phạm các điều khoản dịch vụ, chúng tôi có thể tiết lộ thông tin cá nhân để phục vụ yêu cầu của luật pháp.",
    },
    {
      type: "image",
      src: "/chinh-sach-bao-mat/chinh_sach_bao_mat_1.webp",
      alt: "Minh họa bảo mật thông tin khách hàng PML Vietnam",
    },
    {
      type: "heading",
      level: 2,
      text: "4. Vấn đề lưu trữ dữ liệu khách hàng",
    },
    {
      type: "paragraph",
      text: "Tất cả thông tin liên quan đến khách hàng của PML Vietnam đều được lưu trữ thành cơ sở dữ liệu trên hệ thống và sẽ kết thúc khi khách hàng chấm dứt sử dụng dịch vụ tại công ty.",
    },
    {
      type: "heading",
      level: 2,
      text: "5. Thay đổi chính sách bảo mật",
    },
    {
      type: "paragraph",
      text: "PML Vietnam có quyền thay đổi chính sách bảo mật bất cứ lúc nào, tuy nhiên trước mỗi thay đổi, chúng tôi sẽ thông báo trên trang chủ hoặc gửi email thông báo đến quý khách hàng.",
    },
    {
      type: "note",
      title: "Quý khách hàng lưu ý",
      text: "Nếu có bất kỳ thắc mắc hay góp ý liên quan đến chính sách bảo mật của PML Vietnam, quý khách vui lòng liên hệ đến:",
      contacts: [
        {
          label: "Địa chỉ",
          value: siteContact.address,
          href: siteContact.mapsUrl,
          external: true,
        },
        {
          label: "Hotline/Zalo",
          value: siteContact.phoneDisplay,
          href: `tel:${siteContact.phoneTel}`,
        },
        {
          label: "Email",
          value: siteContact.email,
          href: `mailto:${siteContact.email}`,
        },
      ],
    },
  ],
};

/**
 * Trang Điều khoản sử dụng (`/dieu-khoan-su-dung`).
 * Nội dung từ `public/dieu-khoan-su-dung/Điều khoản sử dụng.docx`.
 */
export const termsOfUsePageContent: LegalPageContent = {
  heading: "Điều khoản sử dụng dịch vụ của PML Vietnam",
  headingLineBreakBefore: "PML Vietnam",
  description:
    "Cập nhật một số điều khoản sử dụng dịch vụ của PML Vietnam để khách hàng hiểu rõ hơn về những quy định cần tuân thủ, qua đó hỗ trợ việc hợp tác nhanh chóng, đạt hiệu quả cao hơn.",
  breadcrumbHome: "Trang chủ",
  breadcrumbCurrent: "Điều khoản sử dụng",
  tocLabel: "Nội dung",
  blocks: [
    {
      type: "image",
      src: "/dieu-khoan-su-dung/dieu_khoan_su_dung.webp",
      alt: "Điều khoản sử dụng dịch vụ PML Vietnam",
    },
    {
      type: "heading",
      level: 2,
      id: "dieu-khoan-chung",
      text: "I. Điều khoản chung",
    },
    {
      type: "list",
      items: [
        "Khách hàng phải đủ 18 tuổi trở lên.",
        "Cần cung cấp đầy đủ, chính xác các thông tin cá nhân cơ bản, địa chỉ, email… và các thông tin khác cho PML Vietnam.",
        "Khi sử dụng dịch vụ của PML Vietnam, khách hàng cần tuân thủ các điều khoản chúng tôi đề ra.",
        "Đối tượng áp dụng: Tất cả người sử dụng dịch vụ PML Vietnam bao gồm các cá nhân, đơn vị, tổ chức, doanh nghiệp hay đại diện của họ.",
        "Với việc đăng ký sử dụng dịch vụ, khách hàng được coi là đồng ý với các điều khoản và bị ràng buộc bởi những điều khoản do chúng tôi đề ra.",
        "Trong quá trình tối ưu, các điều khoản sẽ có thể thay đổi vào từng thời điểm, bên mua cần chấp nhận các điều khoản đã được sửa đổi của bên cung cấp.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "dieu-khoan-su-dung-website",
      text: "II. Điều khoản sử dụng website",
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: "Khách hàng (bên mua) cam kết và tự chịu trách nhiệm với PML Vietnam (bên cung cấp) sử dụng website của mình vào những mục đích hợp pháp.",
          children: [
            "Không được sử dụng các dịch vụ Internet vào bất cứ mục đích nào liên quan đến vi phạm Pháp luật Việt Nam như phá hoại an ninh quốc gia, gây rối trật tự xã hội, làm tổn hại thuần phong mỹ tục hoặc kinh doanh bất hợp pháp.",
            "Có trách nhiệm kiểm soát, ngăn cấm các đối tượng khác thực hiện điều đó trên trang web của mình.",
          ],
        },
        "Chịu trách nhiệm về tính xác thực của các thông tin đăng tải trên website.",
        {
          text: "Tuân thủ các quy định của Pháp luật về quyền sở hữu công nghiệp, bản quyền.",
          children: [
            "Tuân thủ theo đúng các quy định của Nhà nước về sử dụng dịch vụ Internet, quảng cáo và các điều khoản đã thỏa thuận giữa bên mua và bên cung cấp dịch vụ.",
          ],
        },
        "Khách hàng cần tự bảo quản mật khẩu hay thông tin liên quan đến tài khoản quản trị web của mình. Khi có sự cố liên quan như mất, để lộ các thông tin về mật khẩu/ thông tin bảo mật khác hay phát hiện các hành vi truy cập web trái phép bằng tài khoản của mình, khách hàng cần báo lại ngay cho PML Vietnam. Tuy nhiên, PML Vietnam sẽ không chịu bất kỳ trách nhiệm nào liên quan đến việc người sử dụng không giữ an toàn các tài khoản quản trị mà chúng tôi đã cung cấp.",
        "Bên cung cấp sẽ sao lưu dữ liệu định kỳ hàng tuần, đảm bảo an toàn dữ liệu và tính thông suốt của website cho bên mua nhưng sẽ không chịu trách nhiệm bồi thường dữ liệu trong trường hợp hệ thống máy chủ bị gián đoạn do các sự cố bất khả kháng như thiên tai, hỏa hoạn, hệ thống máy chủ hỏng vật lý phần cứng.",
        "Đối với trường hợp khách hàng khiếu nại: PML Vietnam sẽ nhanh chóng giải quyết khiếu nại của khách hàng về chất lượng dịch vụ trong phạm vi trách nhiệm của chúng tôi.",
        "Đối với khách hàng sử dụng dịch vụ không theo đúng cam kết đã thỏa thuận, PML Vietnam có quyền đơn phương tạm ngừng hay chấm dứt cung cấp dịch vụ mà không cần phải thông báo trước.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "dieu-khoan-thanh-toan",
      text: "III. Điều khoản thanh toán",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Ngay sau khi ký hợp đồng, khách hàng cần có trách nhiệm thanh toán 100% các khoản phí đã ghi trong hợp đồng, có thể lựa chọn một trong số các hình thức thanh toán theo quy định. Các khoản phí sẽ không hoàn trả lại khi khách hàng tự chấm dứt hợp đồng.",
        "Chủ động nộp phí duy trì dịch vụ trước khi hết hạn dịch vụ. Trường hợp đã đóng phí gia hạn, khách hàng cần có trách nhiệm lưu lại các chứng từ liên quan.",
        "Mọi thay đổi liên quan đến hợp đồng phải có văn bản đề nghị đối phương trước bảy ngày để giải quyết. Toàn bộ chi phí phát sinh sau thay đổi do nguyên nhân từ bên nào thì bên đó có trách nhiệm thanh toán đầy đủ.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "dieu-khoan-khac",
      text: "IV. Một số điều khoản khác",
    },
    {
      type: "list",
      items: [
        "Đối với trường hợp khách hàng bằng bất kỳ lý do gì không cung cấp nội dung thông tin liên quan đến website của mình cho PML Vietnam thực hiện công việc, chúng tôi sẽ không chịu trách nhiệm về tiến độ triển khai hợp đồng.",
        "Đối với trường hợp khách hàng có nhu cầu mở rộng tính năng, tăng thêm thông số kỹ thuật trang web, hợp đồng mới sẽ được lập chi tiết dựa theo yêu cầu của khách hàng.",
        "Đối với trường hợp xảy ra sự cố bất khả kháng như thiên tai, hỏa hoạn, thảm họa… hai bên sẽ bàn bạc và xem xét về thời gian thực hiện tiếp hợp đồng.",
      ],
    },
  ],
};

