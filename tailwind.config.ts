import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '720px', // Custom breakpoint to match existing CSS
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Neutrals (warm cream, olive-tinted)
        bg: "#F0EEE6",
        "bg-subtle": "#EBE8DD",
        surface: "#FFFFFF",
        "surface-alt": "#F5F2E5",
        border: "#DEDBCB",
        "border-strong": "#BFB89D",
        "text-muted": "#6B6750",
        "text-subtle": "#4A4317",
        text: "#1A1810",
        
        // Accent: Olive Bronze
        accent: {
          50: "#F5F4E8",
          100: "#E8E5C6",
          200: "#D4CE9A",
          400: "#8B8133",
          500: "#4A4317", // PRIMARY ACCENT
          600: "#3A340F",
          700: "#2A2608",
        },
        
        // Semantic
        success: "#4D6B2E",
        warning: "#8B6914",
        danger: "#8B2E2E",
        info: "#2C4A6B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(26, 24, 16, 0.04)",
        DEFAULT: "0 1px 3px rgba(26, 24, 16, 0.06), 0 1px 2px rgba(26, 24, 16, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;