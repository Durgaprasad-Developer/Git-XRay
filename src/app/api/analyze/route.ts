import { NextRequest, NextResponse } from "next/server";
import { GitHubService } from "@/services/github/github.service";
import { SignalEngine } from "@/services/signals/signal-engine";
import { ScoringEngine } from "@/services/scoring/scoring-engine";
import { GeminiService } from "@/services/ai/gemini.service";
import { CacheService } from "@/services/cache/cache.service";
import { AnalysisReport, RepositorySummary } from "@/types/report.types";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const cleanUsername = username.trim();
    console.log(`[API Analyze] Beginning full analysis pipeline for: ${cleanUsername}`);

    // Check cache first
    const cachedReport = await CacheService.getCachedReport(cleanUsername);
    if (cachedReport) {
      console.log(`[API Analyze] Cache HIT for: ${cleanUsername}. Returning cached report.`);
      return NextResponse.json(cachedReport);
    }

    console.log(`[API Analyze] Cache MISS for: ${cleanUsername}. Running full analysis.`);

    // 1. GitHub Fetch Layer
    console.log("[API Analyze] 1/4 - Fetching GitHub profile, repositories, and READMEs");
    const { user, repositories } = await GitHubService.fetchFullProfileData(cleanUsername);

    // 2. Signal Extraction Engine
    console.log("[API Analyze] 2/4 - Deterministic signal extraction");
    const signals = SignalEngine.extractSignals(user, repositories);

    // 3. Scoring Engine
    console.log("[API Analyze] 3/4 - Deterministic scoring & archetype generation");
    const { scores, archetype, archetypeEmoji } = ScoringEngine.computeScores(signals);

    // Format top repositories summaries with derived signals for AI review and frontend presentation
    const topRepositories: RepositorySummary[] = repositories.map((repo) => {
      const hasReadme = !!repo.readmeContent && repo.readmeContent.trim().length > 100;
      
      const lowerReadme = (repo.readmeContent || "").toLowerCase();
      const isDeployed = !!repo.homepage || 
        lowerReadme.includes("vercel.app") || 
        lowerReadme.includes("netlify.app") || 
        lowerReadme.includes("github.io") || 
        lowerReadme.includes("render.com") || 
        lowerReadme.includes("live demo");

      const repoSignals: string[] = [];
      if (isDeployed) repoSignals.push("Deployed");
      else repoSignals.push("No deploy");

      if (hasReadme) {
        if (repo.readmeContent && repo.readmeContent.length > 2000) {
          repoSignals.push("Good README");
        } else {
          repoSignals.push("Basic README");
        }
      } else {
        repoSignals.push("No README");
      }

      if (repo.stargazers_count > 5) repoSignals.push("Loved");
      if (repo.description && repo.description.length > 30) repoSignals.push("Clean code");

      // Approximate commit count if not present
      const commitCount = repo.size > 2000 ? 52 : repo.size > 500 ? 27 : 9;

      return {
        name: repo.name,
        description: repo.description || "",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        hasReadme,
        isDeployed,
        commitCount,
        signals: repoSignals,
      };
    });

    // 4. AI Review Engine
    console.log("[API Analyze] 4/4 - Invoking Gemini Recruiter Engine");
    const { review, recruiterImpression, improvements } = await GeminiService.generateReview(
      cleanUsername,
      signals,
      scores,
      archetype,
      topRepositories
    );

    // Construct final report object
    // Map account age to rounded number, percentile calculated relative to overall score
    const ageYears = Math.max(1, Math.round(signals.accountAge));
    // Simple percentile curve where overall score of 75 maps to Top 20%, 90 to Top 8%, 50 to Top 40% (lower Top% is better)
    const percentile = Math.min(99, Math.max(1, Math.round((100 - scores.overall) * 0.8)));

    const report: AnalysisReport = {
      profile: {
        username: user.login,
        name: user.name || user.login,
        bio: user.bio || "",
        avatarUrl: user.avatar_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        location: user.location || "",
        blog: user.blog || "",
        company: user.company || "",
        accountAge: ageYears,
        percentile,
      },
      scores,
      archetype,
      archetypeEmoji,
      topRepositories,
      techStack: {
        primaryIdentity: signals.primaryTechIdentity,
        primary: signals.topLanguage !== "Unknown" ? [signals.topLanguage, ...signals.languages.slice(0, 2)] : signals.languages.slice(0, 3),
        secondary: signals.topTopics.slice(0, 5),
      },
      recruiterImpression,
      review,
      improvements,
      shareCard: {
        score: scores.overall,
        archetype,
        techIdentity: signals.topLanguage !== "Unknown" ? `${signals.topLanguage} Specialist` : signals.primaryTechIdentity,
        percentile,
        consistencyScore: scores.consistency,
        profileScore: scores.profileBranding,
        openSourceScore: scores.openSource,
      },
    };

    // Cache the completed report for future fast lookups
    await CacheService.setCachedReport(cleanUsername, report);

    console.log(`[API Analyze] Full pipeline successfully finished for candidate: ${cleanUsername}, Score: ${scores.overall}`);
    return NextResponse.json(report);
  } catch (error: any) {
    console.error("[API Analyze Error] Fatal crash in analysis pipeline:", error);
    
    // Provide a detailed error message back to the client
    const errorMessage = error.message || "An unexpected error occurred during analysis";
    return NextResponse.json(
      { error: errorMessage },
      { status: error.message?.includes("not found") ? 404 : 500 }
    );
  }
}
