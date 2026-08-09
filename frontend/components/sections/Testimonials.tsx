import { Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-ink-50/50 dark:bg-white/[0.02]">
      <SectionHeader
        eyebrow="Client love"
        title="Teams that shipped with us keep coming back"
        description="Don't take our word for it — here's what founders and marketing leads say after launch day."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={0.08 * i} as="figure">
            <div className="card card-hover flex h-full flex-col">
              <Stars count={testimonial.rating} />
              <blockquote className="mt-4 flex-1">
                <p className="text-pretty leading-relaxed text-ink/80 dark:text-ink-100/80">
                  “{testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5 dark:border-white/10">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 text-sm font-bold text-white"
                  aria-hidden
                >
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-ink/50 dark:text-ink-100/50">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </figcaption>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}