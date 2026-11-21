"use client";

import React, { useState } from "react";
import { PortfolioContent } from "@/types/content";
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
  Copy,
  Check,
  Terminal,
  Code2,
  Laptop,
  Cpu,
  ChevronRight,
} from "lucide-react";

// Inline brand SVGs for maximum reliability
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

function TwitterIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#991B1B] via-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-rose-950/50">
              {content.name.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0B0F19] rounded-full animate-pulse" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
              <span>{content.name}</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Available
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[200px]">
              {content.headline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#about" className="hover:text-white transition-colors hidden md:block">
            About
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-white transition-colors hidden sm:block">
            Experience
          </a>
          <a href="#skills" className="hover:text-white transition-colors hidden md:block">
            Superpowers
          </a>
          {content.contact?.email ? (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#991B1B] to-rose-700 hover:from-rose-700 hover:to-[#991B1B] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-all hover:scale-105 active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail size={12} />
                  <span>Hire Me</span>
                </>
              )}
            </button>
          ) : (
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-[#991B1B] hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-md"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export function LuxeHero({ content }: VariantProps) {
  return (
    <section id="about" className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-[#0B0F19]">
      {/* Background Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center space-y-8">
        {/* Verified Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold backdrop-blur-md shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <Sparkles size={13} className="text-rose-400" />
          <span>Verified Professional Portfolio • Zero Hallucinations</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Transforming Complex Ideas Into{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
              Exceptional Software.
            </span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-rose-300/90 tracking-wide max-w-2xl mx-auto">
            {content.headline}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {content.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#991B1B] via-rose-600 to-rose-700 hover:from-rose-700 hover:to-[#991B1B] text-white font-extrabold text-sm shadow-xl shadow-rose-950/50 hover:shadow-rose-900/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Explore Featured Projects</span>
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#experience"
            className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 backdrop-blur-md transition-all hover:border-white/20"
          >
            Career Journey →
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10"
        >
          {[
            { label: "Production Projects", value: `${content.projects.length}+` },
            { label: "Core Competencies", value: `${content.skills.length}+` },
            { label: "Experience Level", value: content.experience.length > 0 ? `${content.experience.length} Roles` : "Senior" },
            { label: "Commitment", value: "100% Verified" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-center hover:border-rose-500/30 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function LuxeProjects({ content }: VariantProps) {
  const [selectedTech, setSelectedTech] = useState<string>("ALL");

  // Get unique tech stack items
  const allTechs = Array.from(
    new Set(content.projects.flatMap((p) => p.techStack || []))
  ).slice(0, 6);

  const filteredProjects =
    selectedTech === "ALL"
      ? content.projects
      : content.projects.filter((p) => p.techStack?.includes(selectedTech));

  return (
    <section id="projects" className="py-24 px-6 bg-[#0E1322] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Laptop size={12} /> Production Artifacts
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured Engineering Work
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-normal">
              High-impact solutions with verified metrics, clean architecture, and modern tech stacks.
            </p>
          </div>

          {/* Filter Pills */}
          {allTechs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech("ALL")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedTech === "ALL"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                All Projects ({content.projects.length})
              </button>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTech === tech
                      ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title + idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-rose-500/40 p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden hover:shadow-rose-950/30"
              >
                {/* Top glow hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl group-hover:bg-rose-600/15 transition-all pointer-events-none" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-rose-400">
                      PROJECT // 0{idx + 1}
                    </span>
                    {project.metrics && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:text-rose-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-950/40"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon size={13} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function LuxeSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="py-24 px-6 bg-[#0B0F19] border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Cpu size={12} /> Tech Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Superpowers &amp; Competencies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-normal">
            Proven mastery in tools, frameworks, languages, and distributed architectures.
          </p>
        </div>

        {/* Skills Chips Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {content.skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-rose-500/50 text-white font-bold text-sm flex items-center gap-2.5 backdrop-blur-md shadow-md transition-all hover:scale-105 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxeExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-24 px-6 bg-[#0E1322] border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Briefcase size={12} /> Career Trajectory
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience &amp; Impact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-normal">
            Roles, milestones, and high-impact contributions delivered across tech organizations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-rose-500/20 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {content.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0E1322] border-2 border-rose-500 group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mx-auto mt-0.5" />
              </div>

              {/* Card */}
              <div className="p-7 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-rose-500/30 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-rose-300 text-xs font-mono font-bold self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                  <span className="text-rose-400 font-extrabold">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 font-normal">{exp.location}</span>
                    </>
                  )}
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2.5">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed font-normal">
                        <CheckCircle2 size={16} className="text-rose-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxeEducation({ content }: VariantProps) {
  if (!content.education || content.education.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-[#0B0F19] border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap size={12} /> Academic Foundations
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Education &amp; Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-white text-base">{edu.degree}</h3>
                <p className="text-sm font-semibold text-slate-300">{edu.institution}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                  <span>Graduated {edu.year}</span>
                  {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                  {edu.honors && <span>• {edu.honors}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxeContact({ content }: VariantProps) {
  return (
    <section id="contact" className="py-24 px-6 bg-[#0B0F19] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Mail size={12} /> Direct Channel
        </span>

        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Let&apos;s Build Something <br />
          <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
            Remarkable Together.
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
          Open to full-time roles, engineering leadership, and high-impact advisory opportunities.
        </p>

        {/* Contact Action Card */}
        <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl max-w-xl mx-auto space-y-6 shadow-2xl">
          {content.contact?.email && (
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Direct Email
              </div>
              <a
                href={`mailto:${content.contact.email}`}
                className="text-xl sm:text-2xl font-black text-white hover:text-rose-400 transition-colors break-all"
              >
                {content.contact.email}
              </a>
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {content.contact?.github && (
              <a
                href={content.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
            )}
            {content.contact?.linkedin && (
              <a
                href={content.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>
            )}
            {content.contact?.twitter && (
              <a
                href={content.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
              >
                <TwitterIcon size={14} />
                <span>Twitter / X</span>
              </a>
            )}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 pt-6">
          © {new Date().getFullYear()} {content.name}. Built and verified on FolioVeda.
        </p>
      </div>
    </section>
  );
}
