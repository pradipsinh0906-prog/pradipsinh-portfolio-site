export type ProjectCategory = 'All' | 'AI' | 'Web' | 'Android';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  featured: boolean;
  features: string[];
  problem?: string;
  solution?: string;
  challenges?: string[];
  learned?: string[];
  badge?: string;
  mockupSnippet?: string;
  liveDemo?: string;
  downloadUrl?: string;
  downloadNote?: string;
}

export type SkillLevel = 'Core' | 'Strong' | 'Working Knowledge';

export interface Skill {
  name: string;
  category: 'Programming' | 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'AI';
  level: SkillLevel;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  field?: string;
}

export interface CertificationItem {
  title: string;
  year: string;
  issuer?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface HeroStat {
  value: string;
  label: string;
  highlight?: string;
}

export interface AIJourneyNode {
  step: number;
  title: string;
  status: 'Applied via AI-Assisted Development' | 'Familiar With' | 'Core Foundation' | 'Production Tested' | 'Actively Building With' | 'Hands-on Experience';
  description: string;
  tech: string[];
  proofPoint?: string;
}

export interface QuickProfileCard {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}
