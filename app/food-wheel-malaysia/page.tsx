import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Wheel Malaysia | Random Restaurant Picker Malaysia",
  description:
    "Food Wheel Malaysia helps with lunch, dinner, supper, and group makan decisions using real Google Places results and manual options.",
};

export default function FoodWheelMalaysiaPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <article className="app-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Food Wheel Malaysia
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Food Wheel Malaysia
        </h1>

        <div className="mt-5 space-y-4 leading-7 text-stone-700">
          <p>
            Food Wheel Malaysia is for everyday makan decisions: lunch with coworkers, dinner with
            family, supper with friends, or a quick solo meal when you do not want to scroll for
            too long. Malaysia has many food styles and eating situations, from mamak and kopitiam
            trips to cafe plans, hawker food, takeaway, and casual restaurants. More choice is nice,
            but it can also slow the decision down.
          </p>
          <p>
            Food Wheel helps by turning the decision into a list and a spin. You can search a real
            location, set a radius in kilometers, and add returned Google Places results to the
            wheel. You can also add manual ideas such as a cuisine, a dish, or a place someone in
            the group already suggested. Manual entries are always marked Manual / Not verified.
          </p>
          <p>
            The Malaysia use case is especially practical for groups. One person wants something
            nearby, another wants something open now, someone else is thinking about price, and
            nobody wants to make the final call. Instead of debating until everyone gets hungrier,
            add the acceptable options, remove anything that does not fit, and spin.
          </p>
          <p>
            Google verified results come from Google Places only. Food Wheel does not create fake
            mamak shops, cafes, kopitiams, stalls, ratings, addresses, or promotions. If Google does
            not return a place or a detail, the app does not invent it. That keeps the difference
            clear between real Google Places data and manual suggestions typed by the user.
          </p>
          <p>
            The tool does not promise a complete list of every food place in Malaysia. Results can
            depend on Google Places availability, your selected area, radius, opening-hours data,
            price data, and the keywords you use. For a decision tool, that honesty matters. Food
            Wheel is meant to help you choose from practical options, not pretend to be a full food
            guide.
          </p>
          <p>
            For example, you might search near an office area during lunch, near home for dinner, or
            around a hangout spot for supper. You can keep the search broad, or use keywords such as
            a cuisine or food style. If the list feels too wide, reduce the radius or delete places
            that do not match the mood. If it feels too narrow, widen the radius or add a few manual
            ideas from the group.
          </p>
          <p>
            This makes Food Wheel useful without making it complicated. It respects the real-world
            messiness of makan decisions in Malaysia: different budgets, different cravings,
            different transport plans, and different ideas of what sounds good today. The final spin
            is just a friendly way to stop circling the same options.
          </p>
          <p>
            It can also help when nobody wants to be responsible for the choice. The group can agree
            on the shortlist first, then let the wheel decide from options everyone can accept.
            That keeps the decision playful without pretending the app knows more than the people eating.
          </p>
        </div>

        <Link className="btn-accent mt-6 w-full sm:w-auto" href="/">
          Use Food Wheel
        </Link>

        <section className="mt-8 grid gap-4">
          <h2 className="section-heading">FAQ</h2>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Is Food Wheel only for Malaysia?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. It can work with other locations too, as long as Google Places returns data.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can it help with mamak, cafe, or kopitiam ideas?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes, if Google returns relevant places or if you add those ideas manually.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Does it show every hawker or stall?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. Some small places may not be listed or returned by Google Places.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Can I use it for group makan decisions?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Yes. Add the group choices, remove anything unsuitable, and spin from the final list.
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/45 p-4">
            <h3 className="font-semibold text-stone-900">Are manual options verified?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              No. Manual options are user-entered and clearly marked Manual / Not verified.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
