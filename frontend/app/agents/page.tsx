import { Sidebar, Topbar } from "@/components/sidebar";

export default function AgentsPage() {
  const agents = [
    { name: "Research agent", model: "OpenAI GPT-4o", status: "ready" },
    { name: "CRM agent", model: "Gemini 1.5 Pro", status: "ready" },
    { name: "Support triage", model: "Claude 3.5 Sonnet", status: "paused" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="px-4 py-6 md:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-slate-900">Agents</h1>
              <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Create preset</button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {agents.map((agent) => (
                <div key={agent.name} className="rounded-[28px] border border-slate-200 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-slate-900">{agent.name}</div>
                    <span className={`rounded-full px-2 py-1 text-[10px] ${agent.status === "ready" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-slate-600">{agent.model}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
