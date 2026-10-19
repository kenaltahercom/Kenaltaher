import { Skill } from "@/types";

export const skillsData: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "Frontend", iconOrLabel: "TS", verified: true },
  { name: "JavaScript (ES6+)", category: "Frontend", iconOrLabel: "JS", verified: true },
  { name: "React", category: "Frontend", iconOrLabel: "React", verified: true },
  { name: "Next.js (App Router)", category: "Frontend", iconOrLabel: "Next", verified: true },
  { name: "Tailwind CSS", category: "Frontend", iconOrLabel: "Tailwind", verified: true },
  { name: "HTML5 & Semantic Web", category: "Frontend", iconOrLabel: "HTML5", verified: true },
  { name: "CSS3 & Modern Layouts", category: "Frontend", iconOrLabel: "CSS3", verified: true },

  // Backend & Runtime
  { name: "Node.js", category: "Backend & Runtime", iconOrLabel: "Node", verified: true },
  { name: "RESTful APIs", category: "Backend & Runtime", iconOrLabel: "API", verified: true },
  { name: "Server-Side Rendering", category: "Backend & Runtime", iconOrLabel: "SSR", verified: true },

  // Tools & Workflow
  { name: "Git & GitHub", category: "Tools & Workflow", iconOrLabel: "Git", verified: true },
  { name: "VS Code / IDE Workflows", category: "Tools & Workflow", iconOrLabel: "IDE", verified: true },
  { name: "Vercel Deployment", category: "Tools & Workflow", iconOrLabel: "Vercel", verified: true },
  { name: "npm / Package Management", category: "Tools & Workflow", iconOrLabel: "npm", verified: true },

  // Design & Optimization
  { name: "Responsive UI/UX", category: "Design & Optimization", iconOrLabel: "Mobile", verified: true },
  { name: "Web Performance (Core Web Vitals)", category: "Design & Optimization", iconOrLabel: "Perf", verified: true },
  { name: "Accessibility (a11y)", category: "Design & Optimization", iconOrLabel: "a11y", verified: true },
  { name: "Figma UI Prototyping", category: "Design & Optimization", iconOrLabel: "Figma", verified: true },
];
