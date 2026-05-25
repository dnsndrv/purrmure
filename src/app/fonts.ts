import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Body / UI font — clean, readable sans for menus, buttons, forms, prices.
export const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

// Brand display font — Angst (Misha Ivanov).
// Variable font, two axes (weight + serif). Cyrillic + Latin.
// Used for all headings, hero copy, logo accents.
export const display = localFont({
  src: [
    {
      path: "./fonts/Angst-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Angst-Normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Angst-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
  preload: true,
  adjustFontFallback: false,
});

// Angst Bold Serif — high-contrast didone-style serif for editorial accents.
export const displaySerif = localFont({
  src: [
    {
      path: "./fonts/Angst-BoldSerif.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display-serif",
  display: "swap",
  fallback: ["Playfair Display", "Didot", "Georgia", "serif"],
  preload: false,
  adjustFontFallback: false,
});
