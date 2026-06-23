const MAX_UNKNOWN_KEYWORD_QUERY_VARIANTS = 3;
export const MAX_KEYWORD_QUERY_VARIANTS = 5;

type FoodIntentMapping = {
  triggers: string[];
  queries: string[];
};

const FOOD_INTENT_MAPPINGS: FoodIntentMapping[] = [
  {
    triggers: ["thai", "thailand", "泰国", "泰國", "泰国餐", "泰國餐", "泰餐", "tomyam", "tom yum", "pad thai"],
    queries: ["thai restaurant", "thai food", "泰国餐", "tom yum", "pad thai"],
  },
  {
    triggers: ["chinese", "china", "中国餐", "中國餐", "中餐", "华餐", "華餐", "华人餐", "華人餐"],
    queries: ["chinese restaurant", "chinese food", "中餐", "中国餐", "dim sum"],
  },
  {
    triggers: ["hong kong", "hk", "香港", "港式", "cantonese", "粤菜", "粵菜"],
    queries: ["hong kong restaurant", "cantonese restaurant", "港式", "dim sum", "roast duck"],
  },
  {
    triggers: ["taiwan", "taiwanese", "台湾", "台灣", "台式"],
    queries: ["taiwanese restaurant", "taiwan food", "台式", "bubble tea", "lu rou fan"],
  },
  {
    triggers: ["korean", "korea", "韩国", "韓國", "韩餐", "韓餐", "korean bbq", "kimchi", "tteokbokki"],
    queries: ["korean restaurant", "korean food", "korean bbq", "kimchi", "tteokbokki"],
  },
  {
    triggers: ["japanese", "japan", "日本", "日餐", "寿司", "壽司", "ramen", "sushi"],
    queries: ["japanese restaurant", "japanese food", "sushi", "ramen", "izakaya"],
  },
  {
    triggers: ["indian", "india", "印度", "印度餐", "banana leaf", "biryani", "curry"],
    queries: ["indian restaurant", "indian food", "banana leaf", "biryani", "curry"],
  },
  {
    triggers: ["malay", "melayu", "马来餐", "馬來餐", "nasi lemak", "mee rebus", "rendang"],
    queries: ["malay restaurant", "malay food", "nasi lemak", "mee rebus", "rendang"],
  },
  {
    triggers: ["mamak", "mamak stall", "roti canai", "nasi kandar", "teh tarik"],
    queries: ["mamak", "nasi kandar", "roti canai", "teh tarik", "indian muslim restaurant"],
  },
  {
    triggers: ["indonesian", "indonesia", "印尼", "印尼餐", "ayam penyet", "bakso", "soto"],
    queries: ["indonesian restaurant", "indonesian food", "ayam penyet", "bakso", "soto"],
  },
  {
    triggers: ["western", "western food", "西餐", "burger", "steak", "pasta", "pizza"],
    queries: ["western food", "western restaurant", "burger", "steak", "pasta"],
  },
  {
    triggers: ["cafe", "coffee", "brunch", "cafe hopping", "咖啡", "咖啡厅", "咖啡廳", "早午餐"],
    queries: ["cafe", "coffee", "brunch", "cafe near me", "breakfast cafe"],
  },
  {
    triggers: ["dessert", "cake", "ice cream", "甜品", "甜点", "甜點", "蛋糕", "冰淇淋"],
    queries: ["dessert", "cake", "ice cream", "dessert cafe", "bakery"],
  },
  {
    triggers: ["vegetarian", "vegan", "素食", "斋", "齋"],
    queries: ["vegetarian restaurant", "vegetarian food", "vegan restaurant", "素食", "vegetarian cafe"],
  },
  {
    triggers: ["halal", "清真"],
    queries: ["halal restaurant", "halal food", "muslim friendly restaurant", "halal cafe", "halal food near me"],
  },
  {
    triggers: ["seafood", "海鲜", "海鮮"],
    queries: ["seafood restaurant", "seafood", "海鲜", "fish restaurant", "crab restaurant"],
  },
  {
    triggers: ["hotpot", "steamboat", "火锅", "火鍋"],
    queries: ["hotpot restaurant", "steamboat", "火锅", "mala hotpot", "chinese hotpot"],
  },
  {
    triggers: ["bbq", "barbecue", "grill", "烧烤", "燒烤", "烤肉"],
    queries: ["bbq restaurant", "barbecue", "grill restaurant", "korean bbq", "烤肉"],
  },
];

function normalizeKeyword(keyword: string) {
  return keyword.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function dedupeQueries(queries: string[]) {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const query of queries) {
    const trimmedQuery = query.trim().replace(/\s+/g, " ");
    const key = trimmedQuery.toLocaleLowerCase();

    if (!trimmedQuery || seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(trimmedQuery);
  }

  return deduped;
}

export function buildFoodSearchQueries(keyword: string): string[] {
  const normalizedKeyword = normalizeKeyword(keyword);

  if (!normalizedKeyword) {
    return [];
  }

  const knownIntent = FOOD_INTENT_MAPPINGS.find((mapping) =>
    mapping.triggers.some((trigger) => normalizedKeyword.includes(trigger.toLocaleLowerCase())),
  );

  if (knownIntent) {
    return dedupeQueries(knownIntent.queries).slice(0, MAX_KEYWORD_QUERY_VARIANTS);
  }

  return dedupeQueries([
    `${normalizedKeyword} restaurant`,
    `${normalizedKeyword} food`,
    normalizedKeyword,
  ]).slice(0, MAX_UNKNOWN_KEYWORD_QUERY_VARIANTS);
}
