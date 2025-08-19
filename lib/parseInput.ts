
import type { StorageEnv, FoodForm } from "./types";

export function parseQuery(input: string): {
  food: string | null;
  env: StorageEnv | null;
  form: FoodForm | null;
  durationHours?: number;
  durationDays?: number;
} {
  const q = input.trim().toLowerCase();

  // env detection
  let env: StorageEnv | null = null;
  if (/(fridge|refrigerator|refrig)/.test(q)) env = "fridge";
  else if (/(freezer|frozen)/.test(q)) env = "freezer";
  else if (/(left out|room temp|counter|pantry)/.test(q)) env = "pantry";

  // form detection
  let form: FoodForm | null = null;
  if (/(raw|uncooked)/.test(q)) form = "raw";
  if (/(cooked|fried|roasted|baked|grilled|boiled)/.test(q)) form = "cooked";
  if (/(leftover|leftovers)/.test(q)) form = "leftovers";

  // duration detection
  let durationHours: number | undefined;
  let durationDays: number | undefined;
  const h = q.match(/(\d+)\s*(h|hr|hrs|hour|hours)/);
  const d = q.match(/(\d+)\s*(d|day|days)/);
  if (h) durationHours = parseInt(h[1], 10);
  if (d) durationDays = parseInt(d[1], 10);
  if (!durationHours && /overnight/.test(q)) durationHours = 8; // rough

  // food text (naive): remove env/duration words
  let food = q.replace(/(in the|for|in|at|on|since|about|from)/g, " ");
  food = food.replace(/(fridge|refrigerator|freezer|frozen|left out|room temp|counter|pantry)/g, " ");
  food = food.replace(/(\d+\s*(h|hr|hrs|hour|hours|d|day|days)|overnight)/g, " ");
  food = food.replace(/(raw|uncooked|cooked|fried|roasted|baked|grilled|boiled|leftover|leftovers)/g, " ");
  food = food.replace(/\s+/g, " ").trim();

  return { food: food || null, env, form, durationHours, durationDays };
}
