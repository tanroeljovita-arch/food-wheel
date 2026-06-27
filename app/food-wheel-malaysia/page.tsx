import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Wheel Malaysia | Random Makan Picker",
  description:
    "Food Wheel Malaysia helps with makan decisions by combining nearby Google Places results, manual food ideas, and a spin wheel.",
};

export default function FoodWheelMalaysiaPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Food Wheel Malaysia
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Make makan decisions easier in Malaysia
        </h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel can help Malaysia users decide where to makan for lunch, dinner, supper, or
            a casual group meal. Search nearby places, adjust your radius and filters, then spin
            from the real Google Places results that are returned.
          </p>
          <p>
            If you already have ideas, add them manually. Manual food options remain clearly marked
            as Manual / Not verified so they are not confused with Google verified places.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Use Food Wheel
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Does it work outside Malaysia?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Food Wheel can be used with selected locations in other countries when Google Places data is available.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Will every small stall appear?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Not always. Some small food places may not appear if they are not listed or returned by Google Places.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
