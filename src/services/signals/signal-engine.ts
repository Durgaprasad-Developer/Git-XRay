import { GitHubUser, ProcessedRepo } from "@/types/github.types";
import { DeveloperSignals } from "@/types/signals.types";

export class SignalEngine {
  /**
   * Main entry point to extract structured developer signals from raw GitHub payload.
   * Completely deterministic, zero LLM usage.
   */
  static extractSignals(
    user: GitHubUser,
    repositories: ProcessedRepo[]
  ): DeveloperSignals {
    console.log("[Signal Engine] Extracting signals for username:", user.login);

    // 1. Profile Signals
    const hasBio = !!user.bio && user.bio.trim().length > 0;
    const hasPortfolio = !!user.blog && user.blog.trim().length > 0;
    const hasAvatar = !!user.avatar_url;
    
    // Account age in years
    const createdDate = new Date(user.created_at);
    const now = new Date();
    const accountAge = parseFloat(
      ((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2)
    );

    // 2. Repository Activity Signals
    const totalRepos = user.public_repos;
    let activeRepos = 0;
    let inactiveRepos = 0;
    let totalStars = 0;

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const oneEightyDaysAgo = new Date();
    oneEightyDaysAgo.setDate(oneEightyDaysAgo.getDate() - 180);

    repositories.forEach((repo) => {
      totalStars += repo.stargazers_count;
      const pushedDate = new Date(repo.pushed_at);
      if (pushedDate > ninetyDaysAgo) {
        activeRepos++;
      } else if (pushedDate < oneEightyDaysAgo) {
        inactiveRepos++;
      }
    });

    const recentActivity = activeRepos > 0;

    // 3. Project Quality & Technical Depth Signals
    let deployedProjects = 0;
    let documentedProjects = 0;
    let productionReadyProjects = 0;
    let inactiveProjects = 0;
    let totalReadmeScore = 0;

    repositories.forEach((repo) => {
      const hasReadme = !!repo.readmeContent && repo.readmeContent.trim().length > 100;
      if (hasReadme) documentedProjects++;

      const isDeployed = !!repo.homepage || (!!repo.readmeContent && this.detectDeploymentKeywords(repo.readmeContent, repo.homepage || ""));
      if (isDeployed) deployedProjects++;

      const hasDescription = !!repo.description && repo.description.trim().length > 10;
      const hasLicense = !!repo.readmeContent && (repo.readmeContent.includes("LICENSE") || repo.readmeContent.includes("MIT"));
      
      if (isDeployed && hasReadme && hasDescription && hasLicense) {
        productionReadyProjects++;
      }

      const pushedDate = new Date(repo.pushed_at);
      if (pushedDate < oneEightyDaysAgo) {
        inactiveProjects++;
      }

      // Compute individual README quality score out of 100
      if (repo.readmeContent) {
        totalReadmeScore += this.evaluateReadmeQuality(repo.readmeContent);
      }
    });

    const readmeQuality = repositories.length > 0 
      ? Math.round(totalReadmeScore / repositories.length) 
      : 0;

    const deploymentScore = repositories.length > 0 
      ? Math.round((deployedProjects / repositories.length) * 100) 
      : 0;

    const documentationScore = repositories.length > 0 
      ? Math.round((documentedProjects / repositories.length) * 100) 
      : 0;

    // Professionalism score based on profile completion & project metadata
    let profScore = 0;
    if (hasBio) profScore += 20;
    if (hasPortfolio) profScore += 20;
    if (user.location) profScore += 10;
    if (user.company) profScore += 10;
    
    // Average repository description and topics percentage
    let descAndTopicsCount = 0;
    repositories.forEach(repo => {
      if (repo.description) descAndTopicsCount += 20;
      if (repo.topics && repo.topics.length > 0) descAndTopicsCount += 20;
    });
    
    const avgRepoMetadataScore = repositories.length > 0 
      ? (descAndTopicsCount / repositories.length) 
      : 0;

    const professionalism = Math.round(profScore + avgRepoMetadataScore);

    // 4. Tech Stack Signals
    const languageCounts: Record<string, number> = {};
    let frontendCount = 0;
    let backendCount = 0;
    let aiCount = 0;
    let fullstackCount = 0;

    repositories.forEach((repo) => {
      const lang = repo.language;
      if (lang) {
        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      }

      const topics = repo.topics.map(t => t.toLowerCase());
      const desc = (repo.description || "").toLowerCase();
      const name = repo.name.toLowerCase();

      const hasFrontendKeywords = topics.some(t => ["react", "vue", "frontend", "css", "tailwind", "nextjs", "next.js"].includes(t)) ||
                                  desc.includes("frontend") || desc.includes("ui") || desc.includes("css") ||
                                  ["react", "tailwind", "nextjs", "css"].some(k => name.includes(k));
      if (hasFrontendKeywords) frontendCount++;

      const hasBackendKeywords = topics.some(t => ["backend", "api", "database", "sql", "postgres", "node", "express", "fastapi", "django"].includes(t)) ||
                                 desc.includes("backend") || desc.includes("database") || desc.includes("api") ||
                                 ["api", "server", "db", "django", "fastapi"].some(k => name.includes(k));
      if (hasBackendKeywords) backendCount++;

      const hasAIKeywords = topics.some(t => ["ai", "machine-learning", "ml", "openai", "gemini", "llm", "deep-learning", "pytorch", "tensorflow"].includes(t)) ||
                            desc.includes("machine learning") || desc.includes("openai") || desc.includes("llm") || desc.includes("ai ") ||
                            ["ai", "ml", "openai", "gemini", "llm"].some(k => name.includes(k));
      if (hasAIKeywords) aiCount++;

      if (hasFrontendKeywords && hasBackendKeywords) fullstackCount++;
    });

    const sortedLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);

    const topLanguage = sortedLanguages[0] || "Unknown";

    // Determine primary developer identity based on signal weights
    let primaryTechIdentity = "Software Engineer";
    if (aiCount >= 2 && topLanguage === "Python") {
      primaryTechIdentity = "AI / ML Engineer";
    } else if (fullstackCount >= 2 || (frontendCount >= 2 && backendCount >= 2)) {
      primaryTechIdentity = "Full Stack Engineer";
    } else if (frontendCount > backendCount) {
      primaryTechIdentity = "Frontend Specialist";
    } else if (backendCount > frontendCount) {
      primaryTechIdentity = "Backend Specialist";
    } else if (topLanguage === "TypeScript" || topLanguage === "JavaScript") {
      primaryTechIdentity = "JavaScript / TypeScript Specialist";
    }

    // 5. Open Source Signals
    let forkedFromOthers = 0;
    let originalRepos = 0;
    let collaborativeProjects = 0;

    repositories.forEach((repo) => {
      if (repo.fork) {
        forkedFromOthers++;
      } else {
        originalRepos++;
      }
      if (repo.stargazers_count > 2 || repo.forks_count > 0) {
        collaborativeProjects++;
      }
    });

    // Top Topics Aggregate
    const topicCounts: Record<string, number> = {};
    repositories.forEach((repo) => {
      repo.topics.forEach((topic) => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    });

    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);

    const signals: DeveloperSignals = {
      hasBio,
      hasPortfolio,
      hasAvatar,
      accountAge,
      followerCount: user.followers,

      totalRepos,
      activeRepos,
      inactiveRepos,
      recentActivity,
      totalStars,

      deployedProjects,
      documentedProjects,
      productionReadyProjects,
      inactiveProjects,

      languages: sortedLanguages,
      topLanguage,
      frontendProjects: frontendCount,
      backendProjects: backendCount,
      aiProjects: aiCount,
      fullstackProjects: fullstackCount,

      readmeQuality,
      deploymentScore,
      documentationScore,
      professionalism,

      forkedFromOthers,
      originalRepos,
      collaborativeProjects,

      primaryTechIdentity,
      topTopics,
    };

    console.log("[Signal Engine] Signals successfully computed:", {
      username: user.login,
      primaryTechIdentity,
      overallProfessionalism: professionalism,
      readmeQuality,
      deploymentScore,
    });

    return signals;
  }

