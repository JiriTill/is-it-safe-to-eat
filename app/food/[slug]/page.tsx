
import { findFoodBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { TimelineChips } from "@/components/TimelineChips";
import { AnswerCard, type Verdict } from "@/components/AnswerCard";
import { FAQ } from "@/components/FAQ";
import TimerStart from "@/components/TimerStart";

function computeVerdict(params: { env?: string | null; d?: number; h?: number; form?: string | null; }, slug: string) : Verdict {
  const item = findFoodBySlug(slug)!;
  const env = (params.env ?? "fridge") as "fridge"|"pantry"|"freezer";
  const hours = params.h ?? (params.d ? params.d * 24 : undefined);
  const storage = item.storage.find(s => s.env === env);
  // default verdict & bullets
  let tone: "safe"|"caution"|"danger" = "safe";
  const bullets: string[] = [];
  let title = `Guidance for ${item.name}`;

  // If left out in pantry and perishable -> danger after 2 hours
  if (env === "pantry") {
    if (hours && hours > 2) {
      tone = "danger";
      title = "Discard";
      bullets.push("Perishables over 2 hours at room temperature are not safe (1 hour if > 90°F / 32°C).");
      bullets.push("Next time, refrigerate within 2 hours.");
      return { tone, title, bullets };
    } else {
      tone = "caution";
      title = "Not recommended at room temperature";
      bullets.push("Refrigerate promptly. Use the fridge timeline below.");
      return { tone, title, bullets };
    }
  }

  // If we have a fridge/freezer window
  if (storage?.duration?.maxHours || storage?.duration?.maxDays) {
    const maxHours = (storage.duration.maxHours ?? (storage.duration.maxDays ? storage.duration.maxDays * 24 : undefined)) ?? Infinity;
    if (hours !== undefined) {
      if (hours > maxHours) {
        tone = "danger";
        title = "Discard";
        bullets.push(`You've passed the recommended ${env} time for this food.`);
      } else if (hours > maxHours * 0.9) {
        tone = "caution";
        title = "Borderline — eat or discard now";
        bullets.push(`You're near the end of the safe window. Reheat thoroughly and eat now.`);
      } else {
        tone = "safe";
        title = "Likely safe";
        bullets.push(`Within the typical ${env} window for this food.`);
      }
    } else {
      tone = "safe";
      title = "Guidance";
      bullets.push(`See the ${env} timeline below.`);
    }
  } else if (storage?.notRecommended) {
    tone = "danger";
    title = "Not recommended";
    bullets.push(`This food is not recommended in the selected environment.`);
  }

  // Add generic bullets
  if (env === "fridge") bullets.push("Keep your fridge at 40°F / 4°C or below.");
  if (env === "freezer") bullets.push("Best quality if frozen promptly; quality may drop over time.");

  return { tone, title, bullets };
}

export default function FoodPage({ params, searchParams } : { params: { slug: string }, searchParams: { env?: string, d?: string, h?: string, form?: string } }) {
  const item = findFoodBySlug(params.slug);
  if (!item) return notFound();

  const verdict = computeVerdict({
    env: searchParams.env,
    d: searchParams.d ? Number(searchParams.d) : undefined,
    h: searchParams.h ? Number(searchParams.h) : undefined,
    form: searchParams.form
  }, params.slug);

  const fridge = item.storage.find(s => s.env === "fridge");
  const freezer = item.storage.find(s => s.env === "freezer");
  const pantry = item.storage.find(s => s.env === "pantry");

  function fmt(s?: { minHours?: number; maxHours?: number; minDays?: number; maxDays?: number; minMonths?: number; maxMonths?: number; }) {
    if (!s) return undefined;
    if (s.maxHours) return `${s.maxHours} h`;
    if (s.maxDays) return `${s.maxDays} days`;
    if (s.maxMonths) return `${s.maxMonths} months`;
    return undefined;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <AnswerCard verdict={verdict} />

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Storage timelines</h3>
        <TimelineChips
          pantry={pantry?.notRecommended ? undefined : fmt(pantry?.duration)}
          fridge={fmt(fridge?.duration)}
          freezer={fmt(freezer?.duration)}
        />
      </div>

      {item.reheatTargetF && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Reheat / Serve temperatures</h3>
          <p>Reheat leftovers to <strong>{item.reheatTargetF}°F / {Math.round((item.reheatTargetF-32)*5/9)}°C</strong>.</p>
        </div>
      )}

      {item.hazards && item.hazards.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Special hazards</h3>
          <ul className="list-disc ml-6 space-y-1">
            {item.hazards.map((h, i) => <li key={i}><strong>{h.name}:</strong> {h.summary}</li>)}
          </ul>
        </div>
      )}

      <TimerStart name={item.name} defaultDays={fridge?.duration?.maxDays} />

      {item.faq?.length > 0 && <FAQ items={item.faq} />}

      <div className="text-sm text-slate-400">
        Sources on this site are summarized from USDA, FoodSafety.gov, and FDA recall notices. This page uses standardized timelines; always use your senses and follow label directions.
      </div>
    </div>
  );
}
