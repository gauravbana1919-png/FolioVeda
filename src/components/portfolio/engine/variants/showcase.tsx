"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { Sparkles, Terminal, ExternalLink, Cpu, Zap } from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function ShowcaseNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-cyan-500/20 bg-[#030712]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]"></div>
          <span className="font-mono text-sm font-bold tracking-wider text-cyan-400">
            {content.name.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#projects" className="hover:text-cyan-400 transition-colors">/PROJECTS</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">/SYSTEMS</a>
          {content.experience?.length ? (
            <a href="#experience" className="hover:text-cyan-400 transition-colors">/LOGS</a>
          ) : null}
          <a href="#contact" className="text-cyan-400 hover:underline">/CONTACT</a>
        </div>
      </div>
    </nav>
  );
}

export function ShowcaseHero({ content }: VariantProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 relative">
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
        <Zap size={13} className="text-cyan-400" /> SYSTEM ONLINE • EDGE READY
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.05] mb-6">
        {content.headline}
      </h1>

      <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
        {content.bio}
      </p>

      <div className="flex items-center gap-4 mt-8">
        <a
          href="#projects"
          className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          Explore Artifacts →
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-wider transition-all"
        >
          Establish Uplink
        </a>
      </div>
    </section>
  );
}

export function ShowcaseProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-cyan-400" />
          <h2 className="text-2xl font-bold uppercase text-white tracking-tight">
            ENGINEERED SYSTEMS
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          [{content.projects.length} UNITS]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="group rounded-xl border border-slate-800 bg-[#0B0F19] p-7 flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                <span className="text-cyan-400">UNIT_0{idx + 1}</span>
                {proj.metrics && (
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold">
                    {proj.metrics}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
                >
                  <span>LIVE</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ShowcaseSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
      <div className="border-t border-cyan-500/20 pt-8">
        <h2 className="text-sm font-mono uppercase text-cyan-400 tracking-widest mb-4">
          // CAPABILITY MATRIX
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {content.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-200 text-xs font-mono hover:border-cyan-400 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShowcaseExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-12">
      <div className="border-t border-cyan-500/20 pt-8">
        <h2 className="text-sm font-mono uppercase text-cyan-400 tracking-widest mb-6">
          // CHRONOLOGICAL LOGS
        </h2>

        <div className="space-y-6">
          {content.experience.map((exp, idx) => (
            <div key={idx} className="border-l border-cyan-500/40 pl-4 py-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-bold text-white text-sm">{exp.role} @ {exp.company}</span>
                <span>{exp.period}</span>
              </div>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-2 text-xs text-slate-400 space-y-1 list-disc list-inside">
                  {exp.highlights.map((h, hidx) => (
                    <li key={hidx}>{h}</li>
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

export function ShowcaseContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-cyan-500/20 mt-12">
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0B0F19] p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          READY TO DEPLOY?
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
          Uplink available for high-throughput engineering architectures and visionary projects.
        </p>

        {content.contact.email && (
          <a
            href={`mailto:${content.contact.email}`}
            className="inline-block px-8 py-3 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            SEND TRANSMISSION ({content.contact.email})
          </a>
        )}
      </div>
    </footer>
  );
}
