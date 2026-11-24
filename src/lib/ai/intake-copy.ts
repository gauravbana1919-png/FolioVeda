import { IntakeAnswersInput, ToneOfVoice, ProfileType } from "@/types/intake";
import { ThemeSectionName } from "@/types/theme";
import { GoogleGenAI } from "@google/genai";

export interface GeneratedIntakeCopy {
  suggestedHeadline: string;
  suggestedBio: string;
  sectionOrder: ThemeSectionName[];
  recommendedThemeIds: string[];
  recommendedFontFamily?: string;
  recommendedAccent?: string;
  factualAnchors: string[];
}

/**
 * Computes optimal section order based on candidate profile type.
 * e.g., Projects first for developers, Case Studies/Projects first for designers, Experience first for Business.
 */
export function computeSectionOrder(profileType: ProfileType, targetGoal?: string): ThemeSectionName[] {
  if (targetGoal === "internship" || targetGoal === "studies") {
    return ["hero", "projects", "education", "skills", "experience", "contact"];
  }

  switch (profileType) {
    case "tech":
      return ["hero", "projects", "skills", "experience", "education", "contact"];
    case "designer":
      return ["hero", "projects", "experience", "skills", "education", "contact"];
    case "bba":
      return ["hero", "experience", "projects", "skills", "education", "contact"];
    case "other":
    default:
      return ["hero", "projects", "experience", "skills", "education", "contact"];
  }
}

/**
 * Generates factual headline and bio strictly anchored to user-provided input.
 * HARD RULE: Never hallucinates companies, years, metrics, or unmentioned skills.
 */
export function generateIntakeCopy(
  answers: IntakeAnswersInput,
  userName = "Alex Developer"
): GeneratedIntakeCopy {
  const primaryRole = answers.targetRoles[0] || "Software Professional";
  const allRoles = answers.targetRoles.slice(0, 2).join(" & ");
  const strengths = answers.topStrengths.filter(Boolean);
  const strengthsList = strengths.length > 0 ? strengths.join(", ") : "Modern Systems";

  let headline = "";
  let bio = "";

  // 1. Headline generation by tone
  switch (answers.tone) {
    case "formal":
      headline = `${primaryRole} | Specializing in ${strengths.slice(0, 2).join(" & ")}`;
      break;
    case "bold":
      headline = `Building High-Impact ${primaryRole} Solutions. Powered by ${strengths[0] || "Craft"}.`;
      break;
    case "friendly":
    default:
      headline = `${primaryRole} passionate about ${strengths.slice(0, 2).join(" and ")}`;
      break;
  }

  // 2. Bio generation by tone strictly anchored to user facts
  const goalStatement =
    answers.targetGoal === "internship"
      ? "Seeking high-impact internship opportunities to contribute from day one."
      : answers.targetGoal === "job"
      ? "Focused on full-time engineering and product challenges where code craftsmanship matters."
      : answers.targetGoal === "freelance"
      ? "Available for select contract architecture and client projects."
      : "Preparing for advanced academic and research programs.";

  if (answers.tone === "formal") {
    bio = `Experienced ${allRoles} with verified core competencies in ${strengthsList}. Dedicated to delivering reliable architectures, maintainable code, and measurable results. ${goalStatement}`;
  } else if (answers.tone === "bold") {
    bio = `I turn complex challenges into clean, resilient software. My core leverage is in ${strengthsList}. ${goalStatement} Let’s build something extraordinary.`;
  } else {
    // friendly
    bio = `Hi, I’m ${userName}! I focus on ${allRoles}, blending deep curiosity with practical execution in ${strengthsList}. ${goalStatement} Always happy to connect and collaborate.`;
  }

  // If user provided a genuine summary, weave it cleanly
  if (answers.rawResumeText && answers.rawResumeText.trim().length > 10) {
    const summaryMatch = answers.rawResumeText.match(/(?:summary|about|profile)[\s:]+([^\n]+)/i);
    if (summaryMatch?.[1] && summaryMatch[1].trim().length > 20) {
      bio = `${summaryMatch[1].trim()} ${goalStatement}`;
    }
  }

  // 3. Recommended Theme IDs based on profile type and specific skills/roles
  let recommendedThemeIds: string[] = [];
  const lowerRoles = answers.targetRoles.map(r => r.toLowerCase()).join(" ");
  const lowerStrengths = answers.topStrengths.map(s => s.toLowerCase()).join(" ");

  if (answers.targetGoal === "internship" || answers.targetGoal === "studies" || lowerRoles.includes("student") || lowerRoles.includes("intern")) {
    recommendedThemeIds = ["not-your-college", "developer-terminal", "minimal-editorial", "sudarvel"];
  } else if (lowerRoles.includes("ai") || lowerRoles.includes("ml") || lowerStrengths.includes("pytorch") || lowerStrengths.includes("cuda")) {
    recommendedThemeIds = ["developer-terminal", "sudarvel", "bold-poster", "tanuja-design"];
  } else if (answers.profileType === "tech") {
    recommendedThemeIds = ["sudarvel", "developer-terminal", "rolan-gomes", "corporate-clean"];
  } else if (answers.profileType === "designer") {
    recommendedThemeIds = ["tanuja-design", "rolan-gomes", "minimal-editorial", "himanshu-singh"];
  } else if (answers.profileType === "bba" || lowerRoles.includes("product manager") || lowerRoles.includes("pm")) {
    recommendedThemeIds = ["corporate-clean", "tanuja-design", "minimal-editorial", "sudarvel"];
  } else {
    // Creative / Graphic / Brand
    recommendedThemeIds = ["himanshu-singh", "bold-poster", "luxe-creative", "rolan-gomes"];
  }

  return {
    suggestedHeadline: headline,
    suggestedBio: bio,
    sectionOrder: computeSectionOrder(answers.profileType, answers.targetGoal),
    recommendedThemeIds,
    factualAnchors: [...answers.targetRoles, ...answers.topStrengths],
  };
}

