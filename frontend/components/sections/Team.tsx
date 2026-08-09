import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { team } from "@/data/team";
import { cn } from "@/lib/utils";

const avatarTints = [
  "from-brand-400 to-indigo-500",
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-600",
  "from-emerald-400 to-teal-600",
];

export function Team() {
  return (
    <Section id="team">
      <SectionHeader
        eyebrow="The team"
        title="Senior people, no hand-offs"
        description="You work directly with the designers and engineers building your site — no account-manager telephone game."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={0.07 * i} as="article">
            <div className="card card-hover h-full flex flex-col items-center text-center">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-lg",
                  avatarTints[i % avatarTints.length]
                )}
                aria-hidden
              >
                {member.initials}
              </div>
              <h3 className="mt-5 text-base font-semibold">{member.name}</h3>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-500">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-ink-100/60">
                {member.bio}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}