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
    title: "College Announcement Portal",
    category: "Full-Stack Education Platform",
    description:
      "A multi-tier announcement system for Ghanshyamdas Saraf College, enabling HODs to publish announcements to their departments with real-time push notifications to students. Public feed allows anyone to browse/filter by course, year, type, and date with no authentication required.",
    image: "/Aportal.png",
    alt: "College Announcement Portal interface preview",
    tags: ["React", "Node.js", "MongoDB", "Clerk Auth", "Push Notifications", "Express", "Tailwind CSS"],
    link: "Announcement-port.vercel.app",
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