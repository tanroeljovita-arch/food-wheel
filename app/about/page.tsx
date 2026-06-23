import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Food Wheel",
  description:
    "Learn how Food Wheel helps users randomly pick restaurants or food options near them.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-stone-950">About Food Wheel</h1>
        <div className="mt-4 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel is a simple tool for people who cannot decide what to eat. You can build a
            list of food or restaurant options, spin the wheel, and let it randomly choose one.
          </p>
          <p>
            The app can help you choose where to eat by searching nearby places through Google
            Places. Restaurants marked as Google verified come from Google Places results and must
            include a Google place ID.
          </p>
          <p>
            You can also add your own options manually. Manual options are clearly marked as
            Manual / Not verified so they are not confused with Google Places results.
          </p>
          <p>
            Search results may depend on Google Places availability, your selected or shared
            location, radius, opening-hours data, price data, and the food keyword you enter. Food
            Wheel does not claim to show every restaurant or food stall in an area.
          </p>
          <p>
            The goal is to make choosing a meal easier while keeping the difference between real
            Google results and user-entered options clear.
          </p>
        </div>
      </section>
    </main>
  );
}