  /**
   * Deterministically evaluates README quality out of 100
   */
  private static evaluateReadmeQuality(readme: string): number {
    let score = 20; // Base score for having a README

    const len = readme.length;
    if (len > 3000) score += 20;
    else if (len > 1000) score += 15;
    else if (len > 500) score += 10;
    else if (len > 200) score += 5;

    const lower = readme.toLowerCase();

    // Check for sections commonly found in premium repos
    if (lower.includes("#") || lower.includes("##")) score += 10; // has markdown headers
    if (lower.includes("install") || lower.includes("setup") || lower.includes("getting started")) score += 15;
    if (lower.includes("usage") || lower.includes("how to use") || lower.includes("example")) score += 15;
    if (lower.includes("features") || lower.includes("what it does")) score += 10;
    if (lower.includes("license") || lower.includes("mit")) score += 5;
    if (readme.includes("```")) score += 5; // Has code snippets

    return Math.min(100, score);
  }

  /**
   * Helper to identify if project contains deployment traces
   */
  private static detectDeploymentKeywords(readme: string, homepage: string): boolean {
    if (homepage && homepage.trim().length > 0) return true;

    const lower = readme.toLowerCase();
    const deploymentDomains = [
      "vercel.app",
      "netlify.app",
      "pages.dev",
      "github.io",
      "heroku.com",
      "render.com",
      "railway.app",
      "fly.dev",
      "live demo",
      "deployed at",
    ];

    return deploymentDomains.some((domain) => lower.includes(domain));
  }
}
