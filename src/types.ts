export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  phone?: string;
  instagram?: string;
  x?: string;
  medium?: string;
  credly?: string;
  credlyBadges?: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'volunteer';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface SkillItem {
  category: string;
  items: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
}

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown body
}

export interface AppData {
  profile: Profile;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  certificates: CertificateItem[];
}

