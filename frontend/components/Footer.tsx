import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const serviceLinks = [
  "Custom Web Design",
  "Web Development",
  "Ecommerce",
  "Brand & Identity",
  "SEO & Content",
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#cta" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-ink text-ink-50 dark:border-white/10">
      <div className="container-site py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                {siteConfig.name.charAt(0)}
              </span>
              <span className="text-lg">{siteConfig.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}. Strategy, design, and development under one roof — built to convert.
            </p>
            {/* Social Links */}
            {Object.values(siteConfig.social).some(Boolean) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {siteConfig.social.twitter && (
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                    Twitter/X
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                    LinkedIn
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                    Instagram
                  </a>
                )}
                {siteConfig.social.dribbble && (
                  <a href={siteConfig.social.dribbble} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                    Dribbble
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href="#services" className="text-white/70 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Get in touch</h3>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group mt-4 inline-flex items-center gap-1 text-lg font-semibold text-white transition-colors hover:text-brand-300"
            >
              {siteConfig.contact.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {siteConfig.contact.phone ? <p className="mt-3 text-sm text-white/60">{siteConfig.contact.phone}</p> : null}
            {siteConfig.contact.address ? <p className="text-sm text-white/60">{siteConfig.contact.address}</p> : null}
            <Button href="/start-a-project" size="md" className="mt-5">
              Send your Query
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}