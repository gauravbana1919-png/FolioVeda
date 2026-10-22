import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'mock' });

export async function POST(req: Request) {
  try {
    const { message, currentProfile, templateId } = await req.json();
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Running in unit test or non-request scope
    }

    let resultUpdates: Record<string, any> = {};
    let resultReply = "";

    const isMock = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock';

    if (isMock) {
      // Intelligent fallback for development without API keys
      const lower = (message || "").toLowerCase();

      if (lower.includes("dark")) {
        resultUpdates.theme = "dark";
        resultReply = "I've switched your portfolio theme to dark mode!";
      } else if (lower.includes("light")) {
        resultUpdates.theme = "light";
        resultReply = "I've switched your portfolio theme to light mode!";
      } else if (lower.includes("emerald") || lower.includes("green")) {
        resultUpdates.accentColor = "emerald";
        resultReply = "I've updated your accent color to fresh Emerald green.";
      } else if (lower.includes("purple") || lower.includes("violet")) {
        resultUpdates.accentColor = "purple";
        resultReply = "I've set your accent color to vibrant Purple.";
      } else if (lower.includes("amber") || lower.includes("orange") || lower.includes("yellow")) {
        resultUpdates.accentColor = "amber";
        resultReply = "I've applied a warm Amber accent to your portfolio.";
      } else if (lower.includes("rose") || lower.includes("red") || lower.includes("pink")) {
        resultUpdates.accentColor = "rose";
        resultReply = "I've updated your styling to a bold Rose accent.";
      } else if (lower.includes("blue")) {
        resultUpdates.accentColor = "blue";
        resultReply = "I've set your accent styling to classic modern Blue.";
      } else if (lower.includes("designer")) {
        resultUpdates.templateId = "template2";
        resultReply = "I've changed your layout to Template 2 (Creative Designer)!";
      } else if (lower.includes("business")) {
        resultUpdates.templateId = "template3";
        resultReply = "I've switched your layout to Template 3 (Executive Business)!";
      } else if (lower.includes("dev") || lower.includes("developer")) {
        resultUpdates.templateId = "template1";
        resultReply = "I've switched your layout to Template 1 (Software Engineer)!";
      } else if (lower.includes("bio") || lower.includes("punch")) {
        resultUpdates.bio = "High-impact engineer architecting resilient cloud systems and delightful digital experiences. Obsessed with code quality and lightning-fast load times.";
        resultReply = "I've rewritten your bio to be punchier, more professional, and action-oriented!";
      } else if (lower.includes("skill")) {
        resultUpdates.skills = "TypeScript, React, Next.js, Node.js, GraphQL, PostgreSQL, Tailwind CSS, Docker";
        resultReply = "I've organized and highlighted your core modern technical skills!";
      } else if (lower.includes("name")) {
        const words = message.split(" ");
        const nameIdx = words.findIndex((w: string) => w.toLowerCase() === "to" || w.toLowerCase() === "is");
        const newName = nameIdx !== -1 && words[nameIdx + 1] ? words.slice(nameIdx + 1).join(" ") : "Alex Developer";
        resultUpdates.name = newName;
        resultReply = `Updated your display name to ${newName}!`;
      } else {
        resultUpdates.bio = `Passionate specialist focused on delivery, precision, and craftsmanship. ${message.slice(0, 80)}`;
        resultReply = `Applied your requested adjustment: "${message}". Check out the live preview!`;
      }
    } else {
      // Live Gemini API inference
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          reply: {
            type: Type.STRING,
            description: "A friendly, conversational explanation of what updates were made."
          },
          updates: {
            type: Type.OBJECT,
            description: "The concrete attributes to update in the user's portfolio.",
            properties: {
              name: { type: Type.STRING, description: "Updated display name if requested" },
              bio: { type: Type.STRING, description: "Rewritten bio or summary" },
              skills: { type: Type.STRING, description: "Comma-separated list of skills" },
              theme: { type: Type.STRING, description: "'dark', 'light', or 'system'" },
              accentColor: { type: Type.STRING, description: "'blue', 'purple', 'emerald', 'amber', or 'rose'" },
              templateId: { type: Type.STRING, description: "'template1', 'template2', or 'template3'" }
            }
          }
        },
        required: ["reply", "updates"]
      };

      const systemPrompt = `You are an expert AI Portfolio Designer and Copywriter for FolioVeda.
You help developers and creators customize their portfolio websites in real-time.

HARD RULE: You must NEVER invent, assume, or hallucinate past companies, university degrees, dates, employment history, metrics, or factual work experience that the user did not explicitly provide.
You may only:
1. Rephrase, polish, and tone-shift existing content (e.g. punchy, concise, executive).
2. Adjust design properties: theme ('dark', 'light'), accentColor ('blue', 'purple', 'emerald', 'amber', 'rose'), templateId ('template1', 'template2', 'template3').
3. Add skills only if requested by the user.

Current State:
${JSON.stringify({ profile: currentProfile, templateId })}

User request: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.6,
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      resultReply = parsed.reply || "Updated your portfolio!";
      resultUpdates = parsed.updates || {};
    }

    // Persist to Prisma Database if authenticated
    if (session?.user?.email && Object.keys(resultUpdates).length > 0) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          if (resultUpdates.name) {
            await prisma.user.update({
              where: { id: user.id },
              data: { name: resultUpdates.name }
            });
          }

          if (resultUpdates.bio || resultUpdates.skills) {
            await prisma.profile.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                bio: resultUpdates.bio || null,
                skills: resultUpdates.skills || null,
              },
              update: {
                ...(resultUpdates.bio && { bio: resultUpdates.bio }),
                ...(resultUpdates.skills && { skills: resultUpdates.skills }),
              }
            });
          }

          if (resultUpdates.templateId || resultUpdates.theme || resultUpdates.accentColor) {
            await prisma.portfolio.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                templateId: resultUpdates.templateId || templateId || "template1",
                theme: resultUpdates.theme || "system",
                designPrefs: JSON.stringify({ accentColor: resultUpdates.accentColor || "blue" }),
              },
              update: {
                ...(resultUpdates.templateId && { templateId: resultUpdates.templateId }),
                ...(resultUpdates.theme && { theme: resultUpdates.theme }),
                ...(resultUpdates.accentColor && {
                  designPrefs: JSON.stringify({ accentColor: resultUpdates.accentColor }),
                }),
              }
            });
          }
        }
      } catch (dbErr) {
        console.warn("DB auto-save warning in chat endpoint:", dbErr);
      }
    }

    return NextResponse.json({
      reply: resultReply,
      updates: resultUpdates,
      persisted: !!session?.user?.email,
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing AI chat' }, { status: 500 });
  }
}
