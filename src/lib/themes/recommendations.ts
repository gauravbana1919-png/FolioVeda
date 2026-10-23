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

    // Match Category to Profile Type
    if (profileType === "tech") {
      if (theme.category === "tech") {
        score += 40;
        reason = "Engineered specifically for developers with terminal syntax, CLI prompts, and Git logs.";
      } else if (theme.category === "creative") {
        score += 20;
        reason = "High-energy presentation that highlights engineering impact and systems metrics.";
      }
    } else if (profileType === "designer") {
      if (theme.category === "design") {
        score += 40;
        reason = "Serif typography, generous negative space, and curated magazine-grade case studies.";
      } else if (theme.category === "creative") {
        score += 25;
        reason = "Bold visual punch ideal for high-contrast branding and product showcases.";
      }
    } else if (profileType === "bba" || profileType === "other") {
      if (theme.mood === "formal" || theme.category === "design") {
        score += 35;
        reason = "Refined and structured layout tailored for leadership, analytics, and project deliverables.";
      }
    }

    // Match Mood
    if (preferredMood && theme.mood === preferredMood) {
      score += 15;
    }

    // Goal Match
    if (params.targetGoal === "internships" || params.targetGoal === "fulltime") {
      if (theme.id === "developer-terminal" && profileType === "tech") {
        score += 10;
        reason += " Proven to capture technical recruiters' attention in under 30 seconds.";
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
