import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface ActionItem {
  label: string;
  url?: string;
  actionType?: "navigate" | "switch_tab" | "copy_text";
  tab?: "learnhouse" | "shivam" | "kenji" | "randy" | "alsa";
  payload?: string;
  primary?: boolean;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["deploy", "github pages", "host", "publish", "github token", "pat"],
    answer: "🚀 **How to deploy to GitHub Pages:**\n1. Click the **'Deploy Pages'** button in the top navigation bar or launch the builder.\n2. Enter your GitHub Personal Access Token (PAT) with `repo` and `workflow` permissions.\n3. Enter your repository name (e.g. `my-portfolio`).\n4. Click **'Build & Deploy'**.\nFolioIn automatically compiles your portfolio, commits `index.html`, and configures GitHub Pages live at `https://<username>.github.io/<repo>/`!",
    actions: [
      { label: "🚀 Open Deployment Hub", url: "/portfolio/preview", primary: true },
      { label: "📄 Read Deployment Guide", url: "/hub" }
    ]
  },
  {
    keywords: ["import", "github repos", "fetch repos", "auto populate", "github"],
    answer: "🔄 **How to Auto-Import from GitHub:**\n1. Open the Portfolio Builder or click **'Import GitHub'**.\n2. Enter your GitHub handle (e.g. `torvalds` or your own username).\n3. FolioIn automatically pulls your public repositories, star counts, primary languages, avatar, and commit activity!",
    actions: [
      { label: "🐙 Auto-Import From GitHub", url: "/onboarding", primary: true },
      { label: "⚡ View Live Preview", url: "/portfolio/preview" }
    ]
  },
  {
    keywords: ["export", "download", "zip", "html", "readme", "pdf"],
    answer: "📦 **FolioIn supports 4 instant export formats:**\n• **Standalone HTML**: A single portable `.html` file with embedded styles you can open offline or drag onto Netlify/Vercel.\n• **Project ZIP**: Full Next.js/Tailwind source code archive.\n• **GitHub Profile README**: Auto-generated Markdown for your `username/username` repository.\n• **Printable ATS PDF Resume**: Machine-parseable PDF resume matching top FlowCV standards.",
    actions: [
      { label: "📥 Export Portfolio (HTML/ZIP)", url: "/portfolio/preview", primary: true },
      { label: "📄 Open Resume PDF Studio", url: "/resume" }
    ]
  },
  {
    keywords: ["templates", "archetypes", "styles", "design", "recommend"],
    answer: "🎨 **FolioIn Curated Archetypes:**\n• **Learn@House**: EdTech & SaaS platform with 5.0-star review proof.\n• **Shivam Kaushal**: Warm cream canvas with tactile 3D burnt-orange clay coils.\n• **Kenji Sato**: Deep ocean cyan with 3D chibi mascot & editorial book covers.\n• **Randy Fahmi**: Vibrant amber ochre with visual photography & 4K cinema tables.\n• **Alsa Yunita**: Pastel lilac & warm peach with TikTok & pitch presentation slides.",
    actions: [
      { label: "🎨 Switch to Shivam (3D Clay)", actionType: "switch_tab", tab: "shivam", primary: true },
      { label: "🎨 Switch to Kenji (3D Mascot)", actionType: "switch_tab", tab: "kenji" },
      { label: "🎨 Switch to Learn@House", actionType: "switch_tab", tab: "learnhouse" },
      { label: "🚀 Start Building Now", url: "/onboarding" }
    ]
  },
  {
    keywords: ["linkedin", "resume", "pdf upload", "parse"],
    answer: "📄 **LinkedIn & Resume PDF Parser:**\nExport your LinkedIn profile to PDF (**More (...) → Save to PDF**) and drop it into FolioIn. Our engine automatically parses your verified experience, roles, credentials, and achievements without hallucinations!",
    actions: [
      { label: "📄 Open 14+ FlowCV Resume Studio", url: "/resume", primary: true },
      { label: "🚀 Build Portfolio from Resume", url: "/onboarding" }
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const { query, portfolioContext } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    const lowerQuery = query.toLowerCase().trim();
    const updates: Record<string, any> = {};
    const actions: ActionItem[] = [];

    // ── 1. PORTFOLIO CREATION & ONBOARDING ACTIONS ──
    if (
      lowerQuery.includes("build") ||
      lowerQuery.includes("create portfolio") ||
      lowerQuery.includes("start portfolio") ||
      lowerQuery.includes("make portfolio") ||
      lowerQuery.includes("new portfolio") ||
      lowerQuery.startsWith("i am a") ||
      lowerQuery.startsWith("i'm a")
    ) {
      // Extract potential name or role
      let targetName = "";
      const forMatch = lowerQuery.match(/(?:for|name is|i am|i'm)\s+([a-zA-Z\s]+)/i);
      if (forMatch && forMatch[1]) {
        targetName = forMatch[1].trim().split(" ")[0];
      }

      const buildUrl = targetName ? `/onboarding?name=${encodeURIComponent(targetName)}` : `/onboarding`;

      return NextResponse.json({
        reply: `🚀 **Ready to build your standout portfolio!**\n\nI've configured your onboarding pipeline with zero hallucinations and real GitHub/resume verification.\n\nClick below to launch the builder with your custom setup:`,
        actions: [
          { label: targetName ? `🚀 Build ${targetName}'s Portfolio →` : "🚀 Launch Portfolio Builder →", url: buildUrl, primary: true },
          { label: "💡 Clone an Inspiration Website", url: "/inspiration" },
          { label: "📄 Open Resume Builder", url: "/resume" },
        ],
        source: "action_builder",
      });
    }

    // ── 2. RESUME TAILORING & FLOWCV TEMPLATES ACTIONS ──
    if (
      lowerQuery.includes("resume") ||
      lowerQuery.includes("cv") ||
      lowerQuery.includes("flowcv") ||
      lowerQuery.includes("job tailor")
    ) {
      return NextResponse.json({
        reply: `📄 **FolioIn 14+ FlowCV Resume Studio & Job Tailor:**\n\nChoose from 14 pixel-perfect ATS templates (Classic Clear, Atlantic Blue, Mercury Flow, Steady Form, Leaves, Executive, Hunter Green, etc.), photo upload studio, and role-based skill targeting!`,
        actions: [
          { label: "📄 Open 14+ FlowCV Resume Studio →", url: "/resume", primary: true },
          { label: "🎯 Tailor for Specific Job Role", url: "/resume#tailor" },
        ],
        source: "action_resume",
      });
    }

    // ── 3. INSPIRATION SITE CLONING ACTIONS ──
    if (
      lowerQuery.includes("inspire") ||
      lowerQuery.includes("inspiration") ||
      lowerQuery.includes("clone") ||
      lowerQuery.includes("wallofportfolios")
    ) {
      return NextResponse.json({
        reply: `💡 **FolioIn Inspiration Site Cloner:**\n\nPaste any portfolio link (e.g. \`wallofportfolios.in/...\` or \`bento.me/...\`), and FolioIn automatically deconstructs its visual aesthetics, color palette, and layout into your personal portfolio!`,
        actions: [
          { label: "💡 Open Inspiration Cloner →", url: "/inspiration", primary: true },
          { label: "🚀 Start Blank Portfolio", url: "/onboarding" },
        ],
        source: "action_inspiration",
      });
    }

    // ── 4. LIVE THEME SWITCHING (Interactive UI Control) ──
    if (lowerQuery.includes("shivam") || lowerQuery.includes("clay") || lowerQuery.includes("3d clay")) {
      updates.themeTab = "shivam";
      updates.themeId = "claymorphic";
      return NextResponse.json({
        reply: "🎨 Switched the live showcase to **Shivam Kaushal 3D Studio**!\n\nFeaturing warm cream canvas, tactile 3D burnt-orange clay coils, and verified student credentials.",
        updates,
        actions: [
          { label: "🚀 Adopt Shivam's Style Free", url: "/onboarding?theme=shivam", primary: true },
          { label: "📄 Explore FlowCV Resumes", url: "/resume" },
        ],
        source: "action_theme",
      });
    }

    if (lowerQuery.includes("kenji") || lowerQuery.includes("chibi") || lowerQuery.includes("mascot") || lowerQuery.includes("illustrator")) {
      updates.themeTab = "kenji";
      updates.themeId = "bento-grid";
      return NextResponse.json({
        reply: "🎨 Switched the live showcase to **Kenji Sato 3D Character Studio**!\n\nFeaturing deep ocean cyan palette, 3D chibi mascot, and editorial book cover mockups.",
        updates,
        actions: [
          { label: "🚀 Adopt Kenji's Style Free", url: "/onboarding?theme=kenji", primary: true },
          { label: "🎨 Switch to Shivam Kaushal", actionType: "switch_tab", tab: "shivam" },
        ],
        source: "action_theme",
      });
    }

    if (lowerQuery.includes("learnhouse") || lowerQuery.includes("learn@house") || lowerQuery.includes("edtech") || lowerQuery.includes("email")) {
      updates.themeTab = "learnhouse";
      updates.themeId = "luxe-creative";
      return NextResponse.json({
        reply: "🎨 Switched the live showcase to **Learn@House Platform**!\n\nFeaturing deep forest teal palette (#113A33), 5.0-star reviews, and interactive course onboarding flow.",
        updates,
        actions: [
          { label: "🚀 Adopt Learn@House Style", url: "/onboarding?theme=learnhouse", primary: true },
          { label: "🎨 Switch to Shivam Kaushal", actionType: "switch_tab", tab: "shivam" },
        ],
        source: "action_theme",
      });
    }

    if (lowerQuery.includes("randy") || lowerQuery.includes("video") || lowerQuery.includes("photo") || lowerQuery.includes("fahmi")) {
      updates.themeTab = "randy";
      updates.themeId = "rolan-gomes";
      return NextResponse.json({
        reply: "🎨 Switched the live showcase to **Randy Fahmi Creative Visual**!\n\nFeaturing vibrant amber ochre (#F2A900), commercial photography, and structured table of content.",
        updates,
        actions: [
          { label: "🚀 Adopt Randy's Style", url: "/onboarding?theme=randy", primary: true },
          { label: "📄 Open Resume Studio", url: "/resume" },
        ],
        source: "action_theme",
      });
    }

    if (lowerQuery.includes("alsa") || lowerQuery.includes("lilac") || lowerQuery.includes("pastel") || lowerQuery.includes("presentation") || lowerQuery.includes("yunita")) {
      updates.themeTab = "alsa";
      updates.themeId = "tanuja-design";
      return NextResponse.json({
        reply: "🎨 Switched the live showcase to **Alsa Yunita Presentation Deck**!\n\nFeaturing pastel lilac, warm peach, sparkle badges, and TikTok presentation slide decks.",
        updates,
        actions: [
          { label: "🚀 Adopt Alsa's Style", url: "/onboarding?theme=alsa", primary: true },
          { label: "🎨 Switch to Shivam Kaushal", actionType: "switch_tab", tab: "shivam" },
        ],
        source: "action_theme",
      });
    }

    // ── 5. BIO & HEADLINE WRITING ──
    if (lowerQuery.includes("bio") && (lowerQuery.includes("punch") || lowerQuery.includes("rewrite") || lowerQuery.includes("generate") || lowerQuery.includes("write") || lowerQuery.includes("improve"))) {
      const punchyBio = `Building high-throughput distributed systems and directing AI agents to turn complex workflows into scalable products. Obsessed with sub-100ms API latency, resilient event architectures, and thoughtful user craft.`;
      updates.bio = punchyBio;
      return NextResponse.json({
        reply: `✨ **Here is a recruiter-grade, high-conversion bio:**\n\n> *"${punchyBio}"*\n\nRecruiters value concrete impact, latency numbers, and clear domain focus. You can adopt this directly in the builder:`,
        updates,
        actions: [
          { label: "🚀 Use This Bio in Builder →", url: `/onboarding?bio=${encodeURIComponent(punchyBio)}`, primary: true },
          { label: "📄 Add to Resume Studio", url: "/resume" },
        ],
        source: "action_bio",
      });
    }

    if (lowerQuery.includes("headline") || (lowerQuery.includes("title") && lowerQuery.includes("write"))) {
      const punchyHeadline = "Full-Stack Engineer & Distributed Systems Architect";
      updates.headline = punchyHeadline;
      return NextResponse.json({
        reply: `🎯 **Recommended High-Impact Headline:**\n\n> **"${punchyHeadline}"**\n\nPositions you immediately as an authoritative builder with deep systems expertise.`,
        updates,
        actions: [
          { label: "🚀 Apply to My Profile →", url: `/onboarding?headline=${encodeURIComponent(punchyHeadline)}`, primary: true },
          { label: "📄 Open Resume Builder", url: "/resume" },
        ],
        source: "action_headline",
      });
    }

    // ── 6. LOCAL KNOWLEDGE BASE MATCHES ──
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((k) => lowerQuery.includes(k))) {
        return NextResponse.json({
          reply: item.answer,
          actions: item.actions || [],
          source: "knowledge_base",
        });
      }
    }

    // ── 7. GREETINGS & WHAT CAN YOU DO ──
    if (lowerQuery.match(/\b(hi|hello|hey|hola|kem cho|namaste|sup|what can you do|who are you|help|tasks|work)\b/)) {
      return NextResponse.json({
        reply: `👋 **Hi! I'm PortBot**, your active AI copilot for FolioIn.\n\nI can execute real tasks right now:\n• **Launch your portfolio**: Just say *"Build portfolio for [Name]"*\n• **Switch live styles**: Say *"Switch to Shivam"* or *"Show Kenji Sato"*\n• **Tailor your resume**: Say *"Tailor my resume"* for 14 FlowCV templates\n• **Clone website designs**: Say *"Clone a portfolio"*\n• **Write punchy bios**: Say *"Rewrite my bio to be punchy"*\n\nTap any action below to start:`,
        actions: [
          { label: "🚀 Launch Portfolio Builder", url: "/onboarding", primary: true },
          { label: "📄 14 FlowCV Resume Templates", url: "/resume" },
          { label: "🎨 Switch to Shivam (3D Clay)", actionType: "switch_tab", tab: "shivam" },
          { label: "💡 Clone Inspiration Site", url: "/inspiration" },
        ],
        source: "greeting",
      });
    }

    // ── 8. GEMINI AI FALLBACK WITH CONTEXT ──
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are PortBot, the smart, helpful AI copilot in FolioIn.
Help the user build, customize, and deploy portfolios and FlowCV resumes.
User Query: ${query}

Respond in concise, crisp markdown and suggest real next actions.`;

        const response = await ai.models.generateContent({
          model: "gemini-flash-lite-latest",
          contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
        });

        const text = response.text?.trim();
        if (text) {
          return NextResponse.json({
            reply: text,
            actions: [
              { label: "🚀 Open Portfolio Builder", url: "/onboarding", primary: true },
              { label: "📄 Open Resume Studio", url: "/resume" },
            ],
            source: "gemini",
          });
        }
      } catch (err: any) {
        console.warn("Gemini call skipped, returning action response:", err.message);
      }
    }

    // ── 9. DEFAULT ACTION RESPONSE ──
    return NextResponse.json({
      reply: `I can help you build, tailor, and publish your dream portfolio or resume right now!\n\nChoose an action below to get started:`,
      actions: [
        { label: "🚀 Build My Portfolio", url: "/onboarding", primary: true },
        { label: "📄 Open Resume Studio", url: "/resume" },
        { label: "🎨 Switch to Shivam 3D Studio", actionType: "switch_tab", tab: "shivam" },
        { label: "💡 Clone Inspiration Site", url: "/inspiration" },
      ],
      source: "fallback",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
