import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/types";
import { Star } from "./star";

const palette: Record<string, { bg: string; fg: string }> = {
  "Чёрный": { bg: "#171717", fg: "#3a3a3a" },
  "Графит": { bg: "#2a2a2a", fg: "#4a4a4a" },
  "Серый": { bg: "#6b6b6b", fg: "#8a8a8a" },
  "Серебро": { bg: "#a8a8a8", fg: "#c8c8c8" },
  "Молочный": { bg: "#efe8db", fg: "#dcd3c0" },
  "Розовый": { bg: "#cf5fa3", fg: "#e58cc1" },
  "Бордовый": { bg: "#6b1a2b", fg: "#8a2438" },
  "Красный": { bg: "#b32030", fg: "#d12c3e" },
  "Оранжевый": { bg: "#d46a2a", fg: "#e8843e" },
  "Горчичный": { bg: "#c8a932", fg: "#dabf45" },
  "Зелёный": { bg: "#2f6a48", fg: "#3f8a60" },
  "Фиолетовый": { bg: "#4a2266", fg: "#6c3990" },
  "Жемчуг": { bg: "#dcd4c8", fg: "#e8e1d7" },
  "Белый": { bg: "#f0f0f0", fg: "#d4d4d4" },
};

function getColors(product: Product) {
  return palette[product.color] ?? { bg: "#3a3a3a", fg: "#5a5a5a" };
}

function shapeForCategory(
  category: ProductCategory,
  bg: string,
  fg: string,
): React.ReactNode {
  switch (category) {
    case "base":
      // crescent / half-moon bag
      return (
        <>
          <path
            d="M 60 230 Q 60 130 200 130 Q 340 130 340 230 Q 340 310 200 320 Q 60 310 60 230 Z"
            fill={bg}
          />
          <path
            d="M 200 130 C 160 90 240 90 200 130"
            stroke={fg}
            strokeWidth="6"
            fill="none"
          />
          <ellipse cx="200" cy="80" rx="60" ry="40" stroke={fg} strokeWidth="6" fill="none" />
        </>
      );
    case "bag":
      // drawstring pouch
      return (
        <>
          <path
            d="M 90 160 L 80 320 Q 200 360 320 320 L 310 160 Z"
            fill={bg}
          />
          <path
            d="M 90 160 Q 200 130 310 160"
            stroke={fg}
            strokeWidth="4"
            fill="none"
          />
          <circle cx="120" cy="160" r="4" fill={fg} />
          <circle cx="180" cy="155" r="4" fill={fg} />
          <circle cx="220" cy="155" r="4" fill={fg} />
          <circle cx="280" cy="160" r="4" fill={fg} />
          <path d="M 200 130 L 200 95" stroke={fg} strokeWidth="4" />
          <path d="M 175 90 Q 200 70 225 90" stroke={fg} strokeWidth="4" fill="none" />
        </>
      );
    case "strap":
      // chain / strap loop
      return (
        <>
          <path
            d="M 100 90 Q 60 200 100 310 L 130 310 Q 90 200 130 90 Z"
            fill={bg}
          />
          <path
            d="M 270 90 Q 310 200 270 310 L 300 310 Q 340 200 300 90 Z"
            fill={bg}
          />
          {[120, 160, 200, 240, 280].map((y) => (
            <ellipse
              key={y}
              cx="200"
              cy={y}
              rx="30"
              ry="14"
              stroke={fg}
              strokeWidth="6"
              fill="none"
            />
          ))}
        </>
      );
    case "decor":
      // charm / star burst
      return (
        <>
          <circle cx="200" cy="160" r="70" fill={bg} />
          <path d="M 200 100 L 200 60" stroke={fg} strokeWidth="6" />
          <circle cx="200" cy="55" r="10" stroke={fg} strokeWidth="6" fill="none" />
          <g transform="translate(200,240)" fill={fg}>
            <path d="M 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 L -30 0 L -8 -8 Z" />
          </g>
        </>
      );
    case "set":
      // composite bag
      return (
        <>
          <path
            d="M 60 230 Q 60 130 200 130 Q 340 130 340 230 Q 340 310 200 320 Q 60 310 60 230 Z"
            fill={bg}
          />
          <path
            d="M 200 130 C 160 90 240 90 200 130"
            stroke={fg}
            strokeWidth="6"
            fill="none"
          />
          <ellipse cx="200" cy="80" rx="60" ry="40" stroke={fg} strokeWidth="6" fill="none" />
          <circle cx="200" cy="230" r="10" fill={fg} />
        </>
      );
  }
}

export function ProductImage({
  product,
  className,
  decorative = true,
}: {
  product: Product;
  className?: string;
  decorative?: boolean;
}) {
  const { bg, fg } = getColors(product);
  return (
    <div className={cn("relative w-full aspect-square overflow-hidden bg-surface-2", className)}>
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="400" height="400" fill="#9c9c9c" />
        {shapeForCategory(product.category, bg, fg)}
      </svg>
      {decorative && (
        <>
          <Star
            variant="burst"
            className="absolute top-3 right-3 h-6 w-6 text-accent opacity-90"
          />
          <Star
            variant="sparkle"
            className="absolute bottom-4 left-3 h-3 w-3 text-white/80"
          />
        </>
      )}
    </div>
  );
}
