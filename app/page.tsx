"use client";

import Link from "next/link";
import { useState } from "react";
import { FoodWheel } from "@/components/FoodWheel";
import { ManualAddForm } from "@/components/ManualAddForm";
import { RestaurantList } from "@/components/RestaurantList";
import { SearchForm } from "@/components/SearchForm";
import { WinnerCard } from "@/components/WinnerCard";
import type { RestaurantItem } from "@/types/restaurant";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  const [items, setItems] = useState<RestaurantItem[]>([]);
  const [winner, setWinner] = useState<RestaurantItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [spinRequestToken, setSpinRequestToken] = useState(0);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  function addManualItem(name: string) {
    const normalizedName = name.trim().toLocaleLowerCase();
    const duplicateManualItem = items.some(
      (item) => item.source === "manual" && item.name.trim().toLocaleLowerCase() === normalizedName,
    );

    if (duplicateManualItem) {
      return false;
    }

    const item: RestaurantItem = {
      id: createId(),
      name,
      verified: false,
      source: "manual",
    };

    setItems((currentItems) => [...currentItems, item]);
    setWinner(null);
    setNotice(null);
    return true;
  }

  function getGooglePlaceIds(sourceItems: RestaurantItem[]) {
    return new Set(
      sourceItems
        .filter((item) => item.verified && item.source === "google_places" && item.placeId)
        .map((item) => item.placeId),
    );
  }

  function addGooglePlacesItems(results: RestaurantItem[], mode: "append" | "replace_google") {
    let skippedCount = 0;
    const currentGoogleItems = items.filter(
      (item) => item.verified && item.source === "google_places" && item.placeId,
    );
    const existingPlaceIds = mode === "append" ? getGooglePlaceIds(items) : new Set<string>();
    const newResults: RestaurantItem[] = [];

    for (const item of results) {
      if (!item.verified || item.source !== "google_places" || !item.placeId) {
        skippedCount += 1;
        continue;
      }

      if (existingPlaceIds.has(item.placeId)) {
        skippedCount += 1;
        continue;
      }

      existingPlaceIds.add(item.placeId);
      newResults.push(item);
    }

    setItems((currentItems) => {
      if (mode === "replace_google") {
        return [
          ...currentItems.filter((item) => item.source !== "google_places"),
          ...newResults,
        ];
      }

      return [...currentItems, ...newResults];
    });
    setWinner(null);
    setNotice(null);
    return {
      addedCount: newResults.length,
      skippedCount,
      replacedCount: mode === "replace_google" ? currentGoogleItems.length : 0,
    };
  }

  function deleteItem(id: string) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    setWinner((currentWinner) => (currentWinner?.id === id ? null : currentWinner));
    setNotice(null);
  }

  function selectWinner(nextWinner: RestaurantItem) {
    setWinner(nextWinner);
    setNotice(null);
  }

  function removeWinner() {
    if (!winner) {
      return;
    }

    const winnerToRemove = winner;

    setItems((currentItems) =>
      currentItems.filter((item) => {
        if (
          winnerToRemove.source === "google_places" &&
          winnerToRemove.placeId &&
          item.source === "google_places"
        ) {
          return item.placeId !== winnerToRemove.placeId;
        }

        return item.id !== winnerToRemove.id;
      }),
    );
    setWinner(null);
    setNotice("Removed from this spin list.");
  }

  function spinAgain() {
    if (items.length === 0 || isWheelSpinning) {
      return;
    }

    setNotice(null);
    setWinner(null);
    setSpinRequestToken((currentToken) => currentToken + 1);
  }

  function clearAllItems() {
    if (!window.confirm("Clear all items?")) {
      return;
    }

    setItems([]);
    setWinner(null);
    setNotice(null);
  }

  function clearGoogleItems() {
    setItems((currentItems) => currentItems.filter((item) => item.source !== "google_places"));
    setWinner((currentWinner) =>
      currentWinner?.source === "google_places" ? null : currentWinner,
    );
    setNotice(null);
  }

  function clearManualItems() {
    setItems((currentItems) => currentItems.filter((item) => item.source !== "manual"));
    setWinner((currentWinner) => (currentWinner?.source === "manual" ? null : currentWinner));
    setNotice(null);
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[78rem] gap-5 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <div className="grid min-w-0 gap-5">
        <header className="hero-shell">
          <div className="relative z-10 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="mb-3 inline-flex rounded-full border border-orange-200/80 bg-amber-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                Random restaurant picker
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-normal text-stone-950 sm:text-5xl">
                Food Wheel
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
                Can&apos;t decide what to eat? Search real nearby places, keep the options you like, then spin for your next meal.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
                <span className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-orange-100">Google Places results</span>
                <span className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-orange-100">Manual options</span>
                <span className="rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-orange-100">Spin to choose</span>
              </div>
            </div>
            <div className="hero-food-visual hidden lg:block" aria-hidden="true" />
          </div>
        </header>

        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="grid min-w-0 gap-5">
            <SearchForm onResults={addGooglePlacesItems} />
            <ManualAddForm onAdd={addManualItem} />
            <RestaurantList
              items={items}
              onClearAll={clearAllItems}
              onClearGoogle={clearGoogleItems}
              onClearManual={clearManualItems}
              onDelete={deleteItem}
            />
          </div>
          <div className="grid min-w-0 gap-5 xl:sticky xl:top-8">
            <FoodWheel
              items={items}
              onSpinningChange={setIsWheelSpinning}
              onSpinStart={() => {
                setNotice(null);
                setWinner(null);
              }}
              onWinnerSelected={selectWinner}
              spinRequestToken={spinRequestToken}
            />
            <WinnerCard
              canSpin={items.length > 0}
              isSpinning={isWheelSpinning}
              notice={notice}
              onRemoveWinner={removeWinner}
              onSpinAgain={spinAgain}
              winner={winner}
            />
          </div>
        </div>

        <section className="app-card-subtle">
          <h2 className="section-heading">More ways to use Food Wheel</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium text-stone-700">
            <Link className="rounded-full bg-white/75 px-3 py-2 ring-1 ring-orange-100 transition hover:bg-amber-50" href="/random-restaurant-picker">
              Random Restaurant Picker
            </Link>
            <Link className="rounded-full bg-white/75 px-3 py-2 ring-1 ring-orange-100 transition hover:bg-amber-50" href="/what-to-eat-near-me">
              What to Eat Near Me
            </Link>
            <Link className="rounded-full bg-white/75 px-3 py-2 ring-1 ring-orange-100 transition hover:bg-amber-50" href="/food-wheel-malaysia">
              Food Wheel Malaysia
            </Link>
            <Link className="rounded-full bg-white/75 px-3 py-2 ring-1 ring-orange-100 transition hover:bg-amber-50" href="/makan-wheel-malaysia">
              Makan Wheel Malaysia
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
}
