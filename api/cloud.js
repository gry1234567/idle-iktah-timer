import https from "https";

const SUPABASE_REST_URL = "https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/";
const SUPABASE_ROOT_URL = "https://oivbidfpeuddedsucwhg.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_dFemdW0JzlnskIPhMAGTIA_cu-263-G";
const API_VERSION = "LONGMEN-TOOLBOX-REORG-20260608-09";

function requestJson(path, options = {}) {
  return new Promise((resolve, reject) => {
    const isAuthPath = path.startsWith("/auth/v1/");
    const normalizedPath = isAuthPath ? path : path.replace(/^\/rest\/v1\//, "");
    const url = new URL(normalizedPath, isAuthPath ? SUPABASE_ROOT_URL : SUPABASE_REST_URL);

    const body = options.body ? JSON.stringify(options.body) : null;

    const headers = {
      "apikey": PUBLISHABLE_KEY,
      "Content-Type": "application/json",

      // 強制使用 public schema，避免 Supabase 去找 graphql_public.iktah_notes
      "Accept-Profile": "public",
      "Content-Profile": "public",

      ...(options.headers || {})
    };

    if (body) headers["Content-Length"] = Buffer.byteLength(body);

    const req = https.request(url, {
      method: options.method || "GET",
      headers
    }, (res) => {
      let raw = "";
      res.on("data", chunk => raw += chunk);
      res.on("end", () => {
        let data = null;
        try { data = raw ? JSON.parse(raw) : null; }
        catch { data = raw; }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(
            (data && (data.message || data.error_description || data.error || data.details)) ||
            raw ||
            `HTTP ${res.statusCode}`
          ));
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(25000, () => {
      req.destroy(new Error("Supabase request timeout"));
    });

    if (body) req.write(body);
    req.end();
  });
}

function adminHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function isUuid(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id || ""));
}

async function readAll() {
  const notes = await requestJson("/rest/v1/iktah_notes?select=*&order=updated_at.desc");
  const recipes = await requestJson("/rest/v1/iktah_recipes?select=*,ingredients:iktah_recipe_ingredients(*)&order=updated_at.desc");
  return { notes: notes || [], recipes: recipes || [] };
}

async function requireAdmin(token) {
  if (!token) throw new Error("Missing admin token");
  const rows = await requestJson("/rest/v1/app_admins?select=email&limit=1", {
    headers: adminHeaders(token)
  });
  if (!Array.isArray(rows) || !rows.length) {
    throw new Error("Not an admin");
  }
}

async function saveNote(note, token) {
  await requireAdmin(token);
  const payload = {
    title: note.title || "未命名記事",
    content: note.content || "",
    updated_at: new Date().toISOString()
  };

  if (isUuid(note.id)) {
    await requestJson(`/rest/v1/iktah_notes?id=eq.${encodeURIComponent(note.id)}`, {
      method: "PATCH",
      headers: { ...adminHeaders(token), Prefer: "return=minimal" },
      body: payload
    });
  } else {
    await requestJson("/rest/v1/iktah_notes", {
      method: "POST",
      headers: { ...adminHeaders(token), Prefer: "return=minimal" },
      body: payload
    });
  }
}

async function deleteNote(id, token) {
  await requireAdmin(token);
  await requestJson(`/rest/v1/iktah_notes?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { ...adminHeaders(token), Prefer: "return=minimal" }
  });
}

async function saveRecipe(recipe, token) {
  await requireAdmin(token);
  let recipeId = recipe.id;
  const payload = {
    name: recipe.name || "未命名配方",
    base_weight: Number(recipe.baseWeight || 500),
    updated_at: new Date().toISOString()
  };

  if (isUuid(recipeId)) {
    await requestJson(`/rest/v1/iktah_recipes?id=eq.${encodeURIComponent(recipeId)}`, {
      method: "PATCH",
      headers: { ...adminHeaders(token), Prefer: "return=minimal" },
      body: payload
    });

    await requestJson(`/rest/v1/iktah_recipe_ingredients?recipe_id=eq.${encodeURIComponent(recipeId)}`, {
      method: "DELETE",
      headers: { ...adminHeaders(token), Prefer: "return=minimal" }
    });
  } else {
    const inserted = await requestJson("/rest/v1/iktah_recipes", {
      method: "POST",
      headers: { ...adminHeaders(token), Prefer: "return=representation" },
      body: payload
    });
    recipeId = inserted && inserted[0] && inserted[0].id;
  }

  const ingredients = (recipe.ingredients || []).map((i, index) => ({
    recipe_id: recipeId,
    name: i.name || "",
    amount: Number(i.amount || 0),
    unit: i.unit || "克",
    sort_order: index
  }));

  if (ingredients.length) {
    await requestJson("/rest/v1/iktah_recipe_ingredients", {
      method: "POST",
      headers: { ...adminHeaders(token), Prefer: "return=minimal" },
      body: ingredients
    });
  }
}

async function deleteRecipe(id, token) {
  await requireAdmin(token);
  await requestJson(`/rest/v1/iktah_recipes?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { ...adminHeaders(token), Prefer: "return=minimal" }
  });
}

function normalizeTextForDedupe(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map(line => line.trim().replace(/\s+/g, " "))
    .join("\n")
    .trim();
}

function noteSignatureForUpload(note) {
  return JSON.stringify({
    title: normalizeTextForDedupe(note?.title || ""),
    content: normalizeTextForDedupe(note?.content || "")
  });
}

function recipeSignatureForUpload(recipe) {
  const ingredients = (recipe?.ingredients || [])
    .map(i => ({
      name: String(i?.name || "").trim(),
      amount: Number(i?.amount || 0),
      unit: String(i?.unit || "克").trim()
    }))
    .sort((a, b) => `${a.name}|${a.amount}|${a.unit}`.localeCompare(`${b.name}|${b.amount}|${b.unit}`));

  return JSON.stringify({
    name: String(recipe?.name || "").trim(),
    baseWeight: Number(recipe?.baseWeight || 500),
    ingredients
  });
}

function uniqueBySignature(items, signatureFn) {
  const map = new Map();

  for (const item of items || []) {
    const key = signatureFn(item);
    const current = map.get(key);

    const currentTime = current ? new Date(current.updated_at || current.updatedAt || current.created_at || current.createdAt || 0).getTime() : 0;
    const nextTime = new Date(item.updated_at || item.updatedAt || item.created_at || item.createdAt || 0).getTime();

    if (!current || nextTime >= currentTime) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}

async function clearCloudData(token) {
  await requireAdmin(token);

  // 先刪 recipes，ingredients 會因 foreign key cascade 自動刪除。
  await requestJson("/rest/v1/iktah_recipes?id=not.is.null", {
    method: "DELETE",
    headers: { ...adminHeaders(token), Prefer: "return=minimal" }
  });

  await requestJson("/rest/v1/iktah_notes?id=not.is.null", {
    method: "DELETE",
    headers: { ...adminHeaders(token), Prefer: "return=minimal" }
  });
}

async function uploadAll(notes, recipes, token) {
  await requireAdmin(token);

  const uniqueNotes = uniqueBySignature(notes || [], noteSignatureForUpload);
  const uniqueRecipes = uniqueBySignature(recipes || [], recipeSignatureForUpload);

  // 修正重複倍增問題：
  // 本機資料上傳雲端 = 以本機目前資料覆蓋雲端，而不是一直 insert 新資料。
  await clearCloudData(token);

  for (const n of uniqueNotes) {
    await saveNote({ ...n, id: "" }, token);
  }
  for (const r of uniqueRecipes) {
    await saveRecipe({ ...r, id: "" }, token);
  }

  return { uploadedNotes: uniqueNotes.length, uploadedRecipes: uniqueRecipes.length };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      version: API_VERSION,
      endpoint: "/api/cloud-restv1",
      restUrl: SUPABASE_REST_URL
    });
  }

  try {
    const body = req.body || {};
    const action = body.action;

    if (action === "test") {
      const result = await requestJson("/rest/v1/iktah_notes?select=id&limit=1");
      return res.status(200).json({
        api: "ok",
        supabase: "ok",
        version: API_VERSION,
        endpoint: "/api/cloud-restv1",
        restUrl: SUPABASE_REST_URL,
        rootUrl: SUPABASE_ROOT_URL,
        sample: result || []
      });
    }

    if (action === "read") {
      const data = await readAll();
      return res.status(200).json({ ...data, version: API_VERSION, restUrl: SUPABASE_REST_URL });
    }

    if (action === "login") {
      const auth = await requestJson("/auth/v1/token?grant_type=password", {
        method: "POST",
        body: { email: body.email, password: body.password }
      });
      const token = auth && auth.access_token;
      if (!token) throw new Error("No access token");

      await requireAdmin(token);
      return res.status(200).json({ token, version: API_VERSION });
    }

    if (action === "saveNote") {
      await saveNote(body.note, body.token);
      return res.status(200).json({ ok: true, version: API_VERSION });
    }

    if (action === "deleteNote") {
      await deleteNote(body.id, body.token);
      return res.status(200).json({ ok: true, version: API_VERSION });
    }

    if (action === "saveRecipe") {
      await saveRecipe(body.recipe, body.token);
      return res.status(200).json({ ok: true, version: API_VERSION });
    }

    if (action === "deleteRecipe") {
      await deleteRecipe(body.id, body.token);
      return res.status(200).json({ ok: true, version: API_VERSION });
    }

    if (action === "uploadAll") {
      const uploaded = await uploadAll(body.notes, body.recipes, body.token);
      return res.status(200).json({ ok: true, ...uploaded, version: API_VERSION });
    }

    return res.status(400).json({ error: "Unknown action", version: API_VERSION });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Server error",
      hint: String(error?.message || "").includes("graphql_public")
        ? "目前 Supabase 正在查 graphql_public。請到 Data API → Settings，把 Exposed schemas 改成 public，並確認 iktah_notes / iktah_recipes / iktah_recipe_ingredients 有 exposed。"
        : "",
      version: API_VERSION,
      endpoint: "/api/cloud-restv1",
      restUrl: SUPABASE_REST_URL,
      forcedSchema: "public"
    });
  }
}
