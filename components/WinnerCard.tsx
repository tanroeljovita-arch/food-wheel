import type { RestaurantItem } from "@/types/restaurant";

type WinnerCardProps = {
  canSpin: boolean;
  isSpinning: boolean;
  notice?: string | null;
  onRemoveWinner: () => void;
  onSpinAgain: () => void;
  winner: RestaurantItem | null;
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

export function WinnerCard({
  canSpin,
  isSpinning,
  notice,
  onRemoveWinner,
  onSpinAgain,
  winner,
}: WinnerCardProps) {
  return (
    <section className="min-w-0 rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-5">
      <h2 className="text-base font-semibold text-stone-950">Winner</h2>
      {notice ? (
        <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {notice}
        </p>
      ) : null}
      {winner ? (
        <div className="mt-4 min-w-0 rounded-md border border-amber-200 bg-amber-50 px-4 py-5">
          <p className="break-words text-2xl font-bold text-stone-950">{winner.name}</p>
          <span
            className={
              winner.verified
                ? "mt-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                : "mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-amber-200"
            }
          >
            {winner.verified ? "Google verified" : "Manual / Not verified"}
          </span>
          {winner.verified && typeof winner.rating === "number" ? (
            <p className="mt-3 text-sm font-medium text-stone-700">Rating: {winner.rating.toFixed(1)}</p>
          ) : null}
          {winner.verified && typeof winner.distanceMeters === "number" ? (
            <p className="mt-2 text-sm font-medium text-stone-700">
              {(winner.distanceMeters / 1000).toFixed(1)} km away
            </p>
          ) : null}
          {winner.verified && winner.placeType ? (
            <p className="mt-2 text-sm font-medium text-stone-700">
              {formatPlaceType(winner.placeType)}
            </p>
          ) : null}
          {winner.verified ? (
            <p className="mt-2 break-words text-sm font-medium text-stone-700">
              {getPriceLabel(winner)}
            </p>
          ) : null}
          <p className="mt-2 text-sm font-medium text-stone-700">
            {winner.verified
              ? getOpeningStatusLabel(winner.openingStatus)
              : "Opening hours not verified"}
          </p>
          {winner.verified && winner.address ? (
            <p className="mt-2 break-words text-sm leading-6 text-stone-700">{winner.address}</p>
          ) : null}
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              className="min-h-9 w-full rounded-md bg-stone-950 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
              disabled={!canSpin || isSpinning}
              onClick={onSpinAgain}
              type="button"
            >
              {isSpinning ? "Spinning..." : "Spin again"}
            </button>
            <button
              className="min-h-9 w-full rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:text-stone-400"
              disabled={isSpinning}
              onClick={onRemoveWinner}
              type="button"
            >
              Remove this option
            </button>
          </div>
          {winner.verified && winner.mapsUrl ? (
            <div className="mt-3 grid gap-3">
              <p className="text-sm text-stone-600">
                Open in Google Maps to view reviews, menu, photos, and directions.
              </p>
              <a
                className="inline-flex min-h-9 max-w-full items-center rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                href={winner.mapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open in Google Maps
              </a>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 rounded-md border border-dashed border-stone-300 bg-stone-50 px-3 py-4 text-sm text-stone-500">
          Spin the wheel to pick one option.
        </p>
      )}
    </section>
  );
}
