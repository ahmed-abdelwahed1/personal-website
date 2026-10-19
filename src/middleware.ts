import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMarkdownResponseForPath, estimateTokens } from "@/lib/agent-markdown";

const LINK_HEADER_VALUE =
  '</.well-known/ai-catalog.json>; rel="api-catalog", </.well-known/api-catalog>; rel="api-catalog", </.well-known/oauth-protected-resource>; rel="service-desc", </auth.md>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-desc", </sitemap.xml>; rel="service-desc"';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";
  const isMarkdownRequested = acceptHeader.includes("text/markdown");

  const pathname = request.nextUrl.pathname;

  if (isMarkdownRequested) {
    const md = getMarkdownResponseForPath(pathname);
    if (md) {
      const tokens = estimateTokens(md);
      return new NextResponse(md, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "x-markdown-tokens": String(tokens),
          "Link": LINK_HEADER_VALUE,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set("Link", LINK_HEADER_VALUE);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/blog",
    "/blog/:path*",
  ],
};
