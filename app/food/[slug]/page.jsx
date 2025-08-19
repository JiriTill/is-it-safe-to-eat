import React from "react";
import Link from "next/link";
import { findFoodBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { TimelineChips } from "@/components/TimelineChips";
import { AnswerCard } from "@/components/AnswerCard";
import { FAQ } from "@/components/FAQ";

// --- Helpers ---
function asStorageList(item) {
  return Array.isArray(item?.storage) ? item.storage : [];
}
function fmtDuration(d) {
  if (!d) return undefined;
  if (typeof d.maxHours === "number") return `${d.maxHours} h`;
  if (typeof d.maxDays === "number") return `${d.maxDays} days`;
  if (typeof d.maxMonths === "number") return `${d.maxMonths} months`;
  return undefined;
}

// --- Verdict calculator with full guards ---
function computeVerdict(item, params) {
  const env = (params?.env ?? "fridge");
  const storageList = asStorageList(item);

  const hours =
    params?.h != null && !Number.isNaN(Number(params.h))
      ? Number(params.h)
      : params?.d != null && !Number.isNaN(Number(params.d))
      ? Number(params.d) * 24
      : undefined;

  if (!item || storageList.length === 0) {
    return {
      tone: "caution",
      title: "We don’t have data for this item",
      bullets: [
        "Try a similar food name or use the Quick check suggestions.",
        "When in doubt, follow the 2-hour rule at room temperature.",
      ],
    };
  }

  const storage = storageList.find((s) => s.env === env);
  let tone = "safe";
  const bullets = [];
  let title = `Guidance for ${item.name || "this food"}`;

  if (env === "pantry") {
    if (hours && hours > 2) {
      tone = "danger";
      title = "Discard";
      bullets.push(
        "Perishables over 2 hours at room temperature are not safe (1 hour if > 90°F / 32°C)."
      );
      bullets.push("Next time, refrigerate within 2 hours.");
      return { tone, title, bullets };
    } else {
      tone = "caution";
      title = "Not recommended at room temperature";
      bullets.push("Refrigerate promptly. Use the fridge timeline below.");
      return { tone, title, bullets };
    }
  }

  if (!storage) {
    tone = "caution";
    title = "No data for this storage";
    bullets.push("We don’t have a timeline for this environment.");
    bullets.push("Use the fridge guidance when possible.");
    return { tone, title, bullets };
  }

  if (storage?.duration?.maxHours || storage?.duration?.maxDays) {
    const maxHours =
      storage.duration.maxHours ??
      (typeof storage.duration.maxDays === "number"
        ? storage.duration.maxDays * 24
        : undefined) ??
      Infinity;

    if (hours !== undefined) {
      if (hours > maxHours) {
        tone = "danger";
        title = "Discard";
        bullets.push(`You've passed the recommended ${env} time for this food.`);
      } else if (hours > maxHours * 0.9) {
        tone = "caution";
        title = "Borderline — eat or discard now";
        bullets.push("You're near the end of the safe window. Reheat thoroughly and eat now.");
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
    bullets.push("This food is not recommended in the selected environment.");
  }

  if (env === "fridge") bullets.push("Keep your fridge at 40°F / 4°C or below.");
  if (env === "freezer") bullets.push("Best quality if frozen promptly; quality may drop over time.");

  return { tone, title, bullets };
}

export default function FoodPage({ params, searchParams }) {
  const item = findFoodBySlug(params.slug);
  if (!item) return notFound();

  const verdict = computeVerdict(item, searchParams || {});

  const storageList = asStorageList(item);
  const fridge = storageList.find((s) => s.env === "fridge");
  const freezer = storageList.find((s) => s.env === "freezer");
  const pantry = storageList.find((s) => s.env === "pantry");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <AnswerCard verdict={verdict} />

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Storage timelines</h3>
        <TimelineChips
          pantry={pantry?.notRecommended ? undefined : fmtDuration(pantry?.duration)}
          fridge={fmtDuration(fridge?.duration)}
          freezer={fmtDuration(freezer?.duration)}
        />
      </div>

      {item.reheatTargetF && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Reheat / Serve temperatures</h3>
          <p>
            Reheat leftovers to{" "}
            <strong>
              {item.reheatTargetF}°F / {Math.round(((item.reheatTargetF - 32) * 5) / 9)}°C
            </strong>
            .
          </p>
        </div>
      )}

      {Array.isArray(item.hazards) && item.hazards.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Special hazards</h3>
          <ul className="list-disc ml-6 space-y-1">
            {item.hazards.map((h, i) => (
              <li key={i}>
                <strong>{h.name}:</strong> {h.summary}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA: New check / Home */}
      <div className="pt-2">
        <hr className="border-slate-700 mb-4" />
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn">New check</Link>
          <Link href="/#quick" className="btn" title="Jump to Quick check on the homepage">Quick check</Link>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        Sources on this site are summarized from USDA, FoodSafety.gov, and FDA recall notices. This
        page uses standardized timelines; always use your senses and follow label directions.
      </div>
    </div>
  );
}
