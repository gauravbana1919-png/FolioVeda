import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pat, repoName, htmlString } = await req.json();

    if (!pat || typeof pat !== "string") {
      return NextResponse.json(
        { error: "Personal Access Token (PAT) is required." },
        { status: 400 }
      );
    }

    if (!repoName || typeof repoName !== "string") {
      return NextResponse.json(
        { error: "Repository name is required." },
        { status: 400 }
      );
    }

    if (!htmlString || typeof htmlString !== "string") {
      return NextResponse.json(
        { error: "HTML content is required for deployment." },
        { status: 400 }
      );
    }

    const cleanRepoName = repoName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-");
    const headers = {
      Authorization: `token ${pat.trim()}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "FolioIn-Portfolio-Engine",
    };

    // 1. Verify user authentication
    const userRes = await fetch("https://api.github.com/user", { headers });
    if (!userRes.ok) {
      return NextResponse.json(
        { error: "Authentication failed. Please verify your GitHub PAT permissions (need 'repo' scope)." },
        { status: 401 }
      );
    }
    const userData = await userRes.json();
    const owner = userData.login;

    // 2. Create or verify repository
    let defaultBranch = "main";
    const createRepoRes = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: cleanRepoName,
        description: "Portfolio website generated and published by FolioIn",
        homepage: `https://${owner}.github.io/${cleanRepoName}/`,
        private: false,
        auto_init: true,
      }),
    });

    if (createRepoRes.status === 422) {
      // Repository already exists, fetch default branch
      const existingRepoRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}`,
        { headers }
      );
      if (existingRepoRes.ok) {
        const repoData = await existingRepoRes.json();
        defaultBranch = repoData.default_branch || "main";
      }
    } else if (!createRepoRes.ok) {
      const errData = await createRepoRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.message || `Failed to create repository "${cleanRepoName}".` },
        { status: createRepoRes.status }
      );
    } else {
      const repoData = await createRepoRes.json();
      defaultBranch = repoData.default_branch || "main";
    }

    // Brief delay to ensure repo propagation on GitHub
    await new Promise((r) => setTimeout(r, 1500));

    // 3. Check if index.html already exists to retrieve SHA for update
    let sha: string | undefined = undefined;
    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepoName}/contents/index.html?ref=${defaultBranch}`,
      { headers }
    );
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      sha = fileData.sha;
    }

    // 4. Encode HTML content in base64
    const base64Content = Buffer.from(htmlString, "utf-8").toString("base64");

    // 5. Commit & Push index.html
    const pushRes = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepoName}/contents/index.html`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: "Deploy Portfolio via FolioIn Engine",
          content: base64Content,
          sha: sha,
          branch: defaultBranch,
        }),
      }
    );

    if (!pushRes.ok) {
      const pushErr = await pushRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: pushErr.message || "Failed to commit index.html to GitHub." },
        { status: pushRes.status }
      );
    }

    // 6. Enable GitHub Pages
    await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepoName}/pages`,
      {
        method: "POST",
        headers: {
          ...headers,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          source: { branch: defaultBranch, path: "/" },
        }),
      }
    ).catch(() => {});

    const liveUrl = `https://${owner}.github.io/${cleanRepoName}/`;

    return NextResponse.json({
      success: true,
      owner,
      repo: cleanRepoName,
      branch: defaultBranch,
      liveUrl,
      repoUrl: `https://github.com/${owner}/${cleanRepoName}`,
      message: `Successfully deployed! Your site will be live at ${liveUrl} within 1-2 minutes.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Deployment failed unexpectedly." },
      { status: 500 }
    );
  }
}
