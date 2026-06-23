import { NextResponse } from "next/server";
import { searchGooglePlaces } from "@/lib/googlePlaces";
import { validatePlacesSearchInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const validation = validatePlacesSearchInput(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const items = await searchGooglePlaces(validation.data);
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Google Places search failed.";
    const status = message.includes("API key is missing") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
