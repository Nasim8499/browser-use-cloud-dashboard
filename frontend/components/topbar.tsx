"use client";

import { Bell, Search, SlidersHorizontal, Plus, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden rounded-xl border border-slate-200 bg-white p-2">
              <Menu className="h-4 w-4 text-slate-700" />
            </button>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">Default workspace</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:flex">
              <Search className="h-4 w-4" />
              Search
              <span className="ml-1 rounded-md bg-slate-200 px-1 text-[10px] text-slate-700">⌘K</span>
            </button>

            <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:flex">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <button className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700">
              <Bell className="h-4 w-4" />
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              <Plus className="h-4 w-4" />
              New task
            </button>
          </div>
        </div>
      </header>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
