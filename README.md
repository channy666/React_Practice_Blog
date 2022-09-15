# React 部落格

使用 React 實作的簡易部落格，有基本的文章 CRUD 功能、使用者的註冊與登入機制、以及給予文章星星（類似於按讚）功能。

[部落格連結](https://channy666.github.io/React_Practice_Blog/)

註 1：因後端系統密碼為明文儲存，註冊後密碼將強制轉換為 `123456`

註 2：由於後端資料庫部屬於 Heroku，開啟首頁後文章需要稍等待主機喚醒後才會顯示。

註 3：網站內所有文章包含標題、作者、內文等皆引用自[清華大學區塊鏈法律與政策研究中心](https://blpc.site.nthu.edu.tw/)，僅文章之星星數為虛構。

## 部落格架構

```
- Technology Law Center
    |
    *---- 首頁: 文章星星即時排行
    |               |
    |               *-- 單篇文章
    |                      |
    |                      *-- 編輯文章
    |
    |
    *---- 文章列表
    |        |
    |        *-- 研究觀點: 顯示研究觀點文章列表
    |        |      |
    |        |      *-- 單篇文章
    |        |             |
    |        |             *-- 編輯文章
    |        |
    |        *-- 要文評析: 顯示要文評析文章列表
    |               |
    |               *-- 單篇文章
    |                      |
    |                      *-- 編輯文章
    |
    |
    *---- 公眾論壇: 顯示公眾論壇文章列表
    |        |
    |        *-- 單篇文章
    |               |
    |               *-- 編輯文章
    |
    |
    *---- 特別感謝: 顯示本網站參考、使用之各類資源
    |
    |
    *---- 搜尋頁面: 顯示含有關鍵字的文章
    |
    |
    *---- 註冊／登入: 未登入使用者可以註冊／登入
    |
    |
    *---- 發布文章: 已登入使用者可以發布文章
    |
    |
    *---- 登出: 已登入的使用者登出

```

## 頁面與功能說明

- 未登入訪客：

  - **註冊／登入頁面**：使用者進行註冊／登入，**因後端密碼為明碼儲存，註冊後密碼將強制轉換為 `123456`**，**登入時密碼請輸入 `123456`**。
  - 文章列表：分為**研究觀點**與**要文評析**兩個種類。
    - **研究觀點頁面**：顯示研究觀點分類的文章列表。又細分為金融科技與一般產業兩個主題，可由左側分類欄位進行切換。一頁最多顯示 10 筆文章，另有分頁功能可以換頁。點擊文章標題即可進入單篇文章頁面。
    - **要文評析頁面**：顯示要文評析分類的文章列表。又細分為金融科技與一般產業兩個主題，可由左側分類欄位進行切換。一頁最多顯示 10 筆文章，另有分頁功能可以換頁。點擊文章標題即可進入單篇文章頁面。
  - **公眾論壇頁面**：顯示公眾論壇的文章列表。又細分為博士生論壇與要文共賞兩個主題，可經由左側分類欄位進行切換。一頁最多顯示 5 筆文章，另有分頁功能可以換頁。點擊文章標題即可進入單篇文章頁面。
  - **單篇文章頁面**：顯示文章完整內容。
  - **搜尋文章頁面**：輸入關鍵字後可搜尋到含有該關鍵字的文章。
  - **特別感謝頁面**： 顯示本網站參考、使用之各類資源，感謝再感謝！

- 註冊 / 登入後：
  - **單篇文章頁面**：顯示完整文章外，已登入的使用者可以編輯、刪除文章。
    - **編輯文章頁面**：只有**文章作者**可以編輯該篇文章。
    - **刪除文章功能**：除**文章作者**可以刪除該篇文章，**網站管理員**亦有刪除文章之權限。
    - **文章星星功能**：登入後可以在文章底部按鈕按下星星給予作者支持，亦可以收回星星。一個帳號一篇文章限按一顆星星。
  - **發布文章頁面**：登入後即可發布文章，文章需包含標題、分類與內文。
  - **登出功能**：點擊登出後即登出並返回首頁。

## 使用工具

- React: 以 function component + hooks 的方法實作。
- React Router: 處理分頁連結。
- styled components: React component 的樣式製作。
- 文章與使用者資料皆來自 [Json API Server](https://react-blog-json-server.herokuapp.com/)（部署於 Heroku ）
