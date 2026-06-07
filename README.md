# IDLE iktah 工具箱｜乾淨重建雲端版

版本：CLOUD-CLEAN-REBUILD-20260608-01

這版是從穩定版重新建立雲端功能，不沿用前面壞掉的雲端程式。

架構：
APP → /api/cloud → Supabase

特點：
- APP 不需要填 Supabase URL
- APP 不需要填 Supabase key
- 只需要管理者 Email / 密碼
- Vercel API 用 Node https 連 Supabase，不使用 fetch
- 雲端功能獨立，不影響分類切換和本機功能
- service worker 不攔截，也會自動解除註冊

一定要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/cloud.js

部署後測試：
1. 打開 https://idle-iktah-timer.vercel.app/api/cloud
2. 看到 Method not allowed 代表 API 存在
3. 回 APP 按「測試雲端」
4. 成功後按「讀取雲端」
