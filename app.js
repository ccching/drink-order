const DEFAULT_MENU_FILE = "menus/93c.js";
const DEFAULT_POLL_FILE = "polls/sandwich.js";
const MENU_CACHE_BUSTER = "20260529-2";

let activeMenu = null;
let activePoll = null;
let CATEGORIES = ["全部"];
let DRINKS = [];
let TOPPINGS = [];
let SUGAR_OPTIONS = [];
let ICE_OPTIONS = [];
let TEMPERATURE_OPTIONS = [];

const DEFAULT_MENU_LABELS = {
  itemNoun: "飲料",
  itemUnit: "杯",
  menuTitle: "選擇飲料",
  orderTitle: "客製化",
  cartTitle: "訂單",
  submitTitle: "送出訂單",
  size: "容量",
  temperature: "溫度",
  sugar: "甜度",
  ice: "冰塊",
  toppings: "加料",
  selectedEmpty: "尚未選擇飲料",
  emptyCart: "尚未加入任何飲料。",
  noResults: "找不到符合的飲料。",
  noToppings: "此菜單沒有加料選項。",
  searchPlaceholder: "輸入飲品或口味",
  itemNote: "備註",
  itemNotePlaceholder: "例如：分開裝、不要珍珠",
  quantity: "數量",
  subtotal: "小計",
  total: "總計",
};

const DEFAULT_POLL = {
  title: "投票披薩口味",
  itemName: "披薩口味",
  description: "每人至少 1 票，最多 4 票。送出飲料前必須先投票。",
  minSelections: 1,
  maxSelections: 4,
  options: [
    "夏威夷海鮮雙享披薩",
    "漁夫燒肉雙享披薩",
    "開運花生嫩雞披薩",
    "招牌牛丼披薩",
    "金賞烏魚子披薩",
    "濃起司五重派對",
    "法式白醬海鮮披薩",
    "金沙蔬食披薩",
    "炭火肉食披薩",
    "蘋果肉桂披薩",
    "墨西哥嗆辣披薩",
    "老干媽風味雞肉披薩",
    "龍蝦沙拉披薩",
    "總匯披薩",
    "西西里燻雞披薩",
    "海鮮披薩",
    "地中海漁夫披薩",
    "夏威夷披薩",
    "蔬菜披薩",
    "義式海陸豪華披薩",
    "洋食黃金脆雞披薩",
    "波隆那臘腸披薩",
    "日式燒肉披薩",
  ],
};
const state = {
  activeCategory: "全部",
  search: "",
  selectedDrinkId: "",
  size: "",
  temperature: "",
  sugar: "",
  ice: "",
  toppings: new Set(),
  pollVotes: new Set(),
  quantity: 1,
  cart: [],
};

const $ = (selector) => document.querySelector(selector);
const formatPrice = (value) => `$${value.toLocaleString("zh-TW")}`;
const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function getActiveMenuFile() {
  return (window.UNOCHA_CONFIG?.activeMenuFile || DEFAULT_MENU_FILE).trim() || DEFAULT_MENU_FILE;
}

function getActivePollFile() {
  return (window.UNOCHA_CONFIG?.activePollFile || DEFAULT_POLL_FILE).trim() || DEFAULT_POLL_FILE;
}

function getMenuLabels() {
  return { ...DEFAULT_MENU_LABELS, ...(activeMenu?.labels || {}) };
}

function isControlHidden(controlName) {
  return Array.isArray(activeMenu?.hiddenControls) && activeMenu.hiddenControls.includes(controlName);
}

function isPollEnabled() {
  const poll = getPollConfig();
  return poll.enabled !== false && Array.isArray(poll.options) && poll.options.length > 0;
}

function withCacheBuster(path) {
  if (!MENU_CACHE_BUSTER || path.includes("?v=") || path.includes("&v=")) return path;
  return `${path}${path.includes("?") ? "&" : "?"}v=${MENU_CACHE_BUSTER}`;
}

function loadActiveMenu() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = withCacheBuster(getActiveMenuFile());
    script.onload = () => {
      try {
        configureActiveMenu(window.DRINK_ORDER_MENU);
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = () => reject(new Error(`無法載入菜單檔案：${getActiveMenuFile()}`));
    document.head.appendChild(script);
  });
}

function loadActivePoll() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = withCacheBuster(getActivePollFile());
    script.onload = () => {
      try {
        configureActivePoll(window.DRINK_ORDER_POLL);
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = () => reject(new Error(`無法載入投票檔案：${getActivePollFile()}`));
    document.head.appendChild(script);
  });
}

