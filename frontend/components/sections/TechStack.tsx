import type { CSSProperties } from "react";
import { techCategories } from "@/data/tech";

/**
 * Six independent technology marquee rows.
 *
 * Each row:
 *  - has its own scroll direction (ltr / rtl),
 *  - duplicates its items once internally for a seamless, gap-free loop,
 *  - is clipped by an overflow-hidden viewport so nothing ever widens the page,
 *  - pauses on hover and respects prefers-reduced-motion (see globals.css).
 */
export function TechStack() {
  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="border-y border-ink/10 bg-white py-16 sm:py-20 dark:border-white/10 dark:bg-ink/[0.02]"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="tech-stack-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
            TECHNOLOGIES THAT POWER YOUR BUSINESS
          </h2>
        </div>
      </div>

      <div className="mt-12 overflow-hidden sm:mt-16">
        {techCategories.map((tech) => {
          // Two internal copies make the loop seamless: translate -50% of the
          // doubled track equals exactly one copy width.
          const items = [...tech.items, ...tech.items];

          return (
            <div
              key={tech.category}
              className="tech-row group/row border-t border-ink/[0.06] last:border-b dark:border-white/[0.06]"
            >
              <div className="tech-label">
                <span className="tech-label-dot" aria-hidden />
                <span className="tech-label-text">{tech.category}</span>
              </div>

              <div className="tech-marquee-viewport tech-marquee-fade">
                <div
                  className="tech-marquee-track"
                  data-direction={tech.direction}
                  style={{ "--marquee-duration": `${tech.duration}s` } as CSSProperties}
                >
                  {items.map((name, i) => (
                    <span
                      key={`${name}-${i}`}
                      aria-hidden={i >= tech.items.length}
                      className="tech-item px-4 text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
