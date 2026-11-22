import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { name, role, skills, projects } = await req.json();

    const skillsText = Array.isArray(skills)
      ? skills
          .map((s) => (typeof s === "string" ? s : s.name))
          .filter(Boolean)
          .join(", ")
      : "various technologies";

    const projectsText = Array.isArray(projects)
      ? projects
          .map((p) => p.title || p.name)
          .filter(Boolean)
          .join(", ")
      : "";

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Write a compelling, professional "About Me" paragraph for a developer or creative portfolio website.

Details:
- Name: ${name || "the developer"}
- Role: ${role || "Software Developer & AI Builder"}
- Skills: ${skillsText}
${projectsText ? `- Notable projects: ${projectsText}` : ""}

Requirements:
- 2-3 sentences maximum
- Energetic, confident, and personal tone (not robotic or generic corporate jargon)
- Mention their role and enthusiasm for solving hard technical problems
- Subtly weave in 2-3 of their top technical skills
- Do NOT start with "I am" or "My name is"
- No bullet points, just one clean paragraph
- Do not wrap in quotes`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = response.text?.trim();
        if (text) {
          return NextResponse.json({ success: true, bio: text });
        }
      } catch (err: any) {
        console.warn("Gemini bio generation failed, using dynamic generator:", err.message);
      }
    }

    // Dynamic high-craft fallback template
    const roleClean = role || "Full-Stack Engineer & AI Systems Architect";
    const primarySkill = Array.isArray(skills) && skills.length > 0 ? (typeof skills[0] === "string" ? skills[0] : skills[0].name) : "modern web frameworks";
    const secondarySkill = Array.isArray(skills) && skills.length > 1 ? (typeof skills[1] === "string" ? skills[1] : skills[1].name) : "scalable distributed systems";

    const dynamicBio = `Building high-performance digital products at the intersection of ${primarySkill} and ${secondarySkill}. Driven by scalable system architecture, thoughtful interaction design, and shipping resilient software that makes an impact.`;

    return NextResponse.json({ success: true, bio: dynamicBio });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate bio" },
      { status: 500 }
    );
  }
}
