import { NextResponse } from "next/server";
import { getLLMProvider } from "@/lib/ai";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();

    if (!rawText || typeof rawText !== "string" || rawText.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide more details from your resume or LinkedIn profile." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "AIzaSyAK9twgK8XDu0qsj_DrkIJ5AadB3s7TBqQ",
    });

    const prompt = `
      You are an expert career data extractor for FolioVeda.
      Analyze the provided raw text (from a user's resume, CV, or LinkedIn profile / PDF export) and extract accurate, structured professional data to build an elite, award-winning portfolio.
      
      STRICT ZERO-HALLUCINATION RULES:
      - NEVER fabricate or invent companies, degrees, dates, metrics, or experiences not supported by the provided text.
      - If a field is not found in the text, return an empty array [] or null.
      - Make project titles and headlines outcome-driven and punchy (e.g. "Designing Guided Recovery Engine • Cut Error Rates by 18%").
      
      Return valid JSON matching this exact structure:
      {
        "name": "Candidate Full Name (if found)",
        "headline": "Punchy 1-line professional title (e.g. Systems Engineer & UX Designer • High-Throughput Architecture)",
        "bio": "Engaging 2-3 sentence narrative bio highlighting actual strengths and focus areas",
        "location": "City, Country (e.g. Bengaluru, India or San Francisco, CA)",
        "availability": "e.g. Open to Staff / Senior Roles or Available for Q2 2026",
        "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5", "Skill6", "Skill7", "Skill8"],
        "projects": [
          {
            "title": "Outcome-driven project title",
            "category": "e.g. Distributed Telemetry or AI Product or Design System",
            "impact": "e.g. +38% Throughput • 420ms -> 65ms P99",
            "metrics": "Key measurable result",
            "description": "Clear 2-3 sentence description of the architecture and outcome",
            "techStack": ["Next.js", "TypeScript", "PostgreSQL"],
            "liveUrl": "URL or null",
            "githubUrl": "URL or null"
          }
        ],
        "experience": [
          {
            "role": "Job Title",
            "company": "Company Name",
            "period": "e.g. Jun 2023 - Present or 2021 - 2023",
            "location": "City, Country or Remote",
            "highlights": ["1-3 bullet points of real achievements with quantifiable results"]
          }
        ],
        "certifications": [
          {
            "name": "Certification or License Name (e.g. AWS Solutions Architect or IBM Design Thinking)",
            "issuer": "Issuing Organization (e.g. Amazon, IBM, Meta, Interaction Design Foundation)",
            "year": "Year or Date",
            "status": "Completed"
          }
        ],
        "education": [
          {
            "degree": "Degree / Field of Study",
            "institution": "University / College",
            "year": "Year (e.g. 2023)",
            "honors": "Honors, Distinction, or GPA (if present)"
          }
        ],
        "contact": {
          "email": "candidate email if present",
          "linkedin": "LinkedIn profile URL or handle if present",
          "github": "GitHub profile URL or handle if present",
          "website": "Personal portfolio or blog URL if present",
          "phone": "Phone number if present"
        }
      }

      RAW TEXT:
      ${rawText.slice(0, 10000)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    if (!response.text) {
      throw new Error("Empty response from AI parser");
    }

    const extracted = JSON.parse(response.text);

    return NextResponse.json({
      success: true,
      extracted,
    });
  } catch (error: any) {
    console.error("Extract Profile Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to extract profile information." },
      { status: 500 }
    );
  }
}
