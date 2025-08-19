
import "./globals.css";

export const metadata = {
  title: "Is it Safe to Eat?",
  description: "Instant, foolproof food safety timelines and tips.",
  other: {
    "theme-color": "#0b0f12"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800">
          <div className="container py-4 flex items-center justify-between">
            <a href="/" className="font-bold tracking-tight text-lg">Is it Safe to Eat?</a>
            <div className="text-sm text-slate-400">U.S. guidance · °F/°C toggle coming</div>
          </div>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="border-t border-slate-800">
          <div className="container py-8 text-sm text-slate-400">
            Not medical advice. When in doubt, throw it out. Sources: USDA, FoodSafety.gov, FDA.
          </div>
        </footer>
      </body>
    </html>
  );
}
