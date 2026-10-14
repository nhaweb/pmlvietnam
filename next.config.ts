import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
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
