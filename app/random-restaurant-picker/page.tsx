import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Random Restaurant Picker | Food Wheel",
  description:
    "Use Food Wheel as a random restaurant picker. Add your own options or search real nearby places, then spin the wheel to choose.",
};

export default function RandomRestaurantPickerPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Random restaurant picker
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Pick a restaurant without overthinking it
        </h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel is a simple random restaurant picker for moments when everyone is hungry
            but nobody wants to make the final call. Add your own food ideas, search real nearby
            places from Google Places, and spin the wheel.
          </p>
          <p>
            Google verified options come from Google Places data. Manual options are kept separate
            and marked as not verified, so the list stays clear and honest.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Open Food Wheel
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I add my own restaurant ideas?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Manual options can be added to the wheel, and they are marked Manual / Not verified.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Are Google results guaranteed complete?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. Results depend on Google Places availability, your selected location, filters, and API limits.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
