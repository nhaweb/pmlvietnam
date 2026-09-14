import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Marketing site is fully prerendered (○ / ●) except /api/contact.
 * Serve ISR/SSG payloads from Workers Static Assets and intercept cache hits
 * so cold starts do not evaluate the heavy Next handler (Cloudflare Error 1102).
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
