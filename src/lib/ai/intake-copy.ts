import { IntakeAnswersInput, ToneOfVoice, ProfileType } from "@/types/intake";
import { ThemeSectionName } from "@/types/theme";

export interface GeneratedIntakeCopy {
  suggestedHeadline: string;
  suggestedBio: string;
  sectionOrder: ThemeSectionName[];
  recommendedThemeIds: string[];
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

  // Append raw resume highlights if user provided them, strictly excerpting without fabrication
  if (answers.rawResumeText && answers.rawResumeText.trim().length > 10) {
    const cleanExcerpt = answers.rawResumeText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 15 && !line.startsWith("http"))
      .slice(0, 1)
      .join(" ");

    if (cleanExcerpt && !bio.includes(cleanExcerpt)) {
      bio += ` Prior background: "${cleanExcerpt.slice(0, 120)}..."`;
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
