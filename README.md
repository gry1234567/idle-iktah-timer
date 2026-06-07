# IDLE iktah 工具箱｜/rest/v1/ URL 強制修正版

版本：RESTV1-FORCE-CORRECTED-20260608-02

本版已強制全檔替換 Supabase 專案 ID。

使用的 REST URL：
https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/

使用的 Root URL：
https://oivbidfpeuddedsucwhg.supabase.co

修正目標：
- 改成你指定的專案 ID：oivbidfpeuddedsucwhg
- REST 資料表 API 使用 /rest/v1/
- Auth 登入仍使用 root URL
- 程式會避免 /rest/v1/rest/v1/ 重複

一定要上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/cloud.js

部署後檢查：
1. 打開 https://idle-iktah-timer.vercel.app/api/cloud
2. 看到 Method not allowed 代表 API 存在
3. 回 APP 按「測試雲端」
4. 測試成功訊息裡應該會回傳 restUrl：https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/
