# -*- coding: utf-8 -*-
"""Convert extracted Word copy into TypeScript NewsArticle blocks."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(r"d:\pmlvietnam")
EXTRACT = ROOT / "local" / "seo-content" / "_docx-extract"
PUBLIC = ROOT / "public" / "tin-tuc"
OUT = ROOT / "lib" / "news-pml-content-articles.ts"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from docx_rich import apply_rich, rich_lookup  # noqa: E402

# Word only underlines these; href lấy từ bản markdown bàn giao / site.
LINKIFY = (
    ("<u>https://pmlvietnam.vn/san-pham</u>", "[https://pmlvietnam.vn/san-pham](/san-pham)"),
    ("<u>facebook.com/pmlvietnam.vn</u>", "[facebook.com/pmlvietnam.vn](https://www.facebook.com/pmlvietnam.vn)"),
    ("<u>pmlvietnam.vn/san-pham</u>", "[pmlvietnam.vn/san-pham](/san-pham)"),
    ("<u>Mobile-first indexing</u>", "[Mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)"),
    ("<u>Mẫu giao diện</u>", "[Mẫu giao diện](/san-pham)"),
    ("<u>luvini.vn</u>", "[luvini.vn](https://luvini.vn)"),
    ("<u>0908 985 844</u>", "[0908 985 844](https://zalo.me/0908985844)"),
)

COMPETITOR_NAMES = ("VinaSite", "123Website", "Vietcodex", "Webchốt")

MUOI_REPLACEMENTS = (
    ("Mười mẫu hay mười nhóm ngành", "10 mẫu hay 10 nhóm ngành"),
    ("Mười **nhóm ngành**", "10 **nhóm ngành**"),
    ("mười **nhóm ngành**", "10 **nhóm ngành**"),
    ("Mười nhóm ngành", "10 nhóm ngành"),
    ("mười nhóm ngành", "10 nhóm ngành"),
    ("Mười nhóm", "10 nhóm"),
    ("mười nhóm", "10 nhóm"),
    ("mười hướng", "10 hướng"),
    ("mười file", "10 file"),
)


def polish_text(text: str) -> str:
    text = re.sub(r"\s*\(hyperlink of chăm sóc website\)", "", text)
    if "chăm sóc website" in text and "[*chăm sóc website*]" not in text and "gói *chăm sóc website*" in text:
        text = text.replace(
            "gói *chăm sóc website*",
            "gói [*chăm sóc website*](/cham-soc-website)",
        )
    for old, new in MUOI_REPLACEMENTS:
        text = text.replace(old, new)
    text = re.sub(r" {2,}", " ", text)
    for old, new in LINKIFY:
        text = text.replace(old, new)
    for name in COMPETITOR_NAMES:
        text = re.sub(rf"\[{re.escape(name)}\]\([^)]+\)", name, text)
        text = text.replace(f"<u>{name}</u>", name)
    if "mailto:" not in text:
        text = text.replace(
            "pmluanvn@gmail.com",
            "[pmluanvn@gmail.com](mailto:pmluanvn@gmail.com)",
        )
    text = re.sub(
        r"(?<!\[)(?<!https://)(?<!http://)luvini\.vn(?!\])",
        "[luvini.vn](https://luvini.vn)",
        text,
    )
    if "](/san-pham)" not in text:
        text = text.replace(
            "https://pmlvietnam.vn/san-pham",
            "[https://pmlvietnam.vn/san-pham](/san-pham)",
        )
    if "facebook.com/pmlvietnam.vn]" not in text:
        text = text.replace(
            "facebook.com/pmlvietnam.vn",
            "[facebook.com/pmlvietnam.vn](https://www.facebook.com/pmlvietnam.vn)",
        )
    return text


CONTACT_PREFIXES = (
    "Hotline",
    "Email:",
    "Địa chỉ:",
    "Giờ làm việc:",
    "Catalog:",
    "Facebook:",
)


def compact_contact_lines(blocks: list[dict]) -> list[dict]:
    """Gộp Hotline/Email/địa chỉ thành một đoạn — tránh space-y giữa từng dòng."""
    out: list[dict] = []
    i = 0
    while i < len(blocks):
        block = blocks[i]
        if block["type"] == "paragraph" and block["text"].startswith(CONTACT_PREFIXES):
            lines = [block["text"]]
            i += 1
            while (
                i < len(blocks)
                and blocks[i]["type"] == "paragraph"
                and blocks[i]["text"].startswith(CONTACT_PREFIXES)
            ):
                lines.append(blocks[i]["text"])
                i += 1
            out.append({"type": "paragraph", "text": "\n".join(lines)})
            continue
        out.append(block)
        i += 1
    return out


H2 = {
    "Khách đang tìm bạn trên Google",
    "Website chuyên nghiệp khác Fanpage và Zalo",
    "5 lý do nên đầu tư ngay hôm nay",
    "Năm lý do nên đầu tư ngay hôm nay",
    "“Để sau” thường đắt hơn làm đúng lúc",
    "Bắt đầu với PML Vietnam",
    "Vì sao website cần được chăm sóc sau bàn giao",
    "Gói chăm sóc website thường gồm những gì",
    "5 việc chăm sóc website giải quyết ngay",
    "Chi phí chăm sóc website tính thế nào",
    "Quy trình nhận chăm sóc tại PML Vietnam",
    "Vì sao cần quy trình 5 bước, không làm tắt",
    "5 bước thiết kế website tại PML Vietnam",
    "Bạn cần chuẩn bị gì để 5 bước chạy đúng tiến độ",
    "Dịch vụ dành cho ai",
    "Bạn nhận được gì khi làm website tại PML Vietnam",
    "Website theo mẫu hay thiết kế theo yêu cầu",
    "Chi phí thiết kế website tính như thế nào?",
    "Quy trình 5 bước — cùng một khung cho mọi gói",
    "Website chuẩn SEO: kỹ thuật khác viết bài",
    "Sau bàn giao: tự quản trị và chăm sóc",
    "Nên bắt đầu từ đâu",
    "Vì sao chọn mẫu theo ngành, không chọn theme generic",
    "Mười nhóm ngành trên PML Vietnam",
    "10 nhóm ngành trên PML Vietnam",
    "Cách chọn mẫu trên catalog",
    "Khi nào giữ mẫu, khi nào làm riêng",
    "Checklist trước khi bấm đăng ký",
    "Kho mẫu trên thị trường và cách PML Vietnam sắp xếp catalog",
    "Sau khi chọn mẫu: nội dung và vận hành",
    "Câu hỏi thường gặp",
    "Kết luận",
}

H3_EXACT = {
    "Website theo mẫu",
    "Thiết kế website theo yêu cầu",
    "Mười mẫu hay mười nhóm ngành?",
    "10 mẫu hay 10 nhóm ngành?",
    "Mẫu sẵn giao bao lâu?",
    "Không thấy đúng nghề thì sao?",
    "Có demo thật không?",
    "Mẫu có chuẩn SEO không?",
    "Chọn mẫu xong tôi tự sửa được không?",
}

LIST_STARTERS = {
    "Các hạng mục thường gặp:",
    "Chuẩn bị bốn thứ trước khi gọi:",
}

CTA_PREFIXES = (
    "Để lại thông tin, đội ngũ PML Vietnam",
    "Đăng ký tư vấn để được gợi ý mẫu đúng ngành.",
)

TAGLINE = "PML Vietnam - Cung cấp giải pháp website hiện đại cho cá nhân, hộ kinh doanh và doanh nghiệp."


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def is_h3(line: str) -> bool:
    if line in H3_EXACT:
        return True
    if re.match(r"^\d+\.\s", line):
        return True
    if re.match(r"^Bước \d+\.", line):
        return True
    return False


def parse_image(line: str) -> str | None:
    m = re.fullmatch(r"<Chèn hình ở đây:\s*([^>]+)>", line.strip())
    return m.group(1).strip() if m else None


def parse_link(line: str) -> tuple[str, str] | None:
    m = re.fullmatch(
        r"Xem chi tiết nội dung tại đây\s*(?:\(href:\s*([^)]+)\))?",
        line.strip(),
    )
    if not m:
        return None
    href = (m.group(1) or "").strip()
    return href, "Xem chi tiết nội dung tại đây"


def convert(lines: list[str], *, title: str, image_dir: str, default_see_href: str):
    body: list[str] = []
    skip_until_body = True
    for line in lines:
        if skip_until_body:
            if line == title:
                skip_until_body = False
            continue
        body.append(line)

    blocks: list[dict] = []
    i = 0
    pending_list_intro = False
    list_buf: list[str] = []

    def flush_list():
        nonlocal list_buf
        if list_buf:
            blocks.append({"type": "list", "items": list_buf})
            list_buf = []

    while i < len(body):
        line = body[i].strip()
        i += 1
        if not line:
            continue

        img = parse_image(line)
        if img:
            flush_list()
            pending_list_intro = False
            src = f"/tin-tuc/{image_dir}/{img}"
            if (PUBLIC / image_dir / img).exists():
                blocks.append({"type": "image", "src": src, "alt": img.replace(".webp", "").replace("-", " ")})
            continue

        link = parse_link(line)
        if link:
            flush_list()
            pending_list_intro = False
            href, text = link
            if not href:
                href = default_see_href
            if href.startswith("/bang-gia-"):
                href = "/tin-tuc" + href
            blocks.append({"type": "link", "href": href, "text": text})
            continue

        if line.startswith(CTA_PREFIXES):
            flush_list()
            pending_list_intro = False
            blocks.append(
                {
                    "type": "link",
                    "href": "/lien-he",
                    "text": line,
                }
            )
            continue

        if line == TAGLINE:
            flush_list()
            pending_list_intro = False
            blocks.append({"type": "tagline", "text": line})
            continue

        if line in H2 or line == "Kết luận":
            flush_list()
            pending_list_intro = line in LIST_STARTERS
            blocks.append({"type": "heading", "level": 2, "text": line})
            continue

        if is_h3(line):
            flush_list()
            pending_list_intro = False
            blocks.append({"type": "heading", "level": 3, "text": line})
            continue

        if line in LIST_STARTERS or line.endswith("thường gặp:"):
            flush_list()
            blocks.append({"type": "paragraph", "text": line})
            pending_list_intro = True
            continue

        # Collect consecutive short list-looking lines after intro / after H2 checklist
        looks_list_item = (
            pending_list_intro
            or (blocks and blocks[-1]["type"] == "heading" and blocks[-1].get("text") in {
                "Checklist trước khi bấm đăng ký",
                "Bạn cần chuẩn bị gì để 5 bước chạy đúng tiến độ",
                "Quy trình 5 bước — cùng một khung cho mọi gói",
                "Cách chọn mẫu trên catalog",
            })
        ) and not line.endswith(".") or False

        # Explicit: lines that are clearly bullets (no period, or start with capital short)
        if pending_list_intro:
            # continue list until a clearly long paragraph that's a new section
            if line in H2 or is_h3(line) or line.startswith("<Chèn") or line.startswith("Xem chi tiết"):
                flush_list()
                pending_list_intro = False
                i -= 1
                continue
            # Heuristic: if next heading-like, stop. Else if sentence very long AND previous list already has items and this looks like prose
            if len(line) > 160 and list_buf:
                flush_list()
                pending_list_intro = False
                blocks.append({"type": "paragraph", "text": line})
                continue
            list_buf.append(line)
            continue

        # Checklist / prepare / 5 steps numbered as separate lines without digits
        if blocks and blocks[-1]["type"] == "heading" and blocks[-1].get("text") in {
            "Checklist trước khi bấm đăng ký",
            "Bạn cần chuẩn bị gì để 5 bước chạy đúng tiến độ",
            "Quy trình 5 bước — cùng một khung cho mọi gói",
            "Cách chọn mẫu trên catalog",
            "Dịch vụ dành cho ai",
        }:
            # gather following until Xem chi tiết, image, H2, or long wrap-up
            list_buf.append(line)
            pending_list_intro = True
            continue

        flush_list()
        pending_list_intro = False
        blocks.append({"type": "paragraph", "text": line})

    flush_list()
    return blocks


def emit_blocks(blocks: list[dict]) -> str:
    parts = []
    for b in blocks:
        if b["type"] == "paragraph":
            parts.append(f'      {{ type: "paragraph", text: {ts_str(b["text"])} }},')
        elif b["type"] == "heading":
            parts.append(
                f'      {{ type: "heading", level: {b["level"]}, text: {ts_str(b["text"])} }},'
            )
        elif b["type"] == "image":
            parts.append(
                f'      {{ type: "image", src: {ts_str(b["src"])}, alt: {ts_str(b["alt"])} }},'
            )
        elif b["type"] == "link":
            parts.append(
                f'      {{ type: "link", href: {ts_str(b["href"])}, text: {ts_str(b["text"])} }},'
            )
        elif b["type"] == "tagline":
            parts.append(f'      {{ type: "tagline", text: {ts_str(b["text"])} }},')
        elif b["type"] == "list":
            items = ",\n".join(f"          {ts_str(x)}" for x in b["items"])
            parts.append(
                f'      {{\n        type: "list",\n        items: [\n{items},\n        ],\n      }},'
            )
    return "\n".join(parts)


ARTICLES = [
    {
        "const": "NEWS_ARTICLE_SLUG_WEBSITE_CHUYEN_NGHIEP",
        "slug": "tai-sao-doanh-nghiep-nen-dau-tu-website-chuyen-nghiep",
        "extract": "Đầu_tư_website_hôm_nay.txt",
        "docx": ROOT
        / "docs"
        / "Đầu tư website hôm nay"
        / "Tại sao doanh nghiệp nên đầu tư một website chuyên nghiệp ngay hôm nay_.docx",
        "title": "Tại sao doanh nghiệp nên đầu tư một website chuyên nghiệp ngay hôm nay?",
        "image_dir": "website-chuyen-nghiep",
        "default_href": "/thiet-ke-website",
        "id": "news-website-chuyen-nghiep",
        "card_title": "Tại sao doanh nghiệp nên đầu tư một website chuyên nghiệp ngay hôm nay?",
        "excerpt": "Khách tìm trên Google trước khi gọi. Website chuyên nghiệp là nơi họ hiểu bạn bán gì và quyết định liên hệ — PML Vietnam triển khai nhanh, chuẩn SEO, dễ quản trị.",
        "date": "09/10/2026",
        "category": "Tư vấn",
        "thumb": "thumbnail-website-chuyen-nghiep.webp",
        "thumb_alt": "Vì sao doanh nghiệp nên có website chuyên nghiệp",
        "badge": "Tư vấn",
        "publishedAt": "21:30 - 09/10/2026",
        "publishedAtIso": "2026-10-09T21:30:00+07:00",
        "banner_fallback": "/tin-tuc/banner_tin_tuc.webp",
        "meta_title": "Tại sao doanh nghiệp nên có website chuyên nghiệp?",
        "meta_desc": "Website chuyên nghiệp giúp doanh nghiệp tăng uy tín, dễ được tìm thấy trên Google và tiếp cận khách hàng hiệu quả hơn. PML Vietnam cung cấp giải pháp website nhanh, chuẩn SEO, dễ quản trị.",
    },
    {
        "const": "NEWS_ARTICLE_SLUG_CHAM_SOC",
        "slug": "dich-vu-cham-soc-website-tai-pml-vietnam",
        "extract": "Chăm_sóc_website.txt",
        "docx": ROOT / "docs" / "Chăm sóc website" / "Dịch vụ chăm sóc website tại PML Vietnam.docx",
        "title": "Dịch vụ chăm sóc website tại PML Vietnam",
        "image_dir": "cham-soc-website",
        "default_href": "/cham-soc-website",
        "id": "news-cham-soc-website",
        "card_title": "Dịch vụ chăm sóc website tại PML Vietnam",
        "excerpt": "Bảo trì, bảo mật, sao lưu và cập nhật nội dung sau bàn giao. Site luôn chạy — bạn tập trung kinh doanh.",
        "date": "09/10/2026",
        "category": "Vận hành",
        "thumb": "thumbnail-cham-soc-website.webp",
        "thumb_alt": "Dịch vụ chăm sóc website tại PML Vietnam",
        "badge": "Vận hành",
        "publishedAt": "21:31 - 09/10/2026",
        "publishedAtIso": "2026-10-09T21:31:00+07:00",
        "banner_fallback": "/tin-tuc/banner_tin_tuc.webp",
        "meta_title": "Dịch vụ chăm sóc website tại PML Vietnam",
        "meta_desc": "Dịch vụ chăm sóc website tại PML Vietnam: bảo trì, bảo mật, sao lưu và cập nhật nội dung. Site luôn chạy — bạn tập trung kinh doanh.",
    },
    {
        "const": "NEWS_ARTICLE_SLUG_CAC_BUOC",
        "slug": "cac-buoc-thiet-ke-website-chuyen-nghiep-tai-pml-vietnam",
        "extract": "Các_bước_thiết_kế_website.txt",
        "docx": ROOT
        / "docs"
        / "Các bước thiết kế website"
        / "Các bước thiết kế website chuyên nghiệp tại PML Vietnam.docx",
        "title": "Các bước thiết kế website chuyên nghiệp tại PML Vietnam",
        "image_dir": "cac-buoc-thiet-ke-website",
        "default_href": "/thiet-ke-website#quy-trinh-website",
        "id": "news-cac-buoc-thiet-ke",
        "card_title": "Các bước thiết kế website chuyên nghiệp tại PML Vietnam",
        "excerpt": "Quy trình 5 bước: tư vấn, chốt phạm vi, xây dựng, kiểm thử, bàn giao. Gói theo mẫu thường 5–7 ngày làm việc sau khi chốt.",
        "date": "09/10/2026",
        "category": "Hướng dẫn",
        "thumb": "thumbnail-quy-trinh-5-buoc.webp",
        "thumb_alt": "Quy trình 5 bước thiết kế website tại PML Vietnam",
        "badge": "Hướng dẫn",
        "publishedAt": "21:32 - 09/10/2026",
        "publishedAtIso": "2026-10-09T21:32:00+07:00",
        "banner_fallback": "/tin-tuc/banner_tin_tuc.webp",
        "meta_title": "Các bước thiết kế website chuyên nghiệp tại PML Vietnam",
        "meta_desc": "Các bước thiết kế website chuyên nghiệp tại PML Vietnam theo quy trình 5 bước: tư vấn, chốt phạm vi, xây dựng, kiểm thử, bàn giao.",
    },
    {
        "const": "NEWS_ARTICLE_SLUG_DICH_VU_TK",
        "slug": "dich-vu-thiet-ke-website-chuyen-nghiep-tai-pml-vietnam",
        "extract": "Dịch_vụ_thiết_kế_website.txt",
        "docx": ROOT
        / "docs"
        / "Dịch vụ thiết kế website"
        / "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam.docx",
        "title": "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam",
        "image_dir": "dich-vu-thiet-ke-website",
        "default_href": "/thiet-ke-website",
        "id": "news-dich-vu-thiet-ke",
        "card_title": "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam",
        "excerpt": "Website theo mẫu 5–7 ngày, chuẩn SEO kỹ thuật, dễ quản trị. Báo giá minh bạch theo gói — mẫu hoặc thiết kế theo yêu cầu.",
        "date": "09/10/2026",
        "category": "Dịch vụ",
        "thumb": "thumbnail-thiet-ke-website-chuyen-nghiep.webp",
        "thumb_alt": "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam",
        "badge": "Dịch vụ",
        "publishedAt": "21:33 - 09/10/2026",
        "publishedAtIso": "2026-10-09T21:33:00+07:00",
        "banner_fallback": "/tin-tuc/banner_tin_tuc.webp",
        "meta_title": "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam",
        "meta_desc": "Dịch vụ thiết kế website chuyên nghiệp tại PML Vietnam: website theo mẫu 5–7 ngày, chuẩn SEO kỹ thuật, dễ quản trị. Báo giá minh bạch theo gói.",
    },
    {
        "const": "NEWS_ARTICLE_SLUG_10_MAU",
        "slug": "10-mau-giao-dien-website-hien-dai-cho-tung-nganh-nghe",
        "extract": "10_mẫu_website.txt",
        "docx": ROOT
        / "docs"
        / "10 mẫu website"
        / "10 mẫu giao diện website hiện đại cho từng ngành nghề.docx",
        "title": "10 mẫu giao diện website hiện đại cho từng ngành nghề",
        "image_dir": "10-mau-giao-dien",
        "default_href": "/san-pham",
        "id": "news-10-mau-giao-dien",
        "card_title": "10 mẫu giao diện website hiện đại cho từng ngành nghề",
        "excerpt": "Catalog 10 nhóm ngành trên PML Vietnam: chọn nghề gần đúng, xem mẫu, bàn giao 3–5 ngày khi dùng giao diện sẵn.",
        "date": "09/10/2026",
        "category": "Mẫu giao diện",
        "thumb": "thumbnail-10-mau-giao-dien-website-hien-dai.webp",
        "thumb_alt": "10 mẫu giao diện website hiện đại theo ngành nghề",
        "badge": "Mẫu giao diện",
        "publishedAt": "21:34 - 09/10/2026",
        "publishedAtIso": "2026-10-09T21:34:00+07:00",
        "banner_fallback": "/tin-tuc/banner_tin_tuc.webp",
        "meta_title": "10 mẫu giao diện website hiện đại theo ngành nghề",
        "meta_desc": "10 mẫu giao diện website hiện đại theo ngành nghề tại PML Vietnam: chọn nhóm ngành, xem mẫu nghề, bàn giao 3–5 ngày khi dùng giao diện sẵn.",
    },
]


def banner_src(art: dict) -> str:
    return art["banner_fallback"]


def card_image(art: dict) -> str:
    if art["thumb"]:
        return f"/tin-tuc/{art['image_dir']}/{art['thumb']}"
    return art["banner_fallback"]


def main():
    chunks_const = []
    chunks_items = []
    chunks_articles = []

    for art in ARTICLES:
        text = (EXTRACT / art["extract"]).read_text(encoding="utf-8")
        lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
        # meta from extract
        meta_title = art["meta_title"]
        meta_desc = art["meta_desc"]
        for ln in lines:
            if ln.startswith("SEO Title:"):
                meta_title = ln.split(":", 1)[1].strip()
            if ln.startswith("Meta Description:"):
                meta_desc = ln.split(":", 1)[1].strip()

        blocks = convert(
            lines,
            title=art["title"],
            image_dir=art["image_dir"],
            default_see_href=art["default_href"],
        )
        lookup = rich_lookup(art["docx"])
        for block in blocks:
            if block["type"] in {"paragraph", "link", "tagline", "heading"}:
                if block["type"] != "heading":
                    block["text"] = apply_rich(block["text"], lookup)
                block["text"] = polish_text(block["text"])
            elif block["type"] == "list":
                block["items"] = [
                    polish_text(apply_rich(item, lookup)) for item in block["items"]
                ]
        blocks = compact_contact_lines(blocks)
        chunks_const.append(
            f'export const {art["const"]} = {ts_str(art["slug"])} as const;'
        )
        chunks_items.append(
            f"""  {{
    id: {ts_str(art["id"])},
    title: {ts_str(art["card_title"])},
    excerpt: {ts_str(art["excerpt"])},
    date: {ts_str(art["date"])},
    href: `/tin-tuc/${{{art["const"]}}}`,
    category: {ts_str(art["category"])},
    image: {{
      src: {ts_str(card_image(art))},
      alt: {ts_str(art["thumb_alt"])},
    }},
  }}"""
        )
        chunks_articles.append(
            f"""  {{
    slug: {art["const"]},
    meta: {{
      title: {ts_str(meta_title)},
      description: {ts_str(meta_desc)},
    }},
    banner: {{
      src: {ts_str(banner_src(art))},
      alt: {ts_str(art["thumb_alt"])},
      badge: {ts_str(art["badge"])},
      publishedAt: {ts_str(art["publishedAt"])},
      publishedAtIso: {ts_str(art["publishedAtIso"])},
    }},
    blocks: [
{emit_blocks(blocks)}
    ],
  }}"""
        )

    nl = "\n"
    consts = nl.join(chunks_const)
    items = ("," + nl).join(chunks_items)
    articles = ("," + nl).join(chunks_articles)
    ts = (
        "/**\n"
        " * 5 bài SEO Content đã bàn giao — đăng `/tin-tuc`.\n"
        " * Nguồn copy: `docs/<folder>/*.docx`. Ảnh: `public/tin-tuc/<dir>/`.\n"
        " * Inline Word: `**đậm**` `*nghiêng*` `<u>gạch chân</u>` — parse trong NewsArticleBody.\n"
        " */\n"
        'import type { NewsArticle, NewsItem } from "./site-config";\n\n'
        + consts
        + "\n\nexport const pmlContentNewsItems = [\n"
        + items
        + ",\n] satisfies NewsItem[];\n\nexport const pmlContentNewsArticles = [\n"
        + articles
        + ",\n] satisfies NewsArticle[];\n"
    )
    OUT.write_text(ts, encoding="utf-8")
    print("wrote", OUT, "chars", OUT.stat().st_size)


if __name__ == "__main__":
    main()
