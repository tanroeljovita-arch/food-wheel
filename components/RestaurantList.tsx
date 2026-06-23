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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Shortlist</p>
          <h2 className="section-heading mt-1">Your options</h2>
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
        <ul className="mt-4 grid min-w-0 gap-3.5">
          {items.map((item) => (
            <li
              className={
                item.verified && item.photoUrl
                  ? "grid min-w-0 gap-3 overflow-hidden rounded-[1.35rem] border border-orange-100/80 bg-white shadow-[0_16px_44px_rgba(68,64,60,0.08)] sm:grid-cols-[150px_minmax(0,1fr)] lg:grid-cols-[168px_minmax(0,1fr)_auto]"
                  : "grid min-w-0 gap-3 rounded-[1.35rem] border border-orange-100/80 bg-white/75 px-3.5 py-3.5 shadow-[0_10px_30px_rgba(68,64,60,0.05)] sm:grid-cols-[minmax(0,1fr)_auto]"
              }
              key={item.id}
            >
              {item.verified && item.photoUrl ? (
                <div className="aspect-[16/10] w-full overflow-hidden bg-orange-100 sm:aspect-auto sm:h-full sm:min-h-36">
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
              <div className={item.verified && item.photoUrl ? "min-w-0 px-3.5 pb-3.5 sm:px-0 sm:py-3.5" : "min-w-0"}>
                <p className="min-w-0 break-words text-base font-semibold leading-6 text-stone-950 sm:text-lg">{item.name}</p>
                <span
                  className={
                    item.verified
                      ? "mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/70"
                      : "mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200"
                  }
                >
                  {item.verified ? "Google verified" : "Manual / Not verified"}
                </span>
                <div className="mt-3 flex min-w-0 flex-wrap gap-2 text-sm leading-6 text-stone-600">
                  {item.verified && typeof item.rating === "number" ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800 ring-1 ring-amber-100">Rating: {item.rating.toFixed(1)}</span>
                  ) : null}
                  {item.verified && typeof item.distanceMeters === "number" ? (
                    <span className="rounded-full bg-stone-100 px-2.5 py-1">{(item.distanceMeters / 1000).toFixed(1)} km away</span>
                  ) : null}
                  {item.verified && item.placeType ? (
                    <span className="rounded-full bg-stone-100 px-2.5 py-1">{formatPlaceType(item.placeType)}</span>
                  ) : null}
                  {item.verified ? (
                    <span className="min-w-0 rounded-full bg-stone-100 px-2.5 py-1">{getPriceLabel(item)}</span>
                  ) : null}
                  {item.verified ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800 ring-1 ring-emerald-100">{getOpeningStatusLabel(item.openingStatus)}</span>
                  ) : (
                    <span className="rounded-full bg-stone-100 px-2.5 py-1">Opening hours not verified</span>
                  )}
                  {item.verified && item.address ? (
                    <span className="basis-full min-w-0 break-words text-stone-500 sm:line-clamp-2">{item.address}</span>
                  ) : null}
                </div>
              </div>
              <div className={item.verified && item.photoUrl ? "flex min-w-0 flex-wrap items-start gap-2 px-3.5 pb-3.5 sm:px-0 sm:py-3.5 sm:pr-3.5 lg:justify-end" : "flex min-w-0 flex-wrap items-start gap-2 sm:justify-end"}>
                {item.verified && item.mapsUrl ? (
                  <a
                    className="inline-flex min-h-10 max-w-full items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100"
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


