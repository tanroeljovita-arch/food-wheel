"use client";

import { FormEvent, useState } from "react";

type ManualAddFormProps = {
  onAdd: (name: string) => boolean;
};

export function ManualAddForm({ onAdd }: ManualAddFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const wasAdded = onAdd(trimmedName);

    if (wasAdded) {
      setName("");
      setMessage(null);
      return;
    }

    setMessage("Skipped 1 duplicate item(s).");
  }

  return (
    <section className="min-w-0 rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-5">
      <h2 className="text-base font-semibold text-stone-950">Add your own</h2>
      <form className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="manual-option">
          Food or restaurant name
        </label>
        <input
          className="h-11 min-w-0 flex-1 rounded-md border border-stone-300 bg-stone-50 px-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
          id="manual-option"
          onChange={(event) => setName(event.target.value)}
          placeholder="Type a food or restaurant name"
          type="text"
          value={name}
        />
        <button
          className="min-h-11 rounded-md bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:w-auto"
          type="submit"
        >
          Add
        </button>
      </form>
      {message ? (
        <p className="mt-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-600">
          {message}
        </p>
      ) : null}
    </section>
  );
}
