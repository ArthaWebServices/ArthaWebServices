import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/work";

export function Work() {
  return (
    <Section id="work" className="bg-ink text-white">
      <SectionHeader
        eyebrow="Selected work"
        title="Projects we're proud to ship"
        description="A few of the brands we've helped design, launch, and grow. Real builds, real results."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={0.08 * i} as="article" className="h-full">
            <a
              href={project.link}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
              aria-label={`View case study: ${project.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-300"
                    aria-hidden
                  />
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-300">
                  {project.category}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-white/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}