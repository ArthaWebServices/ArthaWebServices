import { cn } from "@/lib/utils";

export type LogoVariant = "light" | "dark" | "mark";
export type LogoSize = "sm" | "md" | "lg" | "xl";

const variantSrc: Record<LogoVariant, string> = {
  light: "/logo-light.svg",
  dark: "/logo-dark.svg",
  mark: "/logo-mark.svg",
};

// Aspect ratio of the SVG viewBox is 320:80 = 4:1, except the mark which is 1:1.
const sizeClasses: Record<LogoSize, string> = {
  sm: "h-7",
  md: "h-8",
  lg: "h-10",
  xl: "h-12 sm:h-14",
};

const markSizeClasses: Record<LogoSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12 sm:h-14 sm:w-14",
};

export function Logo({
  variant = "light",
  size = "md",
  className,
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}) {
  const isMark = variant === "mark";
  return (
    <img
      src={variantSrc[variant]}
      alt="Artha Web Services"
      width={isMark ? 64 : 320}
      height={isMark ? 64 : 80}
      className={cn(
        isMark ? markSizeClasses[size] : sizeClasses[size],
        "w-auto select-none",
        className
      )}
      draggable={false}
    />
  );
}