function configureActivePoll(poll) {
  const configured = poll || {};
  const enabled = configured.enabled !== false;
  const minSelections = Math.max(1, Number(configured.minSelections ?? DEFAULT_POLL.minSelections) || 1);
  const maxSelections = Math.max(minSelections, Number(configured.maxSelections ?? DEFAULT_POLL.maxSelections) || minSelections);
  const options = enabled
    ? Array.isArray(configured.options) && configured.options.length > 0
      ? configured.options
      : DEFAULT_POLL.options
    : [];

  activePoll = {
    id: configured.id || "poll",
    enabled,
    title: configured.title || DEFAULT_POLL.title,
    itemName: configured.itemName || configured.title || DEFAULT_POLL.itemName,
    description: configured.description || DEFAULT_POLL.description,
    minSelections,
    maxSelections,
    options,
  };
}

function configureActiveMenu(menu) {
  if (!menu || !Array.isArray(menu.drinks) || menu.drinks.length === 0) {
    throw new Error("菜單檔案格式不正確，或沒有飲料資料。");
  }

  activeMenu = menu;
  CATEGORIES = ["全部", ...(menu.categories || []).filter((category) => category !== "全部")];
  DRINKS = menu.drinks;
  TOPPINGS = menu.toppings || [];
  SUGAR_OPTIONS = menu.sugarOptions || [];
  ICE_OPTIONS = menu.iceOptions || [];
  TEMPERATURE_OPTIONS = menu.temperatureOptions || ["冷飲"];

  state.activeCategory = CATEGORIES[0] || "全部";
  state.selectedDrinkId = DRINKS[0].id;
  resetItemChoices();
  renderStoreMetadata();
}

function getDefaultChoices() {
  return activeMenu?.defaultChoices || {};
}

function getOrderPrefix() {
  const raw = String(activeMenu?.id || "order");
  return raw.replace(/[^a-z0-9]/gi, "").toUpperCase() || "ORDER";
}

function getPageTitle() {
  return (window.UNOCHA_CONFIG?.pageTitle || "").trim();
}

function getPollConfig() {
  return activePoll || DEFAULT_POLL;
}

function getPollVotes() {
  return Array.from(state.pollVotes);
}

function renderStoreMetadata() {
  const labels = getMenuLabels();
  const pageTitleText = getPageTitle();
  const storeName = activeMenu?.storeName || "";
  const pageTitle = $("#pageTitle");
  if (pageTitle && pageTitleText) {
    pageTitle.textContent = pageTitleText;
    document.title = pageTitleText;
  }

  const eyebrow = document.querySelector(".site-header .eyebrow");
  if (eyebrow && activeMenu?.menuLabel) {
    eyebrow.textContent = activeMenu.menuLabel;
  }

  const subtitle = $("#storeSubtitle");
  if (subtitle && storeName) {
    subtitle.textContent = activeMenu?.subtitle || `${labels.itemNoun}是 ${storeName}！一人補助 $40`;
  }

  const storeBadge = $("#activeStoreBadge");
  if (storeBadge && storeName) {
    storeBadge.textContent = storeName;
    storeBadge.hidden = false;
  }

  const menuTitle = $("#menuTitle");
  if (menuTitle) menuTitle.textContent = labels.menuTitle;
  const orderTitle = $("#orderTitle");
  if (orderTitle) orderTitle.textContent = labels.orderTitle;
  const cartTitle = $("#cartTitle");
  if (cartTitle) cartTitle.textContent = labels.cartTitle;
  const searchInput = $("#searchInput");
  if (searchInput) searchInput.placeholder = labels.searchPlaceholder;

  const sizeLegend = document.querySelector("#sizeGroup legend");
  if (sizeLegend) sizeLegend.textContent = labels.size;
  const temperatureLegend = document.querySelector("#temperatureGroup legend");
  if (temperatureLegend) temperatureLegend.textContent = labels.temperature;
  const sugarLegend = document.querySelector("#sugarGroup legend");
  if (sugarLegend) sugarLegend.textContent = labels.sugar;
  const iceLegend = document.querySelector("#iceGroup legend");
  if (iceLegend) iceLegend.textContent = labels.ice;
  const toppingLegend = document.querySelector("#toppingOptions")?.closest("fieldset")?.querySelector("legend");
  if (toppingLegend) toppingLegend.textContent = labels.toppings;
  const quantityLabel = document.querySelector('label[for="quantityInput"]');
  if (quantityLabel) quantityLabel.textContent = labels.quantity;
  const itemNoteLabel = document.querySelector('label.field span');
  const itemNoteInput = $("#itemNote");
  if (itemNoteInput) {
    itemNoteInput.placeholder = labels.itemNotePlaceholder;
    const noteLabel = itemNoteInput.closest("label")?.querySelector("span");
    if (noteLabel) noteLabel.textContent = labels.itemNote;
  }
  const pricePanelLabel = document.querySelector(".price-panel span");
  if (pricePanelLabel) pricePanelLabel.textContent = labels.subtotal;
  const cartTotalLabel = document.querySelector(".cart-total span");
  if (cartTotalLabel) cartTotalLabel.textContent = labels.total;
}

