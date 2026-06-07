# IDLE iktah 工具箱｜雲端覆蓋上傳修正版

版本：OVERWRITE-UPLOAD-FIX-20260608-06

修正問題：
原本「本機資料上傳雲端」是一直新增資料，
造成：
- 上傳 2 筆
- 讀取後變 4 筆
- 再上傳又變 8 筆

本版修正：
- 本機資料上傳雲端 = 覆蓋雲端資料
- 上傳前會先清空雲端記事本與配方
- 再把目前本機資料寫入雲端
- 讀取雲端時會自動去重
- 同名、同基準重量、同材料內容的配方只保留一筆
- 同標題、同內容的記事本只保留一筆

使用 REST URL：
https://oivbidfpeuddedsucwhg.supabase.co/rest/v1/

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

建議：
如果雲端已經有 4、8、16 這種重複資料，
先「讀取雲端」一次讓本機去重，
確認本機只剩正確資料後，
再按「本機資料上傳雲端」覆蓋雲端。
