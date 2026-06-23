import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Food Wheel",
  description:
    "Read how Food Wheel handles manual entries, location use, Google Places data, cookies, and advertising information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-stone-950">Privacy Policy</h1>
        <div className="mt-5 space-y-6 leading-7 text-stone-700">
          <section>
            <h2 className="text-lg font-semibold text-stone-950">Information You Provide</h2>
            <p className="mt-2">
              You may type manual food or restaurant options into Food Wheel. These manual options
              are used to build your current spin list in your browser session. Food Wheel does not
              currently use login accounts or a database to save manual options.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-950">Location Use</h2>
            <p className="mt-2">
              Food Wheel may use browser geolocation only when you click &quot;Use my current
              location&quot;. Your browser will ask for permission before sharing your location.
            </p>
            <p className="mt-2">
              You may also type and select a location from Google Places autocomplete suggestions.
              The selected or shared coordinates are sent to a server-side API route so the app can
              request nearby Google Places results. Food Wheel does not currently store your
              location in a database.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-950">Google Places Data</h2>
            <p className="mt-2">
              Restaurant search, location autocomplete, and place details use Google Places through
              server-side API routes. Google Places may return names, addresses, ratings,
              coordinates, opening-hours data, price data, place types, and Google Maps links when
              available. Food Wheel does not invent missing Google data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-950">Cookies And Advertising</h2>
            <p className="mt-2">
              Food Wheel may include advertisement placeholders. Real advertising code has not been
              added yet.
            </p>
            <p className="mt-2">
              If advertising is added in the future, third-party vendors, including Google, may use
              cookies to serve ads. Google&apos;s use of advertising cookies may allow Google and its
              partners to serve ads based on visits to this site and other sites.
            </p>
            <p className="mt-2">
              You can opt out of personalized advertising through Google Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-950">Data Not Collected</h2>
            <p className="mt-2">
              Food Wheel does not currently collect account passwords, payment details, or login
              information because the app does not currently have accounts, payments, or login
              features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-950">Contact</h2>
            <p className="mt-2">
              For privacy questions, feedback, or issues, please contact the site owner. Contact
              details will be added soon.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
