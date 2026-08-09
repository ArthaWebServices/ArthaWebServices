import type { LucideIcon } from "lucide-react";
import { Search, PenTool, Code2, Send } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "We dig into your goals, users, and competition to define what success looks like — before a single pixel is designed.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description:
      "Wireframes become high-fidelity, on-brand designs, refined in fast feedback loops until every detail feels right.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build",
    description:
      "We develop a fast, accessible, SEO-ready site — you watch progress in real time through open staging previews.",
  },
  {
    icon: Send,
    step: "04",
    title: "Launch & Grow",
    description:
      "Smooth launch, analytics wired up, then continuous optimization and support to keep results compounding.",
  },
];