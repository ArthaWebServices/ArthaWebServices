export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: "Aman Thakur",
    role: "Founder & Creative Director",
    bio: "Former in-house lead for Fortune 500 brands. Obsessed with design that ships and performs.",
    initials: "AT",
  },
  {
    name: "Marcus Bell",
    role: "Head of Engineering",
    bio: "Full-stack engineer specializing in Next.js and performance-critical frontends.",
    initials: "MB",
  },
  {
    name: "Priya Sharma",
    role: "Lead Product Designer",
    bio: "System-thinker crafting accessible, conversion-focused interfaces people love using.",
    initials: "PS",
  },
  {
    name: "Diego Ferreira",
    role: "Growth & SEO Lead",
    bio: "Data-driven strategist turning analytics into compounding, measurable growth loops.",
    initials: "DF",
  },
];