"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, Send, Scale, FileText } from "lucide-react";
import { FolioInLogo } from "@/components/ui/Logo";

export default function TakedownReportPage() {
  const [reportedUrl, setReportedUrl] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/legal/takedown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportedUrl,
          reporterEmail,
          reason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit takedown report.");
      }

      setReportId(data.reportId);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0F1D]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="h-4 w-[1px] bg-white/[0.1]" />
            <FolioInLogo size="sm" showBadge={false} />
            <span className="text-xs font-mono text-slate-400">/ DMCA & Takedown</span>
          </div>
          <Link
            href="/legal/terms"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Terms of Service →
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {reportId ? (
          <div className="text-center py-12 space-y-6 animate-in fade-in-50 duration-500">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Takedown Report Filed Successfully
            </h1>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Your submission has been logged with ID <span className="font-mono text-emerald-400">{reportId}</span>. Our legal and compliance team investigates all reports within 24 business hours.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white"
              >
                Return to Master Hub
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-3">
                <ShieldAlert size={13} /> Intellectual Property Enforcement
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Submit an Originality or Takedown Notice
              </h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                If you believe a live portfolio hosted on FolioIn infringes your copyright or uses your proprietary branding without authorization, please complete the form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Live Portfolio URL Under Review
                </label>
                <input
                  type="url"
                  value={reportedUrl}
                  onChange={(e) => setReportedUrl(e.target.value)}
                  placeholder="https://folioin.me/p/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs font-mono focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Your Official Contact Email
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="legal@yourdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs font-mono focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Detailed Explanation & Source Proof
                </label>
                <textarea
                  rows={5}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe the original work, the specific elements in question, and your basis for ownership (minimum 10 characters)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs leading-relaxed focus:border-red-500 focus:outline-none"
                  minLength={10}
                  required
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Filing Report...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>File Takedown Report</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="border-t border-white/[0.08] py-8 px-6 text-center text-xs text-slate-500 font-mono">
        FolioIn Legal & Compliance • Takedown Processing Unit
      </footer>
    </div>
  );
}
