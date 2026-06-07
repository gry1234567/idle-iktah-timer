export default async function handler(req, res) {
  return res.status(410).json({
    error: "Old endpoint disabled. Use /api/cloud-restv1",
    version: "PUBLIC-SCHEMA-FORCED-20260608-04",
    correctEndpoint: "/api/cloud-restv1",
    restUrl: "https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/"
  });
}
