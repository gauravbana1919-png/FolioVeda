import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const MODEL_CHAIN = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-flash-lite-latest",
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

function cleanField(str: string): string {
  if (!str) return "";
  return str
    .replace(/^[•\*\-\s\d\.\)\:]+/, "")
    .replace(/^(full\s*name|name|candidate\s*name|current\s*role|target\s*role|target\s*headline|role|title|headline|designation|email|phone|mobile|location|address)[\s\:\.\-]+/i, "")
    .replace(/[*#_~`]/g, "")
    .trim();
}

function fallbackLocalParse(rawText: string) {
  const email = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i)?.[1] || null;
  const phone = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || null;
  const linkedin = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[0] || null;
  const github = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i)?.[0] || null;
  
  const rawLines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
  // Extract candidate name and headline cleanly
  let name = "Candidate";
  let headline = "Software Engineer";
  let summary = "";

  for (let i = 0; i < Math.min(rawLines.length, 6); i++) {
    const l = rawLines[i];
    if (l.includes("@") || l.includes("http") || l.includes(".com")) continue;
    
    const cleaned = cleanField(l);
    if (!cleaned) continue;

    if (name === "Candidate") {
      // Check if line looks like a name (2 to 4 words, no long sentences)
      const words = cleaned.split(/\s+/).filter(Boolean);
      if (words.length >= 1 && words.length <= 4 && cleaned.length < 40) {
        name = cleaned;
        continue;
      }
    }

    if (name !== "Candidate" && headline === "Software Engineer") {
      if (cleaned.length < 70 && !/^(summary|experience|skills|education)/i.test(cleaned)) {
        headline = cleaned;
        continue;
      }
    }
  }

  // Section segmentation
  const sections: { [key: string]: string[] } = {};
  let currentSection = "general";
  sections[currentSection] = [];

  for (const line of rawLines) {
    const lower = line.toLowerCase().replace(/^[•\*\-\s\d\.\)\:]+/, "").trim();
    if (/^(work\s*)?experience|employment\s*history|professional\s*experience/i.test(lower)) {
      currentSection = "experience";
      sections[currentSection] = [];
    } else if (/^(key\s*)?skills|core\s*competencies|technical\s*skills/i.test(lower)) {
      currentSection = "skills";
      sections[currentSection] = [];
    } else if (/^projects|selected\s*projects|academic\s*projects/i.test(lower)) {
      currentSection = "projects";
      sections[currentSection] = [];
    } else if (/^education|academic\s*qualifications|degrees/i.test(lower)) {
      currentSection = "education";
      sections[currentSection] = [];
    } else if (/^summary|profile|about\s*me|executive\s*summary/i.test(lower)) {
      currentSection = "summary";
      sections[currentSection] = [];
    } else if (/^certifications|licenses|accreditations/i.test(lower)) {
      currentSection = "certifications";
      sections[currentSection] = [];
    } else {
      sections[currentSection].push(line);
    }
  }

  // Parse Summary
  if (sections["summary"] && sections["summary"].length > 0) {
    summary = sections["summary"].map(cleanField).filter(Boolean).join(" ");
  }

  // Parse Skills
  const parsedSkills: string[] = [];
  if (sections["skills"] && sections["skills"].length > 0) {
    for (const sLine of sections["skills"]) {
      const cleaned = cleanField(sLine);
      const split = cleaned.split(/[,|•·;]+/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 35);
      parsedSkills.push(...split);
    }
  }
  const skills = parsedSkills.length > 0 ? Array.from(new Set(parsedSkills)).slice(0, 15) : ["TypeScript", "React", "Node.js", "Git", "REST APIs"];

  // Parse Experience
  const experience: any[] = [];
  if (sections["experience"] && sections["experience"].length > 0) {
    let currentExp: any = null;
    for (const expLine of sections["experience"]) {
      const isBullet = /^[•\*\-\d\.]/.test(expLine);
      const cleaned = cleanField(expLine);
      if (!cleaned) continue;

      if (!isBullet && (expLine.includes("—") || expLine.includes("-") || expLine.includes("|") || !currentExp)) {
        if (currentExp) experience.push(currentExp);
        const parts = cleaned.split(/[-—|]+/).map(p => p.trim());
        currentExp = {
          role: parts[0] || "Software Engineer",
          company: parts[1] || "Technology Co.",
          period: parts[2] || "2023 - Present",
          location: "Remote / On-site",
          highlights: [],
        };
      } else if (currentExp) {
        currentExp.highlights.push(cleaned);
      }
    }
    if (currentExp) experience.push(currentExp);
  }

  // Parse Education
  const education: any[] = [];
  if (sections["education"] && sections["education"].length > 0) {
    for (const eduLine of sections["education"]) {
      const cleaned = cleanField(eduLine);
      if (cleaned.length > 4) {
        const parts = cleaned.split(/[-—|,]+/).map(p => p.trim());
        education.push({
          degree: parts[0] || "B.Tech / Bachelor's Degree",
          institution: parts[1] || "University / College",
          year: parts[2] || "2024",
          gpa: "",
        });
      }
    }
  }

  // Parse Projects
  const projects: any[] = [];
  if (sections["projects"] && sections["projects"].length > 0) {
    let currentProj: any = null;
    for (const projLine of sections["projects"]) {
      const isBullet = /^[•\*\-\d\.]/.test(projLine);
      const cleaned = cleanField(projLine);
      if (!cleaned) continue;

      if (!isBullet || !currentProj) {
        if (currentProj) projects.push(currentProj);
        const parts = cleaned.split(/[-—|:]+/).map(p => p.trim());
        currentProj = {
          title: parts[0] || "Web Application",
          techStack: parts[1] || "TypeScript, Next.js",
          description: parts[2] || cleaned,
          link: "",
        };
      } else if (currentProj) {
        currentProj.description += " " + cleaned;
      }
    }
    if (currentProj) projects.push(currentProj);
  }

  return {
    personal: {
      name,
      headline,
      email,
      phone,
      location: "Remote / Open to Relocation",
      linkedin,
      github,
      website: null,
    },
    summary: summary || `Experienced ${headline} specializing in building reliable, scalable software solutions.`,
    experience: experience.slice(0, 5),
    education: education.slice(0, 3),
    skills,
    projects: projects.slice(0, 4),
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
