import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const MODEL_CHAIN = [
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite-preview",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role } = body;

    const targetRole = role || "Full-Stack Software Engineer";
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Return a JSON array of 12-15 most in-demand, highly-parsed technical skills, frameworks, and tools for the role: "${targetRole}".
Format: ["TypeScript", "Next.js", "Docker", ...]
Return ONLY the raw JSON array. Do not include markdown codeblocks or other text.`;

      for (const model of MODEL_CHAIN) {
        try {
          const res = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "application/json" },
          });

          const raw = res.text?.trim()?.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim() || "";
          const skills = JSON.parse(raw);
          if (Array.isArray(skills) && skills.length > 0) {
            return NextResponse.json({ success: true, skills });
          }
        } catch (e: any) {
          console.warn(`Model ${model} skill error:`, e.message);
        }
      }
    }

    // Default curated fallback
    const fallbackSkills = [
      "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL",
      "Tailwind CSS", "Docker", "RESTful APIs", "GraphQL", "Git",
      "AWS", "CI/CD", "Redis", "Microservices"
    ];

    return NextResponse.json({ success: true, skills: fallbackSkills });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch skills." },
      { status: 500 }
    );
  }
}
