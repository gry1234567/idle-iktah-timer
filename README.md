# 龍門陣工具箱｜原始碼清理與換算修正版

版本：SOURCE-CLEANUP-CONVERSION-20260608-21

這版採用原始碼直接修改，不再使用全頁掃描補丁。

修正：
- 移除造成手機回應時間過長的換算掃描補丁
- 換算結果改為單一框、逐行顯示
- 換算結果不再顯示「基準」
- 直接從 HTML 移除快速批量匯入配方
- 直接從 HTML 移除記事本匯入 / 匯出 / 備份區塊
- 直接從 HTML 移除配方匯入 / 匯出 / 備份區塊
- 直接從 HTML 移除背景修改區塊
- 背景相關 JS 已改成防呆，不會因 UI 移除而報錯
- 換算原材料預設值維持 1g

保留不動：
- 製作提醒
- YouTube 鈴聲
- 雲端讀取
- 管理者登入
- 本機資料上傳雲端
- 材料自動續行 / 批量刪除
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
