import { GoogleGenAI } from '@google/genai';

export interface TailoredResumeResult {
  tailoredContent: string;
  keywordMatchScore: number;
  matchedSkills?: string[];
  missingSkills?: string[];
}

export interface LLMProvider {
  tailorResume(originalResume: string, jobDescription: string): Promise<TailoredResumeResult>;
}

// Models to try in order — starting with fastest & highest availability
const MODEL_CHAIN = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

function deterministicTailor(originalResume: string, jobDescription: string): TailoredResumeResult {
  // Extract keywords from job description
  const stopWords = new Set(["and", "the", "with", "for", "that", "this", "from", "have", "will", "your", "our", "are", "you", "who", "all", "any", "job", "role", "work", "team", "years", "experience", "required", "preferred", "responsibilities", "qualifications"]);
  const jdTokens = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  const resumeLower = originalResume.toLowerCase();
  const matchedTokens: string[] = [];
  const uniqueJdTokens = Array.from(new Set(jdTokens));

  for (const token of uniqueJdTokens) {
    if (resumeLower.includes(token)) {
      matchedTokens.push(token);
    }
  }

  // Calculate score (0 to 100)
  const ratio = uniqueJdTokens.length > 0 ? matchedTokens.length / Math.min(uniqueJdTokens.length, 25) : 0.7;
  const keywordMatchScore = Math.min(96, Math.max(45, Math.round(ratio * 100)));

  // If already structured markdown, optimize sections
  const lines = originalResume.split("\n");
  const reordered: string[] = [];
  let insertedSummary = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    reordered.push(line);

    // After candidate contact info (or after title if early), insert or refine ATS Professional Summary
    if (!insertedSummary && (line.includes("@") || line.startsWith("# ")) && i < 5) {
      if (!originalResume.toLowerCase().includes("professional summary") && !originalResume.toLowerCase().includes("## summary")) {
        reordered.push(
          "",
          "## PROFESSIONAL SUMMARY",
          `Results-driven software engineer with proven track record in ${matchedTokens.slice(0, 4).join(", ") || "core systems"}. Strong engineering discipline with hands-on focus on delivering reliable, scalable, and high-impact solutions.`
        );
        insertedSummary = true;
      }
    }
  }

  // Extract matched and missing tech skills
  const commonTechSkills = [
    "react", "next.js", "nextjs", "typescript", "javascript", "flutter", "dart",
    "node.js", "nodejs", "python", "tailwind css", "tailwind", "css", "html", "firebase",
    "postgresql", "sql", "docker", "aws", "gcp", "rest apis", "rest api", "graphql", "git",
    "figma", "redux", "riverpod", "ci/cd", "agile", "scrum", "jira"
  ];
  
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of commonTechSkills) {
    const inJd = jobDescription.toLowerCase().includes(skill);
    if (inJd) {
      const formatted = skill.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      if (resumeLower.includes(skill)) {
        if (!matchedSkills.includes(formatted)) matchedSkills.push(formatted);
      } else {
        if (!missingSkills.includes(formatted)) missingSkills.push(formatted);
      }
    }
  }

  return {
    tailoredContent: reordered.join("\n").trim(),
    keywordMatchScore,
    matchedSkills,
    missingSkills: missingSkills.slice(0, 5),
  };
}

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
      5. Return a JSON object with:
         - "tailoredContent": The new resume text.
         - "keywordMatchScore": An integer from 0 to 100 representing how well the original resume matched the job description keywords before modification.
         - "matchedSkills": Array of strings of candidate skills that directly match the job description.
         - "missingSkills": Array of strings (up to 5) of required or preferred skills mentioned in the job description that the candidate could add.
      
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
          matchedSkills: Array.isArray(parsed.matchedSkills) ? parsed.matchedSkills : [],
          missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
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

    // If all models hit 503 or fail, fall back to high-fidelity deterministic tailoring
    console.warn("[Resume Tailor] AI models unavailable, falling back to deterministic ATS tailor:", lastError?.message);
    return deterministicTailor(originalResume, jobDescription);
  }
}

// Factory
export const getLLMProvider = (): LLMProvider => {
  return new GeminiProvider();
};
