import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What To Eat Near Me | Food Wheel",
  description:
    "Use Food Wheel when you cannot decide what to eat near you. Search nearby Google Places results, add manual ideas, and spin.",
};

export default function WhatToEatNearMePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          What to eat near me
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          A faster way to decide what to eat nearby
        </h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            When you are asking “what should I eat near me?”, Food Wheel helps turn nearby options
            into a simple decision. Choose a location, set a radius, search real Google Places
            results, and spin from the options you want to consider.
          </p>
          <p>
            You can also type your own food ideas if you already have a few choices in mind.
            Manual options stay clearly marked as not verified.
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
              Only if you click the current location button and allow browser location access.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I search without a food keyword?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. You can search broadly nearby, or add a cuisine, dish, or food type to narrow the results.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
