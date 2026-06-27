import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Makan Wheel Malaysia | Food Wheel",
  description:
    "Use Makan Wheel Malaysia for lunch, dinner, supper, and group food decisions with real Google Places results and manual options.",
};

export default function MakanWheelMalaysiaPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Makan Wheel Malaysia
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Spin when the group cannot decide what to makan
        </h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Makan decisions can get stuck fast, especially for lunch groups, dinner plans, or
            late-night supper ideas. Food Wheel lets you gather options, keep the list editable,
            and spin for a random pick.
          </p>
          <p>
            Verified places come from Google Places. You can also add manual options like a dish,
            cuisine, or place you already know, and those stay marked as not verified.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Start spinning
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can this help with group decisions?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Add the group&apos;s options, remove anything people do not want, and spin again if needed.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Does Food Wheel create restaurant data?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. Google verified results come from Google Places, and manual entries are user-created and marked not verified.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
