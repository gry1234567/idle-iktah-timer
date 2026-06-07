# IDLE iktah 工具箱｜雲端同步＋權限系統版

新增：
- 記事本搜尋
- 配方搜尋
- Supabase 多人同步
- 記事本與配方儲存到雲端資料庫
- 其他人只能查看
- 管理者登入後才能新增／修改／刪除
- 仍保留本機匯入／匯出備份

同步範圍：
- 記事本：同步
- 配方計算機：同步
- 製作倒數、龍門陣、自訂鈴聲、自訂背景：保留在各自裝置，不同步

使用方式：
1. 到 Supabase 建專案
2. Authentication 建立你的管理者帳號
3. SQL Editor 執行 supabase_schema.sql
4. 把 app_admins 裡的 email 改成你的管理者 email
5. 回 APP 設定頁填入 Supabase URL、anon key、管理者 Email
6. 管理者登入後即可修改資料；其他人只能查看
