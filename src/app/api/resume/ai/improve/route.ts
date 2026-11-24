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
    const { text, type = "bullet", jobRole } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required to improve." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        improvedText: text.trim(),
        message: "API key not configured",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let instruction = "";
    if (type === "redo_shorter") {
      instruction = "Make this resume bullet point more concise and punchy without losing key metrics or technologies. Keep it to one line (maximum 18-22 words).";
    } else if (type === "summary") {
      instruction = "Rewrite this professional summary to be compelling, outcome-driven, and recruiter-grade. Highlight leadership, systems complexity, and business impact in 2-3 sentences.";
    } else {
      instruction = "Rewrite this resume bullet point using the STAR framework (Situation, Task, Action, Result). Start with a powerful past-tense action verb (e.g. Architected, Engineered, Optimized, Spearheaded, Reduced). Include realistic quantifiable metrics (e.g. % latency, $ cost reduction, throughput) if implied.";
    }

    const prompt = `${instruction}
Target Role: ${jobRole || "Software Professional"}
Original Text: "${text.trim()}"

Return ONLY the rewritten text with zero commentary, zero conversational filler, and no quotation marks.`;

    for (const model of MODEL_CHAIN) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        const output = res.text?.trim()?.replace(/^["']|["']$/g, "").trim();
        if (output) {
          return NextResponse.json({
            success: true,
            improvedText: output,
          });
        }
      } catch (err: any) {
        console.warn(`Model ${model} error:`, err.message);
      }
    }

    return NextResponse.json({
      success: true,
      improvedText: text.trim(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to improve text." },
      { status: 500 }
    );
  }
}
