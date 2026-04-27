// ─── Edge Runtime Declaration (REQUIRED — without this Vercel won't treat
//     this as an Edge Function and streaming fetch will silently fail) ────────
export const config = {
  runtime: "edge",
};

// ─── Read TARGET_DOMAIN once at cold-start and cache it ─────────────────────
//     Set this in Vercel Dashboard → Settings → Environment Variables
//     Example value:  https://your-xray-server.com:2096  (no trailing slash)
const TARGET_BASE = (process.env.TARGET_DOMAIN ?? "").replace(/\/+$/, "");

// Hop-by-hop and Vercel-internal headers that must not be forwarded upstream
const STRIP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "x-forwarded-host",
  "x-forwarded-port",
  "x-forwarded-proto",
]);

export default async function handler(req) {
  // ── Guard: env var not configured ──────────────────────────────────────────
  if (!TARGET_BASE) {
    return new Response(
      "Misconfigured: TARGET_DOMAIN environment variable is not set.\n" +
        "Add it in Vercel Dashboard → Settings → Environment Variables, then redeploy.",
      { status: 500 }
    );
  }

  try {
    // ── Build target URL (fast path — avoids allocating a URL object) ─────────
    const pathStart = req.url.indexOf("/", 8); // skip "https://"
    const targetUrl =
      pathStart === -1
        ? TARGET_BASE + "/"
        : TARGET_BASE + req.url.slice(pathStart);

    // ── Forward headers (single pass) ────────────────────────────────────────
    const out = new Headers();
    let clientIp = null;

    for (const [k, v] of req.headers) {
      if (STRIP_HEADERS.has(k)) continue;
      if (k.startsWith("x-vercel-")) continue;

      if (k === "x-real-ip") {
        clientIp = v;
        continue;
      }
      if (k === "x-forwarded-for") {
        if (!clientIp) clientIp = v;
        continue;
      }

      out.set(k, v);
    }

    if (clientIp) out.set("x-forwarded-for", clientIp);

    // ── Proxy the request upstream ────────────────────────────────────────────
    const method = req.method;
    const hasBody = method !== "GET" && method !== "HEAD";

    return await fetch(targetUrl, {
      method,
      headers: out,
      body: hasBody ? req.body : undefined,
      duplex: "half",   // required for streaming request bodies
      redirect: "manual", // don't chase 3xx — preserve XHTTP framing
    });
  } catch (err) {
    console.error("relay error:", err);
    return new Response("Bad Gateway: Tunnel Failed\n" + err.message, {
      status: 502,
    });
  }
}
