export interface WorkProject {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  link: string;
}

export const projects: WorkProject[] = [
  {
    title: "Northwind Analytics",
    category: "SaaS Platform",
    description:
      "A data-heavy analytics dashboard redesigned for clarity and speed, lifting activation by 32%.",
    image: "/work-northwind.svg",
    alt: "Northwind Analytics dashboard interface preview",
    tags: ["UI/UX", "Next.js", "Dashboard"],
    link: "#",
  },
  {
    title: "Atlas Footwear",
    category: "Ecommerce",
    description:
      "A headless storefront with a 98 Lighthouse score that grew online revenue 41% in one quarter.",
    image: "/work-atlas.svg",
    alt: "Atlas Footwear online store preview",
    tags: ["Ecommerce", "Shopify", "CRO"],
    link: "#",
  },
  {
    title: "Meridian Studios",
    category: "Brand & Website",
    description:
      "End-to-end rebrand and launch site for a creative production house — bold, gallery-driven design.",
    image: "/work-meridian.svg",
    alt: "Meridian Studios brand website preview",
    tags: ["Branding", "Web Design", "Motion"],
    link: "#",
  },
];