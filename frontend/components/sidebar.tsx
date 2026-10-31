"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  Browser,
  Clock3,
  CreditCard,
  Database,
  FolderKanban,
  Globe2,
  History,
  KeyRound,
  Lock,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    title: "Home",
    items: [
      { label: "Home", href: "/home", icon: MonitorSmartphone },
      { label: "Agents", href: "/agents", icon: Bot },
      { label: "Browsers", href: "/browsers", icon: Browser },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "History", href: "/history", icon: History },
      { label: "Usage", href: "/usage", icon: BarChart3 },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Automation", href: "/automation", icon: Zap },
      { label: "Scheduled jobs", href: "/scheduled-jobs", icon: Clock3 },
      { label: "Integrations", href: "/integrations", icon: Workflow },
      { label: "Profiles", href: "/profiles", icon: Database },
      { label: "Workspaces", href: "/workspaces", icon: FolderKanban },
    ],
  },
  {
    title: "Developer",
    items: [
      { label: "API Keys", href: "/api-keys", icon: KeyRound },
      { label: "Secrets", href: "/secrets", icon: Lock },
      { label: "Webhooks", href: "/webhooks", icon: ScrollText },
      { label: "iMessage", href: "/imessage", icon: MessageSquareText },
    ],
  },
  {
    title: "Organization",
    items: [
      { label: "Team Settings", href: "/team", icon: Users },
      { label: "Billing", href: "/billing", icon: CreditCard },
      { label: "EU deployment", href: "/eu", icon: Globe2 },
      { label: "Privacy & compliance", href: "/privacy", icon: ShieldCheck },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white/70 backdrop-blur-xl md:flex md:flex-col">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">BU</div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Browser Use</div>
          <div className="text-[11px] text-slate-500">self-hosted</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">{section.title}</div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all",
                      active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 px-4 py-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500">workspace</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">live</span>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-900">Default workspace</div>
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button className="md:hidden rounded-xl border border-slate-200 bg-white p-2">
            <Menu className="h-4 w-4 text-slate-700" />
          </button>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">Default workspace</div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:flex">
            <Search className="h-4 w-4" />
            Search
            <span className="ml-1 rounded-md bg-slate-200 px-1 text-[10px] text-slate-700">⌘K</span>
          </button>

          <button className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700">
            <Bell className="h-4 w-4" />
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            New task
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  return null;
}

export function ActionBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600">
      {label}
    </span>
  );
}

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[28px] border border-white/80 bg-white/65 shadow-soft backdrop-blur-xl", className)}>{children}</div>;
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    running: "bg-amber-100 text-amber-700",
    finished: "bg-emerald-100 text-emerald-700",
    queued: "bg-slate-200 text-slate-700",
    stopped: "bg-slate-200 text-slate-700",
    error: "bg-rose-100 text-rose-700",
  };

  return <span className={cn("rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em]", map[status] || "bg-slate-200 text-slate-700")}>{status}</span>;
}

export function GhostButton({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700">
      {icon}
      {label}
    </button>
  );
}
