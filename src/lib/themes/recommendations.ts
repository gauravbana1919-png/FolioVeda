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
      if (theme.id === "sudarvel" || theme.id === "wall-showcase") {
        score += 45;
        reason = "Tactical dark case studies with clinical latency benchmarks and high-throughput telemetry inspired by Sudarvel K.";
      } else if (theme.id === "rolan-gomes" || theme.id === "craft-desk") {
        score += 35;
        reason = "Architect cutting mat with floating physical paper and verified credentials shelf inspired by Rolan Gomes.";
      } else if (theme.category === "tech") {
        score += 30;
      }
    } else if (profileType === "designer") {
      if (theme.id === "tanuja-design") {
        score += 45;
        reason = "High-clarity enterprise product canvas, AI workflows, and structured case studies inspired by Tanuja (Microsoft).";
      } else if (theme.id === "rolan-gomes" || theme.id === "craft-desk") {
        score += 42;
        reason = "Award-winning physical cutting mat with sticky notes and design system tokens inspired by Rolan Gomes.";
      } else if (theme.category === "design") {
        score += 30;
      }
    } else if (profileType === "creative" || profileType === "other") {
      if (theme.id === "himanshu-singh") {
        score += 45;
        reason = "Deep forest studio board, storyboard arcs, and visual storytelling cards inspired by Himanshu Singh Chauhan.";
      } else if (theme.category === "creative") {
        score += 35;
      }
    } else if (profileType === "bba") {
      if (theme.id === "tanuja-design") {
        score += 45;
        reason = "Structured executive enterprise dossier with clean problem-solution metrics.";
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
