"use client";

import { FormEvent, useEffect, useState } from "react";
import type { RestaurantItem } from "@/types/restaurant";

type SearchFormProps = {
  onResults: (
    items: RestaurantItem[],
    mode: "append" | "replace_google",
  ) => { addedCount: number; skippedCount: number; replacedCount: number };
};

type PlacesSearchResponse = {
  items?: RestaurantItem[];
  error?: string;
};

type LocationSuggestion = {
  placeId: string;
  mainText: string;
  secondaryText?: string;
  description: string;
};

type AutocompleteResponse = {
  suggestions?: LocationSuggestion[];
  error?: string;
};

type LocationDetailsResponse = {
  placeId?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  displayName?: string;
  error?: string;
};

type SelectedLocation = {
  placeId?: string;
  label: string;
  lat: number;
  lng: number;
};

type LocationBias = {
  lat: number;
  lng: number;
  source: "current_location" | "selected_location";
};

type OpeningMode = "open_now" | "breakfast" | "lunch" | "dinner" | "custom";
type PriceFilter = "all" | "budget" | "moderate" | "higher" | "premium";

const fieldClassName =
  "field-control";
const labelClassName = "field-label";
const helperClassName = "helper-text";

export function SearchForm({ onResults }: SearchFormProps) {
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [locationBias, setLocationBias] = useState<LocationBias | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [radiusKm, setRadiusKm] = useState("1");
  const [keyword, setKeyword] = useState("");
  const [openingMode, setOpeningMode] = useState<OpeningMode>("open_now");
  const [customTime, setCustomTime] = useState("19:00");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [resultMode, setResultMode] = useState<"append" | "replace_google">("replace_google");
  const [message, setMessage] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const numericRadiusKm = Number(radiusKm);
  const isRadiusValid =
    Number.isFinite(numericRadiusKm) && numericRadiusKm >= 0.1 && numericRadiusKm <= 50;
  const radiusMeters = numericRadiusKm * 1000;

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCooldownSeconds((currentSeconds) => Math.max(0, currentSeconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldownSeconds]);

  useEffect(() => {
    const trimmedInput = locationInput.trim();

    if (selectedLocation && locationInput === selectedLocation.label) {
      setSuggestions([]);
      setLocationMessage(null);
      setIsLoadingSuggestions(false);
      return;
    }

    if (trimmedInput.length < 2) {
      setSuggestions([]);
      setLocationMessage(null);
      setIsLoadingSuggestions(false);
      return;
    }

    if (trimmedInput.length > 120) {
      setSuggestions([]);
      setLocationMessage("Location search must be 120 characters or fewer.");
      setIsLoadingSuggestions(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoadingSuggestions(true);
      setLocationMessage(null);
      console.log("autocomplete request", trimmedInput);

      try {
        const response = await fetch("/api/location/autocomplete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: trimmedInput,
            locationBias,
          }),
          signal: controller.signal,
        });
        const data = (await response.json()) as AutocompleteResponse;

        if (!response.ok) {
          setSuggestions([]);
          const errorMessage = data.error || "Could not load location suggestions.";
          console.log("autocomplete error", errorMessage);
          setLocationMessage(errorMessage);
          return;
        }

        const nextSuggestions = data.suggestions || [];
        console.log("autocomplete response count", nextSuggestions.length);
        setSuggestions(nextSuggestions);
        setLocationMessage(
          nextSuggestions.length === 0 ? "No location suggestions found." : null,
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
          console.log("autocomplete error", "Could not load location suggestions.");
          setLocationMessage("Could not load location suggestions.");
        }
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [locationInput, selectedLocation, locationBias]);

  function handleLocationInputChange(value: string) {
    setLocationInput(value);
    setMessage(null);

    if (selectedLocation && value !== selectedLocation.label) {
      setSelectedLocation(null);
      setLocationMessage("Please select a location from the suggestions.");
    }
  }

  function handlePriceFilterChange(value: PriceFilter) {
    setPriceFilter(value);
  }

  function handleLocationKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    setMessage("Please select a location from the suggestions or use your current location.");
  }

  function useCurrentLocation() {
    setMessage(null);
    setLocationMessage(null);

    if (!navigator.geolocation) {
      setMessage("Your browser does not support location sharing.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const label = "Current location";

        console.log("geolocation success");

        setSelectedLocation({
          label,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationBias({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          source: "current_location",
        });
        setLocationInput(label);
        setSuggestions([]);
        setLocationMessage(null);
        setMessage("Using your current location.");
        setIsLocating(false);
      },
      (error) => {
        console.log("geolocation error", error.message || error.code);
        setIsLocating(false);
        setMessage(
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. You can allow location access in browser settings or type and select a location."
            : "Could not get your current location. Please try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  async function selectSuggestion(suggestion: LocationSuggestion) {
    setMessage(null);
    setLocationMessage(null);
    setIsLoadingDetails(true);
    console.log("selected placeId", suggestion.placeId);

    try {
      const response = await fetch("/api/location/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeId: suggestion.placeId }),
      });
      const data = (await response.json()) as LocationDetailsResponse;

      if (!response.ok) {
        const errorMessage = data.error || "Could not load the selected location.";
        console.log("details error", errorMessage);
        setLocationMessage(errorMessage);
        return;
      }

      if (typeof data.lat !== "number" || typeof data.lng !== "number") {
        const errorMessage = "Selected location does not include coordinates.";
        console.log("details error", errorMessage);
        setLocationMessage(errorMessage);
        return;
      }

      const label = data.displayName || data.formattedAddress || suggestion.description;

      setSelectedLocation({
        placeId: data.placeId || suggestion.placeId,
        label,
        lat: data.lat,
        lng: data.lng,
      });
      setLocationBias({
        lat: data.lat,
        lng: data.lng,
        source: "selected_location",
      });
      console.log("details resolved lat/lng", data.lat, data.lng);
      setLocationInput(label);
      setSuggestions([]);
    } catch {
      console.log("details error", "Could not load the selected location.");
      setLocationMessage("Could not load the selected location.");
    } finally {
      setIsLoadingDetails(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!selectedLocation) {
      setMessage("Please select a location from the suggestions or use your current location.");
      return;
    }

    if (!isRadiusValid) {
      setMessage("Radius must be a number between 0.1 and 50 km.");
      return;
    }

    if (openingMode === "custom" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(customTime)) {
      setMessage("Custom time must use HH:mm format.");
      return;
    }

    if (cooldownSeconds > 0) {
      setMessage(`Please wait ${cooldownSeconds} seconds before searching again.`);
      return;
    }

    setIsSearching(true);
    console.log("restaurant search request started");

    try {
      const response = await fetch("/api/places/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          radius: radiusMeters,
          keyword,
          openingMode,
          targetDay: new Date().getDay(),
          targetTime: openingMode === "custom" ? customTime : undefined,
          priceFilter: priceFilter === "all" ? undefined : priceFilter,
        }),
      });

      const data = (await response.json()) as PlacesSearchResponse;

      if (!response.ok) {
        const errorMessage = data.error || "Google Places search failed. Please try again.";
        console.log("restaurant search error", errorMessage);
        setMessage(errorMessage);
        return;
      }

      const results = data.items || [];
      console.log("restaurant search response count", results.length);
      const summary = onResults(results, resultMode);
      const emptyMessage = "No restaurants found for this time within your selected radius.";
      const messages = [
        results.length === 0
          ? emptyMessage
          : `Showing ${results.length} real Google Places results that match your filters.`,
        results.length > 0 ? "Google may limit how many places are returned." : null,
        results.length > 0 && results.length <= 3
          ? "Google may return limited results for this food search. Try a larger radius or a related keyword."
          : null,
        "Price ranges are based on Google data when available.",
        "Some places may not provide price data.",
        results.length > 0
          ? "Some small stalls may not appear if they are not listed or returned by Google."
          : null,
        "Some places may be hidden because Google did not return opening-hours data.",
        priceFilter !== "all"
          ? "Some places may be hidden because Google does not provide price data."
          : null,
        results.length > 0 ? `${summary.addedCount} added to your wheel.` : null,
        summary.replacedCount > 0 ? `Replaced ${summary.replacedCount} Google verified item(s).` : null,
        summary.skippedCount > 0 ? `Skipped ${summary.skippedCount} duplicate item(s).` : null,
      ].filter(Boolean);

      setMessage(messages.join(" "));
    } catch {
      console.log("restaurant search error", "Could not search Google Places right now.");
      setMessage("Could not search Google Places right now. Please try again.");
    } finally {
      setIsSearching(false);
      setCooldownSeconds(10);
    }
  }

  return (
    <section className="app-card">
      <div>
        <h2 className="section-heading">Search nearby</h2>
        <p className="mt-1 text-sm leading-6 text-stone-500">
          Pick a real location, choose your filters, then add Google Places results to the wheel.
        </p>
      </div>
      <form className="mt-4 grid min-w-0 gap-4" aria-label="Search form" onSubmit={handleSubmit}>
        <div className="relative grid min-w-0 gap-2">
          <label className="text-sm font-medium text-stone-700" htmlFor="location-search">
            Location
          </label>
          <input
            autoComplete="off"
            className={fieldClassName}
            id="location-search"
            onChange={(event) => handleLocationInputChange(event.target.value)}
            onKeyDown={handleLocationKeyDown}
            placeholder="Type and select a location"
            type="text"
            value={locationInput}
          />
          <span className={helperClassName}>
            Search places near you. Add city or area for better accuracy, e.g. UTM Skudai.
          </span>
          {isLoadingSuggestions || isLoadingDetails ? (
            <p className={helperClassName}>
              {isLoadingDetails ? "Loading selected location..." : "Searching locations..."}
            </p>
          ) : null}
          {suggestions.length > 0 ? (
            <ul className="relative z-30 max-h-64 w-full overflow-auto rounded-2xl border border-orange-100 bg-white py-1 shadow-[0_18px_45px_rgba(68,64,60,0.14)]">
              {suggestions.map((suggestion) => (
                <li key={suggestion.placeId}>
                  <button
                    className="grid w-full gap-0.5 px-3.5 py-3 text-left transition hover:bg-amber-50 focus:bg-amber-50 focus:outline-none"
                    onClick={() => selectSuggestion(suggestion)}
                    type="button"
                  >
                    <span className="font-medium text-stone-900">{suggestion.mainText}</span>
                    {suggestion.secondaryText ? (
                      <span className="text-sm text-stone-500">{suggestion.secondaryText}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {locationMessage ? (
            <p className="status-box">
              {locationMessage}
            </p>
          ) : null}
          {selectedLocation ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm leading-6 text-emerald-700">
              Selected location: {selectedLocation.label}
            </p>
          ) : null}
        </div>

        <button
          className="btn-secondary w-full disabled:cursor-wait"
          disabled={isLocating || isSearching}
          type="button"
          onClick={useCurrentLocation}
        >
          {isLocating ? "Getting location..." : "Use my current location"}
        </button>

        <div className="grid min-w-0 gap-4 md:grid-cols-[170px_minmax(0,1fr)_minmax(0,1fr)]">
          <label className={`${labelClassName} md:order-2`}>
            Radius (km)
            <input
              className={fieldClassName}
              inputMode="decimal"
              min="0.1"
              max="50"
              onChange={(event) => setRadiusKm(event.target.value)}
              placeholder="1"
              step="0.001"
              type="number"
              value={radiusKm}
            />
          </label>

          <label className={`${labelClassName} md:order-1 md:col-span-3`}>
            Food keyword
            <input
              className={fieldClassName}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Try 中国餐, thai, ramen, nasi lemak..."
              type="text"
              value={keyword}
            />
            <span className={helperClassName}>
              Search by cuisine, dish, or food type. Results depend on Google Places data.
            </span>
          </label>
          <label className={`${labelClassName} md:order-3`}>
            Opening hours
            <select
              className={fieldClassName}
              onChange={(event) => setOpeningMode(event.target.value as OpeningMode)}
              value={openingMode}
            >
              <option value="open_now">Open now</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="custom">Custom time</option>
            </select>
          </label>

          <label className={`${labelClassName} md:order-4`}>
            Price
            <select
              className={fieldClassName}
              onChange={(event) => handlePriceFilterChange(event.target.value as PriceFilter)}
              value={priceFilter}
            >
              <option value="all">All prices</option>
              <option value="budget">Budget</option>
              <option value="moderate">Moderate</option>
              <option value="higher">Higher</option>
              <option value="premium">Premium</option>
            </select>
          </label>

          <p className={`${helperClassName} md:order-5 md:col-span-3`}>
            Price filters depend on Google data and may vary by place.
          </p>

          {openingMode === "custom" ? (
            <label className={`${labelClassName} md:order-6 md:col-span-3`}>
              Custom time
              <input
                className={fieldClassName}
                onChange={(event) => setCustomTime(event.target.value)}
                type="time"
                value={customTime}
              />
            </label>
          ) : null}
        </div>

        <fieldset className="grid gap-2 rounded-2xl border border-stone-200 bg-stone-50/80 p-3.5">
          <legend className="px-1 text-sm font-medium text-stone-700">Search result handling</legend>
          <label className="flex items-start gap-2 text-sm text-stone-700">
            <input
              checked={resultMode === "replace_google"}
              className="mt-0.5"
              name="result-mode"
              onChange={() => setResultMode("replace_google")}
              type="radio"
            />
            <span>Replace Google verified results only</span>
          </label>
          <label className="flex items-start gap-2 text-sm text-stone-700">
            <input
              checked={resultMode === "append"}
              className="mt-0.5"
              name="result-mode"
              onChange={() => setResultMode("append")}
              type="radio"
            />
            <span>Add to current list</span>
          </label>
        </fieldset>

        <button
          className="btn-primary w-full"
          disabled={isSearching || isLocating || isLoadingDetails || cooldownSeconds > 0}
          type="submit"
        >
          {isSearching ? "Searching..." : "Search Google Places"}
        </button>

        {cooldownSeconds > 0 ? (
          <p className="status-box">
            Please wait {cooldownSeconds} seconds before searching again.
          </p>
        ) : null}

        {message ? (
          <p className="status-box">
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
