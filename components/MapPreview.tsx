"use client";

import { useEffect, useRef, useState } from "react";

type MapPreviewProps = {
  latitude: number;
  longitude: number;
  radiusKm: number;
  locationLabel?: string;
};

declare global {
  interface Window {
    foodWheelGoogleMapsPromise?: Promise<void>;
    google?: any;
  }
}

function loadGoogleMaps(apiKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (window.foodWheelGoogleMapsPromise) {
    return window.foodWheelGoogleMapsPromise;
  }

  window.foodWheelGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-food-wheel-google-maps="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.foodWheelGoogleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });

  return window.foodWheelGoogleMapsPromise;
}

export function MapPreview({ latitude, longitude, radiusKm, locationLabel }: MapPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error" | "missing_key">("idle");
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
  const radiusMeters = Math.max(0, radiusKm * 1000);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsOpen(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!apiKey) {
      setStatus("missing_key");
      return;
    }

    const browserKey = apiKey;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || radiusMeters <= 0) {
      setStatus("error");
      return;
    }

    let isCancelled = false;

    async function renderMap() {
      setStatus("loading");

      try {
        await loadGoogleMaps(browserKey);

        if (isCancelled || !mapElementRef.current || !window.google?.maps) {
          return;
        }

        const center = { lat: latitude, lng: longitude };

        if (!mapRef.current) {
          mapRef.current = new window.google.maps.Map(mapElementRef.current, {
            center,
            clickableIcons: false,
            disableDefaultUI: true,
            gestureHandling: "cooperative",
            mapTypeControl: false,
            streetViewControl: false,
            zoom: 14,
            zoomControl: true,
          });

          markerRef.current = new window.google.maps.Marker({
            map: mapRef.current,
            position: center,
            title: locationLabel || "Search center",
          });

          circleRef.current = new window.google.maps.Circle({
            center,
            fillColor: "#f59e0b",
            fillOpacity: 0.14,
            map: mapRef.current,
            radius: radiusMeters,
            strokeColor: "#d97706",
            strokeOpacity: 0.75,
            strokeWeight: 2,
          });
        } else {
          mapRef.current.setCenter(center);
          markerRef.current?.setPosition(center);
          markerRef.current?.setTitle(locationLabel || "Search center");
          circleRef.current?.setCenter(center);
          circleRef.current?.setRadius(radiusMeters);
        }

        const bounds = circleRef.current?.getBounds();
        if (bounds) {
          mapRef.current.fitBounds(bounds, 28);
        }

        setStatus("ready");
      } catch {
        if (!isCancelled) {
          setStatus("error");
        }
      }
    }

    renderMap();

    return () => {
      isCancelled = true;
    };
  }, [apiKey, isOpen, latitude, locationLabel, longitude, radiusMeters]);

  if (!apiKey && process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-800">Search area map</p>
          <p className="helper-text">
            This shows the area used for your nearby search. Your location is only used to find nearby places.
          </p>
        </div>
        <button className="btn-small shrink-0" onClick={() => setIsOpen((current) => !current)} type="button">
          {isOpen ? "Hide map" : "Show search area map"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_12px_28px_rgba(68,64,60,0.08)]">
          {status === "missing_key" ? (
            <div className="grid min-h-[180px] place-items-center px-4 py-6 text-center text-sm leading-6 text-stone-500 md:min-h-[230px]">
              Add NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY to .env.local to preview the search radius map.
            </div>
          ) : (
            <div className="relative">
              <div ref={mapElementRef} className="h-[190px] w-full md:h-[240px]" />
              {status === "loading" || status === "idle" ? (
                <div className="absolute inset-0 grid place-items-center bg-white/75 text-sm font-medium text-stone-500">
                  Loading map...
                </div>
              ) : null}
              {status === "error" ? (
                <div className="absolute inset-0 grid place-items-center bg-white/85 px-4 text-center text-sm leading-6 text-stone-500">
                  Could not load the map preview right now.
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
