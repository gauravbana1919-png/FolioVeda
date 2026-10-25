"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, CheckCircle2, ArrowRight, Code2 } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
          <div className="p-2 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <GithubIcon className="w-4 h-4" />
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
