"use client";

import { useState } from "react";
import { HeroSection } from "@/components/portfolio/template3/HeroSection";
import { ExperienceSection } from "@/components/portfolio/template3/ExperienceSection";
import { ChatEditor } from "@/components/ui/ChatEditor";

export default function BusinessPreview() {
  const [mockUser, setMockUser] = useState({
    name: "Sarah Business",
    profile: {
      bio: "MBA Candidate specializing in data-driven growth strategies and startup operational scaling."
    }
  });

  return (
    <main className="min-h-screen relative">
      <HeroSection user={mockUser} />
      <ExperienceSection />
      
      {/* Floating AI Chat Editor */}
      <ChatEditor onUpdate={(data) => {
        setMockUser(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...(data.bio && { bio: data.bio })
          }
        }));
      }} />
    </main>
  );
}
