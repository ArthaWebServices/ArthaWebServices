import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-2xl sm:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {description ? <p className={cn("lead mt-5", align === "center" && "mx-auto")}>{description}</p> : null}
    </Reveal>
  );
}