/**
 * Intelligent AI synthesis using Google Gemini.
 * Elevates the candidate's authentic experience into a compelling, award-winning portfolio
 * without hallucinating fake companies or credentials.
 */
export async function generateIntakeCopyWithAI(
  answers: IntakeAnswersInput,
  userName = "Alex Developer"
): Promise<GeneratedIntakeCopy> {
  const fallback = generateIntakeCopy(answers, userName);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.length < 20 || apiKey.includes("dummy")) {
    return fallback;
  }

  const prompt = `
    You are an elite executive portfolio creative director and career architect for FolioIn.
    Your mission: Transform this candidate's authentic career background into an award-winning, recruiter-grade portfolio narrative.

    HARD RULES:
    1. ZERO HALLUCINATION: Never invent companies, degrees, unmentioned credentials, or ungrounded metrics.
    2. HIGH CRAFT: Do NOT copy-paste raw text or write robotic generic phrases. Craft punchy, outcome-focused, magnetic copy.
    3. HEADLINE: Create a high-impact, magnetic 1-line professional title positioning them at the peak of their craft.
    4. BIO: Write a captivating 2-3 sentence narrative bio highlighting their genuine strengths, architectural philosophy, and trajectory.
    5. THEME ARCHETYPE & TYPOGRAPHY:
       - Systems / Backend / Full-Stack / DevOps -> Themes: ["sudarvel", "developer-terminal", "minimal-editorial"], Font: "sans" or "mono", Accent: "emerald" or "blue"
       - Frontend / UI/UX / Creative Developer / Designer -> Themes: ["rolan-gomes", "tanuja-design", "himanshu-singh"], Font: "editorial" or "sans", Accent: "amber" or "rose"
       - Product Manager / Founder / Growth Lead -> Themes: ["corporate-clean", "tanuja-design", "luxe-creative"], Font: "sans" or "serif", Accent: "blue" or "purple"
       - Brand / Creative Director / Agency -> Themes: ["bold-poster", "luxe-creative", "himanshu-singh"], Font: "serif", Accent: "amber"

    Candidate Details:
    - Name: ${userName}
    - Profile Type: ${answers.profileType}
    - Target Roles: ${answers.targetRoles.join(", ")}
    - Core Strengths / Skills: ${answers.topStrengths.join(", ")}
    - Target Goal: ${answers.targetGoal}
    - Tone: ${answers.tone}
    ${answers.rawResumeText ? `- Resume Background / Notes: ${answers.rawResumeText.slice(0, 3000)}` : ""}

    Return strict JSON with these fields:
    {
      "suggestedHeadline": "High-impact magnetic headline",
      "suggestedBio": "Compelling narrative bio in authentic voice",
      "recommendedThemeIds": ["theme1", "theme2", "theme3"],
      "recommendedFontFamily": "sans" | "serif" | "mono" | "editorial",
      "recommendedAccent": "emerald" | "blue" | "purple" | "amber" | "rose"
    }
  `;

  const models = ["gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-3.8-flash"];
  const ai = new GoogleGenAI({ apiKey });

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.suggestedHeadline && parsed.suggestedBio) {
          return {
            suggestedHeadline: parsed.suggestedHeadline,
            suggestedBio: parsed.suggestedBio,
            sectionOrder: computeSectionOrder(answers.profileType, answers.targetGoal),
            recommendedThemeIds: Array.isArray(parsed.recommendedThemeIds) && parsed.recommendedThemeIds.length > 0
              ? parsed.recommendedThemeIds
              : fallback.recommendedThemeIds,
            recommendedFontFamily: parsed.recommendedFontFamily || "sans",
            recommendedAccent: parsed.recommendedAccent || "emerald",
            factualAnchors: [...answers.targetRoles, ...answers.topStrengths],
          };
        }
      }
    } catch (e: any) {
      console.warn(`[Intake AI] Model ${model} failed, trying next:`, e.message);
    }
  }

  return fallback;
}

/**
 * Validates zero-hallucination compliance.
 * Throws or returns false if words claiming unverified companies or claims appear.
 */
export function verifyZeroHallucination(
  generatedBio: string,
  allowedAnchors: string[]
): { isCompliant: boolean; flaggedHallucinations: string[] } {
  // Prohibited unverified exaggeration tokens that must NEVER appear unless user supplied them
  const suspiciousTokens = [
    "fortune 500",
    "ex-faang",
    "award-winning",
    "10x engineer",
    "world-class",
    "billion-dollar",
  ];

  const lowerBio = generatedBio.toLowerCase();
  const lowerAllowed = allowedAnchors.map((a) => a.toLowerCase());

  const flagged: string[] = [];
  for (const token of suspiciousTokens) {
    if (lowerBio.includes(token) && !lowerAllowed.some((a) => a.includes(token))) {
      flagged.push(token);
    }
  }

  return {
    isCompliant: flagged.length === 0,
    flaggedHallucinations: flagged,
  };
}
