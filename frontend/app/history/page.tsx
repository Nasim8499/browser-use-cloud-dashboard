import { Sidebar, Topbar } from "@/components/sidebar";

export default function HistoryPage() {
  const runs = [
    { title: "Open Browser Use docs", status: "finished", steps: 14, duration: "2m 13s" },
    { title: "Compare pricing", status: "running", steps: 6, duration: "18s" },
    { title: "Fill support form", status: "stopped", steps: 9, duration: "1m 08s" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="px-4 py-6 md:px-6">
            <h1 className="text-3xl font-semibold text-slate-900">History</h1>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white/70 shadow-soft backdrop-blur-xl">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="p-3">Task</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Steps</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.title} className="border-b border-slate-200 last:border-0">
                      <td className="p-3 text-sm text-slate-800">{run.title}</td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-1 text-[10px] ${run.status === "finished" ? "bg-emerald-100 text-emerald-700" : run.status === "running" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-700"}`}>
                          {run.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-slate-600">{run.steps}</td>
                      <td className="p-3 text-sm text-slate-600">{run.duration}</td>
                      <td className="p-3 text-sm">
                        <div className="flex gap-2">
                          <button className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">Replay</button>
                          <button className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
