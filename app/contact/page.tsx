import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Food Wheel",
  description:
    "Contact Food Wheel for feedback, bug reports, restaurant result issues, feature suggestions, or privacy questions.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Contact</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">Contact Food Wheel</h1>
        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Questions, feedback, and issue reports are welcome. Food Wheel is a small tool, so clear
            reports about what happened and what you expected are helpful.
          </p>
          <p>
            Email: <a className="font-semibold text-amber-800 underline" href="mailto:tanroel.jovita@gmail.com">tanroel.jovita@gmail.com</a>
          </p>
          <p>You can contact the site owner for bug reports, restaurant result issues, feature suggestions, privacy questions, and general feedback.</p>
          <p>
            Restaurant data comes from Google Places, so result availability, opening hours, ratings,
            addresses, and map links depend on what Google returns for the selected area and filters.
          </p>
        </div>
      </section>
    </main>
  );
}
