import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow="What we do"
        title="Full-stack services, one seamless team"
        description="From first sketch to ongoing growth, every service is designed to compound — so design, build, and optimization work together."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal
              key={service.title}
              delay={0.06 * (i % 3)}
              as="article"
              className="group relative"
            >
              <div className="card card-hover h-full flex flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-300">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60 dark:text-ink-100/60">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/60 dark:border-white/10 dark:text-ink-100/60"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}