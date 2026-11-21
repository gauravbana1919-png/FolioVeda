"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col justify-between selection:bg-[#173f32] selection:text-white font-sans">
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <FolioVedaLogo size="sm" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#173f32] transition-colors"
          >
            <Home size={13} />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle size={26} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 inline-block">
              System Notice
            </span>
            <h1 className="text-2xl font-extrabold text-[#1E293B]">
              Something unexpected occurred
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              An unexpected render error occurred. You can reload this view or return to the platform home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        FolioVeda Error Recovery Engine
      </footer>
    </div>
  );
}
