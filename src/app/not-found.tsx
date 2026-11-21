"use client";

import Link from "next/link";
import { ArrowLeft, Home, Sparkles, Compass } from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col justify-between selection:bg-[#173f32] selection:text-white font-sans">
      {/* Top Header */}
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <FolioVedaLogo size="sm" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#173f32] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Chassis */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#173f32] border border-emerald-200/80 flex items-center justify-center mx-auto shadow-inner">
            <Compass size={28} />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#173f32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              404 // Page Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
              Looking for a Portfolio?
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              The page or portfolio you requested does not exist or has been relocated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs transition-all shadow-md shadow-[#173f32]/20 flex items-center justify-center gap-1.5"
            >
              <Home size={13} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles size={13} className="text-[#10B981]" />
              <span>Create Your Portfolio</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        FolioVeda • Where Builders Launch Verified Portfolios
      </footer>
    </div>
  );
}
