import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  ShoppingBag,
  MonitorSmartphone,
  Palette,
  Search,
  Code2,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Short, concrete result a visitor can picture (used as the card's example line). */
  example: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: LayoutGrid,
    title: "Custom Web Design",
    description:
      "Bespoke interfaces designed around your brand and your users — never templates, always built to convert.",
    example:
      "Example: a 12-page marketing site redesigned in 4 weeks — average session time up 38%.",
    features: ["UI/UX design", "Design systems", "Prototyping"],
  },
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description:
      "Blazing-fast, accessible sites engineered with Next.js and modern standards for performance and SEO.",
    example:
      "Example: rebuilt a SaaS landing page in Next.js — 98 Lighthouse score, 19ms median TTFB.",
    features: ["Next.js / React", "Headless CMS", "TypeScript"],
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce",
    description:
      "Shopify and headless storefronts designed to turn browsers into buyers with frictionless checkout flows.",
    example:
      "Example: a headless Shopify store — online revenue up 41% in the first quarter post-launch.",
    features: ["Shopify", "Headless commerce", "Checkout optimization"],
  },
  {
    icon: Palette,
    title: "Brand & Identity",
    description:
      "Cohesive brand systems — logos, color, typography — that make you memorable across every touchpoint.",
    example:
      "Example: full identity for a creative studio — logo, wordmark, color system, and 30-page guideline.",
    features: ["Logo design", "Brand guidelines", "Art direction"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    description:
      "Technical SEO, structured data, and content strategy that get you found and keep you ranked.",
    example:
      "Example: technical SEO audit + 8 pillar articles — organic traffic up 3.2× in 6 months.",
    features: ["Technical SEO", "Structured data", "Content strategy"],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Tailored web applications, portals, and internal tools built around your exact workflow — scalable, maintainable, and secure from day one.",
    example:
      "Example: a custom client portal replacing six spreadsheets — 12 hours saved per week.",
    features: ["Web apps", "APIs & integrations", "Node.js / TypeScript"],
  },
];
