# IDLE iktah 工具箱｜預填 URL / Key，Email 自行輸入版

這版已經幫你預填：
- Supabase URL：https://oivbidfpeudddesucwhg.supabase.co
- Supabase publishable key：已內建

這版不會預填：
- 管理者 Email
- 管理者密碼

使用方式：
1. 覆蓋 GitHub 7 個檔案
2. 打開 APP → 設定 → 雲端同步與登入 REST 版
3. 直接按「測試雲端連線」
4. 成功後按「重新讀取雲端」
5. 要修改或上傳時，自己輸入管理者 Email 與密碼 → 按「管理者登入」

保留：
- 分類切換
- 製作提醒
- 龍門陣
- 記事本
- 配方計算機
- 配方批量匯入
- 搜尋
- 記事本／配方分開備份
- 管理者登入／登出
- 本機資料上傳雲端


## 本版修正

- 修正 REST API headers
- 一般讀取只使用 `apikey`
- 不再把 `sb_publishable_...` 當成 `Authorization: Bearer`
- 管理者登入後，才使用 Supabase Auth 回傳的 access token
