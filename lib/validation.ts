const MAX_KEYWORD_LENGTH = 80;
const OPENING_MODES = new Set(["open_now", "breakfast", "lunch", "dinner", "custom"]);
const PRICE_LEVELS = new Set([
  "PRICE_LEVEL_INEXPENSIVE",
  "PRICE_LEVEL_MODERATE",
  "PRICE_LEVEL_EXPENSIVE",
  "PRICE_LEVEL_VERY_EXPENSIVE",
]);
const PRICE_FILTERS = new Set(["budget", "moderate", "higher", "premium"]);
const MEAL_TIMES = {
  breakfast: "08:00",
  lunch: "12:30",
  dinner: "19:00",
} as const;

type OpeningMode = "open_now" | "breakfast" | "lunch" | "dinner" | "custom";
type PriceLevel =
  | "PRICE_LEVEL_INEXPENSIVE"
  | "PRICE_LEVEL_MODERATE"
  | "PRICE_LEVEL_EXPENSIVE"
  | "PRICE_LEVEL_VERY_EXPENSIVE";
type PriceFilter = "budget" | "moderate" | "higher" | "premium";

export type PlacesSearchInput = {
  lat: number;
  lng: number;
  radius: number;
  keyword: string;
  openingMode: OpeningMode;
  targetDay: number;
  targetTime?: string;
  priceLevel?: PriceLevel;
  priceFilter?: PriceFilter;
};

function isOpeningMode(value: unknown): value is OpeningMode {
  return typeof value === "string" && OPENING_MODES.has(value);
}

function isPriceLevel(value: unknown): value is PriceLevel {
  return typeof value === "string" && PRICE_LEVELS.has(value);
}

function isPriceFilter(value: unknown): value is PriceFilter {
  return typeof value === "string" && PRICE_FILTERS.has(value);
}

export function validatePlacesSearchInput(body: unknown):
  | { ok: true; data: PlacesSearchInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const input = body as Record<string, unknown>;
  const lat = input.lat;
  const lng = input.lng;
  const radius = input.radius;
  const keyword = input.keyword;
  const openingMode = input.openingMode;
  const targetDay = input.targetDay;
  const targetTime = input.targetTime;
  const priceLevel = input.priceLevel;
  const priceFilter = input.priceFilter;

  if (typeof lat !== "number" || !Number.isFinite(lat) || lat < -90 || lat > 90) {
    return { ok: false, error: "lat must be a number between -90 and 90." };
  }

  if (typeof lng !== "number" || !Number.isFinite(lng) || lng < -180 || lng > 180) {
    return { ok: false, error: "lng must be a number between -180 and 180." };
  }

  if (typeof radius !== "number" || !Number.isFinite(radius) || radius < 100 || radius > 50000) {
    return { ok: false, error: "radius must be a number between 100 and 50000." };
  }

  if (typeof keyword !== "string") {
    return { ok: false, error: "keyword must be a short string." };
  }

  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length > MAX_KEYWORD_LENGTH) {
    return { ok: false, error: `keyword must be ${MAX_KEYWORD_LENGTH} characters or fewer.` };
  }

  if (!isOpeningMode(openingMode)) {
    return { ok: false, error: "openingMode must be open_now, breakfast, lunch, dinner, or custom." };
  }

  if (
    typeof targetDay !== "number" ||
    !Number.isInteger(targetDay) ||
    targetDay < 0 ||
    targetDay > 6
  ) {
    return { ok: false, error: "targetDay must be a number between 0 and 6." };
  }

  let normalizedTargetTime: string | undefined;

  if (openingMode === "custom") {
    if (typeof targetTime !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(targetTime)) {
      return { ok: false, error: "Custom time must use HH:mm format." };
    }

    normalizedTargetTime = targetTime;
  } else if (openingMode === "breakfast" || openingMode === "lunch" || openingMode === "dinner") {
    normalizedTargetTime = MEAL_TIMES[openingMode];
  }

  let normalizedPriceLevel: PriceLevel | undefined;

  if (priceLevel !== undefined && priceLevel !== null && priceLevel !== "") {
    if (!isPriceLevel(priceLevel)) {
      return {
        ok: false,
        error:
          "priceLevel must be PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE, PRICE_LEVEL_EXPENSIVE, or PRICE_LEVEL_VERY_EXPENSIVE.",
      };
    }

    normalizedPriceLevel = priceLevel;
  }

  let normalizedPriceFilter: PriceFilter | undefined;

  if (priceFilter !== undefined && priceFilter !== null && priceFilter !== "") {
    if (!isPriceFilter(priceFilter)) {
      return { ok: false, error: "priceFilter must be budget, moderate, higher, or premium." };
    }

    normalizedPriceFilter = priceFilter;
  }

  return {
    ok: true,
    data: {
      lat,
      lng,
      radius,
      keyword: trimmedKeyword,
      openingMode,
      targetDay,
      targetTime: normalizedTargetTime,
      priceLevel: normalizedPriceLevel,
      priceFilter: normalizedPriceFilter,
    },
  };
}
