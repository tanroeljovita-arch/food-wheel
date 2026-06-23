const GOOGLE_PLACES_AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";
const GOOGLE_PLACES_DETAILS_URL = "https://places.googleapis.com/v1/places";
const JOHOR_FALLBACK_BIAS = {
  lat: 1.5586,
  lng: 103.637,
  radius: 50000,
  source: "johor_fallback",
} as const;
const AUTOCOMPLETE_FIELD_MASK = [
  "suggestions.placePrediction.place",
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text.text",
  "suggestions.placePrediction.structuredFormat.mainText.text",
  "suggestions.placePrediction.structuredFormat.secondaryText.text",
].join(",");
const LOCATION_DETAILS_FIELD_MASK = "id,displayName,formattedAddress,location";

export type LocationSuggestion = {
  placeId: string;
  mainText: string;
  secondaryText?: string;
  description: string;
};

export type LocationDetails = {
  placeId: string;
  lat: number;
  lng: number;
  formattedAddress?: string;
  displayName?: string;
};

export type LocationAutocompleteBias = {
  lat: number;
  lng: number;
  radius?: number;
  source?: "current_location" | "selected_location" | "johor_fallback";
};

type ResolvedLocationAutocompleteBias = {
  lat: number;
  lng: number;
  radius: number;
  source: "current_location" | "selected_location" | "johor_fallback";
};

type AutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      place?: string;
      placeId?: string;
      text?: {
        text?: string;
      };
      structuredFormat?: {
        mainText?: {
          text?: string;
        };
        secondaryText?: {
          text?: string;
        };
      };
    };
  }>;
  error?: {
    message?: string;
  };
};

type PlaceDetailsResponse = {
  id?: string;
  displayName?: {
    text?: string;
  };
  formattedAddress?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  error?: {
    message?: string;
  };
};

function getGoogleMapsApiKey() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Places API key is missing. Add GOOGLE_MAPS_API_KEY to .env.local.");
  }

  return apiKey;
}

function getAutocompleteQueryVariants(input: string) {
  const trimmedInput = input.trim();
  const normalizedInput = trimmedInput.toLocaleLowerCase();

  if (normalizedInput === "utm" || normalizedInput.startsWith("utm ")) {
    return dedupeStrings([trimmedInput, "UTM Skudai", "Universiti Teknologi Malaysia"]);
  }

  return [trimmedInput];
}

function getAutocompleteBias(locationBias?: LocationAutocompleteBias): ResolvedLocationAutocompleteBias {
  if (
    locationBias &&
    Number.isFinite(locationBias.lat) &&
    Number.isFinite(locationBias.lng) &&
    locationBias.lat >= -90 &&
    locationBias.lat <= 90 &&
    locationBias.lng >= -180 &&
    locationBias.lng <= 180
  ) {
    return {
      lat: locationBias.lat,
      lng: locationBias.lng,
      radius: locationBias.radius || 50000,
      source: locationBias.source || "selected_location",
    };
  }

  return JOHOR_FALLBACK_BIAS;
}

function dedupeSuggestions(suggestions: LocationSuggestion[]) {
  const seenPlaceIds = new Set<string>();
  const deduped: LocationSuggestion[] = [];

  for (const suggestion of suggestions) {
    if (seenPlaceIds.has(suggestion.placeId)) {
      continue;
    }

    seenPlaceIds.add(suggestion.placeId);
    deduped.push(suggestion);
  }

  return deduped;
}

function dedupeStrings(values: string[]) {
  const seenValues = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    const trimmedValue = value.trim();
    const key = trimmedValue.toLocaleLowerCase();

    if (!trimmedValue || seenValues.has(key)) {
      continue;
    }

    seenValues.add(key);
    deduped.push(trimmedValue);
  }

  return deduped;
}

async function fetchAutocompleteSuggestions(input: string, bias: ResolvedLocationAutocompleteBias) {
  let response: Response;

  try {
    response = await fetch(GOOGLE_PLACES_AUTOCOMPLETE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": getGoogleMapsApiKey(),
        "X-Goog-FieldMask": AUTOCOMPLETE_FIELD_MASK,
      },
      body: JSON.stringify({
        input,
        includeQueryPredictions: false,
        languageCode: "en",
        regionCode: "MY",
        locationBias: {
          circle: {
            center: {
              latitude: bias.lat,
              longitude: bias.lng,
            },
            radius: bias.radius,
          },
        },
      }),
    });
  } catch {
    throw new Error(
      "Could not reach Google Places autocomplete. Check your internet connection and enabled Google Places APIs.",
    );
  }

  const data = (await response.json().catch(() => ({}))) as AutocompleteResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || "Google location autocomplete returned an error.");
  }

  if (!Array.isArray(data.suggestions)) {
    return [];
  }

  const suggestions: LocationSuggestion[] = [];

  for (const suggestion of data.suggestions) {
    const prediction = suggestion.placePrediction;
    const placeId = prediction?.placeId || prediction?.place?.replace(/^places\//, "");
    const description = prediction?.text?.text?.trim();
    const structuredMainText = prediction?.structuredFormat?.mainText?.text?.trim();
    const secondaryText = prediction?.structuredFormat?.secondaryText?.text?.trim();

    if (!placeId || !description) {
      continue;
    }

    suggestions.push({
      placeId,
      mainText: structuredMainText || description,
      ...(secondaryText ? { secondaryText } : {}),
      description,
    });
  }

  return suggestions;
}

export async function getLocationAutocompleteSuggestions(
  input: string,
  locationBias?: LocationAutocompleteBias,
): Promise<LocationSuggestion[]> {
  const bias = getAutocompleteBias(locationBias);
  const queryVariants = getAutocompleteQueryVariants(input);
  const suggestions: LocationSuggestion[] = [];

  for (const query of queryVariants) {
    suggestions.push(...(await fetchAutocompleteSuggestions(query, bias)));
  }

  const dedupedSuggestions = dedupeSuggestions(suggestions);

  console.log("Location autocomplete input", input);
  console.log("Location autocomplete bias source", bias.source);
  console.log("Location autocomplete suggestion count", dedupedSuggestions.length);

  return dedupedSuggestions;
}

export async function getLocationDetails(placeId: string): Promise<LocationDetails> {
  const normalizedPlaceId = placeId.replace(/^places\//, "");
  let response: Response;

  try {
    response = await fetch(
      `${GOOGLE_PLACES_DETAILS_URL}/${encodeURIComponent(normalizedPlaceId)}`,
      {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": getGoogleMapsApiKey(),
          "X-Goog-FieldMask": LOCATION_DETAILS_FIELD_MASK,
        },
      },
    );
  } catch {
    throw new Error(
      "Could not reach Google Place Details. Check your internet connection, API key, and enabled Google Places APIs.",
    );
  }

  const data = (await response.json().catch(() => ({}))) as PlaceDetailsResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || "Google place details returned an error.");
  }

  const lat = data.location?.latitude;
  const lng = data.location?.longitude;

  if (typeof lat !== "number" || typeof lng !== "number") {
    throw new Error("Selected location does not include coordinates.");
  }

  return {
    placeId: data.id || normalizedPlaceId,
    lat,
    lng,
    formattedAddress: data.formattedAddress || undefined,
    displayName: data.displayName?.text || undefined,
  };
}
