"use client";

import React, { useMemo } from "react";
import { CheckCircle2, Circle, ShieldCheck, Sparkles, FileText, Download, Code } from "lucide-react";
import { PortfolioContent } from "@/types/content";

interface ReadinessScorecardProps {
  content: PortfolioContent;
  onOpenDeploy?: () => void;
  onDownloadHtml?: () => void;
  onDownloadZip?: () => void;
  onCopyReadme?: () => void;
}

export function ReadinessScorecard({
  content,
  onOpenDeploy,
  onDownloadHtml,
  onDownloadZip,
  onCopyReadme,
}: ReadinessScorecardProps) {
  const audit = useMemo(() => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // 1. Name
    if (content.name?.trim()) {
      score += 15;
      checks.push({ label: "Full Name added", passed: true, tip: "" });
    } else {
      checks.push({ label: "Add Full Name", passed: false, tip: "Add your personal or studio name" });
    }

    // 2. Role / Title
    if (content.headline?.trim()) {
      score += 15;
      checks.push({ label: "Professional Role defined", passed: true, tip: "" });
    } else {
      checks.push({ label: "Define your Role", passed: false, tip: "e.g. AI Engineer, UI/UX Designer" });
    }

    // 3. Bio
    if (content.bio?.trim() && content.bio.length >= 30) {
      score += 20;
      checks.push({ label: "Compelling Bio", passed: true, tip: "" });
    } else {
      checks.push({ label: "Write a detailed bio", passed: false, tip: "Use AI Bio Generator for instant copy" });
    }

    // 4. Skills
    const skillCount = content.skills?.length || 0;
    if (skillCount >= 3) {
      score += 20;
      checks.push({ label: "Core Skills listed (3+)", passed: true, tip: "" });
    } else {
      checks.push({ label: "Add 3+ skills or technologies", passed: false, tip: "Import from GitHub or add tags" });
    }

    // 5. Projects
    const projectCount = content.projects?.length || 0;
    if (projectCount >= 2) {
      score += 20;
      checks.push({ label: "Featured Projects (2+)", passed: true, tip: "" });
    } else {
      checks.push({ label: "Showcase at least 2 projects", passed: false, tip: "Add live demo or GitHub links" });
    }

    // 6. Contact / Links
    if (content.contact?.email || content.contact?.github || content.contact?.linkedin) {
      score += 10;
      checks.push({ label: "Contact & Social links present", passed: true, tip: "" });
    } else {
      checks.push({ label: "Add Contact or Social links", passed: false, tip: "Provide email, LinkedIn, or GitHub" });
    }

    return { score: Math.min(100, score), checks };
  }, [content]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-6 text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Portfolio Readiness</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                audit.score >= 80
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : audit.score >= 50
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              }`}
            >
              {audit.score}% Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {audit.score === 100
              ? "All critical sections complete! Your portfolio is ready to publish."
              : "Complete the remaining items to maximize recruiter and client engagement."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onDownloadHtml && (
            <button
              onClick={onDownloadHtml}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Download standalone single-file HTML"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" /> HTML
            </button>
          )}

          {onDownloadZip && (
            <button
              onClick={onDownloadZip}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Download complete project ZIP"
            >
              <Code className="w-3.5 h-3.5 text-indigo-400" /> ZIP
            </button>
          )}

          {onCopyReadme && (
            <button
              onClick={onCopyReadme}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Copy GitHub Profile README Markdown"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> README
            </button>
          )}

          {onOpenDeploy && (
            <button
              onClick={onOpenDeploy}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" /> Deploy Pages
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-2.5 mb-4 overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            audit.score >= 80
              ? "bg-gradient-to-r from-teal-500 to-emerald-400"
              : audit.score >= 50
              ? "bg-gradient-to-r from-amber-500 to-yellow-400"
              : "bg-gradient-to-r from-rose-500 to-red-400"
          }`}
          style={{ width: `${audit.score}%` }}
        />
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {audit.checks.map((check, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
              check.passed
                ? "bg-emerald-950/20 border-emerald-500/20 text-slate-300"
                : "bg-slate-950/60 border-slate-800 text-slate-400"
            }`}
          >
            {check.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className={check.passed ? "font-medium text-white" : ""}>{check.label}</span>
              {!check.passed && check.tip && (
                <p className="text-[11px] text-slate-500 mt-0.5">{check.tip}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
