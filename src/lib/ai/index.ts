import { GoogleGenAI } from '@google/genai';

export interface TailoredResumeResult {
  tailoredContent: string;
  keywordMatchScore: number;
}

export interface LLMProvider {
  tailorResume(originalResume: string, jobDescription: string): Promise<TailoredResumeResult>;
}

export class GeminiProvider implements LLMProvider {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || 'dummy-key',
    });
  }

  async tailorResume(originalResume: string, jobDescription: string): Promise<TailoredResumeResult> {
    const prompt = `
      You are an expert ATS-friendly resume writer. 
      You are given a candidate's ORIGINAL RESUME data and a target JOB DESCRIPTION.
      
      HARD RULES - YOU MUST OBEY THESE STRICTLY:
      1. NEVER invent, fabricate, or hallucinate experience, skills, companies, dates, degrees, or numbers.
      2. You may ONLY rephrase, reorder, and emphasize what the user ACTUALLY provided in their original resume to better match the job description.
      3. Return a JSON object with exactly two fields:
         - "tailoredContent": The new resume text formatted nicely in markdown.
         - "keywordMatchScore": A number from 0 to 100 representing how well the original resume matched the job description keywords before modification.
      
      ORIGINAL RESUME:
      ${originalResume}
      
      JOB DESCRIPTION:
      ${jobDescription}
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2, // Low temperature for factual accuracy
        },
      });

      if (!response.text) {
        throw new Error("Empty response from AI");
      }

      const parsed = JSON.parse(response.text);
      
      return {
        tailoredContent: parsed.tailoredContent || originalResume,
        keywordMatchScore: parsed.keywordMatchScore || 0,
      };
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw new Error("Failed to tailor resume");
    }
  }
}

// Factory or default export
export const getLLMProvider = (): LLMProvider => {
  return new GeminiProvider();
};
