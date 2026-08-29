export const siteConfig = {
  name: "Artha Web Services",
  legalName: "Artha Web Services LLC",
  tagline: "Custom web design & development",
  description:
    "Artha Web Services is a full-service web agency crafting high-converting, custom-designed websites — strategy, design, and development under one roof.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.arthawebservices.dev",
  ogImage: "/og-image.svg",
  locale: "en_US",
  keywords: [
    "web design agency",
    "custom web development",
    "next.js development",
    "branding agency",
    "ecommerce website design",
    "UI/UX design",
    "conversion optimization",
  ],
  contact: {
    email: "contact@arthawebservices.dev",
    phone: "",
    address: "",
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    github: "",
    dribbble: "",
  },
  founder: {
    name: "Aman Thakur",
    role: "Founder & Lead Engineer",
    sameAs: [
      "https://github.com/amant-coder",
      "https://linkedin.com/in/aman-thakur",
    ],
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Team", href: "/#team" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** Analytics identifiers — set via env; the tracking snippet only loads when present. */
export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}