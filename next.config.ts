import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
    resolveAlias: {
      "@content": "./content",
    },
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Link",
          value:
            '</.well-known/ai-catalog.json>; rel="api-catalog", </.well-known/api-catalog>; rel="api-catalog", </.well-known/oauth-protected-resource>; rel="service-desc", </auth.md>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-desc", </sitemap.xml>; rel="service-desc"',
        },
      ],
    },
    {
      source: "/.well-known/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
      ],
    },
    {
      source: "/auth.md",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Content-Type", value: "text/markdown; charset=utf-8" },
      ],
    },
  ],
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
