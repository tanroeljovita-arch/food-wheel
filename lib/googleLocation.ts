const GOOGLE_PLACES_AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";
const GOOGLE_PLACES_DETAILS_URL = "https://places.googleapis.com/v1/places";
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

export async function getLocationAutocompleteSuggestions(
  input: string,
): Promise<LocationSuggestion[]> {
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
      }),
    });
  } catch {
    throw new Error(
      "Could not reach Google Places autocomplete. Check your internet connection, API key, and enabled Google Places APIs.",
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
