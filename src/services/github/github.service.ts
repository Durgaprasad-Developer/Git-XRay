import axios from "axios";
import { GitHubUser, GitHubRepo, ProcessedRepo } from "@/types/github.types";

const githubToken = process.env.GITHUB_TOKEN;

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
    Accept: "application/vnd.github+json",
  },
});

export class GitHubService {
  /**
   * Fetches user profile data from GitHub
   */
  static async fetchProfile(username: string): Promise<GitHubUser> {
    console.log("[GitHub Fetch] Fetching profile:", username);
    try {
      const response = await githubApi.get<GitHubUser>(`/users/${username}`);
      return response.data;
    } catch (error: any) {
      console.error(`[GitHub Fetch Error] Error fetching profile for ${username}:`, error.message);
      if (error.response && error.response.status === 404) {
        throw new Error("GitHub profile not found");
      }
      throw new Error(`Failed to fetch GitHub profile: ${error.message}`);
    }
  }

  /**
   * Fetches and filters public repositories for a user
   */
  static async fetchRepositories(username: string): Promise<ProcessedRepo[]> {
    console.log("[GitHub Fetch] Fetching repositories for:", username);
    try {
      // Get all public repositories (up to 100)
      const response = await githubApi.get<GitHubRepo[]>(`/users/${username}/repos`, {
        params: {
          per_page: 100,
          sort: "updated",
        },
      });

      const repos = response.data;
      console.log(`[GitHub Fetch] Total repositories found: ${repos.length}`);

      // Filter: ignore forks, archived, empty (size 0)
      const filtered = repos.filter(
        (repo) => !repo.fork && !repo.archived && repo.size > 0
      );

      console.log(`[GitHub Fetch] Repositories after filtering (no forks, no archived, non-empty): ${filtered.length}`);

      // Sort priority: stars desc, then push recency desc
      const sorted = [...filtered].sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      });

      // Select top 5-10 meaningful repositories
      const topRepos = sorted.slice(0, 10);
      console.log(`[GitHub Fetch] Selected top ${topRepos.length} repositories for signal analysis`);

      return topRepos;
    } catch (error: any) {
      console.error(`[GitHub Fetch Error] Error fetching repositories for ${username}:`, error.message);
      throw new Error(`Failed to fetch GitHub repositories: ${error.message}`);
    }
  }

  /**
   * Fetches the README content for a repository in raw text/markdown
   */
  static async fetchReadme(owner: string, repo: string): Promise<string> {
    console.log(`[GitHub Fetch] Fetching README for: ${owner}/${repo}`);
    try {
      const response = await githubApi.get<string>(`/repos/${owner}/${repo}/readme`, {
        headers: {
          Accept: "application/vnd.github.raw+json",
        },
        responseType: "text",
      });
      return response.data;
    } catch (error: any) {
      // It's normal for some repositories not to have a README
      if (error.response && error.response.status === 404) {
        console.log(`[GitHub Fetch] README not found for: ${owner}/${repo}`);
        return "";
      }
      console.warn(`[GitHub Fetch Warning] Failed to fetch README for ${owner}/${repo}:`, error.message);
      return "";
    }
  }

  /**
   * Fetches full data pipeline needed for signal extraction
   */
  static async fetchFullProfileData(username: string): Promise<{
    user: GitHubUser;
    repositories: ProcessedRepo[];
  }> {
    const user = await this.fetchProfile(username);
    const repositories = await this.fetchRepositories(username);

    // Fetch READMEs for top repositories in parallel
    const reposWithReadmes = await Promise.all(
      repositories.map(async (repo) => {
        const readmeContent = await this.fetchReadme(username, repo.name);
        return {
          ...repo,
          readmeContent,
        };
      })
    );

    return {
      user,
      repositories: reposWithReadmes,
    };
  }
}
