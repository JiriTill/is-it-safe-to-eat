export default function NotFound() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-2">We couldn’t find that food</h1>
      <p className="text-slate-300 mb-6">Try the Quick check on the homepage or browse popular items.</p>
      <a className="btn" href="/">Go to homepage</a>
    </div>
  );
}
