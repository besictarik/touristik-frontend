import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "font-semibold",
    "underline",
    "italic",
    "font-serif",
    "text-2xl",
    "my-2.5",
    "list-disc",
    "list-inside",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        serif: ["var(--font-playfair-display)"],
      },
      colors: {
        "light-1": "#F5F1ED",
        "light-2": "#EFEAE1",
        "light-3": "#E8E2D5",
        "light-4": "#E1DAC9",
        "light-5": "#DAD2BC",
        "dark-1": "#A99985",
        "dark-2": "#897C6D",
        "dark-3": "#685F55",
        "dark-4": "#47423D",
        "dark-5": "#262424",
      },
      boxShadow: {
        "drop-shadow-1": "0 6px 24px 0px rgba(0, 0, 0, 0.05)",
      },
      maxWidth: {
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
    },
    screens: {
      "2xl": { max: "1536px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
export default config;
