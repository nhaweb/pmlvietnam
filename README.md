# PML Vietnam

Next.js landing page deployed to Cloudflare Workers via `@opennextjs/cloudflare`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email (Resend)

Contact forms POST to `/api/contact`, which sends mail via Resend.

1. Copy `.env.example` → `.env.local` (Next.js) and `.dev.vars` (Wrangler preview).
2. Set `RESEND_API_KEY` from the Resend dashboard. Do not commit it.
3. `CONTACT_TO_EMAIL` is the inbox that receives leads. Resend's test sender can only deliver to the Resend account email until you verify a domain.
4. Optional `RESEND_FROM_EMAIL` — after verifying `nhaweb.vn` on Resend, set it to `PML Vietnam <noreply@nhaweb.vn>` and point `CONTACT_TO_EMAIL` at `hoangviet1807@gmail.com`.

For Cloudflare production, put the API key in an encrypted Worker secret (not `wrangler.jsonc`):

```bash
npx wrangler secret put RESEND_API_KEY
```

## Cloudflare Workers

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
