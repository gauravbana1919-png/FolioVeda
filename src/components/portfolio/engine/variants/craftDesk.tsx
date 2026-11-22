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
  X,
  FileText
} from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

// ───────────────────────────────────────────
// CRAFT DESK ARCHETYPE (Inspired by Rolan Gomes)
// Metaphor: A tactile warm paper document lying on a green architect cutting mat.
// ───────────────────────────────────────────

export function CraftDeskNav({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="w-full border-b border-black/10 bg-[#FAF7F0] px-6 py-4 rounded-t-3xl text-slate-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        
        {/* Monogram / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#095848] text-[#FAF7F0] font-mono font-bold flex items-center justify-center text-sm shadow-sm">
            {content.name.charAt(0)}
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900 tracking-tight block">
              {content.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#095848] font-bold block">
              {content.headline || "Systems & Product Designer"}
            </span>
          </div>
        </div>

        {/* Center Anchors */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-mono font-medium text-slate-600">
          <a href="#work" className="hover:text-[#095848] transition-colors">WORK</a>
          <a href="#experience" className="hover:text-[#095848] transition-colors">TRAJECTORY</a>
          {content.certifications?.length > 0 && (
            <a href="#credentials" className="hover:text-[#095848] transition-colors">CREDENTIALS</a>
          )}
          <a href="#contact" className="hover:text-[#095848] transition-colors">CONTACT</a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg border border-black/15 hover:bg-black/5 text-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={12} className="text-[#095848]" /> : <Copy size={12} />}
              <span>{copied ? "COPIED" : "EMAIL"}</span>
            </button>
          )}

          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="px-3.5 py-1.5 rounded-lg bg-[#095848] text-[#FAF7F0] font-bold hover:bg-[#07463a] transition-all flex items-center gap-1 shadow-sm"
          >
            <span>RESUME</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

      </div>
    </nav>
  );
}

