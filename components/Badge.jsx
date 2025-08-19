import React from "react";

export function Badge({ tone = "safe", children }) {
  const toneClass = {
    safe: "bg-green-500/10 text-green-300 border border-green-400/30",
    caution: "bg-amber-500/10 text-amber-300 border border-amber-400/30",
    danger: "bg-red-500/10 text-red-300 border border-red-400/30",
    neutral: "bg-slate-500/10 text-slate-300 border border-slate-400/30"
  }[tone];
  return <span className={`badge ${toneClass}`}>{children}</span>;
}
