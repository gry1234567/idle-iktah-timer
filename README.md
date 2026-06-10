# 龍門陣工具箱｜製作提醒倒數修正版

版本：TIMER-COUNTDOWN-REPAIR-20260608-24

修正：
- 修復製作提醒倒數時間不會動
- 修復時間到後沒有開啟鬧鐘
- 補上獨立倒數計時保護邏輯
- 選擇 YouTube 鈴聲時，時間到會呼叫 YouTube 提示，不播放內建循環鈴聲
- 使用內建 / 自訂音訊時，時間到會循環播放直到取消

本版只針對製作提醒倒數與鬧鐘修復。
不動：
- 雲端 API
- 配方計算機
- 記事本
- 本機資料上傳雲端
- Supabase 設定

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
