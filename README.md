# Is it Safe to Eat?

Instant food safety timelines with a simple, SEO-friendly Next.js app (JS only).

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
