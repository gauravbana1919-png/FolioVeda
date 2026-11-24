"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Layers, 
  Download,
  Check
} from "lucide-react";

export interface ResumeTemplateItem {
  id: string;
  templateParam: string;
  title: string;
  muse: string;
  location: string;
  category: "modern" | "banners" | "simple" | "creative";
  categoryLabel: string;
  badge: string;
  image: string;
  span: string;
  description: string;
  tags: string[];
  features: string[];
}

export const RESUME_TEMPLATES: ResumeTemplateItem[] = [
  {
    id: "tmpl-1",
    templateParam: "atlantic-blue",
    title: "Atlantic Blue Executive Sidebar",
    muse: "Brian T. Wayne",
    location: "New York, USA",
    category: "modern",
    categoryLabel: "Modern Sidebar",
    badge: "Most Popular",
    image: "/images/resumes/atlantic-blue.png",
    span: "col-span-1 md:col-span-2",
    description: "High-impact two-column architecture featuring a 35% dark navy sidebar (#1E293B) grouping profile headshot, contact telemetry, education, and skill pills with a 65% main body for work history.",
    tags: ["35% Navy Sidebar", "Two-Column Split", "Executive Leadership"],
    features: ["Full-bleed navy sidebar", "Structured skill badge cloud", "STAR bullet metrics"],
  },
  {
    id: "tmpl-2",
    templateParam: "cobalt-edge",
    title: "Cobalt Edge Royal Hero",
    muse: "Alejandro Herrera",
    location: "Monterrey, Mexico",
    category: "banners",
    categoryLabel: "Header Banner",
    badge: "Executive Banner",
    image: "/images/resumes/cobalt-edge.png",
    span: "col-span-1",
    description: "Bold full-width Royal Blue hero banner card featuring candidate name, role pill, and avatar on the right, underlaid with contact badges and clean section dividers.",
    tags: ["Royal Blue Banner", "Avatar Focus", "100% Vector PDF"],
    features: ["Hero header banner", "Under-banner contact pill strip", "Dual-column competencies"],
  },
  {
    id: "tmpl-3",
    templateParam: "mercury-flow",
    title: "Mercury Flow Creative Timeline",
    muse: "Camila Rivera",
    location: "Miami, USA",
    category: "banners",
    categoryLabel: "Header Banner",
    badge: "Creative Lead",
    image: "/images/resumes/mercury-flow.png",
    span: "col-span-1",
    description: "Elegantly framed header card with profile avatar and contact badges, accompanied by a two-column timeline experience layout connecting dates and role achievements.",
    tags: ["Card Banner", "Timeline Experience", "Product Design"],
    features: ["Frosted gradient card", "Two-column experience timeline", "Pill badge skills"],
  },
  {
    id: "tmpl-4",
    templateParam: "hunter-green",
    title: "Hunter Green Architectural",
    muse: "Yassine Ben Salem",
    location: "Paris, France",
    category: "modern",
    categoryLabel: "Modern Sidebar",
    badge: "Architectural",
    image: "/images/resumes/hunter-green.png",
    span: "col-span-1 md:col-span-2",
    description: "Deep forest green (#143528) architectural sidebar with high-contrast text and crisp skill badges. Built specifically for systems architects, engineering leads, and technical founders.",
    tags: ["Deep Forest Sidebar", "High Contrast", "Vector Ready"],
    features: ["Deep forest green sidebar", "High-contrast text hierarchy", "Compact project breakdown"],
  },
  {
    id: "tmpl-5",
    templateParam: "classic-clear",
    title: "Classic Clear 100% ATS Safe",
    muse: "Emily Carter",
    location: "Toronto, Canada",
    category: "simple",
    categoryLabel: "Simple & ATS",
    badge: "100% ATS Safe",
    image: "/images/resumes/classic-clear.png",
    span: "col-span-1",
    description: "Clean single-column ATS layout with centered contact row and horizontal divider lines. Guaranteed 100% parse rate on Workday, Greenhouse, and Lever enterprise screening.",
    tags: ["Single Column", "100% ATS Safe", "Enterprise Standard"],
    features: ["Zero parsing bottlenecks", "Right-aligned dates", "Standard typographic rhythm"],
  },
  {
    id: "tmpl-6",
    templateParam: "true-blue",
    title: "True Blue Compact PM Grid",
    muse: "Daniel Mercer",
    location: "Chicago, USA",
    category: "simple",
    categoryLabel: "Simple & ATS",
    badge: "Executive PM",
    image: "/images/resumes/true-blue.png",
    span: "col-span-1",
    description: "Executive compact single-column format with an organized 3-column skills grid and blue horizontal section rules. Ideal for dense career histories and engineering directors.",
    tags: ["3-Col Skills Grid", "Compact Spacing", "Executive Clean"],
    features: ["3-Column skills grid", "Royal blue section rules", "Compact line density"],
  },
  {
    id: "tmpl-7",
    templateParam: "happy-geo",
    title: "Happy Geo Modernist Accents",
    muse: "Sarah Watson",
    location: "London, UK",
    category: "creative",
    categoryLabel: "Creative & Visual",
    badge: "Design & UX",
    image: "/images/resumes/happy-geo.png",
    span: "col-span-1 md:col-span-2",
    description: "Playful geometric corner bands in warm teal and orange with a rounded photo card. Designed for front-end engineers, UI/UX innovators, and consumer startup builders.",
    tags: ["Geometric Accents", "Creative Lead", "Modernist"],
    features: ["Diagonal geometric accents", "Warm photo framing", "Friendly typographic hierarchy"],
  },
];

