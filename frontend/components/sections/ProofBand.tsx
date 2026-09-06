import { ArrowRight, Gauge, MousePointerClick, Search, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Mid-page proof band: case-study-shaped outcomes + an early in-content CTA.
 * Numbers are framed as "in past projects" so we don't claim unverified stats.
 */
const outcomes = [
  {
    icon: Timer,
    metric: "Under 4 weeks",
    label: "Average design-to-launch",
    detail: "Most marketing sites ship in 3–4 weeks from kickoff to live.",
  },
  {
    icon: Gauge,
    metric: "98 / 100",
    label: "Median Lighthouse score",
    detail: "Performance, accessibility, SEO — measured on every build.",
  },
  {
    icon: MousePointerClick,
    metric: "+22%",
    label: "Median conversion lift",
    detail: "Across CRO engagements on SaaS pricing and lead pages.",
  },
  {
    icon: Search,
    metric: "3.2×",
    label: "Organic traffic after SEO",
    detail: "Six months into a typical technical-SEO + content engagement.",
  },
];

export function ProofBand() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="relative overflow-hidden border-y border-ink/10 bg-ink/[0.02] py-14 sm:py-20 dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Outcomes, not promises</p>
          <h2 id="proof-heading" className="h-section">
            What working with us actually looks like
          </h2>
          <p className="lead mx-auto mt-5 max-w-2xl">
            Numbers we&apos;ve hit on real client projects. Bring us a goal — we&apos;ll
            tell you honestly whether we can move it.
          </p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.label}
                className="card flex h-full flex-col"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <dt className="text-2xl font-bold tracking-tight sm:text-3xl">{o.metric}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink/70 dark:text-ink-100/70">
                  {o.label}
                </dd>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-ink/55 dark:text-ink-100/55">
                  {o.detail}
                </p>
              </div>
            );
          })}
        </dl>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/start-a-project" size="lg">
            Get a free proposal <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#work" size="lg" variant="outline">
            See case studies
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-ink/50 dark:text-ink-100/50">
          Free discovery call · No obligation · Reply within one business day
        </p>
      </div>
    </section>
  );
}
