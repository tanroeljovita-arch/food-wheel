import { NextResponse } from "next/server";

const GOOGLE_PLACE_PHOTO_NAME_PATTERN = /^places\/[^/]+\/photos\/[^/]+$/;
const DEFAULT_MAX_WIDTH_PX = 400;
const MIN_MAX_WIDTH_PX = 100;
const MAX_MAX_WIDTH_PX = 1200;

function parseMaxWidthPx(value: string | null) {
  if (!value) {
    return DEFAULT_MAX_WIDTH_PX;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_MAX_WIDTH_PX;
  }

  return Math.min(MAX_MAX_WIDTH_PX, Math.max(MIN_MAX_WIDTH_PX, Math.round(parsed)));
}

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key is missing." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const photoName = url.searchParams.get("name");
  const maxWidthPx = parseMaxWidthPx(url.searchParams.get("maxWidthPx"));

  if (!photoName || !GOOGLE_PLACE_PHOTO_NAME_PATTERN.test(photoName)) {
    return NextResponse.json(
      { error: "A valid Google Places photo name is required." },
      { status: 400 },
    );
  }

  const mediaUrl = new URL(`https://places.googleapis.com/v1/${photoName}/media`);
  mediaUrl.searchParams.set("maxWidthPx", String(maxWidthPx));
  mediaUrl.searchParams.set("skipHttpRedirect", "true");
  mediaUrl.searchParams.set("key", apiKey);

  try {
    const response = await fetch(mediaUrl, {
      headers: {
        "X-Goog-Api-Key": apiKey,
      },
    });
    const data = (await response.json().catch(() => ({}))) as { photoUri?: string; error?: { message?: string } };

    if (!response.ok || !data.photoUri) {
      return NextResponse.json(
        { error: data.error?.message || "Google Places photo could not be loaded." },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.redirect(data.photoUri, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Google Places photo could not be loaded." },
      { status: 502 },
    );
  }
}
