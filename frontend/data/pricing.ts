export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const pricing: PricingTier[] = [
  {
    name: "Launch",
    price: "$4,900",
    cadence: "one-time",
    description: "A polished, conversion-focused landing page delivered in weeks.",
    features: [
      "Custom design, single page",
      "Next.js + Tailwind build",
      "On-page SEO & structured data",
      "Analytics & tracking setup",
      "2 revision rounds",
    ],
    cta: "Start a project",
  },
  {
    name: "Growth",
    price: "$12,000",
    cadence: "starting at",
    description: "A full multi-page website engineered to scale with your business.",
    features: [
      "Up to 8 custom pages",
      "Headless CMS integration",
      "Advanced animations & motion",
      "Technical SEO + sitemap",
      "Performance to Lighthouse 95+",
      "30 days of post-launch support",
    ],
    highlighted: true,
    cta: "Book a call",
  },
  {
    name: "Retainer",
    price: "$2,800",
    cadence: "/ month",
    description: "An ongoing design & dev partner for continuous improvement.",
    features: [
      "Dedicated design & dev time",
      "Monthly A/B testing sprints",
      "Analytics reporting",
      "Priority support (24h)",
      "Flexible pause anytime",
    ],
    cta: "Talk to us",
  },
];