# IDLE iktah 工具箱｜快取重置 + Vercel API 修正版

修正：
- 新增「清除 APP 快取並重載」按鈕
- 新增「測試代理網址」按鈕
- `/api/supabase-proxy` 改成完整同網域網址
- service worker 完全不攔截 `/api/`
- service worker 改成更保守，避免舊快取造成 fetch failed

這版仍需要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/supabase-proxy.js

更新後建議：
1. 先用 Chrome 開 APP
2. 到設定 → 雲端同步
3. 按「清除 APP 快取並重載」
4. 重載後按「測試代理網址」
5. 應該看到 Method not allowed
6. 回 APP 按「測試雲端連線」
