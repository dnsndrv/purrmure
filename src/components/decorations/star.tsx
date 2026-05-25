import { cn } from "@/lib/utils";

type StarProps = {
  className?: string;
  variant?: "sparkle" | "burst" | "shuriken";
  color?: string;
};

export function Star({ className, variant = "burst", color }: StarProps) {
  if (variant === "sparkle") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill={color ?? "currentColor"}
        className={cn("inline-block", className)}
        aria-hidden="true"
      >
        <path d="M12 0 L13.2 9.4 L22 12 L13.2 14.6 L12 24 L10.8 14.6 L2 12 L10.8 9.4 Z" />
      </svg>
    );
  }
  if (variant === "shuriken") {
    return (
      <svg
        viewBox="0 0 64 64"
        fill={color ?? "currentColor"}
        className={cn("inline-block", className)}
        aria-hidden="true"
      >
        <path d="M32 0 L36 28 L64 32 L36 36 L32 64 L28 36 L0 32 L28 28 Z" />
      </svg>
    );
  }
  // burst — sharp 8-point spike star (matches mockups)
  return (
    <svg
      viewBox="0 0 100 100"
      fill={color ?? "currentColor"}
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <path d="M50 0 L57 35 L82 18 L65 43 L100 50 L65 57 L82 82 L57 65 L50 100 L43 65 L18 82 L35 57 L0 50 L35 43 L18 18 L43 35 Z" />
    </svg>
  );
}

export function Flame({
  className,
  color = "#7a3aa3",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="
          M 38 4
          C 34 22, 22 36, 18 58
          C 16 70, 22 76, 30 72
          C 38 68, 42 56, 44 44
          L 46 44
          C 46 56, 48 66, 52 70
          C 58 76, 64 70, 64 60
          C 64 50, 60 40, 56 32
          C 58 44, 62 50, 68 52
          C 74 56, 80 60, 84 70
          C 92 86, 96 102, 88 118
          C 78 134, 56 138, 38 132
          C 18 124, 8 102, 14 80
          C 18 64, 28 54, 34 40
          C 38 28, 40 16, 38 4 Z
        "
      />
    </svg>
  );
}
