"use client";

import React, { useState } from "react";
import { DownloadCloud, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { PortfolioContent } from "@/types/content";

interface GithubImporterProps {
  onImportSuccess: (importedData: {
    profile?: {
      name?: string | null;
      username?: string | null;
      avatarUrl?: string | null;
      bio?: string | null;
      location?: string | null;
      github?: string | null;
      email?: string | null;
    };
    projects?: any[];
    skills?: string[];
  }) => void;
}

export function GithubImporter({ onImportSuccess }: GithubImporterProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleImport = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessCount(null);

    try {
      const res = await fetch("/api/github/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to import from GitHub.");
      }

      onImportSuccess({
        profile: data.profile,
        projects: data.projects,
        skills: data.skills,
      });

      setSuccessCount(data.projects?.length || 0);
      setUsername("");
    } catch (err: any) {
      setError(err.message || "An error occurred during import.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-6 text-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-slate-800 rounded-xl text-white">
          <DownloadCloud className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Auto-Import from GitHub</h3>
          <p className="text-xs text-slate-400">
            Automatically populate your profile, top public repositories, star counts, and tech skills.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username (e.g. gauravbana1919-png)"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleImport()}
        />
        <button
          onClick={handleImport}
          disabled={loading || !username.trim()}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-md shadow-cyan-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Fetching...
            </>
          ) : (
            <>
              <DownloadCloud className="w-4 h-4" /> Import Repos
            </>
          )}
        </button>
      </div>

      {successCount !== null && (
        <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4" /> Successfully imported {successCount} projects and languages into your portfolio!
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-3 text-xs text-rose-400 font-medium">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}
    </div>
  );
}
