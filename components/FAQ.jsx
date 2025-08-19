
export function FAQ({ items }: { items: {q: string, a: string}[] }) {
  return (
    <div className="card space-y-2">
      <h3 className="text-lg font-semibold">FAQs</h3>
      <div className="divide-y divide-slate-800">
        {items.map((it, idx) => (
          <details key={idx} className="py-3">
            <summary className="cursor-pointer font-medium text-slate-200">{it.q}</summary>
            <div className="mt-2 text-slate-300">{it.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
