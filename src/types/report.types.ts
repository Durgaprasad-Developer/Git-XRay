export interface AnalysisReport {
  profile: ProfileData;
  scores: ScoreData;
  archetype: string;
  archetypeEmoji: string;
  topRepositories: RepositorySummary[];
  techStack: TechStackData;
  recruiterImpression: RecruiterImpression[];
  review: ReviewData;
  improvements: string[];
  shareCard: ShareCardData;
  headlines?: HeadlineData;
  highestImpactFix?: HighestImpactFixData;
  scoreExplainability?: ScoreExplainabilityData;
  positionMatch?: HiringPositionMatchData;
}

export interface HighestImpactFixData {
  title: string;
  diagnosis: string;
  whyItMatters: string;
  exactFix: string;
  expectedImpact: string;
  potentialScoreProjection?: string;
}

export interface ScoreExplainabilityData {
  pros: string[];
  cons: string[];
}

export interface HiringPositionMatchData {
  highConfidenceMatch: string;
  mediumConfidenceMatch: string;
  lowConfidenceMatch: string;
  recruiterAppealFactor: string;
}

export interface HeadlineData {
  linkedin: string;
  githubReadme: string;
  twitter: string;
}

export interface ProfileData {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  location: string;
  blog: string;
  company: string;
  accountAge: number; // years
  percentile: number; // 0-100
}

export interface ScoreData {
  overall: number;
  consistency: number;
  projectQuality: number;
  openSource: number;
  profileBranding: number;
  technicalDepth: number;
  recruiterReady: number;
}

export interface RepositorySummary {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  hasReadme: boolean;
  isDeployed: boolean;
  commitCount: number;
  signals: string[]; // e.g. ["Good UI", "No README", "Deployed"]
}

export interface TechStackData {
  primaryIdentity: string;
  primary: string[];
  secondary: string[];
}

export interface RecruiterImpression {
  sentiment: "positive" | "neutral" | "negative";
  text: string;
  isVerdict?: boolean;
}

export interface ReviewData {
  standard: string;
  brutal: string;
  recruiter: string;
}

export interface ShareCardData {
  score: number;
  archetype: string;
  techIdentity: string;
  percentile: number;
  consistencyScore: number;
  profileScore: number;
  openSourceScore: number;
}
