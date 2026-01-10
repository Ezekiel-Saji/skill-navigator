import { Skill, CareerGoal, SkillGap, CRIScore, RoadmapPhase, Explanation, OutcomePrediction, StudentProfile } from './types';

export const mockSkills: Skill[] = [
  { id: '1', name: 'Python', category: 'Programming', level: 'advanced', confidence: 85, source: 'cv', validated: true, industryRelevance: 95, trending: true },
  { id: '2', name: 'Machine Learning', category: 'AI/ML', level: 'intermediate', confidence: 72, source: 'cv', validated: true, industryRelevance: 98, trending: true },
  { id: '3', name: 'Data Analysis', category: 'Analytics', level: 'advanced', confidence: 88, source: 'project', validated: true, industryRelevance: 90, trending: true },
  { id: '4', name: 'SQL', category: 'Database', level: 'intermediate', confidence: 75, source: 'cv', validated: true, industryRelevance: 85, trending: false },
  { id: '5', name: 'TensorFlow', category: 'AI/ML', level: 'beginner', confidence: 45, source: 'manual', validated: false, industryRelevance: 88, trending: true },
  { id: '6', name: 'Communication', category: 'Soft Skills', level: 'advanced', confidence: 80, source: 'assessment', validated: true, industryRelevance: 75, trending: false },
  { id: '7', name: 'React', category: 'Frontend', level: 'intermediate', confidence: 68, source: 'project', validated: true, industryRelevance: 92, trending: true },
  { id: '8', name: 'Docker', category: 'DevOps', level: 'beginner', confidence: 40, source: 'manual', validated: false, industryRelevance: 82, trending: true },
];

export const mockCareerGoals: CareerGoal[] = [
  {
    id: '1',
    title: 'Machine Learning Engineer',
    description: 'Design and implement ML models and systems for production environments',
    industry: 'Technology',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'Deep Learning', 'MLOps', 'Data Engineering'],
    averageSalary: '₹15-25 LPA',
    demandLevel: 'very-high',
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Analyze complex data to drive business decisions using statistical methods',
    industry: 'Technology',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Business Analytics'],
    averageSalary: '₹12-20 LPA',
    demandLevel: 'very-high',
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    description: 'Build end-to-end web applications with modern frameworks',
    industry: 'Technology',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs', 'Cloud Services'],
    averageSalary: '₹10-18 LPA',
    demandLevel: 'high',
  },
  {
    id: '4',
    title: 'Product Manager',
    description: 'Lead product strategy and development lifecycle',
    industry: 'Technology',
    requiredSkills: ['Product Strategy', 'Data Analysis', 'Communication', 'Agile', 'User Research', 'Technical Understanding'],
    averageSalary: '₹18-30 LPA',
    demandLevel: 'high',
  },
  {
    id: '5',
    title: 'Cloud Architect',
    description: 'Design and manage cloud infrastructure solutions',
    industry: 'Technology',
    requiredSkills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Networking', 'Security'],
    averageSalary: '₹20-35 LPA',
    demandLevel: 'very-high',
  },
];

export const mockSkillGaps: SkillGap[] = [
  { skill: 'Deep Learning', currentLevel: 20, requiredLevel: 80, gap: 60, priority: 'critical', industryImportance: 95 },
  { skill: 'MLOps', currentLevel: 0, requiredLevel: 70, gap: 70, priority: 'high', industryImportance: 88 },
  { skill: 'TensorFlow', currentLevel: 45, requiredLevel: 85, gap: 40, priority: 'high', industryImportance: 90 },
  { skill: 'Cloud Deployment', currentLevel: 30, requiredLevel: 75, gap: 45, priority: 'medium', industryImportance: 82 },
  { skill: 'Data Engineering', currentLevel: 35, requiredLevel: 70, gap: 35, priority: 'medium', industryImportance: 78 },
];

export const mockCRI: CRIScore = {
  overall: 52,
  skillMatch: 44,
  projectScore: 62,
  industryRelevance: 44,
  learningProgress: 66,
  label: 'Emerging',
  predictedScore: 82,
  trend: 'up',
};

