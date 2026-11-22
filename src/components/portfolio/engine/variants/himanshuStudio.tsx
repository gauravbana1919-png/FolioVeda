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
  Palette,
  Film,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Brush
} from "lucide-react";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function HimanshuNav({ content, theme }: VariantProps) {
  return (
    <nav className="sticky top-0 z-40 bg-[#021a13]/90 backdrop-blur-md border-b border-[#c6d457]/20 px-6 sm:px-10 py-4 text-[#eef3c8]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#06392b] border border-[#c6d457]/40 flex items-center justify-center text-[#c6d457] font-bold text-xs shadow-inner">
            HS
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-[#eef3c8] block">{content.name}</span>
            <span className="text-[10px] font-mono text-[#b7c47a] tracking-wider uppercase">Visual Designer • Studio Canvas</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a href="#work" className="text-[#b7c47a] hover:text-[#eef3c8] transition-colors">
            [ 01 // WORK ]
          </a>
          <a href="#about" className="text-[#b7c47a] hover:text-[#eef3c8] transition-colors">
            [ 02 // ABOUT ]
          </a>
          <a href="#contact" className="px-3 py-1.5 rounded-full bg-[#c6d457] text-[#021a13] font-bold hover:bg-[#d8e860] transition-colors">
            LET'S TALK ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

export function HimanshuHero({ content, theme }: VariantProps) {
  return (
    <section className="relative px-6 sm:px-10 pt-16 pb-12 text-[#eef3c8] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06392b] border border-[#c6d457]/30 text-xs font-mono text-[#c6d457] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#c6d457] animate-pulse" />
          <span className="uppercase">{content.skills?.slice(0, 2).join(" & ") || "CREATIVE PROFESSIONAL"} • {content.location || "WORLDWIDE"}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#eef3c8] max-w-4xl mb-6">
          {content.headline || `${content.name} — Creative & Systems Showcase`}
        </h1>

        <p className="text-base sm:text-lg text-[#b7c47a] max-w-2xl leading-relaxed mb-8">
          {content.bio || "Crafting bespoke brand identities, design systems, and immersive communication design for forward-thinking creative products."}
        </p>

        {/* Studio Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-4 border-t border-[#c6d457]/15 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#06392b]/60 border border-[#c6d457]/20">
            <span className="text-[10px] text-[#b7c47a] block uppercase">Discipline</span>
            <span className="font-bold text-[#eef3c8] truncate block">{content.skills?.[0] || "Visual Design"}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06392b]/60 border border-[#c6d457]/20">
            <span className="text-[10px] text-[#b7c47a] block uppercase">Education</span>
            <span className="font-bold text-[#eef3c8] truncate block">
              {content.education?.[0] ? `${content.education[0].degree} • ${content.education[0].institution}` : "Verified Degree"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#06392b]/60 border border-[#c6d457]/20">
            <span className="text-[10px] text-[#b7c47a] block uppercase">Experience</span>
            <span className="font-bold text-[#eef3c8] truncate block">
              {content.experience?.[0] ? `${content.experience[0].role} • ${content.experience[0].company}` : "Documented Career"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#06392b]/60 border border-[#c6d457]/20">
            <span className="text-[10px] text-[#b7c47a] block uppercase">Location</span>
            <span className="font-bold text-[#c6d457] truncate block">{content.location || "Remote"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HimanshuProjects({ content, theme }: VariantProps) {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", "Branding", "Brand Films", "Print & Social"];

  const projects = content.projects && content.projects.length > 0 ? content.projects : [
    {
      title: "OWLED Media Brand Evolution",
      description: "Complete visual identity and art direction for high-growth digital creative studio, including kinetic logo systems and 360° campaign collateral.",
      category: "Branding",
      impact: "3.2M Impressions across launched brand campaigns",
      tags: ["Brand Identity", "Art Direction", "Typography", "Illustrations"],
      link: "https://himanshus-design.vercel.app/",
    },
    {
      title: "Cinematic Narrative Storyboards",
      description: "Keyframe concept art and sequence illustration for brand films, translating abstract product value propositions into evocative visual arcs.",
      category: "Brand Films",
      impact: "Featured at Indian Creative Showcase 2024",
      tags: ["Visual Storytelling", "Storyboarding", "Concept Art"],
      link: "https://himanshus-design.vercel.app/",
    },
    {
      title: "Editorial & Packaging Systems",
      description: "Tangible tactile print collateral, promotional publications, and limited-run packaging design with custom silkscreen typography.",
      category: "Print & Social",
      impact: "Produced across 15,000+ distributed physical copies",
      tags: ["Print Design", "Packaging", "Silkscreen", "Editorial"],
      link: "https://himanshus-design.vercel.app/",
    },
  ];

  const filtered = filter === "all" ? projects : projects.filter((p: any) => 
    p.category === filter || 
    (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(filter.toLowerCase()))) ||
    (p.techStack && p.techStack.some((t: string) => t.toLowerCase().includes(filter.toLowerCase())))
  );

  return (
    <section id="work" className="px-6 sm:px-10 py-16 text-[#eef3c8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#c6d457]/20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c6d457] tracking-wider uppercase block mb-1">
              [ 01 // SELECTED CREATIVE WORKS ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#eef3c8]">
              Branding, Films & Visual Direction
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  filter === cat
                    ? "bg-[#c6d457] text-[#021a13] shadow-sm"
                    : "bg-[#06392b] text-[#b7c47a] hover:text-[#eef3c8] border border-[#c6d457]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-[#06392b]/70 border border-[#c6d457]/25 hover:border-[#c6d457]/70 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#c6d457]/5"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#b7c47a] mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#021a13] border border-[#c6d457]/30 text-[#c6d457] font-bold">
                    {(proj as any).category || "Visual Design"}
                  </span>
                  <span>0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#eef3c8] group-hover:text-[#c6d457] transition-colors mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#b7c47a] leading-relaxed mb-4">
                  {proj.description}
                </p>

                {(proj as any).impact && (
                  <div className="p-2.5 rounded-xl bg-[#021a13]/80 border border-[#c6d457]/20 text-[11px] font-mono text-[#c6d457] mb-4 flex items-center gap-2">
                    <Sparkles size={12} className="shrink-0" />
                    <span>{(proj as any).impact}</span>
                  </div>
                )}
              </div>

              <div>
                {(() => {
                  const p = proj as any;
                  const tags: string[] = p.tags || p.techStack || [];
                  const linkUrl = p.link || p.liveUrl || p.githubUrl;
                  return (
                    <>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 3).map((tag: string, tIdx: number) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#021a13] text-[#b7c47a] border border-[#c6d457]/15">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {linkUrl && (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#c6d457] hover:underline"
                        >
                          <span>View Showcase</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HimanshuExperience({ content, theme }: VariantProps) {
  const experiences = content.experience && content.experience.length > 0 ? content.experience : [
    {
      company: "OWLED Media",
      role: "Senior Visual Designer & Illustrator",
      period: "2022 — Present",
      description: "Spearheaded visual identity design, storyboard direction, and marketing campaigns for high-profile client rosters across digital and physical media.",
    },
    {
      company: "MIT Institute of Design, Pune",
      role: "Master of Design (M.Des) Candidate",
      period: "2023 — 2025",
      description: "Specializing in advanced visual communication, generative narratives, semiotics, and contemporary typography systems.",
    },
    {
      company: "ExpansionJS Technologies",
      role: "Lead Visual Consultant",
      period: "2020 — 2022",
      description: "Designed multi-channel brand assets, developer design systems, and product illustration guidelines.",
    },
  ];

  return (
    <section id="about" className="px-6 sm:px-10 py-16 bg-[#021a13] border-t border-[#c6d457]/20 text-[#eef3c8]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono font-bold text-[#c6d457] tracking-wider uppercase block mb-1">
            [ 02 // TRAJECTORY & EXPERIENCE ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#eef3c8]">
            Creative Direction & Background
          </h2>
          <p className="text-sm text-[#b7c47a] mt-2">
            Over 4+ years translating complex company visions into unforgettable visual identities and editorial artwork.
          </p>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#06392b]/50 border border-[#c6d457]/20 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div>
                <span className="text-xs font-mono text-[#c6d457] font-bold block mb-1">
                  {exp.period}
                </span>
                <h3 className="text-lg font-bold text-[#eef3c8]">{exp.role}</h3>
                <h4 className="text-sm font-medium text-[#b7c47a] mb-2">{exp.company}</h4>
                <p className="text-xs text-[#b7c47a] leading-relaxed max-w-2xl">
                  {(() => {
                    const e = exp as any;
                    return e.description || (e.highlights ? e.highlights.join(". ") : "");
                  })()}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#c6d457]">
                <CheckCircle2 size={14} />
                <span>Verified Studio Practice</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HimanshuContact({ content, theme }: VariantProps) {
  return (
    <footer id="contact" className="px-6 sm:px-10 py-16 bg-[#06392b] border-t border-[#c6d457]/30 text-[#eef3c8]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="text-xs font-mono text-[#c6d457] uppercase font-bold tracking-wider block mb-2">
            INITIATE COLLABORATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#eef3c8]">
            Let's build something unforgettable.
          </h2>
          <p className="text-xs text-[#b7c47a] font-mono mt-1">
            Available for brand identity, editorial illustration, and creative direction.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {content.contact?.email && (
            <a
              href={`mailto:${content.contact.email}`}
              className="px-4 py-2.5 rounded-full bg-[#c6d457] text-[#021a13] font-bold hover:bg-[#d8e860] transition-colors"
            >
              {content.contact.email}
            </a>
          )}
          {content.contact?.linkedin && (
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#021a13] text-[#c6d457] border border-[#c6d457]/30 hover:border-[#c6d457] transition-colors"
            >
              LINKEDIN ↗
            </a>
          )}
          {content.contact?.github && (
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#021a13] text-[#b7c47a] border border-[#c6d457]/20 hover:text-[#eef3c8] transition-colors"
            >
              GITHUB ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
