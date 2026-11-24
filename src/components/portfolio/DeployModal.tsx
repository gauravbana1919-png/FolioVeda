"use client";

import React, { useState } from "react";
import { Rocket, X, ExternalLink, Terminal, ShieldAlert, CheckCircle2, Copy, Check, Loader2 } from "lucide-react";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { getStandaloneHtml } from "@/lib/export/exportPortfolio";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemePackage;
  content: PortfolioContent;
}

export function DeployModal({ isOpen, onClose, theme, content }: DeployModalProps) {
  const [repoName, setRepoName] = useState("my-portfolio");
  const [pat, setPat] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "deploying" | "success" | "error">("idle");
  const [liveUrl, setLiveUrl] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const logMessage = (msg: string) => {
    setLogs((prev) => [...prev, `> ${msg}`]);
  };

  const handleDeploy = async () => {
    if (!pat.trim() || !repoName.trim()) {
      alert("Please provide both a Repository Name and your GitHub Personal Access Token (PAT).");
      return;
    }

    setLogs([]);
    setStatus("deploying");

    try {
      logMessage("Generating standalone production portfolio bundle...");
      const htmlString = getStandaloneHtml(theme, content);

      logMessage("Sending deployment payload to FolioIn deployment pipeline...");
      const res = await fetch("/api/github/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pat: pat.trim(),
          repoName: repoName.trim(),
          htmlString,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Deployment failed.");
      }

      logMessage(`Repository: ${data.repoUrl}`);
      logMessage(`Committed index.html to branch "${data.branch}".`);
      logMessage(`GitHub Pages triggered.`);
      logMessage(`Live URL configured: ${data.liveUrl}`);

      setLiveUrl(data.liveUrl);
      setStatus("success");
    } catch (err: any) {
      logMessage(`[ERROR] ${err.message}`);
      setStatus("error");
    }
  };

  const handleCopyUrl = () => {
    if (!liveUrl) return;
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Deploy to GitHub Pages</h2>
              <p className="text-xs text-slate-400">1-Click instant hosting on username.github.io</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-sm text-slate-200">
          {status !== "success" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="e.g. portfolio or my-developer-site"
                  disabled={status === "deploying"}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Personal Access Token (PAT)
                  </label>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=FolioIn+Pages+Deployer"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                  >
                    Generate Token on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={pat}
                  onChange={(e) => setPat(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  disabled={status === "deploying"}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                />
                <div className="flex items-start gap-2 pt-2 text-xs text-slate-400">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    Your token is used strictly in-memory to execute the GitHub API deployment request. It is never stored in any database.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDeploy}
                disabled={status === "deploying" || !pat.trim() || !repoName.trim()}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-600/25 flex justify-center items-center gap-2"
              >
                {status === "deploying" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Deploying to GitHub...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" /> Build &amp; Deploy Now
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-5 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Portfolio Successfully Deployed!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  GitHub Pages is building your site. It will be live globally in ~1 minute.
                </p>
              </div>

              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3 text-left">
                <span className="font-mono text-xs text-cyan-300 truncate max-w-[340px]">
                  {liveUrl}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyUrl}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1 text-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-1 text-xs font-semibold px-2.5"
                  >
                    Visit <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Terminal Logs */}
          {logs.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-900 mb-2 font-bold uppercase text-[10px]">
                <Terminal className="w-3.5 h-3.5" /> Deployment Console
              </div>
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.includes("[ERROR]")
                      ? "text-rose-400 font-semibold"
                      : log.includes("Live URL")
                      ? "text-emerald-400 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
