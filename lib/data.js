import foods from "@/data/foods.json";

export const FOOD_DB = foods;

// --- Alias rules for common phrasing and dishes ---
const ALIASES = [
  { pattern: /^(fried|grilled|baked|roasted|rotisserie)\s+chicken$/i, id: "cooked-chicken" },
  { pattern: /^(leftover|leftovers)\s+chicken$/i, id: "cooked-chicken" },
  { pattern: /^watermelon$/i, id: "cut-melon" },
  { pattern: /^cantaloupe$/i, id: "cut-melon" },
  // temporary mapping until we add a dedicated item
  { pattern: /^lasagn(a|e)$/i, id: "pasta-cooked" }
];

function resolveAlias(q) {
  const s = (q || "").trim();
  for (const a of ALIASES) if (a.pattern.test(s)) return a.id;
  return null;
}

export function findFoodBySlug(slug) {
  return FOOD_DB.find((f) => f.id === slug);
}

// quick exact/token search
function findFoodByQuerySync(q) {
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

function rankByForm(candidates, preferForm) {
  if (!preferForm) return candidates;
  // move items whose "forms" include preferForm to the front
  return [...candidates].sort((a, b) => {
    const aHit = Array.isArray(a.forms) && a.forms.includes(preferForm) ? 1 : 0;
    const bHit = Array.isArray(b.forms) && b.forms.includes(preferForm) ? 1 : 0;
    return bHit - aHit;
  });
}

export async function findFoodByQuery(q, preferForm) {
  // alias first
  const alias = resolveAlias(q);
  if (alias) {
    const aliased = findFoodBySlug(alias);
    if (aliased) return aliased;
  }

  const sync = findFoodByQuerySync(q);
  if (sync) return sync;

  // lazy fuzzy
  const { default: Fuse } = await import("fuse.js");
  const fuse = new Fuse(FOOD_DB, {
    includeScore: true,
    threshold: 0.33,
    keys: [
      { name: "name", weight: 0.7 },
      { name: "synonyms", weight: 0.3 }
    ]
  });
  const res = fuse.search((q || "").toLowerCase().trim());
  if (!res.length) return undefined;

  const ranked = rankByForm(res.map(r => r.item), preferForm);
  return ranked[0];
}

export async function suggestFoods(q, limit = 5) {
  const { default: Fuse } = await import("fuse.js");
  const fuse = new Fuse(FOOD_DB, {
    includeScore: true,
    threshold: 0.4,
    keys: ["name", "synonyms"]
  });
  const res = fuse.search((q || "").toLowerCase().trim());
  return res.slice(0, limit).map((r) => r.item);
}
