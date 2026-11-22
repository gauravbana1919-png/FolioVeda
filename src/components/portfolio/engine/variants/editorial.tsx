"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function EditorialNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-[#E4E1D9] bg-[#FAF8F5]/90 backdrop-blur-md px-6 py-5 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="font-serif text-lg font-bold tracking-tight text-[#18181B]">
          {content.name}
        </span>
        <div className="flex items-center gap-6 text-sm text-[#71717A]">
          <a href="#work" className="hover:text-[#18181B] transition-colors">Work</a>
          <a href="#about" className="hover:text-[#18181B] transition-colors">About</a>
          {content.experience?.length ? (
            <a href="#experience" className="hover:text-[#18181B] transition-colors">Career</a>
          ) : null}
          <a href="#contact" className="hover:text-[#C2410C] font-medium transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export function EditorialHero({ content }: VariantProps) {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-[#C2410C] font-semibold mb-4">
        Selected Portfolio & Case Studies
      </p>
      <h1 className="font-serif text-4xl sm:text-6xl text-[#18181B] font-normal tracking-tight leading-[1.15] mb-6">
        {content.headline}
      </h1>
      <div className="w-12 h-0.5 bg-[#C2410C] mx-auto mb-6"></div>
      <p className="text-[#71717A] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
        {content.bio}
      </p>
    </section>
  );
}

export function EditorialProjects({ content }: VariantProps) {
  return (
    <section id="work" className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-t border-[#E4E1D9] pt-12 mb-12 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
          Selected Works
        </h2>
        <span className="text-xs text-[#71717A] tracking-wider uppercase font-medium">
          {content.projects.length} Works
        </span>
      </div>

      <div className="space-y-16">
        {content.projects.map((proj, idx) => (
          <article
            key={idx}
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline pb-16 border-b border-[#E4E1D9]/70 last:border-b-0"
          >
            <div className="md:col-span-4">
              <span className="text-xs text-[#71717A] font-serif italic mb-1 block">
                0{idx + 1} / Project
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#18181B] group-hover:text-[#C2410C] transition-colors">
                {proj.title}
              </h3>
              {proj.metrics && (
                <p className="text-xs text-[#C2410C] font-semibold mt-2">
                  {proj.metrics}
                </p>
              )}
            </div>

            <div className="md:col-span-8 space-y-4">
              <p className="text-sm sm:text-base text-[#71717A] leading-relaxed">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#F4F1EA] text-[#18181B] border border-[#E4E1D9]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs uppercase tracking-wider font-semibold">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#C2410C] hover:underline"
                  >
                    View Project ↗
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#71717A] hover:text-[#18181B]"
                  >
                    Repository ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EditorialSkills({ content }: VariantProps) {
  if (!content.skills || content.skills.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-t border-[#E4E1D9] pt-12">
        <h2 className="font-serif text-2xl font-normal text-[#18181B] mb-6">
          Core Disciplines & Tooling
        </h2>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full border border-[#E4E1D9] bg-[#F4F1EA] text-sm text-[#18181B] font-serif italic"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorialExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-t border-[#E4E1D9] pt-12">
        <h2 className="font-serif text-2xl font-normal text-[#18181B] mb-8">
          Career Engagements
        </h2>

        <div className="space-y-8">
          {content.experience.map((exp, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 text-xs uppercase tracking-wider text-[#71717A] font-medium pt-1">
                {exp.period}
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-lg font-bold text-[#18181B]">
                  {exp.role} <span className="text-[#C2410C]">@ {exp.company}</span>
                </h3>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 text-sm text-[#71717A] space-y-1 list-disc list-inside">
                    {exp.highlights.map((h, hidx) => (
                      <li key={hidx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorialEducation({ content }: VariantProps) {
  if (!content.education || content.education.length === 0) return null;

  return (
    <section id="education" className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-t border-[#E4E1D9] pt-12">
        <h2 className="font-serif text-2xl font-normal text-[#18181B] mb-8">
          Academic Foundations
        </h2>

        <div className="space-y-6">
          {content.education.map((edu, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-[#E4E1D9]/50 last:border-b-0">
              <div className="md:col-span-4 text-xs uppercase tracking-wider text-[#71717A] font-medium pt-1">
                {edu.year}
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-lg font-bold text-[#18181B]">
                  {edu.degree}
                </h3>
                <p className="text-sm text-[#C2410C] font-serif italic mt-0.5">{edu.institution}</p>
                {edu.honors && (
                  <p className="text-xs text-[#71717A] mt-1">{edu.honors}</p>
                )}
                {edu.gpa && (
                  <p className="text-xs font-mono text-[#71717A] mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorialContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="max-w-4xl mx-auto px-6 py-20 border-t border-[#E4E1D9] text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-[#C2410C] font-semibold">
        Get in Touch
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18181B] mt-2 mb-4">
        Let’s start a conversation.
      </h2>
      <p className="text-sm text-[#71717A] max-w-md mx-auto mb-8 font-sans">
        Currently available for select freelance opportunities, full-time engineering roles, and architectural advisement.
      </p>

      {content.contact.email && (
        <a
          href={`mailto:${content.contact.email}`}
          className="inline-block px-8 py-3 bg-[#18181B] text-[#FAF8F5] text-sm font-medium tracking-wide rounded-sm hover:bg-[#C2410C] transition-colors"
        >
          {content.contact.email}
        </a>
      )}

      <div className="flex items-center justify-center gap-6 mt-10 text-xs uppercase tracking-wider text-[#71717A]">
        {content.contact.github && (
          <a href={content.contact.github} target="_blank" rel="noreferrer" className="hover:text-[#18181B]">
            GitHub
          </a>
        )}
        {content.contact.linkedin && (
          <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#18181B]">
            LinkedIn
          </a>
        )}
        {content.contact.twitter && (
          <a href={content.contact.twitter} target="_blank" rel="noreferrer" className="hover:text-[#18181B]">
            Twitter / X
          </a>
        )}
      </div>
    </footer>
  );
}
