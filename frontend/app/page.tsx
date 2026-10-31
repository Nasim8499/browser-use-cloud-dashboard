import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(246,248,252,0.94)_25%,_rgba(241,245,249,0.98)_100%)] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between rounded-[28px] border border-white/80 bg-white/60 px-5 py-3 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">BU</div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Browser Use</div>
              <div className="text-[11px] text-slate-500">cloud dashboard</div>
            </div>
          </div>
          <div className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-600">Self-hosted</div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/80 bg-white/65 p-6 shadow-soft backdrop-blur-xl md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5" />
              Browser automation
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Run real autonomous browser tasks.
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              A self-hosted browser automation workspace inspired by the Browser Use Cloud dashboard, with live task streams, model profiles, skills, and browser automation control.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/home" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profiles" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700">
                Configure profiles
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "OpenAI compatible",
                "Gemini",
                "Anthropic",
                "Groq",
                "Qwen",
                "Ollama",
                "Browser Use API",
              ].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/80 bg-white/65 p-5 shadow-soft backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Live status</div>
              <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700">online</div>
            </div>

            <div className="space-y-3">
              {[
                ["Backend", "localhost:8000", "connected"],
                ["Frontend", "localhost:3000", "ready"],
                ["Browser agent", "real mode", "active"],
              ].map(([label, value, status]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</span>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] text-slate-700">{status}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
