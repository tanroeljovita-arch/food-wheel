import { NextResponse } from "next/server";
import { getLocationDetails } from "@/lib/googleLocation";

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

  const placeId = (body as Record<string, unknown>).placeId;

  if (typeof placeId !== "string" || placeId.trim().length === 0) {
    return NextResponse.json({ error: "placeId is required." }, { status: 400 });
  }

  if (placeId.length > 200) {
    return NextResponse.json({ error: "placeId is too long." }, { status: 400 });
  }

  try {
    const location = await getLocationDetails(placeId.trim());
    return NextResponse.json(location);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Google place details failed.";
    const status = message.includes("API key is missing") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
