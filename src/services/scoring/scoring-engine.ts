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
    // --- Deep Diagnostic Indices (Reevaluated Scoring Criteria) ---
    // 1. Code Stewardship & Compliance Index (Professional structure: docs, readme, files quality)
    const stewardshipIndex = Math.round(
      signals.documentationScore * 0.4 +
      signals.readmeQuality * 0.4 +
      signals.professionalism * 0.2
    );

    // 2. Production Deployability Index (Config ready, live lockfiles & lock assets)
    const deployabilityIndex = Math.round(
      signals.deploymentScore * 0.6 +
      Math.min(40, (signals.productionReadyProjects / Math.max(1, signals.totalRepos)) * 100)
    );

    // 3. Specialization Depth Index (Language mastery vs. scattered thinness)
    let specDepth = 75; // base
    if (signals.languages.length > 0 && signals.languages.length <= 3) {
      specDepth += 15; // Focused stack
    } else if (signals.languages.length > 5) {
      specDepth -= Math.min(30, (signals.languages.length - 5) * 6); // Too scattered
    }
    if (signals.topLanguage && signals.primaryTechIdentity && 
        signals.primaryTechIdentity.toLowerCase().includes(signals.topLanguage.toLowerCase())) {
      specDepth += 10;
    }
    const specializationDepthIndex = Math.min(100, Math.max(0, specDepth));

    // 4. Community Adoption & Collaboration Density
    const communityAdoptionIndex = Math.min(100, Math.max(0,
      signals.collaborativeProjects * 15 +
      Math.min(55, signals.totalStars * 2.5) +
      Math.min(15, signals.forkedFromOthers * 3)
    ));

    // 1. Consistency Score
    let consistency = 30; // base score for active account
    if (signals.recentActivity) consistency += 30;
    const activeRatio = Math.min(1, signals.activeRepos / 5);
    consistency += Math.round(activeRatio * 30);
    consistency += Math.min(10, Math.round(signals.accountAge * 2));
    consistency = Math.min(100, Math.max(0, consistency));

    // 2. Project Quality Score
    const projectQuality = Math.min(100, Math.max(0, Math.round(
      deployabilityIndex * 0.7 + stewardshipIndex * 0.3
    )));

    // 3. Open Source Score
    const openSource = Math.min(100, Math.max(0, Math.round(
      communityAdoptionIndex * 0.7 + (signals.originalRepos > 2 ? 30 : 10)
    )));

    // 4. Profile Branding Score
    let profileBranding = 20;
    if (signals.hasBio) profileBranding += 20;
    if (signals.hasPortfolio) profileBranding += 30;
    if (signals.hasAvatar) profileBranding += 15;
    if (signals.followerCount > 50) profileBranding += 15;
    else if (signals.followerCount > 10) profileBranding += 10;
    else if (signals.followerCount > 0) profileBranding += 5;
    profileBranding = Math.min(100, Math.max(0, profileBranding));

    // 5. Technical Depth Score
    const technicalDepth = Math.min(100, Math.max(0, Math.round(
      specializationDepthIndex * 0.6 + stewardshipIndex * 0.4
    )));

    // 6. Recruiter Ready Score
    const recruiterReady = Math.min(100, Math.max(0, Math.round(
      deployabilityIndex * 0.4 + stewardshipIndex * 0.4 + (signals.hasPortfolio ? 20 : 0)
    )));

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
