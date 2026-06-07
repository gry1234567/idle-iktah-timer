# IDLE iktah 工具箱｜Supabase /rest/v1/ URL 測試版

版本：RESTV1-URL-TEST-20260608-01

這版依照你的要求，改成使用 Supabase 直接複製下來的 REST API URL：

https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/

技術處理：
- REST 資料表請求使用：https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/
- Auth 登入請求仍使用專案根網址：https://oivbidfpeuddedsucwhg.supabase.co
- 程式會自動避免重複 `/rest/v1/rest/v1/`

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
