import { NextRequest, NextResponse } from "next/server";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
}

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  public_repos: number;
}

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().replace(/^@/, "");

    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "FolioVeda-Portfolio-Engine",
      },
    });

    if (!userRes.ok) {
      if (userRes.status === 404) {
        return NextResponse.json(
          { error: `GitHub user "${cleanUsername}" not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `GitHub API error: ${userRes.statusText}` },
        { status: userRes.status }
      );
    }

    const userData: GithubUser = await userRes.json();

    // 2. Fetch User's Top Public Repositories (sorted by updated)
    const reposRes = await fetch(
      `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=12&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "FolioVeda-Portfolio-Engine",
        },
      }
    );

    const reposData: GithubRepo[] = reposRes.ok ? await reposRes.json() : [];

    // Filter out forks if possible, prioritize own original repos with stars or descriptions
    const originalRepos = reposData
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 8);

    // Extract unique skills/languages
    const languageSet = new Set<string>();
    reposData.forEach((repo) => {
      if (repo.language) languageSet.add(repo.language);
      if (repo.topics) repo.topics.forEach((t) => languageSet.add(t));
    });

    // Map projects into FolioVeda schema
    const mappedProjects = originalRepos.map((repo, idx) => ({
      id: `gh-${repo.id}`,
      title: repo.name.replace(/[-_]/g, " "),
      description: repo.description || "Open source project on GitHub.",
      link: repo.homepage || repo.html_url,
      githubUrl: repo.html_url,
      tags: [repo.language, ...(repo.topics || [])].filter(Boolean) as string[],
      featured: idx < 3,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

    return NextResponse.json({
      success: true,
      profile: {
        name: userData.name || userData.login,
        username: userData.login,
        avatarUrl: userData.avatar_url,
        bio: userData.bio || `Software engineer and open source contributor.`,
        location: userData.location || null,
        company: userData.company || null,
        email: userData.email || null,
        blog: userData.blog || null,
        github: `https://github.com/${userData.login}`,
        twitter: userData.twitter_username
          ? `https://twitter.com/${userData.twitter_username}`
          : null,
      },
      skills: Array.from(languageSet).slice(0, 15),
      projects: mappedProjects,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to import from GitHub" },
      { status: 500 }
    );
  }
}
