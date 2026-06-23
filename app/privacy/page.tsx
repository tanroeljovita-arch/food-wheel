export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-stone-950">Privacy</h1>
        <div className="mt-4 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel may use browser geolocation only when you click &quot;Use my current
            location&quot;. Your browser will ask for permission before sharing your location.
          </p>
          <p>
            Location coordinates are used to search for nearby restaurants. When you search, the app
            sends your coordinates and food keyword to a server-side API route, which requests
            restaurant results from Google Places.
          </p>
          <p>
            If you type a location, the app sends the typed text to a server-side API route to
            request Google Places autocomplete suggestions. When you select a suggestion, the app
            requests that place&apos;s coordinates from Google Places so restaurant search can use the
            selected location.
          </p>
          <p>
            Manual items you add are only used in your current browser session unless future saving
            features are added.
          </p>
          <p>No login or database is currently used.</p>
          <p>Advertisement placeholders may exist, but real ads are not added yet.</p>
        </div>
      </section>
    </main>
  );
}
