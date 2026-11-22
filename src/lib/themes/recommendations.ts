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
    const pType = (profileType || "").toLowerCase();
    const skillsStr = (params.skills || []).join(" ").toLowerCase();

    if (pType === "tech" || pType.includes("dev") || pType.includes("software")) {
      if (skillsStr.includes("pytorch") || skillsStr.includes("cuda") || skillsStr.includes("ai") || skillsStr.includes("llm")) {
        // AI / ML Engineer
        if (theme.id === "developer-terminal") {
          score += 50;
          reason = "Interactive terminal with CUDA/PyTorch telemetry and model deployment logs.";
        } else if (theme.id === "sudarvel") {
          score += 45;
          reason = "Obsidian dark canvas with sub-12ms inference telemetry and research metrics.";
        }
      } else {
        // Full-Stack / Systems Developer
        if (theme.id === "sudarvel" || theme.id === "wall-showcase") {
          score += 48;
          reason = "Tactical dark case studies with clinical latency benchmarks and high-throughput telemetry inspired by Sudarvel K.";
        } else if (theme.id === "developer-terminal") {
          score += 44;
          reason = "Interactive developer terminal with live commands, categorized stack, and GitHub pipeline metrics.";
        } else if (theme.id === "rolan-gomes") {
          score += 35;
          reason = "Architect cutting mat with physical paper sheet and accredited credentials shelf.";
        }
      }
    } else if (pType === "designer" || pType.includes("ux") || pType.includes("product")) {
      if (theme.id === "tanuja-design") {
        score += 48;
        reason = "High-clarity enterprise product canvas, AI workflows, and structured problem-solution drawers inspired by Tanuja (Microsoft).";
      } else if (theme.id === "rolan-gomes" || theme.id === "craft-desk") {
        score += 45;
        reason = "Award-winning physical cutting mat with sticky notes and design system tokens inspired by Rolan Gomes.";
      } else if (theme.id === "minimal-editorial") {
        score += 38;
        reason = "Quiet luxury editorial layout with refined typography and generous whitespace.";
      }
    } else if (pType === "creative" || pType === "other" || pType.includes("graphic") || pType.includes("brand") || pType.includes("art")) {
      if (theme.id === "himanshu-singh") {
        score += 48;
        reason = "Deep forest studio board, storyboard arcs, and visual storytelling cards inspired by Himanshu Singh.";
      } else if (theme.id === "bold-poster") {
        score += 44;
        reason = "Oversized Swiss typography and brutalist high-contrast grid for maximum creative visual impact.";
      } else if (theme.id === "luxe-creative") {
        score += 40;
        reason = "High-fashion luxury studio layout with asymmetrical grids and motion styling.";
      }
    } else if (pType === "student" || pType === "fresher" || params.targetGoal === "internship" || params.targetGoal === "studies") {
      if (theme.id === "not-your-college") {
        score += 50;
        reason = "High-energy ambitious breakout portfolio highlighting verified education, honors, hackathons, and projects.";
      } else if (theme.id === "developer-terminal") {
        score += 42;
        reason = "Demonstrates hands-on engineering rigor and command-line craftsmanship to technical recruiters.";
      } else if (theme.id === "minimal-editorial") {
        score += 38;
        reason = "Clean academic prestige with elegant typography and distinguished honors showcase.";
      }
    } else if (pType === "bba" || pType.includes("business") || pType.includes("pm")) {
      if (theme.id === "corporate-clean") {
        score += 48;
        reason = "Structured executive enterprise dossier with clean problem-solution metrics and institutional clarity.";
      } else if (theme.id === "tanuja-design") {
        score += 42;
        reason = "Executive product metrics with structured user journeys and business outcomes.";
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
