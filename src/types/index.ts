export type ApplicationStatus =
  | 'NEW'
  | 'UNDER_REVIEW'
  | 'CONTACTED'
  | 'DISCUSSION'
  | 'SELECTED'
  | 'ONBOARDING'
  | 'BUILDING'
  | 'LAUNCHED'
  | 'ON_HOLD'
  | 'REJECTED';

export interface Application {
  id: string;
  // Step 1: About You
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  linkedin?: string;
  portfolio?: string;

  // Step 2: Education
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  currentSemester: string;
  expectedGraduationYear: string;

  // Step 3: Skills & Experience
  technicalSkills: string[];
  businessCreativeSkills: string[];
  projectsBuilt: string;
  previousExperience?: string;

  // Step 4: Your Idea
  ideaStatus: 'yes' | 'multiple' | 'building' | 'no_idea_yet';
  ideaTitle?: string;
  problemStatement?: string;
  targetUsers?: string;
  solutionDescription?: string;
  stage?: string;
  teamStatus?: string;

  // Step 5: What do you need?
  needs: string[];
  seriousness: string;
  timeCommitment: string;
  motivation: string;

  // System & Management
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationNote {
  id: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details?: string;
}

export interface ApplicationReview {
  founderPotential: number; // 1-5
  problemStrength: number; // 1-5
  marketPotential: number; // 1-5
  technicalFeasibility: number; // 1-5
  commitment: number; // 1-5
  overallAssessment: string;
  internalNotes: string;
  nextAction: string;
  reviewedBy: string;
  updatedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'superadmin';
  name?: string;
}

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}
