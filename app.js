const CATEGORIES = [
  "全部",
  "台灣原茶",
  "朵朵與莎莎",
  "柚香橙韻",
  "水果調飲",
  "香醇鮮乳",
  "醇奶特調",
  "原茶調飲",
  "不失眠",
  "抱抱冬瓜",
];

const PIZZA_FLAVORS = [
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
];

const DRINKS = [
  {
    id: "alishan-jinxuan",
    category: "台灣原茶",
    name: "手採阿里山金萱",
    english: "Hand picked Alishan Jinxuan tea",
    note: "蘭花、奶油香、茉莉花",
    prices: { L: 40 },
    hot: true,
    recommended: true,
  },
  {
    id: "mingjian-winter-tea",
    category: "台灣原茶",
    name: "名間鄉冬片仔",
    english: "Winter tea",
    note: "花香、奶油香、堅果",
    prices: { L: 35 },
    hot: true,
    recommended: true,
  },
  {
    id: "ruby-black-tea",
    category: "台灣原茶",
    name: "台茶十八號・紅玉",
    english: "Ruby black tea",
    note: "薄荷、肉桂、荔枝",
    prices: { L: 35 },
    hot: true,
    recommended: true,
  },
  {
    id: "biluochun-green",
    category: "台灣原茶",
    name: "碧螺春・綠",
    english: "Biluochun green tea",
    note: "海苔香、豌豆香",
    prices: { L: 30 },
    hot: true,
    recommended: true,
  },
  {
    id: "jinxuan-oolong",
    category: "台灣原茶",
    name: "金萱烏龍",
    english: "Jinxuan oolong tea",
    note: "焙米香、蜂蜜香",
    prices: { L: 30 },
    hot: true,
    recommended: true,
  },
  {
    id: "jinxuan-black",
    category: "台灣原茶",
    name: "著涎金萱紅",
    english: "Jinxuan black tea",
    note: "蜜糖香、莓果香",
    prices: { L: 30 },
    hot: true,
    recommended: true,
  },
  {
    id: "cheese-jinxuan",
    category: "朵朵與莎莎",
    name: "金萱烏龍朵朵",
    english: "Cheese sauce on Jinxuan oolong tea",
    note: "原茶加朵朵",
    prices: { L: 55 },
    hot: true,
    recommended: true,
  },
  {
    id: "cheese-ruby",
    category: "朵朵與莎莎",
    name: "紅玉朵朵",
    english: "Cheese sauce on ruby black tea",
    note: "原茶加朵朵",
    prices: { L: 60 },
    hot: true,
    recommended: true,
  },
  {
    id: "cocoa-cereal-smoothie",
    category: "朵朵與莎莎",
    name: "可可脆片莎莎",
    english: "Cocoa cereal smoothie",
    note: "純冰沙、甜冰固定",
    prices: { L: 110 },
    fixedSugar: "甜冰固定",
    fixedIce: "甜冰固定",
  },
  {
    id: "cocoa-cereal-cheese-smoothie",
    category: "朵朵與莎莎",
    name: "可可脆片朵朵",
    english: "Cheese sauce on cocoa cereal smoothie",
    note: "奶蓋冰沙、甜冰固定",
    prices: { L: 120 },
    fixedSugar: "甜冰固定",
    fixedIce: "甜冰固定",
    recommended: true,
  },
  {
    id: "grapefruit-jinxuan",
    category: "柚香橙韻",
    name: "柚香金萱",
    english: "Grapefruit juice mixed Jinxuan oolong tea",
    note: "葡萄柚果汁，可免費加梅子一顆",
    prices: { L: 55 },
  },
  {
    id: "grapefruit-pulp-jinxuan",
    category: "柚香橙韻",
    name: "柚粒金萱",
    english: "Grapefruit pulp and juice mixed Jinxuan oolong tea",
    note: "葡萄柚果粒，可免費加梅子一顆",
    prices: { L: 65 },
    recommended: true,
  },
  {
    id: "grapefruit-pulp-yakult",
    category: "柚香橙韻",
    name: "柚粒多多",
    english: "Grapefruit pulp and juice mixed Yakult",
    note: "葡萄柚果粒，可免費加梅子一顆",
    prices: { L: 70 },
    caffeineFree: true,
  },
  {
    id: "orange-winter-tea",
    category: "柚香橙韻",
    name: "鮮橙冬片",
    english: "Orange juice mixed winter tea",
    note: "可免費加梅子一顆",
    prices: { L: 60 },
    recommended: true,
  },
  {
    id: "orange-lemon-fruit-tea",
    category: "柚香橙韻",
    name: "鮮橙香檸水果茶",
    english: "Lemon and orange juice mixed Biluochun green tea",
    note: "可免費加梅子一顆",
    prices: { L: 70 },
    recommended: true,
  },
  {
    id: "orange-yakult",
    category: "柚香橙韻",
    name: "鮮橙多多",
    english: "Orange juice mixed Yakult",
    note: "可免費加梅子一顆",
    prices: { L: 75 },
    caffeineFree: true,
  },
  {
    id: "pineapple-jinxuan-black",
    category: "水果調飲",
    name: "鳳梨金萱紅",
    english: "Jinxuan black tea mixed pineapple juice",
    note: "甜度固定",
    prices: { L: 55 },
    fixedSugar: "甜度固定",
    recommended: true,
  },
  {
    id: "lemon-passion-winter-tea",
    category: "水果調飲",
    name: "檸檬 / 百香 冬片仔",
    english: "Winter tea mixed lemon or passion fruit juice",
    note: "檸檬或百香二選一，請寫在備註",
    prices: { L: 50 },
    hot: true,
  },
  {
    id: "lemon-plum-green",
    category: "水果調飲",
    name: "檸檬梅綠",
    english: "Biluochun green tea mixed lemon juice and plum",
    note: "檸檬、梅子、綠茶",
    prices: { L: 50 },
    hot: true,
    recommended: true,
  },
  {
    id: "lemon-passion-yakult",
    category: "水果調飲",
    name: "檸檬 / 百香 多多",
    english: "Lemon or passion fruit juice mixed Yakult",
    note: "檸檬或百香二選一，請寫在備註",
    prices: { L: 70 },
    caffeineFree: true,
  },
  {
    id: "mulberry-ruby",
    category: "水果調飲",
    name: "桑莓紅玉",
    english: "Mulberry juice mixed ruby black tea with sweet agar jelly",
    note: "含原味寒天",
    prices: { L: 60 },
    recommended: true,
  },
  {
    id: "mulberry-fresh-milk",
    category: "水果調飲",
    name: "桑莓鮮奶",
    english: "Mulberry juice mixed fresh milk with sweet agar jelly",
    note: "含原味寒天",
    prices: { M: 65, L: 85 },
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "passion-pearl-coconut",
    category: "水果調飲",
    name: "百香・珍椰",
    english: "Passion fruit with pearl and coconut jelly",
    note: "含珍珠與椰果",
    prices: { L: 55 },
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "ruby-latte",
    category: "香醇鮮乳",
    name: "玉霞紅茶拿鐵",
    english: "Ruby black tea latte",
    note: "鮮乳茶",
    prices: { M: 45, L: 60 },
    hot: true,
    recommended: true,
  },
  {
    id: "jinxuan-latte",
    category: "香醇鮮乳",
    name: "金萱烏龍拿鐵",
    english: "Jinxuan oolong tea latte",
    note: "鮮乳茶",
    prices: { M: 45, L: 60 },
    hot: true,
    recommended: true,
  },
  {
    id: "honey-black-latte",
    category: "香醇鮮乳",
    name: "蜜香紅茶拿鐵",
    english: "Jinxuan black tea latte",
    note: "金萱紅鮮乳茶",
    prices: { M: 45, L: 60 },
    hot: true,
    recommended: true,
  },
  {
    id: "pearl-ruby-latte",
    category: "香醇鮮乳",
    name: "珍珠紅茶拿鐵",
    english: "Ruby black tea latte with pearl",
    note: "含珍珠",
    prices: { M: 45, L: 60 },
    hot: true,
  },
  {
    id: "pearl-coconut-ruby-latte",
    category: "香醇鮮乳",
    name: "珍椰・紅茶拿鐵",
    english: "Ruby black tea latte with pearl and coconut jelly",
    note: "含珍珠與椰果",
    prices: { M: 50, L: 65 },
    hot: true,
    recommended: true,
  },
  {
    id: "almond-ruby-latte",
    category: "香醇鮮乳",
    name: "杏仁凍紅茶拿鐵",
    english: "Ruby black tea latte with almond jelly",
    note: "含杏仁凍",
    prices: { M: 50, L: 65 },
    hot: true,
  },
  {
    id: "adult-cocoa-latte",
    category: "香醇鮮乳",
    name: "大人的可可拿鐵",
    english: "Brown sugar mixed cocoa latte",
    note: "甜度固定",
    prices: { M: 75, L: 90 },
    fixedSugar: "甜度固定",
    hot: true,
    recommended: true,
  },
  {
    id: "brown-sugar-milk-pearl",
    category: "香醇鮮乳",
    name: "黑糖鮮奶珍珠",
    english: "Brown sugar milk with pearl",
    note: "甜度固定",
    prices: { M: 65, L: 85 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
  },
  {
    id: "ruby-milk-tea",
    category: "醇奶特調",
    name: "玉霞醇奶茶",
    english: "Ruby black milk tea",
    note: "奶精奶茶",
    prices: { M: 35, L: 50 },
    hot: true,
    recommended: true,
  },
  {
    id: "pearl-milk-tea",
    category: "醇奶特調",
    name: "珍珠醇奶茶",
    english: "Ruby black milk tea with pearl",
    note: "含珍珠",
    prices: { M: 35, L: 50 },
    hot: true,
  },
  {
    id: "almond-milk-tea",
    category: "醇奶特調",
    name: "杏仁凍醇奶茶",
    english: "Ruby black milk tea with almond jelly",
    note: "含杏仁凍",
    prices: { M: 40, L: 55 },
  },
  {
    id: "pearl-coconut-milk-tea",
    category: "醇奶特調",
    name: "珍椰・醇奶茶",
    english: "Ruby black milk tea with pearl and coconut jelly",
    note: "含珍珠與椰果",
    prices: { M: 40, L: 55 },
    hot: true,
    recommended: true,
  },
  {
    id: "almond-winter-tea",
    category: "原茶調飲",
    name: "杏仁凍冬片仔",
    english: "Winter tea with almond jelly",
    note: "含杏仁凍",
    prices: { L: 50 },
    recommended: true,
  },
  {
    id: "yakult-green",
    category: "原茶調飲",
    name: "養樂多綠茶",
    english: "Biluochun green tea mixed Yakult",
    note: "養樂多綠茶",
    prices: { L: 50 },
  },
  {
    id: "plum-green",
    category: "原茶調飲",
    name: "春枝梅綠",
    english: "Biluochun green tea with plum",
    note: "梅子綠茶",
    prices: { L: 45 },
    hot: true,
    recommended: true,
  },
  {
    id: "pearl-coconut-jinxuan",
    category: "原茶調飲",
    name: "珍椰・金萱烏龍",
    english: "Jinxuan oolong tea with pearl and coconut jelly",
    note: "含珍珠與椰果",
    prices: { L: 45 },
    hot: true,
    recommended: true,
  },
  {
    id: "buckwheat-tea",
    category: "不失眠",
    name: "不苦蕎麥茶",
    english: "Buckwheat tea",
    note: "花蓮玉里，台灣原產地，農藥 0 檢出",
    prices: { L: 40 },
    hot: true,
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "buckwheat-wintermelon",
    category: "不失眠",
    name: "蕎麥冬露",
    english: "Buckwheat tea mixed wintermelon drink",
    note: "甜度固定",
    prices: { L: 50 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
  },
  {
    id: "buckwheat-fresh-milk",
    category: "不失眠",
    name: "不苦蕎麥鮮奶",
    english: "Buckwheat tea mixed fresh milk",
    note: "無咖啡因鮮奶茶",
    prices: { L: 65 },
    hot: true,
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "chrysanthemum-tea",
    category: "不失眠",
    name: "黃金菊花茶",
    english: "Chrysanthemum tea",
    note: "苗栗銅鑼，3-11 月期間限定",
    prices: { L: 50 },
    hot: true,
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "chrysanthemum-wintermelon",
    category: "不失眠",
    name: "菊花冬露",
    english: "Chrysanthemum tea mixed wintermelon drink",
    note: "甜度固定，3-11 月期間限定",
    prices: { L: 60 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
  },
  {
    id: "wintermelon",
    category: "抱抱冬瓜",
    name: "抱抱冬瓜露",
    english: "Wintermelon drink",
    note: "甜度固定，無添加石灰",
    prices: { L: 35 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "almond-wintermelon",
    category: "抱抱冬瓜",
    name: "杏仁凍冬露",
    english: "Wintermelon drink with almond jelly",
    note: "甜度固定，含杏仁凍",
    prices: { L: 50 },
    fixedSugar: "甜度固定",
    caffeineFree: true,
    recommended: true,
  },
  {
    id: "wintermelon-winter-tea",
    category: "抱抱冬瓜",
    name: "冬露冬片仔",
    english: "Wintermelon drink mixed winter tea",
    note: "甜度固定",
    prices: { L: 45 },
    fixedSugar: "甜度固定",
    hot: true,
    recommended: true,
  },
  {
    id: "lemon-wintermelon",
    category: "抱抱冬瓜",
    name: "檸檬冬露",
    english: "Wintermelon drink mixed lemon juice",
    note: "甜度固定",
    prices: { L: 50 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
  },
  {
    id: "wintermelon-fresh-milk",
    category: "抱抱冬瓜",
    name: "冬露鮮奶",
    english: "Wintermelon drink mixed fresh milk",
    note: "甜度固定",
    prices: { L: 65 },
    fixedSugar: "甜度固定",
    hot: true,
    caffeineFree: true,
  },
];

const TOPPINGS = [
  { id: "cheese", name: "朵朵奶蓋", price: 25, discountable: false },
  { id: "pearl", name: "珍珠", price: 10, discountable: true },
  { id: "almond", name: "杏仁凍", price: 15, discountable: true },
  { id: "coconut", name: "椰果", price: 15, discountable: true },
  { id: "pearl-coconut", name: "珍椰", price: 15, discountable: true },
  { id: "agar", name: "原味寒天", price: 15, discountable: true },
];

const SUGAR_OPTIONS = ["全糖", "少糖", "半糖", "微糖", "無糖"];
const ICE_OPTIONS = ["多冰", "正常", "少冰", "微冰", "去冰"];
const TEMPERATURE_OPTIONS = ["冷飲", "熱飲"];

const state = {
  activeCategory: "全部",
  search: "",
  selectedDrinkId: DRINKS[0].id,
  size: "L",
  temperature: "冷飲",
  sugar: "少糖",
  ice: "正常",
  toppings: new Set(),
  pizzaVotes: new Set(),
  quantity: 1,
  cart: [],
};

const $ = (selector) => document.querySelector(selector);
const formatPrice = (value) => `$${value.toLocaleString("zh-TW")}`;

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
  return DRINKS.find((drink) => drink.id === state.selectedDrinkId) || DRINKS[0];
}

function getAvailableSizes(drink) {
  return Object.entries(drink.prices)
    .filter(([, price]) => typeof price === "number")
    .map(([size]) => size);
}

function normalizeChoicesForDrink(drink) {
  const sizes = getAvailableSizes(drink);
  if (!sizes.includes(state.size)) {
    state.size = sizes.includes("L") ? "L" : sizes[0];
  }

  if (!drink.hot) {
    state.temperature = "冷飲";
  }

  if (drink.fixedSugar) {
    state.sugar = drink.fixedSugar;
  } else if (!SUGAR_OPTIONS.includes(state.sugar)) {
    state.sugar = "少糖";
  }

  if (drink.fixedIce) {
    state.ice = drink.fixedIce;
  } else if (state.temperature === "熱飲") {
    state.ice = "不加冰";
  } else if (!ICE_OPTIONS.includes(state.ice)) {
    state.ice = "正常";
  }
}

function getToppingBreakdown() {
  let regularCount = 0;
  return TOPPINGS.filter((topping) => state.toppings.has(topping.id)).map((topping) => {
    if (!topping.discountable) {
      return { ...topping, chargedPrice: topping.price };
    }
    regularCount += 1;
    return { ...topping, chargedPrice: regularCount === 1 ? topping.price : 5 };
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
      [drink.name, drink.english, drink.note, drink.category].join(" ").toLowerCase().includes(keyword);
    return inCategory && inSearch;
  });
}

function renderDrinkCards() {
  const drinks = getFilteredDrinks();
  $("#drinkGrid").innerHTML =
    drinks.length > 0
      ? drinks.map(renderDrinkCard).join("")
      : '<p class="empty-cart">找不到符合的飲料。</p>';
}

function renderDrinkCard(drink) {
  const prices = Object.entries(drink.prices)
    .filter(([, price]) => typeof price === "number")
    .map(([size, price]) => `<span>${size} ${formatPrice(price)}</span>`)
    .join("");
  const badges = [
    drink.recommended ? '<span class="badge">推薦</span>' : "",
    drink.hot ? '<span class="badge hot">可熱飲</span>' : "",
    drink.caffeineFree ? '<span class="badge caffeine">無咖啡因</span>' : "",
    drink.fixedSugar || drink.fixedIce ? `<span class="badge fixed">${drink.fixedSugar || drink.fixedIce}</span>` : "",
  ].join("");

  return `
    <button class="drink-card ${drink.id === state.selectedDrinkId ? "is-selected" : ""}" type="button" data-drink-id="${drink.id}">
      <span>
        <h3>${drink.name}</h3>
        <p class="english">${drink.english}</p>
        <p class="note">${drink.note}</p>
        <span class="badge-list">${badges}</span>
      </span>
      <span class="price-stack">${prices}</span>
    </button>
  `;
}

function renderSelectedDrink() {
  const drink = getSelectedDrink();
  $("#selectedDrink").innerHTML = `
    <strong>${drink.name}</strong>
    <span>${drink.category} · ${drink.note}</span>
  `;
}

function renderSizeOptions() {
  const drink = getSelectedDrink();
  const sizes = getAvailableSizes(drink);
  $("#sizeOptions").innerHTML = ["M", "L"]
    .map((size) => {
      const disabled = !sizes.includes(size);
      const price = drink.prices[size];
      return `
        <button type="button"
          data-size="${size}"
          class="${size === state.size ? "is-active" : ""}"
          ${disabled ? "disabled" : ""}>
          ${disabled ? `${size} -` : `${size} ${formatPrice(price)}`}
        </button>
      `;
    })
    .join("");
}

function renderTemperatureOptions() {
  const drink = getSelectedDrink();
  $("#temperatureOptions").innerHTML = TEMPERATURE_OPTIONS.map((temperature) => {
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
  const drink = getSelectedDrink();
  if (drink.fixedSugar) {
    $("#sugarOptions").innerHTML = `<button type="button" class="is-active" data-sugar="${drink.fixedSugar}">${drink.fixedSugar}</button>`;
    return;
  }

  $("#sugarOptions").innerHTML = SUGAR_OPTIONS.map(
    (sugar) => `
      <button type="button" data-sugar="${sugar}" class="${sugar === state.sugar ? "is-active" : ""}">
        ${sugar}
      </button>
    `,
  ).join("");
}

function renderIceOptions() {
  const drink = getSelectedDrink();
  if (drink.fixedIce) {
    $("#iceOptions").innerHTML = `<button type="button" class="is-active" data-ice="${drink.fixedIce}">${drink.fixedIce}</button>`;
    return;
  }

  if (state.temperature === "熱飲") {
    $("#iceOptions").innerHTML = '<button type="button" class="is-active" data-ice="不加冰">不加冰</button>';
    return;
  }

  $("#iceOptions").innerHTML = ICE_OPTIONS.map(
    (ice) => `
      <button type="button" data-ice="${ice}" class="${ice === state.ice ? "is-active" : ""}">
        ${ice}
      </button>
    `,
  ).join("");
}

function renderToppings() {
  const breakdown = getToppingBreakdown();
  const priceById = new Map(breakdown.map((topping) => [topping.id, topping.chargedPrice]));
  $("#toppingOptions").innerHTML = TOPPINGS.map((topping) => {
    const checked = state.toppings.has(topping.id);
    const shownPrice = checked ? priceById.get(topping.id) : topping.price;
    return `
      <label class="topping-option">
        <input type="checkbox" value="${topping.id}" ${checked ? "checked" : ""} />
        <span>${topping.name}</span>
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

function renderCart() {
  const cartItems = $("#cartItems");
  if (state.cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">尚未加入任何飲料。</p>';
  } else {
    cartItems.innerHTML = state.cart
      .map(
        (item, index) => `
        <article class="cart-item">
          <div>
            <h3>${item.drinkName} · ${item.size}</h3>
            <p>${item.quantity} 杯 · ${item.temperature} · ${item.sugar} · ${item.ice}</p>
            <p>${item.toppingsText}${item.note ? ` · ${item.note}` : ""}</p>
            <p>${formatPrice(item.unitPrice)} / 杯，共 ${formatPrice(item.lineTotal)}</p>
          </div>
          <button class="remove-item" type="button" aria-label="移除 ${item.drinkName}" data-remove-index="${index}">×</button>
        </article>
      `,
      )
      .join("");
  }

  const total = state.cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#grandTotal").textContent = formatPrice(total);
  $("#cartTotal").textContent = formatPrice(total);
  $("#cartCount").textContent = `${count} 杯`;
  $("#checkoutButton").disabled = count === 0;
}

function renderPizzaVotes() {
  const count = state.pizzaVotes.size;
  $("#pizzaVoteCount").textContent = `${count} / 4 票`;
  $("#pizzaVoteOptions").innerHTML = PIZZA_FLAVORS.map((flavor) => {
    const checked = state.pizzaVotes.has(flavor);
    const disabled = !checked && count >= 4;
    return `
      <label class="pizza-vote-option ${checked ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}">
        <input type="checkbox" value="${flavor}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
        <span>${flavor}</span>
      </label>
    `;
  }).join("");

  const hint = $("#pizzaVoteHint");
  if (count === 0) {
    hint.textContent = "請至少投 1 票披薩口味。";
    hint.className = "submit-status error";
  } else if (count === 4) {
    hint.textContent = "已投滿 4 票。";
    hint.className = "submit-status success";
  } else {
    hint.textContent = `已投 ${count} 票，還可以再投 ${4 - count} 票。`;
    hint.className = "submit-status";
  }
}

function renderAll() {
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
  state.size = "L";
  state.temperature = "冷飲";
  state.sugar = "少糖";
  state.ice = "正常";
  state.toppings.clear();
  state.quantity = 1;
  $("#itemNote").value = "";
}

function addCurrentItemToCart() {
  const item = calculateCurrentItem();
  const note = $("#itemNote").value.trim();
  const toppingsText =
    item.toppings.length > 0
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
  const pizzaVotes = Array.from(state.pizzaVotes);
  return {
    orderId: `UNO-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`,
    createdAt: new Date().toISOString(),
    source: "UNOCHA static order page",
    customer: {
      name: $("#customerName").value.trim(),
    },
    note: $("#orderNote").value.trim(),
    pizzaVotes,
    pizzaVotesText: pizzaVotes.join("、"),
    itemCount: count,
    total,
    items: state.cart,
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
  const count = state.pizzaVotes.size;
  const isValid = count >= 1 && count <= 4;
  const hint = $("#pizzaVoteHint");

  if (!isValid) {
    hint.textContent = count === 0 ? "請先投票披薩口味，至少 1 票。" : "披薩口味最多只能投 4 票。";
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
    const frameName = `unocha-submit-${Date.now()}`;
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
  $("#pizzaVoteTitle").scrollIntoView({ behavior: "smooth", block: "start" });
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
    status.textContent = "請先把飲料加入訂單。";
    status.className = "submit-status error";
    return;
  }

  if (!validatePizzaVotes(true)) {
    status.textContent = "請先投票披薩口味，才能送出飲料訂單。";
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
    state.pizzaVotes.clear();
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
    if (event.target.type !== "checkbox") return;
    if (event.target.checked) {
      if (state.pizzaVotes.size >= 4) {
        event.target.checked = false;
        renderPizzaVotes();
        return;
      }
      state.pizzaVotes.add(event.target.value);
    } else {
      state.pizzaVotes.delete(event.target.value);
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

function init() {
  bindEvents();
  renderAll();
}

init();