function renderStartupError(error) {
  const grid = $("#drinkGrid");
  if (grid) {
    grid.innerHTML = `<p class="empty-cart">${escapeHtml(error.message)}</p>`;
  }

  const status = $("#submitStatus");
  if (status) {
    status.textContent = error.message;
    status.className = "submit-status error";
  }

  const submitButton = $("#submitOrderButton");
  if (submitButton) {
    submitButton.disabled = true;
  }
}


function getSheetWebAppUrl() {
  return (window.UNOCHA_CONFIG?.sheetWebAppUrl || "").trim();
}

function getGoogleSheetUrl() {
  return (window.UNOCHA_CONFIG?.googleSheetUrl || "").trim();
}

function getSheetUrlConfigError(sheetUrl) {
  if (!sheetUrl) {
    return "尚未設定後端 Google Sheet，請網站管理者先在 config.js 填入 Apps Script Web App URL。";
  }

  if (sheetUrl.includes("/macros/library/")) {
    return "config.js 目前填到 Apps Script 函式庫 URL，請改成 Web App 部署網址，格式應為 https://script.google.com/macros/s/部署ID/exec。";
  }

  if (!/^https:\/\/script\.google\.com\/(?:macros\/s|a\/macros\/[^/]+\/s)\/.+\/exec$/.test(sheetUrl)) {
    return "config.js 的 Apps Script URL 格式不正確，請使用部署後結尾為 /exec 的 Web App URL。";
  }

  return "";
}

function getSelectedDrink() {
  return DRINKS.find((drink) => drink.id === state.selectedDrinkId) || DRINKS[0] || null;
}

function getAvailableSizes(drink) {
  return Object.entries(drink?.prices || {})
    .filter(([, price]) => typeof price === "number")
    .map(([size]) => size);
}

function normalizeChoicesForDrink(drink) {
  if (!drink) return;

  const defaults = getDefaultChoices();
  const sizes = getAvailableSizes(drink);
  if (!sizes.includes(state.size)) {
    const preferredSize = defaults.size || "L";
    state.size = sizes.includes(preferredSize) ? preferredSize : sizes.includes("L") ? "L" : sizes[0] || "";
  }

  if (!TEMPERATURE_OPTIONS.includes(state.temperature)) {
    state.temperature = defaults.temperature || TEMPERATURE_OPTIONS[0] || "冷飲";
  }

  if (!activeMenu?.hideTemperature && !drink.hot && state.temperature === "熱飲") {
    state.temperature = defaults.temperature || "冷飲";
  }

  if (drink.fixedSugar) {
    state.sugar = drink.fixedSugar;
  } else if (!SUGAR_OPTIONS.includes(state.sugar)) {
    state.sugar = SUGAR_OPTIONS.includes(defaults.sugar) ? defaults.sugar : SUGAR_OPTIONS[0] || "";
  }

  if (drink.fixedIce) {
    state.ice = drink.fixedIce;
  } else if (!activeMenu?.hideTemperature && state.temperature === "熱飲") {
    state.ice = "不加冰";
  } else if (!ICE_OPTIONS.includes(state.ice)) {
    state.ice = ICE_OPTIONS.includes(defaults.ice) ? defaults.ice : ICE_OPTIONS[0] || "";
  }

  if (activeMenu?.hideTemperature) {
    state.temperature = state.ice === "溫熱" ? "溫熱" : "冷飲";
  }
}

function getToppingBreakdown() {
  const discountSecondPrice = activeMenu?.toppingPricing?.discountSecondPrice;
  let regularCount = 0;

  return TOPPINGS.filter((topping) => state.toppings.has(topping.id)).map((topping) => {
    if (typeof discountSecondPrice === "number" && topping.discountable !== false) {
      regularCount += 1;
      return { ...topping, chargedPrice: regularCount === 1 ? topping.price : discountSecondPrice };
    }

    return { ...topping, chargedPrice: topping.price };
  });
}

