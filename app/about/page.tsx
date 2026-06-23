export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-stone-950">About Food Wheel</h1>
        <p className="mt-4 leading-7 text-stone-700">
          Food Wheel helps you decide what to eat by building a list of options and spinning a
          wheel to choose one at random.
        </p>
        <p className="mt-4 leading-7 text-stone-700">
          You can add your own food or restaurant ideas manually, or search nearby restaurants
          using real results from Google Places. Google verified results stay separate from manual
          items so it is clear which options came from Google and which ones you typed yourself.
        </p>
      </section>
    </main>
  );
}
