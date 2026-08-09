import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/data/process";

export function Process() {
  return (
    <Section id="process" className="bg-ink-50/50 dark:bg-white/[0.02]">
      <SectionHeader
        eyebrow="How we work"
        title="A process built for momentum"
        description="Transparent, collaborative, and fast — you always know what's happening and what comes next."
      />
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.step} delay={0.08 * i} as="li">
              <div className="relative h-full rounded-2xl border border-ink/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
                {/* Connector line (desktop) */}
                {i < process.length - 1 ? (
                  <div
                    aria-hidden
                    className="absolute left-[calc(100%-2rem)] top-14 hidden h-px w-[calc(100%+2rem-1.5rem)] bg-gradient-to-r from-brand-400/50 to-transparent lg:block"
                  />
                ) : null}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="text-4xl font-bold tracking-tight text-ink/10 dark:text-white/10">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-ink-100/60">
                  {step.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}