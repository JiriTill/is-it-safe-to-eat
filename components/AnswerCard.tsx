
import { Badge } from "./Badge";

type VerdictTone = "safe"|"caution"|"danger";

export type Verdict = {
  tone: VerdictTone;
  title: string;
  bullets: string[];
};

export function AnswerCard({ verdict }: { verdict: Verdict }) {
  const border = {
    safe: "border-green-400/40",
    caution: "border-amber-400/40",
    danger: "border-red-400/40"
  }[verdict.tone];

  return (
    <section className={`card border ${border}`}>
      <div className="flex items-center gap-3 mb-3">
        <Badge tone={verdict.tone}>
          {verdict.tone === "safe" ? "✔ Likely safe" : verdict.tone === "caution" ? "⚠ Borderline" : "✖ Discard"}
        </Badge>
        <h2 className="text-xl font-semibold">{verdict.title}</h2>
      </div>
      <ul className="list-disc ml-6 space-y-1 text-slate-200">
        {verdict.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </section>
  );
}
