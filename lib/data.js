
import foods from "@/data/foods.json";

export const FOOD_DB = foods;

export function findFoodBySlug(slug) {
  return FOOD_DB.find(f => f.id === slug);
}

export function findFoodByQuery(q) {
  const s = (q || "").toLowerCase();
  let hit = FOOD_DB.find(f => f.id === s);
  if (hit) return hit;
  return FOOD_DB.find(f => {
    const pool = [f.name, ...(f.synonyms || [])].join(" ").toLowerCase();
    return s.split(/\s+/).every(t => pool.includes(t));
  });
}
