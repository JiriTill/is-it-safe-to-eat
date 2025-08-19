export function parseQuery(input) {
  const q = (input || "").trim().toLowerCase();

  // environment
  let env = null;
  if (/(fridge|refrigerator|refrig)/.test(q)) env = "fridge";
  else if (/(freezer|frozen)/.test(q)) env = "freezer";
  else if (/(left out|room temp|counter|pantry)/.test(q)) env = "pantry";

  // form (but DO NOT remove these words from the food text anymore)
  let form = null;
  if (/(raw|uncooked)/.test(q)) form = "raw";
  else if (/(leftover|leftovers)/.test(q)) form = "leftovers";
  else if (/(cooked|fried|roasted|baked|grilled|boiled|steamed)/.test(q)) form = "cooked";

  // duration
  let durationHours;
  let durationDays;
  const h = q.match(/(\d+)\s*(h|hr|hrs|hour|hours)/);
  const d = q.match(/(\d+(?:\.\d+)?)\s*(d|day|days)/); // supports 0.5 etc
  if (h) durationHours = parseFloat(h[1]);
  if (d) durationDays = parseFloat(d[1]);
  if (!durationHours && /overnight/.test(q)) durationHours = 8;

  // build "food" text but KEEP cooking words
  let food = q;
  food = food.replace(/\b(in the|for|in|at|on|since|about|from|my|our)\b/g, " ");
  food = food.replace(/\b(fridge|refrigerator|freezer|frozen|left out|room temp|counter|pantry)\b/g, " ");
  food = food.replace(/\b(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours|d|day|days)\b/g, " ");
  food = food.replace(/\bovernight\b/g, " ");
  food = food.replace(/\s+/g, " ").trim();

  return { food: food || null, env, form, durationHours, durationDays };
}
