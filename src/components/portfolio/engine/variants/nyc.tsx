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
  Check,
  Copy,
  Laptop,
  Cpu,
  ArrowRight
} from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

// Clean inline SVGs for social links
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

export function NYCNav({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="w-full border-b border-[#173f32]/15 bg-[#f7f4eb]/95 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#173f32] text-[#f7f4eb] flex items-center justify-center font-bold text-sm shadow-xs">
            {content.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-sm text-[#222e26] tracking-tight flex items-center gap-2">
              <span>{content.name}</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ebd800] text-[#173f32] border border-[#173f32]/20 uppercase tracking-wider">
                NYC Editorial
              </span>
            </div>
            <p className="text-[11px] text-[#5a6b60] hidden sm:block truncate max-w-[240px]">
              {content.headline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-[#222e26]">
          <a href="#about" className="hover:text-[#173f32] transition-colors hidden md:block">
            About
          </a>
          <a href="#projects" className="hover:text-[#173f32] transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-[#173f32] transition-colors hidden sm:block">
            Trajectory
          </a>
          <a href="#skills" className="hover:text-[#173f32] transition-colors hidden md:block">
            Skills
          </a>
          {content.contact?.email ? (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Mail size={12} />
                  <span>Get in Touch</span>
                </>
              )}
            </button>
          ) : (
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] font-bold text-xs transition-all shadow-xs"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export function NYCHero({ content }: VariantProps) {
  return (
    <section id="about" className="relative px-6 py-20 sm:py-28 bg-[#f7f4eb] overflow-hidden">
      {/* Subtle paper grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#173f32 1px, transparent 1px), linear-gradient(90deg, #173f32 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider border border-[#173f32]/20 shadow-xs">
          <span>✦ VERIFIED PROFILE // NOT YOUR COLLEGE STANDARD</span>
        </div>

        {/* Grand Headline in Instrument Serif */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#222e26] font-editorial tracking-tight leading-[1.08]">
            {content.headline || `${content.name} — Portfolio`}
          </h1>
        </div>

        {/* Bio */}
        <p className="text-base sm:text-lg text-[#3d4d42] max-w-2xl leading-relaxed font-normal">
          {content.bio}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
          >
            <span>Review Projects ({content.projects.length})</span>
            <ArrowRight size={14} />
          </a>
          <a
            href="#experience"
            className="px-6 py-3.5 rounded-full bg-[#fffdf8] hover:bg-white text-[#222e26] font-bold text-xs tracking-wider uppercase border border-[#173f32]/20 transition-all"
          >
            Experience Timeline →
          </a>
        </div>

        {/* Highlights / Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#173f32]/15">
          {[
            { label: "Production Projects", value: `${content.projects.length}` },
            { label: "Verified Superpowers", value: `${content.skills.length}` },
            { label: "Career Milestones", value: `${content.experience.length}` },
            { label: "Integrity Standard", value: "Zero Fluff" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#fffdf8] border border-[#173f32]/15 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-editorial font-bold text-[#173f32]">
                {item.value}
              </div>
              <div className="text-[11px] font-bold text-[#5a6b60] uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NYCProjects({ content }: VariantProps) {
  const [selectedTech, setSelectedTech] = useState<string>("ALL");

  const allTechs = Array.from(
    new Set(content.projects.flatMap((p) => p.techStack || []))
  ).slice(0, 6);

  const filteredProjects =
    selectedTech === "ALL"
      ? content.projects
      : content.projects.filter((p) => p.techStack?.includes(selectedTech));

  return (
    <section id="projects" className="py-24 px-6 bg-[#faf8f1] border-t border-[#173f32]/15">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#173f32]/15 pb-6">
          <div>
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider mb-2 block">
              [ 01 // SHIPPED SOFTWARE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              Projects in the portfolio.
            </h2>
            <p className="text-[#5a6b60] text-sm sm:text-base mt-2 max-w-xl font-normal">
              Real code, architecture decisions, and deployed artifacts with verifiable telemetry.
            </p>
          </div>

          {/* Filter Pills */}
          {allTechs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech("ALL")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedTech === "ALL"
                    ? "bg-[#173f32] text-[#f7f4eb]"
                    : "bg-[#fffdf8] text-[#222e26] border border-[#173f32]/20 hover:bg-white"
                }`}
              >
                All ({content.projects.length})
              </button>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTech === tech
                      ? "bg-[#173f32] text-[#f7f4eb]"
                      : "bg-[#fffdf8] text-[#222e26] border border-[#173f32]/20 hover:bg-white"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 space-y-3">
            <p className="text-sm font-semibold text-[#5a6b60]">No projects listed under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 hover:border-[#173f32] transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#173f32] mb-3">
                    <span>PROJECT // 0{idx + 1}</span>
                    {project.metrics && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ebd800] text-[#173f32] text-[11px] font-bold border border-[#173f32]/20">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-editorial font-bold text-[#222e26] tracking-tight mb-3">
                    {project.title}
                  </h3>

                  <p className="text-[#3d4d42] text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#eeeaf4] border border-[#173f32]/10 text-[#173f32] text-[11px] font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#173f32]/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <span>View Live Artifact</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#fffdf8] hover:bg-white text-[#222e26] border border-[#173f32]/20 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <GithubIcon size={13} />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function NYCSkills({ content }: VariantProps) {
  if (!content.skills || content.skills.length === 0) return null;
  return (
    <section id="skills" className="py-20 px-6 bg-[#f7f4eb] border-t border-[#173f32]/15">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
            [ 02 // TECHNICAL ECOSYSTEM ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Tools, systems &amp; competencies.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {content.skills.map((skill, index) => (
            <div
              key={index}
              className="px-5 py-2.5 rounded-full bg-[#fffdf8] border border-[#173f32]/20 text-[#222e26] font-bold text-sm shadow-2xs hover:bg-[#ebd800] hover:text-[#173f32] hover:border-[#173f32] transition-colors cursor-default"
            >
              ✦ {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NYCExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-6 bg-[#faf8f1] border-t border-[#173f32]/15">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
            [ 03 // CAREER TRAJECTORY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Experience &amp; Milestones.
          </h2>
        </div>

        <div className="space-y-6">
          {content.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-2xl font-editorial font-bold text-[#222e26]">
                  {exp.role}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-mono font-bold self-start sm:self-auto border border-[#173f32]/20">
                  {exp.period}
                </span>
              </div>

              <div className="text-sm font-bold text-[#173f32] mb-4">
                {exp.company} {exp.location && `• ${exp.location}`}
              </div>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-2">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-sm text-[#3d4d42] leading-relaxed">
                      <span className="text-[#173f32] font-bold">▪</span>
                      <span>{item}</span>
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

export function NYCEducation({ content }: VariantProps) {
  if (!content.education || content.education.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-[#f7f4eb] border-t border-[#173f32]/15">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
            [ 04 // ACADEMIC FOUNDATIONS ]
          </span>
          <h2 className="text-3xl font-editorial font-normal text-[#222e26] tracking-tight">
            Education &amp; Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#fffdf8] border border-[#173f32]/20 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#173f32] text-[#f7f4eb] flex items-center justify-center shrink-0 font-bold text-sm">
                🎓
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#222e26] text-base">{edu.degree}</h3>
                <p className="text-sm font-semibold text-[#173f32]">{edu.institution}</p>
                <div className="text-xs text-[#5a6b60] font-mono pt-1">
                  Class of {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`} {edu.honors && `• ${edu.honors}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NYCContact({ content }: VariantProps) {
  return (
    <section id="contact" className="py-24 px-6 bg-[#173f32] text-[#f7f4eb] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider">
          ✦ DIRECT CHANNEL
        </span>

        <h2 className="text-4xl sm:text-6xl font-editorial font-normal text-[#f7f4eb] tracking-tight leading-tight">
          Let&apos;s build real software. <br />
          <span className="font-editorial-italic text-[#ebd800]">
            Get in touch directly.
          </span>
        </h2>

        {content.contact?.email && (
          <div className="pt-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="text-2xl sm:text-3xl font-editorial underline underline-offset-8 hover:text-[#ebd800] transition-colors"
            >
              {content.contact.email}
            </a>
          </div>
        )}

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {content.contact?.github && (
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#ebd800] hover:text-[#173f32] text-[#f7f4eb] border border-white/20 font-bold text-xs flex items-center gap-2 transition-all"
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
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#ebd800] hover:text-[#173f32] text-[#f7f4eb] border border-white/20 font-bold text-xs flex items-center gap-2 transition-all"
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
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#ebd800] hover:text-[#173f32] text-[#f7f4eb] border border-white/20 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <TwitterIcon size={14} />
              <span>Twitter / X</span>
            </a>
          )}
        </div>

        <p className="text-xs text-[#f7f4eb]/60 pt-6">
          © {new Date().getFullYear()} {content.name} • Verified on FolioVeda (NYC Editorial Standard).
        </p>
      </div>
    </section>
  );
}
