# IDLE iktah 工具箱｜XHR 代理雲端版

這版是為了解決手機 / PWA 的 fetch failed。

修正：
- 不再用 fetch() 呼叫 /api/supabase-proxy
- 改用 XMLHttpRequest
- 仍然透過 Vercel API 轉接到 Supabase
- service worker 不攔截 /api/
- 保留清除 APP 快取並重載
- 保留測試代理網址

這版仍需要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/supabase-proxy.js

測試順序：
1. 覆蓋 GitHub，包含 api/supabase-proxy.js
2. 等 Vercel 部署完成
3. 手機 Chrome 開 APP
4. 設定 → 雲端同步
5. 先按「清除 APP 快取並重載」
6. 再按「測試代理網址」
7. 看到 Method not allowed 後，回 APP 按「測試雲端連線」
