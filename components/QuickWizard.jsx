"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FOOD_DB, findFoodByQuery, suggestFoods } from "@/lib/data";

export default function QuickWizard() {
  const router = useRouter();
  const [food, setFood] = useState("");
  const [env, setEnv] = useState("fridge");    // fridge | pantry | freezer
  const [days, setDays] = useState("");        // allow 0.5
  const [hours, setHours] = useState("");      // or direct hours
  const [suggest, setSuggest] = useState([]);

  const datalistOptions = useMemo(() => {
    // Names + a few synonyms for datalist
    const opts = new Set();
    for (const f of FOOD_DB) {
      opts.add(f.name);
      (f.synonyms || []).slice(0, 3).forEach(s => opts.add(s));
    }
    return Array.from(opts).sort();
  }, []);

  function onCheck() {
    if (!food.trim()) {
      alert("Type a food (e.g., 'cooked chicken' or 'cut watermelon').");
      return;
    }
    const match = findFoodByQuery(food);
    if (!match) {
      setSuggest(suggestFoods(food, 5));
      return;
    }
    const params = new URLSearchParams();
    if (env) params.set("env", env);
    const d = Number(days);
    const h = Number(hours);
    if (!isNaN(h) && h > 0) params.set("h", String(h));
    else if (!isNaN(d) && d > 0) params.set("d", String(d)); // supports 0.5 days
    router.push(`/food/${match.id}?${params.toString()}`);
  }

  function pickSuggestion(id) {
    const params = new URLSearchParams();
    if (env) params.set("env", env);
    const d = Number(days);
    const h = Number(hours);
    if (!isNaN(h) && h > 0) params.set("h", String(h));
    else if (!isNaN(d) && d > 0) params.set("d", String(d));
    router.push(`/food/${id}?${params.toString()}`);
  }

  return (
    <section className="card space-y-4">
      <h2 className="text-xl font-semibold">Quick check</h2>

      {/* FOOD INPUT */}
      <div>
        <label className="block text-sm text-slate-400 mb-1">What food?</label>
        <input
          list="foods"
          className="input"
          placeholder="e.g., fried chicken, cut watermelon, cooked rice"
          value={food}
          onChange={e => { setFood(e.target.value); setSuggest([]); }}
        />
        <datalist id="foods">
          {datalistOptions.map((o, i) => <option key={i} value={o} />)}
        </datalist>
      </div>

      {/* ENV PICKER */}
      <div>
        <label className="block text-sm text-slate-400 mb-1">Where is it?</label>
        <div className="flex flex-wrap gap-2">
          {[
            {val:"fridge", label:"Fridge"},
            {val:"pantry", label:"Room temp (left out)"},
            {val:"freezer", label:"Freezer"}
          ].map(b => (
            <button
              key={b.val}
              type="button"
              onClick={() => setEnv(b.val)}
              className={`btn ${env === b.val ? "" : "opacity-70"}`}
              aria-pressed={env === b.val}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* DURATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Days (supports 0.5)</label>
          <input
            type="number"
            step="0.5"
            min="0"
            className="input"
            placeholder="e.g., 2 or 0.5"
            value={days}
            onChange={e => setDays(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">or Hours</label>
          <input
            type="number"
            step="1"
            min="0"
            className="input"
            placeholder="e.g., 12"
            value={hours}
            onChange={e => setHours(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn" type="button" onClick={onCheck}>Check safety</button>
        <span className="text-xs text-slate-400">Tip: If you’re unsure, enter 0.5 day = 12 hours.</span>
      </div>

      {/* Suggestions when no match */}
      {suggest.length > 0 && (
        <div className="text-sm">
          <div className="mb-2 text-slate-300">Did you mean:</div>
          <div className="flex flex-wrap gap-2">
            {suggest.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => pickSuggestion(s.id)}
                className="btn"
                title={s.name}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
