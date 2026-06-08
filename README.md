# 龍門陣工具箱｜自訂配方分類版

版本：CUSTOM-RECIPE-CATEGORIES-20260608-23

新增：
- 配方分類可自行新增
- 配方分類可改名
- 配方分類可刪除
- 刪除分類不刪除配方，該分類配方會改為「未分類」
- 配方內容可選分類
- 配方列表可依分類篩選
- 搜尋會同時搜尋配方名稱、材料與分類

注意：
- 這一版分類先以本機儲存為主。
- 讀取雲端時，會用本機現有配方內容盡量保留分類。
- 若換裝置或清除本機資料，分類可能需要重新設定。
- 不需要修改 Supabase SQL。

基底：
- 使用目前可開啟的原始碼清理與換算修正版。

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
