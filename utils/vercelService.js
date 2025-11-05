// VercelService.js (creates Vercel project linked to GitHub repo)

export class VercelService {
  static async getGithubRepoId(owner, repo, githubToken) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });
    if (!res.ok) throw new Error("Failed to fetch GitHub repo details");
    const data = await res.json();
    return data.id;
  }

  // Create a Vercel project connected to the GitHub repo; this usually auto-triggers first deploy
  static async createProject(repoUrl, vercelToken, projectName, githubToken, productionBranch = "main") {
    const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");
    const repoId = await this.getGithubRepoId(owner, repo, githubToken);

    const res = await fetch("https://api.vercel.com/v10/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        framework: "nextjs",
        buildCommand: "npm run build",
        devCommand: "npm run dev",
        installCommand: "npm install",
        outputDirectory: ".next",
        gitRepository: {
          type: "github",
          repo: `${owner}/${repo}`,
          repoId,
          productionBranch, // ✅ critical for auto-deploy
        },
        publicSource: true,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Failed to create Vercel project");

    return {
      success: true,
      projectId: data.id,
      projectName: data.name,
      url: `https://${data.name}.vercel.app`,
    };
  }

  // Optional: nudge deployment by creating a “noop” commit (if webhook didn’t fire)
  static async triggerDeploymentViaGit(owner, repo, githubToken, branch = "main") {
    const path = `.vercel-deploy-trigger-${Date.now()}.txt`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Trigger Vercel deploy",
        content: btoa(`Triggered at ${new Date().toISOString()}`),
        branch,
      }),
    });
    if (!res.ok) {
      // Not fatal—deployment may still start automatically
      console.warn("Trigger via commit failed");
    }
  }
}
