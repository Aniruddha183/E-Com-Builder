// GithubService.js (Option A - simple Contents API)

export class GithubService {
  // Encode content for browser safely (UTF-8 → base64)
  static encode(content) {
    return btoa(unescape(encodeURIComponent(content)));
  }

  // Create a repo initialized with a README so the default branch exists
  static async createRepo(repoName, githubToken) {
    const res = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        private: false,
        auto_init: true, // ✅ ensures default branch exists, avoids "repo empty" errors
        description: `Auto-generated store: ${repoName}`,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Repo create failed: ${data.message}`);

    // default_branch is typically "main" if your GitHub default is main; fall back if absent
    const defaultBranch = data.default_branch || "main";

    // small wait so GitHub registers the initial commit/branch
    await new Promise(r => setTimeout(r, 800));

    return {
      owner: data.owner.login,
      name: data.name,
      html_url: data.html_url,
      default_branch: defaultBranch,
    };
  }

  // Get SHA of an existing file (returns null if not found)
  static async getFileSha(owner, repo, path, githubToken, branch = "main") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`getFileSha failed for ${path}: ${err.message || res.statusText}`);
    }
    const json = await res.json();
    return json.sha || null;
  }

  // Upload (create or update) a single file at path
  static async uploadFile(owner, repo, path, content, githubToken, branch = "main") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

    const existingSha = await this.getFileSha(owner, repo, path, githubToken, branch);

    const body = {
      message: `${existingSha ? "Update" : "Add"} ${path}`,
      content: this.encode(content),
      branch,
      ...(existingSha ? { sha: existingSha } : {}),
    };

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Upload failed for ${path}: ${err.message || res.statusText}`);
    }
  }

  // Upload a map of files { "path/to/file": "content" }
  static async uploadFiles(owner, repo, files, githubToken, onProgress, branch = "main") {
    const entries = Object.entries(files);
    const total = entries.length;
    let completed = 0;

    for (const [path, content] of entries) {
      await this.uploadFile(owner, repo, path, content, githubToken, branch);
      completed++;
      if (onProgress) onProgress({ completed, total, current: path });
      // tiny delay to avoid secondary rate-limits
      await new Promise(r => setTimeout(r, 150));
    }

    // extra small wait to ensure GitHub webhooks fire properly
    await new Promise(r => setTimeout(r, 1000));
  }

  // Verify that critical files exist
  static async verifyFiles(owner, repo, paths, githubToken, branch = "main") {
    const missing = [];
    for (const p of paths) {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(p)}?ref=${encodeURIComponent(branch)}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${githubToken}` } });
      if (!res.ok) missing.push(p);
    }
    return missing;
  }
}
