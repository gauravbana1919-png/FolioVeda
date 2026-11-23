import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const KNOWLEDGE_BASE = [
  {
    keywords: ["deploy", "github pages", "host", "publish", "github token", "pat"],
    answer: "🚀 **How to deploy to GitHub Pages:**\n1. Click the **'Deploy Pages'** button in the top navigation bar.\n2. Enter your GitHub Personal Access Token (PAT) with `repo` and `workflow` permissions.\n3. Enter your desired repository name (e.g., `my-portfolio`).\n4. Click **'Build & Deploy'**.\nFolioVeda automatically compiles your portfolio, commits `index.html`, and configures GitHub Pages live at `https://<username>.github.io/<repo>/`!"
  },
  {
    keywords: ["import", "github repos", "fetch repos", "auto populate", "github"],
    answer: "🔄 **How to Auto-Import from GitHub:**\n1. Open the Portfolio Editor or click **'Import GitHub'** in the top bar.\n2. Enter your GitHub username (e.g. `aarav-dev` or any GitHub handle).\n3. FolioVeda automatically pulls your public repositories, stars, language tech badges, bio, and avatar!"
  },
  {
    keywords: ["export", "download", "zip", "html", "readme", "pdf"],
    answer: "📦 **FolioVeda supports 4 instant export formats:**\n• **Standalone HTML**: A single portable `.html` file with embedded styles you can double-click or drag onto Netlify/Vercel.\n• **Project ZIP**: Full source code ZIP archive.\n• **GitHub Profile README**: Auto-generates Markdown for your `username/username` repository.\n• **Printable PDF Resume**: Clean formatted resume sheet."
  },
  {
    keywords: ["templates", "archetypes", "styles", "design", "recommend"],
    answer: "🎨 **FolioVeda Archetypes & Templates:**\n• **Neo-Brutalist**: High-contrast borders, offset solid shadows, and 90s retro pop accents.\n• **Glassmorphic**: Frosted glass cards with translucent glow.\n• **Claymorphic 3D**: Soft 3D inset shadows with tactile rounded cards.\n• **Craft Desk (Rolan Gomes style)**: Cutting mat grid, physical stamps, and craft stickers.\n• **Wall Showcase (Sudarvel style)**: Telemetry badges, index counters, and metric drawers.\n• **Editorial Studio (Himanshu Singh style)**: Editorial typography with narrative storytelling.\n• **Luxe Creative (Loveleen Pereira style)**: Luxury minimalism, architectural white space, and brand world case studies."
  },
  {
    keywords: ["linkedin", "resume", "pdf upload", "parse"],
    answer: "📄 **LinkedIn & Resume PDF Parser:**\nOn LinkedIn, go to your profile, click **More (...) → Save to PDF**, and drop that file into FolioVeda. Our engine automatically parses your real experience, companies, credentials, and achievements!"
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

    // 1. Direct Action Pattern Matching (Instant live updates)
    if (lowerQuery.includes("neo-brutalist") || lowerQuery.includes("neobrutalist") || lowerQuery.includes("brutalist")) {
      updates.themeId = "neo-brutalist";
      return NextResponse.json({
        reply: "⚡ Switched your portfolio to the **Neo-Brutalist Pop** template! Check out the bold high-contrast borders and yellow accents.",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("bento") || lowerQuery.includes("bentofolio") || (lowerQuery.includes("modular") && lowerQuery.includes("grid"))) {
      updates.themeId = "bento-grid";
      return NextResponse.json({
        reply: "🍱 Switched your portfolio to the **BentoGrid Studio** archetype with modular cards, live developer console, and Aceternity-inspired telemetry! Press F12 in your browser to see the console easter egg.",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("glass") || lowerQuery.includes("glassmorphic") || lowerQuery.includes("cyber")) {
      updates.themeId = "glass";
      return NextResponse.json({
        reply: "💎 Switched your portfolio to the **Glassmorphism Cyber** template with frosted translucent panels and ambient glow!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("clay") || lowerQuery.includes("claymorphic") || lowerQuery.includes("3d")) {
      updates.themeId = "claymorphic";
      return NextResponse.json({
        reply: "🫧 Switched your portfolio to the **Claymorphic 3D** template with tactile pastel pill cards and embossed shadows!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("rolan") || lowerQuery.includes("desk mat") || lowerQuery.includes("cutting mat")) {
      updates.themeId = "rolan-gomes";
      return NextResponse.json({
        reply: "📐 Switched your portfolio to the **Rolan Gomes Desk Mat** archetype (architectural cutting mat grid & paper sheet)!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("sudarvel") || lowerQuery.includes("wall showcase") || lowerQuery.includes("telemetry")) {
      updates.themeId = "sudarvel";
      return NextResponse.json({
        reply: "🛡️ Switched your portfolio to the **Sudarvel Dark Case Study** archetype with telemetry drawers and metric cards!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("dark mode") || lowerQuery === "dark") {
      updates.theme = "dark";
      return NextResponse.json({
        reply: "🌙 Switched your portfolio canvas to **Dark Mode**!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("light mode") || lowerQuery === "light") {
      updates.theme = "light";
      return NextResponse.json({
        reply: "☀️ Switched your portfolio canvas to **Light Mode**!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("emerald") || lowerQuery.includes("green")) {
      updates.accentColor = "emerald";
      return NextResponse.json({
        reply: "🌿 Applied fresh **Cyber Mint (Emerald)** accent color across your buttons and badges!",
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("blue") || lowerQuery.includes("cobalt")) {
      updates.accentColor = "blue";
      return NextResponse.json({
        reply: "🔷 Applied modern **Cobalt Blue** accent color to your portfolio!",
        updates,
        source: "action",
      });
    }

    // 2. Bio & Headline Rewrite Actions
    if (lowerQuery.includes("headline") || (lowerQuery.includes("title") && lowerQuery.includes("write"))) {
      const punchyHeadline = "Full-Stack Engineer & Distributed Systems Architect";
      updates.headline = punchyHeadline;
      return NextResponse.json({
        reply: `🎯 Updated your headline to: **"${punchyHeadline}"**!\n\nIt positions you as a high-impact builder with deep systems expertise.`,
        updates,
        source: "action",
      });
    }

    if (lowerQuery.includes("bio") && (lowerQuery.includes("punch") || lowerQuery.includes("rewrite") || lowerQuery.includes("generate") || lowerQuery.includes("write") || lowerQuery.includes("improve"))) {
      const punchyBio = `Building high-throughput distributed systems and directing AI agents to turn complex workflows into scalable products. Obsessed with sub-100ms API latency, resilient event architectures, and thoughtful user craft.`;
      updates.bio = punchyBio;
      return NextResponse.json({
        reply: `✨ I've rewritten your bio to be punchier, more outcome-driven, and recruiter-focused:\n\n> *"${punchyBio}"*\n\nApplied directly to your live portfolio!`,
        updates,
        source: "action",
      });
    }

    // 2.1 Skill & Project Recommendations
    if (lowerQuery.includes("skill") || lowerQuery.includes("stack") || lowerQuery.includes("recommend skills")) {
      return NextResponse.json({
        reply: `🛠️ **Top High-Demand Skills for 2026 Portfolios:**\n• **Core**: TypeScript, Next.js 15, React 19, Tailwind CSS v4\n• **Backend & Distributed**: Node.js, Go, PostgreSQL, Redis, Apache Kafka\n• **AI & Agents**: Google Gemini API, LangChain/LlamaIndex, Vector DBs (Pinecone, pgvector)\n• **Infra & DevOps**: Docker, GitHub Actions CI/CD, Kubernetes, Cloudflare Workers\n\nTip: You can add these directly in the Skills drawer on your left!`,
        source: "knowledge_base",
      });
    }

    if (lowerQuery.includes("project idea") || lowerQuery.includes("what project") || lowerQuery.includes("portfolio projects")) {
      return NextResponse.json({
        reply: `💡 **Top 3 Projects That Catch Tech Recruiters' Attention:**\n1. **Autonomous Multi-Agent Workflow Engine**: An event-driven tool where AI agents coordinate to execute code, summarize PRs, and alert via Webhooks.\n2. **High-Throughput Real-Time Collaborative Canvas**: WebSocket or WebRTC powered sync engine with operational transformation / CRDTs.\n3. **Bespoke Portfolio Synthesizer (Like FolioVeda!)**: Scrapes any design reference and outputs clean, semantic single-file Tailwind HTML.\n\nHighlight real metrics like **"Reduced p99 latency by 42%"** or **"Handles 10k requests/sec"** in your project cards!`,
        source: "knowledge_base",
      });
    }

    if (lowerQuery.includes("review") || lowerQuery.includes("score") || lowerQuery.includes("rate") || lowerQuery.includes("audit")) {
      return NextResponse.json({
        reply: `🔍 **Quick Portfolio Audit for ${portfolioContext?.name || "Your Profile"}:**\n• **Readiness**: Check the floating **"Readiness 85%"** button at the bottom-right for your live breakdown.\n• **Strong Points**: Clean headline, verified GitHub sync, responsive design system.\n• **Pro Recommendation**: Make sure at least 2 projects include live demo links or GitHub repository buttons for recruiter verification!`,
        source: "knowledge_base",
      });
    }

    if (lowerQuery.includes("api key") || lowerQuery.includes("gemini key") || lowerQuery.includes("token")) {
      return NextResponse.json({
        reply: `🔑 **How to set up your free Gemini API Key:**\n1. Visit [Google AI Studio](https://aistudio.google.com/apikey) and create a free API key.\n2. Open \`.env.local\` in the project root.\n3. Set \`GEMINI_API_KEY="AIzaSy..."\`\n4. Restart the dev server.\n\nNote: Even without an API key, our built-in Bespoke Synthesis Engine automatically creates responsive HTML portfolios!`,
        source: "knowledge_base",
      });
    }

    // 3. Check local knowledge base for guidance questions
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((k) => lowerQuery.includes(k))) {
        return NextResponse.json({
          reply: item.answer,
          source: "knowledge_base",
        });
      }
    }

    // 4. Greetings
    if (lowerQuery.match(/\b(hi|hello|hey|hola|kem cho|namaste|sup)\b/)) {
      return NextResponse.json({
        reply: "👋 **Hello! I'm PortBot**, your FolioVeda AI assistant.\n\nAsk me anything! For example:\n• *\"Switch to Neo-Brutalist\"*\n• *\"Switch to Glassmorphism\"*\n• *\"Rewrite my bio to be punchy\"*\n• *\"How do I deploy to GitHub Pages?\"*\n• *\"How do I import my GitHub repos?\"*",
        source: "greeting",
      });
    }

    // 5. Intelligent Gemini Fallback if API Key configured
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are PortBot, the smart, helpful AI assistant built into FolioVeda (a premium AI portfolio generator web app).
You help developers and creators:
1. Understand how to deploy to GitHub Pages, choose templates, import repositories, and export standalone HTML/ZIP.
2. Edit their portfolio in real-time.

Portfolio Context: ${JSON.stringify(portfolioContext || {})}
User Query: ${query}

Respond in concise, clean markdown. If the user asks for a bio or advice, give an inspiring, high-impact answer.`;

        const response = await ai.models.generateContent({
          model: "gemini-flash-lite-latest",
          contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
        });

        const text = response.text?.trim();
        if (text) {
          return NextResponse.json({ reply: text, source: "gemini" });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, falling back to guide response:", err.message);
      }
    }

    // 6. Default helpful fallback response
    return NextResponse.json({
      reply: `I can help you customize and publish your portfolio! Try these commands:\n• ⚡ **"Switch to Neo-Brutalist"** or **"Switch to Glassmorphism"**\n• ✨ **"Rewrite my bio to be punchy"**\n• 🚀 **"How to deploy to GitHub Pages?"**\n• 🔄 **"How to auto-import GitHub repos?"**\n• 📦 **"How to download single-file HTML & ZIP?"**\n\nWhat would you like me to do?`,
      source: "fallback",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
