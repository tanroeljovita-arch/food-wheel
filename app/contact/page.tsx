import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Food Wheel",
  description:
    "Contact information for Food Wheel feedback, issues, and privacy questions.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-stone-950">Contact</h1>
        <div className="mt-4 space-y-4 leading-7 text-stone-700">
          <p>
            You can contact the site owner for feedback, bug reports, restaurant search issues, or
            privacy questions.
          </p>
          <p>Contact details will be added soon.</p>
        </div>
      </section>
    </main>
  );
}
