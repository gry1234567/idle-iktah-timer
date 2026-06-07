import https from "https";

const SUPABASE_URL = "https://oivbidfpeudddesucwhg.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_dFemdW0JzlnskIPhMAGTIA_cu-263-G";

function requestJson(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL);
    const body = options.body ? JSON.stringify(options.body) : null;

    const headers = {
      "apikey": PUBLISHABLE_KEY,
      "Content-Type": "application/json",
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

async function uploadAll(notes, recipes, token) {
  await requireAdmin(token);
  for (const n of notes || []) {
    await saveNote({ ...n, id: "" }, token);
  }
  for (const r of recipes || []) {
    await saveRecipe({ ...r, id: "" }, token);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const action = body.action;

    if (action === "test") {
      const result = await requestJson("/rest/v1/iktah_notes?select=id&limit=1");
      return res.status(200).json({ api: "ok", supabase: "ok", sample: result || [] });
    }

    if (action === "read") {
      return res.status(200).json(await readAll());
    }

    if (action === "login") {
      const auth = await requestJson("/auth/v1/token?grant_type=password", {
        method: "POST",
        body: { email: body.email, password: body.password }
      });
      const token = auth && auth.access_token;
      if (!token) throw new Error("No access token");

      await requireAdmin(token);
      return res.status(200).json({ token });
    }

    if (action === "saveNote") {
      await saveNote(body.note, body.token);
      return res.status(200).json({ ok: true });
    }

    if (action === "deleteNote") {
      await deleteNote(body.id, body.token);
      return res.status(200).json({ ok: true });
    }

    if (action === "saveRecipe") {
      await saveRecipe(body.recipe, body.token);
      return res.status(200).json({ ok: true });
    }

    if (action === "deleteRecipe") {
      await deleteRecipe(body.id, body.token);
      return res.status(200).json({ ok: true });
    }

    if (action === "uploadAll") {
      await uploadAll(body.notes, body.recipes, body.token);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "Server error" });
  }
}
