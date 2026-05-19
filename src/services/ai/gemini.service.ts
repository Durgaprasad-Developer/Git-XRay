import { GoogleGenerativeAI } from "@google/generative-ai";
import { DeveloperSignals } from "@/types/signals.types";
import { ScoreData, RecruiterImpression, ReviewData } from "@/types/report.types";

const geminiApiKey = process.env.GEMINI_API_KEY;

export class GeminiService {
  private static getModel() {
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    return genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using gemini-2.5-flash which is fully active and supported by user's key
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
  }

  /**
   * Generates AI-powered reviews, impressions, strengths, and weaknesses from computed signals and scores.
   * AI receives pre-structured signals to interpret them like a human recruiter, avoiding raw JSON dumps.
   */
  static async generateReview(
    username: string,
    signals: DeveloperSignals,
    scores: ScoreData,
    archetype: string,
    topRepos: Array<{ name: string; language: string; description: string; stars: number; signals: string[] }>
  ): Promise<{
    review: ReviewData;
    recruiterImpression: RecruiterImpression[];
    improvements: string[];
  }> {
    console.log("[AI Engine] Generating recruiter review for:", username);

    try {
      const model = this.getModel();

      const prompt = `
You are a highly experienced Silicon Valley Technical Recruiter and Engineering Manager reviewing a candidate's GitHub profile. 
You are insightful, realistic, direct, and can easily spot high-potential developers versus script-kiddies or tutorial-spammers.

Analyze the following computed developer metrics and metadata:
- Username: ${username}
- Primary Tech Identity: ${signals.primaryTechIdentity}
- Archetype: ${archetype}
- Account Age: ${signals.accountAge} years
- Follower Count: ${signals.followerCount}
- Overall Score: ${scores.overall}/100
- Dimension Scores:
  - Technical Depth: ${scores.technicalDepth}/100
  - Consistency: ${scores.consistency}/100
  - Project Quality: ${scores.projectQuality}/100
  - Open Source Contribution: ${scores.openSource}/100
  - Profile Branding: ${scores.profileBranding}/100
  - Recruiter Readiness: ${scores.recruiterReady}/100
- Analyzed Top Repositories:
  ${JSON.stringify(topRepos, null, 2)}
- Key Extracted Signals:
  - Deployed projects count: ${signals.deployedProjects}
  - Documented projects count (has README): ${signals.documentedProjects}
  - Production ready projects count (deployed, README, desc, license): ${signals.productionReadyProjects}
  - Active repos (updated <90 days): ${signals.activeRepos}
  - Inactive/stale repos (>180 days): ${signals.inactiveRepos}
  - Primary language: ${signals.topLanguage}
  - Languages detected: ${signals.languages.join(", ")}

Generate a highly personalized response in the following JSON format.
Ensure that your reviews use <strong> tags inside the HTML format for emphasis on critical phrases. Be constructive but extremely honest.

Expected JSON Schema:
{
  "review": {
    "standard": "An honest, constructive, recruiter-style review (approx 80-120 words). Highlight their building patterns, what they do well, and where their profile lacks polish (e.g. documentation, deployment, or forks). Use <strong> tags on key insights.",
    "brutal": "A funny, sharp, slightly sarcastic but highly accurate roast of their profile (approx 80-120 words). Call out half-baked repos, empty contribution periods, missing READMEs, or tutorial copies. Keep it lighthearted but deeply insightful.",
    "recruiter": "A raw, behind-the-scenes recruiter screening lens (approx 80-120 words). Write this as if you are leaving feedback for a hiring manager. What tier candidate is this? Are they junior, mid, or senior? What is the verdict?"
  },
  "recruiterImpression": [
    { "sentiment": "positive", "text": "First 15-second visual impression positive signal." },
    { "sentiment": "neutral", "text": "A neutral signal or potential risk signal." },
    { "sentiment": "negative", "text": "A negative red-flag signal." },
    { "sentiment": "positive", "text": "Verdict: <strong style='color:#5DCAA5'>Pass to screening / internship offer / junior / mid.</strong>", "isVerdict": true }
  ],
  "improvements": [
    "Specific high-impact actionable recommendation 1 (e.g. deploy project X, improve readme of Y, etc.)",
    "Specific high-impact actionable recommendation 2",
    "Specific high-impact actionable recommendation 3",
    "Specific high-impact actionable recommendation 4",
    "Specific high-impact actionable recommendation 5"
  ]
}

Ensure all lists and impressions directly reference the candidate's technologies, languages, and repo names rather than generic advice.
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      
      // Parse the JSON output safely
      const data = JSON.parse(text);

      console.log("[AI Engine] AI review generated successfully for:", username);

      return {
        review: data.review,
        recruiterImpression: data.recruiterImpression,
        improvements: data.improvements,
      };
    } catch (error) {
      console.error("[AI Engine Error] Failed to generate AI review:", error);
      // Fail gracefully with a helpful fallback review so the pipeline doesn't crash
      return {
        review: {
          standard: `You clearly love building with <strong>${signals.topLanguage}</strong>. Your account age shows you have been active for <strong>${signals.accountAge} years</strong>. However, your profile could benefit from higher deployment rates and structured documentation.`,
          brutal: `A profile active for ${signals.accountAge} years and the main highlight is still a repository with no deployment? Let's get to work and deploy those projects instead of leaving them as graveyards.`,
          recruiter: `Candidate has decent exposure to ${signals.topLanguage}. Lacks open source collaboration presence. Standard review complete.`,
        },
        recruiterImpression: [
          { sentiment: "positive", text: `Demonstrates basic consistency in ${signals.topLanguage}.` },
          { sentiment: "neutral", text: "Portfolio depth is limited due to empty descriptions." },
          { sentiment: "positive", text: "Verdict: <strong>Screen in for entry-level evaluation.</strong>", isVerdict: true },
        ],
        improvements: [
          `Add README files to your top repositories like ${topRepos[0]?.name || "your main projects"}`,
          "Host a live demo on Vercel or Netlify to prove your code works",
          "Pin your highest-quality original repositories to clear up clutter",
          "Add structured setup and installation instructions to your documentation",
        ],
      };
    }
  }
}