function calculateCurrentItem() {
  const drink = getSelectedDrink();
  normalizeChoicesForDrink(drink);
  const basePrice = drink.prices[state.size] || 0;
  const toppings = getToppingBreakdown();
  const toppingTotal = toppings.reduce((sum, topping) => sum + topping.chargedPrice, 0);
  const unitPrice = basePrice + toppingTotal;
  const quantity = Math.max(1, Number(state.quantity) || 1);
  return {
    drink,
    basePrice,
    toppings,
    toppingTotal,
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
  };
}

function renderCategoryTabs() {
  $("#categoryTabs").innerHTML = CATEGORIES.map(
    (category) => `
      <button class="tab-button ${category === state.activeCategory ? "is-active" : ""}"
        type="button"
        role="tab"
        aria-selected="${category === state.activeCategory}"
        data-category="${category}">
        ${category}
      </button>
    `,
  ).join("");
}

function getFilteredDrinks() {
  const keyword = state.search.trim().toLowerCase();
  return DRINKS.filter((drink) => {
    const inCategory = state.activeCategory === "全部" || drink.category === state.activeCategory;
    const inSearch =
      !keyword ||
      [drink.name, drink.english, drink.note, drink.category].filter(Boolean).join(" ").toLowerCase().includes(keyword);
    return inCategory && inSearch;
  });
}

function renderDrinkCards() {
  const drinks = getFilteredDrinks();
  const labels = getMenuLabels();
  $("#drinkGrid").innerHTML =
    drinks.length > 0
      ? drinks.map(renderDrinkCard).join("")
      : `<p class="empty-cart">${escapeHtml(labels.noResults)}</p>`;
}

function renderDrinkCard(drink) {
  const prices = Object.entries(drink.prices)
    .filter(([, price]) => typeof price === "number")
    .map(([size, price]) => `<span>${escapeHtml(size)} ${formatPrice(price)}</span>`)
    .join("");
  const badges = [
    drink.recommended ? '<span class="badge">推薦</span>' : "",
    drink.hot ? '<span class="badge hot">可熱飲</span>' : "",
    drink.caffeineFree ? '<span class="badge caffeine">無咖啡因</span>' : "",
    drink.fixedSugar || drink.fixedIce ? `<span class="badge fixed">${escapeHtml(drink.fixedSugar || drink.fixedIce)}</span>` : "",
  ].join("");

  return `
    <button class="drink-card ${drink.id === state.selectedDrinkId ? "is-selected" : ""}" type="button" data-drink-id="${escapeHtml(drink.id)}">
      <span>
        <h3>${escapeHtml(drink.name)}</h3>
        ${drink.english ? `<p class="english">${escapeHtml(drink.english)}</p>` : ""}
        ${drink.note ? `<p class="note">${escapeHtml(drink.note)}</p>` : ""}
        <span class="badge-list">${badges}</span>
      </span>
      <span class="price-stack">${prices}</span>
    </button>
  `;
}

function renderSelectedDrink() {
  const labels = getMenuLabels();
  const drink = getSelectedDrink();
  if (!drink) {
    $("#selectedDrink").innerHTML = `<span>${escapeHtml(labels.selectedEmpty)}</span>`;
    return;
  }

  $("#selectedDrink").innerHTML = `
    <strong>${escapeHtml(drink.name)}</strong>
    <span>${[drink.category, drink.note].filter(Boolean).map(escapeHtml).join(" · ")}</span>
  `;
}

function renderSizeOptions() {
  const group = $("#sizeGroup");
  const options = $("#sizeOptions");
  const drink = getSelectedDrink();
  if (isControlHidden("size")) {
    group.hidden = true;
    options.innerHTML = "";
    return;
  }

  group.hidden = false;
  if (!drink) {
    options.innerHTML = "";
    return;
  }

  const sizes = getAvailableSizes(drink);
  const displaySizes = activeMenu?.sizeOrder?.length ? activeMenu.sizeOrder : sizes;
  options.innerHTML = displaySizes
    .map((size) => {
      const disabled = !sizes.includes(size);
      const price = drink.prices[size];
      return `
        <button type="button"
          data-size="${escapeHtml(size)}"
          class="${size === state.size ? "is-active" : ""}"
          ${disabled ? "disabled" : ""}>
          ${disabled ? `${escapeHtml(size)} -` : `${escapeHtml(size)} ${formatPrice(price)}`}
        </button>
      `;
    })
    .join("");
}

