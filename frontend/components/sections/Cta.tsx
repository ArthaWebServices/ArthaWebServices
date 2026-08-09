import { ArrowRight, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Cta() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(120,120,160,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,160,0.14) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container-site">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="h-display">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">
              people remember?
            </span>
          </h2>
          <p className="lead mx-auto mt-6 max-w-xl">
            Tell us about your project. We&apos;ll reply within one business day with a clear next step
            and an honest recommendation — whether that&apos;s working together or not.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/start-a-project" size="lg">
              <Mail className="h-4 w-4" /> Start a project
            </Button>
            <Button href="#pricing" size="lg" variant="outline">
              <Calendar className="h-4 w-4" /> See pricing
            </Button>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-ink/50 dark:text-ink-100/50">
            Free discovery call · No obligation <ArrowRight className="h-4 w-4" aria-hidden />
          </p>
        </Reveal>
      </div>
    </section>
  );
}