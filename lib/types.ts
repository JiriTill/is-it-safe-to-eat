
export type TempUnit = "F" | "C";
export type StorageEnv = "pantry" | "fridge" | "freezer";
export type FoodForm = "raw" | "cooked" | "opened" | "unopened" | "leftovers";

export type StorageWindow = {
  env: StorageEnv;
  form: FoodForm[];
  duration?: { minHours?: number; maxHours?: number; minDays?: number; maxDays?: number; minMonths?: number; maxMonths?: number };
  note?: string;
  notRecommended?: boolean;
  sourceRefs?: string[];
};

export type Hazard = {
  name: string;
  summary: string;
  sourceRefs?: string[];
};

export type FoodItem = {
  id: string;
  name: string;
  synonyms: string[];
  category: string;
  forms: FoodForm[];
  storage: StorageWindow[];
  reheatTargetF?: number;
  internalCookTempsF?: { whole?: number; ground?: number; seafood?: number; eggs?: number; };
  faq: Array<{ q: string; a: string; sourceRefs?: string[] }>;
  hazards?: Hazard[];
};
