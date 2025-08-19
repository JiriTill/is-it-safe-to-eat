
import foods from "@/data/foods.json";
import type { FoodItem } from "./types";

export const FOOD_DB = foods as FoodItem[];

export function findFoodBySlug(slug: string): FoodItem | undefined {
  return FOOD_DB.find(f => f.id === slug);
}

export function findFoodByQuery(q: string): FoodItem | undefined {
  const s = q.toLowerCase();
  // Exact id match
  let hit = FOOD_DB.find(f => f.id === s);
  if (hit) return hit;
  // Name or synonym contains query tokens
  return FOOD_DB.find(f => {
    const pool = [f.name, ...f.synonyms].join(" ").toLowerCase();
    return s.split(/\s+/).every(t => pool.includes(t));
  });
}
