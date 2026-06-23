export type RestaurantItem = {
  id: string;
  name: string;
  verified: boolean;
  source: "google_places" | "manual";
  placeId?: string;
  rating?: number;
  address?: string;
  lat?: number;
  lng?: number;
  distanceMeters?: number;
  placeType?: string;
  photoName?: string;
  photoUrl?: string;
  priceRange?: {
    startPrice?: {
      currencyCode?: string;
      units?: string | number;
      nanos?: number;
    };
    endPrice?: {
      currencyCode?: string;
      units?: string | number;
      nanos?: number;
    };
  };
  priceLevel?: string;
  openingStatus?: "open_now" | "closed_now" | "open_at_selected_time" | "closed_at_selected_time" | "unknown";
  mapsUrl?: string;
};
