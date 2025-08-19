import React from "react";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} – Is it Safe to Eat?`, description: post.excerpt };
}

export default function BlogPost({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="!mb-2">{post.title}</h1>
      <p className="!mt-0 text-sm text-slate-400">{new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