function renderTemperatureOptions() {
  const group = $("#temperatureGroup");
  const options = $("#temperatureOptions");

  if (activeMenu?.hideTemperature || isControlHidden("temperature")) {
    group.hidden = true;
    options.innerHTML = "";
    return;
  }

  group.hidden = false;
  const drink = getSelectedDrink();
  options.innerHTML = TEMPERATURE_OPTIONS.map((temperature) => {
    const disabled = temperature === "熱飲" && !drink.hot;
    return `
      <button type="button"
        data-temperature="${temperature}"
        class="${temperature === state.temperature ? "is-active" : ""}"
        ${disabled ? "disabled" : ""}>
        ${temperature}
      </button>
    `;
  }).join("");
}

function renderSugarOptions() {
  const group = $("#sugarGroup");
  const options = $("#sugarOptions");
  const drink = getSelectedDrink();
  if (isControlHidden("sugar")) {
    group.hidden = true;
    options.innerHTML = "";
    return;
  }

  group.hidden = false;
  if (drink.fixedSugar) {
    options.innerHTML = `<button type="button" class="is-active" data-sugar="${escapeHtml(drink.fixedSugar)}">${escapeHtml(drink.fixedSugar)}</button>`;
    return;
  }

  options.innerHTML = SUGAR_OPTIONS.map(
    (sugar) => `
      <button type="button" data-sugar="${escapeHtml(sugar)}" class="${sugar === state.sugar ? "is-active" : ""}">
        ${escapeHtml(sugar)}
      </button>
    `,
  ).join("");
}

function renderIceOptions() {
  const group = $("#iceGroup");
  const options = $("#iceOptions");
  const drink = getSelectedDrink();
  if (isControlHidden("ice")) {
    group.hidden = true;
    options.innerHTML = "";
    return;
  }

  group.hidden = false;
  if (drink.fixedIce) {
    options.innerHTML = `<button type="button" class="is-active" data-ice="${escapeHtml(drink.fixedIce)}">${escapeHtml(drink.fixedIce)}</button>`;
    return;
  }

  if (state.temperature === "熱飲") {
    options.innerHTML = '<button type="button" class="is-active" data-ice="不加冰">不加冰</button>';
    return;
  }

  options.innerHTML = ICE_OPTIONS.map(
    (ice) => `
      <button type="button" data-ice="${escapeHtml(ice)}" class="${ice === state.ice ? "is-active" : ""}">
        ${escapeHtml(ice)}
      </button>
    `,
  ).join("");
}

function renderToppings() {
  const labels = getMenuLabels();
  const options = $("#toppingOptions");
  const group = options.closest("fieldset");
  const hint = $("#toppingHint");
  if (isControlHidden("toppings")) {
    if (group) group.hidden = true;
    options.innerHTML = "";
    if (hint) hint.textContent = "";
    return;
  }

  if (group) group.hidden = false;
  if (hint) {
    hint.textContent = activeMenu?.toppingPricing?.hint || "加料會依菜單價格自動加總。";
  }

  if (TOPPINGS.length === 0) {
    options.innerHTML = `<p class="empty-cart">${escapeHtml(labels.noToppings)}</p>`;
    return;
  }

  const breakdown = getToppingBreakdown();
  const priceById = new Map(breakdown.map((topping) => [topping.id, topping.chargedPrice]));
  options.innerHTML = TOPPINGS.map((topping) => {
    const checked = state.toppings.has(topping.id);
    const shownPrice = checked ? priceById.get(topping.id) : topping.price;
    return `
      <label class="topping-option">
        <input type="checkbox" value="${escapeHtml(topping.id)}" ${checked ? "checked" : ""} />
        <span>${escapeHtml(topping.name)}</span>
        <small>+${shownPrice}</small>
      </label>
    `;
  }).join("");
}

function renderCurrentPrice() {
  const item = calculateCurrentItem();
  $("#quantityInput").value = item.quantity;
  $("#currentPrice").textContent = formatPrice(item.lineTotal);
}

function getCartCustomizationText(item) {
  const labels = getMenuLabels();
  const parts = [`${item.quantity} ${labels.itemUnit}`];
  if (!isControlHidden("temperature") && item.temperature && item.temperature !== item.ice) {
    parts.push(item.temperature);
  }
  if (!isControlHidden("sugar")) parts.push(item.sugar);
  if (!isControlHidden("ice")) parts.push(item.ice);
  return parts.filter(Boolean).map(escapeHtml).join(" · ");
}

