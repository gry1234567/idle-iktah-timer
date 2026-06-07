# IDLE iktah 工具箱｜強制清除 Service Worker / 快取版

版本：FORCE-NO-SW-20260608-01

目的：
- 解決 APP 一直跑舊版，導致明明 API 已存在卻仍顯示 fetch failed
- 開啟 APP 時主動解除 service worker
- 清除 caches
- 畫面上顯示版本號，確認是否真的載入新版

重要：
這版更新後，請用 Chrome 開：
https://idle-iktah-timer.vercel.app/?v=FORCE-NO-SW-20260608-01

看到畫面上有：
版本 FORCE-NO-SW-20260608-01

才代表真的進到新版。

仍需上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/supabase-proxy.js
