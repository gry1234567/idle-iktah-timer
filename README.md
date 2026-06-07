# IDLE iktah 工具箱｜記事本查重修正版

版本：NOTE-DEDUPE-FIX-20260608-08

修正：
- 讀取雲端時，記事本會自動查重
- 本機資料上傳雲端前，記事本也會先查重
- 同標題＋同內容的記事本只保留一筆
- 會標準化換行、前後空白、多餘空白
- 如果重複，保留 updated_at 較新的那筆
- 配方查重維持原本邏輯

目前同步邏輯：
- 新增 / 修改 / 刪除記事本：只改本機
- 新增 / 修改 / 刪除配方：只改本機
- 只有按「本機資料上傳雲端」時，才用本機資料覆蓋雲端
- 上傳前會先查重，避免重複資料倍增

一定要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/cloud.js
- api/cloud-restv1.js
