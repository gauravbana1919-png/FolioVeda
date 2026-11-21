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
      Analyze the provided raw text (from a user's resume or LinkedIn profile) and extract accurate, structured professional data.
      
      STRICT RULES:
      - NEVER hallucinate or invent companies, degrees, dates, or experiences not mentioned in the text.
      - Return valid JSON matching this exact structure:
      {
        "headline": "punchy 1-line professional title (e.g. Senior Full-Stack Engineer • Next.js & Distributed Systems)",
        "bio": "engaging 2-3 sentence professional bio emphasizing real capabilities",
        "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5", "Skill6"],
        "experience": [
          {
            "role": "Job Title",
            "company": "Company Name",
            "period": "e.g. 2022 - Present or Jan 2021 - Dec 2022",
            "location": "City, Country or Remote (optional)",
            "highlights": ["1-3 bullet points of real accomplishments"]
          }
        ],
        "education": [
          {
            "degree": "Degree / Field of Study",
            "institution": "University / College",
            "year": "Graduation Year (e.g. 2022)",
            "honors": "Honors or GPA (optional)"
          }
        ]
      }

      RAW TEXT:
      ${rawText.slice(0, 8000)}
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
