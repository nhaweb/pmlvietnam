import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      { source: "/dich-vu", destination: "/lien-he", permanent: true },
      { source: "/pml-content", destination: "/seo-content", permanent: true },
    ];
  },
};

export default nextConfig;

// Only for local next dev with Cloudflare bindings — skip in Docker/Fly production.
if (process.env.NODE_ENV !== "production") {
  initOpenNextCloudflareForDev();
}