function renderCart() {
  const labels = getMenuLabels();
  const cartItems = $("#cartItems");
  if (state.cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">${escapeHtml(labels.emptyCart)}</p>`;
  } else {
    cartItems.innerHTML = state.cart
      .map(
        (item, index) => `
        <article class="cart-item">
          <div>
            <h3>${escapeHtml(item.drinkName)}${isControlHidden("size") ? "" : ` · ${escapeHtml(item.size)}`}</h3>
            <p>${getCartCustomizationText(item)}</p>
            ${[item.toppingsText, item.note].filter(Boolean).length ? `<p>${[item.toppingsText, item.note].filter(Boolean).map(escapeHtml).join(" · ")}</p>` : ""}
            <p>${formatPrice(item.unitPrice)} / ${escapeHtml(labels.itemUnit)}，共 ${formatPrice(item.lineTotal)}</p>
          </div>
          <button class="remove-item" type="button" aria-label="移除 ${escapeHtml(item.drinkName)}" data-remove-index="${index}">×</button>
        </article>
      `,
      )
      .join("");
  }

  const total = state.cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#grandTotal").textContent = formatPrice(total);
  $("#cartTotal").textContent = formatPrice(total);
  $("#cartCount").textContent = `${count} ${labels.itemUnit}`;
  $("#checkoutButton").disabled = count === 0;
}

function renderPizzaVotes() {
  const poll = getPollConfig();
  const panel = document.querySelector(".pizza-panel");
  const submitStep = document.querySelector("#customerForm .eyebrow");
  if (!isPollEnabled()) {
    if (panel) panel.hidden = true;
    $("#checkoutButton").textContent = "下一步：送出訂單";
    if (submitStep) submitStep.textContent = "Step 4";
    return;
  }

  if (panel) panel.hidden = false;
  if (submitStep) submitStep.textContent = "Step 5";
  const count = state.pollVotes.size;
  const isSingleChoice = poll.maxSelections === 1;

  $("#checkoutButton").textContent = `下一步：${poll.title}`;
  $("#pizzaVoteTitle").textContent = poll.title;
  $("#pollDescription").textContent = poll.description;
  $("#pizzaVoteCount").textContent = `${count} / ${poll.maxSelections} 票`;
  $("#pizzaVoteOptions").innerHTML = poll.options.map((option) => {
    const checked = state.pollVotes.has(option);
    const disabled = !checked && !isSingleChoice && count >= poll.maxSelections;
    const inputType = isSingleChoice ? "radio" : "checkbox";
    const safeOption = escapeHtml(option);
    return `
      <label class="pizza-vote-option ${checked ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}">
        <input type="${inputType}" name="pollVote" value="${safeOption}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
        <span>${safeOption}</span>
      </label>
    `;
  }).join("");

  const hint = $("#pizzaVoteHint");
  if (count < poll.minSelections) {
    hint.textContent = `請先選擇${poll.itemName}，至少 ${poll.minSelections} 票。`;
    hint.className = "submit-status error";
  } else if (count >= poll.maxSelections) {
    hint.textContent = poll.maxSelections === 1 ? "已完成選擇。" : `已投滿 ${poll.maxSelections} 票。`;
    hint.className = "submit-status success";
  } else {
    hint.textContent = `已投 ${count} 票，還可以再投 ${poll.maxSelections - count} 票。`;
    hint.className = "submit-status";
  }
}

function renderAll() {
  if (DRINKS.length === 0) return;

  const drink = getSelectedDrink();
  normalizeChoicesForDrink(drink);
  renderCategoryTabs();
  renderDrinkCards();
  renderSelectedDrink();
  renderSizeOptions();
  renderTemperatureOptions();
  renderSugarOptions();
  renderIceOptions();
  renderToppings();
  renderCurrentPrice();
  renderCart();
  renderPizzaVotes();
}

function resetItemChoices() {
  const defaults = getDefaultChoices();
  state.size = defaults.size || "L";
  state.temperature = defaults.temperature || TEMPERATURE_OPTIONS[0] || "冷飲";
  state.sugar = defaults.sugar || SUGAR_OPTIONS[0] || "";
  state.ice = defaults.ice || ICE_OPTIONS[0] || "";
  state.toppings.clear();
  state.quantity = 1;

  const noteInput = $("#itemNote");
  if (noteInput) {
    noteInput.value = "";
  }

  normalizeChoicesForDrink(getSelectedDrink());
}

