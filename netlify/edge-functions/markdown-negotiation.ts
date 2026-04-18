interface NetlifyContext {
  next: () => Promise<Response>;
}

export default async function handler(request: Request, context: NetlifyContext) {
  const acceptHeader = request.headers.get("accept") || "";

  // Only intercept if the client explicitly wants markdown
  if (!acceptHeader.includes("text/markdown")) {
    return context.next();
  }

  // Fetch the original response from origin
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  // Only convert HTML responses
  if (!contentType.includes("text/html")) {
    return response;
  }

  const html = await response.text();

  // Convert HTML to a clean markdown representation
  const markdown = htmlToMarkdown(html);

  // Estimate token count (rough: ~4 chars per token)
  const tokenCount = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: response.status,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenCount),
      "cache-control": "public, max-age=3600",
    },
  });
}

function htmlToMarkdown(html: string): string {
  // Remove everything before <body> and after </body>
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    body = bodyMatch[1];
  }

  // Remove script and style tags with their content
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  // Remove SVG elements
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, "");

  // Convert headings
  body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  body = body.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n");
  body = body.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n");

  // Convert links
  body = body.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Convert images
  body = body.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
  body = body.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  body = body.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Convert emphasis
  body = body.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  body = body.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  body = body.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  body = body.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");

  // Convert code
  body = body.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");
  body = body.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "\n```\n$1\n```\n");

  // Convert lists
  body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  body = body.replace(/<\/?[uo]l[^>]*>/gi, "\n");

  // Convert paragraphs and line breaks
  body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  body = body.replace(/<br[^>]*\/?>/gi, "\n");
  body = body.replace(/<hr[^>]*\/?>/gi, "\n---\n");

  // Convert blockquotes
  body = body.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n> $1\n");

  // Convert time elements
  body = body.replace(/<time[^>]*>([\s\S]*?)<\/time>/gi, "$1");

  // Convert sections/articles — just extract content
  body = body.replace(/<\/?(?:section|article|main|header|footer|nav|div|span|figure|figcaption)[^>]*>/gi, "\n");

  // Remove remaining HTML tags
  body = body.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  body = body.replace(/&amp;/g, "&");
  body = body.replace(/&lt;/g, "<");
  body = body.replace(/&gt;/g, ">");
  body = body.replace(/&quot;/g, '"');
  body = body.replace(/&#39;/g, "'");
  body = body.replace(/&nbsp;/g, " ");
  body = body.replace(/&#x27;/g, "'");
  body = body.replace(/&#x2F;/g, "/");

  // Clean up whitespace
  body = body.replace(/\n{3,}/g, "\n\n");
  body = body.trim();

  return body;
}

export const config = {
  path: "/*",
};
