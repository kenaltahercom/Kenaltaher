export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishStatus: "published" | "draft";
  year: string;
  role: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    keyFeatures: string[];
    deliverables: string[];
    results?: string;
  };
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend & Runtime" | "Tools & Workflow" | "Design & Optimization";
  iconOrLabel: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  summary: string;
  icon: string;
  ctaLabel: string;
  ctaTarget: string;
  deliverables: string[];
}

export interface FactItem {
  label: string;
  value: string;
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  portrait: string;
  location: string;
  availability: string;
  facts: FactItem[];
  workingApproach: ApproachStep[];
}

export interface Achievement {
  id: string;
  title: string;
  organizer: string;
  date: string;
  description: string;
  image: string;
  badge?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  location?: string;
}

export interface ContactChannel {
  channel: "WhatsApp" | "Email" | "GitHub" | "LinkedIn" | "Instagram";
  label: string;
  value: string;
  url: string;
  enabled: boolean;
  isPrimary?: boolean;
}

export interface SiteSettings {
  brandName: string;
  ownerName: string;
  tagline: string;
  metaDescription: string;
  mascotAssetPath: string;
  resumePath?: string;
  resumeAvailable: boolean;
}
