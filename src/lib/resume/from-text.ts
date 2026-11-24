export interface ResumeProfileInput {
  name?: string | null;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  skills?: string[] | null;
  experience?: Array<{
    role?: string | null;
    company?: string | null;
    period?: string | null;
    location?: string | null;
    highlights?: string[] | null;
  }> | null;
  education?: Array<{
    degree?: string | null;
    institution?: string | null;
    year?: string | null;
    gpa?: string | null;
    honors?: string | null;
  }> | null;
  projects?: Array<{
    title?: string | null;
    description?: string | null;
    techStack?: string[] | string | null;
  }> | null;
  certifications?: Array<{
    name?: string | null;
    issuer?: string | null;
    year?: string | null;
  }> | null;
}

export function normalizePersonName(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function namesMatch(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  const left = normalizePersonName(a);
  const right = normalizePersonName(b);
  return left.length >= 2 && left === right;
}

function clean(value?: string | null): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

function parseJsonArray(value: unknown): any[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseSkills(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => clean(String(item))).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => clean(item)).filter(Boolean);
  }
  return [];
}

function titleCaseName(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function buildResumeMarkdown(profile: ResumeProfileInput): string {
  const name = clean(profile.name) || "Candidate";
  const lines: string[] = [`# ${name}`];

  const contact = [
    clean(profile.location),
    clean(profile.email),
    clean(profile.phone),
    clean(profile.linkedin),
    clean(profile.github),
    clean(profile.website),
  ].filter(Boolean);

  if (contact.length > 0) lines.push(contact.join(" • "));

  const headline = clean(profile.headline);
  const bio = clean(profile.bio);
  if (headline || bio) {
    lines.push("", "## PROFESSIONAL SUMMARY");
    if (headline) lines.push(headline);
    if (bio && bio !== headline) lines.push(bio);
  }

  const skills = (profile.skills || []).map((skill) => clean(skill)).filter(Boolean);
  if (skills.length > 0) {
    lines.push("", "## TECHNICAL SKILLS", `- ${skills.join(", ")}`);
  }

  const experience = profile.experience || [];
  if (experience.length > 0) {
    lines.push("", "## WORK EXPERIENCE");
    for (const role of experience) {
      const title = [clean(role.role), clean(role.company)].filter(Boolean).join(" — ");
      const meta = [clean(role.period), clean(role.location)].filter(Boolean).join(" | ");
      if (title || meta) {
        lines.push(`### ${[title, meta].filter(Boolean).join(" | ")}`);
      }
      for (const highlight of role.highlights || []) {
        const text = clean(highlight);
        if (text) lines.push(`* ${text}`);
      }
    }
  }

  const projects = profile.projects || [];
  if (projects.length > 0) {
    lines.push("", "## PROJECTS");
    for (const project of projects) {
      const title = clean(project.title);
      const stack = Array.isArray(project.techStack)
        ? project.techStack.map((item) => clean(item)).filter(Boolean).join(", ")
        : clean(project.techStack);
      if (title || stack) lines.push(`### ${[title, stack].filter(Boolean).join(" | ")}`);
      const description = clean(project.description);
      if (description) lines.push(`* ${description}`);
    }
  }

  const education = profile.education || [];
  if (education.length > 0) {
    lines.push("", "## EDUCATION");
    for (const school of education) {
      const left = [clean(school.degree), clean(school.institution)].filter(Boolean).join(" — ");
      const year = clean(school.year);
      if (left || year) lines.push(`### ${[left, year].filter(Boolean).join(" | ")}`);
      const extra = [clean(school.honors), clean(school.gpa) ? `GPA: ${clean(school.gpa)}` : ""].filter(Boolean);
      if (extra.length > 0) lines.push(extra.join(" • "));
    }
  }

  const certifications = profile.certifications || [];
  if (certifications.length > 0) {
    lines.push("", "## CERTIFICATIONS");
    for (const cert of certifications) {
      const text = [clean(cert.name), clean(cert.issuer), clean(cert.year)].filter(Boolean).join(" — ");
      if (text) lines.push(`* ${text}`);
    }
  }

  return `${lines.join("\n").trim()}\n`;
}

const SECTION_LINE = /^(?:#{1,3}\s+)?(professional summary|summary|about|about me|skills|technical skills|top skills|experience|work experience|work history|employment|projects|education|certifications|licenses|contact)\b/i;

export function parsePastedResume(raw: string): { name: string; markdown: string } {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) return { name: "", markdown: "" };

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = text.match(/(?:\+\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/)?.[0] || "";
  const linkedin = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i)?.[0] || "";
  const github = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i)?.[0] || "";

  let name = text.match(/^#\s+(.+)$/m)?.[1]?.trim() || "";
  if (!name) {
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.includes("@") || /https?:\/\//i.test(trimmed) || trimmed.length > 48) continue;
      if (SECTION_LINE.test(trimmed) || /[:|]/.test(trimmed)) continue;
      const words = trimmed.split(/\s+/).filter(Boolean);
      const looksLikeName = words.length >= 2 && words.length <= 4 && words.every((word) => /^[A-Za-z][A-Za-z.'-]*$/.test(word));
      if (looksLikeName) {
        name = trimmed;
        break;
      }
    }
  }
  if (!name && email) {
    const local = email.split("@")[0].replace(/\d+/g, " ").replace(/[._-]+/g, " ").trim();
    if (local.length > 1) name = titleCaseName(local);
  }
  if (!name) name = "Candidate";

  const structured = /^#{1,3}\s+\S/m.test(text) || text.split("\n").some((line) => SECTION_LINE.test(line.trim()));
  if (structured) {
    const body = /^#\s+/m.test(text)
      ? text.replace(/^#\s+.+$/m, `# ${name}`)
      : `# ${name}\n${text}`;
    return { name, markdown: `${body.trim()}\n` };
  }

  const kept = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      if (!line || line === name) return false;
      if (email && line.includes(email)) return false;
      if (phone && line.includes(phone)) return false;
      if (linkedin && line.toLowerCase().includes("linkedin.com")) return false;
      if (github && line.toLowerCase().includes("github.com")) return false;
      return true;
    });

  return {
    name,
    markdown: buildResumeMarkdown({
      name,
      email,
      phone,
      linkedin,
      github,
      bio: kept.join(" "),
    }),
  };
}

export function markdownFromRecord(record: any): string {
  if (!record) return "";
  const profile = record.profile || record;
  const contact = profile.contact && typeof profile.contact === "object" ? profile.contact : {};
  let socials: Record<string, string> = {};
  if (typeof profile.socials === "string") {
    try {
      socials = JSON.parse(profile.socials) || {};
    } catch {
      socials = {};
    }
  } else if (profile.socials && typeof profile.socials === "object") {
    socials = profile.socials;
  }

  const email = clean(contact.email || socials.email || record.email);
  const publicEmail = email.includes("@folioveda.local") ? "" : email;

  return buildResumeMarkdown({
    name: record.name || profile.name,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    email: publicEmail,
    phone: contact.phone || profile.phone || socials.phone,
    linkedin: contact.linkedin || socials.linkedin,
    github: contact.github || socials.github,
    website: contact.website || socials.website || socials.portfolio,
    skills: parseSkills(profile.skills),
    experience: parseJsonArray(profile.experience),
    education: parseJsonArray(profile.education),
    certifications: parseJsonArray(profile.certifications),
    projects: Array.isArray(record.projects) && record.projects.length > 0
      ? record.projects
      : parseJsonArray(profile.projects),
  });
}
