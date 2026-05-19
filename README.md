# UNOCHA 烏弄訂飲料平台

這是一個免安裝套件的靜態點餐頁，菜單資料依照你提供的「烏弄南區 25.08 起適用」圖片整理。前端可以選飲料、容量、甜度、冰塊、加料與數量，並即時計算價格；送出後可透過 Google Apps Script 寫入 Google Sheet。

## 檔案

- `index.html`：點餐頁入口。
- `config.js`：正式部署時填入 Google Apps Script Web App URL。
- `styles.css`：畫面樣式。
- `app.js`：菜單資料、價格計算、購物車、送出邏輯。
- `apps-script/Code.gs`：貼到 Google Apps Script 的 Sheet 寫入端。

## Google Sheet 設定

1. 建立一份 Google Sheet。
2. 點選「擴充功能」→「Apps Script」。
3. 將 `apps-script/Code.gs` 的內容貼到 Apps Script 編輯器。
4. 儲存後選「部署」→「新增部署」。
5. 類型選「網頁應用程式」。
6. 執行身分選「我」。
7. 存取權選「任何人」或「知道連結的任何人」。
8. 部署後複製 Web App URL。
9. 打開 `config.js`，把 URL 填進 `sheetWebAppUrl`：

```js
window.UNOCHA_CONFIG = {
  sheetWebAppUrl: "https://script.google.com/macros/s/你的部署ID/exec",
  googleSheetUrl: "https://docs.google.com/spreadsheets/d/你的試算表ID/edit",
};
```

如果更新 `config.js` 後頁面沒有變化，請重新整理 GitHub Pages，或確認 `index.html` 裡的 `config.js?v=...` 版本參數已經跟著更新並推上 GitHub。

不要貼 Apps Script 函式庫網址。錯誤範例：

```text
https://script.google.com/macros/library/d/...
```

這種 URL 不能接收前端送出的訂單。一定要使用「部署」→「網頁應用程式」產生、結尾是 `/exec` 的 Web App URL。

## 使用方式

直接用瀏覽器開啟 `index.html` 即可開始點餐。正式上線前請先完成 `config.js` 設定，否則訂單不會送到 Google Sheet。

## 部署到 GitHub Pages

可以。這個專案是純靜態網頁，直接放 GitHub Pages 就能運作。

1. 到 GitHub 建立一個新的 repository，例如 `unocha-order`.
2. 把本資料夾裡的檔案推上去，至少要包含：
   - `index.html`
   - `config.js`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
   - `apps-script/Code.gs`
   - `README.md`
3. 進入 repository 的「Settings」→「Pages」。
4. Source 選「Deploy from a branch」。
5. Branch 選 `main`，資料夾選 `/root`。
6. 儲存後等 GitHub Pages 部署完成。
7. 開啟 GitHub 提供的網址，例如：

```text
https://你的帳號.github.io/unocha-order/
```

Google Sheet 寫入仍然使用 Apps Script Web App URL，但這個 URL 只需要由你放在 `config.js` 裡。使用者不需要知道 Google Sheet 或 Apps Script URL；他們只會看到點餐表單，送出後會由 `config.js` 裡設定的後端寫進你的 Google Sheet。

### 用 Git 指令上傳

如果你還沒有建立 Git repo，可以在這個資料夾執行：

```bash
git init
git add .
git commit -m "Create drink order page"
git branch -M main
git remote add origin https://github.com/ccching/drink-order.git
git push -u origin main
```

如果 repo 已經存在，只要改成你的 GitHub repository URL。

## 修改菜單

菜單資料都在 `app.js` 的 `DRINKS` 陣列裡。價格用 `prices` 設定：

```js
prices: { L: 40 }
prices: { M: 45, L: 60 }
```

如果飲品甜度固定，加入：

```js
fixedSugar: "甜度固定"
```

如果可做熱飲，加入：

```js
hot: true
```
