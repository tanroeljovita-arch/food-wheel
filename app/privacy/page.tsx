import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Food Wheel",
  description:
    "Read how Food Wheel handles location permission, Google Places data, browser localStorage, manual options, and advertising cookies.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 sm:px-6">
      <section className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Privacy</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">Privacy Policy</h1>
        <div className="mt-6 space-y-6 leading-7 text-stone-700">
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Location permission</h2>
            <p className="mt-2">
              Food Wheel uses browser geolocation only when you click Use my current location and
              allow your browser to share it. Location is used to search nearby restaurants and show
              the search radius preview. You can also type and select a location instead.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Google Places and Google Maps</h2>
            <p className="mt-2">
              Nearby place results, autocomplete, place details, photos, Google Maps links, and map
              preview features depend on Google services. Search coordinates, radius, keyword, and
              filters may be sent through server-side routes to request Google Places results.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Browser localStorage</h2>
            <p className="mt-2">
              The editable food type list may be saved in your browser using localStorage so your
              customized mini wheel list can stay available on the same device.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Manual options</h2>
            <p className="mt-2">
              Manually entered food or restaurant options are used in the current browser experience
              to build the spin list. Food Wheel does not currently require login accounts or store
              manual options in a site database.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">AdSense and advertising cookies</h2>
            <p className="mt-2">
              Food Wheel includes Google AdSense code for advertising review and ads. Google and
              its partners may use cookies or similar technologies to serve ads, measure ads, and
              personalize advertising depending on user settings and applicable consent requirements.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">No account or login</h2>
            <p className="mt-2">
              Food Wheel does not require account registration, passwords, payments, or login
              information to use the main tool.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Privacy contact</h2>
            <p className="mt-2">
              For privacy questions, contact <a className="font-semibold text-amber-800 underline" href="mailto:tanroel.jovita@gmail.com">tanroel.jovita@gmail.com</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
