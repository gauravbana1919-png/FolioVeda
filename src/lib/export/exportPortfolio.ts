import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";

function escapeHtml(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getStandaloneHtml(theme: ThemePackage, content: PortfolioContent): string {
  const { name = "Developer Portfolio", headline = "Software Engineer & Creator", bio = "", location, availability, skills = [], projects = [], experience = [], education = [], contact } = content;
  const colors = theme.tokens?.colors || {
    bg: "#090d16",
    surface: "#111827",
    text: "#f9fafb",
    textMuted: "#9ca3af",
    border: "#1f2937",
    accent: "#06b6d4",
    accentHover: "#0891b2",
  };

  const escapedName = escapeHtml(name);
  const escapedHeadline = escapeHtml(headline);
  const escapedBio = escapeHtml(bio);
  const email = contact?.email ? escapeHtml(contact.email) : "";
  const escapedLocation = location ? escapeHtml(location) : "";

  const projectsHtml = projects
    .map(
      (p) => `
      <div class="project-card">
        <div class="project-content">
          <div class="project-tags">
            ${(p.techStack || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          <p class="project-desc">${escapeHtml(p.description)}</p>
          ${p.impact ? `<p class="project-impact"><strong>Impact:</strong> ${escapeHtml(p.impact)}</p>` : ""}
          <div class="project-links">
            ${p.liveUrl ? `<a href="${escapeHtml(p.liveUrl)}" target="_blank" rel="noreferrer" class="btn btn-primary">Live Demo &rarr;</a>` : ""}
            ${p.githubUrl ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noreferrer" class="btn btn-secondary">GitHub</a>` : ""}
          </div>
        </div>
      </div>
    `
    )
    .join("");

  const skillsHtml = skills
    .map((s) => `<span class="skill-pill">${escapeHtml(s)}</span>`)
    .join("");

  const experienceHtml = experience
    .map(
      (exp) => `
      <div class="exp-item">
        <div class="exp-dot"></div>
        <div class="exp-header">
          <div>
            <h4 class="exp-role">${escapeHtml(exp.role)}</h4>
            <span class="exp-company">${escapeHtml(exp.company)}</span>
          </div>
          <span class="exp-period">${escapeHtml(exp.period)}</span>
        </div>
        ${exp.highlights && exp.highlights.length > 0 ? `
          <ul class="exp-highlights">
            ${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>
        ` : ""}
      </div>
    `
    )
    .join("");

  const educationHtml = education
    .map(
      (edu) => `
      <div class="edu-item">
        <h4 class="edu-degree">${escapeHtml(edu.degree)}</h4>
        <span class="edu-institution">${escapeHtml(edu.institution)}</span>
        <span class="edu-year">${escapeHtml(edu.year || "")}</span>
      </div>
    `
    )
    .join("");

  const contactLinks: string[] = [];
  if (contact?.email) contactLinks.push(`<a href="mailto:${escapeHtml(contact.email)}" class="social-link">Email</a>`);
  if (contact?.github) contactLinks.push(`<a href="${escapeHtml(contact.github)}" target="_blank" rel="noreferrer" class="social-link">GitHub</a>`);
  if (contact?.linkedin) contactLinks.push(`<a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noreferrer" class="social-link">LinkedIn</a>`);
  if (contact?.twitter) contactLinks.push(`<a href="${escapeHtml(contact.twitter)}" target="_blank" rel="noreferrer" class="social-link">Twitter/X</a>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedName} — Portfolio</title>
  <meta name="description" content="${escapedBio}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.bg};
      --surface: ${colors.surface};
      --text: ${colors.text};
      --muted: ${colors.textMuted};
      --border: ${colors.border};
      --accent: ${colors.accent};
      --accent-hover: ${colors.accentHover};
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .container { max-width: 1040px; margin: 0 auto; padding: 40px 24px 80px 24px; }
    header.hero {
      padding: 60px 0 40px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 48px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(6, 182, 212, 0.12);
      color: var(--accent);
      border: 1px solid rgba(6, 182, 212, 0.3);
      margin-bottom: 16px;
    }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    h1.name { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
    h2.title { font-size: clamp(1.2rem, 3vw, 1.6rem); color: var(--accent); font-weight: 500; margin-bottom: 16px; }
    p.bio { font-size: 1.1rem; color: var(--muted); max-width: 680px; margin-bottom: 24px; }
    .hero-meta { display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.9rem; color: var(--muted); align-items: center; }
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .grid-projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 56px; }
    .project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .project-card:hover { transform: translateY(-4px); border-color: var(--accent); }
    .project-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
    .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .tag { font-size: 11px; padding: 2px 8px; background: rgba(255,255,255,0.06); border-radius: 6px; color: var(--muted); }
    .project-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; color: var(--text); }
    .project-desc { font-size: 0.9rem; color: var(--muted); flex: 1; margin-bottom: 12px; }
    .project-impact { font-size: 0.85rem; color: var(--accent); margin-bottom: 16px; }
    .project-links { display: flex; gap: 12px; align-items: center; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.15s ease;
    }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: var(--accent-hover); }
    .btn-secondary { background: rgba(255,255,255,0.08); color: var(--text); border: 1px solid var(--border); }
    .btn-secondary:hover { background: rgba(255,255,255,0.14); }
    .skills-wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 56px; }
    .skill-pill {
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 6px 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 9999px;
      color: var(--text);
    }
    .exp-timeline { position: relative; padding-left: 24px; border-left: 2px solid var(--border); margin-bottom: 56px; }
    .exp-item { position: relative; margin-bottom: 32px; }
    .exp-dot { position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg); }
    .exp-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
    .exp-role { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .exp-company { color: var(--accent); font-weight: 600; font-size: 0.95rem; }
    .exp-period { font-size: 0.85rem; color: var(--muted); font-family: var(--font-mono); }
    .exp-highlights { font-size: 0.9rem; color: var(--muted); padding-left: 20px; margin-top: 8px; }
    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0;
      text-align: center;
      color: var(--muted);
      font-size: 0.9rem;
    }
    .social-links { display: flex; justify-content: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
    .social-link { color: var(--text); text-decoration: none; font-weight: 600; padding: 6px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; font-size: 13px; }
    .social-link:hover { border-color: var(--accent); color: var(--accent); }
  </style>
</head>
<body>
  <div class="container">
    <header class="hero">
      <div class="badge"><span class="badge-dot"></span> ${escapeHtml(availability || "Available for high-impact roles")}</div>
      <h1 class="name">${escapedName}</h1>
      <h2 class="title">${escapedHeadline}</h2>
      <p class="bio">${escapedBio}</p>
      <div class="hero-meta">
        ${escapedLocation ? `<span>📍 ${escapedLocation}</span>` : ""}
        ${email ? `<a href="mailto:${email}" style="color:var(--accent);text-decoration:none;">✉️ ${email}</a>` : ""}
      </div>
    </header>

    ${projects.length > 0 ? `
    <section>
      <h2 class="section-title">Featured Projects</h2>
      <div class="grid-projects">${projectsHtml}</div>
    </section>` : ""}

    ${skills.length > 0 ? `
    <section>
      <h2 class="section-title">Skills &amp; Technologies</h2>
      <div class="skills-wrap">${skillsHtml}</div>
    </section>` : ""}

    ${experience.length > 0 ? `
    <section>
      <h2 class="section-title">Experience</h2>
      <div class="exp-timeline">${experienceHtml}</div>
    </section>` : ""}

    ${education.length > 0 ? `
    <section>
      <h2 class="section-title">Education</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:56px;">
        ${educationHtml}
      </div>
    </section>` : ""}

    <footer>
      ${contactLinks.length > 0 ? `<div class="social-links">${contactLinks.join("")}</div>` : ""}
      <p>Created with <strong>FolioIn</strong> — AI Portfolio Engine</p>
    </footer>
  </div>
</body>
</html>`;
}

export function exportStandaloneHtml(theme: ThemePackage, content: PortfolioContent): void {
  const html = getStandaloneHtml(theme, content);
  const fileName = `${(content.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  saveAs(blob, fileName);
}

export async function exportPortfolioZip(theme: ThemePackage, content: PortfolioContent): Promise<void> {
  const html = getStandaloneHtml(theme, content);
  const readme = generateProfileReadme(content);
  const zip = new JSZip();

  zip.file("index.html", html);
  zip.file("README.md", readme);

  const blob = await zip.generateAsync({ type: "blob" });
  const fileName = `${(content.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.zip`;
  saveAs(blob, fileName);
}

export function generateProfileReadme(content: PortfolioContent): string {
  const { name = "Developer", headline, bio, contact, skills = [], projects = [] } = content;
  const md: string[] = [];

  md.push(`# Hi there, I'm ${name} 👋`);
  if (headline) md.push(`### ${headline}`);
  md.push("");

  if (bio) {
    md.push(bio);
    md.push("");
  }

  const links: string[] = [];
  if (contact?.email) links.push(`[Email](mailto:${contact.email})`);
  if (contact?.github) links.push(`[GitHub](${contact.github})`);
  if (contact?.linkedin) links.push(`[LinkedIn](${contact.linkedin})`);
  if (contact?.twitter) links.push(`[Twitter](${contact.twitter})`);
  if (links.length > 0) {
    md.push(`📫 **Connect with me:** ${links.join(" • ")}`);
    md.push("");
  }

  if (skills.length > 0) {
    md.push("## 🛠 Skills & Technologies");
    md.push(skills.join(" • "));
    md.push("");
  }

  if (projects.length > 0) {
    md.push("## 🚀 Featured Projects");
    projects.slice(0, 6).forEach((p) => {
      let line = `- **[${p.title}](${p.liveUrl || p.githubUrl || "#"})**: ${p.description || "Portfolio project"}`;
      if (p.impact) line += ` (*${p.impact}*)`;
      md.push(line);
    });
    md.push("");
  }

  md.push("---");
  md.push("*Generated with [FolioIn](https://folioin.com)*");

  return md.join("\n");
}
