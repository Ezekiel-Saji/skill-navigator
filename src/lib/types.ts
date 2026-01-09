export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  confidence: number; // 0-100
  source: 'cv' | 'manual' | 'project' | 'assessment';
  validated: boolean;
  industryRelevance: number; // 0-100
  trending: boolean;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  industry: string;
  requiredSkills: string[];
  averageSalary: string;
  demandLevel: 'low' | 'medium' | 'high' | 'very-high';
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  industryImportance: number;
}

export interface CRIScore {
  overall: number;
  skillMatch: number;
  projectScore: number;
  industryRelevance: number;
  learningProgress: number;
  label: 'Beginner' | 'Emerging' | 'Industry-Ready';
  predictedScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  objectives: string[];
  resources: LearningResource[];
  expectedCRIImprovement: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'mooc' | 'certification' | 'workshop' | 'project' | 'mentor';
  provider: string;
  url?: string;
  duration: string;
  skills: string[];
}

export interface Explanation {
  id: string;
  type: 'skill' | 'gap' | 'recommendation' | 'prediction';
  title: string;
  content: string;
  factors: ExplanationFactor[];
}

export interface ExplanationFactor {
  label: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
}

export interface OutcomePrediction {
  currentState: {
    cri: number;
    topSkills: string[];
    readiness: string;
  };
  predictedState: {
    cri: number;
    newSkills: string[];
    readiness: string;
    timeframe: string;
  };
  improvements: {
    metric: string;
    current: number;
    predicted: number;
    change: number;
  }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  year: number;
  department: string;
  careerGoal?: CareerGoal;
  skills: Skill[];
  cri: CRIScore;
  roadmap: RoadmapPhase[];
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  validated: boolean;
  score: number;
}