export function CraftDeskHero({ content }: VariantProps) {
  return (
    <section className="relative px-6 sm:px-10 pt-10 pb-14 bg-[#FAF7F0] text-slate-900 border-b border-black/10">
      
      {/* Floating Yellow Sticky Note (Signature Rolan Gomes touch) */}
      <div className="hidden lg:block absolute -top-4 -right-2 transform rotate-2 w-52 p-4 bg-[#FEF08A] border border-amber-300 shadow-xl rounded-md z-20">
        <div className="w-12 h-3.5 bg-amber-400/40 rounded-xs mx-auto -mt-5 mb-2 shadow-2xs" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900/60 block font-bold">
          LIVE NOTE
        </span>
        <p className="text-xs font-serif text-amber-950 font-medium leading-snug mt-1">
          {content.availability || "Open to design systems & AI delivery roles worldwide!"}
        </p>
        <span className="text-[10px] font-mono text-amber-800/80 block mt-2">
          📍 {content.location || "Bengaluru, India"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Eyebrow & Status */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#095848]/10 text-[#095848] border border-[#095848]/20 text-[11px] font-mono font-bold uppercase">
            {content.skills && content.skills.length > 0 ? content.skills.slice(0, 3).join(" · ") : "VERIFIED PORTFOLIO"}
          </span>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            // ACCREDITED DOSSIER
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
          {content.headline || `${content.name} — Portfolio & Verified Works`}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl">
          {content.bio || "Systems-first product engineer bridging design tokens, enterprise component architecture, and sub-100ms production applications."}
        </p>

        {/* Quick Link Row (Rolan style) */}
        <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-700">
          {content.contact?.email && (
            <a href={`mailto:${content.contact.email}`} className="hover:text-[#095848] underline underline-offset-4 font-bold">
              EMAIL
            </a>
          )}
          {content.contact?.linkedin && (
            <>
              <span className="text-slate-400">/</span>
              <a
                href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#095848] underline underline-offset-4 font-bold flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={11} />
              </a>
            </>
          )}
          {content.contact?.github && (
            <>
              <span className="text-slate-400">/</span>
              <a
                href={content.contact.github.startsWith("http") ? content.contact.github : `https://${content.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#095848] underline underline-offset-4 font-bold flex items-center gap-1"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={11} />
              </a>
            </>
          )}
          <span className="text-slate-400">/</span>
          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="hover:text-[#095848] underline underline-offset-4 font-bold"
          >
            RESUME (PDF)
          </a>
        </div>

      </div>
    </section>
  );
}

export function CraftDeskProjects({ content }: VariantProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  if (!content.projects || content.projects.length === 0) return null;

  return (
    <section id="work" className="px-6 sm:px-10 py-14 bg-[#FAF7F0] border-b border-black/10 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="pb-3 border-b-2 border-black/15 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#095848]">
              01 // SELECTED WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
              Case Studies &amp; Product Systems
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:block">
            {content.projects.length} PROJECTS
          </span>
        </div>

        {/* Project List / Cards */}
        <div className="space-y-6">
          {content.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-black/15 shadow-sm hover:shadow-md hover:border-[#095848]/60 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-sm bg-[#095848]/10 text-[#095848] font-bold">
                  PROJECT {String(idx + 1).padStart(2, "0")}
                </span>
                {proj.impact && (
                  <span className="text-[#095848] font-bold font-mono text-xs">
                    ✦ {proj.impact}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  {proj.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  {proj.description}
                </p>
              </div>

              {/* Problem / Solution preview */}
              {proj.solution && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 font-mono block text-[11px] uppercase tracking-wider">
                    The Architecture:
                  </span>
                  <p>{proj.solution}</p>
                </div>
              )}

              {/* Bottom bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {proj.techStack?.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>

                {proj.liveUrl && proj.liveUrl !== "#" && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#095848] text-white text-xs font-mono font-bold hover:bg-[#07463a] transition-all shadow-xs"
                  >
                    <span>VIEW LIVE</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function CraftDeskExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="px-6 sm:px-10 py-14 bg-[#FAF7F0] border-b border-black/10 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="pb-3 border-b-2 border-black/15">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#095848]">
            02 // CAREER TRAJECTORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
            Work Experience &amp; Deliverables
          </h2>
        </div>

        <div className="space-y-6">
          {content.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-black/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-slate-950">
                    {exp.role}
                  </h3>
                  <span className="font-bold text-sm text-[#095848]">
                    {exp.company}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {exp.period} {exp.location && `• ${exp.location}`}
                </span>
              </div>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5 marker:text-[#095848]">
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

export function CraftDeskCredentials({ content }: VariantProps) {
  if (!content.certifications || content.certifications.length === 0) return null;

  return (
    <section id="credentials" className="px-6 sm:px-10 py-14 bg-[#FAF7F0] border-b border-black/10 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="pb-3 border-b-2 border-black/15">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#095848]">
            03 // ACCREDITED CREDENTIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
            Certifications &amp; Professional Licenses
          </h2>
        </div>

        {/* Rolan Gomes exact credential list style */}
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden divide-y divide-slate-100">
          {content.certifications.map((cert, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-slate-950 block">
                  {cert.name}
                </span>
                <span className="text-xs font-mono text-slate-500 block">
                  {cert.issuer} {cert.year && `· ${cert.year}`}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold shrink-0">
                {cert.status || "Completed"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function CraftDeskContact({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (content.contact?.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer id="contact" className="px-6 sm:px-10 py-16 bg-[#FAF7F0] rounded-b-3xl text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#095848]">
            04 // CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">
            Get in touch and we&apos;ll talk business!
          </h2>
          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            Based in {content.location || "Bengaluru, India"}, open to opportunities locally and remote worldwide.
          </p>
        </div>

        {/* Slotted Monospace Contact Row (Rolan signature) */}
        <div className="p-5 bg-white rounded-2xl border border-black/10 flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-slate-800">
          {content.contact?.email && (
            <button
              onClick={handleCopyEmail}
              className="hover:text-[#095848] transition-colors cursor-pointer"
            >
              {copied ? "EMAIL COPIED!" : content.contact.email.toUpperCase()}
            </button>
          )}

          {content.contact?.linkedin && (
            <>
              <span className="text-slate-300">/</span>
              <a
                href={content.contact.linkedin.startsWith("http") ? content.contact.linkedin : `https://${content.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#095848] transition-colors"
              >
                LINKEDIN
              </a>
            </>
          )}

          {content.contact?.github && (
            <>
              <span className="text-slate-300">/</span>
              <a
                href={content.contact.github.startsWith("http") ? content.contact.github : `https://${content.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#095848] transition-colors"
              >
                GITHUB
              </a>
            </>
          )}

          <span className="text-slate-300">/</span>
          <a
            href={content.contact?.resumeUrl || "/resume"}
            className="hover:text-[#095848] transition-colors"
          >
            RESUME (PDF)
          </a>
        </div>

        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} {content.name}. Built with FolioVeda.</p>
          <span className="text-[11px] font-bold text-[#095848]">
            Wall of Portfolios • Craft Desk Standard
          </span>
        </div>

      </div>
    </footer>
  );
}
