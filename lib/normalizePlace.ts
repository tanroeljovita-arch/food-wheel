import type { RestaurantItem } from "@/types/restaurant";

type GooglePlace = {
  id?: string;
  displayName?: {
    text?: string;
  };
  formattedAddress?: string;
  rating?: number;
  priceLevel?: RestaurantItem["priceLevel"] | string;
  priceRange?: RestaurantItem["priceRange"];
  location?: {
    latitude?: number;
    longitude?: number;
  };
  primaryType?: string;
  types?: string[];
  photos?: Array<{
    name?: string;
  }>;
  googleMapsUri?: string;
};

export function normalizePlace(place: GooglePlace): RestaurantItem | null {
  const placeId = place.id;
  const name = place.displayName?.text?.trim();

  if (!placeId || !name) {
    return null;
  }

  const photoName = place.photos?.find((photo) => typeof photo.name === "string" && photo.name)?.name;

  return {
    id: `google_places:${placeId}`,
    name,
    verified: true,
    source: "google_places",
    placeId,
    rating: typeof place.rating === "number" ? place.rating : undefined,
    priceRange: normalizePriceRange(place.priceRange),
    priceLevel: typeof place.priceLevel === "string" ? place.priceLevel : undefined,
    address: place.formattedAddress || undefined,
    lat: typeof place.location?.latitude === "number" ? place.location.latitude : undefined,
    lng: typeof place.location?.longitude === "number" ? place.location.longitude : undefined,
    placeType: place.primaryType || place.types?.[0] || undefined,
    photoName,
    photoUrl: photoName
      ? `/api/places/photo?name=${encodeURIComponent(photoName)}&maxWidthPx=400`
      : undefined,
    mapsUrl:
      place.googleMapsUri ||
      `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
  };
}

function normalizePriceRange(priceRange: RestaurantItem["priceRange"] | undefined) {
  if (!priceRange || (!priceRange.startPrice && !priceRange.endPrice)) {
    return undefined;
  }

  return priceRange;
}
