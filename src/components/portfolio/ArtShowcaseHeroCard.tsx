"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ArtShowcaseHeroCardProps {
  handleInput?: string;
  setHandleInput?: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function ArtShowcaseHeroCard({
  handleInput: externalHandle,
  setHandleInput: setExternalHandle,
  onSubmit: externalOnSubmit,
}: ArtShowcaseHeroCardProps) {
  const [internalHandle, setInternalHandle] = useState("");

  const handleInput = externalHandle !== undefined ? externalHandle : internalHandle;
  const setHandleInput = setExternalHandle || setInternalHandle;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (externalOnSubmit) {
      externalOnSubmit(e);
      return;
    }
    const input = handleInput.trim();
    if (!input) {
      window.location.href = `/onboarding?name=alex`;
      return;
    }
    if (
      input.startsWith("http://") ||
      input.startsWith("https://") ||
      input.includes("wallofportfolios.in") ||
      input.includes(".com") ||
      input.includes(".in/") ||
      input.includes(".design") ||
      input.includes(".me")
    ) {
      window.location.href = `/inspiration?url=${encodeURIComponent(input)}`;
      return;
    }
    window.location.href = `/onboarding?name=${encodeURIComponent(input)}`;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 select-none">
      {/* Outer Hero Artwork Frame */}
      <div className="group relative w-full h-[300px] sm:h-[400px] md:h-[460px] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[#173f32]/20 shadow-[0_24px_60px_-12px_rgba(23,63,50,0.22)] transition-all duration-500 hover:shadow-[0_30px_70px_-12px_rgba(23,63,50,0.28)]">
        {/* Clean Background Artwork Image (No baked buttons, no star, no visit site) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-art-clean.jpg"
            alt="Hero Background Artwork"
            fill
            priority
            className="object-cover object-[center_35%] transform transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* ── TOP-CENTER: CLAIM & BUILD SECTION (REPLACES SUBSCRIBER PILL) ── */}
        <div className="absolute top-5 sm:top-8 left-1/2 -translate-x-1/2 w-full max-w-[360px] sm:max-w-xl px-3 z-20 flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full flex items-center bg-white/90 hover:bg-white focus-within:bg-white backdrop-blur-md border-2 border-[#173f32]/25 rounded-full p-1.5 sm:p-2 shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all duration-300 gap-2"
          >
            <div className="pl-3 sm:pl-4 pr-1 text-xs font-mono font-bold text-[#5a6b60] shrink-0 select-none hidden sm:block">
              folioin.me/p/
            </div>
            <input
              type="text"
              value={handleInput}
              onChange={(e) => setHandleInput(e.target.value)}
              placeholder="your-handle-or-name"
              className="w-full bg-transparent px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-[#222e26] focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] text-[11px] sm:text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Claim &amp; Build</span>
              <ArrowRight size={13} />
            </button>
          </form>

          {/* Subtitle Badge matching image design */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 sm:mt-2.5 px-3.5 py-1 rounded-full bg-[#f2ede4]/85 backdrop-blur-md border border-white/60 text-[10px] sm:text-[11px] font-semibold text-[#303f35] shadow-xs tracking-tight flex items-center gap-2"
          >
            <span className="flex items-center gap-1">
              <CheckCircle2 size={11} className="text-[#173f32]" /> Free forever
            </span>
            <span>•</span>
            <span>Paste any portfolio link or enter handle</span>
          </motion.div>
        </div>

        {/* Note: Visit site button and Star icon have been completely removed as requested */}
      </div>
    </div>
  );
}
