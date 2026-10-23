"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function TerminalNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-[#30363D] bg-[#161B22]/90 backdrop-blur-md px-4 py-3 sticky top-0 z-40 font-mono text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E6EDF3]">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2EA043] animate-pulse"></span>
          <span className="font-semibold text-[#2EA043]">~/{content.name.toLowerCase().replace(/\s+/g, "-")}</span>
          <span className="text-[#8B949E] hidden sm:inline">(git:main)</span>
        </div>
        <div className="flex items-center gap-4 text-[#8B949E]">
          <a href="#projects" className="hover:text-[#E6EDF3] transition-colors">./projects</a>
          <a href="#skills" className="hover:text-[#E6EDF3] transition-colors">./skills</a>
          <a href="#experience" className="hover:text-[#E6EDF3] transition-colors">./experience</a>
          <a href="#contact" className="hover:text-[#2EA043] transition-colors">./contact</a>
        </div>
      </div>
    </nav>
  );
}

export function TerminalHero({ content }: VariantProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 font-mono">
      {/* Terminal Window Chrome */}
      <div className="rounded-lg border border-[#30363D] bg-[#161B22] shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#0D1117] px-4 py-3 border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FA7970]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#FAA356]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#7CE38B]/80"></div>
            <span className="ml-2 text-xs text-[#8B949E]">bash - 80x24</span>
          </div>
          <span className="text-[11px] text-[#8B949E]">ssh://{content.name.toLowerCase().replace(/\s+/g, "")}@folioveda.live</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 text-sm space-y-4">
          <div>
            <span className="text-[#2EA043] font-semibold">user@portfolio</span>
            <span className="text-[#8B949E]">:</span>
            <span className="text-[#79C0FF]">~</span>
            <span className="text-[#E6EDF3]">$ whoami</span>
          </div>
          <div className="pl-4 border-l-2 border-[#2EA043] space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#E6EDF3] tracking-tight">{content.name}</h1>
            <p className="text-[#79C0FF] font-medium">{content.headline}</p>
            <p className="text-[#8B949E] text-xs pt-1 max-w-2xl leading-relaxed">{content.bio}</p>
          </div>

          <div>
            <span className="text-[#2EA043] font-semibold">user@portfolio</span>
            <span className="text-[#8B949E]">:</span>
            <span className="text-[#79C0FF]">~</span>
            <span className="text-[#E6EDF3]">$ uptime</span>
          </div>
          <p className="pl-4 text-xs text-[#7CE38B]">
            up 100%, 0 errors, open for high-impact opportunities & engineering collaborations.
          </p>
        </div>
      </div>
    </section>
  );
}

export function TerminalProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-[#2EA043]">$</span>
        <h2 className="text-[#E6EDF3] font-semibold">ls -la ./featured_projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="border border-[#30363D] bg-[#161B22] p-5 rounded-md hover:border-[#2EA043] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#8B949E] mb-2">
                <span className="text-[#79C0FF]">commit #{Math.random().toString(16).substring(2, 8)}</span>
                {proj.metrics && (
                  <span className="px-2 py-0.5 rounded bg-[#2EA043]/10 text-[#7CE38B] text-[11px] font-medium border border-[#2EA043]/30">
                    {proj.metrics}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-[#E6EDF3] group-hover:text-[#2EA043] transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#30363D]">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#0D1117] text-[#8B949E] border border-[#30363D]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2EA043] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>[live demo]</span>
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#79C0FF] hover:underline flex items-center gap-1"
                  >
                    <span>[source code]</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TerminalSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <div className="flex items-center gap-2 mb-4 text-sm">
        <span className="text-[#2EA043]">$</span>
        <h2 className="text-[#E6EDF3] font-semibold">cat ./skills.env</h2>
      </div>

      <div className="p-4 rounded-md border border-[#30363D] bg-[#161B22] flex flex-wrap gap-2 text-xs">
        {content.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded bg-[#0D1117] text-[#79C0FF] border border-[#30363D] hover:border-[#2EA043] transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function TerminalExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-[#2EA043]">$</span>
        <h2 className="text-[#E6EDF3] font-semibold">git log --experience --oneline</h2>
      </div>

      <div className="space-y-4">
        {content.experience.map((exp, idx) => (
          <div key={idx} className="border-l-2 border-[#30363D] pl-4 py-1 relative">
            <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#2EA043]"></span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <span className="font-semibold text-[#E6EDF3] text-sm">{exp.role} @ {exp.company}</span>
              <span className="text-[#8B949E]">{exp.period}</span>
            </div>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-2 text-xs text-[#8B949E] space-y-1 list-disc list-inside">
                {exp.highlights.map((h, hidx) => (
                  <li key={hidx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function TerminalContact({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (content.contact.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer id="contact" className="max-w-5xl mx-auto px-4 py-12 font-mono border-t border-[#30363D] mt-12">
      <div className="rounded-lg border border-[#30363D] bg-[#161B22] p-6 text-xs space-y-4">
        <div>
          <span className="text-[#2EA043]">$</span>
          <span className="text-[#E6EDF3] ml-2">curl -X POST /api/contact --connect</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {content.contact.email && (
            <button
              onClick={copyEmail}
              className="px-3 py-1.5 rounded bg-[#2EA043] text-[#0D1117] font-semibold hover:bg-[#3FB950] transition-colors"
            >
              {copied ? "✓ copied to clipboard!" : `copy email (${content.contact.email})`}
            </button>
          )}

          {content.contact.github && (
            <a
              href={content.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#79C0FF] hover:underline"
            >
              github →
            </a>
          )}

          {content.contact.linkedin && (
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#79C0FF] hover:underline"
            >
              linkedin →
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