function addCurrentItemToCart() {
  const item = calculateCurrentItem();
  const note = $("#itemNote").value.trim();
  const toppingsText = isControlHidden("toppings")
    ? ""
    : item.toppings.length > 0
      ? item.toppings.map((topping) => `${topping.name} +${topping.chargedPrice}`).join("、")
      : "無加料";

  state.cart.push({
    itemId: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${state.cart.length}`,
    drinkId: item.drink.id,
    drinkName: item.drink.name,
    englishName: item.drink.english,
    category: item.drink.category,
    size: state.size,
    temperature: state.temperature,
    sugar: state.sugar,
    ice: state.ice,
    toppings: item.toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.chargedPrice,
    })),
    toppingsText,
    note,
    basePrice: item.basePrice,
    toppingTotal: item.toppingTotal,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    lineTotal: item.lineTotal,
  });

  resetItemChoices();
  renderAll();
}

function buildOrderPayload() {
  const total = state.cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const poll = getPollConfig();
  const pollEnabled = isPollEnabled();
  const pollVotes = pollEnabled ? getPollVotes() : [];
  const pollVotesText = pollVotes.join("、");
  const orderNote = $("#orderNote").value.trim();
  const noteWithPoll = [orderNote, pollEnabled ? `${poll.title}：${pollVotesText}` : ""].filter(Boolean).join("｜");
  return {
    orderId: `${getOrderPrefix()}-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`,
    createdAt: new Date().toISOString(),
    source: `${activeMenu?.storeName || "Drink order"} static order page`,
    store: {
      id: activeMenu?.id || "",
      name: activeMenu?.storeName || "",
    },
    customer: {
      name: $("#customerName").value.trim(),
    },
    note: noteWithPoll,
    orderNote,
    poll: {
      enabled: pollEnabled,
      title: pollEnabled ? poll.title : "",
      itemName: pollEnabled ? poll.itemName : "",
      minSelections: pollEnabled ? poll.minSelections : 0,
      maxSelections: pollEnabled ? poll.maxSelections : 0,
      votes: pollVotes,
      votesText: pollVotesText,
    },
    pollVotes,
    pollVotesText,
    itemCount: count,
    total,
    items: state.cart.map((item) => ({
      ...item,
      orderPollVotes: pollVotes,
      orderPollVotesText: pollVotesText,
    })),
  };
}

function validateCustomerName(showMessage = false) {
  const nameInput = $("#customerName");
  const hasName = Boolean(nameInput.value.trim());
  nameInput.setCustomValidity(hasName ? "" : "請填寫訂購人姓名。");

  if (!hasName && showMessage) {
    nameInput.reportValidity();
    nameInput.focus();
  }

  return hasName;
}

function validatePizzaVotes(showMessage = false) {
  if (!isPollEnabled()) return true;
  const poll = getPollConfig();
  const count = state.pollVotes.size;
  const isValid = count >= poll.minSelections && count <= poll.maxSelections;
  const hint = $("#pizzaVoteHint");

  if (!isValid) {
    hint.textContent =
      count < poll.minSelections
        ? `請先選擇${poll.itemName}，至少 ${poll.minSelections} 票。`
        : `${poll.itemName}最多只能投 ${poll.maxSelections} 票。`;
    hint.className = "submit-status error";
    if (showMessage) {
      $("#pizzaVoteTitle").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return isValid;
}

function renderSubmitSuccess(status) {
  const googleSheetUrl = getGoogleSheetUrl();
  status.textContent = "";

  if (!googleSheetUrl) {
    status.textContent = "已送出。尚未設定 googleSheetUrl，請到 Google Sheet 確認訂單是否新增。";
    return;
  }

  const message = document.createElement("span");
  message.textContent = "已送出。";

  const link = document.createElement("a");
  link.className = "sheet-link";
  link.href = googleSheetUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "開啟 Google Sheet 確認點餐內容";

  status.append(message);
  status.append(link);
}

function submitToGoogleSheet(sheetUrl, payload) {
  return new Promise((resolve) => {
    const frameName = `drink-order-submit-${Date.now()}`;
    const iframe = document.createElement("iframe");
    const form = document.createElement("form");
    const input = document.createElement("input");

    iframe.name = frameName;
    iframe.hidden = true;

    form.method = "POST";
    form.action = sheetUrl;
    form.target = frameName;
    form.hidden = true;

    input.type = "hidden";
    input.name = "payload";
    input.value = JSON.stringify(payload);

    form.appendChild(input);
    document.body.append(iframe, form);
    form.submit();

    setTimeout(() => {
      form.remove();
      iframe.remove();
      resolve();
    }, 1800);
  });
}

function goToCheckout() {
  const target = isPollEnabled() ? $("#pizzaVoteTitle") : $("#customerForm");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToCustomizerOnMobile() {
  if (!window.matchMedia("(max-width: 980px)").matches) return;
  $("#orderForm").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function submitOrder(event) {
  event.preventDefault();
  const status = $("#submitStatus");
  const sheetUrl = getSheetWebAppUrl();

  if (!validateCustomerName(true)) {
    status.textContent = "請先填寫訂購人姓名，才能送出訂單。";
    status.className = "submit-status error";
    return;
  }

  if (state.cart.length === 0) {
    status.textContent = `請先把${getMenuLabels().itemNoun}加入訂單。`;
    status.className = "submit-status error";
    return;
  }

  if (isPollEnabled() && !validatePizzaVotes(true)) {
    status.textContent = `請先完成${getPollConfig().title}，才能送出${getMenuLabels().itemNoun}訂單。`;
    status.className = "submit-status error";
    return;
  }

  const configError = getSheetUrlConfigError(sheetUrl);
  if (configError) {
    status.textContent = configError;
    status.className = "submit-status error";
    return;
  }

  const payload = buildOrderPayload();
  $("#submitOrderButton").disabled = true;
  status.textContent = "送出中...";
  status.className = "submit-status";

  try {
    await submitToGoogleSheet(sheetUrl, payload);
    state.cart = [];
    state.pollVotes.clear();
    $("#customerForm").reset();
    status.className = "submit-status success";
    renderSubmitSuccess(status);
    renderAll();
  } catch (error) {
    status.textContent = `送出失敗：${error.message}`;
    status.className = "submit-status error";
  } finally {
    $("#submitOrderButton").disabled = false;
  }
}

function bindEvents() {
  $("#categoryTabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.activeCategory = button.dataset.category;
    renderAll();
  });

  $("#drinkGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-drink-id]");
    if (!card) return;
    state.selectedDrinkId = card.dataset.drinkId;
    resetItemChoices();
    renderAll();
    goToCustomizerOnMobile();
  });

  $("#searchInput").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderDrinkCards();
  });

  $("#sizeOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button || button.disabled) return;
    state.size = button.dataset.size;
    renderAll();
  });

  $("#temperatureOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-temperature]");
    if (!button || button.disabled) return;
    state.temperature = button.dataset.temperature;
    renderAll();
  });

  $("#sugarOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-sugar]");
    if (!button) return;
    state.sugar = button.dataset.sugar;
    renderAll();
  });

  $("#iceOptions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-ice]");
    if (!button) return;
    state.ice = button.dataset.ice;
    renderAll();
  });

  $("#toppingOptions").addEventListener("change", (event) => {
    if (event.target.type !== "checkbox") return;
    if (event.target.checked) {
      state.toppings.add(event.target.value);
    } else {
      state.toppings.delete(event.target.value);
    }
    renderAll();
  });

  $("#pizzaVoteOptions").addEventListener("change", (event) => {
    if (!event.target.matches('input[type="checkbox"], input[type="radio"]')) return;
    const poll = getPollConfig();
    const isSingleChoice = poll.maxSelections === 1;

    if (isSingleChoice) {
      state.pollVotes.clear();
      if (event.target.checked) {
        state.pollVotes.add(event.target.value);
      }
      renderPizzaVotes();
      return;
    }

    if (event.target.checked) {
      if (state.pollVotes.size >= poll.maxSelections) {
        event.target.checked = false;
        renderPizzaVotes();
        return;
      }
      state.pollVotes.add(event.target.value);
    } else {
      state.pollVotes.delete(event.target.value);
    }
    renderPizzaVotes();
  });

  $("#quantityInput").addEventListener("input", (event) => {
    state.quantity = Math.min(99, Math.max(1, Number(event.target.value) || 1));
    renderCurrentPrice();
  });

  $("#decreaseQty").addEventListener("click", () => {
    state.quantity = Math.max(1, state.quantity - 1);
    renderCurrentPrice();
  });

  $("#increaseQty").addEventListener("click", () => {
    state.quantity = Math.min(99, state.quantity + 1);
    renderCurrentPrice();
  });

  $("#clearSelectionButton").addEventListener("click", () => {
    resetItemChoices();
    renderAll();
  });

  $("#addToCartButton").addEventListener("click", addCurrentItemToCart);
  $("#checkoutButton").addEventListener("click", goToCheckout);

  $("#cartItems").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-index]");
    if (!button) return;
    state.cart.splice(Number(button.dataset.removeIndex), 1);
    renderCart();
  });

  $("#clearCartButton").addEventListener("click", () => {
    state.cart = [];
    renderCart();
  });

  $("#customerForm").addEventListener("submit", submitOrder);
  $("#customerName").addEventListener("input", () => validateCustomerName(false));
}

async function init() {
  try {
    await Promise.all([loadActiveMenu(), loadActivePoll()]);
    bindEvents();
    renderAll();
  } catch (error) {
    renderStartupError(error);
  }
}

init();
