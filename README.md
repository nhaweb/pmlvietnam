# PML Vietnam

Next.js landing page. Production chạy trên [Fly.io](https://fly.io) (app `pmlvietnam`, region `sin`).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` → `.env.local` rồi điền key. Không commit file `.env*`.

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
