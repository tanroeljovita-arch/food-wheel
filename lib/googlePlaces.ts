import { buildFoodSearchQueries } from "@/lib/foodSearchQueries";
import { normalizePlace } from "@/lib/normalizePlace";
import type { PlacesSearchInput } from "@/lib/validation";
import type { RestaurantItem } from "@/types/restaurant";

const GOOGLE_PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PLACE_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.rating",
  // Price fields can affect Google Places billing; they are requested only for filtering/display.
  "places.priceRange",
  "places.priceLevel",
  "places.location",
  "places.primaryType",
  "places.types",
  "places.googleMapsUri",
  // Opening-hours fields can affect Google Places billing; they are requested only for filtering.
  "places.currentOpeningHours",
  "places.regularOpeningHours",
].join(",");
const TEXT_SEARCH_FIELD_MASK = `${PLACE_FIELD_MASK},nextPageToken`;
const TEXT_SEARCH_PAGE_SIZE = 20;
const TEXT_SEARCH_MAX_PAGES = 3;
const EARTH_RADIUS_METERS = 6371000;
const EMPTY_KEYWORD_QUERIES = ["restaurant", "food", "meal takeaway", "cafe", "local food"];

type GooglePlacesResponse = {
  places?: unknown[];
  nextPageToken?: string;
  error?: {
    message?: string;
    status?: string;
  };
};

type OpeningPeriodPoint = {
  day?: number;
  hour?: number;
  minute?: number;
};

type OpeningPeriod = {
  open?: OpeningPeriodPoint;
  close?: OpeningPeriodPoint;
};

type GooglePlaceWithHours = Parameters<typeof normalizePlace>[0] & {
  currentOpeningHours?: {
    openNow?: boolean;
    periods?: OpeningPeriod[];
  };
  regularOpeningHours?: {
    periods?: OpeningPeriod[];
  };
};

type NormalizedPlaceWithRaw = {
  item: RestaurantItem;
  raw: GooglePlaceWithHours;
};

type PriceMoney = NonNullable<NonNullable<RestaurantItem["priceRange"]>["startPrice"]>;

async function fetchGooglePlacesPage(
  url: string,
  apiKey: string,
  fieldMask: string,
  body: Record<string, unknown>,
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json().catch(() => ({}))) as GooglePlacesResponse;

    if (!response.ok) {
      throw new Error(data.error?.message || "Google Places returned an error.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message !== "fetch failed") {
      throw error;
    }

    throw new Error(
      "Could not reach Google Places search. Check your internet connection, API key, and enabled Google Places APIs.",
    );
  }
}