export function CuratedArtworksGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateItem | null>(null);
  const [templateFilter, setTemplateFilter] = useState<"all" | "modern" | "banners" | "simple" | "creative">("all");

  const filtered = RESUME_TEMPLATES.filter(
    (tmpl) => templateFilter === "all" || tmpl.category === templateFilter
  );

  return (
    <section id="resume-templates" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto space-y-12">
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#173f32]/15 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-[10px] font-extrabold uppercase tracking-wider">
            <FileText size={12} className="text-[#173f32]" />
            <span>✦ CHOOSE FROM 14+ EXECUTIVE RESUME TEMPLATES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Engineered for ATS. Designed to get you hired.
          </h2>
          <p className="text-[#5a6b60] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Explore our curated gallery of 100% ATS-compliant layouts, modern two-column sidebars, royal hero banners, and minimalist editorial designs. Pick any template to open it directly in our live FlowCV-grade studio.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          {[
            { id: "all", label: "All Templates (7 Featured)" },
            { id: "modern", label: "Modern Sidebars" },
            { id: "banners", label: "Header Banners" },
            { id: "simple", label: "Simple & ATS" },
            { id: "creative", label: "Creative & Visual" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setTemplateFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                templateFilter === f.id
                  ? "bg-[#173f32] text-[#f7f4eb] shadow-xs"
                  : "bg-white text-[#222e26] border border-[#173f32]/20 hover:bg-[#faf8f1]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── RESUME TEMPLATES MASONRY GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((tmpl, idx) => (
          <motion.div
            key={tmpl.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            onClick={() => setSelectedTemplate(tmpl)}
            className={`${tmpl.span} group rounded-3xl overflow-hidden bg-white border border-[#173f32]/15 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between`}
          >
            {/* Image Canvas with Hover Zoom */}
            <div className="relative w-full overflow-hidden bg-slate-900 aspect-4/3 sm:aspect-16/10">
              <img
                src={tmpl.image}
                alt={tmpl.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10 shadow-xs">
                  {tmpl.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-[10px] font-mono font-extrabold shadow-xs">
                  {tmpl.badge}
                </span>
              </div>

              {/* Bottom Frosted Glass Action Strip */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent flex items-end justify-between text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Use This Template in Studio ➔</span>
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                  ➔
                </span>
              </div>
            </div>

            {/* Template Plaque Card */}
            <div className="p-6 space-y-3 bg-[#fffdf8]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-editorial font-bold text-[#222e26] group-hover:text-[#173f32] transition-colors leading-snug">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-[#5a6b60] mt-0.5">
                    {tmpl.muse} • {tmpl.location}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0 font-bold">
                  0{idx + 1}
                </span>
              </div>

              <p className="text-xs text-[#5a6b60] leading-relaxed line-clamp-2">
                {tmpl.description}
              </p>

              <div className="pt-2 border-t border-[#173f32]/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {tmpl.tags.map((tag, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded-md bg-[#173f32]/5 text-[10px] font-mono font-medium text-[#173f32] border border-[#173f32]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/resume?template=${tmpl.templateParam}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 rounded-full bg-[#173f32] text-white text-[11px] font-bold hover:bg-[#13352a] transition-all shadow-xs flex items-center gap-1"
                >
                  <span>Use Template</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── BOTTOM CALL TO ACTION ── */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#173f32] to-[#1e5241] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ebd800]">
            <ShieldCheck size={14} />
            <span>FLOWCV-GRADE RESUME STUDIO WITH AI AUTO-FILL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-editorial font-bold">
            Ready to craft your resume with these templates?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
            Paste your rough career notes, customize fonts &amp; density in real time, and download clean vector PDF in one click.
          </p>
        </div>
        <Link
          href="/resume"
          className="px-6 py-3.5 rounded-2xl bg-[#ebd800] hover:bg-[#d6c500] text-[#173f32] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Open Resume Builder Studio</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── LIGHTBOX MODAL FOR FULL TEMPLATE INSPECTION ── */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTemplate(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffdf8] rounded-3xl overflow-hidden max-w-4xl w-full border border-white/20 shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white transition-all cursor-pointer shadow-lg"
              >
                <X size={18} />
              </button>

              {/* Left/Top: High-Res Image Display */}
              <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center p-4">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-full object-contain rounded-xl"
                />
              </div>

              {/* Right/Bottom: Template Details */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173f32]/10 text-[#173f32] text-xs font-mono font-bold">
                    <span>{selectedTemplate.categoryLabel}</span>
                    <span>•</span>
                    <span>{selectedTemplate.badge}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#222e26] leading-tight">
                      {selectedTemplate.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#173f32] mt-1">
                      Inspired by {selectedTemplate.muse}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {selectedTemplate.location}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4a5d52] leading-relaxed">
                    {selectedTemplate.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Key Architecture Features:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedTemplate.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedTemplate.tags.map((tag, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-1 rounded-md bg-[#173f32]/10 text-xs font-mono font-semibold text-[#173f32]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="px-4 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    href={`/resume?template=${selectedTemplate.templateParam}`}
                    className="px-5 py-2.5 rounded-full bg-[#173f32] text-white text-xs font-bold hover:bg-[#13352a] transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Use This Template ➔</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const ResumeTemplatesGallery = CuratedArtworksGallery;
export default CuratedArtworksGallery;
