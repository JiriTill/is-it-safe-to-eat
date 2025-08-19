"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 mt-12">
      <div className="container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="font-semibold">When in doubt, throw it out.</div>
          <div className="text-sm text-slate-400">© {year} Is it Safe to Eat?</div>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm">
          <Link className="hover:underline" href="/about">About</Link>
          <Link className="hover:underline" href="/blog">Blog</Link>
        </nav>
      </div>
    </footer>
  );
}