function getDistanceMeters(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const lat1 = toRadians(fromLat);
  const lat2 = toRadians(toLat);
  const deltaLat = toRadians(toLat - fromLat);
  const deltaLng = toRadians(toLng - fromLng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

function getMinutesForWeek(day: number, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return day * 1440 + hours * 60 + minutes;
}

function isOpenAtTargetTime(periods: OpeningPeriod[] | undefined, targetDay: number, targetTime: string) {
  if (!periods || periods.length === 0) {
    return undefined;
  }

  const targetMinutes = getMinutesForWeek(targetDay, targetTime);
  const targetCandidates = [targetMinutes, targetMinutes + 7 * 1440];

  for (const period of periods) {
    if (
      typeof period.open?.day !== "number" ||
      typeof period.open?.hour !== "number" ||
      typeof period.open?.minute !== "number" ||
      typeof period.close?.day !== "number" ||
      typeof period.close?.hour !== "number" ||
      typeof period.close?.minute !== "number"
    ) {
      continue;
    }

    let openMinutes = period.open.day * 1440 + period.open.hour * 60 + period.open.minute;
    let closeMinutes = period.close.day * 1440 + period.close.hour * 60 + period.close.minute;

    if (closeMinutes <= openMinutes) {
      closeMinutes += 7 * 1440;
    }

    if (targetCandidates.some((candidate) => candidate >= openMinutes && candidate < closeMinutes)) {
      return true;
    }
  }

  return false;
}

function getOpeningStatus(place: GooglePlaceWithHours, input: PlacesSearchInput) {
  if (input.openingMode === "open_now") {
    if (place.currentOpeningHours?.openNow === true) {
      return "open_now" as const;
    }

    if (place.currentOpeningHours?.openNow === false) {
      return "closed_now" as const;
    }

    return "unknown" as const;
  }

  if (!input.targetTime) {
    return "unknown" as const;
  }

  const periods = place.currentOpeningHours?.periods || place.regularOpeningHours?.periods;
  const openAtSelectedTime = isOpenAtTargetTime(periods, input.targetDay, input.targetTime);

  if (openAtSelectedTime === true) {
    return "open_at_selected_time" as const;
  }

  if (openAtSelectedTime === false) {
    return "closed_at_selected_time" as const;
  }

  return "unknown" as const;
}

function getSelectedPriceRange(input: PlacesSearchInput) {
  if (input.priceFilter === "rm_1_20") {
    return { min: 1, max: 20 };
  }

  if (input.priceFilter === "rm_20_40") {
    return { min: 20, max: 40 };
  }

  if (input.priceFilter === "rm_40_60") {
    return { min: 40, max: 60 };
  }

  if (input.priceFilter === "rm_60_plus") {
    return { min: 60, max: Number.POSITIVE_INFINITY };
  }

  return null;
}

function moneyToNumber(money: PriceMoney | undefined) {
  if (!money) {
    return undefined;
  }

  const units =
    typeof money.units === "number"
      ? money.units
      : typeof money.units === "string"
        ? Number(money.units)
        : 0;
  const nanos = typeof money.nanos === "number" ? money.nanos / 1_000_000_000 : 0;
  const value = units + nanos;

  return Number.isFinite(value) ? value : undefined;
}

function usesMyrPriceRange(priceRange: RestaurantItem["priceRange"]) {
  const currencyCode = priceRange?.startPrice?.currencyCode || priceRange?.endPrice?.currencyCode;

  return !currencyCode || currencyCode === "MYR";
}

function getGooglePriceRangeBounds(item: RestaurantItem) {
  if (!item.priceRange || !usesMyrPriceRange(item.priceRange)) {
    return null;
  }

  const start = moneyToNumber(item.priceRange.startPrice);
  const end = moneyToNumber(item.priceRange.endPrice);

  if (typeof start !== "number" && typeof end !== "number") {
    return null;
  }

  const min = typeof start === "number" ? start : end;
  const max = typeof end === "number" ? end : start;

  if (typeof min !== "number" || typeof max !== "number") {
    return null;
  }

  return {
    min,
    max,
  };
}

function getPriceLevelFallbackBounds(priceLevel: string | undefined) {
  if (priceLevel === "PRICE_LEVEL_INEXPENSIVE") {
    return { min: 1, max: 20 };
  }

  if (priceLevel === "PRICE_LEVEL_MODERATE") {
    return { min: 20, max: 40 };
  }

  if (priceLevel === "PRICE_LEVEL_EXPENSIVE") {
    return { min: 40, max: 60 };
  }

  if (priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE") {
    return { min: 60, max: Number.POSITIVE_INFINITY };
  }

  return null;
}

function rangesOverlap(
  first: { min: number; max: number },
  second: { min: number; max: number },
) {
  return first.min <= second.max && second.min <= first.max;
}

function matchesSelectedPrice(item: RestaurantItem, input: PlacesSearchInput) {
  const selectedRange = getSelectedPriceRange(input);

  if (!selectedRange) {
    if (input.priceLevel) {
      return item.priceLevel === input.priceLevel;
    }

    return true;
  }

  const googleRange = getGooglePriceRangeBounds(item);

  if (googleRange) {
    return rangesOverlap(googleRange, selectedRange);
  }

  const fallbackRange = getPriceLevelFallbackBounds(item.priceLevel);

  return fallbackRange ? rangesOverlap(fallbackRange, selectedRange) : false;
}

function getPriceSortRank(item: RestaurantItem, input: PlacesSearchInput) {
  if (!input.priceFilter && !input.priceLevel) {
    return 0;
  }

  return matchesSelectedPrice(item, input) ? 0 : 1;
}

export async function searchGooglePlaces(input: PlacesSearchInput): Promise<RestaurantItem[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Places API key is missing. Add GOOGLE_MAPS_API_KEY to .env.local.");
  }

  const locationCircle = {
    center: {
      latitude: input.lat,
      longitude: input.lng,
    },
    radius: input.radius,
  };

  const places: unknown[] = [];
  const trimmedKeyword = input.keyword.trim();
  const searchQueries = trimmedKeyword ? buildFoodSearchQueries(trimmedKeyword) : EMPTY_KEYWORD_QUERIES;

  for (const query of searchQueries) {
    const baseBody = {
      textQuery: query,
      locationBias: {
        circle: locationCircle,
      },
      pageSize: TEXT_SEARCH_PAGE_SIZE,
    };
    let pageToken: string | undefined;

    for (let page = 0; page < TEXT_SEARCH_MAX_PAGES; page += 1) {
      const data = await fetchGooglePlacesPage(
        GOOGLE_PLACES_TEXT_SEARCH_URL,
        apiKey,
        TEXT_SEARCH_FIELD_MASK,
        pageToken ? { ...baseBody, pageToken } : baseBody,
      );

      if (Array.isArray(data.places)) {
        places.push(...data.places);
      }

      if (!data.nextPageToken) {
        break;
      }

      pageToken = data.nextPageToken;
    }
  }

  const dedupedValidPlaces = new Map<string, NormalizedPlaceWithRaw>();
  const placeMatchCounts = new Map<string, number>();
  const insideRadiusPlaces = new Map<string, RestaurantItem>();
  let insideRadiusCount = 0;
  let afterOpeningHoursCount = 0;
  let hiddenByOpeningHoursCount = 0;
  let afterPriceFilterCount = 0;
  let hiddenByPriceCount = 0;

  for (const place of places) {
    const googlePlace = place as GooglePlaceWithHours;
    const normalizedPlace = normalizePlace(googlePlace);

    if (
      !normalizedPlace?.placeId ||
      typeof normalizedPlace.lat !== "number" ||
      typeof normalizedPlace.lng !== "number"
    ) {
      continue;
    }

    placeMatchCounts.set(
      normalizedPlace.placeId,
      (placeMatchCounts.get(normalizedPlace.placeId) || 0) + 1,
    );

    if (!dedupedValidPlaces.has(normalizedPlace.placeId)) {
      dedupedValidPlaces.set(normalizedPlace.placeId, {
        item: normalizedPlace,
        raw: googlePlace,
      });
    }
  }

  for (const { item: normalizedPlace, raw } of dedupedValidPlaces.values()) {
    if (
      typeof normalizedPlace.lat !== "number" ||
      typeof normalizedPlace.lng !== "number" ||
      !normalizedPlace.placeId
    ) {
      continue;
    }

    const distanceMeters = getDistanceMeters(
      input.lat,
      input.lng,
      normalizedPlace.lat,
      normalizedPlace.lng,
    );

    if (distanceMeters > input.radius) {
      continue;
    }

    insideRadiusCount += 1;

    const openingStatus = getOpeningStatus(raw, input);

    if (openingStatus !== "open_now" && openingStatus !== "open_at_selected_time") {
      hiddenByOpeningHoursCount += 1;
      continue;
    }

    afterOpeningHoursCount += 1;

    if (input.priceFilter || input.priceLevel) {
      if (!matchesSelectedPrice(normalizedPlace, input)) {
        hiddenByPriceCount += 1;
        continue;
      }
    }

    insideRadiusPlaces.set(normalizedPlace.placeId, {
      ...normalizedPlace,
      distanceMeters,
      openingStatus,
    });
    afterPriceFilterCount += 1;
  }

  console.log("Google Places original food keyword", input.keyword);
  console.log("Google Places generated query variants", searchQueries);
  console.log("Google Places raw results fetched", places.length);
  console.log("Google Places query count", searchQueries.length);
  console.log("Google Places deduped count", dedupedValidPlaces.size);
  console.log("Google Places inside-radius count", insideRadiusCount);
  console.log("Google Places after opening-hours filter count", afterOpeningHoursCount);
  console.log("Google Places after price filter count", afterPriceFilterCount);
  console.log("Google Places final displayed count", insideRadiusPlaces.size);
  console.log("Google Places hidden by opening-hours filter", hiddenByOpeningHoursCount);
  console.log("Google Places hidden by price filter", hiddenByPriceCount);
  console.log("Google Places selected radius meters", input.radius);

  return Array.from(insideRadiusPlaces.values()).sort(
    (first, second) =>
      getPriceSortRank(first, input) - getPriceSortRank(second, input) ||
      (placeMatchCounts.get(second.placeId || "") || 0) -
        (placeMatchCounts.get(first.placeId || "") || 0),
  );
}
