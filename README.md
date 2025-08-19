
# Is it Safe to Eat? — JS Starter (No TypeScript)

Instant, foolproof food safety timelines with a simple, SEO-friendly Next.js app (JS only).

## Deploy steps (no local run needed)

1. **Create a GitHub repo** (e.g., `is-it-safe-to-eat`).
2. Upload all files from this folder to the repo.
3. Go to **Vercel → Add New Project → Import from GitHub** → select your repo → **Deploy**.

## What’s included

- Next.js (App Router) + Tailwind (no TypeScript)
- Programmatic food pages: `/food/[slug]`
- Search bar parsing natural input (regex-based; no LLM)
- Answer card with traffic-light verdict
- Storage timeline chips (pantry / fridge / freezer)
- Local-only timer starter (no accounts)
- JSON dataset in `/data/foods.json` (10 seed items)

> ⚠️ Values in `/data/foods.json` are **starter placeholders**. Verify each against USDA/FSIS/FoodSafety.gov before production.

## Roadmap
- Add `/recalls` page (FDA + FSIS feeds)
- °F/°C toggle and a11y polish
- More foods + FAQs + hazards
- JSON-LD for FAQ and breadcrumbs
- Power outage wizard & batch-cook timers
