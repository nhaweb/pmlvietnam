import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [{ source: "/dich-vu", destination: "/lien-he", permanent: true }];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
