"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function PosterNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#10B981] rounded-none"></span>
          <span className="font-black text-lg tracking-wider uppercase text-[#FAFAFA]">
            {content.name}
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold text-[#A1A1AA]">
          <a href="#projects" className="hover:text-[#10B981] transition-colors">PROJECTS</a>
          <a href="#skills" className="hover:text-[#10B981] transition-colors">STACK</a>
          {content.experience?.length ? (
            <a href="#experience" className="hover:text-[#10B981] transition-colors">EXPERIENCE</a>
          ) : null}
          <a href="#contact" className="text-[#10B981] hover:underline">CONTACT</a>
        </div>
      </div>
    </nav>
  );
}

export function PosterHero({ content }: VariantProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181B] border border-[#27272A] text-xs font-bold text-[#10B981] tracking-widest uppercase mb-6">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
        AVAILABLE FOR COLLABORATION
      </div>

      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#FAFAFA] tracking-tighter uppercase leading-[0.95] mb-6">
        {content.headline}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-[#27272A] pt-8">
        <div className="md:col-span-8">
          <p className="text-base sm:text-xl text-[#A1A1AA] font-normal leading-relaxed max-w-2xl">
            {content.bio}
          </p>
        </div>
        <div className="md:col-span-4 flex md:justify-end gap-3">
          <a
            href="#projects"
            className="px-6 py-3 bg-[#10B981] text-[#09090B] font-black text-sm uppercase tracking-wider hover:bg-[#34D399] transition-all"
          >
            VIEW PROJECTS →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#27272A] bg-[#18181B] text-[#FAFAFA] font-bold text-sm uppercase tracking-wider hover:border-[#10B981] transition-all"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </section>
  );
}

export function PosterProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between border-b-2 border-[#FAFAFA] pb-4 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#10B981] font-black block mb-1">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAFAFA]">
            SELECTED WORKS
          </h2>
        </div>
        <span className="text-sm font-bold text-[#A1A1AA]">
          [0{content.projects.length} BUILDS]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="group border border-[#27272A] bg-[#18181B] p-8 flex flex-col justify-between hover:border-[#10B981] transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#A1A1AA]">PROJECT // 0{idx + 1}</span>
                {proj.metrics && (
                  <span className="px-2.5 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs font-black tracking-wider uppercase">
                    {proj.metrics}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#FAFAFA] tracking-tight uppercase group-hover:text-[#10B981] transition-colors">
                {proj.title}
              </h3>

              <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#27272A]">
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-[#09090B] text-[#FAFAFA] border border-[#27272A]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#FAFAFA] text-[#09090B] hover:bg-[#10B981] transition-colors"
                  >
                    LIVE DEMO ↗
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-[#27272A] text-[#FAFAFA] hover:border-[#FAFAFA] transition-colors"
                  >
                    CODE ↗
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

export function PosterSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
      <div className="border-t border-[#27272A] pt-8">
        <span className="text-xs uppercase tracking-widest text-[#10B981] font-black block mb-2">
          ARSENAL & TECHNOLOGIES
        </span>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-sm font-black uppercase tracking-wider px-4 py-2 bg-[#18181B] text-[#FAFAFA] border border-[#27272A] hover:border-[#10B981] hover:text-[#10B981] transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PosterExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-12">
      <div className="border-t border-[#27272A] pt-8">
        <span className="text-xs uppercase tracking-widest text-[#10B981] font-black block mb-6">
          CAREER TRACK RECORD
        </span>

        <div className="divide-y divide-[#27272A]">
          {content.experience.map((exp, idx) => (
            <div key={idx} className="py-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div>
                <h3 className="text-xl font-black uppercase text-[#FAFAFA]">
                  {exp.role} <span className="text-[#10B981]">/ {exp.company}</span>
                </h3>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 text-sm text-[#A1A1AA] space-y-1 list-disc list-inside">
                    {exp.highlights.map((h, hidx) => (
                      <li key={hidx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="text-xs font-mono font-bold text-[#A1A1AA] uppercase">
                {exp.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PosterContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t-2 border-[#FAFAFA] mt-16">
      <div className="bg-[#18181B] border border-[#27272A] p-8 sm:p-12">
        <span className="text-xs uppercase tracking-widest text-[#10B981] font-black block mb-2">
          LET'S CONNECT
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-[#FAFAFA] tracking-tighter uppercase mb-6">
          BUILD SOMETHING IMPACTFUL.
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {content.contact.email && (
            <a
              href={`mailto:${content.contact.email}`}
              className="px-6 py-3 bg-[#10B981] text-[#09090B] font-black text-sm uppercase tracking-wider hover:bg-[#34D399] transition-all"
            >
              SEND DIRECT EMAIL →
            </a>
          )}

          {content.contact.github && (
            <a
              href={content.contact.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#27272A] text-[#FAFAFA] font-bold text-sm uppercase tracking-wider hover:border-[#10B981] transition-all"
            >
              GITHUB ↗
            </a>
          )}

          {content.contact.linkedin && (
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#27272A] text-[#FAFAFA] font-bold text-sm uppercase tracking-wider hover:border-[#10B981] transition-all"
            >
              LINKEDIN ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
