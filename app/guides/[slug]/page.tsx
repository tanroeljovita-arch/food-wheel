import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.title} | Food Wheel`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 sm:px-6">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Food Wheel guide</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-5 leading-7 text-stone-700">{guide.intro}</p>

        <div className="mt-8 space-y-7">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-stone-950">{section.heading}</h2>
              <div className="mt-3 space-y-3 leading-7 text-stone-700">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          {guide.faqs.map((faq) => (
            <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4" key={faq.question}>
              <h3 className="font-semibold text-stone-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{faq.answer}</p>
            </div>
          ))}
        </section>

        <nav className="mt-8 rounded-2xl border border-orange-100 bg-white/70 p-4">
          <h2 className="font-semibold text-stone-950">Continue with Food Wheel</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium text-stone-700">
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/">Homepage</Link>
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/random-restaurant-picker">Random Restaurant Picker</Link>
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/what-to-eat-near-me">What to Eat Near Me</Link>
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/food-wheel-malaysia">Food Wheel Malaysia</Link>
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/makan-wheel-malaysia">Makan Wheel Malaysia</Link>
            <Link className="rounded-full bg-amber-50 px-3 py-2 ring-1 ring-orange-100" href="/guides">All Guides</Link>
          </div>
        </nav>
      </article>
    </main>
  );
}
