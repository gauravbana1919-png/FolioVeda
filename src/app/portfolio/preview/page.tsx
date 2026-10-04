"use client";

import { HeroSection } from "@/components/portfolio/template1/HeroSection";
import { Navbar } from "@/components/portfolio/template1/Navbar";
import { ProjectsSection } from "@/components/portfolio/template1/ProjectsSection";

export default function PortfolioPreview() {
  // Mock user data for the preview
  const mockUser = {
    name: "Alex Developer",
    profile: {
      bio: "I turn messy ideas into thoughtful, highly-performant software. Passionate about Next.js, Framer Motion, and building things that scale."
    },
    projects: [
      {
        title: "Fintech Dashboard",
        description: "A comprehensive dashboard for tracking personal finances with real-time charts and data visualization.",
        techStack: ["Next.js", "Tailwind", "Recharts"],
        liveUrl: "#",
        githubUrl: "#"
      },
      {
        title: "AI Writing Assistant",
        description: "An AI-powered tool that helps writers overcome block and generate creative ideas on the fly.",
        techStack: ["React", "OpenAI API", "Node.js"],
        liveUrl: "#",
        githubUrl: "#"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar user={mockUser} />
      <main className="pt-24 pb-12 max-w-7xl mx-auto">
        <HeroSection user={mockUser} />
        <ProjectsSection projects={mockUser.projects} />
      </main>
      
      {/* Platform Badge Overlay */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="/" className="px-3 py-2 bg-foreground text-background text-xs font-semibold rounded-md shadow-lg opacity-80 hover:opacity-100 transition-opacity">
          Built with PortfolioForge
        </a>
      </div>
    </div>
  );
}
