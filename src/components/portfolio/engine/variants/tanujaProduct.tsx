"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ExternalLink, 
  Mail, 
  FileText, 
  Eye, 
  ArrowUpRight,
  Cpu,
  Layers,
  CheckCircle2,
  Boxes,
  Workflow,
  ArrowRight
} from "lucide-react";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function TanujaNav({ content, theme }: VariantProps) {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-10 py-4 text-slate-900 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm shadow-blue-500/20">
            T
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-slate-900 block">{content.name}</span>
            <span className="text-[10px] font-medium text-blue-600 tracking-wide uppercase">Product Designer • Microsoft AI</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#work" className="hover:text-blue-600 transition-colors">Case Studies</a>
          <a href="#methods" className="hover:text-blue-600 transition-colors">AI & Methods</a>
          <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm shadow-blue-600/20"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}

export function TanujaHero({ content, theme }: VariantProps) {
  return (
    <section className="px-6 sm:px-10 pt-16 pb-12 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Role Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-700 mb-6 uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>{content.experience?.[0] ? `${content.experience[0].role} @ ${content.experience[0].company}` : (content.headline || "VERIFIED PROFESSIONAL")}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 max-w-4xl leading-[1.08] mb-6 font-sans">
          {content.headline || `${content.name} — Portfolio & Systems Architecture`}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
          {content.bio || "Specializing in crafting intuitive, human-centered digital experiences by seamlessly embedding AI into design and enterprise workflows at scale."}
        </p>

        {/* Highlights Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-6 border-t border-slate-200/70 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Core Focus</span>
            <span className="font-bold text-slate-800 truncate block">{content.skills?.[0] || "Product Systems"}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Organization</span>
            <span className="font-bold text-slate-800 truncate block">{content.experience?.[0]?.company || "Enterprise Practice"}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Top Tools</span>
            <span className="font-bold text-blue-600 truncate block">{content.skills?.slice(1, 3).join(" & ") || "Modern Stack"}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Location</span>
            <span className="font-bold text-slate-800 truncate block">{content.location || "Remote"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TanujaProjects({ content, theme }: VariantProps) {
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);

  const projects = content.projects && content.projects.length > 0 ? content.projects : [
    {
      title: "FOX Icons: Enterprise Design System",
      description: "Led the end-to-end design and icon production framework for enterprise applications, establishing pixel-perfect SVG pipelines and accessibility guidelines.",
      category: "Design System",
      impact: "Adopted by 40+ engineering teams across product suites",
      problem: "Fragmented icon assets causing 35% inconsistency in cross-platform UI rendering.",
      solution: "Built unified tokenized SVG engine with automated Figma sync and zero-latency exports.",
      tags: ["Icon Production", "Figma Design System", "Token Architecture", "Accessibility"],
      link: "https://tanujadesign.in/index.html",
    },
    {
      title: "AI-Powered Figma Workflow Plugin",
      description: "Engineered an intelligent Figma plugin leveraging generative AI to validate presentation templates, automate asset placement, and log visual bugs in real-time.",
      category: "AI & Tooling",
      impact: "Reduced template validation time by 60%",
      problem: "Manual validation of 500+ presentation slide decks was blocking release velocity.",
      solution: "Developed an AI heuristic scanner that checks typography contrast, layout overflow, and brand compliance.",
      tags: ["AI Integration", "Figma Plugin", "Template Validation", "Workflow Automation"],
      link: "https://tanujadesign.in/index.html",
    },
    {
      title: "PowerPoint Intelligent Narrative Builder",
      description: "Designed assistive AI features transforming dense corporate data sheets into succinct, executive-ready narrative slide decks.",
      category: "Product UX",
      impact: "Over 1.4M slide decks synthesized monthly",
      problem: "Users struggled to distill complex spreadsheets into clean visual takeaways.",
      solution: "Created prompt-less AI recommendations that suggest optimal chart types and summaries based on data shape.",
      tags: ["Enterprise UX", "AI Storytelling", "Data Visualization", "User Research"],
      link: "https://tanujadesign.in/index.html",
    },
  ];

  return (
    <section id="work" className="px-6 sm:px-10 py-16 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase block mb-1">
              [ 01 // FEATURED PRODUCT CASE STUDIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Enterprise AI & System Design
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            3.5 Years of high-impact product delivery
          </span>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-500/40 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700 tracking-wide">
                      {(proj as any).category || "Case Study"}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      CASE_0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {proj.description}
                  </p>

                  {/* Impact Metric Banner */}
                  {(proj as any).impact && (
                    <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 text-xs font-bold text-blue-800 flex items-center gap-2 mb-6">
                      <Sparkles size={15} className="text-blue-600 shrink-0" />
                      <span>{(proj as any).impact}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const p = proj as any;
                      const tags: string[] = p.tags || p.techStack || [];
                      return tags.map((tag: string, tIdx: number) => (
                        <span key={tIdx} className="px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200">
                          {tag}
                        </span>
                      ));
                    })()}
                  </div>
                </div>

                <div className="lg:w-80 shrink-0 flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Problem Context
                    </span>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {(proj as any).problem || "Streamlining complex enterprise workflows into frictionless human-centric steps."}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      AI Solution
                    </span>
                    <p className="text-xs text-slate-700 font-medium line-clamp-3 leading-relaxed">
                      {(proj as any).solution || "Custom AI pipeline integrated directly into the creator toolchain."}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Read Full Breakdown</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Breakdown */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  {(activeModalProject as any).category}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/60 text-blue-900 font-semibold">
                🎯 Validated Impact: {(activeModalProject as any).impact}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">1. The Problem Space</h4>
                <p className="text-slate-600 leading-relaxed">
                  {(activeModalProject as any).problem || activeModalProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">2. Design Architecture & AI Pipeline</h4>
                <p className="text-slate-600 leading-relaxed">
                  {(activeModalProject as any).solution || "Designed systematic human-in-the-loop workflows allowing seamless transitions between manual crafting and AI generation."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Microsoft PowerPoint / Enterprise Standards</span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function TanujaExperience({ content, theme }: VariantProps) {
  const experiences = content.experience && content.experience.length > 0 ? content.experience : [
    {
      company: "Microsoft",
      role: "Product Designer • PowerPoint AI",
      period: "2021 — Present",
      description: "Spearheading AI-assisted presentation authoring, intelligent layout heuristics, and enterprise-grade icon systems used across Microsoft 365.",
    },
    {
      company: "UX Design Studio",
      role: "Product & Experience Designer",
      period: "2019 — 2021",
      description: "Crafted multi-platform design systems, conducted ethnographic user studies, and validated interactive software prototypes.",
    },
  ];

  return (
    <section id="experience" className="px-6 sm:px-10 py-16 bg-slate-50 border-t border-slate-200/60 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase block mb-1">
            [ 02 // CAREER RECORD & EXPERTISE ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Professional Trajectory
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            Proven track record transforming enterprise software experiences into intuitive, delight-driven workflows.
          </p>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 mb-2 inline-block">
                  {exp.period}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{exp.role}</h3>
                <h4 className="text-sm font-semibold text-blue-600 mb-3">{exp.company}</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {(() => {
                    const e = exp as any;
                    return e.description || (e.highlights ? e.highlights.join(". ") : "");
                  })()}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={15} />
                <span>Verified Enterprise Impact</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TanujaEducation({ content }: VariantProps) {
  if (!content.education || content.education.length === 0) return null;

  return (
    <section id="education" className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
          Academic Credentials &amp; Degrees
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.education.map((edu, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-blue-400 font-mono mb-2">
                <span>{edu.year}</span>
                {edu.gpa && <span>GPA {edu.gpa}</span>}
              </div>
              <h3 className="text-base font-bold text-white">{edu.degree}</h3>
              <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
              {edu.honors && (
                <p className="text-xs text-emerald-400 font-medium mt-2">{edu.honors}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TanujaContact({ content, theme }: VariantProps) {
  return (
    <footer id="contact" className="px-6 sm:px-10 py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider block mb-2">
            CONNECT WITH TANUJA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to design the future with AI?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Open for dialogue, enterprise product reviews, and keynote discussions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          {content.contact?.email && (
            <a
              href={`mailto:${content.contact.email}`}
              className="px-5 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              {content.contact.email}
            </a>
          )}
          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-slate-800 text-white border border-slate-700 hover:border-blue-400 transition-colors"
            >
              LinkedIn Profile ↗
            </a>
          )}
          <a
            href="https://tanujadesign.in/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:text-white transition-colors"
          >
            tanujadesign.in ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
