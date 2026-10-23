"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";

interface GitHubSyncControlProps {
  userId?: string;
  defaultUsername?: string;
}

export function GitHubSyncControl({ userId, defaultUsername = "" }: GitHubSyncControlProps) {
  const [username, setUsername] = useState(defaultUsername);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const router = useRouter();

  const handleSync = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim() || loading) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/github/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          userId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          success: true,
          message: data.message || `Synchronized ${data.count} repositories to database!`,
        });
        router.refresh();
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({
          success: false,
          message: data.error || "Failed to sync GitHub repositories.",
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatus({
        success: false,
        message: "Network error connecting to GitHub sync backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <Github size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Connect Real GitHub Account
            </h3>
            <p className="text-xs text-slate-500">
              Fetch public repos directly into your SQLite database &amp; live portfolio.
            </p>
          </div>
        </div>

        {status && (
          <div className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
            status.success 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {status.success && <CheckCircle2 size={12} />}
            <span>{status.message}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSync} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
            github.com/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username"
            className="w-full pl-28 pr-4 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#991B1B]/30"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] disabled:bg-slate-300 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
        >
          {loading ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>Syncing Repos...</span>
            </>
          ) : (
            <>
              <span>Sync to Database</span>
              <ArrowRight size={13} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
