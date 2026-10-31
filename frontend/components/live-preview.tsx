"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, Pause, Square } from "lucide-react";

export function LivePreview({ taskId }: { taskId?: string }) {
  const [status, setStatus] = useState("queued");
  const [events, setEvents] = useState<{ id: number; text: string; kind?: "info" | "error" }[]>([
    { id: 1, text: "Ready to start a task.", kind: "info" },
  ]);

  useEffect(() => {
    if (!taskId) return;
    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"}/api/v1/tasks/${taskId}/events`);

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "status") setStatus(payload.status);
      if (payload.type === "message") {
        setEvents((prev) => [...prev, { id: Date.now(), text: payload.text, kind: payload.error ? "error" : "info" }]);
      }
    };

    return () => source.close();
  }, [taskId]);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-slate-900">Live screen</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700">
            <Pause className="h-4 w-4" />
          </button>
          <button className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700">
            <Square className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[24px] border border-slate-200 bg-[radial-gradient(circle_at_top,_#f8fafc,_#dbeafe_36%,_#cbd5e1_100%)] p-3">
          <div className="flex h-64 items-center justify-center rounded-[20px] border border-white/60 bg-white/25 backdrop-blur-sm">
            <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
              Browser preview • {status}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Status</span>
              {status === "running" ? <LoaderCircle className="h-4 w-4 animate-spin text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            </div>
            <div className="mt-2 text-xl font-semibold capitalize text-slate-900">{status}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">Events</div>
            <div className="space-y-2">
              {events.slice(-4).map((event) => (
                <div key={event.id} className="rounded-xl bg-white px-2.5 py-2 text-xs text-slate-600">
                  {event.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
