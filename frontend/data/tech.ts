export type MarqueeDirection = "ltr" | "rtl";

export interface TechCategory {
  /** Label pinned at the left of the row. */
  category: string;
  /** Scroll direction of the marquee. */
  direction: MarqueeDirection;
  /** Seconds for one full loop. Longer = slower. */
  duration: number;
  /** Technology names in the row, in display order. */
  items: string[];
}

export const techCategories: TechCategory[] = [
  {
    category: "Frontend",
    direction: "ltr",
    duration: 32,
    items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    direction: "rtl",
    duration: 36,
    items: ["Node.js", "Express.js", "Python", "Django", "Laravel"],
  },
  {
    category: "Mobile",
    direction: "ltr",
    duration: 26,
    items: ["Flutter", "React Native", "Android", "iOS"],
  },
  {
    category: "Database",
    direction: "rtl",
    duration: 30,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    direction: "ltr",
    duration: 40,
    items: ["AWS", "Google Cloud", "Vercel", "Docker", "Cloudflare"],
  },
  {
    category: "Tools & Platforms",
    direction: "rtl",
    duration: 34,
    items: ["Git", "GitHub", "Figma", "REST APIs", "Stripe"],
  },
];
