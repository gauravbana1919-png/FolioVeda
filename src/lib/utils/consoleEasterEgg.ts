/**
 * Console Easter Egg Utility
 * Inspired by bentofolio (mkhoirulwafa18/bentofolio)
 * Prints developer ASCII art and exposes interactive terminal commands in browser DevTools.
 */

declare global {
  interface Window {
    folioveda?: {
      info: () => void;
      projects: () => void;
      skills: () => void;
      contact: () => void;
      deploy: () => void;
    };
  }
}

export function initConsoleEasterEgg(userData?: {
  name?: string;
  headline?: string;
  skills?: string[];
  projects?: Array<{ title: string; description: string; link?: string }>;
  email?: string;
  github?: string;
}) {
  if (typeof window === "undefined") return;

  const name = userData?.name || "Developer";
  const headline = userData?.headline || "Software Engineer & Builder";

  const asciiArt = `
  ███████╗ ██████╗ ██╗     ██╗ ██████╗ ██╗   ██╗███████╗██████╗  █████╗ 
  ██╔════╝██╔═══██╗██║     ██║██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔══██╗
  █████╗  ██║   ██║██║     ██║██║   ██║██║   ██║█████╗  ██║  ██║███████║
  ██╔══╝  ██║   ██║██║     ██║██║   ██║╚██╗ ██╔╝██╔══╝  ██║  ██║██╔══██║
  ██║     ╚██████╔╝███████╗██║╚██████╔╝ ╚████╔╝ ███████╗██████╔╝██║  ██║
  ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═════╝ ╚═╝  ╚═╝
  ⚡ Portfolio of ${name} • Synthesized via FolioVeda
  `;

  const styles = {
    ascii: "color: #10b981; font-family: monospace; font-size: 10px; font-weight: bold; line-height: 1.1;",
    title: "color: #38bdf8; font-size: 14px; font-weight: 800; padding: 4px 0;",
    info: "color: #f1f5f9; font-size: 12px; font-family: monospace;",
    accent: "color: #a7f3d0; font-size: 12px; font-weight: bold;",
    cmd: "color: #fbbf24; font-family: monospace; font-size: 11px;",
  };

  try {
    console.log(`%c${asciiArt}`, styles.ascii);
    console.log(`%c🚀 ${name} — ${headline}`, styles.title);
    if (userData?.github) console.log(`%c🐙 GitHub: ${userData.github}`, styles.accent);
    if (userData?.email) console.log(`%c✉️ Email: ${userData.email}`, styles.accent);
    console.log(
      `%c\n💡 DevTools Easter Egg Enabled! Try typing:\n` +
      ` • window.folioveda.info()\n` +
      ` • window.folioveda.projects()\n` +
      ` • window.folioveda.skills()\n` +
      ` • window.folioveda.contact()`,
      styles.cmd
    );

    window.folioveda = {
      info: () => {
        console.log(`%c👨‍💻 Developer Profile: ${name}`, styles.title);
        console.log(`%cHeadline: ${headline}`, styles.info);
      },
      projects: () => {
        console.log(`%c📦 Featured Projects:`, styles.title);
        (userData?.projects || []).forEach((p, i) => {
          console.log(`%c [${i + 1}] ${p.title} - ${p.description}`, styles.info);
        });
      },
      skills: () => {
        console.log(`%c🛠️ Technical Skills:`, styles.title);
        console.log(`%c ${(userData?.skills || []).join(" • ")}`, styles.info);
      },
      contact: () => {
        console.log(`%c📬 Contact Coordinates:`, styles.title);
        console.log(`%c Email: ${userData?.email || "N/A"}`, styles.info);
        console.log(`%c GitHub: ${userData?.github || "N/A"}`, styles.info);
      },
      deploy: () => {
        console.log(`%c🚀 FolioVeda 1-Click Deployment active!`, styles.accent);
      },
    };
  } catch (e) {
    // Silent in strict console environments
  }
}
