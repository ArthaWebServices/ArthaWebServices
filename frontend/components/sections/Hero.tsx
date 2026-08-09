"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, absoluteUrl } from "@/lib/site";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const heroJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    description: siteConfig.description,
    priceRange: "$$",
    image: absoluteUrl("/og-image.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web agency services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ecommerce" } },
      ],
    },
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
      {/* Ambient gradient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px] dark:bg-brand-600/25" />
        <div className="absolute bottom-0 right-[-10%] h-[380px] w-[380px] rounded-full bg-indigo-400/20 blur-[100px] dark:bg-indigo-500/15" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(120,120,160,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,160,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <JsonLd data={heroJsonLd} />

      <div className="container-site">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-ink/70 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-ink-100/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Taking on projects for Q3 2026
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="h-display mt-6"
          >
            We design & build websites that{" "}
            <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">
              turn visitors into customers
            </span>
          </motion.h1>

          <motion.p variants={item} className="lead mx-auto mt-6 max-w-2xl">
            {siteConfig.name} is a web agency pairing sharp strategy with engineering-grade
            execution — bespoke design, lightning-fast Next.js builds, and SEO baked in from
            the first line.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/start-a-project" size="lg">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#work" size="lg" variant="outline">
              <Play className="h-4 w-4" /> View our work
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-ink/10 pt-8 dark:border-white/10"
          >
            {[
              ["120+", "projects shipped"],
              ["19ms", "median TTFB"],
              ["98", "avg. Lighthouse"],
            ].map(([stat, label]) => (
              <div key={label} className="text-center">
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-bold sm:text-3xl">{stat}</dd>
                <dd className="mt-1 text-xs text-ink/50 dark:text-ink-100/50">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}