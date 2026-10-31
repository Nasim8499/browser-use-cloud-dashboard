import { Sidebar, Topbar } from "@/components/sidebar";
import { NewTaskComposer } from "@/components/task-composer";
import { LivePreview } from "@/components/live-preview";

export default function DashboardHomePage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="px-4 py-6 md:px-6">
            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-6">
                <NewTaskComposer />
                <LivePreview taskId="demo-task" />
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur-xl">
                  <div className="text-sm font-semibold text-slate-900">Quick stats</div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Runs", "128"],
                      ["Active browsers", "7"],
                      ["Tokens", "2.4M"],
                      ["Profiles", "18"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <span className="text-sm text-slate-600">{label}</span>
                        <span className="text-sm font-semibold text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur-xl">
                  <div className="text-sm font-semibold text-slate-900">Top models</div>
                  <div className="mt-4 space-y-3">
                    {[
                      "OpenAI GPT-4o",
                      "Gemini 1.5 Pro",
                      "Qwen 2.5",
                      "Claude 3.5 Sonnet",
                    ].map((model, idx) => (
                      <div key={model} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-slate-900" />
                          <span className="text-sm text-slate-700">{model}</span>
                        </div>
                        <span className="text-xs text-slate-500">{idx + 1}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
