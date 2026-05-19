export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  blog: string | null;
  company: string | null;
  created_at: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  pushed_at: string;
  created_at: string;
  size: number;
  fork: boolean;
  archived: boolean;
  open_issues_count: number;
  default_branch: string;
  html_url: string;
}

export interface GitHubReadme {
  content: string; // base64 encoded
  encoding: string;
}

export interface ProcessedRepo extends GitHubRepo {
  readmeContent?: string;
  commitCount?: number;
}
