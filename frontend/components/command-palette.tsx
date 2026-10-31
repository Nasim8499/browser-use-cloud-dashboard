"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles, ArrowRight, X } from "lucide-react";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onClose();
      }
      if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === "o") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const items = useMemo(
    () => ["New task", "Open history", "Manage profiles", "Launch browser", "Add skill"],
    []
  );

  const filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/10 p-4 pt-16 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white/90 p-3 shadow-soft backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-slate-200 px-2 pb-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search tasks, profiles, skills..."
            autoFocus
          />
          <button onClick={onClose} className="rounded-lg border border-slate-200 p-1.5 text-slate-500">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {filtered.map((item) => (
            <button
              key={item}
              onClick={onClose}
              className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <span>{item}</span>
              <Sparkles className="h-4 w-4 text-slate-400" />
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
            Quick launch
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
