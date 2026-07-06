import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Food Wheel",
  description:
    "Learn what Food Wheel is, why it was created, and how it helps users choose what to eat with manual options and real Google Places results.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 sm:px-6">
      <section className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">About</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">About Food Wheel</h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel is a lightweight decision tool for people who cannot decide what to eat.
            It helps turn an open-ended question into a short list, then uses a wheel to pick one
            option from the choices currently on the screen.
          </p>
          <p>
            The project was created for everyday food decisions: quick solo meals, office lunch,
            dinner plans, group makan choices, travel food searches, and moments when everyone has
            an opinion but nobody wants to choose. The goal is to keep the decision simple, not to
            become a full restaurant review platform.
          </p>
          <p>
            Food Wheel combines four useful parts: manual options typed by the user, an editable
            food type list, real nearby Google Places results, and a spin wheel. Manual options are
            always marked Manual / Not verified. Google verified results come from Google Places
            and must include real Google place data.
          </p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h2 className="font-semibold text-stone-950">How it works</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Choose a location or add options, pick a food type if helpful, search nearby places,
              remove anything unsuitable, and spin the wheel.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h2 className="font-semibold text-stone-950">Project notes</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Location permission is optional. Google Places results depend on Google data. Users
              control manual entries, filters, the editable food type list, and what gets added.
            </p>
          </div>
        </section>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          Food Wheel does not create fake restaurant listings, fake reviews, fake ratings, or fake
          promotions. If Google does not return a detail, the app does not invent it.
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Try Food Wheel
        </Link>
      </section>
    </main>
  );
}
