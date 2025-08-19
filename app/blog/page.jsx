import React from "react";
import Link from "next/link";
import posts from "@/data/posts.json";

export const metadata = {
  title: "Blog – Is it Safe to Eat?",
  description: "Short, practical posts on food safety and storage."
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid gap-4">
        {sorted.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card hover:brightness-110 transition">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <span className="text-xs text-slate-400">{new Date(p.date).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-300 mt-1">{p.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(p.tags || []).map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-300">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
