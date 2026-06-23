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
    <section className="app-card-subtle">
      <div>
        <h2 className="section-heading">Add your own</h2>
        <p className="mt-1 text-sm leading-6 text-stone-500">
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
