"use client";

import React, { useState } from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { motion } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Mail,
  ArrowUpRight,
  Check,
  Laptop,
  Briefcase,
  Layers,
} from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function LuxeNav({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="w-full border-b border-white/20 bg-[#A47F7F]/95 backdrop-blur-md px-6 py-4 sticky top-0 z-50 text-white font-mono">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2643A] animate-ping" />
          <span className="text-xs font-bold tracking-widest uppercase">
            {content.name} // DUSTY PINK DESK
          </span>
        </div>

        <div className="flex items-center gap-5 text-xs font-bold">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Artifacts</a>
          <a href="#experience" className="hover:underline hidden sm:inline">Trajectory</a>
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-full bg-[#FFFAF5] text-[#2A2726] hover:bg-white transition-all shadow-sm flex items-center gap-1.5 font-mono cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Mail size={12} />}
              <span>{copied ? "Copied" : "Say Hello"}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function LuxeHero({ content }: VariantProps) {
  return (
    <section id="about" className="relative min-h-[85vh] flex items-center justify-center px-6 py-16 bg-[#A47F7F] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-8">
        
        {/* Desk Mat Stage */}
        <div className="relative rounded-3xl border-2 border-dashed border-white/30 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-xs">
          
          {/* Top Post-It & Name Cursor */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="w-48 p-4 bg-[#FEF08A] text-[#713F12] shadow-lg rounded-sm transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="w-8 h-2 bg-yellow-200/90 mx-auto -mt-5 mb-2 rounded-xs" />
              <p className="text-lg leading-tight" style={{ fontFamily: "Caveat, cursive" }}>
                "Build tactile, memorable interfaces with zero compromise."
              </p>
              <span className="font-mono text-[10px] block mt-2 opacity-75">~ verified notes</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2643A] text-white font-mono text-xs font-bold shadow-md transform rotate-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{content.name}</span>
            </div>
          </div>

          {/* Center Paper Sheet */}
          <div className="my-4 max-w-2xl mx-auto bg-[#FFFAF5] text-[#2A2726] shadow-[0_20px_45px_rgba(0,0,0,0.18)] rounded-2xl p-8 sm:p-10 border border-[#EDE5DC] transform -rotate-0.5 hover:rotate-0 transition-transform">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F2643A] font-bold block mb-2">
              Creative Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2A2726] leading-tight mb-4 tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
              {content.headline || content.name}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#6E6863] leading-relaxed mb-6">
              {content.bio}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#EDE5DC]">
              {content.skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs font-mono bg-[#FFF8F2] border border-[#EDE5DC] text-[#2A2726] rounded-md">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Desk Arrangement Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white/80">Mode:</span>
              <span className="px-2.5 py-1 rounded-md bg-white text-[#2A2726] font-bold">Chaos Desk</span>
              <span className="px-2.5 py-1 rounded-md bg-white/20 text-white">Cleaned-up</span>
              <span className="px-2.5 py-1 rounded-md bg-white/20 text-white">Notebook</span>
            </div>
            <a href="#projects" className="inline-flex items-center gap-1.5 text-white font-bold hover:underline">
              <span>Inspect Case Studies</span> &darr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export function LuxeProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="py-24 px-6 bg-[#A47F7F] border-t border-white/20 text-white font-mono">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/20 pb-6">
          <div>
            <span className="text-2xl text-[#FEF08A] block" style={{ fontFamily: "Caveat, cursive" }}>
              Curated Artifacts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1" style={{ fontFamily: "Playfair Display, serif" }}>
              Featured Production Works
            </h2>
          </div>
          <span className="text-xs text-white/70">Verified repository artifacts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.projects.map((p, idx) => {
            const link = p.liveUrl || p.githubUrl || "#";
            return (
              <article
                key={idx}
                className="bg-[#FFF8F2] border border-[#EDE5DC] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all text-[#2A2726] relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#F2643A] font-bold">
                    CASE STUDY // 0{idx + 1}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EDE5DC] text-[#6E6863]">
                    Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#2A2726] mb-2 tracking-tight group-hover:text-[#F2643A] transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6863] leading-relaxed mb-6 font-mono">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(p.techStack || []).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#FFFAF5] border border-[#EDE5DC] text-[#2A2726]">
                      {t}
                    </span>
                  ))}
                </div>
                {link !== "#" && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F2643A] hover:underline"
                  >
                    <span>View Project Artifact</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LuxeSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="py-20 px-6 bg-[#A47F7F] border-t border-white/20 text-white font-mono">
      <div className="max-w-5xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
          Core Competencies &amp; Toolkit
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {content.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl bg-[#FFFAF5] border border-[#EDE5DC] text-[#2A2726] font-mono text-xs font-semibold shadow-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxeExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-6 bg-[#A47F7F] border-t border-white/20 text-white font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        <span className="text-2xl text-[#FEF08A] block" style={{ fontFamily: "Caveat, cursive" }}>
          Career Notes
        </span>
        <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Work Experience
        </h3>
        <div className="space-y-6">
          {content.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAF5] rounded-2xl p-6 sm:p-8 shadow-md border border-[#EDE5DC] text-[#2A2726]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className="text-xl font-bold text-[#2A2726]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {exp.role}
                </h4>
                <span className="text-xs text-[#6E6863] font-mono">{exp.period}</span>
              </div>
              <div className="text-xs text-[#F2643A] font-bold mb-3 font-mono">{exp.company}</div>
              <p className="text-xs sm:text-sm text-[#6E6863] leading-relaxed font-mono">
                {exp.highlights?.join(" • ") || (exp as any).description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxeEducation({ content }: VariantProps) {
  return null;
}

export function LuxeContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="py-16 px-6 bg-[#A47F7F] border-t border-white/20 text-white font-mono text-xs">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-sm block mb-1">Let's talk craft &amp; code.</span>
          <span className="text-white/80">{content.contact?.email || "Open for select builder roles."}</span>
        </div>
        <div className="flex items-center gap-5">
          {content.contact?.github && (
            <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-white hover:underline">
              GitHub ↗
            </a>
          )}
          {content.contact?.linkedin && (
            <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-white hover:underline">
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
