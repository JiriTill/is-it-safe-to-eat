import React from "react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { FOOD_DB } from "@/lib/data";
import QuickWizard from "@/components/QuickWizard";

export default function Home() {
  const top = [
    "cooked-chicken",
    "cooked-rice",
    "pizza-cooked",
    "eggs-hard-boiled",
    "fish-cooked",
    "ground-beef-raw"
  ];
  const items = FOOD_DB.filter(f => top.includes(f.id));

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Is it safe to eat?</h1>
        <p className="text-slate-300 mb-5">
          Type what you have and where it’s been. We’ll tell you how long it stays safe — in plain English.
        </p>
        <SearchBar />
        <p className="text-slate-400 text-xs mt-3">
          Examples: <span className="italic">fried chicken in fridge for 3 days</span>,{" "}
          <span className="italic">pizza left out overnight</span>,{" "}
          <span className="italic">sushi 1 day fridge</span>
        </p>
      </section>

      <QuickWizard />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular foods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(it => (
            <Link key={it.id} href={`/food/${it.id}`} className="card hover:brightness-110 transition">
              <div className="font-semibold">{it.name}</div>
              <div className="text-slate-400 text-sm">{(it.synonyms || []).slice(0,3).join(", ")}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

