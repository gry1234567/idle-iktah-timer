# 龍門陣工具箱｜手機效能原始碼清理版

版本：MOBILE-PERFORMANCE-SOURCE-CLEANUP-20260608-22

這版採用原始碼直接刪除與直接改函式，不再使用全頁掃描補丁。

修正：
- 刪除材料自動續行
- 移除造成手機卡頓的全頁掃描 / 後補搬移補丁
- 換算結果改為單一框逐行顯示
- 換算結果不顯示基準，只顯示實際需要
- 原始碼刪除快速批量匯入配方
- 原始碼刪除記事本匯入 / 匯出 / 備份
- 原始碼刪除配方匯入 / 匯出 / 備份
- 原始碼刪除背景修改功能
- 設定區保留自訂鈴聲、YouTube 鈴聲、雲端同步

保留：
- 製作提醒
- YouTube 鈴聲
- 雲端讀取
- 管理者登入
- 本機資料上傳雲端
- 材料勾選批量刪除
- 記事本 / 配方批量刪除

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
