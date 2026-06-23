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

function getPriceLevelLabel(priceLevel: RestaurantItem["priceLevel"]) {
  switch (priceLevel) {
    case "PRICE_LEVEL_INEXPENSIVE":
      return "Budget";
    case "PRICE_LEVEL_MODERATE":
      return "Moderate";
    case "PRICE_LEVEL_EXPENSIVE":
      return "Higher";
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return "Premium";
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

  if (currencyCode) {
    if (start && end) {
      return `${currencyCode} ${start}-${end}`;
    }

    if (start) {
      return `${currencyCode} ${start}+`;
    }

    if (end) {
      return `Up to ${currencyCode} ${end}`;
    }
  }

  const fallback = getPriceLevelLabel(item.priceLevel);

  if (fallback) {
    return `${fallback}`;
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
    <section className="app-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="section-heading">Your options</h2>
          <span className="text-sm text-stone-500">
            {items.length === 1 ? "1 option" : `${items.length} options`}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-danger"
            disabled={items.length === 0}
            onClick={onClearAll}
            type="button"
          >
            Clear all
          </button>
          <button
            className="btn-small"
            disabled={googleItemsCount === 0}
            onClick={onClearGoogle}
            type="button"
          >
            Clear Google
          </button>
          <button
            className="btn-small"
            disabled={manualItemsCount === 0}
            onClick={onClearManual}
            type="button"
          >
            Clear manual
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="empty-box mt-4">
          Add manual items or search nearby restaurants to start spinning.
        </p>
      ) : (
        <ul className="mt-4 grid min-w-0 gap-3">
          {items.map((item) => (
            <li
              className={
                item.verified && item.photoUrl
                  ? "grid min-w-0 gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/45 px-3.5 py-3.5 shadow-[0_8px_24px_rgba(68,64,60,0.04)] sm:grid-cols-[112px_minmax(0,1fr)_auto]"
                  : "grid min-w-0 gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/45 px-3.5 py-3.5 shadow-[0_8px_24px_rgba(68,64,60,0.04)] sm:grid-cols-[minmax(0,1fr)_auto]"
              }
              key={item.id}
            >
              {item.verified && item.photoUrl ? (
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100 sm:w-28">
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                    src={item.photoUrl}
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="min-w-0 break-words text-[15px] font-semibold leading-6 text-stone-950 sm:text-base">{item.name}</p>
                <span
                  className={
                    item.verified
                      ? "mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/70"
                      : "mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200"
                  }
                >
                  {item.verified ? "Google verified" : "Manual / Not verified"}
                </span>
                <div className="mt-2.5 flex min-w-0 flex-wrap gap-x-3 gap-y-1.5 text-sm leading-6 text-stone-600">
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
                    className="inline-flex min-h-10 max-w-full items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                    href={item.mapsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open in Google Maps
                  </a>
                ) : null}
                <button
                  aria-label={`Delete ${item.name}`}
                  className="btn-danger shrink-0"
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


