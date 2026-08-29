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
    bio: "Former in-house lead for Fortune 50+ brands. Obsessed with design that ships and performs.",
    initials: "AT",
  },
  {
    name: "Nilesh Jha",
    role: "Head of Engineering",
    bio: "Full-stack engineer specializing in Next.js and performance-critical frontends.",
    initials: "NJ",
  },
  {
    name: "Awanish Singh",
    role: "Lead Product Designer",
    bio: "System-thinker crafting accessible, conversion-focused interfaces people love using.",
    initials: "AS",
  },
  {
    name: "Josiah Thomas",
    role: "Growth & SEO Lead",
    bio: "Data-driven strategist turning analytics into compounding, measurable growth loops.",
    initials: "JT",
  },
  {
    name: "Vivek Thakur",
    role: "Devop Engineer",
    bio: "Data-driven strategist turning analytics into compounding, measurable growth loops.",
    initials: "VT",
  }
];