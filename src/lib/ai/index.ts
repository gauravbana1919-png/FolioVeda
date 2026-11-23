import { GoogleGenAI } from '@google/genai';

export interface TailoredResumeResult {
  tailoredContent: string;
  keywordMatchScore: number;
}

export interface LLMProvider {
  tailorResume(originalResume: string, jobDescription: string): Promise<TailoredResumeResult>;
}

// Models to try in order — start with most capable, then lighter fallbacks
const MODEL_CHAIN = [
  'gemini-2.5-flash',
  'gemini-3.5-flash',
  'gemini-2.0-flash-lite',
];

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      You are an expert ATS-friendly executive resume writer. 
      You are given a candidate's ORIGINAL RESUME data and a target JOB DESCRIPTION.
      
      HARD RULES - YOU MUST OBEY THESE STRICTLY:
      1. ZERO HALLUCINATION: NEVER invent, fabricate, or hallucinate experience, skills, companies, dates, degrees, credentials, or metrics.
      2. You may ONLY rephrase, reorder, and emphasize what the user ACTUALLY provided in their original resume to better match the target role.
      3. Format "tailoredContent" strictly as clean ATS-compatible Markdown using standard sections:
         # [Candidate Name]
         [Email] • [Phone] • [Location] • [LinkedIn] • [GitHub]
         
         ## PROFESSIONAL SUMMARY
         [2-3 concise sentences highlighting genuine relevant strengths]
         
         ## TECHNICAL SKILLS
         - Languages & Frameworks: [List user's actual skills]
         - Tools & Cloud: [List user's actual tools]
         
         ## WORK EXPERIENCE
         ### [Role Title] — [Company Name] | [Date Range] | [Location]
         * [Action verb + task + verifiable outcome]
         * [Action verb + system worked on + result]
         
         ## PROJECTS
         ### [Project Name] | [Key Tech]
         * [Architecture and impact statement]
         
         ## EDUCATION
         ### [Degree] — [Institution] | [Graduation Year]
      4. DO NOT wrap "tailoredContent" in markdown code fences or backticks. Return raw markdown text inside the JSON string.
      5. Return a JSON object with exactly two fields:
         - "tailoredContent": The new resume text.
         - "keywordMatchScore": An integer from 0 to 100 representing how well the original resume matched the job description keywords before modification.
      
      ORIGINAL RESUME:
      ${originalResume}
      
      JOB DESCRIPTION:
      ${jobDescription}
    `;

    let lastError: Error | null = null;

    // Try each model in the fallback chain
    for (const model of MODEL_CHAIN) {
      try {
        console.log(`[Resume Tailor] Trying model: ${model}`);
        
        const response = await withTimeout(
          this.ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
          15000 // 15 second timeout per model
        );

        if (!response.text) {
          throw new Error("Empty response from AI");
        }

        const parsed = JSON.parse(response.text);
        
        console.log(`[Resume Tailor] ✅ Success with model: ${model}`);

        if (!parsed.tailoredContent || parsed.tailoredContent.trim().length < 20) {
          throw new Error("AI returned empty or invalid tailored content — retrying next model.");
        }

        return {
          tailoredContent: parsed.tailoredContent,
          keywordMatchScore: typeof parsed.keywordMatchScore === 'number' ? parsed.keywordMatchScore : 0,
        };
      } catch (error: any) {
        lastError = error;
        const status = error?.status || error?.httpStatusCode || 0;
        console.error(`[Resume Tailor] ❌ Model ${model} failed (status: ${status}): ${error.message}`);

        // Brief pause before trying next model
        await sleep(500);
        continue;
      }
    }

    // All models failed
    console.error("[Resume Tailor] All models exhausted. Last error:", lastError?.message);
    throw new Error("Failed to tailor resume — all AI models are currently unavailable. Please try again in a few minutes.");
  }
}

// Factory
export const getLLMProvider = (): LLMProvider => {
  return new GeminiProvider();
};