export const mockRoadmap: RoadmapPhase[] = [
  {
    id: '1',
    phase: 1,
    title: 'Foundation Strengthening',
    duration: '4 weeks',
    skills: ['Deep Learning Basics', 'Neural Networks'],
    objectives: ['Complete deep learning fundamentals', 'Build 2 neural network projects'],
    resources: [
      { id: 'r1', title: 'Deep Learning Specialization', type: 'mooc', provider: 'Coursera', duration: '3 months', skills: ['Deep Learning'] },
      { id: 'r2', title: 'Neural Networks Workshop', type: 'workshop', provider: 'Campus Tech Club', duration: '1 day', skills: ['Neural Networks'] },
    ],
    expectedCRIImprovement: 8,
    status: 'in-progress',
  },
  {
    id: '2',
    phase: 2,
    title: 'Advanced ML Techniques',
    duration: '6 weeks',
    skills: ['TensorFlow', 'PyTorch', 'Computer Vision'],
    objectives: ['Master TensorFlow framework', 'Build CV application', 'Complete 1 Kaggle competition'],
    resources: [
      { id: 'r3', title: 'TensorFlow Developer Certificate', type: 'certification', provider: 'Google', duration: '2 months', skills: ['TensorFlow'] },
      { id: 'r4', title: 'CV with Deep Learning', type: 'mooc', provider: 'NPTEL', duration: '8 weeks', skills: ['Computer Vision'] },
    ],
    expectedCRIImprovement: 12,
    status: 'pending',
  },
  {
    id: '3',
    phase: 3,
    title: 'Production & MLOps',
    duration: '8 weeks',
    skills: ['MLOps', 'Docker', 'Kubernetes', 'Cloud Deployment'],
    objectives: ['Deploy 2 ML models to production', 'Set up CI/CD pipeline', 'Learn cloud platforms'],
    resources: [
      { id: 'r5', title: 'MLOps Fundamentals', type: 'mooc', provider: 'Google Cloud', duration: '6 weeks', skills: ['MLOps'] },
      { id: 'r6', title: 'AWS ML Specialty', type: 'certification', provider: 'AWS', duration: '3 months', skills: ['Cloud Deployment'] },
      { id: 'r7', title: 'Industry Mentor Connect', type: 'mentor', provider: 'Alumni Network', duration: 'Ongoing', skills: ['Career Guidance'] },
    ],
    expectedCRIImprovement: 15,
    status: 'pending',
  },
];

export const mockExplanations: Explanation[] = [
  {
    id: '1',
    type: 'gap',
    title: 'Why Deep Learning is Critical',
    content: 'Deep Learning forms the foundation of modern ML engineering roles and is essential for your career goal.',
    factors: [
      { label: 'Industry Demand', value: '95% of ML jobs require it', impact: 'positive', weight: 0.4 },
      { label: 'Your Goal Match', value: 'Core skill for ML Engineer', impact: 'positive', weight: 0.3 },
      { label: 'Current Level', value: 'Beginner (20%)', impact: 'negative', weight: 0.2 },
      { label: 'Trend', value: 'Growing 40% YoY', impact: 'positive', weight: 0.1 },
    ],
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Start with TensorFlow Certification',
    content: 'Based on your Python proficiency and career goal, TensorFlow certification provides the fastest path to improving your CRI.',
    factors: [
      { label: 'Skill Synergy', value: 'Builds on your Python expertise', impact: 'positive', weight: 0.35 },
      { label: 'Industry Recognition', value: 'Google-certified credential', impact: 'positive', weight: 0.25 },
      { label: 'Time Investment', value: '2 months part-time', impact: 'neutral', weight: 0.2 },
      { label: 'CRI Impact', value: '+12 points expected', impact: 'positive', weight: 0.2 },
    ],
  },
];

export const mockOutcomePrediction: OutcomePrediction = {
  currentState: {
    cri: 52,
    topSkills: ['Python', 'Data Analysis', 'Machine Learning'],
    readiness: 'Emerging',
  },
  predictedState: {
    cri: 85,
    newSkills: ['Deep Learning', 'TensorFlow', 'MLOps', 'Cloud Deployment'],
    readiness: 'Industry-Ready',
    timeframe: '6 months',
  },
  improvements: [
    { metric: 'Career Readiness Index', current: 52, predicted: 85, change: 33 },
    { metric: 'Skill Match Score', current: 44, predicted: 92, change: 20 },
    { metric: 'Industry Relevance', current: 70, predicted: 88, change: 18 },
    { metric: 'Placement Probability', current: 45, predicted: 78, change: 33 },
  ],
};

export const mockStudentProfile: StudentProfile = {
  id: '1',
  name: 'Ezekiel Saji',
  email: 'ezekielsaji@gmail.com',
  year: 2,
  department: 'Computer Science',
  careerGoal: mockCareerGoals[0],
  skills: mockSkills,
  cri: mockCRI,
  roadmap: mockRoadmap,
  projects: [
    { id: '1', title: 'Sentiment Analysis Dashboard', description: 'Built a real-time Twitter sentiment analyzer', skills: ['Python', 'Machine Learning', 'Data Analysis'], validated: true, score: 85 },
    { id: '2', title: 'E-commerce Recommendation System', description: 'Collaborative filtering-based product recommendations', skills: ['Python', 'Machine Learning', 'SQL'], validated: true, score: 78 },
  ],
};

export const skillCategories = [
  { name: 'Programming', color: 'hsl(222, 59%, 35%)' },
  { name: 'AI/ML', color: 'hsl(174, 72%, 40%)' },
  { name: 'Analytics', color: 'hsl(142, 71%, 45%)' },
  { name: 'Database', color: 'hsl(38, 92%, 50%)' },
  { name: 'Frontend', color: 'hsl(280, 65%, 60%)' },
  { name: 'DevOps', color: 'hsl(199, 89%, 48%)' },
  { name: 'Soft Skills', color: 'hsl(340, 65%, 55%)' },
];
