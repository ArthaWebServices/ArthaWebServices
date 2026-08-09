export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "A single-page launch project ships in 2–4 weeks; full multi-page websites typically take 6–10 weeks. We agree on a timeline and milestones up front and stick to them.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Projects start at $4,900 for a landing page and scale with scope. After an initial discovery call, we send a fixed quote — no hourly billing surprises, no hidden fees.",
  },
  {
    question: "Do you work with existing brands and sites?",
    answer:
      "Yes. We regularly redesign existing sites, extend in-house builds, and integrate with the CMS and tools you already use. We meet your stack rather than forcing a rewrite.",
  },
  {
    question: "Who owns the code and design at the end?",
    answer:
      "You do — 100%. Source code, design files, domains, and accounts are all transferred to you at launch, and we include documentation so any team can take over.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. Every project includes a 30-day support window, and many clients continue on a monthly retainer for ongoing design, development, and growth work.",
  },
];