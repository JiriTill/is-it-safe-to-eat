import foods from "@/data/foods.json";
import Fuse from "fuse.js";

export const FOOD_DB = foods;

// Build a fuzzy index on names + synonyms
const fuse = new Fuse(FOOD_DB, {
  includeScore: true,
  threshold: 0.35,          // lower = stricter. 0.35 catches "watermelon" → "Melon, cut"
  keys: [
    { name: "name", weight: 0.7 },
    { name: "synonyms", weight: 0.3 }
  ]
});

export function findFoodBySlug(slug) {
  return FOOD_DB.find(f => f.id === slug);
}

// Try exact id → exact name → fuzzy
export function findFoodByQuery(q) {
  const s = (q || "").toLowerCase().trim();
  if (!s) return undefined;

  // exact slug
  let hit = FOOD_DB.find(f => f.id === s);
  if (hit) return hit;

  // exact name match
  hit = FOOD_DB.find(f => f.name.toLowerCase() === s);
  if (hit) return hit;

  // simple token contains
  hit = FOOD_DB.find(f => {
    const pool = [f.name, ...(f.synonyms || [])].join(" ").toLowerCase();
    return s.split(/\s+/).every(t => pool.includes(t));
  });
  if (hit) return hit;

  // fuzzy
  const res = fuse.search(s);
  return res.length ? res[0].item : undefined;
}

// Get top N fuzzy suggestions (for wizard "no exact match" UI)
export function suggestFoods(q, limit = 5) {
  const res = fuse.search((q || "").toLowerCase().trim());
  return res.slice(0, limit).map(r => r.item);
}
