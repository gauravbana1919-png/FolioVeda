"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";

export function ClaimHandleBar() {
  const [handle, setHandle] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<{ available: boolean; handle: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const trimmed = handle.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (!trimmed || trimmed.length < 2) {
      setAvailability(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const res = await fetch(`/api/portfolio?check=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setAvailability(data);
        }
      } catch (err) {
        console.warn("Could not check handle availability:", err);
      } finally {
        setIsChecking(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [handle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = handle.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (!clean) {
      router.push("/onboarding");
      return;
    }
    router.push(`/onboarding?handle=${encodeURIComponent(clean)}`);
  };

  return (
    <div className="max-w-xl mx-auto w-full relative z-10 mb-8">
      <form
        onSubmit={handleSubmit}
        className="p-2 sm:p-2.5 rounded-full bg-white border-2 border-[#1E293B]/15 shadow-xl shadow-[#1E293B]/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all hover:border-[#991B1B]/40 focus-within:border-[#991B1B] focus-within:ring-4 focus-within:ring-[#991B1B]/10"
      >
        <div className="flex-1 flex items-center pl-4 sm:pl-5 pr-2 py-1">
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 select-none">
            folioin.me/
          </span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="your-name"
            className="w-full pl-1 pr-2 py-1 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none bg-transparent"
          />
          {isChecking && (
            <Loader2 size={14} className="animate-spin text-slate-400 shrink-0 ml-1" />
          )}
          {!isChecking && availability && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                availability.available
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {availability.available ? (
                <>
                  <CheckCircle2 size={10} /> Available
                </>
              ) : (
                <>
                  <AlertCircle size={10} /> Claimed
                </>
              )}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-extrabold transition-all shadow-md shadow-[#991B1B]/25 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Claim Handle</span>
          <ArrowRight size={13} />
        </button>
      </form>

      {/* Helper text */}
      <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium mt-2">
        <span className="flex items-center gap-1">
          <Sparkles size={11} className="text-[#991B1B]" />
          Instant verification
        </span>
        <span>•</span>
        <span>Zero hallucination copy</span>
        <span>•</span>
        <span>100% Free live hosting</span>
      </div>
    </div>
  );
}
