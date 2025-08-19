
# Is it Safe to Eat? — Starter

Instant, foolproof food safety timelines with a simple, SEO-friendly Next.js app.

## Quick start

```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
```

## What’s here

- Next.js (App Router) + Tailwind
- Programmatic food pages: `/food/[slug]`
- Search bar that parses natural input and routes to the best match
- Answer card with traffic-light verdict
- Storage timeline chips (pantry / fridge / freezer)
- Local-only timer starter (no accounts)
- JSON dataset in `/data/foods.json` with conservative placeholder values to be **verified** against USDA/FSIS/FoodSafety.gov

> ⚠️ The dataset values are **starter placeholders**. Before going live, verify each duration/temperature against authoritative sources and keep citations handy.

## Project structure

- `app/` — pages
- `components/` — UI components
- `lib/` — data loading + simple parser
- `data/foods.json` — seed items

## Roadmap

- Add `/recalls` page (FDA + FSIS feeds)
- °F/°C toggle and a11y polish
- More foods + FAQs + hazards
- JSON-LD for FAQ and breadcrumbs
- Power outage wizard & batch-cook timers
