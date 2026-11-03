import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMarkdownResponseForPath, estimateTokens } from "@/lib/agent-markdown";

const LINK_HEADER_VALUE =
  '</.well-known/ai-catalog.json>; rel="api-catalog", </.well-known/api-catalog>; rel="api-catalog", </.well-known/oauth-protected-resource>; rel="service-desc", </auth.md>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-desc", </sitemap.xml>; rel="service-desc"';

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto") || "";

  // 1. Redirect www to non-www
  if (host.startsWith("www.")) {
    const canonicalHost = host.replace(/^www\./, "");
    const targetUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${canonicalHost}`
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. Redirect http to https (if forwarded protocol is http and not localhost)
  if (proto === "http" && !host.includes("localhost") && !host.includes("127.0.0.1")) {
    const targetUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${host}`
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  // 3. Content negotiation for text/markdown
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
    "/((?!_next/static|_next/image|images|favicon.ico|icon.svg|.*\\.pdf$).*)",
  ],
};
