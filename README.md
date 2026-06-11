# 龍門陣工具箱｜製作提醒初始化修正版

版本：TIMER-INITIALIZATION-FIX-20260611-25

真正原因：
- 記事本與配方備份欄位已從 HTML 原始碼移除。
- initSettings() 仍呼叫 updateNotesPreview() 與 updateRecipesPreview()。
- 因找不到欄位而發生 JavaScript 錯誤。
- DOMContentLoaded 初始化中斷，setInterval(tickTimers, 1000) 沒有執行。
- 因此倒數不更新，時間到也不會啟動鬧鐘。

本版修正：
- 從 initSettings() 移除已不存在的備份預覽初始化。
- 從原始碼移除已不存在的匯入匯出事件綁定。
- 設定與停止鬧鐘按鈕增加空值防呆。
- 保留原本 addTimer / tickTimers / completeTimer / startAlarm 倒數系統。
- 沒有加入第二套倒數補丁。
- 不動雲端、配方、記事本與 YouTube 設定。

上傳：
- index.html
- manifest.webmanifest
- service-worker.js
- icon-192.png
- icon-512.png
- vercel.json
- README.md
- api/cloud.js
- api/cloud-restv1.js
