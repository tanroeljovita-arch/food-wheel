import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Makan Wheel Malaysia | Random Makan Picker",
  description:
    "Use Makan Wheel Malaysia for makan apa moments, lunch, dinner, supper, and group food decisions with real places and manual options.",
};

export default function MakanWheelMalaysiaPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Makan Wheel Malaysia
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Makan Wheel Malaysia
        </h1>

        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Makan apa? It is a small question that can take surprisingly long to answer. Makan
            Wheel Malaysia is the local-friendly side of Food Wheel: a simple way to gather meal
            ideas, search nearby places, and spin when the decision gets stuck.
          </p>
          <p>
            The tool is useful for everyday situations. Lunch break is short. Dinner plans are
            undecided. Supper sounds good, but nobody knows where to go. A group chat has too many
            opinions. Instead of dragging out the choice, add a few options, use real Google Places
            results when helpful, and let the wheel choose from the current list.
          </p>
          <p>
            You can use the current location button, select a location from suggestions, or search
            around a specific area. Radius, opening-hours, and price filters help narrow the list.
            If the search returns places that do not fit, delete them before spinning. If someone
            has a manual idea that is not returned by Google, add it manually and keep it in the
            same wheel.
          </p>
          <p>
            Food Wheel is careful about data. Google verified places come from Google Places and
            require real Google place data. Manual entries are not treated as verified. The app does
            not make up restaurants, stalls, reviews, ratings, menus, or addresses. If Google does
            not provide a detail, the app either leaves it out or labels it honestly.
          </p>
          <p>
            The result is not a perfect food directory, and it is not meant to be. It is a makan
            picker for real decisions: where to go now, what to consider nearby, and how to end the
            loop when everyone is hungry. Keep the options practical, spin the wheel, and move on
            with the meal.
          </p>
          <p>
            A useful flow is to let everyone contribute one or two ideas first. Search nearby if the
            group wants real places around the current area, then add any manual suggestions that
            did not appear. Remove anything that is too far, not open at the right time, or not
            suitable for the budget. Once the remaining choices all feel acceptable, the wheel can
            make the final call.
          </p>
          <p>
            The light local wording is intentional, but the app remains straightforward in English.
            Whether someone says makan apa, where to eat, or what should we get, the job is the
            same: reduce friction. Food Wheel gives the group a shared list, keeps Google results
            and manual entries clearly labeled, and makes the last step feel less serious.
          </p>
          <p>
            It is also flexible enough for solo decisions. If you are tired, busy, or just bored of
            choosing the same thing, search nearby, remove anything that does not fit, and let the
            picker suggest the next move.
          </p>
          <p>
            The aim is simple: less back-and-forth, more makan.
          </p>
          <p>
            That is the whole idea.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Start spinning
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">What does Makan Wheel mean?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              It means using a wheel-style picker to help decide what or where to makan.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I use it for lunch, dinner, and supper?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. You can adjust the opening-hours filter or use a custom time for your plan.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I add choices from a group chat?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Add them manually, then remove anything unsuitable before spinning.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Are manual makan ideas Google verified?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. They are kept separate and marked Manual / Not verified.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Why does the list change with filters?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Radius, opening-hours, price, and keyword filters affect which Google Places results are shown.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
