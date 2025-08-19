"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { parseQuery } from "@/lib/parseInput";
import { findFoodByQuery } from "@/lib/data";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const parsed = parseQuery(q);

    // cooked/leftovers bias cooked; raw biases raw
    const preferForm =
      parsed.form === "raw" ? "raw" :
      (parsed.form === "cooked" || parsed.form === "leftovers") ? "cooked" :
      undefined;

    const match = await findFoodByQuery(parsed.food || q, preferForm);
    if (match) {
      const params = new URLSearchParams();
      if (parsed.env) params.set("env", parsed.env);
      if (parsed.durationHours) params.set("h", String(parsed.durationHours));
      if (parsed.durationDays) params.set("d", String(parsed.durationDays));
      if (parsed.form) params.set("form", parsed.form);
      const qs = params.toString();
      router.push(qs ? `/food/${match.id}?${qs}` : `/food/${match.id}`);
    } else {
      alert("We couldn’t find that item. Try the Quick check below.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="input text-lg"
        placeholder='e.g., "fried chicken in fridge for 2 days"'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search food"
      />
      <button className="btn" type="submit">Check</button>
    </form>
  );
}
