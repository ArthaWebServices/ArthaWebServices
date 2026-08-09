import { logos } from "@/data/logos";

/** Trusted-by logo marquee. Replace company names with text/logo marks for real clients. */
export function LogoCloud() {
  const doubled = [...logos, ...logos];

  return (
    <section className="border-y border-ink/10 py-10 dark:border-white/10">
      <div className="container-site">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 dark:text-ink-100/40">
          Trusted by product teams worldwide
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track flex w-max gap-14">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= logos.length}
                className="whitespace-nowrap text-xl font-bold tracking-tight text-ink/35 transition-colors hover:text-ink/60 dark:text-white/25 dark:hover:text-white/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}