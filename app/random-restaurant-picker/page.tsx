import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Random Restaurant Picker | Restaurant Wheel Spinner",
  description:
    "Use Food Wheel as a random restaurant picker. Add manual food ideas or real Google Places results, then spin a restaurant wheel.",
};

export default function RandomRestaurantPickerPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Random Restaurant Picker
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Random Restaurant Picker
        </h1>

        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel is a random restaurant picker for the familiar moment when the group is
            hungry, the options are open, and nobody wants to be the person who decides. Instead of
            scrolling endlessly or asking the same question again, you can build a short list and
            let the wheel make the final pick.
          </p>
          <p>
            The tool works in two simple ways. You can add your own options manually, such as a dish,
            cuisine, or place you already have in mind. You can also search nearby places through
            Google Places and add the real results that match your location, radius, opening-hours
            filter, and price filter. Food Wheel keeps these two kinds of options clearly separated:
            Google results are marked as verified, while manual entries are marked as Manual / Not
            verified.
          </p>
          <p>
            A restaurant wheel is most useful when you already have several reasonable choices but
            none of them feels like the obvious winner. Maybe you are choosing between quick food,
            a sit-down meal, something nearby, or a place that is open now. The wheel does not claim
            to know the perfect meal. It simply helps you move from indecision to action.
          </p>
          <p>
            Food Wheel is also useful for small groups. Everyone can suggest a few options, anything
            unpopular can be removed, and the remaining list can be spun. If the winner is not right
            for the moment, remove that option and spin again. The point is not to replace judgment,
            but to make the decision feel lighter.
          </p>
          <p>
            Search results depend on what Google Places returns for the selected area and filters.
            Some places may not appear, and Food Wheel does not invent missing restaurants, ratings,
            reviews, addresses, or map links. The list is meant to be a practical decision helper,
            not a complete directory of every food option nearby.
          </p>
          <p>
            A good way to use the picker is to start broad, then trim. Search nearby places, add the
            results that look reasonable, and remove anything that is too far, too expensive, closed,
            or simply not appealing today. If you already know the group wants something quick or
            casual, add only those options. If the plan is more relaxed, keep a wider list and let
            the restaurant wheel introduce a little randomness.
          </p>
          <p>
            The wheel is intentionally simple. It does not rank places, sell promotions, or pretend
            one choice is objectively best. It gives every current option a chance and shows the
            final winner clearly. That makes it useful for date-night indecision, family meals,
            office lunch, travel days, or any situation where choosing is taking longer than eating
            should.
          </p>
          <p>
            If the first result does not feel right, the list is still yours to edit and spin again.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Open Food Wheel
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">How does the random restaurant picker work?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Add food or restaurant options, then spin the wheel. The winner is selected from the
              current list only.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I use real nearby restaurant results?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Food Wheel can search Google Places using your selected or current location and
              add returned places to the wheel.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I add my own food spinner options?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Manual options can be added anytime. They stay marked Manual / Not verified.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Are Google results complete?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. Results depend on Google Places availability, filters, distance, and API limits.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I spin again after removing a result?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Remove the selected winner from the list, then spin again with the remaining options.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
