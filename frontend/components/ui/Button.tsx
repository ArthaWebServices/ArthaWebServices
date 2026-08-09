import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  size?: Size;
  href?: string;
  as?: ElementType;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 hover:shadow-brand-500/40 hover:-translate-y-0.5",
  ghost:
    "text-ink hover:bg-ink/5 dark:text-ink-50 dark:hover:bg-white/10",
  outline:
    "border border-ink/15 text-ink hover:border-brand-500 hover:text-brand-600 dark:border-white/20 dark:text-ink-50 dark:hover:text-brand-300",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  as,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp: ElementType = as ?? (href ? "a" : "button");

  return (
    <Comp
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}