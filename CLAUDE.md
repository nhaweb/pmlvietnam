# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for PML Vietnam (web design agency), Vietnamese-language. Next.js 16 App Router + React 19, Tailwind v4, Sanity CMS (embedded Studio), Resend email, deployed to Fly.io. Package name is `nha-web` (brand nhaweb.vn). The README is in Vietnamese and is the source of truth for setup, env vars, and deployment.

## Commands

```bash
npm run dev        # http://localhost:3000 (Studio at /studio)
npm run lint       # eslint (flat config, eslint-config-next)
npm run build      # also the type check — there is no separate tsc script
node --test lib/url-hash.test.ts          # run one test file (Node's built-in runner + native TS stripping)
node --test lib/*.test.ts                 # all tests
node scripts/header-scroll-flicker-harness.mjs   # sticky-header flicker model; exit 1 = unstable
npx sanity schema validate                # uses Sanity CLI login, no token needed
npx sanity documents validate -y
fly deploy         # deploy (not `npm run deploy`; never `fly launch`, never regenerate fly.toml)
```

Tests use `node:test` + `node:assert`, no framework. Test files import siblings with explicit `.ts` extensions, so any module they transitively load must also use relative imports with `.ts` extensions (not `@/` aliases) for Node to resolve it. `lib/search.test.ts` currently fails for this reason: `lib/search.ts` imports `./site-config` without an extension.

## Architecture

**Route groups with separate root layouts** (each renders its own `<html>`):
- `app/(site)/` — the website. Layout renders `components/layout/SiteShell.tsx` (header, footer, contact-form provider, analytics, JSON-LD, `<SanityLive />`). Route slugs are Vietnamese (`/tin-tuc`, `/san-pham`, `/lien-he`, …).
- `app/(studio)/studio/[[...tool]]` — embedded Sanity Studio, no site chrome.
- `app/(demo)/mau-giao-dien/[slug]` — full-viewport iframe of a template's live demo, `noindex`.
- `app/global-not-found.tsx` handles unmatched URLs (`experimental.globalNotFound` in `next.config.ts`). Redirects also live in `next.config.ts`.

**Content is mostly static TypeScript, not CMS.** `lib/site-config.ts` (~3.6k lines) holds nav, contact info, industry groups, product/template samples (`productsPageContent.items`, incl. `liveUrl` for demos), page copy, FAQ, and search suggestions. Change copy or contact details there, not in components. `/san-pham/[slug]` and `/mau-giao-dien/[slug]` are generated from it via `generateStaticParams`. Template screenshots live in `public/Tat_ca_website/<industry>/`.

**Only news comes from Sanity.** `lib/news.ts` wraps GROQ queries in `sanity/lib/queries.js` and maps docs to the `NewsItem` shape from `site-config`; `SiteShell` also loads news titles into the header search (failure is caught and logged). Sanity code under `sanity/` is plain JS. Drafts never appear on the site; only published docs.

**Contact form flow:** `components/contact/ContactFormProvider` + `ContactFormModal` (site-wide modal) → `POST /api/contact` → validates (VN phone `^0\d{9}$`) → saves a `contactLead` doc to Sanity with a dotted `_id` (keeps it out of public reads) → sends Resend email in `after()` and patches the lead's email status. If the Sanity save fails, email is sent synchronously and must succeed before returning OK.

**Env vars:** server secrets are read through `lib/server-env.ts` (`readServerEnv`) using dynamic lookup so Next doesn't inline them as undefined at build. `NEXT_PUBLIC_*` vars are baked at build time — on Fly they must be in `[build.args]` of `fly.toml` (and `[env]` to match); `fly secrets set` is not enough for them.

**SEO:** `lib/seo.ts` provides `pageMetadata()`, `absoluteUrl()`, and JSON-LD builders (rendered via `components/seo/JsonLd`). Pages export metadata through `pageMetadata`; `app/sitemap.ts` and `app/robots.ts` generate the rest.

**Styling:** Tailwind v4 with design tokens declared in `app/globals.css` (`@theme inline`: `bg-bg-primary`, `text-foreground`, `bg-cta`, `text-muted`, etc.) and shared hover easing vars (`--ease-smooth`, `--hover-duration`). Font is Encode Sans Expanded from `lib/fonts.ts`. Pages are composed from `components/sections/*`; reusable primitives are in `components/ui/` (`Reveal` for scroll animations via `motion`).

## Content writing

`.cursor/skills/pml-seo-article` and `.cursor/skills/seo-content-qc` define how SEO articles are written (source rules in `local/seo-content/pml-seo-content.mdc`, voice reference `local/seo-content/bai-1-website-chuyen-nghiep.md`). Key rules: formal Vietnamese, structured H2/H3, no chatty "humanized" voice, avoid semicolons in reader-facing copy, and take facts (phone, address, process, USPs) only from `lib/site-config.ts` — never invent case studies. `docs/` holds source copy for pages.
