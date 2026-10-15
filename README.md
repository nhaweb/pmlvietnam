# PML Vietnam

Next.js landing page. Production chạy trên [Fly.io](https://fly.io) (app `pmlvietnam`, region `sin`).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` → `.env.local` rồi điền key. Không commit file `.env*`.

## Sanity CMS (tin tức)

Bài viết `/tin-tuc/<slug>` được quản lý trên Sanity (project `7ocodxq0`, dataset `pml`). Studio nhúng sẵn trong app tại [http://localhost:3000/studio](http://localhost:3000/studio) (production: `/studio`), đăng nhập bằng tài khoản Sanity được mời vào project.

Biến môi trường (đã có trong `.env.example`):

| Biến | Giá trị |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `7ocodxq0` |
| `NEXT_PUBLIC_SANITY_DATASET` | `pml` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional, mặc định `2026-10-13` |

### Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `sanity.config.js` | Cấu hình Studio (basePath `/studio`, Structure + Vision) |
| `sanity.cli.js` | Cấu hình CLI (`npx sanity ...`) |
| `sanity/schemaTypes/` | Schema: `newsArticle` (bài viết), `newsBody` (rich text) |
| `sanity/structure.js` | Sidebar Studio |
| `sanity/lib/` | Client, image URL builder, Live Content API |
| `app/(studio)/studio/` | Route Studio — root layout riêng, không có header/footer site |

App dùng hai root layout: `app/(site)/` cho website, `app/(studio)/` cho Studio. URL 404 không khớp route nào được render bởi `app/global-not-found.tsx` (cờ `experimental.globalNotFound` trong `next.config.ts`).

### Schema bài viết (`newsArticle`)

| Field | Ghi chú |
|---|---|
| `title` | Tiêu đề hiển thị trên card và bài viết (bắt buộc) |
| `slug` | URL `/tin-tuc/<slug>`, chữ thường không dấu + gạch ngang (bắt buộc) |
| `publishedAt` | Ngày đăng, dùng để sắp xếp (bắt buộc) |
| `excerpt` | Mô tả ngắn trên card (bắt buộc, nên dưới 220 ký tự) |
| `mainImage` + `alt` | Thumbnail card, banner bài viết, ảnh OG (bắt buộc) |
| `body` | Rich text: đoạn văn, H2, H3, Tagline, list gạch đầu dòng / đánh số, đậm / nghiêng / gạch chân, link, ảnh kèm alt |
| `seo.title`, `seo.description` | Optional — bỏ trống thì dùng `title` / `excerpt` |

Tin tức không có danh mục. Bài chỉ hiện trên site khi đã **Publish** trong Studio (draft không hiển thị).

### Lệnh thường dùng

Các lệnh dưới dùng phiên đăng nhập Sanity CLI (`npx sanity login`), không cần token trong `.env`.

| Command | Mục đích |
|---|---|
| `npx sanity schema validate` | Kiểm tra schema |
| `npx sanity documents validate -y` | Kiểm tra dữ liệu hiện có theo schema |

Đổi schema xong không cần deploy riêng — Studio build cùng app. Khi website bắt đầu đọc tin tức từ Sanity, thêm `NEXT_PUBLIC_SANITY_PROJECT_ID` và `NEXT_PUBLIC_SANITY_DATASET` vào `[build.args]` của `fly.toml` (biến `NEXT_PUBLIC_*` được bake lúc build) và thêm domain production vào CORS origins của project trên [sanity.io/manage](https://www.sanity.io/manage).

## Email (Resend)

Contact form POST tới `/api/contact`, gửi mail qua Resend.

1. Set `RESEND_API_KEY` từ dashboard Resend.
2. `CONTACT_TO_EMAIL` là inbox nhận lead. Sender test của Resend chỉ gửi được tới email tài khoản Resend cho đến khi verify domain.
3. Optional `RESEND_FROM_EMAIL` — sau khi verify `nhaweb.vn` trên Resend, set `PML Vietnam <noreply@nhaweb.vn>` và trỏ `CONTACT_TO_EMAIL` tới inbox thật.

## Deploy lên Fly.io

App, region, port và biến public đã có trong `fly.toml` + `Dockerfile`. Không chạy `fly launch` lại (sẽ ghi đè config).

`npm run deploy` là lệnh Cloudflare, **không** deploy Fly. Dùng `fly deploy`.

### 1. Cài `flyctl` và đăng nhập

```bash
# Windows (PowerShell)
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# macOS / Linux
curl -L https://fly.io/install.sh | sh
```

```bash
fly auth login
fly apps list
```

Xác nhận app `pmlvietnam` hiện trong list.

### 2. Secrets (chỉ cần làm một lần, hoặc khi xoay key)

Không commit API key. Public analytics / canonical URL nằm trong `[build.args]` của `fly.toml` (Next.js inline `NEXT_PUBLIC_*` lúc `docker build`; `[env]` runtime không đủ).

```bash
fly secrets set RESEND_API_KEY=re_xxxxxxxx CONTACT_TO_EMAIL=your@email.com -a pmlvietnam
```

Optional, sau khi verify domain:

```bash
fly secrets set RESEND_FROM_EMAIL="PML Vietnam <noreply@nhaweb.vn>" -a pmlvietnam
```

Kiểm tra tên secret (không in value):

```bash
fly secrets list -a pmlvietnam
```

### 3. Deploy

Từ root repo:

```bash
npm run lint
npm run build
fly deploy
```

Build local không bắt buộc nhưng nên chạy trước khi đẩy image. `fly deploy` build Docker (Node 22, `npm run build` trong image) rồi ship lên Machines, listen `0.0.0.0:8080`.

### 4. Verify

```bash
fly status
fly checks list
fly logs
```

Site production: [https://pmlvietnam.vn](https://pmlvietnam.vn) — mở homepage và gửi thử form liên hệ.

### Thao tác thường dùng

| Command | Mục đích |
|---|---|
| `fly deploy` | Build image và deploy |
| `fly status` | App / Machine health |
| `fly logs` | Runtime logs |
| `fly secrets list` | Tên secrets đang set |
| `fly ssh console` | Shell vào Machine |

Khi deploy lỗi: xem `fly status` → `fly logs` trước khi sửa config. Không tắt health check và không regenerate `fly.toml`.

Đổi `NEXT_PUBLIC_*` thì sửa `[build.args]` (và `[env]` cho đồng bộ) trong `fly.toml` rồi `fly deploy` lại — `fly secrets set` không đủ vì các biến đó được bake lúc build.

## Cloudflare Workers (optional)

Stack OpenNext/Wrangler vẫn còn trong repo, không phải production hiện tại.

| Command | Purpose |
|---|---|
| `npm run build:worker` | Build Next.js + OpenNext Worker bundle |
| `npm run preview` | Build and run in the Workers runtime locally |
| `npm run deploy` | Build and deploy to Cloudflare |

### Workers Builds (Git / CI)

In the Cloudflare dashboard → Workers → your project → **Settings → Build**, set:

| Setting | Value |
|---|---|
| **Build command** | `npm run build:worker` |
| **Deploy command** | `npx wrangler deploy` |

Do **not** use `npm run build` as the Cloudflare build command — that only runs `next build` and skips the OpenNext Worker output (`.open-next`), which causes:

`Could not find compiled Open Next config, did you run the build command?`
