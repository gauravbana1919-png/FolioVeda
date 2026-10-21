"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

export function ProjectsSection({ projects = [] }: { projects?: any[] }) {
  const defaultProjects = [
    { title: "E-Commerce Platform", description: "A highly scalable e-commerce backend built with Node.js and PostgreSQL.", techStack: ["Next.js", "Node.js", "PostgreSQL"], liveUrl: "#", githubUrl: "#" },
    { title: "AI Code Reviewer", description: "An automated PR review tool powered by OpenAI.", techStack: ["React", "Python", "OpenAI"], liveUrl: "#", githubUrl: "#" },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">A collection of projects I've built recently.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative bg-secondary/50 rounded-2xl p-8 border border-border/50 hover:border-border transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {(Array.isArray(project.techStack)
                  ? project.techStack
                  : typeof project.techStack === "string"
                  ? project.techStack.split(",").map((t: string) => t.trim()).filter(Boolean)
                  : []
                ).map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-background text-xs font-medium rounded-full border border-border">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-medium hover:text-purple-500 transition-colors">
                    <Code size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
