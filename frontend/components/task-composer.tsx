"use client";

import { Plus } from "lucide-react";

export function NewTaskComposer() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Workspace</div>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">New task</h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">Shift+Ctrl+O</div>
      </div>

      <div className="mt-5 space-y-4">
        <textarea
          rows={5}
          defaultValue="Open the Browser Use docs and summarize the product in 3 bullet points."
          className="w-full rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400"
        />

        <div className="flex flex-col gap-3 md:flex-row">
          <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
            <option>Default model profile</option>
            <option>OpenAI GPT-4o</option>
            <option>Qwen local</option>
            <option>Gemini</option>
          </select>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
            <Plus className="h-4 w-4" />
            Send
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "Research docs",
            "Compare pricing",
            "Book travel",
            "Summarize page",
            "Open dashboard",
          ].map((chip) => (
            <button key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
