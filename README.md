# IDLE iktah 工具箱｜強制 public schema 版

版本：PUBLIC-SCHEMA-FORCED-20260608-04

目前已經能連到 Supabase，但錯誤顯示：
graphql_public.iktah_notes

代表 Supabase 正在找錯 schema。

本版修正：
- API header 加上 Accept-Profile: public
- API header 加上 Content-Profile: public
- 強制 Supabase REST API 使用 public schema

使用的 Supabase REST URL：
https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/

仍然需要在 Supabase 檢查：
Data API → Settings

Exposed schemas：
- 必須選 public
- 不要只選 graphql_public

Exposed tables：
- app_admins
- iktah_notes
- iktah_recipes
- iktah_recipe_ingredients

一定要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/cloud-restv1.js
- api/cloud.js

部署後測試：
1. 打開 /api/cloud-restv1
2. 看到 Method not allowed 且 version 是 PUBLIC-SCHEMA-FORCED-20260608-04
3. 回 APP 按「測試雲端」
