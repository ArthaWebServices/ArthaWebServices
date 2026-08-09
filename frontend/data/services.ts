import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  ShoppingBag,
  MonitorSmartphone,
  Palette,
  Search,
  Rocket,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: LayoutGrid,
    title: "Custom Web Design",
    description:
      "Bespoke interfaces designed around your brand and your users — never templates, always built to convert.",
    features: ["UI/UX design", "Design systems", "Prototyping"],
  },
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description:
      "Blazing-fast, accessible sites engineered with Next.js and modern standards for performance and SEO.",
    features: ["Next.js / React", "Headless CMS", "TypeScript"],
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce",
    description:
      "Shopify and headless storefronts designed to turn browsers into buyers with frictionless checkout flows.",
    features: ["Shopify", "Headless commerce", "Checkout optimization"],
  },
  {
    icon: Palette,
    title: "Brand & Identity",
    description:
      "Cohesive brand systems — logos, color, typography — that make you memorable across every touchpoint.",
    features: ["Logo design", "Brand guidelines", "Art direction"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    description:
      "Technical SEO, structured data, and content strategy that get you found and keep you ranked.",
    features: ["Technical SEO", "Structured data", "Content strategy"],
  },
  {
    icon: Rocket,
    title: "Growth & CRO",
    description:
      "A/B testing and conversion-rate optimization that turn your traffic into measurable revenue.",
    features: ["A/B testing", "Analytics", "Performance tuning"],
  },
];