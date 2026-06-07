# IDLE iktah 工具箱｜本機編輯、手動覆蓋雲端版

版本：LOCAL-EDIT-ONLY-UPLOAD-SYNC-20260608-07

這版採用方案 A：

- 新增記事本：只改本機
- 修改記事本：只改本機
- 刪除記事本：只改本機
- 新增配方：只改本機
- 修改配方：只改本機
- 刪除配方：只改本機
- 雲端資料不會即時被刪除或修改

只有按下：
「本機資料上傳雲端」

才會：
1. 清空雲端記事本與配方
2. 用目前本機資料覆蓋雲端
3. 自動去除重複資料

適合你的使用方式：
1. 先讀取雲端
2. 在本機慢慢整理、刪除、修改配方
3. 確認本機資料正確
4. 再按「本機資料上傳雲端」一次同步

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
