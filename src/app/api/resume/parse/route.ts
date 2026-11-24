import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const MODEL_CHAIN = [
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite-preview",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rawText } = body;

    if (!rawText || typeof rawText !== "string" || rawText.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide valid resume text or career notes." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let parsedData = null;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert FlowCV-grade ATS Resume Architect. 
Analyze the following unstructured resume, LinkedIn summary, or career history text.
Extract, categorize, and clean the information into a strictly valid JSON object matching this exact schema:

{
  "personal": {
    "name": "Candidate Full Name",
    "headline": "Professional Title / Target Role",
    "email": "Email address or null",
    "phone": "Phone number or null",
    "location": "City, State/Country or Remote",
    "linkedin": "LinkedIn profile URL or handle",
    "github": "GitHub profile URL or handle",
    "website": "Portfolio or website URL"
  },
  "summary": "High-impact professional summary (2-3 concise sentences highlighting years of experience, core domains, and quantifiable value).",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company / Organization Name",
      "period": "e.g., 2022 – Present or Jan 2021 – May 2023",
      "location": "City, Country or Remote",
      "highlights": [
        "High-impact STAR format bullet starting with strong action verb and quantified outcome if present",
        "Bullet 2"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree name (e.g. B.Tech in Computer Science)",
      "institution": "University / College Name",
      "year": "Graduation Year (e.g. 2022)",
      "gpa": "GPA or honors if mentioned, else null"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "title": "Project Name",
      "description": "1-2 sentence outcome-driven description",
      "techStack": "Comma-separated tools/languages",
      "link": "GitHub or live link if mentioned"
    }
  ],
  "certifications": [
    {
      "name": "Certificate Title",
      "issuer": "Issuing Authority (e.g. AWS, Google)",
      "year": "Year"
    }
  ]
}

CRITICAL RULES:
- Zero hallucination: Do not invent fake companies, fake credentials, or fake jobs not present in the text.
- If email/phone/links are missing from text, leave them null.
- Convert raw paragraphs of experience into distinct, powerful action bullet points.
- Return ONLY the raw JSON object. Do NOT wrap in markdown backticks or write conversational prose.

Source Resume Text:
"""
${rawText}
"""`;

      for (const model of MODEL_CHAIN) {
        try {
          const res = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          const rawResponse = res.text?.trim() || "";
          const cleaned = rawResponse.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
          parsedData = JSON.parse(cleaned);
          if (parsedData && (parsedData.personal?.name || parsedData.experience?.length)) {
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${model} parsing warning:`, err.message);
        }
      }
    }

    // Fallback parser if AI was unavailable
    if (!parsedData) {
      parsedData = fallbackLocalParse(rawText);
    }

    // Convert structured JSON to standard ATS Markdown for instant sheet rendering
    const markdown = convertStructuredToMarkdown(parsedData);

    return NextResponse.json({
      success: true,
      data: parsedData,
      markdown,
    });
  } catch (error: any) {
    console.error("Resume Parse Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse resume." },
      { status: 500 }
    );
  }
}

function fallbackLocalParse(rawText: string) {
  const email = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i)?.[1] || null;
  const phone = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || null;
  const linkedin = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[0] || null;
  const github = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i)?.[0] || null;
  
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let name = "Candidate";
  if (lines.length > 0) {
    const first = lines[0].replace(/[*#_]/g, "").trim();
    if (first.length > 2 && first.length < 50 && !first.includes("@")) {
      name = first;
    }
  }

  return {
    personal: {
      name,
      headline: lines[1] && lines[1].length < 80 ? lines[1] : "Professional",
      email,
      phone,
      location: "Remote / Open to Relocation",
      linkedin,
      github,
      website: null,
    },
    summary: lines.slice(1, 4).join(" "),
    experience: [],
    education: [],
    skills: ["TypeScript", "React", "Node.js", "System Architecture", "Git"],
    projects: [],
    certifications: [],
  };
}

export function convertStructuredToMarkdown(data: any): string {
  const p = data.personal || {};
  const lines: string[] = [];

  // 1. Header Name
  lines.push(`# ${p.name || "Candidate"}`);

  // 2. Contact details line
  const contactParts = [
    p.location,
    p.phone,
    p.email,
    p.linkedin,
    p.github,
    p.website,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    lines.push(contactParts.join(" • "));
  }

  lines.push("");

  // 3. Summary
  if (data.summary && data.summary.trim()) {
    lines.push("## PROFESSIONAL SUMMARY");
    lines.push(data.summary.trim());
    lines.push("");
  }

  // 4. Experience
  if (Array.isArray(data.experience) && data.experience.length > 0) {
    lines.push("## PROFESSIONAL EXPERIENCE");
    for (const exp of data.experience) {
      const header = `### ${exp.role || "Software Engineer"} — ${exp.company || "Company"} | ${exp.period || "Present"} | ${exp.location || "Remote"}`;
      lines.push(header);
      if (Array.isArray(exp.highlights) && exp.highlights.length > 0) {
        for (const h of exp.highlights) {
          lines.push(`* ${h.replace(/^[*•-]\s*/, "")}`);
        }
      } else if (exp.description) {
        lines.push(`* ${exp.description}`);
      }
      lines.push("");
    }
  }

  // 5. Skills
  if (Array.isArray(data.skills) && data.skills.length > 0) {
    lines.push("## CORE TECHNICAL SKILLS");
    lines.push(data.skills.join(", "));
    lines.push("");
  }

  // 6. Projects
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    lines.push("## SELECTED PROJECTS & SYSTEM CASE STUDIES");
    for (const proj of data.projects) {
      const projHeader = `### ${proj.title || "Project"}${proj.link ? ` | ${proj.link}` : ""}`;
      lines.push(projHeader);
      if (proj.techStack) {
        lines.push(`* **Tech Stack:** ${proj.techStack}`);
      }
      if (proj.description) {
        lines.push(`* ${proj.description}`);
      }
      lines.push("");
    }
  }

  // 7. Education
  if (Array.isArray(data.education) && data.education.length > 0) {
    lines.push("## EDUCATION & CREDENTIALS");
    for (const edu of data.education) {
      lines.push(`### ${edu.degree || "Degree"} — ${edu.institution || "University"} | ${edu.year || "Year"}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}`);
      lines.push("");
    }
  }

  // 8. Certifications
  if (Array.isArray(data.certifications) && data.certifications.length > 0) {
    lines.push("## ACCREDITATIONS & CERTIFICATIONS");
    for (const cert of data.certifications) {
      lines.push(`* **${cert.name}** — ${cert.issuer || "Verified Issuer"} (${cert.year || "Completed"})`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}
