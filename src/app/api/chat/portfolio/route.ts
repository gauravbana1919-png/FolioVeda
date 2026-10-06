import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'mock' });

export async function POST(req: Request) {
  try {
    const { message, currentProfile } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock') {
      // Mock mode
      return NextResponse.json({
        reply: "I am in mock mode! You said: " + message,
        updates: { bio: "Mocked bio update: " + message }
      });
    }

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        reply: {
          type: Type.STRING,
          description: "A friendly response to the user explaining what you did."
        },
        updates: {
          type: Type.OBJECT,
          description: "The fields to update in the user's profile.",
          properties: {
            bio: { type: Type.STRING },
            skills: { type: Type.STRING }
          }
        }
      },
      required: ["reply", "updates"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are a helpful AI assistant managing a user's portfolio website.
Current Profile State: ${JSON.stringify(currentProfile)}

The user sent you this message: "${message}"

Figure out what the user wants to update (bio, skills, etc.) and return the new values. If they ask to update the bio, rewrite it professionally based on their request.
` }]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // In a real implementation, we would save these updates to Prisma DB here
    // await prisma.profile.update({ where: { userId }, data: result.updates });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
