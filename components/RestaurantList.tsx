import type { RestaurantItem } from "@/types/restaurant";

type RestaurantListProps = {
  items: RestaurantItem[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onClearGoogle: () => void;
  onClearManual: () => void;
};

function getOpeningStatusLabel(status: RestaurantItem["openingStatus"]) {
  switch (status) {
    case "open_now":
      return "Open now";
    case "closed_now":
      return "Closed now";
    case "open_at_selected_time":
      return "Open at selected time";
    case "closed_at_selected_time":
      return "Closed at selected time";
    case "unknown":
    default:
      return "Hours unknown";
  }
}

function formatPlaceType(placeType: string) {
  return placeType.replace(/_/g, " ");
}

function formatMoneyValue(value: string | number | undefined, nanos?: number) {
  const units = typeof value === "number" ? value : typeof value === "string" ? Number(value) : undefined;

  if (typeof units !== "number" || !Number.isFinite(units)) {
    return undefined;
  }

  const amount = units + (typeof nanos === "number" ? nanos / 1_000_000_000 : 0);

  return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
}

function getFallbackPriceRange(priceLevel: RestaurantItem["priceLevel"]) {
  switch (priceLevel) {
    case "PRICE_LEVEL_INEXPENSIVE":
      return "RM 1–20";
    case "PRICE_LEVEL_MODERATE":
      return "RM 20–40";
    case "PRICE_LEVEL_EXPENSIVE":
      return "RM 40–60";
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return "RM 60+";
    default:
      return null;
  }
}

function getPriceLabel(item: RestaurantItem) {
  const startPrice = item.priceRange?.startPrice;
  const endPrice = item.priceRange?.endPrice;
  const start = formatMoneyValue(startPrice?.units, startPrice?.nanos);
  const end = formatMoneyValue(endPrice?.units, endPrice?.nanos);
  const currencyCode = startPrice?.currencyCode || endPrice?.currencyCode;
  const currencyLabel = !currencyCode || currencyCode === "MYR" ? "RM" : currencyCode;

  if (start && end) {
    return `${currencyLabel} ${start}–${end}`;
  }

  if (start) {
    return `${currencyLabel} ${start}+`;
  }

  if (end) {
    return `Up to ${currencyLabel} ${end}`;
  }

  const fallback = getFallbackPriceRange(item.priceLevel);

  if (fallback) {
    return `Estimated by Google price level: ${fallback}`;
  }

  return "Price unknown";
}

export function RestaurantList({
  items,
  onDelete,
  onClearAll,
  onClearGoogle,
  onClearManual,
}: RestaurantListProps) {
  const googleItemsCount = items.filter((item) => item.verified && item.source === "google_places").length;
  const manualItemsCount = items.filter((item) => item.source === "manual").length;

  return (
    <section className="min-w-0 rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-stone-950">Your options</h2>
          <span className="text-sm text-stone-500">
            {items.length === 1 ? "1 option" : `${items.length} options`}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:text-stone-400"
            disabled={items.length === 0}
            onClick={onClearAll}
            type="button"
          >
            Clear all
          </button>
          <button
            className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:text-stone-400"
            disabled={googleItemsCount === 0}
            onClick={onClearGoogle}
            type="button"
          >
            Clear Google
          </button>
          <button
            className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:text-stone-400"
            disabled={manualItemsCount === 0}
            onClick={onClearManual}
            type="button"
          >
            Clear manual
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-stone-300 bg-stone-50 px-3 py-4 text-sm text-stone-500">
          Add manual items or search nearby restaurants to start spinning.
        </p>
      ) : (
        <ul className="mt-4 grid min-w-0 gap-2.5">
          {items.map((item) => (
            <li
              className="grid min-w-0 gap-3 rounded-md border border-stone-200 bg-white px-3.5 py-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto]"
              key={item.id}
            >
              <div className="min-w-0">
                <p className="min-w-0 truncate text-sm font-semibold text-stone-950 sm:text-base">{item.name}</p>
                <span
                  className={
                    item.verified
                      ? "mt-1 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      : "mt-1 inline-flex rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600"
                  }
                >
                  {item.verified ? "Google verified" : "Manual / Not verified"}
                </span>
                <div className="mt-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-sm text-stone-600">
                  {item.verified && typeof item.rating === "number" ? (
                    <span>Rating: {item.rating.toFixed(1)}</span>
                  ) : null}
                  {item.verified && typeof item.distanceMeters === "number" ? (
                    <span>{(item.distanceMeters / 1000).toFixed(1)} km away</span>
                  ) : null}
                  {item.verified && item.placeType ? (
                    <span>{formatPlaceType(item.placeType)}</span>
                  ) : null}
                  {item.verified ? (
                    <span className="min-w-0 break-words">{getPriceLabel(item)}</span>
                  ) : null}
                  {item.verified ? (
                    <span>{getOpeningStatusLabel(item.openingStatus)}</span>
                  ) : (
                    <span>Opening hours not verified</span>
                  )}
                  {item.verified && item.address ? (
                    <span className="min-w-0 break-words sm:line-clamp-1">{item.address}</span>
                  ) : null}
                </div>
              </div>
              <div className="flex min-w-0 flex-wrap items-start gap-2 sm:justify-end">
                {item.verified && item.mapsUrl ? (
                  <a
                    className="inline-flex min-h-8 max-w-full items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    href={item.mapsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open in Google Maps
                  </a>
                ) : null}
                <button
                  aria-label={`Delete ${item.name}`}
                  className="min-h-8 shrink-0 rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-700 transition hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100"
                  onClick={() => onDelete(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
