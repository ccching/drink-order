# NetAI 訂餐平台

前端可以選飲料、容量、甜度、冰塊、加料與數量，並即時計算價格；送出前也會要求投票披薩口味，每人至少 1 票、最多 4 票；送出後可透過 Google Apps Script 寫入 Google Sheet。

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


披薩投票會寫進 `Orders` 分頁的 `pizzaVotes` 欄位，也會另外建立 `PizzaVotes` 分頁，一票一列方便統計。




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
