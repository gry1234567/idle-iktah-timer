# IDLE iktah 工具箱｜Vercel API 轉接 + Service Worker 修正版

修正：
- service-worker.js 不再攔截 `/api/`
- `/api/supabase-proxy` fetch 加上 no-store 與 cache busting
- 避免 PWA 舊快取造成 fetch failed

這版仍需要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/supabase-proxy.js

重要：
如果手機已安裝成 APP，更新後建議：
1. 刪掉手機上的舊 APP
2. 用 Chrome 直接打開 Vercel 網址
3. 確認測試雲端連線成功
4. 再重新安裝成 APP

快速檢查：
在瀏覽器打開：
https://你的網址/api/supabase-proxy

如果看到 Method not allowed，代表 API 有部署成功。
如果看到 404，代表 api/supabase-proxy.js 沒有上傳或 Vercel 沒部署到。
