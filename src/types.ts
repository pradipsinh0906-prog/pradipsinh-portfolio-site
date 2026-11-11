export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  period: string;
  description: string;
  features?: string[];
  stack: string[];
  githubUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  note?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  year: string;
}

