import { ThemePackage } from "@/types/theme";
import { ProfileType, TargetGoal } from "@/types/intake";
import { getAllSystemThemes } from "./registry";

export interface ThemeRecommendation {
  theme: ThemePackage;
  score: number;
  reason: string;
  isTopPick: boolean;
}

export interface RecommendationParams {
  profileType?: ProfileType | string;
  targetGoal?: TargetGoal | string;
  mood?: string;
  skills?: string[];
}

export function getThemeRecommendations(
  params: RecommendationParams
): ThemeRecommendation[] {
  const allThemes = getAllSystemThemes();
  const profileType = params.profileType || "tech";
  const preferredMood = params.mood;

  const scored = allThemes.map((theme) => {
    let score = 50; // baseline score
    let reason = "Well-balanced portfolio suitable for broad professional visibility.";

    // Specific Top Theme Boosts
    if (profileType === "tech") {
      if (theme.id === "developer-terminal") {
        score += 45;
        reason = "Engineered specifically for technical roles with CLI prompts, bash window chrome, and Git commit logs.";
      } else if (theme.id === "dark-showcase") {
        score += 40;
        reason = "High-tech obsidian and cyan glow showcasing deep systems architecture and live units.";
      } else if (theme.category === "tech") {
        score += 30;
      }
    } else if (profileType === "designer") {
      if (theme.id === "minimal-editorial") {
        score += 45;
        reason = "Serif typography, generous negative space, and curated magazine-grade case studies.";
      } else if (theme.id === "case-study-heavy") {
        score += 40;
        reason = "Comprehensive architectural narrative breaking down problem, solution, and impact metrics.";
      } else if (theme.category === "design") {
        score += 30;
      }
    } else if (profileType === "bba") {
      if (theme.id === "corporate-clean") {
        score += 45;
        reason = "Structured executive dossier with clean typography, KPI metrics, and career timeline clarity.";
      } else if (theme.category === "business") {
        score += 35;
      }
    } else if (profileType === "other") {
      if (theme.id === "playful-sticker" || theme.id === "creative-collage") {
        score += 40;
        reason = "Warm, approachable, and expressive layout designed for creative makers and consultants.";
      }
    }

    // Match Mood
    if (preferredMood && theme.mood === preferredMood) {
      score += 15;
    }

    // Goal Match
    if (params.targetGoal === "internships" || params.targetGoal === "fulltime" || params.targetGoal === "job") {
      if (theme.id === "developer-terminal" && profileType === "tech") {
        score += 10;
        reason += " Proven to capture technical recruiters' attention in under 30 seconds.";
      } else if (theme.id === "corporate-clean" && profileType === "bba") {
        score += 10;
        reason += " Optimized for corporate recruiters and institutional hiring managers.";
      }
    }

    return {
      theme,
      score,
      reason,
      isTopPick: false,
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Mark top pick
  if (scored.length > 0) {
    scored[0].isTopPick = true;
  }

  return scored;
}
