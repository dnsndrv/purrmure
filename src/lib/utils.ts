import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a public path with the current basePath (for GitHub Pages /purrmure/).
 * Needed because next/image with `unoptimized: true` does not auto-prefix src.
 */
export function asset(path: string): string {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}
