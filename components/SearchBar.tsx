
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseQuery } from "@/lib/parseInput";
import { findFoodByQuery } from "@/lib/data";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseQuery(q);
    const match = findFoodByQuery(parsed.food || q);
    if (match) {
      const params = new URLSearchParams();
      if (parsed.env) params.set("env", parsed.env);
      if (parsed.durationHours) params.set("h", String(parsed.durationHours));
      if (parsed.durationDays) params.set("d", String(parsed.durationDays));
      if (parsed.form) params.set("form", parsed.form);
      router.push(`/food/${match.id}?${params.toString()}`);
    } else {
      router.push(`/food/${encodeURIComponent(q.toLowerCase().trim().replace(/\s+/g,"-"))}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="input text-lg"
        placeholder='e.g., "fried chicken in fridge for 3 days"'
        value={q}
        onChange={e => setQ(e.target.value)}
        aria-label="Search food"
      />
      <button className="btn" type="submit">Check</button>
    </form>
  );
}
