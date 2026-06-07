# IDLE iktah 工具箱｜Vercel API 轉接雲端版

這版是為了解決手機 / PWA 直接 fetch Supabase 失敗。

修正：
- 手機 APP 不再直接連 Supabase REST API
- 改成連自己的 Vercel 網址 `/api/supabase-proxy`
- 由 Vercel API 再去連 Supabase
- 可以避開手機瀏覽器 / PWA 對外部 API 的 fetch 問題

重要：
這版除了原本 7 個檔案，還多一個資料夾：

api/supabase-proxy.js

更新 GitHub 時一定要把 api 資料夾也上傳，不然雲端測試一定會失敗。

要覆蓋 / 上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/supabase-proxy.js

使用方式：
1. 覆蓋 GitHub 檔案，包含 api/supabase-proxy.js
2. 等 Vercel 部署完成
3. 打開 APP → 設定 → 雲端同步
4. 按「測試雲端連線」
5. 成功後按「重新讀取雲端」
