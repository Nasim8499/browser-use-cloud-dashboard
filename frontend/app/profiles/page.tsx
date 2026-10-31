import { Sidebar, Topbar } from "@/components/sidebar";

export default function ProfilesPage() {
  const profiles = [
    { name: "Default OpenAI", provider: "OpenAI", model: "gpt-4o-mini" },
    { name: "Local Qwen", provider: "Custom OpenAI-compatible", model: "Qwen/Qwen2.5-72B-Instruct" },
    { name: "Gemini", provider: "Google", model: "gemini-1.5-pro" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="px-4 py-6 md:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-slate-900">Profiles</h1>
              <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Add profile</button>
            </div>

            <div className="mt-6 space-y-4">
              {profiles.map((profile) => (
                <div key={profile.name} className="rounded-[28px] border border-slate-200 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{profile.name}</div>
                      <div className="text-sm text-slate-500">{profile.provider}</div>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{profile.model}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
