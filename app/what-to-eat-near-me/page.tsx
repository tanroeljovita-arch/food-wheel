import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What To Eat Near Me Picker | Food Wheel",
  description:
    "Use Food Wheel when you cannot decide what to eat near you. Search nearby places, filter by radius, hours, and price, then spin.",
};

export default function WhatToEatNearMePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          What to eat near me picker
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          What To Eat Near Me Picker
        </h1>

        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Asking what to eat near me sounds simple until every nearby option starts to blur
            together. Food Wheel turns that open-ended question into a short, editable list. Choose
            your current location or select a place from autocomplete, set a search radius, add a
            food keyword if you have one, and let the wheel help you choose.
          </p>
          <p>
            The search form is designed for realistic food decisions. Radius helps keep results
            close enough for the meal you actually want. Opening-hours filters help avoid places
            that are not useful for the selected time. Price filters depend on Google data when it
            is available, and places without price data may be handled differently depending on the
            selected filter.
          </p>
          <p>
            You can search broadly when you only know that you want food nearby, or you can type a
            cuisine, dish, or food style to narrow the results. Food Wheel uses real Google Places
            results and then filters them by your selected radius. It does not create fake nearby
            restaurants to make a list look fuller.
          </p>
          <p>
            After the results are added, the tool becomes a simple decision space. Delete anything
            that does not fit, keep manual ideas if you want to compare them with nearby places,
            and spin when the list feels good enough. The winner card shows the selected option,
            and Google verified places can open in Google Maps for directions and more details.
          </p>
          <p>
            This page is for people who do not need another long list. Sometimes the useful answer
            is not more browsing. It is a smaller set of real options, a quick way to remove what
            does not fit, and a random final pick that gets lunch, dinner, or supper moving.
          </p>
          <p>
            The map preview can also help you understand the search area before you search. It shows
            the selected or current location and the radius circle, so you can see whether the area
            is too narrow or too wide for the meal you have in mind. A short radius can be useful
            when you are walking. A larger radius may make sense when you are driving or planning
            ahead.
          </p>
          <p>
            Food Wheel is not trying to replace Google Maps. The app gives you a decision workflow:
            collect nearby choices, keep the list honest, spin, and then open Google Maps for full
            details when needed. Reviews, photos, directions, and opening details belong in Google
            Maps; Food Wheel keeps the choice process lightweight.
          </p>
          <p>
            It also works when you are choosing for later, not just right now. Select the area you
            expect to be in, use the meal-time filter, and build a list before the group starts
            debating. When the time comes, the wheel is ready.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Try Food Wheel
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Does Food Wheel use my current location?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Only when you click Use my current location and allow browser location access.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I choose a location without sharing GPS?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Type a place or area, select a Google autocomplete suggestion, and search from there.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">What does the radius do?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              The radius controls the search area. Results outside the selected distance are filtered out.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Do I need to enter a food keyword?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. You can search broadly nearby, or enter a keyword to focus on a cuisine or dish.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Why might a nearby place be missing?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Google may limit or omit results, and some small places may not have complete data.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
