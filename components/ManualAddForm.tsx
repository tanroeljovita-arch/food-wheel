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
    <section className="app-card-subtle bg-white/70">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Personal shortlist</p>
          <h2 className="section-heading mt-1">Add your own</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-stone-500">
          Add a craving, dish, or place that is not from Google Places.
        </p>
      </div>
      <form className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="manual-option">
          Food or restaurant name
        </label>
        <input
          className="field-control min-w-0 flex-1"
          id="manual-option"
          onChange={(event) => setName(event.target.value)}
          placeholder="Type a food or restaurant name"
          type="text"
          value={name}
        />
        <button
          className="btn-accent w-full sm:w-auto sm:px-6"
          type="submit"
        >
          Add
        </button>
      </form>
      {message ? (
        <p className="status-box mt-3">
          {message}
        </p>
      ) : null}
    </section>
  );
}
