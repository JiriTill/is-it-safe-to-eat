import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About – Is it Safe to Eat?",
  description: "Why we built it, how it works, terms of use, sources, and how to support."
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">About</h1>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Why we created this</h2>
        <p>
          Food safety guidance online is often confusing or buried in PDFs. We built{" "}
          <strong>Is it Safe to Eat?</strong> to give simple, conservative timelines in plain English,
          so anyone can quickly decide whether to keep or toss food.
        </p>
        <p>
          Our goal is a fast, ad-light experience that helps families avoid foodborne illness and waste.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>We maintain a curated dataset of foods, storage environments, and safe timelines.</li>
          <li>Results are intentionally conservative and aligned with mainstream U.S. guidance.</li>
          <li>Free-text search uses synonyms and fuzzy matching (e.g., “fried chicken” → cooked chicken).</li>
        </ul>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Terms of use</h2>
        <p>
          <strong>Educational only — not medical advice.</strong> While we summarize reputable guidance,
          food safety depends on many factors we can’t see (temperature control, cross-contamination, etc.).
          You are responsible for your decisions. <em>When in doubt, throw it out.</em>
        </p>
        <p>
          We may show <strong>Google Ads</strong> and accept voluntary support via{" "}
          <a className="underline" href="https://ko-fi.com/" target="_blank" rel="noreferrer">Ko-fi</a>{" "}
          to keep the site free for everyone. Ads do not influence our guidance.
        </p>
        <p>
          By using this site, you agree that information is provided “as is” without warranties and that we
          are not liable for outcomes resulting from its use.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Sources & methodology</h2>
        <p>
          Timelines are based primarily on U.S. sources such as USDA Food Safety & Inspection Service,
          FoodSafety.gov, and FDA consumer advisories, then standardized for clarity. We continuously
          expand coverage and refine wording.
        </p>
        <p className="text-sm text-slate-400">
          We paraphrase guidance; always check labels and local regulations when applicable.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Support & related projects</h2>
        <p>
          If this saves you time, consider supporting the project on{" "}
          <a className="underline" href="https://ko-fi.com/" target="_blank" rel="noreferrer">Ko-fi</a>.
        </p>
        <p>
          Interested in supplements? Check out our sister project{" "}
          <a className="underline" href="https://suppplan.example" target="_blank" rel="noreferrer">SuppPlan</a>{" "}
          (work-in-progress).
        </p>
      </section>
    </div>
  );
}
