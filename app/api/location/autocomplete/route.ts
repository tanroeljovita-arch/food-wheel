import { NextResponse } from "next/server";
import {
  getLocationAutocompleteSuggestions,
  type LocationAutocompleteBias,
} from "@/lib/googleLocation";

function parseLocationBias(value: unknown): LocationAutocompleteBias | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const bias = value as Record<string, unknown>;
  const lat = bias.lat;
  const lng = bias.lng;
  const source = bias.source;

  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return undefined;
  }

  return {
    lat,
    lng,
    radius: 50000,
    source:
      source === "current_location" || source === "selected_location"
        ? source
        : "selected_location",
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const input = (body as Record<string, unknown>).input;
  const locationBias = parseLocationBias((body as Record<string, unknown>).locationBias);

  if (typeof input !== "string") {
    return NextResponse.json({ error: "input must be a string." }, { status: 400 });
  }

  const trimmedInput = input.trim();

  if (trimmedInput.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  if (trimmedInput.length > 120) {
    return NextResponse.json({ error: "input must be 120 characters or fewer." }, { status: 400 });
  }

  try {
    const suggestions = await getLocationAutocompleteSuggestions(trimmedInput, locationBias);
    return NextResponse.json({ suggestions });
  } catch (error) {
    const rawMessage =
      error instanceof Error ? error.message : "Google location autocomplete failed.";
    const message = rawMessage.includes("API key is missing")
      ? "Location search is not configured yet."
      : rawMessage;
    const status = rawMessage.includes("API key is missing") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
