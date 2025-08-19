
import { Badge } from "./Badge";

export function TimelineChips({ pantry, fridge, freezer }: { pantry?: string; fridge?: string; freezer?: string; }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone={pantry ? "neutral" : "danger"}>Pantry: {pantry ?? "Not recommended"}</Badge>
      <Badge tone={fridge ? "neutral" : "danger"}>Fridge: {fridge ?? "Not recommended"}</Badge>
      <Badge tone={freezer ? "neutral" : "danger"}>Freezer: {freezer ?? "Not recommended"}</Badge>
    </div>
  );
}
