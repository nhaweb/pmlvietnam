import type { NextConfig } from "next";

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
