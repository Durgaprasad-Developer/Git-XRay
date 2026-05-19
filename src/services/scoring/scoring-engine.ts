import { DeveloperSignals } from "@/types/signals.types";
import { ScoreData } from "@/types/report.types";

export class ScoringEngine {
  /**
   * Computes all dimension scores and the overall score deterministically from signals.
   */
  static computeScores(signals: DeveloperSignals): {
    scores: ScoreData;
    archetype: string;
    archetypeEmoji: string;
  } {
    console.log("[Scoring Engine] Computing scores based on extracted signals...");

    // 1. Consistency Score
    let consistency = 30; // base score for active account
    if (signals.recentActivity) consistency += 30;
    // ratio of active repos to analyzed repos (clamped to 10 max analyzed)
    const activeRatio = Math.min(1, signals.activeRepos / 5);
    consistency += Math.round(activeRatio * 30);
    // account age factor
    consistency += Math.min(10, Math.round(signals.accountAge * 2));
    consistency = Math.min(100, Math.max(0, consistency));

    // 2. Project Quality Score
    let projectQuality = 20; // base
    projectQuality += Math.round((signals.readmeQuality / 100) * 35);
    projectQuality += Math.round((signals.deploymentScore / 100) * 35);
    if (signals.productionReadyProjects > 0) {
      projectQuality += 10;
    }
    projectQuality = Math.min(100, Math.max(0, projectQuality));

    // 3. Open Source Score
    let openSource = 15; // base
    // star counts
    if (signals.totalStars > 100) openSource += 35;
    else if (signals.totalStars > 20) openSource += 25;
    else if (signals.totalStars > 5) openSource += 15;
    else if (signals.totalStars > 0) openSource += 5;

    // collaborative presence
    if (signals.collaborativeProjects > 0) {
      openSource += Math.min(25, signals.collaborativeProjects * 5);
    }
    // original repos presence
    if (signals.originalRepos > 2) {
      openSource += 15;
    }
    // contribution to other repos
    if (signals.forkedFromOthers > 0) {
      openSource += Math.min(10, signals.forkedFromOthers * 2);
    }
    openSource = Math.min(100, Math.max(0, openSource));

    // 4. Profile Branding Score
    let profileBranding = 20;
    if (signals.hasBio) profileBranding += 20;
    if (signals.hasPortfolio) profileBranding += 30;
    if (signals.hasAvatar) profileBranding += 15;
    // follower count impact
    if (signals.followerCount > 50) profileBranding += 15;
    else if (signals.followerCount > 10) profileBranding += 10;
    else if (signals.followerCount > 0) profileBranding += 5;
    profileBranding = Math.min(100, Math.max(0, profileBranding));

    // 5. Technical Depth Score
    let technicalDepth = 30; // base
    // language diversity (but not too thin)
    if (signals.languages.length >= 3) technicalDepth += 15;
    else if (signals.languages.length > 0) technicalDepth += 10;

    // documented & deployment factors
    technicalDepth += Math.round((signals.readmeQuality / 100) * 20);
    // production-ready projects count
    technicalDepth += Math.min(25, signals.productionReadyProjects * 8);
    // account age depth factor
    technicalDepth += Math.min(10, Math.round(signals.accountAge * 1.5));
    technicalDepth = Math.min(100, Math.max(0, technicalDepth));

    // 6. Recruiter Ready Score
    let recruiterReady = 20; // base
    if (signals.hasBio) recruiterReady += 10;
    if (signals.hasPortfolio) recruiterReady += 20;
    // deployment and documentation are critical for recruiters
    recruiterReady += Math.round((signals.deploymentScore / 100) * 25);
    recruiterReady += Math.round((signals.readmeQuality / 100) * 25);
    recruiterReady = Math.min(100, Math.max(0, recruiterReady));

    // 7. Overall Score (weighted dimensions)
    const overall = Math.round(
      consistency * 0.15 +
      projectQuality * 0.25 +
      openSource * 0.10 +
      profileBranding * 0.15 +
      technicalDepth * 0.20 +
      recruiterReady * 0.15
    );

    // 8. Determine Archetype & Emoji
    let archetype = "Full Stack Generalist";
    let archetypeEmoji = "🛠️";

    const isAI = signals.primaryTechIdentity === "AI / ML Engineer" || signals.aiProjects >= 2;
    const isFrontend = signals.primaryTechIdentity === "Frontend Specialist" || (signals.frontendProjects > signals.backendProjects && signals.frontendProjects >= 2);
    const isBackend = signals.primaryTechIdentity === "Backend Specialist" || (signals.backendProjects > signals.frontendProjects && signals.backendProjects >= 2);
    
    if (isAI) {
      archetype = "AI / ML Explorer";
      archetypeEmoji = "🤖";
    } else if (openSource > 60 && signals.collaborativeProjects >= 2) {
      archetype = "Open Source Explorer";
      archetypeEmoji = "🌐";
    } else if (signals.activeRepos >= 4 && signals.recentActivity) {
      archetype = "Hackathon Builder";
      archetypeEmoji = "⚡";
    } else if (isFrontend) {
      archetype = "Frontend Craftsman";
      archetypeEmoji = "🎨";
    } else if (isBackend && technicalDepth > 65) {
      archetype = "Systems Architect";
      archetypeEmoji = "🧱";
    } else if (isBackend) {
      archetype = "Backend Specialist";
      archetypeEmoji = "⚙️";
    } else if (overall > 75) {
      archetype = "Full Stack Craftsman";
      archetypeEmoji = "🏆";
    }

    const scores: ScoreData = {
      overall,
      consistency,
      projectQuality,
      openSource,
      profileBranding,
      technicalDepth,
      recruiterReady,
    };

    console.log("[Scoring Engine] Deterministic scoring completed:", {
      username: signals.primaryTechIdentity,
      overall,
      archetype,
    });

    return {
      scores,
      archetype,
      archetypeEmoji,
    };
  }
}
