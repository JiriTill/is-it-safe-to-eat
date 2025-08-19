import foods from "@/data/foods.json";

export const FOOD_DB = foods;

// Lazy Fuse (avoids bundling/hydration edge cases)
let _fuse = null;
async function getFuse() {
  if (_fuse) return _fuse;
  const { default: Fuse } = await import("fuse.js");
  _fuse = new Fuse(FOOD_DB, {
    includeScore: true,
    threshold: 0.35, // lower=stricter
    keys: [
      { name: "name", weight: 0.7 },
      { name: "synonyms", weight: 0.3 }
    ]
  });
  return _fuse;
}

export function findFoodBySlug(slug) {
  return FOOD_DB.find((f) => f.id === slug);
}

// exact id -> exact name -> token contains -> (async) fuzzy
export function findFoodByQuerySync(q) {
  const s = (q || "").toLowerCase().trim();
  if (!s) return undefined;

  let hit = FOOD_DB.find((f) => f.id === s);
  if (hit) return hit;

  hit = FOOD_DB.find((f) => f.name.toLowerCase() === s);
  if (hit) return hit;

  hit = FOOD_DB.find((f) => {
    const pool = [f.name, ...(f.synonyms || [])].join(" ").toLowerCase();
    return s.split(/\s+/).every((t) => pool.includes(t));
  });
  return hit;
}

export async function findFoodByQuery(q) {
  const sync = findFoodByQuerySync(q);
  if (sync) return sync;

  const fuse = await getFuse();
  const res = fuse.search((q || "").toLowerCase().trim());
  return res.length ? res[0].item : undefined;
}

export async function suggestFoods(q, limit = 5) {
  const fuse = await getFuse();
  const res = fuse.search((q || "").toLowerCase().trim());
  return res.slice(0, limit).map((r) => r.item);
}
