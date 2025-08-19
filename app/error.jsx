"use client";

export default function GlobalError({ error, reset }) {
  console.error(error);
  return (
    <html>
      <body className="container py-12">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-slate-300 mb-6">Please try again or go back to the homepage.</p>
        <div className="flex gap-2">
          <button className="btn" onClick={() => reset()}>Try again</button>
          <a className="btn" href="/">Home</a>
        </div>
      </body>
    </html>
  );
}
