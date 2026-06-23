import { NextResponse } from "next/server";
import { getLocationAutocompleteSuggestions } from "@/lib/googleLocation";

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
    const suggestions = await getLocationAutocompleteSuggestions(trimmedInput);
    return NextResponse.json({ suggestions });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Google location autocomplete failed.";
    const status = message.includes("API key is missing") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
