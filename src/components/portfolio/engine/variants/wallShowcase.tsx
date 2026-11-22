"use client";

import React, { useState } from "react";
import { PortfolioContent, PortfolioProject } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Check,
  Copy,
  Laptop,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Terminal,
  MapPin,
  Clock,
  Download,
  Flame,
  Globe,
  Sliders,
  ChevronRight,
  X
} from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

// Clean inline SVGs for social platforms
function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ───────────────────────────────────────────
// 1. TOP STATUS & NAVIGATION BAR
// ───────────────────────────────────────────
export function WallNav({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="w-full border-b border-white/10 bg-[#0A0E17]/90 backdrop-blur-xl px-6 py-3.5 sticky top-0 z-50 text-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Monogram + Name + Live Availability Pill */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20">
            {content.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white tracking-tight">
                {content.name}
              </span>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{content.availability || "Open to Opportunities"}</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block truncate max-w-[260px]">
              {content.headline}
            </p>
          </div>
        </div>

        {/* Center: Section Anchor Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#work" className="hover:text-emerald-400 transition-colors">
            // 01. WORK
          </a>
          <a href="#experience" className="hover:text-emerald-400 transition-colors">
            // 02. EXPERIENCE
          </a>
          {content.certifications?.length > 0 && (
            <a href="#credentials" className="hover:text-emerald-400 transition-colors">
              // 03. CREDENTIALS
            </a>
          )}
          <a href="#skills" className="hover:text-emerald-400 transition-colors">
            // 04. STACK
          </a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">
            // 05. CONTACT
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy Email to Clipboard"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Email"}</span>
            </button>
          )}

          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0077b5]/15 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-[#38bdf8] transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={14} />
            </a>
          )}

          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-tight transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1"
          >
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

      </div>
    </nav>
  );
}

// ───────────────────────────────────────────
// 2. HERO SECTION — NARRATIVE & TELEMETRY
// ───────────────────────────────────────────
export function WallHero({ content }: VariantProps) {
  return (
    <section className="relative px-6 pt-16 pb-20 overflow-hidden bg-[#0A0E17] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Eyebrow badge strip */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-medium">
            <Sparkles size={13} />
            <span>WALL-OF-PORTFOLIOS SHOWCASE ARCHETYPE</span>
          </div>

          {content.location && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <MapPin size={12} className="text-rose-400" />
              <span>{content.location}</span>
            </div>
          )}
        </div>

        {/* Narrative Headline (Tanuja / Rolan Gomes standard) */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            {content.headline || `${content.name} — Portfolio & Verified Trajectory`}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
            {content.bio || "Full-stack engineer and product systems designer focused on high-throughput architectures, sub-100ms APIs, and frictionless user experiences."}
          </p>
        </div>

        {/* Telemetry Footprint Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Primary Focus
            </span>
            <span className="text-sm font-bold text-white block">
              {content.skills && content.skills.length > 0 ? content.skills.slice(0, 2).join(" & ") : "Engineering & Design"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Verified Roles
            </span>
            <span className="text-sm font-bold text-emerald-400 block">
              {content.experience?.length || 2} Career Positions
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Credentials
            </span>
            <span className="text-sm font-bold text-cyan-400 block">
              {content.certifications?.length || 1} Accredited Certifications
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Integrity Standard
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Zero-Hallucination</span>
            </span>
          </div>
        </div>

        {/* Social / Contact Strip */}
        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
          {content.contact?.email && (
            <a
              href={`mailto:${content.contact.email}`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <Mail size={14} className="text-emerald-400" />
              <span>{content.contact.email}</span>
            </a>
          )}
          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <LinkedinIcon size={14} className="text-cyan-400" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight size={12} className="text-slate-400" />
            </a>
          )}
          {content.contact?.github && (
            <a
              href={content.contact.github.startsWith("http") ? content.contact.github : `https://${content.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <GithubIcon size={14} className="text-slate-300" />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="text-slate-400" />
            </a>
          )}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// 3. OUTCOME-DRIVEN CASE STUDIES (Sudarvel standard)
// ───────────────────────────────────────────
export function WallProjects({ content }: VariantProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  if (!content.projects || content.projects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="px-6 py-20 bg-[#070A11] border-t border-white/5 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
              <span>// 01. SELECTED WORKS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Engineering Outcomes &amp; Impact
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 sm:text-right max-w-xs">
            Outcome-driven breakdowns. Every project represents real latency, revenue, or user milestones.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 gap-6">
          {content.projects.map((proj, idx) => {
            const indexStr = String(idx + 1).padStart(2, "0");
            const outcomeHighlight = proj.impact || proj.metrics || "Production Scaled";

            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-emerald-500/40 p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-emerald-950/30 flex flex-col justify-between"
              >
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                      CASE STUDY / {indexStr}
                    </span>
                    {proj.category && (
                      <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                        • {proj.category}
                      </span>
                    )}
                  </div>

                  {outcomeHighlight && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300">
                      <Flame size={13} className="text-cyan-400" />
                      <span>{outcomeHighlight}</span>
                    </span>
                  )}
                </div>

                {/* Main Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Pills + Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Read Breakdown</span>
                      <ChevronRight size={13} />
                    </button>

                    {proj.liveUrl && proj.liveUrl !== "#" && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#0F1420] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Detailed Case Study Breakdown
                </span>
                <h3 className="text-2xl font-black text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    The Challenge &amp; Problem
                  </h4>
                  <p>
                    {selectedProject.problem || "Existing workflows faced scaling bottlenecks, latency spikes, and fragmented data synchronization across multi-tenant clients."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    The Architecture &amp; Solution
                  </h4>
                  <p>
                    {selectedProject.solution || selectedProject.description}
                  </p>
                </div>

                {selectedProject.impact && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Business &amp; Technical Impact
                    </h4>
                    <p className="font-bold text-white text-base">
                      {selectedProject.impact}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack?.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-white/10 text-xs font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Launch Project</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ───────────────────────────────────────────
// 4. WORK EXPERIENCE TIMELINE (Rolan Gomes standard)
// ───────────────────────────────────────────
export function WallExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="px-6 py-20 bg-[#0A0E17] border-t border-white/5 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
            <span>// 02. EXPERIENCE &amp; CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering &amp; Design Trajectory
          </h2>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-8">
          {content.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4"
            >
              {/* Header: Role / Company on Left, Dates / Location on Right */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-white/5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold text-emerald-400">
                    {exp.company}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 sm:text-right shrink-0">
                  <span>{exp.period}</span>
                  {exp.location && <span> • {exp.location}</span>}
                </div>
              </div>

              {/* Bullet highlights */}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 marker:text-emerald-400">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// 5. ACCREDITED CREDENTIALS & CERTIFICATIONS (Rolan Gomes standard)
// ───────────────────────────────────────────
export function WallCredentials({ content }: VariantProps) {
  if (!content.certifications || content.certifications.length === 0) {
    return null;
  }

  return (
    <section id="credentials" className="px-6 py-16 bg-[#070A11] border-t border-white/5 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>// 03. CREDENTIALS &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            Verified Accreditations &amp; Continuous Learning
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">
                  {cert.name}
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  {cert.issuer} {cert.year && `· ${cert.year}`}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400 shrink-0">
                {cert.status || "Verified"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// 6. TECHNICAL STACK & SKILLS MATRIX
// ───────────────────────────────────────────
export function WallSkills({ content }: VariantProps) {
  if (!content.skills || content.skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="px-6 py-16 bg-[#0A0E17] border-t border-white/5 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
            <span>// 04. CORE TECHNICAL STACK</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            Architecture, Frameworks &amp; Tooling
          </h2>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2.5">
          {content.skills.map((skill, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-mono text-slate-200 hover:border-emerald-500/40 hover:text-emerald-300 transition-all"
            >
              {skill}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// 7. EXECUTIVE CONTACT STRIP & FOOTER
// ───────────────────────────────────────────
export function WallContact({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer id="contact" className="px-6 py-20 bg-[#05070D] border-t border-white/10 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Call to Action */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <span>// 05. INITIATE CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let&apos;s build scalable products together.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Whether you&apos;re architecting a high-throughput platform, launching an AI-driven experience, or looking for leadership in systems engineering, my inbox is open.
          </p>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check size={16} /> : <Mail size={16} />}
              <span>{copied ? "Email Copied!" : content.contact.email}</span>
            </button>
          )}

          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <LinkedinIcon size={16} className="text-[#38bdf8]" />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="text-slate-400" />
            </a>
          )}

          {content.contact?.github && (
            <a
              href={content.contact.github.startsWith("http") ? content.contact.github : `https://${content.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-slate-400" />
            </a>
          )}

          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-2"
          >
            <Download size={15} className="text-emerald-400" />
            <span>Download Resume PDF</span>
          </a>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} {content.name}. Built with FolioVeda.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Wall of Portfolios Standard</span>
          </div>
        </div>

      </div>

      {/* Interactive Sticky Contact Bar (Floating Bottom Dock) */}
      <aside aria-label="Quick Contact Actions" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl bg-[#0F1420]/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-white truncate hidden sm:inline">{content.name}</span>
          <span className="text-[11px] text-emerald-400 font-mono hidden md:inline">• {content.availability || "Available"}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer text-[11px]"
            >
              {copied ? <Check size={12} /> : <Mail size={12} />}
              <span>{copied ? "Copied" : "Email"}</span>
            </button>
          )}

          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center gap-1 text-[11px]"
            >
              <LinkedinIcon size={12} className="text-[#38bdf8]" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          )}

          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors flex items-center gap-1 text-[11px]"
          >
            <Download size={12} className="text-emerald-400" />
            <span>PDF</span>
          </a>
        </div>
      </aside>
    </footer>
  );
}
