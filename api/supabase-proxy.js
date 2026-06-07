const SUPABASE_URL = "https://oivbidfpeudddesucwhg.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_dFemdW0JzlnskIPhMAGTIA_cu-263-G";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { path, method = "GET", headers = {}, body = null, useAdmin = false, adminAccessToken = "" } = req.body || {};

    if (!path || typeof path !== "string") {
      return res.status(400).json({ error: "Missing path" });
    }

    if (!path.startsWith("/rest/v1/") && !path.startsWith("/auth/v1/")) {
      return res.status(400).json({ error: "Path not allowed" });
    }

    const outgoingHeaders = {
      "apikey": PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      ...headers
    };

    if (useAdmin && adminAccessToken) {
      outgoingHeaders["Authorization"] = `Bearer ${adminAccessToken}`;
    }

    const fetchOptions = {
      method,
      headers: outgoingHeaders
    };

    if (body !== null && method !== "GET") {
      fetchOptions.body = JSON.stringify(body);
    }

    const upstream = await fetch(`${SUPABASE_URL}${path}`, fetchOptions);
    const text = await upstream.text();

    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.message || data?.error_description || data?.details || text || `Supabase HTTP ${upstream.status}`,
        details: data
      });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Proxy error"
    });
  }
}
