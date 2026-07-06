import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Food Wheel Guides",
  description:
    "Helpful Food Wheel guides for deciding what to eat, using a random restaurant picker, location search, and group food decisions.",
};

export default function GuidesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6">
      <section className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Guides</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">Food Wheel Guides</h1>
        <p className="mt-4 max-w-3xl leading-7 text-stone-700">
          Practical guides for using Food Wheel to decide what to eat, choose nearby restaurants,
          handle group food decisions, and understand how location-based search works.
        </p>
        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Open Food Wheel
        </Link>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            className="app-card-subtle block transition hover:-translate-y-0.5 hover:border-amber-200"
            href={`/guides/${guide.slug}`}
            key={guide.slug}
          >
            <h2 className="font-semibold text-stone-950">{guide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{guide.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
