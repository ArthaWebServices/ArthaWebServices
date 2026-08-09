export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Artha Web Services took our vague idea and delivered a site that our sales team actually brags about. Organic demos are up 2.4x since launch.",
    name: "Sarah Whitmore",
    role: "VP Marketing",
    company: "Northwind Analytics",
    rating: 5,
  },
  {
    quote:
      "The rare agency that treats performance as a design principle. Load times dropped by half and conversions followed within weeks.",
    name: "James Okafor",
    role: "Founder & CEO",
    company: "Atlas Footwear",
    rating: 5,
  },
  {
    quote:
      "Professional, transparent, and fast. They shipped our full rebrand and website in under six weeks without a single missed deadline.",
    name: "Elena Petrov",
    role: "Creative Director",
    company: "Meridian Studios",
    rating: 5,
  },
];