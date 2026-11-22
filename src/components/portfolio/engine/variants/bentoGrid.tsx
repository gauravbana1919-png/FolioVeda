"use client";

import React, { useState, useEffect } from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { motion } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Code2,
  Terminal,
  Laptop,
  ArrowUpRight,
  Layers,
  MapPin,
  Clock,
  Briefcase,
  Compass,
} from "lucide-react";
import { initConsoleEasterEgg } from "@/lib/utils/consoleEasterEgg";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function BentoGridNav({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    initConsoleEasterEgg({
      name: content.name,
      headline: content.headline,
      skills: content.skills,
      projects: content.projects.map(p => ({
        title: p.title,
        description: p.description,
        link: p.liveUrl || p.githubUrl || undefined,
      })),
      email: content.contact?.email || undefined,
      github: content.contact?.github || undefined,
    });
  }, [content]);

  return (
    <nav className="w-full border-b border-white/[0.08] bg-[#090A0F]/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-50 text-white font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
            {content.name.charAt(0)}
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight flex items-center gap-2">
              <span>{content.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block">BentoGrid Architecture</span>
          </div>
        </div>

        {/* Exactly 4 One-Word Header Elements */}
        <div className="flex items-center gap-5 text-xs font-semibold">
          <a href="#bento-grid" className="text-slate-300 hover:text-white transition-colors">Overview</a>
          <a href="#projects" className="text-slate-300 hover:text-white transition-colors">Works</a>
          <a href="#projects" className="text-slate-300 hover:text-white transition-colors">Trajectory</a>
          {content.contact?.email ? (
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-full bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-xs"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? "Copied" : "Contact"}</span>
            </button>
          ) : (
            <a href="#projects" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          )}
        </div>
      </div>
    </nav>
  );
}

export function BentoGridHero({ content }: VariantProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="bento-grid" className="py-12 px-6 bg-[#090A0F] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Aceternity Style Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. HERO MAIN CARD (Col Span 2) */}
          <div className="md:col-span-2 rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-sky-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/15 transition-all" />
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available for New Challenges
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                Hi, I&apos;m <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">{content.name}</span>.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                {content.headline}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.08]">
              {content.contact?.github && (
                <a
                  href={content.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <Code2 size={13} /> GitHub Profile
                </a>
              )}
              {content.contact?.linkedin && (
                <a
                  href={content.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <ExternalLink size={13} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* 2. DEVELOPER CONSOLE & TELEMETRY CARD (Col Span 1) */}
          <div className="md:col-span-1 rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden font-mono text-xs hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] text-slate-400">bash • live</span>
            </div>

            <div className="py-4 space-y-2 text-slate-300">
              <div className="text-emerald-400">$ whoami</div>
              <div className="text-slate-400 text-[11px]">&gt; {content.name.toLowerCase().replace(/\s+/g, "_")}</div>
              
              <div className="text-emerald-400 pt-2">$ git status</div>
              <div className="text-slate-400 text-[11px]">&gt; On branch main • clean</div>

              <div className="text-emerald-400 pt-2">$ cat timezone.info</div>
              <div className="text-sky-400 text-[11px] font-bold">&gt; {time || "00:00:00"} • Local Sync</div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] text-[10px] text-slate-400 flex items-center justify-between">
              <span>DevTools Enabled</span>
              <span className="text-sky-400 font-bold">F12 ↗</span>
            </div>
          </div>

          {/* 3. BIO & CRAFT PERSPECTIVE CARD (Col Span 1) */}
          <div className="md:col-span-1 rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl hover:border-teal-500/40 transition-all">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block mb-2">
                // CREATIVE PHILOSOPHY
              </span>
              <h3 className="text-lg font-bold text-white mb-3">About My Work</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {content.bio}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Compass size={14} className="text-teal-400" />
              <span>Full-Stack &amp; AI Architect</span>
            </div>
          </div>

          {/* 4. TECH STACK ORBIT BENTO CARD (Col Span 2) */}
          <div className="md:col-span-2 rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-sky-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  // CORE ARSENAL &amp; SUPERPOWERS
                </span>
                <span className="text-xs font-mono text-slate-400">{content.skills.length} Technologies</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Production-Hardened Tech Stack</h3>
              
              <div className="flex flex-wrap gap-2">
                {content.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-slate-200 hover:border-sky-400 hover:text-white transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Architecture Standards</span>
              <span className="text-emerald-400 font-bold">100% Zero-Hallucination Verified</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function BentoGridProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="py-16 px-6 bg-[#090A0F] text-white border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
              // PRODUCTION SHOWCASE
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">Featured Engineering Works</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Modular Bento Units</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.projects.map((p, idx) => {
            const link = p.liveUrl || p.githubUrl || "#";
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 flex flex-col justify-between hover:border-sky-500/50 hover:scale-[1.01] transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                      BENTO-0{idx + 1}
                    </span>
                    <span className="text-slate-400">Active</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                    {p.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[11px]">
                    {(p.techStack || []).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  {link !== "#" && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors font-mono"
                    >
                      <span>Explore Repository / Live</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BentoGridSkills({ content }: VariantProps) {
  return null; // Handled within BentoGridHero's integrated bento card
}

export function BentoGridExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="py-16 px-6 bg-[#090A0F] text-white border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
            // CAREER TIMELINE
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">Work Trajectory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.experience.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 hover:border-indigo-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="text-xs font-mono text-slate-400">{exp.period}</span>
              </div>
              <div className="text-xs font-mono text-sky-400 font-bold mb-3">{exp.company}</div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {exp.highlights?.join(" • ") || (exp as any).description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BentoGridEducation({ content }: VariantProps) {
  return null;
}

export function BentoGridContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="py-16 px-6 bg-[#06070A] border-t border-white/[0.08] text-white text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-sm text-white block mb-1">
            Let&apos;s build high-impact products together.
          </span>
          <span className="text-slate-400">
            {content.contact?.email ? `Reach out: ${content.contact.email}` : "Open for engineering opportunities."}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {content.contact?.github && (
            <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
              GitHub ↗
            </a>
          )}
          {content.contact?.linkedin && (
            <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
