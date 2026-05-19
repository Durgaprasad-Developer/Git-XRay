export interface DeveloperSignals {
  // Profile signals
  hasBio: boolean;
  hasPortfolio: boolean;
  hasAvatar: boolean;
  accountAge: number; // in years
  followerCount: number;

  // Activity signals
  totalRepos: number;
  activeRepos: number;
  inactiveRepos: number;
  recentActivity: boolean; // pushed in last 90 days
  totalStars: number;

  // Project quality signals
  deployedProjects: number;
  documentedProjects: number; // has README
  productionReadyProjects: number; // deployed + README + description
  inactiveProjects: number;

  // Tech stack signals
  languages: string[];
  topLanguage: string;
  frontendProjects: number;
  backendProjects: number;
  aiProjects: number;
  fullstackProjects: number;

  // Quality signals
  readmeQuality: number; // 0-100
  deploymentScore: number; // 0-100
  documentationScore: number; // 0-100
  professionalism: number; // 0-100

  // Open source signals
  forkedFromOthers: number;
  originalRepos: number;
  collaborativeProjects: number;

  // Derived metadata
  primaryTechIdentity: string;
  topTopics: string[];
}
