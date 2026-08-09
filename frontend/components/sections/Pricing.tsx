import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Fixed quotes agreed before we start. No hourly billing surprises, no hidden fees — ever."
      />
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {pricing.map((tier, i) => (
          <Reveal key={tier.name} delay={0.08 * i} as="article" className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7",
                tier.highlighted
                  ? "border-brand-500/60 bg-brand-600 text-white shadow-2xl shadow-brand-600/30 lg:-my-3 lg:py-10"
                  : "card card-hover"
              )}
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                  Most popular
                </span>
              ) : null}

              <h3 className={cn("text-base font-semibold", tier.highlighted ? "text-white/90" : "")}>
                {tier.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  tier.highlighted ? "text-white/70" : "text-ink/50 dark:text-ink-100/50"
                )}
              >
                {tier.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                <span
                  className={cn(
                    "text-sm",
                    tier.highlighted ? "text-white/70" : "text-ink/50 dark:text-ink-100/50"
                  )}
                >
                  {tier.cadence}
                </span>
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        tier.highlighted ? "text-white" : "text-brand-500"
                      )}
                      aria-hidden
                    />
                    <span className={tier.highlighted ? "text-white/90" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href="/start-a-project"
                  variant={tier.highlighted ? "primary" : "outline"}
                  size="lg"
                  className={cn("w-full", tier.highlighted && "bg-white text-brand-700 hover:bg-brand-50 hover:shadow-white/20")}
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}